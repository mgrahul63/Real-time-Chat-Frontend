import { useEffect, useRef, useState } from "react";

import {
  getAllUsers,
  getChatRooms,
  initiateSocketConnection,
} from "../../services/ChatService";

import { useAuth } from "../../contexts/AuthContext";
import AllUsers from "../chat/AllUsers";
import ChatRoom from "../chat/ChatRoom";
import SearchUsers from "../chat/SearchUsers";
import Welcome from "../chat/Welcome";

const ChatLayout = () => {
  const [users, SetUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [currentChat, setCurrentChat] = useState();
  const [onlineUsersId, setonlineUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isContact, setIsContact] = useState(false);

  const socket = useRef();

  const { currentUser } = useAuth();

  useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.emit("addUser", currentUser.uid);
      socket.current.on("getUsers", (users) => {
        const userId = users.map((u) => u[0]);
        setonlineUsersId(userId);
      });
    };

    getSocket();
  }, [currentUser?.uid]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChatRooms(currentUser?.uid);
      setChatRooms(res);
    };

    fetchData();
  }, [currentUser?.uid]);

  // get all users
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      SetUsers(res);
    };

    fetchData();
  }, []);

  // filter users
  useEffect(() => {
    setFilteredUsers(users);
    setFilteredRooms(chatRooms);
  }, [users, chatRooms]);

  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredRooms([]);
    }
  }, [isContact]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);

    const searchedUsers = users?.filter((user) => {
      return user?.displayName
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase());
    });

    const searchedUsersId = searchedUsers?.map((u) => u.uid);

    // If there are initial contacts
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        // Check if searched user is a contact or not.
        const isUserContact = chatRoom.members.some(
          (e) => e !== currentUser?.uid && searchedUsersId?.includes(e),
        );
        setIsContact(isUserContact);

        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  return (
    <div className=" bg-slate-900 px-4 pt-2 mb-10 border-gray-200  dark:border-gray-700 ">
      <div className="w-10/12 mx-auto bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl">
        <div className="lg:grid lg:grid-cols-3 ">
          <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1 rounded-tl-2xl rounded-bl-2xl">
            <div className="border-b border-gray-700">
              <SearchUsers handleSearch={handleSearch} />
            </div>

            <AllUsers
              users={searchQuery !== "" ? filteredUsers : users}
              chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
              setChatRooms={setChatRooms}
              onlineUsersId={onlineUsersId}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
          </div>

          {currentChat ? (
            <ChatRoom
              currentChat={currentChat}
              currentUser={currentUser}
              onlineUsersId={onlineUsersId}
              socket={socket}
            />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
