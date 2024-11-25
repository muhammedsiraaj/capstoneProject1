import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Add.css";
import uploadIcon from "../../assets/upload.png";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const defaultPreview = "https://via.placeholder.com/150";

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB. Please upload a smaller file.");
        return;
      }
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }
      setImage(file);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (data.price <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }
    if (data.name.trim().length < 3) {
      toast.error("Product name must be at least 3 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      const message =
        error.response?.data?.message || "Something went wrong. Please try again!";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="uploadIcon"
              src={image ? URL.createObjectURL(image) : uploadIcon || defaultPreview}
              alt="Upload"
            />
          </label>
          <input
            onChange={onImageChangeHandler}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Pasta">Pasta</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
              <option value="Rice">Rice</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

Add.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Add;
