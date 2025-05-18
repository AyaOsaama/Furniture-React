import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAuth/AuthContext";
import { toast } from "react-hot-toast";

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 mt-8 space-y-4">
      <h2 className="text-xl font-bold">Change Password</h2>

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

      <button type="submit" className="btn btn-primary w-full">
        Update Password
      </button>
    </form>
  );
};

export default ChangePassword;
