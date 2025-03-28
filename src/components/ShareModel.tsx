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
import { useRouter } from "next/navigation";

interface ShareModalProps {
  url: string; // The main video URL
  videoUrl: string; // The video URL
  onClose: () => void;
  isOpen: boolean;
  videoId: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  url,
  onClose,
  isOpen,
  videoUrl,
}) => {
  const navigate = useRouter();
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    alert(message);
  };

  console.log(url.split("/"));

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
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "github":
        shareUrl = `https://github.com/`;
        break;
      case "youtube":
        shareUrl = `https://www.youtube.com/`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "discord":
        shareUrl = `https://discord.com/`;
        break;
      case "slack":
        shareUrl = `https://slack.com/intl/en-in/`;
        break;
      case "embed":
        onClose();
        navigate.push(`/embed/${url}?embedShow=true`);
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="bg-white rounded-3xl p-6 w-5/6 max-w-md relative">
          <h3 className="text-black text-xl font-bold mb-6 text-center">
            Share
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black text-xl"
          >
            <AiOutlineClose />
          </button>

          <div className="flex items-center bg-gray-200 rounded-lg p-3 mb-6">
            <span className="text-black text-sm truncate flex-1">
              {videoUrl}
            </span>
            <AiOutlineLink
              onClick={() =>
                copyToClipboard(videoUrl, "Link copied to clipboard!")
              }
              className="text-purple-800 font-medium ml-3 cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              {
                icon: <ImEmbed2 className="text-white text-2xl" />,
                bg: "bg-blue-600",
                name: "Embed",
              },
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
                onClick={() => shareOnPlatform(app.name.toLowerCase())}
                className="w-[22%] flex flex-col items-center mb-2 transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110"
              >
                <div className={`${app.bg} p-3 rounded-full mb-2`}>
                  {app.icon}
                </div>
                <span className="text-gray-600 text-[12px]">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
