import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";
import BusinessLogin from "./BusinessLogin";
import BusinessSignup from "./BusinessSignup";

export default function BusinessAuth() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8 overflow-hidden">
        <div className="relative w-full max-w-[80rem] h-auto shadow-xl rounded-2xl bg-white overflow-hidden flex flex-col md:flex-row">
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.div
                key="signin"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <BusinessLogin setIsSignIn={setIsSignIn} />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <BusinessSignup setIsSignIn={setIsSignIn} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  );
}