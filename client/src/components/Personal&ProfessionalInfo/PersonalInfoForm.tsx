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

// Types

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

type PersonalTextFieldKey = keyof Omit<PersonalInfoData, "image">;

interface FormField {
  key: PersonalTextFieldKey;
  label: string;
  icon: LucideIcon;
  type: "text" | "email" | "tel" | "url";
  required?: boolean;
}

// components

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackGround,
}) => {
  //  text field handler

  const handleTextChange = (field: PersonalTextFieldKey, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  //  image handler

  const handleImageChange = (file: File) => {
    onChange({
      ...data,
      image: file,
    });
  };

  // form config

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
      <h3
        id="personal-info-heading"
        className="text-lg font-semibold text-gray-900"
      >
        Personal Information
      </h3>

      <p className="text-sm text-gray-600">
        Get started with your personal information
      </p>

      {/* image upload */}

      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300"
            />
          ) : (
            <div className="flex items-center gap-2 text-slate-600">
              <User className="size-10 p-2 border rounded-full" />
              <span className="text-sm">Upload profile image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageChange(e.target.files[0]);
              }
            }}
          />
        </label>

        {/* Background removal toggle */}
        {data.image instanceof File && (
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-gray-700">Remove Background</span>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only"
                checked={removeBackground}
                onChange={() => setRemoveBackGround((prev) => !prev)}
              />
              <div
                className={`w-9 h-5 rounded-full transition-colors ${
                  removeBackground ? "bg-purple-600" : "bg-slate-300"
                }`}
              />
              <span
                className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${
                  removeBackground ? "translate-x-4" : ""
                }`}
              />
            </label>
          </div>
        )}
      </div>

      {/*TEXT FIELDS*/}

      {fields.map((field) => {
        const Icon = field.icon;
        const value = data[field.key] ?? "";

        return (
          <div key={field.key} className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            <input
              type={field.type}
              value={value}
              onChange={(e) => handleTextChange(field.key, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </motion.section>
  );
};

export default PersonalInfoForm;
