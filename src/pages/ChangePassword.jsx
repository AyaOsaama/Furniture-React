import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAuth/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import background from "../components/SignUp/assets/background.png";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/changePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update password");
        if (res.status === 401 || res.status === 403) {
          logout();
          navigate("/login");
        }
        return;
      }

      toast.success(data.message);
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* الخلفية */}
      <div className="absolute inset-0">
        <img
          src={background}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* محتوى الفورم */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Change Password
          </h2>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            className="input input-bordered w-full"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="input input-bordered w-full"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            className="input input-bordered w-full"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn bg-[#3A5B22] text-white w-full hover:bg-[#2f4c1b]"
          >
            Update Password
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChangePassword;
