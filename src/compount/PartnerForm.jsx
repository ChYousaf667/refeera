import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash"; // Import Lodash debounce
import {
  addPartner,
  getPartner,
  updatePartner,
  reset,
} from "../features/partners/partnerSlice";
import logo from "../assets/logo.png";

// Custom styles for AsyncSelect
const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    padding: "0.25rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      borderColor: "#93c5fd",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: "#374151",
    backgroundColor: state.isSelected
      ? "#bfdbfe"
      : state.isFocused
      ? "#e5e7eb"
      : "white",
  }),
};

// Optional: Custom debounce function (uncomment to use instead of Lodash)
// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

export default function PartnerForm() {
  const { partnerId } = useParams();
  const isEditMode = !!partnerId;

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message, selectedPartner } =
    useSelector((state) => state.partner);

  const [formData, setFormData] = useState({
    partner_name: isEditMode ? "" : user?.username || "",
    partner_email: isEditMode ? "" : user?.email || "",
    partner_number: "",
    partner_location: "",
    partner_state: "",
    partner_earning: "",
    contact_method: "",
    experience: [],
    experienceOther: "",
    currentlyPromote: "",
    promotionDetails: "",
    weeklyReach: "",
    languages: [],
    languageOther: "",
    weeklyHours: "",
    promotionMethod: "",
    zoomTraining: "",
    bonusEligible: "",
    selfie: null,
    referralCode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch partner data for editing
  useEffect(() => {
    if (isEditMode && partnerId) {
      dispatch(getPartner(partnerId));
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isEditMode, partnerId]);

  // Populate form with fetched partner data
  useEffect(() => {
    if (isEditMode && selectedPartner) {
      setFormData({
        partner_name: selectedPartner.partner_name || "",
        partner_email: selectedPartner.partner_email || "",
        partner_number: selectedPartner.partner_number || "",
        partner_location: selectedPartner.partner_location || "",
        partner_state: selectedPartner.partner_state || "",
        partner_earning: selectedPartner.partner_earning || "",
        contact_method: selectedPartner.contact_method || "",
        experience: selectedPartner.experience || [],
        experienceOther: selectedPartner.experienceOther || "",
        currentlyPromote: selectedPartner.currentlyPromote || "",
        promotionDetails: selectedPartner.promotionDetails || "",
        weeklyReach: selectedPartner.weeklyReach || "",
        languages: selectedPartner.languages || [],
        languageOther: selectedPartner.languageOther || "",
        weeklyHours: selectedPartner.weeklyHours || "",
        promotionMethod: selectedPartner.promotionMethod || "",
        zoomTraining: selectedPartner.zoomTraining || "",
        bonusEligible: selectedPartner.bonusEligible || "",
        selfie: null,
        referralCode: selectedPartner.referralCode || "",
      });
    }
  }, [selectedPartner, isEditMode]);

  // Fetch location suggestions from Nominatim API
  const loadOptions = debounce(async (inputValue, callback) => {
    if (!inputValue || inputValue.length < 2) {
      callback([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          inputValue
        )}&format=json&limit=10`,
        {
          headers: {
            "User-Agent": "Referrouls/1.0 (ahadqureshi16756@gmail.com)", // Replace with your app name and email
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const options = data.map((item) => ({
        label: item.display_name,
        value: item.display_name,
      }));
      callback(options);
    } catch (error) {
      console.error("Nominatim API error:", error);
      toast.error("Failed to fetch locations. Please try again.");
      callback([]);
    }
  }, 500);

  // Handle location change for AsyncSelect
  const handleLocationChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      partner_location: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const values = new Set(prev[name] || []);
        checked ? values.add(value) : values.delete(value);
        return {
          ...prev,
          [name]: Array.from(values),
        };
      });
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to add or update a partner");
      navigate("/auth");
      return;
    }

    // Validate required fields
    const requiredFields = [
      "partner_name",
      "partner_email",
      "partner_number",
      "partner_location",
      "partner_state",
      "partner_earning",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    const formDataToSend = new FormData();
    // Always include required fields
    requiredFields.forEach((key) => {
      formDataToSend.append(key, formData[key] || "");
    });
    // Include other fields if non-empty
    Object.keys(formData).forEach((key) => {
      if (!requiredFields.includes(key)) {
        if (key === "selfie" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            formDataToSend.append(`${key}[${index}]`, item);
          });
        } else if (
          formData[key] !== null &&
          formData[key] !== undefined &&
          formData[key] !== ""
        ) {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    if (isEditMode) {
      dispatch(updatePartner({ partnerId, partnerData: formDataToSend }));
    } else {
      dispatch(addPartner(formDataToSend));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(
        isEditMode
          ? "Partner updated successfully!"
          : "Partner added successfully!"
      );
      navigate("/");
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch, isEditMode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-10 overflow-y-auto max-h-screen">
          <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center border-b pb-4">
            {isEditMode ? "Edit Partner Profile" : "Become a Referra Partner"}
          </h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6 text-sm text-gray-700"
          >
            {[
              {
                name: "partner_name",
                type: "text",
                placeholder: "Partner Name",
                required: true,
              },
              {
                name: "partner_email",
                type: "email",
                placeholder: "Partner Email",
                required: true,
              },
              {
                name: "partner_number",
                type: "text",
                placeholder: "Partner Number",
                required: true,
              },
              {
                name: "partner_earning",
                type: "number",
                placeholder: "Partner Earning",
                required: true,
              },
              {
                name: "referralCode",
                type: "text",
                placeholder: "Referral Code",
              },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              />
            ))}
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions={false}
              onChange={handleLocationChange}
              value={
                formData.partner_location
                  ? {
                      label: formData.partner_location,
                      value: formData.partner_location,
                    }
                  : null
              }
              placeholder="Partner Location (e.g., Islamabad)"
              styles={customStyles}
              isClearable
              required
            />

            <select
              name="partner_state"
              value={formData.partner_state}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              name="contact_method"
              value={formData.contact_method}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            >
              <option value="">Preferred Contact Method</option>
              <option value="phone">Phone</option>
              <option value="text">Text</option>
              <option value="email">Email</option>
            </select>

            <div>
              <label className="block font-medium mb-1">
                Which best describes you?
              </label>
              {[
                "Rideshare or delivery driver",
                "Barber, stylist, or beauty professional",
                "Independent promoter or influencer",
                "Community volunteer or organizer",
                "Stay-at-home parent",
                "Retired individual",
                "Student",
              ].map((label) => (
                <label key={label} className="flex items-center">
                  <input
                    type="checkbox"
                    name="experience"
                    value={label}
                    checked={formData.experience.includes(label)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {label}
                </label>
              ))}
              <input
                type="text"
                name="experienceOther"
                value={formData.experienceOther}
                onChange={handleChange}
                placeholder="Other (specify)"
                className="w-full mt-2 rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <select
              name="currentlyPromote"
              value={formData.currentlyPromote}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            >
              <option value="">Do you currently promote services?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {formData.currentlyPromote === "yes" && (
              <textarea
                name="promotionDetails"
                placeholder="Please describe"
                value={formData.promotionDetails}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              />
            )}

            <select
              name="weeklyReach"
              value={formData.weeklyReach}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            >
              <option value="">How many people do you reach weekly?</option>
              {["1–10", "11–25", "26–50", "50+"].map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>

            <div>
              <label className="block font-medium mb-1">
                Languages you can promote in
              </label>
              {["English", "Spanish", "Haitian Creole", "French"].map(
                (lang) => (
                  <label key={lang} className="flex items-center">
                    <input
                      type="checkbox"
                      name="languages"
                      value={lang}
                      checked={formData.languages.includes(lang)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {lang}
                  </label>
                )
              )}
              <input
                type="text"
                name="languageOther"
                value={formData.languageOther}
                onChange={handleChange}
                placeholder="Other language (optional)"
                className="w-full mt-2 rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            {[
              {
                name: "weeklyHours",
                label: "How many hours/week for Referra?",
                options: ["1–5", "6–10", "11–20", "20+"],
              },
              {
                name: "promotionMethod",
                label: "Preferred promotion method",
                options: ["in-person", "online", "both"],
              },
              {
                name: "zoomTraining",
                label: "Willing to attend onboarding Zoom?",
                options: ["yes", "no"],
              },
              {
                name: "bonusEligible",
                label: "Interested in bonuses/rewards?",
                options: ["yes", "no"],
              },
            ].map(({ name, label, options }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                >
                  <option value="">Select</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div>
              <label className="block font-medium mb-1">Selfie</label>
              {isEditMode && selectedPartner?.selfie && (
                <div className="mb-2">
                  <p>Current Selfie:</p>
                  <img
                    src={`http://localhost:3003/${selectedPartner.selfie}`}
                    alt="Current Selfie"
                    className="max-w-xs mx-auto"
                  />
                </div>
              )}
              <input
                type="file"
                name="selfie"
                onChange={handleChange}
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            >
              {isLoading
                ? "Submitting..."
                : isEditMode
                ? "Update Partner"
                : "Submit"}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-b from-cyan-400 to-blue-500 text-white p-10 relative flex flex-col justify-center items-center">
          <img
            src={logo}
            alt="Referra Logo"
            className="w-24 absolute top-4 left-4 drop-shadow-xl"
          />
          <h2 className="text-3xl font-bold mb-3 mt-12 text-center drop-shadow-sm">
            {isEditMode ? "Update Your Profile!" : "Hello Partner!"}
          </h2>
          <p className="text-center max-w-xs mb-6 text-base">
            {isEditMode
              ? "Update your details to continue with Referra."
              : "Fill out the form to join Referra and start earning with flexibility and ease."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition font-medium shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
