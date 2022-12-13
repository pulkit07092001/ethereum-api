import express from "express";
import { getTransactions, getBalance } from "../controllers/user.js";

const router = express.Router();

//GET LIST OF TRANSACTIONS
router.get("/:address/transactions", getTransactions);

//GET CURRENT BALANCE AND CURRENT PRICE OF ETHER
router.get("/:address/balance", getBalance);
export default router;
