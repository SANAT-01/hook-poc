import React from "react";

interface EmbedCodeProps {
  onClose?: () => void;
  isOpen?: boolean;
  videoId: string;
  setShowEmbedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmbedModal: React.FC<EmbedCodeProps> = ({}) => {
  return <></>;
};

export default EmbedModal;
