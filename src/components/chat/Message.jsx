import { format } from "timeago.js";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Message = ({ message, self }) => {
  const isOwnMessage = self === message.sender;

  return (
    <li
      className={classNames(
        "flex",
        isOwnMessage ? "justify-end" : "justify-start",
      )}
    >
      <div className="max-w-xs sm:max-w-md">
        {/* Message bubble */}
        <div
          className={classNames(
            "px-4 py-2 rounded-lg shadow break-words",
            isOwnMessage
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 border border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700",
          )}
        >
          <span className="block text-sm">{message.message}</span>
        </div>

        {/* Time */}
        <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
          {message.createdAt ? format(message.createdAt) : ""}
        </span>
      </div>
    </li>
  );
};

export default Message;
