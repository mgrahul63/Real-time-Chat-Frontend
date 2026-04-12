import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { generateAvatar } from "../../utils/GenerateAvatar";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError } = useAuth();

  useEffect(() => {
    setAvatars(generateAvatar());
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedImage(file);
    setSelectedAvatar(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAvatar && !uploadedImage) {
      toast.error("Please select or upload an avatar");
      return;
    }

    try {
      setLoading(true);

      let photoURL;

      if (uploadedImage) {
        photoURL = await uploadToCloudinary(uploadedImage);
      }

      if (selectedAvatar !== null) {
        photoURL = avatars[selectedAvatar];
      }

      const profile = {
        displayName: username || currentUser?.displayName,
        photoURL,
      };

      await updateUserProfile(currentUser, profile);

      navigate("/");
    } catch (err) {
      toast.error("Failed to update profile");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-slate-900 px-4 pt-5 pb-10">
      {/* CARD */}
      <div className="w-full max-w-xl bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8  space-y-8">
        {/* TITLE */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Your Profile</h2>
          <p className="text-slate-400 text-sm">
            Choose an avatar or upload your own image
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* AVATARS */}
          <div>
            <h3 className="text-slate-300 mb-3 font-medium">Choose Avatar</h3>

            <div className="grid grid-cols-4 gap-3">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="avatar"
                  onClick={() => {
                    setSelectedAvatar(index);
                    setUploadedImage(null);
                  }}
                  className={classNames(
                    "w-16 h-16 rounded-full cursor-pointer border-2 transition transform hover:scale-105",
                    selectedAvatar === index
                      ? "border-sky-500 ring-2 ring-sky-400"
                      : "border-slate-600",
                  )}
                />
              ))}
            </div>
          </div>

          {/* UPLOAD */}
          <div>
            <h3 className="text-slate-300 mb-2 font-medium">Upload Image</h3>

            <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-lg border border-slate-700">
              <img
                className="h-10 w-10 rounded-full object-cover border border-slate-600"
                src={currentUser?.photoURL}
                alt="profile"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-slate-400 w-full cursor-pointer"
              />
            </div>
          </div>

          {/* PREVIEW */}
          {uploadedImage && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="preview"
                className="w-24 h-24 rounded-full border-2 border-sky-500"
              />
            </div>
          )}

          {/* USERNAME */}
          <div>
            <input
              type="text"
              placeholder="Enter Display Name"
              defaultValue={currentUser?.displayName}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900/40 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
