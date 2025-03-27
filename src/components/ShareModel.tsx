"use client";
import React, { useEffect, useState } from "react";
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
  url: string; // The main video URL
  onClose: () => void;
  isOpen: boolean;
  videoId: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ url, onClose, isOpen }) => {
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  console.log(url, "00==========");
  const [embedCode, setEmbedCode] = useState("");

  useEffect(() => {
    const fetchEmbedCode = async () => {
      // console.log(url);
      if (!url) return;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("data................", data);
        if (data.html) {
          setEmbedCode(data.html);
        }
      } catch (error) {
        console.error("Failed to fetch embed code:", error);
      }
    };

    fetchEmbedCode();
  }, [url]);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    alert(message);
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
      case "embed":
        setShowEmbedModal(true); // Open embed modal
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
            <span className="text-black text-sm truncate flex-1">{url}</span>
            <AiOutlineLink
              onClick={() => copyToClipboard(url, "Link copied to clipboard!")}
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
                className="w-[22%] flex flex-col items-center mb-2"
              >
                <div className={`${app.bg} p-3 rounded-full mb-2`}>
                  {app.icon}
                </div>
                <span className="text-gray-600 text-sm">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>

      {/* Embed Modal */}
      <Modal isOpen={showEmbedModal} onClose={() => setShowEmbedModal(false)}>
        <div className="bg-white rounded-3xl p-6 w-5/6 max-w-md relative">
          <h3 className="text-black text-xl font-bold mb-6 text-center">
            Embed Video
          </h3>
          <button
            onClick={() => setShowEmbedModal(false)}
            className="absolute top-4 right-4 text-black text-xl"
          >
            <AiOutlineClose />
          </button>

          <div className="flex items-center bg-gray-200 rounded-lg p-3 mb-6">
            <textarea
              value={embedCode}
              readOnly
              className="w-full text-sm bg-gray-200 outline-none resize-none"
              rows={3}
            />
            <AiOutlineLink
              onClick={() => copyToClipboard(embedCode, "Embed code copied!")}
              className="text-purple-800 font-medium ml-3 cursor-pointer"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
