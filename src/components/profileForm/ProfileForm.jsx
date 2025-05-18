import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextAuth/AuthContext";
import { toast } from "react-hot-toast";

const ProfileForm = () => {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchUserById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized access");
        logout();
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setPreview(data.user.image);
    } catch (err) {
      toast.error("Failed to fetch user");
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser?.id) {
      navigate("/login");
    } else {
      fetchUserById(localUser.id);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (user.userName)
      formData.append("userName", JSON.stringify(user.userName));
    if (user.address) formData.append("address", JSON.stringify(user.address));
    if (user.phone) formData.append("phone", user.phone);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`http://localhost:3000/users/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401 || res.status === 403) {
        toast.error("Unauthorized. Please login again.");
        logout();
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        await fetchUserById(user._id || user.id);

        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong during update");
    }
  };

  if (!user) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <form className="space-y-4 max-w-3xl mx-auto p-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Profile Overview</h2>

      <div
        className="flex items-center space-x-4"
        style={{ position: "relative" }}
      >
        <div className="avatar">
          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={preview || "/default-avatar.png"} alt="User Avatar" />
          </div>
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="userName.en"
          type="text"
          placeholder="First Name (EN)"
          className="input input-bordered w-full"
          value={user.userName?.en || ""}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              userName: { ...prev.userName, en: e.target.value },
            }))
          }
        />
        <input
          name="userName.ar"
          type="text"
          placeholder="الاسم (AR)"
          className="input input-bordered w-full"
          value={user.userName?.ar || ""}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              userName: { ...prev.userName, ar: e.target.value },
            }))
          }
        />
        <input
          name="address.en"
          type="text"
          placeholder="Address (EN)"
          className="input input-bordered w-full"
          value={user.address?.en || ""}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              address: { ...prev.address, en: e.target.value },
            }))
          }
        />
        <input
          name="address.ar"
          type="text"
          placeholder="العنوان (AR)"
          className="input input-bordered w-full"
          value={user.address?.ar || ""}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              address: { ...prev.address, ar: e.target.value },
            }))
          }
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="input input-bordered w-full"
          value={user.phone || ""}
          onChange={handleChange}
        />
        <input
          type="email"
          value={user.email}
          className="input input-bordered w-full bg-gray-100"
          disabled
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="btn bg-gray-400 text-white hover:bg-gray-500"
        >
          Update Profile
        </button>   
        <button
          type="button"
          onClick={() => navigate("/changePassword")}
          className="btn bg-gray-400 text-white hover:bg-gray-500"
          style={{ marginLeft: 10 }}
        >
          Change Password
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="btn bg-gray-400 text-white hover:bg-gray-500"
        style={{ bottom: "8%", right: "8%", position: "absolute" }}
      >
        Logout
      </button>
    </form>
  );
};

export default ProfileForm;
