import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle } from "@mui/icons-material";
import TemplateForm from "./form/TemplateForm";
import EducationForm from "./form/EducationForm";
import WorkExperienceForm from "./form/WorkExperienceForm";
import MySkillsForm from "./form/MySkillsForm";
import SocialLinksForm from "./form/SocialLinksForm";

import { setResumeDetails } from "../../Store/State/resumedetails/resumeAction";
import PersonalInfoForm from "./form/PersonalInfoForm ";

const ResumeStepper = () => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = () => {
    dispatch(setResumeDetails(resume));
    navigate("/templatelist");
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <TemplateForm />;
      case 1:
        return <PersonalInfoForm/>;
      case 2:
        return <EducationForm />;
      case 3:
        return <WorkExperienceForm />;
      case 4:
        return <MySkillsForm />;
      case 5:
        return <SocialLinksForm />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Resume Builder
      </h1>
      <div className="step-content mb-8 transition duration-300 ease-in-out transform">
        {renderStepContent()}
      </div>
      <div className="stepper-navigation flex justify-between">
        {step > 0 && (
          <Button
            onClick={handleBack}
            variant="outlined"
          
            startIcon={<ArrowBack />}
            className="py-2 px-6"
          >
            Back
          </Button>
        )}
        {step < 5 ? (
          <Button
            onClick={handleNext}
            variant="outlined"
            endIcon={<ArrowForward />}
            className="py-2 px-6"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            className="py-2 px-6"
          >
            Submit
          </Button>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        <span className="text-sm text-gray-600">{`Step ${step + 1} of 6`}</span>
      </div>
    </div>
  );
};

export default ResumeStepper;
