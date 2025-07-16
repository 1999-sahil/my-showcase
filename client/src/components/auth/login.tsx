import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { UserContext } from "@/context/userContext";
import { validateEmail } from "@/utils/helper";
import Logo from "../logo";
import { FaCaretRight } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loggedInRole, setLoggedInRole] = useState<string | null>(null);

  const { user, updateUser, setOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter valid credentials.");
      return;
    }

    if (!password) {
      setError("Please enter valid credentials.");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        setLoggedInRole(role); // trigger the redirect logic in useEffect
        setOpenAuthForm(false);

        // Redirect based on Role
        if (role === "admin") {
          setOpenAuthForm(false);
          navigate("/");
        }

        setOpenAuthForm(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        setError(message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // delays navigation to /admin/dashboard until the UserContext has finished updating and the user object is available.
  useEffect(() => {
    if (user?.role === "admin" && loggedInRole === "admin") {
      navigate("/");
    }
  }, [user, loggedInRole]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-neutral-50 dark:bg-neutral-900">
      <form
        onSubmit={handleLogin}
        className="rounded-md p-8 lg:p-12 m-auto bg-white dark:bg-neutral-900"
      >
        {/** Upper Intro Heading */}
        <div className="">
          <Logo />
          <h2 className="font-bold font-inter text-lg uppercase mt-2 text-[#111] dark:text-white">
            portfolio
          </h2>

          <p className="text-sm font-openSans text-neutral-600 dark:text-neutral-400 mt-3 mb-8">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <div className="flex flex-col gap-2 my-5">
          <label htmlFor="email" className="text-sm font-medium font-poppins dark:text-neutral-300">
            Email address
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter your email address"
            type="text"
            className="border rounded-md text-sm py-1 pl-2 font-openSans"
          />
        </div>

        <div className="flex flex-col gap-2 my-5">
          <label
            htmlFor="password"
            className="text-sm font-medium font-poppins dark:text-neutral-300"
          >
            Password
          </label>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter your password"
            type="password"
            className="border rounded-md text-sm py-1 pl-2 font-openSans"
          />
        </div>

        {error && <p className="my-3 text-xs text-rose-500 font-inter">{error}</p>}

        <button
          type="submit"
          className="flex items-center justify-center cursor-pointer gap-3 font-poppins font-medium rounded-md text-white dark:text-black hover:text-neutral-100 dark:hover:text-neutral-900 w-full py-1.5 mb-5 text-sm bg-[#212126] dark:bg-neutral-100"
        >
          Continue
          <FaCaretRight className="text-neutral-400" />
        </button>

        <span className="flex items-center justify-center gap-1 text-xs font-inter text-neutral-400 dark:text-neutral-500">
          <p className="hover:underline">Terms of use</p>
          <RxDividerVertical />
          <p className="hover:underline">Privacy Policy</p>
        </span>
      </form>
    </div>
  );
}

export default Login;
