import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4012"; // Verify this matches your backend URL
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const handleApiError = (error) => {
    console.error("API Error: ", error.response ? error.response.data : error.message);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Fix: Correct token header format
            },
          }
        );
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Fix: Correct token header format
            },
          }
        );
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log("Food List Response:", response.data); // Debugging line
      setFoodList(response.data.data || []);
    } catch (error) {
      handleApiError(error);
    }
  };

  const loadCartData = async (token) => {
    try {
      if (!token) {
        console.error("Token is missing or invalid.");
        setCartItems({}); // Set cart to empty if no token
        return;
      }

      // console.log("Attempting to load cart data with token:", token);

      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fix: Correct token header format
          },
        }
      );

      if (response.data.success && response.data.cartData) {
        console.log("Cart data successfully loaded:", response.data.cartData);
        setCartItems(response.data.cartData);
      } else {
        console.warn("API responded with an error:", response.data.message || "Unknown error");
        setCartItems({}); // Fallback to empty cart
      }
    } catch (error) {
      console.error("Error occurred while loading cart data:", error.response?.data || error.message);
      setCartItems({}); // Fallback to empty cart
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`; // Fix: Set default header after token check
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
