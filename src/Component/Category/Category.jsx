import { useEffect, useState } from "react";
import styles from "./Categoty.module.css";
import axios from "axios";

const MenuForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "",
    preparationTime: "",
    availability: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [apidata, setApidata] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const url = "http://localhost:3000/MenuItems";

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(url);
      setApidata(response.data);
    } catch (error) {
      console.error("Error fetching MenuItems:", error.message);
    }
  };

  const postMenuItem = async () => {
    try {
      if (editIndex !== null) {
        await axios.put(`${url}/${apidata[editIndex].id}`, formData);
        const updatedApidata = [...apidata];
        updatedApidata[editIndex] = formData;
        setApidata(updatedApidata);
        alert("Data updated successfully");
      } else {
        const response = await axios.post(url, formData);
        setApidata([...apidata, response.data]);
        alert("Data added successfully");
      }
    } catch (error) {
      console.error("Error posting data:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormData({ ...formData, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = (index) => {
    const selectedItem = apidata[index];
    setFormData(selectedItem);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${url}/${apidata[index].id}`);
      const updatedApidata = [...apidata];
      updatedApidata.splice(index, 1);
      setApidata(updatedApidata);
      alert("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "name",
      "category",
      "description",
      "price",
      "unit",
      "image",
      "preparationTime",
      "availability",
    ];
    const isFormValid = requiredFields.every((field) => formData[field]);

    if (!isFormValid) {
      alert("Please fill in all the fields.");
      return;
    }
    postMenuItem();
    setFormData({
      image: "",
      name: "",
      category: "",
      description: "",
      price: "",
      unit: "",
      preparationTime: "",
      availability: "",
    });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = searchTerm
    ? apidata.filter((item) =>
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : apidata;

  return (
    <div className={styles.container}>
      <div className={styles.ContainWrapper}>
        <div>
          {/* <h1>Form</h1> */}
          {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.cross} onClick={() => setShowForm(false)}>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-outlined/24/multiply--v1.png"
                  alt="multiply--v1"
                />
              </div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Description:
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Unit:
                <input
                  type="number"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Preparation Time:
                <input
                  type="text"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Availability:
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label>
                Image:
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className={styles.input}
                />
              </label>
              <button type="submit" className={styles.button}>
                {editIndex !== null ? "Edit" : "Add"}
              </button>
            </form>
          )}
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.searchWrapper}>
            <h4>Filter by Category</h4>
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchbar}
            />
          </div>
          <button
            className={styles.clickbutton}
            onClick={() => setShowForm(true)}
          >
            click me
          </button>
        </div>
        <div className={styles.scroller}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Preparation Time</th>
                <th>Availability</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className={styles.itemWrapper}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.image}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.unit}</td>
                  <td>{item.preparationTime}</td>
                  <td>{item.availability}</td>
                  <td>
                    <img
                      src="https://img.icons8.com/sf-ultralight/25/pencil.png"
                      alt="Edit"
                      className={styles.actionIcon}
                      onClick={() => handleEdit(index)}
                    />
                    <img
                      src="https://img.icons8.com/sf-ultralight/25/filled-trash.png"
                      alt="Delete"
                      className={styles.actionIcon}
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;
