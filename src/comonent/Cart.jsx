import React, { useEffect, useState } from "react";
import "../App.css";
function Cart() {
  const [orderProduct, setOrderProduct] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const existingItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (existingItem) {
      setOrderProduct(existingItem);
      calculateTotalAmount(existingItem);
    }
  }, []);

  const calculateTotalAmount = (selectedItem) => {
    let total = 0;
    selectedItem.forEach((item) => {
      total += (item.price || 0) * (item.quantity || 1);
    });
    setTotalAmount(total);
    localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    localStorage.setItem("totalAmount", JSON.stringify(total));
  };

  const handleIncrement = (id) => {
    const updatedOrderProduct = orderProduct.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 }; // Default quantity to 0 if not provided
      }
      return item;
    });
    setOrderProduct(updatedOrderProduct);
    calculateTotalAmount(updatedOrderProduct);
  };

  const handleDecrement = (id) => {
    const updatedOrderProduct = orderProduct.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setOrderProduct(updatedOrderProduct);
    calculateTotalAmount(updatedOrderProduct);
  };

  const handleCheckout = () => {
    // Log individual product details
    orderProduct.forEach((product) => {
      console.log(
        `${product.name}: Price - ${product.price}, Quantity - ${product.quantity}`
      );
    });

    // Store individual product details in localStorage
    localStorage.setItem("selectedItem", JSON.stringify(orderProduct));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  };

  function handledelete(id) {
    let deleteItem = orderProduct.filter((item) => {
      return item.id !== id;
    });
    setOrderProduct(deleteItem);
    localStorage.setItem("selectedItem", JSON.stringify(deleteItem));
  }
  return (
    <>
      <p className="cart_heading">Order Item</p>

      {orderProduct.map((item, index) => {
        return (
          <div key={index} className="cart_container">
            <img src={item.image} alt={item.name} />
            <div className="cart_specification">
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              <p className="cart_quantity">
                Quantity:
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="cart_button"
                >
                  +
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="cart_button"
                >
                  -
                </button>
              </p>
            </div>
            <button
              onClick={() => handledelete(item.id)}
              className="cart_delete"
            >
              {" "}
              Delete Item
            </button>
          </div>
        );
      })}

      <div className="cart_total_price">
        <p>Total Price: {totalAmount}</p>
      </div>
      <div className="cart_chechout_button">
        <button className="check_outsection" onClick={handleCheckout}>
          Confirm Order
        </button>{" "}
      </div>
    </>
  );
}

export default Cart;
