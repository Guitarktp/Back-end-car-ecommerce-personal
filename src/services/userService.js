import User from "../models/user.js";
import NotFoundError from "../error/NotFoundError.js";

//API - Register
const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

//API - Forget Password
const getRecoverByEmail = async (Email) => {
  const emailCheck = await User.findOne({ Email: Email });
  console.log("Email found:", emailCheck);
  return emailCheck;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ Email: email });
  return user;
}

const topPinned = async () => {
  const orderPinned = await User.aggregate([
    { $unwind: "$pinned"},
    { $group: {
      _id : "$pinned",
      count : { $sum:1}
    }},
    { $sort: { count: -1}}
  ])
  console.log(orderPinned);
  return orderPinned
}

const editUser = async (_id, data) => {
  const user = await User.findOneAndUpdate({ _id }, data, { new: true });
  console.log(user);
  return user;
};


const profileID = async(user_id)=>{
  const viewid = await User.findOne({_id:user_id})
  return viewid
};

const profile = async()=>{
  const view = await User.find()
  return view
};

const delectcarlist = async(id,pinnedIndex)=>{
  try {
    const user_id = await User.findById(id)
    if(!user_id){
      throw new NotFoundError("User Not found")
    }
    user_id.pinned.splice(pinnedIndex,1)
    await user_id.save()
    return user_id
  } catch (error) {
    next(error)
  }
   

} 

export default { createUser,profileID,profile,getUserByEmail, topPinned, editUser, getRecoverByEmail,delectcarlist };
