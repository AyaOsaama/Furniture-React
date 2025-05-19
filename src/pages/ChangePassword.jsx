import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAuth/AuthContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation("changepassword");

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
      toast.error(t("errorPasswordMismatch"));
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
        toast.error(data.message || t("errorUpdateFailed"));
        if (res.status === 401 || res.status === 403) {
          logout();
          navigate("/login");
        }
        return;
      }

      toast.success(data.message);
      navigate("/profile");
    } catch (error) {
      toast.error(t("errorSomethingWentWrong"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 mt-8 space-y-4">
      <h2 className="text-xl font-bold">{t("title")}</h2>

      <input
        type="password"
        name="oldPassword"
        placeholder={t("oldPasswordPlaceholder")}
        className="input input-bordered w-full"
        value={form.oldPassword}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="newPassword"
        placeholder={t("newPasswordPlaceholder")}
        className="input input-bordered w-full"
        value={form.newPassword}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder={t("confirmPasswordPlaceholder")}
        className="input input-bordered w-full"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn btn-primary w-full">
        {t("updateButton")}
      </button>
    </form>
  );
};

export default ChangePassword;
