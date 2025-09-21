import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AddressInterface } from "../../../types/address";
import { AddressForm } from "../address";
import {
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "../../../services/address";

type Mode = "list" | "add" | "edit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  onSelectAddress?: (addr: AddressInterface) => void;
}

export const AddressManagement = ({ isOpen, onClose, uid, onSelectAddress }: Props) => {
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("list");
  const [selected, setSelected] = useState<AddressInterface | null>(null);

  useEffect(() => {
    if (isOpen) loadAddresses();
  }, [isOpen]);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const data = await getUserAddresses(uid);
      setAddresses(data);
    } catch (err) {
      console.error("Failed loading addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: Omit<AddressInterface, "id" | "createdAt" | "updatedAt">) => {
    await addUserAddress(uid, data);
    await loadAddresses();
    setMode("list");
  };

  const handleUpdate = async (
    id: string,
    data: Partial<Omit<AddressInterface, "id" | "createdAt" | "updatedAt">>
  ) => {
    await updateUserAddress(uid, id, data);
    await loadAddresses();
    setMode("list");
    setSelected(null);
  };

  const handleDelete = async (id: string) => {
    await deleteUserAddress(uid, id);
    await loadAddresses();
  };

  const handleUseAddress = (addr: AddressInterface) => {
    if (onSelectAddress) onSelectAddress(addr);
    onClose();
  };

  const handleSave = async (data: Omit<AddressInterface, "id" | "createdAt" | "updatedAt">) => {
    if (mode === "add") {
      await handleAdd(data);
    } else if (mode === "edit" && selected) {
      await handleUpdate(selected.id, data);
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
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
            >
              ✕
            </motion.button>

            {mode === "list" && (
              <>
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                  Your Addresses
                </h2>

                {loading ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : addresses.length === 0 ? (
                  <p className="text-center text-gray-500">No address yet</p>
                ) : (
                  <ul className="space-y-3 max-h-80 overflow-auto">
                    {addresses.map((addr) => (
                      <li
                        key={addr.id}
                        className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{addr.name}</p>
                          <p className="text-sm text-gray-600">
                            {addr.street}, {addr.city}, {addr.province}, {addr.postal_code}, {addr.country}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-2">
                            <button
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                              onClick={() => {
                                setSelected(addr);
                                setMode("edit");
                              }}
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            
                            {/* Tombol Delete */}
                            <button
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition"
                              onClick={() => handleDelete(addr.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                            
                            {/* Tombol Pilih */}
                            {onSelectAddress && (
                              <button
                                className="ml-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-semibold"
                                onClick={() => handleUseAddress(addr)}
                              >
                                Select
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}

                  </ul>
                )}

                <button
                  onClick={() => setMode("add")}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition transform hover:scale-[1.02]"
                >
                  Add Address
                </button>
              </>
            )}

            {/* <AddressForm
              isOpen={mode === "add" || mode === "edit"}
              onClose={() => setMode("list")}
              initialData={mode === "edit" && selected ? selected : undefined}
              onSave={handleSave}
            /> */}
            
            {(mode === "add" || mode === "edit") && (
  <AddressForm
    onClose={() => setMode("list")}
    initialData={mode === "edit" && selected ? selected : undefined}
    onSave={handleSave}
  />
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
