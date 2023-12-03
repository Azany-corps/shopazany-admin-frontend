import React, { FC, MouseEvent } from "react";

interface ButtonProps {
  styles?: string;
  name: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: any;
}

const CustomButton: FC<ButtonProps> = ({
  styles,
  name,
  onClick,
  isLoading,
  disabled,
  type,
}) => {
  return (
    <button
      type={type || "button"}
      className={`${styles} text-white bg-[#D65D5B] font-medium rounded-[16px] text-sm px-2 py-2.5 max-w-[130px] w-[130px] cursor-pointer`}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <p className="w-[114px] text-[12px] font-medium">{name}</p>
      )}
    </button>
  );
};

export default CustomButton;
