import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../features/products/useProducts"; 
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const { createProduct, isLoading, error: storeError } = useProducts();

  // Local State representing the Mongoose Product Schema fields
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    countInStock: "",
    category: "",
    image: "",
    description: "",
    isFeatured: false,
  });

  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handling Form Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setSuccessMessage("");

    // Simple validation before API call
    const { name, price, countInStock, category, image, description } = formData;
    if (!name || !price || !countInStock || !category || !image || !description) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    try {
      // Cast numerical inputs correctly to prevent CastError in MongoDB
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
      };

      const result = await createProduct(productPayload);

      if (result) {
        setSuccessMessage("Product created successfully! Redirecting...");
        
        // Reset local form state
        setFormData({
          name: "",
          price: "",
          countInStock: "",
          category: "",
          image: "",
          description: "",
          isFeatured: false,
        });

        // Redirect with a clean UX delay
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      }
    } catch (err) {
      console.error("Error during product creation:", err);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2 className="add-product-title">افزودن محصول</h2>

        {/* Global Store Errors & Client Validations */}
        {(validationError || storeError) && (
          <div className="add-product-alert error">
            {validationError || storeError}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="add-product-alert success">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Product Name */}
          <div className="add-product-group">
            <label htmlFor="name" className="add-product-label">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Ultra-wide Gaming Monitor"
              className="add-product-input"
              required
            />
          </div>

          <div className="add-product-row">
            {/* Price */}
            <div className="add-product-group">
              <label htmlFor="price" className="add-product-label">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 499.99"
                className="add-product-input"
                required
              />
            </div>

            {/* Count In Stock */}
            <div className="add-product-group">
              <label htmlFor="countInStock" className="add-product-label">Count In Stock *</label>
              <input
                type="number"
                id="countInStock"
                name="countInStock"
                min="0"
                value={formData.countInStock}
                onChange={handleInputChange}
                placeholder="e.g., 25"
                className="add-product-input"
                required
              />
            </div>
          </div>

          <div className="add-product-row">
            {/* Category */}
            <div className="add-product-group">
              <label htmlFor="category" className="add-product-label">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics"
                className="add-product-input"
                required
              />
            </div>

            {/* Image URL */}
            <div className="add-product-group">
              <label htmlFor="image" className="add-product-label">Image URL *</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="e.g., https://example.com/image.jpg"
                className="add-product-input"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="add-product-group">
            <label htmlFor="description" className="add-product-label">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description of the product..."
              className="add-product-textarea"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Featured Checkbox */}
          <div className="add-product-checkbox-wrapper">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="add-product-checkbox"
            />
            <label htmlFor="isFeatured" className="add-product-checkbox-label">
              Mark as Featured Product
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="add-product-btn"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
