import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./compount/Home.jsx";
import Auth from "./compount/Auth.jsx";
import AboutsPage from "./compount/AboutsPage.jsx";
import Faqs from "./compount/Faqs.jsx";
import PartnerForm from "./compount/PartnerForm.jsx";
import HealthOffers from "./compount/HealthOffers.jsx";
import FinanceOffers from "./compount/FinanceOffers.jsx";
import LegalOffers from "./compount/LegalOffers.jsx";
import AllOffers from "./compount/AllOffers.jsx";
import BusinessForm from "./compount/BusinessForm.jsx";
import BusinessAuth from "./compount/BusinessAuth.jsx";
import BusinessSignup from "./compount/BusinessSignup.jsx";
import LoginButton from "./compount/LoginButton.jsx";
import MultiStepForm from "./compount/MultiStepForm.jsx";
import ShowReferral from "./compount/ShowReferral.jsx";

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        className="mt-0"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<PartnerForm />} />
        <Route path="/partner/edit/:partnerId" element={<PartnerForm />} />
        <Route path="/partner-registration" element={<PartnerForm />} />
        <Route path="/Business" element={<BusinessForm />} />
        <Route path="/About" element={<AboutsPage />} />
        <Route path="/Faqs" element={<Faqs />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/BusinessAuth" element={<BusinessAuth />} />
        <Route path="/BusinessSignup" element={<BusinessSignup />} />
        <Route path="/all-offers" element={<AllOffers />} />
        <Route path="/offers/health/*" element={<HealthOffers />} />
        <Route path="/offers/finance" element={<FinanceOffers />} />
        <Route path="/offers/legal" element={<LegalOffers />} />
        <Route path="/LoginButton" element={<LoginButton />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/MultiStepForm" element={<MultiStepForm />} />
        <Route path="/referral" element={<ShowReferral />} />
        <Route
          path="*"
          element={
            <div className="p-4">
              <h1>404: Route Not Found</h1>
              <p>URL: {window.location.pathname}</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
