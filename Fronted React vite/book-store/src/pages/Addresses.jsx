import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Addresses.css";
import Footer from "../components/Footer";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../services/addressApi";


function Addresses() {

  const navigate = useNavigate();


  const [addresses, setAddresses] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });


  // GET ADDRESSES
  useEffect(() => {

    const fetchAddresses = async () => {

      try {

        const data = await getAddresses();

        setAddresses(data);

      } catch (error) {

        console.error(
          "Failed to fetch addresses:",
          error
        );

      }

    };

    fetchAddresses();

  }, []);


  // Input change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // ADD / EDIT ADDRESS
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        // UPDATE
        const updatedAddress = await updateAddress(
          editId,
          formData
        );

        setAddresses(
          addresses.map((address) =>
            address.id === editId
              ? updatedAddress
              : address
          )
        );

      } else {

        // ADD
        const newAddress = await addAddress(
          formData
        );

        setAddresses([
          ...addresses,
          newAddress,
        ]);

      }

      resetForm();

    } catch (error) {

      console.error(
        "Failed to save address:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to save address"
      );

    }

  };


  // Edit
  const handleEdit = (address) => {

    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });

    setEditId(address.id);

    setShowForm(true);

  };


  // DELETE ADDRESS
  const handleDelete = async (id) => {

    try {

      await deleteAddress(id);

      setAddresses(
        addresses.filter(
          (address) => address.id !== id
        )
      );

      if (selectedAddress === id) {

        setSelectedAddress(null);

      }

    } catch (error) {

      console.error(
        "Failed to delete address:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete address"
      );

    }

  };


  // Reset
  const resetForm = () => {

    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setEditId(null);

    setShowForm(false);

  };


  // Continue
  const handleContinue = () => {

    if (!selectedAddress) {

      alert("Please select an address.");

      return;

    }

    navigate("/checkout", {
      state: {
        addressId: selectedAddress,
      },
    });

  };


  return (

    <div className="addresses-page">

      <div className="addresses-container">


        {/* Header */}

        <div className="addresses-header">

          <div>

            <h1>
              Your Addresses
            </h1>

            <p>
              Select a delivery address for your order.
            </p>

          </div>

          <Link to="/cart">
            ← Back to Cart
          </Link>

        </div>


        {/* Add Address Button */}

        {!showForm && (

          <button
            className="add-address-btn"
            onClick={() => setShowForm(true)}
          >
            + Add New Address
          </button>

        )}


        {/* Address Form */}

        {showForm && (

          <div className="address-form-card">

            <h2>
              {editId
                ? "Edit Address"
                : "Add New Address"}
            </h2>


            <form onSubmit={handleSubmit}>


              <div className="form-row">

                <div className="address-form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />

                </div>


                <div className="address-form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />

                </div>

              </div>


              <div className="address-form-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House No., Street, Area"
                  required
                />

              </div>


              <div className="form-row">


                <div className="address-form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />

                </div>


                <div className="address-form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                </div>


                <div className="address-form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                  />

                </div>

              </div>


              <div className="form-actions">

                <button
                  type="submit"
                  className="save-address-btn"
                >
                  {editId
                    ? "Update Address"
                    : "Save Address"}
                </button>


                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              </div>


            </form>

          </div>

        )}


        {/* Address List */}

        <div className="address-list">


          {addresses.length === 0 ? (

            <div className="no-address">

              <div>
                📍
              </div>

              <h2>
                No Address Added
              </h2>

              <p>
                Add a delivery address to continue.
              </p>

            </div>

          ) : (

            addresses.map((address) => (

              <div
                className={`address-card ${
                  selectedAddress === address.id
                    ? "selected"
                    : ""
                }`}
                key={address.id}
              >


                <div className="address-top">


                  <div>

                    <h3>
                      {address.name}
                    </h3>

                    <span>
                      📞 {address.phone}
                    </span>

                  </div>


                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={
                      selectedAddress === address.id
                    }
                    onChange={() =>
                      setSelectedAddress(address.id)
                    }
                  />


                </div>


                <p>
                  {address.address}
                </p>


                <p>
                  {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>


                <div className="address-actions">


                  <button
                    onClick={() =>
                      handleEdit(address)
                    }
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(address.id)
                    }
                  >
                    Delete
                  </button>


                </div>


              </div>

            ))

          )}

        </div>


        {/* Continue */}

        {addresses.length > 0 && (

          <div className="address-footer">

            <button
              className="continue-btn"
              onClick={handleContinue}
            >
              Continue to Checkout →
            </button>

          </div>

        )}


      </div>

    </div>

  );

}


export default Addresses;