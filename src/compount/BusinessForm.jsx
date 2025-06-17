import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addPartner, reset } from "../features/partners/partnerSlice";
import logo from "../assets/logo.png";

export default function BusinessForm() {
  const [formData, setFormData] = useState({
    business_name: "",
    primary_contact: "",
    business_address: "",
    phone_number: "",
    email_address: "",
    website_social: "",
    business_type: [],
    business_type_other: "",
    weekly_foot_traffic: "",
    employees_promote: "",
    promotional_materials: [],
    onboarding_call: "",
    payout_method: "",
    offer_services: "",
    referral_source: "",
    referral_partner: "",
    authorized: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message, partnerFormData } = useSelector(
    (state) => state.partner
  );

  // Log partnerFormData to verify it's available
  useEffect(() => {
    console.log("PartnerFormData in BusinessForm:", partnerFormData);
  }, [partnerFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name !== "authorized") {
      setFormData((prev) => {
        const values = new Set(prev[name] || []);
        checked ? values.add(value) : values.delete(value);
        return {
          ...prev,
          [name]: Array.from(values),
        };
      });
    } else if (type === "checkbox" && name === "authorized") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to add a business");
      navigate("/auth");
      return;
    }
    if (!formData.authorized) {
      toast.error("Please confirm you are authorized to represent this business");
      return;
    }
    if (!partnerFormData) {
      toast.error("Please complete the partner form first");
      navigate("/partner");
      return;
    }

    // Validate required business fields
    const requiredFields = [
      "business_name",
      "primary_contact",
      "business_address",
      "phone_number",
      "email_address",
      "weekly_foot_traffic",
      "employees_promote",
      "onboarding_call",
      "payout_method",
      "offer_services",
      "referral_source",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    // Combine partner and business form data
    const combinedData = new FormData();
    // Add partner form data
    Object.keys(partnerFormData).forEach((key) => {
      if (key === "selfie" && partnerFormData[key]) {
        combinedData.append(key, partnerFormData[key]);
      } else if (Array.isArray(partnerFormData[key])) {
        partnerFormData[key].forEach((item, index) => {
          combinedData.append(`${key}[${index}]`, item);
        });
      } else if (partnerFormData[key] !== null && partnerFormData[key] !== undefined && partnerFormData[key] !== "") {
        combinedData.append(key, partnerFormData[key]);
      }
    });
    // Add business form data
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          combinedData.append(`${key}[${index}]`, item);
        });
      } else if (formData[key] !== null && formData[key] !== undefined) {
        combinedData.append(key, formData[key]);
      }
    });

    // Log combined data
    console.log("Combined Data for Submission:", combinedData);

    dispatch(addPartner(combinedData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("Business application submitted successfully!");
      navigate("/");
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-gradient-to-b from-cyan-400 to-blue-500 text-white p-10 relative flex flex-col justify-center items-center">
          <img
            src={logo}
            alt="Referra Logo"
            className="w-24 absolute top-4 left-4 drop-shadow-xl"
          />
          <h2 className="text-3xl font-bold mb-3 mt-12 text-center drop-shadow-sm">
            Hello Business Partner!
          </h2>
          <p className="text-center max-w-xs mb-6 text-base">
            Fill out the form to join Referra and start promoting with ease.
          </p>
          <button
            onClick={() => navigate("/")}
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition font-medium shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>
        <div className="w-full md:w-1/2 p-10 overflow-y-auto max-h-screen">
          <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center border-b pb-4">
            Become a Referra Business Partner
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-sm text-gray-700"
          >
            {[
              "business_name",
              "primary_contact",
              "business_address",
              "phone_number",
              "email_address",
              "website_social",
            ].map((field) => (
              <input
                key={field}
                type={
                  field === "email_address"
                    ? "email"
                    : field === "phone_number"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                required={["business_name", "primary_contact", "business_address", "phone_number", "email_address"].includes(field)}
              />
            ))}

            <div>
              <label className="block font-medium mb-1">Type of Business</label>
              {[
                "Barbershop or salon",
                "Check-cashing / tax prep",
                "Retail / convenience store",
                "Medical / health services",
                "Immigration services",
                "Legal office",
              ].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    name="business_type"
                    value={type}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
              <input
                type="text"
                name="business_type_other"
                value={formData.business_type_other}
                onChange={handleChange}
                placeholder="Other (specify)"
                className="w-full mt-2 rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <select
              name="weekly_foot_traffic"
              value={formData.weekly_foot_traffic}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            >
              <option value="">Estimated weekly foot traffic?</option>
              {["0–50", "50–150", "150–500", "500+"].map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>

            <select
              name="employees_promote"
              value={formData.employees_promote}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            >
              <option value="">Employees promote Referra?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <div>
              <label className="block font-medium mb-1">Promotional materials supported</label>
              {[
                "Window sticker",
                "Counter stand or flyers",
                "Door sign",
                "Digital display (TV or tablet QR code)",
              ].map((material) => (
                <label key={material} className="flex items-center">
                  <input
                    type="checkbox"
                    name="promotional_materials"
                    value={material}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {material}
                </label>
              ))}
            </div>

            <select
              name="onboarding_call"
              value={formData.onboarding_call}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            >
              <option value="">Willing to attend onboarding call?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              name="payout_method"
              value={formData.payout_method}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            >
              <option value="">Preferred payout method</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="digital_card">Digital Card</option>
            </select>

            <select
              name="offer_services"
              value={formData.offer_services}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            >
              <option value="">Offer services as Referra offers?</option>
              <option value="yes">Yes – we’d like to become an offer partner</option>
              <option value="no">No – just referral traffic</option>
            </select>

            <select
              name="referral_source"
              value={formData.referral_source}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            >
              <option value="">How did you hear about Referra?</option>
              <option value="another_business">Another Business</option>
              <option value="online">Online</option>
              <option value="direct_contact">Direct Contact</option>
              <option value="referred_by_partner">Referred by Another Partner</option>
            </select>

            {formData.referral_source === "referred_by_partner" && (
              <input
                type="text"
                name="referral_partner"
                value={formData.referral_partner}
                onChange={handleChange}
                placeholder="Referred by (name or code)"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              />
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                name="authorized"
                checked={formData.authorized}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-medium">
                I confirm I am authorized to represent this business and agree
                to use Referra-approved materials only.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}