"use client";

import React from "react";
import { AiOutlineLink, AiOutlineClose } from "react-icons/ai";
import { FaTiktok, FaReddit } from "react-icons/fa";
import { ImEmbed2 } from "react-icons/im";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

interface ShareModalProps {
  url: string;
  videoUrl: string;
  onClose: () => void;
  isOpen: boolean;
  videoId: string;
  setShowEmbedModal: React.Dispatch<React.SetStateAction<boolean>>;
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

  const handleEmbedClick = () => {
    onClose();
    navigate.push(`/embed/${url}?embedShow=true`);
  };

  const myURL = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hook-poc.vercel.app"
  }/embed/${videoUrl.split("/")[3].split("?")[0].split(".")[0]}`;

  const shareButtons = [
    {
      name: "Embed",
      icon: <ImEmbed2 className="text-white text-2xl" />,
      bg: "bg-blue-600",
      component: null,
      onClick: handleEmbedClick,
    },
    {
      name: "WhatsApp",
      icon: <WhatsappIcon size={32} round />,
      bg: "bg-green-600",
      component: WhatsappShareButton,
      props: {
        url: url,
        title: `Check out this video!`,
      },
    },
    {
      name: "Facebook",
      icon: <FacebookIcon size={32} round />,
      bg: "bg-blue-600",
      component: FacebookShareButton,
      props: {
        url: url,
        quote: `Check out this amazing video!`,
      },
    },
    {
      name: "Twitter",
      icon: <TwitterIcon size={32} round />,
      bg: "bg-blue-400",
      component: TwitterShareButton,
      props: {
        url: url,
        title: `Check out this video!`,
      },
    },
    {
      name: "Telegram",
      icon: <TelegramIcon size={32} round />,
      bg: "bg-blue-500",
      component: TelegramShareButton,
      props: {
        url: url,
        title: `Check out this video!`,
      },
    },

    {
      name: "LinkedIn",
      icon: <LinkedinIcon size={32} round />,
      bg: "bg-blue-700",
      component: LinkedinShareButton,
      props: {
        url: url,
      },
    },
    {
      name: "Email",
      icon: <EmailIcon size={32} round />,
      bg: "bg-gray-600",
      component: EmailShareButton,
      props: {
        url: url,
        subject: `Check out this video!`,
        body: `I wanted to share this amazing video with you: ${url}`,
      },
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-white text-2xl" />,
      bg: "bg-black",
      component: null,
      onClick: () => window.open(`https://www.tiktok.com/`, "_blank"),
    },
    {
      name: "Reddit",
      icon: <FaReddit className="text-white text-2xl" />,
      bg: "bg-orange-500",
      component: null,
      onClick: () =>
        window.open(
          `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`,
          "_blank"
        ),
    },
  ];

  console.log(myURL);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-3xl p-6 w-5/6 max-w-md relative">
        <h3 className="text-black text-xl font-bold mb-6 text-center">Share</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl"
        >
          <AiOutlineClose />
        </button>

        <div className="flex items-center bg-gray-200 rounded-lg p-3 mb-6">
          <span className="text-black text-sm truncate flex-1">{myURL}</span>
          <AiOutlineLink
            onClick={() => copyToClipboard(myURL, "Link copied to clipboard!")}
            className="text-purple-800 font-medium ml-3 cursor-pointer"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {shareButtons.map((button, index) => {
            if (button.component) {
              const ShareComponent = button.component;
              const { ...restProps } = button.props || {};
              return (
                <div
                  key={index}
                  className="w-[22%] flex flex-col items-center mb-2 transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110"
                >
                  <ShareComponent {...restProps}>
                    <div className={`${button.bg} p-3 rounded-full mb-2`}>
                      {button.icon}
                    </div>
                  </ShareComponent>
                  <span className="text-gray-600 text-sm">{button.name}</span>
                </div>
              );
            }
            return (
              <button
                key={index}
                onClick={button.onClick}
                className="w-[22%] flex flex-col items-center mb-2 transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110"
              >
                <div className={`${button.bg} p-3 rounded-full mb-2`}>
                  {button.icon}
                </div>
                <span className="text-gray-600 text-sm">{button.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
