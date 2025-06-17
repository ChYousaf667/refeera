import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputWithIcon from "./InputWithIcon";
import logo from "../assets/logo.png";
import { registerBusiness, reset } from "../features/business/businessSlice";

export default function BusinessSignup({ setIsSignIn }) {
  const [formData, setFormData] = useState({
    businessName: "",
    primaryContact: "",
    businessAddress: "",
    phoneNumber: "",
    email: "",
    password: "",
    websiteOrSocialMedia: "",
    businessType: [],
    otherBusinessType: "",
    weeklyFootTraffic: "",
    hasPromotingEmployees: false,
    promotionalMaterials: [],
    onboardingCall: "",
    payoutMethod: "",
    offerServices: "",
    referralSource: "",
    referralPartner: "",
    isAuthorized: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const businessState = useSelector((state) => state.business || {});
  const { isLoading, isSuccess, isError, message } = businessState;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "businessType") {
      setFormData((prev) => ({
        ...prev,
        businessType: checked
          ? [...prev.businessType, value]
          : prev.businessType.filter((type) => type !== value),
      }));
    } else if (type === "checkbox" && name === "promotionalMaterials") {
      setFormData((prev) => ({
        ...prev,
        promotionalMaterials: checked
          ? [...prev.promotionalMaterials, value]
          : prev.promotionalMaterials.filter((material) => material !== value),
      }));
    } else if (type === "checkbox" && name === "hasPromotingEmployees") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "checkbox" && name === "isAuthorized") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.isAuthorized) {
      toast.error(
        "Please confirm you are authorized to register this business.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      return;
    }
    dispatch(registerBusiness(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful! Please sign in.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
      dispatch(reset());
    }
    if (isError) {
      toast.error(message || "An error occurred during registration.", {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(reset());
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 relative bg-gradient-to-b from-cyan-400 to-blue-500 text-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden rounded-t-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none">
        <div className="absolute top-1 left-1 flex items-center z-10">
          <img src={logo} alt="Referra Logo" className="w-16 md:w-24" />
        </div>
        <div className="absolute w-20 h-20 bg-white/20 rounded-full top-6 right-6 blur-2xl"></div>
        <div className="absolute w-10 h-10 bg-white/10 rounded-full top-24 left-10 blur-xl"></div>
        <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-[-24px] left-[-24px] blur-2xl"></div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-10 z-10 text-center">
          Welcome Back!
        </h2>
        <p className="text-center max-w-xs mb-4 z-10 text-sm">
          Already have a business account? Sign in to continue with Referra!
        </p>
        <button
          onClick={() => setIsSignIn(true)}
          className="border border-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-blue-600 transition z-10 text-sm"
        >
          Sign In
        </button>
      </div>

      {/* Sign Up Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-500 mb-4 text-center">
          Create a Business Account
        </h2>
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-4">
          {[FaFacebookF, FaGoogle, FaLinkedinIn].map((Icon, idx) => (
            <button
              key={idx}
              className="border rounded-full p-2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Icon className="text-sm sm:text-base md:text-lg" />
            </button>
          ))}
        </div>
        <p className="mb-4 text-gray-500 text-sm text-center">
          Or Signup Through Your Email
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-[24rem]">
          <InputWithIcon
            type="text"
            name="businessName"
            placeholder="Business Name"
            Icon={FaUser}
            value={formData.businessName}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="text"
            name="primaryContact"
            placeholder="Primary Contact"
            Icon={FaUser}
            value={formData.primaryContact}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="text"
            name="businessAddress"
            placeholder="Business Address"
            Icon={FaMapMarkerAlt}
            value={formData.businessAddress}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            Icon={FaPhone}
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="email"
            name="email"
            placeholder="Email"
            Icon={FaEnvelope}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="password"
            name="password"
            placeholder="Password"
            Icon={FaLock}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <InputWithIcon
            type="text"
            name="websiteOrSocialMedia"
            placeholder="Website or Social Media"
            Icon={FaGlobe}
            value={formData.websiteOrSocialMedia}
            onChange={handleChange}
          />
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Business Type
            </label>
            {[
              "Barbershop or salon",
              "Check-cashing / tax prep",
              "Retail / convenience store",
              "Medical / health services",
              "Immigration services",
              "Legal office",
              "Other",
            ].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  name="businessType"
                  value={type}
                  checked={formData.businessType.includes(type)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">{type}</label>
              </div>
            ))}
            {formData.businessType.includes("Other") && (
              <InputWithIcon
                type="text"
                name="otherBusinessType"
                placeholder="Specify Other Business Type"
                Icon={FaUser}
                value={formData.otherBusinessType}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Weekly Foot Traffic
            </label>
            <select
              name="weeklyFootTraffic"
              value={formData.weeklyFootTraffic}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Foot Traffic</option>
              <option value="0–50">0–50</option>
              <option value="50–150">50–150</option>
              <option value="150–500">150–500</option>
              <option value="500+">500+</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="hasPromotingEmployees"
              checked={formData.hasPromotingEmployees}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Has Promoting Employees
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Promotional Materials
            </label>
            {[
              "Window sticker",
              "Counter stand or flyers",
              "Door sign",
              "Digital display (TV or tablet QR code)",
            ].map((material) => (
              <div key={material} className="flex items-center">
                <input
                  type="checkbox"
                  name="promotionalMaterials"
                  value={material}
                  checked={formData.promotionalMaterials.includes(material)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">{material}</label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Willing to Attend Onboarding Call or Zoom Session
            </label>
            <select
              name="onboardingCall"
              value={formData.onboardingCall}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Payout Method
            </label>
            <select
              name="payoutMethod"
              value={formData.payoutMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Payout Method</option>
              <option value="Bank transfer">Bank transfer</option>
              <option value="Digital card">Digital card</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Offer Services
            </label>
            <select
              name="offerServices"
              value={formData.offerServices}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes – we’d like to become an offer partner">
                Yes – we’d like to become an offer partner
              </option>
              <option value="No – just referral traffic">
                No – just referral traffic
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Referral Source
            </label>
            <select
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Referral Source</option>
              <option value="Another business">Another business</option>
              <option value="Online">Online</option>
              <option value="Direct contact">Direct contact</option>
              <option value="Referred by another partner">
                Referred by another partner
              </option>
            </select>
          </div>
          {formData.referralSource === "Referred by another partner" && (
            <InputWithIcon
              type="text"
              name="referralPartner"
              placeholder="Referral Partner Name or Code"
              Icon={FaUser}
              value={formData.referralPartner}
              onChange={handleChange}
            />
          )}
          <div className="flex items-center mb-4 w-full">
            <input
              type="checkbox"
              name="isAuthorized"
              checked={formData.isAuthorized}
              onChange={handleChange}
              className="mr-2 w-4 h-4"
              required
            />
            <label className="text-sm text-gray-700">
              I am authorized to register this business
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
