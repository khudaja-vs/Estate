import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const {
    currentUser,
    loading: userLoading,
    error,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local States
  const [filePreview, setFilePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fallback image URL
  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  // 1. Cloudinary Image Upload Function
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local instant preview
    setFilePreview(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "e-state"); // Cloudinary Unsigned Preset Name

    try {
      setImageUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/rnfardu8/image/upload", // Cloudinary Cloud Name
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedData = await res.json();
      setImageUploading(false);

      if (uploadedData.secure_url) {
        // Avatar URL ko formData mein add kar rahe hain
        setFormData((prev) => ({ ...prev, avatar: uploadedData.secure_url }));
      } else {
        console.error("Cloudinary Upload Failed:", uploadedData);
      }
    } catch (err) {
      setImageUploading(false);
      console.error("Upload Error:", err);
    }
  };

  // 2. Input Fields Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Form Submit / Update Profile Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileUpload}
        />

        {/* Profile Picture / Avatar Display */}
        <div className="self-center relative flex flex-col items-center">
          <img
            onClick={() => fileRef.current.click()}
            src={filePreview || currentUser?.avatar || defaultAvatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer mt-2 border-2 border-slate-300 hover:opacity-90"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
          {imageUploading && (
            <p className="text-xs text-center text-slate-500 mt-1 font-medium">
              Uploading image...
            </p>
          )}
        </div>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        {/* Submit Button */}
        <button
          disabled={userLoading || imageUploading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
        >
          {userLoading ? "Loading..." : "Update"}
        </button>
      </form>

      {/* Account Actions */}
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer hover:underline">
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer hover:underline">
          Sign out
        </span>
      </div>

      {/* Response Messages */}
      {error && <p className="text-red-700 mt-5">{error}</p>}
      {updateSuccess && (
        <p className="text-green-700 mt-5 font-medium">
          User is updated successfully!
        </p>
      )}
    </div>
  );
}