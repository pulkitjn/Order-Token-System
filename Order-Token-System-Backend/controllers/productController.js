import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { outletId, name, priceType, price, description } = req.body;
    // validate the req.body
    const error = validateProduct(req.body);
    if (Object.keys(error).length !== 0) {
      console.log(error);
      res.status(400).json({ error });
      return;
    }

    const findResult = await Product.findOne({
      outletId,
      name,
    });
    if (findResult) {
      console.log(`Product with name ${name} from ${outletId} already exists`);
      res.status(404).json({
        error: `Product with name ${name} already exists`,
      });
      return;
    }
    const product = new Product({
      outletId,
      name,
      priceType,
      price,
      description,
    });

    // Add the product to the database
    await product
      .save()
      .then((res) => {
        console.log(`Product is added \n${res}`);
      })
      .catch((err) => {
        console.log(`Error Saving product in DB: ${err}`);
        throw err;
      });

    // Return a success response
    res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    // Handle any errors that occurred during addition
    console.log(`Error adding product: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { outletId, name } = req.body;
    const error = validateEmailName(req);
    if (Object.keys(error).length !== 0) {
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

const updateProduct = async (req, res) => {
  try {
    const error = validateEmailName(req);
    if (Object.keys(error).length !== 0) {
      console.log(error);
      res.status(400).json({ error });
      return;
    }
    const { outletId, name } = req.body;
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
    const forValidationProduct = {};
    forValidationProduct.outletId = req.body.outletId;
    forValidationProduct.name = req.body.name;
    if (req.body.price) {
      updatedProduct.price = req.body.price;
      forValidationProduct.price = req.body.price;
    }else{
      forValidationProduct.price = findResult.price;
    }
    if (req.body.priceType) {
      updatedProduct.priceType = req.body.priceType;
      forValidationProduct.priceType = req.body.priceType;
    }else{
      forValidationProduct.priceType = findResult.priceType;
    }
    if (req.body.description) {
      updatedProduct.description = req.body.description;
      forValidationProduct.description = req.body.description;
    }else{
      forValidationProduct.description = findResult.description;
    }

    // validate the req.body
    const validationError = validateProduct(forValidationProduct);
    if (Object.keys(validationError).length !== 0) {
      console.log(validationError);
      res.status(400).json({ validationError });
      return;
    }

    const result = await Product.updateOne(
      { outletId: req.body.outletId, name: req.body.name },
      updatedProduct
    );
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

export default {
  addProduct,
  deleteProduct,
  updateProduct,
};

const validateEmailName = (req) => {
  // Validate outletId
  const errors = {};
  if (!req.body.outletId) {
    errors.outletId = "Outlet ID is required";
  }

  // Validate name
  if (!req.body.name) {
    errors.name = "Product name is required";
  } else if (!/^[A-Za-z ]+$/.test(req.body.name)) {
    errors.name = "Product name can only contain letters and spaces";
  }

  return errors;
};

const validateProduct = (product) => {
  const errors = {};

  // Validate outletId
  if (!product.outletId) {
    errors.outletId = "Outlet ID is required";
  }

  // Validate name
  if (!product.name) {
    errors.name = "Product name is required";
  } else if (!/^[A-Za-z ]+$/.test(product.name)) {
    errors.name = "Product name can only contain letters and spaces";
  }

  // Validate priceType
  if (!product.priceType) {
    errors.priceType = "Price type is required";
  } else if (!["₹", "$"].includes(product.priceType)) {
    errors.priceType = "Please select a valid price type (₹ or $)";
  }

  // Validate price
  if (product.price === null || isNaN(product.price) || product.price < 0) {
    errors.price = "Price must be a positive number";
  }

  // Validate description
  if (product.description && !/^[a-zA-Z0-9\s]+$/.test(product.description)) {
    errors.description = "Description can only contain alphanumeric characters";
  }

  return errors;
};
