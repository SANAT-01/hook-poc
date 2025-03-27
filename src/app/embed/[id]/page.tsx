"use client";

import { useSearchParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function EmbedPage() {
  const searchParams = useSearchParams(); // Get the search parameters from the URL
  console.log(searchParams);

  return (
    <div className="h-fit">
      <ReactPlayer
        //   ref={(player) => {
        //     videoPlayerRefs.current[index] = player;
        //   }}
        url={
          "https://dev.media.hookmusic.com/hook_fb11fcd2-59c0-4918-b3b8-d86156f71d62.mp4?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kZXYubWVkaWEuaG9va211c2ljLmNvbS9ob29rX2ZiMTFmY2QyLTU5YzAtNDkxOC1iM2I4LWQ4NjE1NmY3MWQ2Mi5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3NDMwNzc3MTV9fX1dfQ__&Key-Pair-Id=KICFK48EC44DX&Signature=GUQm4vPEIn~fp~Z~kBiyjgeXFRDTFdbtdAmZCaFH~L7KaDjgt3-MrRT3VhMn4yu5m~uwsfPsLUCgxK1mtgqzu~91wmJHMxB-VO70wR9udrf7w~GysXDKy1ZHRjwyZApmnW8HH4y4PBWMRgmcyEgMMANgxt6VqVPoitJO35gkfaimu2VgTo-TWPLf344fNoWsYreik9NiTkDgvzb3lcGrxTIb1XZz-xbJ~Xk-YbVpswx7JoMNQKPl2ONcGqN~sG2qEYmY3CcZJRGp8kw1rAaKSxHN0Nx8mDQvPDxkN1ofSF06WxWq-~47uZ~yL3wkaFr~oQWE8IwMpAbF-0~MyiLENA__"
        }
        width="100%"
        height="100%"
        //   playing={playingIndex === index && playing}
        // playing={true}
        loop
        // muted={false}
        controls={false}
        style={{
          position: "relative",
          aspectRatio: "9/16",
        }}
        //   onProgress={(state) => handleProgress(state, index)}
      />
    </div>
  );
}
