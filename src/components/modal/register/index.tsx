import { useState } from "react";
import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserDocIfNotExists } from "../../../services/users";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await createUserDocIfNotExists(userCredential.user, {
        firstName,
        lastName,
        gender,
        dob,
      });

      onClose();
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">
          Join <span className="text-green-500 font-semibold">AthleX</span> and start your journey
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Photo URL
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Profile Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="https://example.com/photo.jpg"
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold"
          >
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="text-green-500 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
