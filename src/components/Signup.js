import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate, Link} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  // signup
  const signupUser = async (e) => {
    e.preventDefault();

    const promise = account.create(
      uuidv4(),
      user.email,
      user.password,
      user.name
    );
    promise.then(
      function (response) {
        console.log(response);
        navigate("/");
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="signin">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <label htmlFor="name"> Name </label>
            <input
              id="name"
              name="name"
              type="text"
              // className="block border border-grey-light w-full p-3 rounded mb-4"
              className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Full Name"
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
            />
            <label htmlFor="name"> Email </label>
            <input
              id="email"
              name="email"
              type="text"
              className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your Email"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
            <label htmlFor="name"> password </label>
            <input
            className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              
              placeholder="Enter Your Password"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />

            <button
            className="btnss"
              onClick={signupUser}
            >
              Sign in
            </button>
          </div>

          <div className="aacc">
            <div><p>Already have an account?</p></div>
           <div> <Link to="/"
            className="aaccc">
                Log in
            </Link> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
