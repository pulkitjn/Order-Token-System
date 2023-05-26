import OrderItem from "../../models/orderItemModel.js";

const getOutletOrder = async (req, res) => {
  try {
    const { status, date, token, customerName } = req.query;
    const outletId = req.outletId;
    // Build the filter object based on the provided query parameters
    const filters = {};
    if (status) {
      filters["status"] = status;
    }
    if (date) {
      filters["createdAt"] = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
      };
    }
    if (token) {
      filters["token"] = { $regex: `^${token}`, $options: "i" };
    }
    const customerNameFilter = {};
    if(customerName){
        customerNameFilter.firstName = { $regex: `^${customerName}`, $options: "i" };
    }
    const orderItems = await OrderItem.find(filters)
      .populate({
        path: "orderId",
        match: { outletId },
        select: "customerId",
        populate: {
            path: "customerId",
            match: customerNameFilter,
            select: "firstName lastName",
            model: "Customer"
          }
      })
      .populate({
        path: "productId",
        select: "name",
      })
      .sort({ createdAt: "asc" })
      .exec();
    console.log(orderItems)
    // Retrieve the order items with the applied filters

    // Group order items by orderId
    const orders = {};
    orderItems.forEach((orderItem) => {
      const orderId = orderItem.orderId._id.toString();
      const productName = orderItem.productId.name;
      const { orderItemId, quantity, status, token } = orderItem;
      if (orders[orderId]) {
        orders[orderId].orderItems.push({
          orderItemId,
          productName,
          quantity,
          status,
          token,
        });
      } else {
        const customerFirstName = orderItem.orderId.customerId.firstName;
        const customerLastName = orderItem.orderId.customerId.lastName;
        //console.log(customerfirstName, customerlastName);
        orders[orderId] = {
          orderId,
          customerFirstName,
          customerLastName,
          orderItems: [{ orderItemId, productName, quantity, status, token }],
        };
      }
    });

    // Convert the orders object to an array
    const orderList = Object.values(orders);

    res.json(orderList);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving orders." });
  }
};

export default getOutletOrder;
