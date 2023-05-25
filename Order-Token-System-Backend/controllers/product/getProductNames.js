import Product from "../../models/productModel.js";

const getProductNames = async (req, res) => {
  try {
    const outletId = req.outletId;

    // Find products with the given outletId and select only the name field
    const products = await Product.find({ outletId })
      .select("name")
      .sort("name");

    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product names." });
  }
};

export default getProductNames;
