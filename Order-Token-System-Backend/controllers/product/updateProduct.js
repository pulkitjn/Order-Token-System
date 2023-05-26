import Product from "../../models/productModel.js";

const updateProduct = async (req, res) => {
  try {
    const { name } = req.params;
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

    const updatedProduct = {};
    if (req.body.price) {
      updatedProduct.price = req.body.price;
    }
    if (req.body.priceType) {
      updatedProduct.priceType = req.body.priceType;
    }
    if (req.body.description) {
      updatedProduct.description = req.body.description;
    }

    // validate the req.body
    const validationError = validateProduct(updatedProduct);
    if (Object.keys(validationError).length !== 0) {
      console.log(validationError);
      res.status(400).json({ validationError });
      return;
    }

    const result = await Product.updateOne({ outletId, name }, updatedProduct);
    if (result.modifiedCount > 0) {
      console.log(`Successful updation`);
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      console.log(`Unsuccessful updation`);
      res.status(500).json({ error: "Product update not successful" });
    }
  } catch (error) {
    // Handle any errors that occurred during addition
    console.log(`Error updating product: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default updateProduct;

const validateName = (name) => {
  let error;
  if (!name) {
    error = "Product name is required";
  } else if (!/^[A-Za-z ]+$/.test(name)) {
    error = "Product name can only contain letters and spaces";
  }
  return error;
};

const validateProduct = (product) => {
  const errors = {};

  // Validate priceType
  if (product.priceType && !["₹", "$"].includes(product.priceType)) {
    errors.priceType = "Please select a valid price type (₹ or $)";
  }

  // Validate price
  if (product.price && (isNaN(product.price) || product.price < 0)) {
    errors.price = "Price must be a positive number";
  }

  // Validate description
  if (product.description && !/^[a-zA-Z0-9\s]+$/.test(product.description)) {
    errors.description = "Description can only contain alphanumeric characters";
  }

  return errors;
};
