import React from "react";
import { data, data2, data3 } from "./dataFile";
import { Link } from "react-router-dom";

type each = {
  image: React.ReactNode;
  title: string;
};

const LayoutComp = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <>
      <nav className="fixed top-0 z-40 w-full bg-[#fafafa]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button> */}
              <p className="self-center text-2xl font-bold text-[#23272E] sm:text-2xl whitespace-nowrap flex ml-[259px] md:mr-24 ">
                Dashboard
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center">
                  <div className="p-[2px] rounded-full bg-[#EA5455] relative left-7 bottom-2 z-50 text-[13px] text-white cursor-pointer font-semibold">
                    <span className="">22</span>
                  </div>
                  <img
                    src="/images/bell.svg"
                    alt="Avatar"
                    className="relative w-full"
                  />
                </div>
                <div className="w-10 h-10 rounded-full object-cover ml-6">
                  <img src="/images/Avatar.svg" alt="Avatar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        // className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        className="fixed top-0 left-0 z-40 w-[246px] h-screen transition-transform"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
          <a href="#" className="flex items-center justify-center pl-2.5 mb-5">
            <img
              src="/images/azanyLogo.svg"
              className="h-6 mr-3 sm:h-7"
              alt="Azany Logo"
            />
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-[#8B909A] hover:text-gray-900 rounded-lg hover:bg-[#F7DFDE] group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  className="text-[#8B909A] group-hover:text-[#23272E]"
                >
                  <path
                    d="M14.589 7.26123L10.5075 4.08659C9.77058 3.51333 8.73861 3.51333 8.00173 4.08659L3.9194 7.26123C3.42224 7.64785 3.13157 8.24247 3.13187 8.87227V14.3827C3.13187 15.2281 3.81718 15.9134 4.66255 15.9134H13.8466C14.692 15.9134 15.3773 15.2281 15.3773 14.3827V8.87227C15.3773 8.2424 15.0865 7.64773 14.589 7.26123"
                    stroke="currentColor"
                    stroke-width="1.46111"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.293 12.0751C10.6016 13.0953 7.86013 13.0953 6.17026 12.0751"
                    stroke="currentColor"
                    stroke-width="1.46111"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="ml-3 text-[12.524px]">Overview</span>
              </a>
            </li>
            {data.map((each, index) => (
              <li key={index}>
                <Link to={each.path}>
                  <a
                    href="#"
                    className="flex items-center p-[7.51px] text-[#8B909A] hover:text-[#23272E]  rounded-lg hover:bg-[#F7DFDE] group"
                  >
                    {each.image}
                    <span className="flex-1 ml-3 whitespace-nowrap text-[12.524px]">
                      {each.title}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 font-medium">
            <p className="text-[#8B909A] text-[9.184px] uppercase px-[7.51px] pt-[37.24px]">
              Products
            </p>
            {data2.map((each, index) => (
              <li>
                <a
                  href="#"
                  className="flex items-center p-[7.51px] text-[#8B909A] hover:text-[#23272E]  rounded-lg hover:bg-[#F7DFDE] group"
                >
                  {each.image}
                  <span className="flex-1 ml-3 whitespace-nowrap text-[12.524px]">
                    {each.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 font-medium">
            <p className="text-[#8B909A] text-[9.184px] uppercase px-[7.51px] pt-[16.98px]">
              Admin
            </p>
            {data3.map((each, index) => (
              <li>
                <a
                  href="#"
                  className="flex items-center p-[7.51px] text-[#8B909A] hover:text-[#23272E]  rounded-lg hover:bg-[#F7DFDE] group"
                >
                  {each.image}
                  <span className="flex-1 ml-3 whitespace-nowrap text-[12.524px]">
                    {each.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="px-4 sm:ml-64 h-full mt-16">
        <div className="rounded-lg h-full">{children}</div>
      </div>
    </>
  );
};

export default LayoutComp;
