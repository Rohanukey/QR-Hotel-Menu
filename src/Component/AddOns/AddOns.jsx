import { useEffect, useState } from 'react';
import Css from "./AddOns.module.css"
import axios from 'axios';

function AddOns() {
    const url = "http://localhost:3000/addons/";
    const [addonList, setAddonList] = useState([]);
    const [addonForm, setAddonForm] = useState({
        Name: "",
        Price: "",
        Unit: "",
        Portion: ""
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
    };

    const closeform = () => {
        toggleFormVisibility();
        resetForm()
    }

    const resetForm = () => {
        setAddonForm({
            Name: "",
            Price: "",
            Unit: "",
            Portion: ""
        });
    };

    const fetchAddonList = async () => {
        try {
            const response = await axios.get(url);
            setAddonList(response.data);
        } catch (error) {
            console.error("Error fetching addon list:", error.message);
        }
    };

    useEffect(() => {
        fetchAddonList();
    }, []); // Only fetch addon list on initial render

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddonForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (addonForm.id) {
                await updateAddon(addonForm.id, addonForm);
            } else {
                await addAddon(addonForm);
            }
            alert("Data submitted successfully");
            fetchAddonList(); // Refresh addon list after adding/updating addon.
            toggleFormVisibility();
        } catch (error) {
            console.error("Error submitting addon:", error.message);
        }
    };


    const addAddon = async (addonData) => {
        try {
            await axios.post(url, addonData);
        } catch (error) {
            console.error("Error adding addon:", error.message);
        }
    };

    const updateAddon = async (id, addonData) => {
        try {
            await axios.put(`${url}${id}`, addonData);
        } catch (error) {
            console.error("Error updating addon:", error.message);
        }
    };

    const deleteAddon = async (id) => {
        const confirmation = window.confirm("Do you want to delete this item?");
        if (confirmation) {
            try {
                await axios.delete(`${url}${id}`);
                alert("Data deleted successfully");
                fetchAddonList(); // Refresh addon list after deleting addon
            } catch (error) {
                console.error("Error deleting addon:", error.message);
            }
        }
    };

    const editAddon = async (addonId) => {
        try {
            const response = await axios.get(`${url}${addonId}`);
            const addonData = response.data;

            // Update addon form state
            setAddonForm({
                ...addonForm,  // Preserve other form fields
                id: addonId,   // Set id field to identify the addon being edited
                Name: addonData.Name,
                Price: addonData.Price,
                Unit: addonData.Unit,
                Portion: addonData.Portion
            });

            // Open the form
            toggleFormVisibility();
        } catch (error) {
            console.error("Error editing addon:", error.message);
        }
    };



    return (
        <>
            <div className={Css.containWrapper}>
                <div className={Css.contain}>
                    <div className={Css.Add}>
                        <h2>Add-Ons</h2>
                        <button onClick={toggleFormVisibility}>Add</button>
                    </div>
                    <div className={Css.heading}>
                        <div className={Css.container}><h3>Name</h3></div>
                        <div className={Css.container}><h3>Price</h3></div>
                        <div className={Css.container}><h3>Portion</h3></div>
                    </div>
                    <ul>
                        {addonList.map((addon) => (
                            <div key={addon.id} className={Css.section}>
                                <div className={Css.items}>
                                    <div className={Css.container}><h4>{addon.Name}</h4></div>
                                    <div className={Css.container}><h4>{addon.Price}</h4></div>
                                    <div className={Css.container}><h4>{addon.Portion}{addon.Unit}</h4></div>
                                </div>
                                <div className={Css.options}>
                                    <img width="20" height="20" src="https://img.icons8.com/ios/50/pencil--v1.png" alt="Edit" onClick={() => editAddon(addon.id)} />
                                    <img width="20" height="20" src="https://img.icons8.com/ios/50/add-trash.png" onClick={() => deleteAddon(addon.id)} alt="Delete" />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            {isFormVisible && (
                <div className={`${Css.formWrapper}`}>
                    <form className={Css.form} onSubmit={handleSubmit}>
                        <div className={Css.cross} onClick={closeform}><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/multiply.png" alt="Close" /></div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={addonForm.Name}
                            onChange={handleInputChange}
                            name="Name"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={addonForm.Price}
                            onChange={handleInputChange}
                            name="Price"
                        />
                        <div className={Css.units}>
                            <input
                                type="number"
                                placeholder="Quantity in number"
                                value={addonForm.Portion}
                                onChange={handleInputChange}
                                name="Portion"
                            />
                            <select name='Unit' value={addonForm.Unit} onChange={handleInputChange}>
                                <option value="">Select Unit</option>
                                <option value={"grams"}>grams</option>
                                <option value={"kg"}>kg</option>
                                <option value={"ml"}>ml</option>
                            </select>
                        </div>
                        <div className={Css.btns}>
                            <button type="submit">{addonForm.id ? "Update" : "Add"}</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default AddOns;
