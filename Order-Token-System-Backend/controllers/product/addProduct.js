import Product from "../../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, priceType, price, description } = req.body;
    const outletId = req.outletId;
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

export default addProduct;

const validateProduct = (product) => {
  const errors = {};

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
