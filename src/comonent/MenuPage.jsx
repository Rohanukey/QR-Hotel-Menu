import React, { useEffect, useState } from "react";
import f1 from "../assets/images/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg";
import f2 from "../assets/images/Gobi-Manchurian-cover-photo-on-white-tile-1-of-1.jpg";
import f3 from "../assets/images/Pizza-3007395.jpg";
import f4 from "../assets/images/margharita-pizza.webp";
import f5 from "../assets/images/Dosa-Recipe-3.jpg";
import f6 from "../assets/images/Soft-Spongy-Idli-Recipe-500x500.jpg";
import "../App.css";
import Aos from "aos";
import "aos/dist/aos.css";
function MenuPage() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out-cubic",
      once: true,
      
    });
  }, []);
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      image: f1,
      price: 300.0,
      category: "Pizza",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      image: f2,
      price: 350.0,
      category: "Pizza",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 3,
      name: "Classic Samosa",
      image: f3,
      price: 200.0,
      category: "Samosa",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 4,
      name: "Paneer Samosa",
      image: f4,
      price: 249.0,
      category: "Samosa",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 5,
      name: "Paneer Samosa",
      image: f5,
      price: 120.0,
      category: "Samosa",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 6,
      name: "Paneer Samosa",
      image: f6,
      price: 100.0,
      category: "Samosa",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 7,
      name: "Paneer Samosa",
      image: f6,
      price: 100.0,
      category: "Masala Dosa",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
    {
      id: 8,
      name: "Paneer Samosa",
      image: f6,
      price: 100.0,
      category: "Masala Dosa",
      description:
        "Margherita Pizza is a great product that includes a great amount vegetables.",
    },
  ];
  const [menuitem, setmenuitem] = useState(menuItems);
  console.log(menuitem);
  function handlesubmit(id) {
    const previous = JSON.parse(localStorage.getItem("selectedItem")) || [];
    const selectedItem = menuItems.find((item) => item.id === id);
    const obj = [...previous, selectedItem];
    localStorage.setItem("selectedItem", JSON.stringify(obj));
  }
  function handleClick(category) {
    if (category === "all") {
      setmenuitem(menuItems);
    } else {
      const filterData = menuItems.filter((item) => item.category === category);
      setmenuitem(filterData);
    }
  }
  return (
    <>
      {/* <p className="menu_heading">MenuPage </p> */}
      <div className="category_button">
        <button onClick={() => handleClick("all")} className="cato_button">
          Menu Item
        </button>
        <button onClick={() => handleClick("Samosa")} className="cato_button">
          Samosa
        </button>

        <button onClick={() => handleClick("Pizza")} className="cato_button">
          Pizza
        </button>
        <button
          onClick={() => handleClick("Masala Dosa")}
          className="cato_button"
        >
          Masala Dosa
        </button>
      </div>

      <div className="main_container">
        {menuitem.map((item, idx) => (
          <div key={idx} className="main_item_section" data-aos="fade-up">
            <img src={item.image} alt="" data-aos="zoom-in" />
            <div className="two_section">
              <p data-aos="fade-left">{item.name}</p>
              <p className="menu_item_description">{item.description}</p>
              <p className="menu_item_price"> Price : {item.price}</p>
              <div className="menu_item_button_container">
                {" "}
                <button
                  onClick={() => handlesubmit(item.id)}
                  className="menu_item_button"
                >
                  Order Now
                </button>{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MenuPage;
