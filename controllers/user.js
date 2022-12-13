import User from "../models/User.js";
import Ethereum from "../models/Ethereum.js";
import axios from "axios";
const getTransactionsAndUpdate = async (userAddress) => {
  try {
    const { result: transactions } = (
      await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
      )
    ).data;

    let user = await User.findOne({ address: userAddress });
    if (!user) {
      user = await User.create({ address: userAddress, transactions });
    } else {
      user = await User.findOneAndUpdate(
        { address: userAddress },
        { transactions },
        { new: true }
      );
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
export const getTransactions = async (req, res, next) => {
  try {
    const { transactions } = await getTransactionsAndUpdate(req.params.address);
    res.status(200).json({ status: "SUCCESS", data: { transactions } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "ERROR", error: err });
  }
};

export const getBalance = async (req, res, next) => {
  try {
    const { transactions } = await getTransactionsAndUpdate(req.params.address);
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.to === req.params.address)
        balance += Number(transaction.value);
      if (transaction.from === req.params.address)
        balance -= Number(transaction.value);
    });

    const currentPrice = (await Ethereum.find({}).sort({ updatedAt: -1 }))[0]
      .price;
    res
      .status(200)
      .json({ status: "SUCCESS", data: { balance, currentPrice } });
  } catch (err) {
    res.status(500).json({ status: "ERROR", error: err });
  }
};
