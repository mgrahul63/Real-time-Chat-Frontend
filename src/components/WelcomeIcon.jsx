const WelcomeIcon = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center space-y-3">
        {/* Title */}
        <h1 className="text-5xl font-bold text-slate-200">
          Welcome to <span className="text-sky-400">RealTime</span>
          <span className="text-slate-100">Chat</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Connect instantly. Chat in real time. Stay connected with people you
          care about.
        </p>

        {/* Optional button */}
        <div className="pt-4">
          <button className="px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition">
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIcon;
