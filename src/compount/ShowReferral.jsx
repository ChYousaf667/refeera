import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateReferralLink, reset } from "../features/referral/referralSlice";
import { getPartner } from "../features/partners/partnerSlice";

const ShowReferral = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { referralLink, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.referral
  );
  const {
    selectedPartner,
    isLoading: partnerLoading,
    isError: partnerError,
    message: partnerMessage,
  } = useSelector((state) => state.partner);
  const [offerId, setOfferId] = useState("aca");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      dispatch(getPartner(user._id));
    }
    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (partnerError && partnerMessage.includes("Partner not found")) {
      navigate("/partner-registration");
    }
  }, [partnerError, partnerMessage, navigate]);

  const handleGenerateLink = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!selectedPartner) {
      navigate("/partner-registration");
      return;
    }
    dispatch(generateReferralLink({ partnerId: selectedPartner._id, offerId }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Generate Referral Link
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Offer</label>
          <select
            value={offerId}
            onChange={(e) => setOfferId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="aca">ACA</option>
            <option value="rx">RX</option>
            <option value="medicare">Medicare</option>
          </select>
        </div>
        <button
          onClick={handleGenerateLink}
          disabled={isLoading || partnerLoading}
          className={`w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 ${
            isLoading || partnerLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading || partnerLoading ? "Loading..." : "Generate Link"}
        </button>
        {isError && <p className="text-red-500 text-center mt-4">{message}</p>}
        {isSuccess && referralLink && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">Your Referral Link:</p>
            <a
              href={referralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-all"
            >
              {referralLink}
            </a>
            <div className="mt-4 flex justify-center">
              <QRCodeSVG value={referralLink} size={200} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowReferral;
