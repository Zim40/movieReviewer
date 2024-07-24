import { useState } from "react";
import Auth from "../utils/Auth";
import Button from "../Components/Button/button";

export default function Register() {
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const { token } = responseData.data;

      setFormData("");
      Auth.login(token);
    } catch (error) {
      console.error(`Error: `, error.message);
      setErrorText(error.message);
      setTimeout(() => {
        setErrorText("");
      }, 2500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="flex p-2 space-y-4 flex-col align-center items-center justify-center h-screen w-full">
      <div className="w-full border border-amber-400 rounded-lg p-4 md:w-1/4 space-y-6">
      <h1 className="text-xl text-amber-400 mb-10 tracking-widest font-mono font-bold border-b ">
              Register
            </h1>
        <div className="w-full">
          <label
            name="firstName"
            className="block text-amber-400 uppercase text-xs font-mono font-semibold tracking-widest"
          >
            First Name
          </label>
          <input
            type="text"
            inputMode="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="bg-slate-600 border border-amber-400 text-sm bg-opacity-50 w-full rounded-full mt-2 p-2"
          ></input>
        </div>
        <div className="w-full">
          <label
            name="lastName"
            className="block text-amber-400 uppercase text-xs font-mono font-semibold tracking-widest"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            inputMode="text"
            className="bg-slate-600 border border-amber-400 text-sm bg-opacity-50 w-full rounded-full mt-2 p-2"
          ></input>
        </div>
        <div className="w-full">
          <label className="block text-amber-400 uppercase text-xs font-mono font-semibold tracking-widest">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
            inputMode="text"
            className="bg-slate-600 border border-amber-400 text-sm bg-opacity-50 w-full rounded-full mt-2 p-2"
          ></input>
        </div>
        <div className="w-full">
          <label className="block text-amber-400 uppercase text-xs font-mono font-semibold tracking-widest">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
            inputMode="text"
            className="bg-slate-600 border border-amber-400 text-sm bg-opacity-50 w-full rounded-full mt-2 p-2"
          ></input>
        </div>
        <div className="w-full p-4">
          {errorText ? (
            <p className="text-red-400 font-semibold tracking-widest text-center">
              {errorText}!
            </p>
          ) : (
            <Button type="submit" text="Login" onClick={handleSubmit} />
          )}
        </div>
        </div>
    </form>
  );
}
