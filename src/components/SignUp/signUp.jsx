import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import background from "./assets/background.png";
import secondBackground from "./assets/firstBackground.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./assets/auth.css";
import { Registration } from "../../servicesAuth/authService";

function SignUp() {
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: {
        en: "",
        ar: "",
      },
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.object().shape({
        en: Yup.string().required("Name is required"),
        ar: Yup.string().required("الاسم بالعربية مطلوب"),
      }),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const result = await Registration(values);
        setSuccessMessage("Registration successful!");
        setErrorMessage(null);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
  console.error("Registration error:", error?.response?.data?.message);
  const message = error?.response?.data?.message;
  setErrorMessage(
    typeof message === "string"
      ? message
      : typeof message === "object"
        ? JSON.stringify(message)
        : "Registration failed."
  );
  setSuccessMessage(null);
}

    },
  });

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="no-scrollbar overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
        {/* Background for mobile */}
        <div className="relative w-full md:w-2/3 flex items-center justify-center min-h-screen md:h-screen overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full md:hidden"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Form Area */}
          <div className="relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-10 md:px-20 w-full max-w-full h-full overflow-y-auto">
            <h1 className="text-4xl font-bold mb-6 mt-10 md:mt-0">
              Get Started Now
            </h1>

            <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">Name (English)</p>
                <input
                  type="text"
                  name="userName.en"
                  placeholder="Enter your name"
                  value={formik.values.userName.en}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-4 rounded-[12px]"
                />
                {formik.touched.userName?.en && formik.errors.userName?.en && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.userName.en}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">
                  الاسم باللغة العربية
                </p>
                <input
                  type="text"
                  name="userName.ar"
                  placeholder="أدخل اسمك بالعربية"
                  value={formik.values.userName.ar}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-4 rounded-[12px]"
                />
                {formik.touched.userName?.ar && formik.errors.userName?.ar && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.userName.ar}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold">Email Address</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-4 rounded-[12px]"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm mb-2 font-semibold">Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full mb-6 rounded-[12px]"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {successMessage && (
                <div className="alert alert-success mb-4" role="alert">
                  <svg
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-error mb-4" role="alert">
                  <svg
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01"
                    />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`btn bg-[#3A5B22] text-white w-full max-w-md mb-4 rounded-[12px] ${
                  formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
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
                  Already have an account?{" "}
                  <button
                    onClick={handleSignIn}
                    className="text-blue-600 underline hover:text-blue-800"
                    type="button"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Background for larger screens */}
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

export default SignUp;
