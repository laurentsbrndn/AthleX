import { useState, useEffect } from "react";
import type { AddressInterface } from "../../../types/address";

interface Props {
  onClose: () => void;
  initialData?: Partial<AddressInterface>;
  onSave: (data: Omit<AddressInterface, "id" | "createdAt" | "updatedAt">) => void;
}

export const AddressForm = ({ onClose, initialData, onSave }: Props) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    street: initialData?.street || "",
    postal_code: initialData?.postal_code || "",
    district: initialData?.district || "",
    city: initialData?.city || "",
    province: initialData?.province || "",
    country: initialData?.country || "",
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      street: initialData?.street || "",
      postal_code: initialData?.postal_code || "",
      district: initialData?.district || "",
      city: initialData?.city || "",
      province: initialData?.province || "",
      country: initialData?.country || "",
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
  <div className="max-h-[70vh] overflow-y-auto pr-2 pl-2">
    <form onSubmit={handleSubmit} className="space-y-5 mt-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block text-gray-700 mb-1 font-medium capitalize">
            {key.replace("_", " ")}
          </label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900 placeholder-gray-400"
            placeholder={`Enter ${key.replace("_", " ")}`}
            required
          />
        </div>
      ))}

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition transform hover:scale-[1.02]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition transform hover:scale-[1.02]"
        >
          Save
        </button>
      </div>
    </form>
  </div>
);

};
