import React from "react";

type DashboardHeaderProps = {
  name: string;
  //   children: React.ReactNode | React.ReactNode[];
};

const DashboardHeader = ({
  name,
}: //   children,
DashboardHeaderProps) => {
  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-[#23272E]">{name}</h1> */}
      {/* {children} */}
    </div>
  );
};

export default DashboardHeader;
