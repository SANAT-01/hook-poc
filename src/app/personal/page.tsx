import PersonalInfo from "@/components/Personal";
import React from "react";

export const metadata = {
  title: "Hook Music - Personal",
  description: "Make changes and create your own video music",
};

const PersonalPage = () => {
  return (
    <div>
      <PersonalInfo />
    </div>
  );
};

export default PersonalPage;
