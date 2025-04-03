class VideoSDK extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.videoUrl = this.getAttribute("video-url");
    if (!this.videoUrl) {
      this.renderError("Missing video URL");
      return;
    }

    this.renderLoading();
    await this.fetchCloudFrontCookie();
  }

  async fetchCloudFrontCookie() {
    try {
      // const response = await fetch("http://localhost:8080/cfCookies", {
      //   method: "GET",
      //   headers: {
      //     Accept: "*/*",
      //     "Content-Type": "application/json",
      //     "User-Agent": "Hook/10 CFNetwork/1568.300.101 Darwin/24.2.0",
      //     "Accept-Language": "en-IN,en;q=0.9",
      //     Authorization:
      //       "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJjNDAxN2U3MGE4MWM5NTMxY2YxYjY4MjY4M2Q5OThlNGY1NTg5MTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVmlwdWwgV2FpcmFnYWRlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0kzalJGd25mSzhMSVNwa2taNlBPd0hOTFJqbXVzZ0JYSThrR19VMU02WF9KV3VPQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9ob29rLTc3M2EyIiwiYXVkIjoiaG9vay03NzNhMiIsImF1dGhfdGltZSI6MTc0MDcyNzYxNSwidXNlcl9pZCI6IjNUMk5NMThlNUFZUWhSVE1PNTRPdXo0YmV4RDIiLCJzdWIiOiIzVDJOTTE4ZTVBWVFoUlRNTzU0T3V6NGJleEQyIiwiaWF0IjoxNzQxMzUzODA1LCJleHAiOjE3NDEzNTc0MDUsImVtYWlsIjoic29udS53YWlyYWdhZGVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDQ5MDg1MzQxMjE3Nzg2ODAwNjQiXSwiZW1haWwiOlsic29udS53YWlyYWdhZGVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.gVyC9IyxVu1_5T7OicC3vRol9dwE2w9sRphcqqm6m2pq5QmmX71oTuH3gJux3C2sMGTFLVkvFhJTvivn5pHcIORz_HGfAN708-hBgeCrp0acwYW13fQAwkeg85882s7FuX9OO2zJAmF-uEflbrnSmeP-2KoqKfJvC2eODrjrN5ykfjPrt7HVTTmgePE5LDSt9fHuoshN7zJ_nRwExPp9mJ4Ho84gRb1WBOSljTh0vA6oKNbdobN5P4e2ymLtV-eQ6cPfLdaW4b5vNDJzfMIoptRnVUcjbvf_R0ZaU126u-j4MxVDm807q10yTDgB0_TqGmvOki_5BNdck8q_uxrjxg", // Replace with a valid token
      //   },
      //   credentials: "include", // Ensures browser automatically stores the cookie
      // });
      const response = {
        ok: true,
        json: async () => ({ data: { cookie: "your-cookie-value" } }),
      }; // Mock response for testing

      if (!response.ok) throw new Error("Failed to fetch CloudFront cookie");

      const data = await response.json();
      const cloudFrontCookie = data?.data?.cookie;
      if (!cloudFrontCookie) throw new Error("No CloudFront cookie received");

      this.loadVideo();
    } catch (error) {
      console.error("VideoSDK Error:", error);
      this.renderError(error.message);
    }
  }

  loadVideo() {
    this.shadowRoot.innerHTML = `
      <style>
        video { width: 100%; max-width: 600px; }
      </style>
      <video id="drm-video" controls></video>
    `;

    const videoElement = this.shadowRoot.querySelector("#drm-video");

    // ✅ Step 2: Set the Video Source Directly (No Need to Convert to Blob)
    videoElement.src = this.videoUrl; // Stream video directly
    videoElement.load(); // Ensure the player reloads the source
    console.log("Video is now loading...");
  }

  renderLoading() {
    this.shadowRoot.innerHTML = `<p>Loading video...</p>`;
  }

  renderError(message) {
    this.shadowRoot.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
  }
}

customElements.define("hook-music-sdk", VideoSDK);
