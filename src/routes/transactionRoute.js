import express from "express";
import transactionControl from "../controllers/transactionControl.js";

const router = express.Router();

router.delete("/:id", transactionControl.deleteTransaction);

// buy
router.post("/", transactionControl.createTransaction);

// patch update
router.patch("/date/:id", transactionControl.patchUpdate);

//get transaction
router.get("/:id", transactionControl.getTransaction);

export default router;
