import React, { useRef, useState } from "react";
import { FaCamera, FaUser } from "react-icons/fa";

const ProfileSettings = () => {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "admin@example.com",
    phone: "+91 XXXXX XXXXX",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    setProfile((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Profile data:", profile);

    // Call your update profile API here
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Profile Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your personal account information.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Profile Picture
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your profile photo.
          </p>

          <div className="mt-6 flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-100 ring-4 ring-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser className="text-5xl text-gray-400" />
                )}
              </div>

              {/* Camera button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                aria-label="Change profile photo"
              >
                <FaCamera className="text-sm" />
              </button>
            </div>

            {/* Upload section */}
            <div className="mt-4 text-center sm:mt-0 sm:text-left">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Change Photo
              </button>

              <p className="mt-2 text-xs text-gray-400">
                JPG, PNG or WEBP. Maximum size 5MB.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your personal information.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 outline-none"
              />

              <p className="mt-1.5 text-xs text-gray-400">
                Email changes require verification.
              </p>
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
