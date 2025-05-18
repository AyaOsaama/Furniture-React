import React, { use } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./assets/background.png";
import secondBackground from "./assets/firstBackground.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Login } from "../../servicesAuth/authService";
import { useAuth } from "../../contextAuth/AuthContext";


function SignIn() {
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
const navigate = useNavigate();
const {login}=useAuth();



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true, 
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
onSubmit: async (values, { resetForm, setSubmitting }) => {
  try {
    const result = await Login(values); 
    console.log("Login successful:", result);

if (result.token) {
  login(result); 
  navigate("/");
}


    setSuccessMessage("Login successful!");
    setErrorMessage(null);
    resetForm();
    
  } catch (error) {
  const msg =
    error?.response?.data?.message ||
    error?.message ||
    "Invalid email or password.";

  if (msg.toLowerCase().includes("confirm your email")) {
    setErrorMessage("Please verify your email before logging in.");
  } else {
    setErrorMessage(msg);
  }


  setSuccessMessage(null);
}
finally {
    setSubmitting(false);
  }

  setTimeout(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, 3000);
}

  });
   const handleSignUp = () => {
    // setSuccessMessage(null);
    // setErrorMessage(null);
    navigate("/signup");
  };

  return (
    <motion.div
  initial={{ opacity: 0 ,x:-20}}
  animate={{ opacity: 1 ,x:0}}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
  className="no-scrollbar overflow-hidden"
>
<div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
      {/* Left side - Form + خلفية في الموبايل */}
      <div className="relative w-full md:w-2/3 flex items-center justify-center min-h-screen md:h-screen overflow-hidden">
        {/* الخلفية في الشاشات الصغيرة */}
        <div
          className="absolute inset-0 w-full h-full md:hidden"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* الفورم */}
        <div className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-20 w-full max-w-full h-full overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6 mt-10 md:mt-0">
            Welcome back!
          </h1>
          <p className="mb-6">Enter your credentials to access your account</p>

          <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <p className="text-sm mb-2 font-semibold">Email Address</p>
              <input
                type="text"
                name="email"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered w-full mb-2 rounded-[12px]"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Password</p>
                <a className="text-sm font-semibold text-blue-600 cursor-pointer">
                  Forget Password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered w-full rounded-[12px]"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
                className="checkbox"
              />
              <label className="ml-2 text-sm">Remember for 30 days</label>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="alert alert-success mb-4 transition-opacity duration-500 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-error mb-4 transition-opacity duration-500 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12A9 9 0 1112 3a9 9 0 0112 9z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn bg-[#3A5B22] text-white w-full max-w-md mb-4 rounded-[12px]"
            >
              {formik.isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <div className="divider">OR</div>

            <div className="flex w-full max-w-md gap-4 mb-4">
              <button className="flex-1 btn bg-white text-black border-[#e5e5e5] h-12">
                Login with Google
              </button>
              <button className="flex-1 btn bg-black text-white border-black h-12">
                Login with Apple
              </button>
            </div>

            <div className="w-full flex justify-center mb-10 md:mb-0 mt-10">
              <p className="font-sans font-bold text-sm text-center px-10">
                Don’t have an account?{" "}
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={handleSignUp}
                  type="button"
                >
                  Sign Up
                </button>

              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - صورة تظهر فقط في الشاشات الكبيرة */}
      <div className="hidden md:block w-full md:w-2/2 h-full">
        <img
          src={secondBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
      </motion.div>
  );
}

export default SignIn;
