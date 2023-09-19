/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

const LocationPopUp = () => {
  return (
    <div className="flex w-3/2 flex-col gap-4 p-4">
      <p className="text-[22px]">Location</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img
            className="rounded-full w-8 h-8"
            src="https://randomwordgenerator.com/img/picture-generator/sebastiaan-stam-XbZkCaminOY-unsplash.jpg"
            alt="avatar"
          />
          <p className="text-[20px]">Samsung</p>
        </div>
        <div className="flex-row gap-8 flex ">
          <div className="flex flex-col gap-2 text-[14px]">
            <p>
              <span className="text-[#515151]">Country: </span> Namibia
            </p>
            <p>
              <span className="text-[#515151]">State: </span> Namibia
            </p>
            <p>
              <span className="text-[#515151]">City: </span>Namibia
            </p>
            <p>
              <span className="text-[#515151]">First Address: </span> 23rd, Palmpay Avenue, Christian close MI248343
            </p>
            <p>
              <span className="text-[#515151]">Second Address:</span> Palmpay Close, MI248343, Casablanca Dior{" "}
            </p>
            <p>
              <span className="text-[#515151]">Postal Code: </span> 232334
            </p>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.4631083702!2d3.1191435958973575!3d6.5483693696157905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1688489039173!5m2!1sen!2sng"
              width="200"
              height="200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPopUp;
