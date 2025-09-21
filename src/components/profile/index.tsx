import { useState } from "react";
import type { ProfileInterface } from "../../types/profile";

interface ProfileComponentProps {
  initialData: ProfileInterface;
  onUpdate: (data: ProfileInterface) => void;
}

export const ProfileComponent = ({ initialData, onUpdate }: ProfileComponentProps) => {
  const [profile, setProfile] = useState<ProfileInterface>(initialData);

  const handleChange = (field: keyof ProfileInterface, value: string) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    onUpdate(updated);
  };

  return (
    <div className="mt-10 max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl space-y-4">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>

      {/* Email (disabled) */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">Email</label>
        <input
          type="email"
          value={profile.email}
          disabled
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* First Name */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">First Name</label>
        <input
          type="text"
          value={profile.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">Last Name</label>
        <input
          type="text"
          value={profile.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">Gender</label>
        <select
          value={profile.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium">Date of Birth</label>
        <input
          type="date"
          value={profile.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
      </div>
    </div>
  );
};
