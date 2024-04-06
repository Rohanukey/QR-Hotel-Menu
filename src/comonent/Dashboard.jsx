import React, { useEffect, useState } from "react";

function Dashboard() {
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const checkoutData =
      JSON.parse(localStorage.getItem("selectedItem")) || [];
    setProduct(checkoutData);
    calculateTotalPrice(checkoutData);
  }, []);

  const calculateTotalPrice = (checkoutData) => {
    let total = 0;
    checkoutData.forEach((item) => {
      total += (item.price || 0) * (item.quantity || 1); // Default quantity to 1 if not provided
    });
    setTotalPrice(total);
  };

  return (
    <>
      <p>Dashboard </p>
      {product.map((item, idx) => (
        <div key={idx}>
          <p>{item.name}</p>
          <img src={item.image} alt={item.name} height={"250px"} />
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity || 1}</p>{" "}
          {/* Default quantity to 1 if not provided */}
        </div>
      ))}
      <p>Total Price: {totalPrice}</p>
    </>
  );
}

export default Dashboard;
