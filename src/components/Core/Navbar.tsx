import React from 'react'

export default function Navbar() {
  return (
    <div className="flex w-full justify-between bg-[#F5F5F5] z-10 items-center p-6 sticky top-0 px-4">
      <div className="datetime">
        <h2>10:77AM </h2>
        <p className='text-xs font-light'>22/33/2123</p>
      </div>
      <div className="input rounded-lg flex">
        <input
          type="text"
          placeholder="Search"
          className="bg-white p-3 rounded-l-lg  w-[400px]"
        />
        <button className="rounded-r-lg">
          <svg
            width="67"
            height="50"
            viewBox="0 0 67 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-r-lg"
          >
            <rect width="67" height="50" fill="#1B7CFC" />
            <path
              d="M43 34L37 28M39 23C39 23.9193 38.8189 24.8295 38.4672 25.6788C38.1154 26.5281 37.5998 27.2997 36.9497 27.9497C36.2997 28.5998 35.5281 29.1154 34.6788 29.4672C33.8295 29.8189 32.9193 30 32 30C31.0807 30 30.1705 29.8189 29.3212 29.4672C28.4719 29.1154 27.7003 28.5998 27.0503 27.9497C26.4002 27.2997 25.8846 26.5281 25.5328 25.6788C25.1811 24.8295 25 23.9193 25 23C25 21.1435 25.7375 19.363 27.0503 18.0503C28.363 16.7375 30.1435 16 32 16C33.8565 16 35.637 16.7375 36.9497 18.0503C38.2625 19.363 39 21.1435 39 23Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="notification rounded-full bg-white">
          <svg
            width="45"
            height="45"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25.5" cy="25.5" r="25.5" fill="white" />
            <path
              d="M17.7474 34.5415V22.9165C17.7474 20.8611 18.5639 18.8898 20.0173 17.4364C21.4707 15.983 23.442 15.1665 25.4974 15.1665C27.5528 15.1665 29.5241 15.983 30.9775 17.4364C32.4309 18.8898 33.2474 20.8611 33.2474 22.9165V34.5415M17.7474 34.5415H33.2474M17.7474 34.5415H15.1641M33.2474 34.5415H35.8307M24.2057 38.4165H26.7891"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M25.4948 15.1666C26.2082 15.1666 26.7865 14.5883 26.7865 13.8749C26.7865 13.1616 26.2082 12.5833 25.4948 12.5833C24.7814 12.5833 24.2031 13.1616 24.2031 13.8749C24.2031 14.5883 24.7814 15.1666 25.4948 15.1666Z"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </div>
        <div className="notification rounded-full bg-brand">
          <svg
            width="45"
            height="45"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25.5" cy="25.5" r="25.5" fill="#1B7CFC" />
            <path
              d="M15.1693 35.8334C14.4589 35.8334 13.8505 35.5803 13.3441 35.0739C12.8378 34.5676 12.5851 33.9596 12.5859 33.2501V17.7501C12.5859 17.0397 12.8391 16.4313 13.3454 15.925C13.8518 15.4186 14.4597 15.1659 15.1693 15.1668H35.8359C36.5464 15.1668 37.1547 15.4199 37.6611 15.9263C38.1674 16.4326 38.4201 17.0405 38.4193 17.7501V33.2501C38.4193 33.9605 38.1661 34.5689 37.6598 35.0752C37.1534 35.5815 36.5455 35.8343 35.8359 35.8334H15.1693ZM35.8359 20.3334L26.1807 26.372C26.0731 26.4365 25.9599 26.4852 25.841 26.5179C25.7222 26.5506 25.6094 26.5666 25.5026 26.5657C25.395 26.5657 25.2817 26.5498 25.1629 26.5179C25.0441 26.4861 24.9313 26.4374 24.8245 26.372L15.1693 20.3334V33.2501H35.8359V20.3334ZM25.5026 24.2084L35.8359 17.7501H15.1693L25.5026 24.2084ZM15.1693 20.6563V18.7511V18.7834V18.7679V20.6563Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="avatar rounded-full w-12 h-12">
          <img src="/images/Ellipse 4.png" alt="" className=''/>
        </div>
      </div>
    </div>
  );
}