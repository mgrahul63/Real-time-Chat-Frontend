import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";

const Header = () => {
  const [modal, setModal] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg
              width="240"
              height="40"
              viewBox="0 0 420 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="0"
                y="55"
                fontFamily="Inter, Segoe UI, Roboto, Arial, sans-serif"
                fontSize="42"
                fontWeight="700"
              >
                <tspan fill="#64779f">RealTime</tspan>
                <tspan fill="#2563EB">Chat</tspan>
              </text>
            </svg>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <>
                {/* Logout */}
                <button
                  onClick={() => setModal(true)}
                  className="p-2 rounded-lg text-gray-500 bg-black hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>

                {/* Profile */}
                <Link to="/profile">
                  <img
                    className="h-9 w-9 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition"
                    src={currentUser.photoURL}
                    alt="profile"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
};

export default Header;
