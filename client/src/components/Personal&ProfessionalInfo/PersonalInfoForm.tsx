import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  Camera,
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

type PersonalTextFieldKey = keyof Omit<PersonalInfoData, "image">;

interface FormField {
  key: PersonalTextFieldKey;
  label: string;
  icon: LucideIcon;
  type: "text" | "email" | "tel" | "url";
  placeholder: string;
  required?: boolean;
}

const fields: FormField[] = [
  {
    key: "full_name",
    label: "Full Name",
    icon: User,
    type: "text",
    placeholder: "John Doe",
    required: true,
  },
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
    type: "email",
    placeholder: "john@example.com",
    required: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    icon: Phone,
    type: "tel",
    placeholder: "+91 98765 43210",
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    type: "text",
    placeholder: "Mumbai, India",
  },
  {
    key: "profession",
    label: "Profession",
    icon: BriefcaseBusiness,
    type: "text",
    placeholder: "Frontend Engineer",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    type: "url",
    placeholder: "linkedin.com/in/username",
  },
  {
    key: "website",
    label: "Website",
    icon: Globe,
    type: "url",
    placeholder: "yourportfolio.com",
  },
];

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

  const imageUrl =
    data.image instanceof File
      ? URL.createObjectURL(data.image)
      : (data.image ?? null);

  return (
    <motion.section
      aria-labelledby="personal-info-heading"
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="border-b border-gray-100 pb-4">
        <h3
          id="personal-info-heading"
          className="text-base font-semibold text-gray-900"
        >
          Personal Information
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">
          Your basic details and contact information
        </p>
      </div>

      {/* Profile image */}
      <div className="flex items-center gap-5">
        <label
          htmlFor="profile-image"
          className="relative cursor-pointer group"
          aria-label="Upload profile image"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile preview"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-blue-400 transition-all">
              <User className="w-6 h-6 text-gray-400" aria-hidden="true" />
            </div>
          )}
          {/* Camera overlay on hover */}
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Camera className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <input
            id="profile-image"
            type="file"
            accept="image/png, image/jpeg"
            className="sr-only"
            onChange={(e) => {
              if (e.target.files?.[0]) handleImageChange(e.target.files[0]);
            }}
          />
        </label>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">
            Profile Photo
          </span>
          <span className="text-xs text-gray-400">
            PNG or JPG, recommended 400×400px
          </span>

          {/* Remove background toggle */}
          {data.image instanceof File && (
            <label
              htmlFor="remove-bg"
              className="flex items-center gap-2 mt-1 cursor-pointer"
            >
              <div className="relative">
                <input
                  id="remove-bg"
                  type="checkbox"
                  className="sr-only"
                  checked={removeBackground}
                  onChange={() => setRemoveBackGround((prev) => !prev)}
                />
                <div
                  className={`w-8 h-4 rounded-full transition-colors ${removeBackground ? "bg-[#1a1a18]" : "bg-gray-200"}`}
                />
                <span
                  className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${removeBackground ? "translate-x-4" : ""}`}
                />
              </div>
              <span className="text-xs text-gray-600">Remove background</span>
            </label>
          )}
        </div>
      </div>

      {/* Text fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1">
              <label
                htmlFor={field.key}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {field.label}
                {field.required && (
                  <span className="text-red-400" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
              <input
                id={field.key}
                type={field.type}
                value={data[field.key] ?? ""}
                onChange={(e) => handleTextChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                aria-required={field.required}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-300"
              />
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default PersonalInfoForm;
