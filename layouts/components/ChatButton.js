"use client";

import { openChat } from "@lib/utils/chat";

// a button that opens the chat widget, usable from server components
const ChatButton = ({ className, children, ...props }) => {
  return (
    <button type="button" className={className} onClick={openChat} {...props}>
      {children}
    </button>
  );
};

export default ChatButton;
