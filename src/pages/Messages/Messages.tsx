import React from "react";
import Layout from "../../components/Core/Layout";
import Badge from "../../components/Messages/Badge";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 bg-[#F5F5F5]">
          <p className="text-[36px] font-bold">Messages</p>
          <div className="flex flex-row gap-4">
            <Badge />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center flex-col gap-4 justify-center p-10 rounded-md bg-[white]">
              <Icon icon="nimbus:marketing" color="#1b7cfc" width={60} height={60} />
              <p className="text-[#1B7CFC]">Email Marketing</p>
              <button className="bg-[#1B7CFC] text-[white] p-2 px-4 rounded-sm">Create New Email</button>
            </div>
            <div className="flex items-center flex-col gap-4 justify-center p-10 rounded-md bg-[white]">
              <Icon icon="fluent:person-support-24-regular" color="#1b7cfc" width={60} height={60} />
              <p className="text-[#1B7CFC]">Support Ticket</p>
              <Link to="/messages/support">
              <button className="bg-[#1B7CFC] hover:bg-[blue] text-[white] p-2 px-4 rounded-sm">Resolve a Ticket</button>
              </Link>
            </div>
            <div className="flex items-center flex-col gap-4 justify-center p-10 rounded-md bg-[white]">
              <Icon icon="ic:outline-notification-add" color="#1b7cfc" width={60} height={60} />
              <p className="text-[#1B7CFC]">User Notification</p>
              <Link to="/messages/notification">
              <button className="bg-[#1B7CFC] hover:bg-[blue] text-[white] p-2 px-4 rounded-sm">Send User Notification</button>
              </Link>
            </div>
            <div className="flex items-center flex-col gap-4 justify-center p-10 rounded-md bg-[white]">
              <Icon icon="ic:baseline-inbox" color="#1b7cfc" width={60} height={60} />
              <p className="text-[#1B7CFC]">Inbox</p>
              <button className="bg-[#1B7CFC] text-[white] p-2 px-4 rounded-sm">Send Message</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Messages;
