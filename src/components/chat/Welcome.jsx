import WelcomeIcon from "../WelcomeIcon";

const Welcome = () => {
  return (
    <div className="lg:col-span-2 lg:block bg-white dark:bg-gray-900 rounded-tr-2xl rounded-br-2xl">
      <div className="pl-5">
        <WelcomeIcon />

        <div className="text-center">
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Select a Chat to Start Messaging
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
