import Order from "../../models/orderModel.js";
import OrderItem from "../../models/orderItemModel.js";

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    if(!orderId){
        console.log(`No order id recieved`);
        return res.status(400).json({error: `No order id recieved`});
    }
    // Find and delete the Order
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      console.log(`Order with ${orderId} not found`);
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete all associated OrderItems
    const deleteResult = await OrderItem.deleteMany({ orderId });

    if (deleteResult.deletedCount === 0) {
      // No OrderItems found for the given Order
      console.log(`Order deleted successfully, but no associated OrderItems found`);
      return res
        .status(200)
        .json({
          message:
            "Order deleted successfully, but no associated OrderItems found",
        });
    }

    return res
      .status(204)
      .json({
        message: "Order and associated OrderItems deleted successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default deleteOrder;