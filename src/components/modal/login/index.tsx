import { useState } from "react";
import { auth} from "../../../config/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { createUserDocIfNotExists } from "../../../services/users";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserDocIfNotExists(userCredential.user);
      onClose();
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Email not found. Please register first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            initial={{ scale: 0.9, opacity: 0, y: -40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              ✕
            </motion.button>

            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Stay motivated with{" "}
              <span className="text-green-500 font-semibold">AthleX</span>
            </p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition transform hover:scale-[1.02]"
              >
                Login
              </button>
            </form>

            {/* Switch to Register */}
            <p className="mt-6 text-center text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
                className="text-green-500 cursor-pointer hover:underline font-medium"
              >
                Register
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}