import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const addProductToCart = (product) => {
    if (cart[product.id]) {
      updateQuantity(product.id, "increase");
      return;
    }
    setCart((prevCart) => {
      const updatedCart = { ...prevCart, [product.id]: product };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeProductFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {
        if (operation === "increase") {
          if (!updatedCart[productId].quantity) {
            updatedCart[productId].quantity = 2;
          } else {
            updatedCart[productId].quantity++;
          }
        } else {
          updatedCart[productId].quantity--;
          if (updatedCart[productId].quantity <= 0) {
            delete updatedCart[productId];
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
