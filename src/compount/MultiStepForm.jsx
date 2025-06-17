import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  submitReferralForm,
  validateReferralLink,
  reset,
} from "../features/referral/referralSlice";
import logo from "../assets/logo.png";

const inputStyles =
  "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm";

export default function MultiStepForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    isLoading,
    isLinkValidated,
    isFormSubmitted,
    isError,
    message,
    isDisqualified,
  } = useSelector((state) => state.referral);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    medicaidMedicare: "",
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    country: "",
    dob: "",
    ssn: "",
    gender: "",
    hasSpouse: "",
    spouseFname: "",
    spouseLname: "",
    spouseSsn: "",
    enrollSpouse: "",
    referralId: "",
    partnerId: "",
    offerId: "",
  });
  const [errors, setErrors] = useState({});

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralId = params.get("referralId");
    const partnerId = params.get("partnerId");
    const offerId = params.get("offerId");
    console.log("Query params:", { referralId, partnerId, offerId });

    if (referralId && partnerId && offerId) {
      setFormData((prev) => ({
        ...prev,
        referralId,
        partnerId,
        offerId,
      }));
      dispatch(validateReferralLink(referralId));
    } else {
      console.error("Missing query parameters:", {
        referralId,
        partnerId,
        offerId,
      });
      toast.error("Invalid referral link");
      navigate("/");
    }
  }, [dispatch, navigate, location.search]);

  // Handle backend responses
  useEffect(() => {
    console.log("Redux state:", {
      isLoading,
      isLinkValidated,
      isFormSubmitted,
      isError,
      message,
      isDisqualified,
    });
    if (isError) {
      toast.error(message || "An error occurred");
      dispatch(reset());
    }
    if (isDisqualified) {
      toast.error("You are disqualified from this referral program");
      navigate("/");
      dispatch(reset());
    }
    if (isFormSubmitted) {
      toast.success("Form submitted successfully!");
      navigate("/");
      dispatch(reset());
    }
  }, [isError, isFormSubmitted, isDisqualified, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.medicaidMedicare) {
      newErrors.medicaidMedicare =
        "Please select if you are on Medicaid or Medicare";
    }
    if (!formData.fname) newErrors.fname = "First name is required";
    if (!formData.lname) newErrors.lname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNo) newErrors.phoneNo = "Phone number is required";
    if (!formData.referralId) newErrors.referralId = "Referral ID is required";
    if (!formData.partnerId) newErrors.partnerId = "Partner ID is required";
    if (!formData.offerId) newErrors.offerId = "Offer ID is required";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.country) newErrors.country = "Country is required";
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    else if (
      !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(formData.dob)
    ) {
      newErrors.dob = "Invalid date format (YYYY-MM-DD)";
    }
    if (!formData.ssn) newErrors.ssn = "Social Security Number is required";
    else if (!/^\d{3}-\d{2}-\d{4}$/.test(formData.ssn)) {
      newErrors.ssn = "Invalid SSN format (XXX-XX-XXXX)";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.hasSpouse)
      newErrors.hasSpouse = "Please select if you have a spouse";
    return newErrors;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (formData.hasSpouse === "yes") {
      if (!formData.spouseFname)
        newErrors.spouseFname = "Spouse first name is required";
      if (!formData.spouseLname)
        newErrors.spouseLname = "Spouse last name is required";
      if (!formData.spouseSsn) newErrors.spouseSsn = "Spouse SSN is required";
      else if (!/^\d{3}-\d{2}-\d{4}$/.test(formData.spouseSsn)) {
        newErrors.spouseSsn = "Invalid SSN format (XXX-XX-XXXX)";
      }
      if (!formData.enrollSpouse) {
        newErrors.enrollSpouse =
          "Please select if you want to enroll your spouse";
      }
    }
    return newErrors;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("handleNext called, step:", step, "formData:", formData);

    let newErrors = {};
    if (step === 1) newErrors = validateStep1();
    else if (step === 2) newErrors = validateStep2();
    else if (step === 3) newErrors = validateStep3();

    console.log("Validation errors:", newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (step === 1 && formData.medicaidMedicare === "yes") {
        console.log("Submitting partial form for medicaidMedicare=yes");
        const partialFormData = new FormData();
        [
          "medicaidMedicare",
          "fname",
          "lname",
          "email",
          "phoneNo",
          "referralId",
          "partnerId",
          "offerId",
        ].forEach((key) => {
          partialFormData.append(key, formData[key] || "");
        });
        partialFormData.append("isPartialSubmission", "true");
        console.log(
          "Partial form data to send:",
          Object.fromEntries(partialFormData)
        );

        try {
          const action = await dispatch(submitReferralForm(partialFormData));
          console.log("Submission action:", action);
          if (action.error) {
            console.error("Partial submission failed:", action.error);
            toast.error(action.payload || "Failed to submit partial form");
          } else {
            console.log("Partial submission response:", action.payload);
            // Rely on useEffect to handle isDisqualified or isFormSubmitted
          }
        } catch (error) {
          console.error("Unexpected error during partial submission:", error);
          toast.error("Unexpected error occurred");
        }
      } else {
        console.log("Proceeding to next step");
        setStep(step + 1);
        setErrors({});
      }
    } else {
      console.log("Validation failed, errors:", newErrors);
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called, formData:", formData);
    const step4Errors = validateStep4();
    if (Object.keys(step4Errors).length === 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append("isPartialSubmission", "false");
      console.log(
        "Full form data to send:",
        Object.fromEntries(formDataToSend)
      );
      try {
        const action = await dispatch(submitReferralForm(formDataToSend));
        if (action.error) {
          console.error("Full submission failed:", action.error);
          toast.error(action.payload || "Submission failed");
        }
      } catch (error) {
        console.error("Unexpected error during full submission:", error);
        toast.error("Unexpected error occurred");
      }
    } else {
      console.log("Validation failed, errors:", step4Errors);
      setErrors(step4Errors);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const getAnimationProps = (step) => ({
    initial: { x: step % 2 === 1 ? "-100%" : "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: step % 2 === 1 ? "100%" : "-100%", opacity: 0 },
    transition: { duration: 0.5 },
  });

  // Render only if link is validated or loading
  if (!isLinkValidated && !isLoading && !isError) {
    return null; // Prevent rendering until validation is complete
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            {...getAnimationProps(step)}
            className="w-full md:w-1/2 p-10 overflow-y-auto max-h-screen"
          >
            <h2 className="text-4xl font-bold text-blue-600 mb-8 text-center border-b pb-4">
              {step === 1
                ? "Personal Information"
                : step === 2
                ? "Address Information"
                : step === 3
                ? "Primary Applicant Details"
                : "Spouse Information"}
            </h2>
            <form
              onSubmit={
                step === 4 || (step === 3 && formData.hasSpouse === "no")
                  ? handleSubmit
                  : handleNext
              }
              className="space-y-6 text-sm text-gray-700"
            >
              {step === 1 && (
                <>
                  <div>
                    <label className="block font-medium mb-1">
                      Are you on Medicaid or Medicare?
                    </label>
                    <div className="flex space-x-4">
                      {["yes", "no"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="medicaidMedicare"
                            value={option}
                            checked={formData.medicaidMedicare === option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      ))}
                    </div>
                    {errors.medicaidMedicare && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.medicaidMedicare}
                      </p>
                    )}
                  </div>
                  <>
                    {[
                      {
                        name: "fname",
                        type: "text",
                        placeholder: "First Name",
                        required: true,
                      },
                      {
                        name: "lname",
                        type: "text",
                        placeholder: "Last Name",
                        required: true,
                      },
                      {
                        name: "email",
                        type: "email",
                        placeholder: "Email",
                        required: true,
                      },
                      {
                        name: "phoneNo",
                        type: "tel",
                        placeholder: "Phone Number",
                        required: true,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          className={inputStyles}
                        />
                        {errors[field.name] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                  <button
                    type="submit"
                    onClick={() => console.log("Next button clicked")}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Next"
                    )}
                  </button>
                  {step === 1 && Object.keys(errors).length > 0 && (
                    <div className="text-red-500 text-xs mt-4">
                      {errors.referralId && <p>{errors.referralId}</p>}
                      {errors.partnerId && <p>{errors.partnerId}</p>}
                      {errors.offerId && <p>{errors.offerId}</p>}
                    </div>
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  {[
                    {
                      name: "address",
                      type: "text",
                      placeholder: "Address",
                      required: true,
                    },
                    {
                      name: "city",
                      type: "text",
                      placeholder: "City",
                      required: true,
                    },
                    {
                      name: "state",
                      type: "text",
                      placeholder: "State",
                      required: true,
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      placeholder: "Postal Code",
                      required: true,
                    },
                    {
                      name: "country",
                      type: "text",
                      placeholder: "Country",
                      required: true,
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className={inputStyles}
                      />
                      {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/2 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Next"}
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div>
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="ssn"
                      placeholder="Social Security Number (XXX-XX-XXXX)"
                      value={formData.ssn}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                    {errors.ssn && (
                      <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>
                    )}
                  </div>
                  <div>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-medium mb-1">
                      Do you have a spouse?
                    </label>
                    <div className="flex space-x-4">
                      {["yes", "no"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="hasSpouse"
                            value={option}
                            checked={formData.hasSpouse === option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      ))}
                    </div>
                    {errors.hasSpouse && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.hasSpouse}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/2 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Submitting..."
                        : formData.hasSpouse === "no"
                        ? "Submit"
                        : "Next"}
                    </button>
                  </div>
                </>
              )}
              {step === 4 && formData.hasSpouse === "yes" && (
                <>
                  {[
                    {
                      name: "spouseFname",
                      type: "text",
                      placeholder: "Spouse Legal First Name",
                      required: true,
                    },
                    {
                      name: "spouseLname",
                      type: "text",
                      placeholder: "Spouse Legal Last Name",
                      required: true,
                    },
                    {
                      name: "spouseSsn",
                      type: "text",
                      placeholder: "Spouse SSN (XXX-XX-XXXX)",
                      required: true,
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        className={inputStyles}
                      />
                      {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label className="block font-medium mb-1">
                      Do you want to enroll your spouse?
                    </label>
                    <div className="flex space-x-4">
                      {["yes", "no"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="enrollSpouse"
                            value={option}
                            checked={formData.enrollSpouse === option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      ))}
                    </div>
                    {errors.enrollSpouse && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.enrollSpouse}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/2 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
        <div className="w-full md:w-1/2 bg-gradient-to-b from-cyan-400 to-blue-500 text-white p-10 relative flex flex-col justify-center items-center">
          <img
            src={logo}
            alt="Form Logo"
            className="w-24 absolute top-4 left-4 drop-shadow-xl"
          />
          <h2 className="text-3xl font-bold mb-3 mt-12 text-center drop-shadow-sm">
            {step === 1
              ? "Enter Your Details"
              : step === 2
              ? "Complete Your Address"
              : step === 3
              ? "Primary Applicant Info"
              : "Spouse Details"}
          </h2>
          <p className="text-center max-w-xs mb-6 text-base">
            {step === 1
              ? "Provide your personal information to get started."
              : step === 2
              ? "Enter your address details to continue."
              : step === 3
              ? "Provide your personal details and spouse information."
              : "Enter your spouse’s details to complete the form."}
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
