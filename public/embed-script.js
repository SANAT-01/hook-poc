window.onload = () => {
  console.log("Hook Music Embed Script Loaded"); // Debugging

  const embeds = document.querySelectorAll(".hookmusic-embed");

  embeds.forEach((embed) => {
    const videoId = embed.getAttribute("data-embed-id");
    if (!videoId) {
      console.error("Missing data-embed-id in:", embed);
      return;
    }

    // console.log("Embedding video:", videoId); // Debugging

    // Create wrapper div for styling
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    // wrapper.style.backgroundColor = "#181818"; // Dark theme
    wrapper.style.padding = "20px";
    wrapper.style.borderRadius = "12px";
    wrapper.style.maxWidth = "400px";
    wrapper.style.margin = "20px auto";

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:3000/embed/${videoId}`;
    iframe.width = "350";
    iframe.height = "500";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    iframe.style.borderRadius = "12px";

    // Add iframe to wrapper and replace blockquote
    wrapper.appendChild(iframe);
    embed.replaceWith(wrapper);
  });
};
