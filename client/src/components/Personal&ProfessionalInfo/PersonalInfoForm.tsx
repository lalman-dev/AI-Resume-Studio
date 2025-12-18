import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  type LucideIcon,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface PersonalInfoData {
  image?: string | File;
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  profession?: string;
  linkedin?: string;
  website?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfoData;
  onChange: (updated: PersonalInfoData) => void;
  removeBackground: boolean;
  setRemoveBackGround: React.Dispatch<React.SetStateAction<boolean>>;
}

// Exclude "image" from text fields
type PersonalTextFieldKey = keyof Omit<PersonalInfoData, "image">;

interface FormField {
  key: PersonalTextFieldKey;
  label: string;
  icon: LucideIcon;
  type: "text" | "email" | "tel" | "url";
  required?: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackGround,
}) => {
  const handleTextChange = (field: PersonalTextFieldKey, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageChange = (file: File) => {
    onChange({ ...data, image: file });
  };

  const fields: FormField[] = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <motion.section
      aria-labelledby="personal-info-heading"
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h3
        id="personal-info-heading"
        className="text-lg font-semibold text-gray-900"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Personal Information
      </motion.h3>

      <motion.p
        className="text-sm text-gray-600"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Get started with your personal information
      </motion.p>

      {/* Image upload + toggle */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <label className="cursor-pointer">
          {data.image ? (
            <motion.img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="User profile"
              className="w-16 h-16 rounded-full object-cover mt-2 ring ring-slate-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="inline-flex items-center gap-2 mt-2 text-slate-600 hover:text-slate-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <User
                aria-hidden="true"
                className="size-10 p-2.5 border rounded-full"
              />
              <span className="text-sm">Upload User Image</span>
            </motion.div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                handleImageChange(e.target.files[0]);
              }
            }}
          />
        </label>

        {typeof data.image === "object" && (
          <motion.div
            className="flex flex-col gap-1 text-sm"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="font-medium text-gray-700">Remove Background</span>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackGround((prev) => !prev)}
                checked={removeBackground}
                aria-label="Toggle background removal"
              />
              <motion.div
                className="w-9 h-5 bg-slate-300 rounded-full transition-colors duration-200"
                animate={{
                  backgroundColor: removeBackground ? "#9333ea" : "#cbd5e1",
                }}
              />
              <motion.span
                className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"
                animate={{ x: removeBackground ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            </label>
          </motion.div>
        )}
      </motion.div>

      {/* Animated fields */}
      {fields.map((field, index) => {
        const Icon = field.icon;
        const value = data[field.key] ?? "";

        return (
          <motion.div
            key={field.key}
            className="space-y-1 mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleTextChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </motion.div>
        );
      })}
    </motion.section>
  );
};

export default PersonalInfoForm;
