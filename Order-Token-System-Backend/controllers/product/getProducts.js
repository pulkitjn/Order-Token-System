import Product from "../../models/productModel.js";

const getProducts = async (req, res) => {
  try {
    const outletId = req.params.outletId || req.outletId;
    if (!outletId) {
      console.log(`Outlet Id not found`);
      return res.status(400).json({ error: `Outlet Id not found` });
    }
    const { name } = req.query;
    const priceMin = parseFloat(req.query.priceMin);
    const priceMax = parseFloat(req.query.priceMax);
    const filter = {};
    if (name) {
      filter["name"] = { $regex: `^${token}`, $options: "i" };
    }
    if (priceMin) {
      filter["price"] = { $gte: priceMin };
    }
    if (priceMax) {
      filter["price"] = { ...filter.price, $lte: priceMax };
    }
    const result = await Product.find(filter);
    if (!result) {
      console.log(`Products not found`);
      return res.status(404).json({ error: `Products not found` });
    }
    console.log(`Products found successfully`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`Internal server error ${error}`);
    return res.status(500).json({ error: `Internal server error` });
  }
};

export default getProducts;
