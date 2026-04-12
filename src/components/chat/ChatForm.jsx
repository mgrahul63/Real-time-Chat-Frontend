import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const ChatForm = ({ handleFormSubmit }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollRef = useRef(null);

  // keep scroll stable when emoji picker opens/closes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showEmojiPicker]);

  // emoji select handler (emoji-picker-react v4+ style)
  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  // send message
  const onSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    handleFormSubmit(message);
    setMessage("");
  };

  // toggle emoji picker
  const toggleEmojiPicker = (e) => {
    e.preventDefault();
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div ref={scrollRef} className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={onSubmit}>
        <div className="flex items-center w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 gap-2  rounded-br-2xl">
          {/* Emoji Button */}
          <button type="button" onClick={toggleEmojiPicker}>
            <FaceSmileIcon className="h-7 w-7 text-blue-600 dark:text-blue-500" />
          </button>

          {/* Message Input */}
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 py-2 px-4 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none
            focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Send Button */}
          <button type="submit">
            <PaperAirplaneIcon className="h-6 w-6 text-blue-600 dark:text-blue-500 rotate-90" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
