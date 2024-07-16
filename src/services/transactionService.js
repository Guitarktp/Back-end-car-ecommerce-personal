import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import Car from "../models/car.js";
const deleteTransaction = async (idObject) => {
  const id = idObject.id;
  const result = await Transaction.findByIdAndDelete(id);
  return result;
};

const createTransaction = async (data) => {
  const transaction = new Transaction(data);
  try {
    await transaction.save();
    return transaction;
  } catch (error) {
    throw new Error(`Error saving transaction: ${error.message}`);
  }
};

//API - Create transaction

// const createTransaction = async ({Product_Id, Purchase_User}) => {

//   const car = await Car.findById(Product_Id);

//   // const buyer = await User.findById(Purchase_User);
//   // if (!buyer) {
//   //   return res.status(404).json({ message: "Buyer not found" });
//   // }

//   const purchasePriceWithMarkup = car.price * 1.10;

//   const transaction = new Transaction({
//       Product_Id,
//       Sell_Price: car.price,
//       Purchase_Price: purchasePriceWithMarkup,
//       Sell_Date: car.createOn,
//       Purchase_Date: new Date(),
//       Promotion: false, // สมมติว่าไม่มีโปรโมชั่น
//       Purchase_User,
//       Seller_User: car.Seller_User,  // ยังไม่มี seller user ใน car schema
//     });
//   // await transaction.save();
//   return transaction;
// };

const getTransactionsByUser = async (id) => {
  try {
    const transactions = await Transaction.find({
      Purchase_User: id,
    }).exec();
    return transactions;
  } catch (error) {
    throw error; // Re-throw the error to be handled by the calling function
  }
};

const updateTransaction = async (id, updateData) => {
  const result = await Transaction.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};
export default {
  deleteTransaction,
  updateTransaction,
  createTransaction,
  getTransactionsByUser,
};
