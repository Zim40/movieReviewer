import { useState } from "react";
import Auth from "../utils/Auth";
import Button from "../Components/Button/button";

export default function Login() {
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Error with Login");
      }
      const { token, user } = responseData.data;
      console.log(`User: ${user} Logged in!`);
      Auth.login(token);
    } catch (error) {
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
    <>
      <div className="flex align-center items-center  justify-center h-96">
        <form className="w-full">
          <div className="flex flex-col space-y-2 p-4 w-full lg:w-1/4 mt-auto">
            <h1 className="text-xl mb-10 tracking-widest font-mono font-bold border-b">
              Login
            </h1>
            <label className="uppercase text-xs font-mono font-semibold tracking-widest">
              Email
            </label>
            <input
              className="bg-slate-600 border border-amber-400 text-sm bg-opacity-50 w-full rounded-full p-3"
              placeholder="Enter Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex flex-col space-y-2 p-4 w-full lg:w-1/4">
            <label className="uppercase text-xs font-mono font-semibold tracking-widest">
              Password
            </label>
            <input
              className="bg-slate-600 border border-amber-400 text-sm bg-opacity-50 w-full rounded-full p-3"
              placeholder="Enter Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            ></input>
            <div>
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
          </div>
        </form>
      </div>
    </>
  );
}
