import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { AddressManagement } from "../modal/address_management";
import type { AddressInterface } from "../../types/address";

interface NavbarProps {
  onLoginClick: () => void;
}

export const Navbar = ({ onLoginClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [_selectedAddress, setSelectedAddress] = useState<AddressInterface | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="text-3xl font-bold cursor-pointer">
            Athle<span className="text-green-400">X</span>
          </div>

          {/* Menu - Desktop */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            {["/", "/products", "/workouts", "/meal-plans"].map((path, idx) => {
              const labels = ["Home", "Products", "Workouts", "Meal Plans"];
              return (
                <li key={idx}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `relative pb-1 transition duration-300 ${
                        isActive
                          ? "text-green-400 font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-400 after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                          : "hover:text-green-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                      }`
                    }
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-6 relative">
            {!user ? (
              <button
                onClick={onLoginClick}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
              >
                Login
              </button>
            ) : (
              <>
                <NavLink
                  to="/transaction-history"
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 text-lg transition-colors duration-300 ${
                      isActive ? "text-green-500 font-semibold" : "text-white hover:text-green-400"
                    }`
                  }
                >
                  <i className="bi bi-receipt text-xl"></i>
                </NavLink>

                <button
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-2 text-lg text-gray-300 hover:text-green-400 transition-colors"
                >
                  <i className="bi bi-geo-alt"></i>
                </button>

                <NavLink
                  to="/carts"
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 text-lg transition-colors duration-300 ${
                      isActive ? "text-green-500 font-semibold" : "text-white hover:text-green-400"
                    }`
                  }
                >
                  <i className="bi bi-cart text-xl"></i>
                </NavLink>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        className="w-10 h-10 rounded-full border-2 border-green-500"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Icons + Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            {/* User icons on mobile */}
            {user && (
              <>
                <NavLink
                  to="/transaction-history"
                  className={({ isActive }) =>
                    `relative flex items-center text-lg transition-colors duration-300 ${
                      isActive ? "text-green-500" : "text-white hover:text-green-400"
                    }`
                  }
                >
                  <i className="bi bi-receipt text-xl"></i>
                </NavLink>

                <button
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center text-lg text-white hover:text-green-400 transition-colors"
                >
                  <i className="bi bi-geo-alt text-xl"></i>
                </button>

                <NavLink
                  to="/carts"
                  className={({ isActive }) =>
                    `relative flex items-center text-lg transition-colors duration-300 ${
                      isActive ? "text-green-500" : "text-white hover:text-green-400"
                    }`
                  }
                >
                  <i className="bi bi-cart text-xl"></i>
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `relative flex items-center text-lg transition-colors duration-300 ${
                      isActive ? "text-green-500" : "text-white hover:text-green-400"
                    }`
                  }
                >
                  <i className="bi bi-person-circle"></i>
                </NavLink>
              </>
            )}

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800">
          {/* Main Links */}
          <Link to="/" className="block hover:text-green-400 cursor-pointer">
            Home
          </Link>
          <Link to="/products" className="block hover:text-green-400 cursor-pointer">
            Products
          </Link>
          <Link to="/workouts" className="block hover:text-green-400 cursor-pointer">
            Workouts
          </Link>
          <Link to="/meal-plans" className="block hover:text-green-400 cursor-pointer">
            Meal Plans
          </Link>

          {/* Login / Logout */}
          {!user ? (
            <button
              onClick={onLoginClick}
              className="w-full bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Address Modal */}
      {user && (
        <AddressManagement
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          uid={user.uid}
          onSelectAddress={(addr) => setSelectedAddress(addr)}
        />
      )}
    </nav>
  );
}