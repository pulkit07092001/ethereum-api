import axios from "axios";
import Ethereum from "../models/Ethereum.js";
const fetchAndUpdatePrice = async () => {
  try {
    const { ethereum } = (await axios.get(process.env.ETHEREUM_PRICE_API)).data;
    await Ethereum.create({ price: ethereum.inr });
    return ethereum;
  } catch (err) {
    throw new Error(err);
  }
};
export default fetchAndUpdatePrice;
