import mongoose from "mongoose";
import OrderItem from "../../models/orderItemModel.js";

const deleteOrderItem = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    // Find and delete the Order
    if(!orderItemId){
      console.log(`No order item id recieved`);
      return res.status(400).json({error: `No order item id recieved`});
    }
    const deletedOrderItem = await OrderItem.findByIdAndDelete(orderItemId)
    if (!deletedOrderItem) {
      console.log(`Order Item with ${orderItemId} not found`);
      return res.status(404).json({ message: "Order Item not found" });
    }
    console.log(`Order Item with id ${orderItemId} deleted successfully`)
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deleteOrderItem;
