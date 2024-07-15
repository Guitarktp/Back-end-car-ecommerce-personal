import express from "express";
import * as userController from "../controllers/userController.js";
import adminAuthenticateMiddleware from "../middleware/adminAuthenticateMiddleware.js"
import authenticateMiddleware from "../middleware/authenticateMiddleware.js"

const router = express.Router();

// API - 1 Register
router.post("/register", userController.createUser);
// API - 2 Login
router.post("/login", userController.login);
// API - 3 Verify Email
router.get("/verify-email", userController.verifyEmail);
// API - 1 RegisterForAdmin
router.post("/registerForAdmin", userController.createUserForAdmin);
// API OrderPinned
router.get("/Top-Car", userController.orderPinned);
// API - Edit
router.put("/",authenticateMiddleware, userController.editUser);

//API - Forget Password
router.post("/password",authenticateMiddleware, userController.forgetPassword);

// Api -get profile by id 
router.get("/profile/:id",userController.viewprofilebyID)

// api get profile all 
router.get("/profile",authenticateMiddleware,userController.viewprofile)

// api delect cat fav 
router.delete("/delete/:id/:pinnedID",userController.deleteFav)

//Api for send profile picture url to db
router.patch('/uploadprofilepicture',authenticateMiddleware, userController.uploadProfile);

// API - SoftDelete
router.delete("/:email",authenticateMiddleware, userController.deleteUserEmail);

//API - Add favourite car
// router.post("/:id/:pinnedID",userController.deleteFav)

// API - 8  Add movie to movie list
// router.post('/:movieListId/movies/:movieId', movieListController.addMovieToMovieList);





export default router;
