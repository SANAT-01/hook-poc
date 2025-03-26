"use client";
import React from "react";
import {
  AiOutlineWhatsApp,
  AiOutlineTwitter,
  AiOutlineLink,
  AiOutlineClose,
} from "react-icons/ai";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPinterest,
  FaSlack,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";
import { ImEmbed2 } from "react-icons/im";

import Modal from "./Modal";

interface ShareModalProps {
  url: string;
  onClose: () => void;
  isOpen: boolean;
}

const ShareModal: React.FC<ShareModalProps> = ({ url, onClose, isOpen }) => {
  const copyToClipboard = () => {
    console.log({ url });
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const shareOnPlatform = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="bg-[#FFFFFF] rounded-3xl p-6 w-5/6 max-w-md relative ">
          <h3 className="text-black text-xl font-bold mb-6 justify-center flex">
            Share
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black text-xl"
          >
            <AiOutlineClose />
          </button>

          <div className="flex items-center bg-[#f4f4f4] rounded-lg p-3 mb-6">
            <span className="text-black text-sm truncate flex-1">{url}</span>
            <AiOutlineLink
              onClick={copyToClipboard}
              className=" text-purple-800 font-medium ml-3"
            />
          </div>

          {/* main apps starts */}

          <div className="flex flex-wrap justify-center gap-2">
            {[
              {
                icon: <AiOutlineWhatsApp className="text-white text-2xl" />,
                bg: "bg-green-600",
                name: "WhatsApp",
              },
              {
                icon: <FaFacebook className="text-white text-2xl" />,
                bg: "bg-blue-600",
                name: "Facebook",
              },
              {
                icon: <AiOutlineTwitter className="text-white text-2xl" />,
                bg: "bg-blue-400",
                name: "Twitter",
              },
              {
                icon: <FaTelegram className="text-white text-2xl" />,
                bg: "bg-blue-500",
                name: "Telegram",
              },
              {
                icon: <FaPinterest className="text-white text-2xl" />,
                bg: "bg-red-500",
                name: "Pinterest",
              },
              {
                icon: <FaGithub className="text-white text-2xl" />,
                bg: "bg-black",
                name: "GitHub",
              },
              {
                icon: <FaYoutube className="text-white text-2xl" />,
                bg: "bg-red-600",
                name: "YouTube",
              },
              {
                icon: <FaLinkedin className="text-white text-2xl" />,
                bg: "bg-blue-700",
                name: "LinkedIn",
              },
              {
                icon: <FaDiscord className="text-white text-2xl" />,
                bg: "bg-purple-600",
                name: "Discord",
              },
              {
                icon: <FaSlack className="text-white text-2xl" />,
                bg: "bg-gray-800",
                name: "Slack",
              },
            ].map((app, index) => (
              <button
                key={index}
                className="w-[22%] flex flex-col items-center mb-2"
              >
                <div className={`${app.bg} p-3 rounded-full mb-2`}>
                  {app.icon}
                </div>
                <span className="text-[#74748A] text-sm">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
