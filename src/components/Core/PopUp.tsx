import { useEffect } from "react";

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
<<<<<<< HEAD
        <div className="fixed inset-0 no-scrollbar overflow-scroll z-10 flex items-center justify-center">
=======
        <div className="fixed inset-0 z-10 flex items-center justify-center">
>>>>>>> attribute-page-update
          <div className="transition-opacity" aria-hidden="true">
            <div className="bg-[black] opacity-30 absolute inset-0"></div>
          </div>

<<<<<<< HEAD
          <div className=" bg-[white] rounded-[30px] no-scrollbar overflow-auto shadow-xl transform transition-all modal-content">
=======
          <div className=" bg-[white] rounded-[30px] overflow-hidden shadow-xl transform transition-all modal-content">
>>>>>>> attribute-page-update
            <div className="bg-[white]">
              <div
                className="cancel absolute z-40 top-6 right-6 cursor-pointer"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g clip-path="url(#clip0_295_8463)">
                    <mask
                      id="mask0_295_8463"
                      maskUnits="userSpaceOnUse"
                      x="1"
                      y="0"
                      width="20"
                      height="21"
                    >
                      <path
                        d="M11.2416 19.2735C16.0608 19.2735 19.9673 15.367 19.9673 10.5478C19.9673 5.72854 16.0608 1.82202 11.2416 1.82202C6.42233 1.82202 2.51581 5.72854 2.51581 10.5478C2.51581 15.367 6.42233 19.2735 11.2416 19.2735Z"
                        fill="white"
                        stroke="white"
                        stroke-width="1.74515"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.7096 8.07983L8.77347 13.016M8.77347 8.07983L13.7096 13.016"
                        stroke="black"
                        stroke-width="1.74515"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </mask>
                    <g mask="url(#mask0_295_8463)">
                      <path
                        d="M0.77066 0.0769043H21.7125V21.0187H0.77066V0.0769043Z"
                        fill="#231F20"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_295_8463">
                      <rect
                        width="20.9418"
                        height="20.9418"
                        fill="white"
                        transform="translate(0.770721 0.0769043)"
                      />
                    </clipPath>
                  </defs>
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
