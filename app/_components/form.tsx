import { useState } from 'react';

export default function Form({release}) {

  const [formData, setFormData] = useState({
    username: '',
    packageName: '',
    tshirtSize: '',
    address: '',
    email: '',
    subscribe: false,
    release: release
  });

  const [showForm, setShowForm] = useState(true)

  const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    // Send the data to our API route
    const res = await fetch('/api/sendToGoogleSheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);

    setShowForm(false)


    // Reset form or handle next steps here
  };

  return (
    <>
    { showForm ? <form onSubmit={handleSubmit} className="flex flex-col items-center w-100">
      <h1>Release: {release}</h1>
      <input
        type="text"
        name="username"
        placeholder="Username for X/Twitter"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="text"
        name="packageName"
        placeholder="Name for Package"
        value={formData.packageName}
        onChange={handleChange}
      />
      <select name="tshirtSize" value={formData.tshirtSize} onChange={handleChange}>
        <option value="">Select T-Shirt Size</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
        <option value="XXXL">XXXL</option>

      </select>
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
    <label className="flex items-center justify-center m-5 font-black">
        <input
          type="checkbox"
          name="subscribe"
          id="checkbox"
          checked={formData.subscribe}
          onChange={handleChange}
        /> 
        Click To Subscribe!
    </label>
      <button id="submit" type="submit">Submit</button>
    </form> : <h1>Thank You For Submitting!</h1>}
    </>
  );
}