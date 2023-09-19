import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUpModal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof Element &&
        !event.target.closest(".modal-content")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
          <div className="transition-opacity" aria-hidden="true">
            <div className="bg-[black] opacity-50 absolute inset-0"></div>
          </div>

          <div className=" bg-[white] rounded-lg overflow-auto shadow-xl transform transition-all modal-content">
            <div className="bg-[white]">
              <div className="cancel absolute top-6 right-6 cursor-pointer" onClick={onClose}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L13 1M1 1L13 13"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModal;
