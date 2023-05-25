import Product from "../../models/productModel.js";

const deleteProduct = async (req, res) => {
  try {
    const { name } = req.query;
    const outletId = req.outletId;
    const error = validateName(name);
    if (error) {
      console.log(error);
      res.status(400).json({ error });
      return;
    }

    const findResult = await Product.findOne({
      outletId,
      name,
    });
    if (!findResult) {
      console.log(
        `Product with name ${name} from outlet ${outletId} not found`
      );
      res.status(404).json({
        error: `Product with name ${name} from outlet ${outletId} not found`,
      });
      return;
    }

    const deleteResult = await Product.deleteOne({
      outletId,
      name,
    });
    if (deleteResult.deletedCount) {
      console.log(`Product with product name : ${name} deleted successfully`);
      return res.status(204).json({ message: "Deleted successfully" });
    } else {
      console.log(`Product with product name : ${name} deletion unsuccessful`);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    // Handle any errors that occurred during addition
    console.log(`Error deleting product: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteProduct;

const validateName = (name) => {
  let error;
  if (!name) {
    error = "Product name is required";
  } else if (!/^[A-Za-z ]+$/.test(name)) {
    error = "Product name can only contain letters and spaces";
  }
  return error;
};
