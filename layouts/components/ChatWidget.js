"use client";

import { useEffect } from "react";

const WEBSITE_ID = "74504d7f-d7a5-8644-e";

// Loads jQuery, then the Messaggera chat widget. The widget injects the
// `.chatbox-logo` element that `openChat()` clicks.
const ChatWidget = () => {
  useEffect(() => {
    if (document.getElementById("messaggera-widget")) return;

    const jQueryScript = document.createElement("script");
    jQueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jQueryScript.async = true;
    jQueryScript.onload = () => {
      window.$takiChat = [];
      window.WEBSITE_ID = WEBSITE_ID;

      const chatScript = document.createElement("script");
      chatScript.id = "messaggera-widget";
      chatScript.src = `https://api.messaggera.com/api/owner/websites/${WEBSITE_ID}/check`;
      chatScript.async = true;
      document.head.appendChild(chatScript);
    };
    document.head.appendChild(jQueryScript);
  }, []);

  return null;
};

export default ChatWidget;
