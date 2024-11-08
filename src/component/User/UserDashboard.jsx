import { div } from "framer-motion/client";
import React from "react";
import ResumeStepper from "./ResumeStepper";

const UserDashboard = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-3/4 p-10 mt-16 border flex items-center justify-center">
        <ResumeStepper />
      </div>
    </div>
  );
};

export default UserDashboard;
