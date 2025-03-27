import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { AiOutlineClose } from "react-icons/ai";

interface EmbedCodeProps {
  onClose: () => void;
  isOpen: boolean;
  videoId: string;
  setShowEmbedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmbedModal: React.FC<EmbedCodeProps> = ({
  setShowEmbedModal,
  isOpen,
  videoId,
}) => {
  const [embedCode, setEmbedCode] = useState("");

  // console.log(embedCode);

  useEffect(() => {
    if (!videoId) return;
    console.log(process.env.NODE_ENV);

    const fetchEmbedCode = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/oembed?url=https://dev.media.hookmusic.com/${videoId}`
        );
        const data = await response.json();
        if (data.html) {
          setEmbedCode(data.html);
        }
      } catch (error) {
        console.error("Error fetching embed code:", error);
      }
    };

    fetchEmbedCode();
  }, [videoId]);

  return (
    <Modal isOpen={isOpen} onClose={() => setShowEmbedModal(false)}>
      <div className="bg-white rounded-3xl p-6 relative w-[500px] ">
        <h3 className="text-black text-xl font-bold mb-6 text-center">
          Embed Video
        </h3>
        <button
          onClick={() => setShowEmbedModal(false)}
          className="absolute top-4 right-4 text-black text-xl"
        >
          <AiOutlineClose />
        </button>

        <div className="flex w-full items-center bg-gray-200 rounded-lg p-3 mb-6">
          <textarea
            value={embedCode}
            readOnly
            className="w-full h-full text-sm bg-gray-200 outline-none resize-none"
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EmbedModal;
