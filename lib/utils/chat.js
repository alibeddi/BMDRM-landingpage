// open the Messaggera chat widget loaded by ChatWidget
export const openChat = () => {
  const chatboxElement = document.querySelector(".chatbox-logo");
  if (chatboxElement) {
    chatboxElement.click();
  } else {
    console.warn("Chatbox element not found.");
  }
};
