import OrderItem from "../../models/orderItemModel.js";

const getCustomerOrder = async (req, res) => {
  try {
    const { status, date, productName, outletName } = req.query;
    const customerId = req.customerId;
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
    const productNameFilter = {};
    if(productName){
      productNameFilter.name = { $regex: `^${productName}` , $options: "i" };
    }
    const outletNameFilter = {};
    if(outletName){
      outletNameFilter.name = { $regex: `^${outletName}`, $options: "i" };
    }

    const orderItems = await OrderItem.find(filters)
      .populate({
        path: "orderId",
        match: { customerId },
        select: "outletId",
        populate: {
          path: "outletId",
          match: outletNameFilter,
          select: "name"
        },
      })
      .populate({
        path: "productId",
        match: productNameFilter,
        select: "name"
      })
      .sort({ createdAt: "desc" })
      .exec();
      
      const filteredOrderItems = orderItems.filter(item => item.productId !== null && item.orderId.outletId!== null);;
      console.log(filteredOrderItems);

    const orders = {};
    filteredOrderItems.forEach((orderItem) => {
      const orderId = orderItem.orderId._id.toString();
      const productName = orderItem.productId.name;
      //console.log(orderItem.productId);
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
        const outletName = orderItem.orderId.outletId.name;
        orders[orderId] = {
          orderId,
          outletName,
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

export default getCustomerOrder;
