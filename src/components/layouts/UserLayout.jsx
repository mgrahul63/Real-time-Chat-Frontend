const UserLayout = ({ user, onlineUsersId }) => {
  return (
    <div className="relative flex items-center">
      <img
        className="w-10 h-10 border border-gray-500 rounded-full"
        src={user?.photoURL}
        alt=""
      />
      <div className={`${user?.last ? "pt-2" : ""}  ml-3`}>
        <span className="block text-gray-200 text-[16px] dark:text-gray-200">
          {user?.displayName}
        </span>
        <span className="text-gray-500">{user?.last}</span>
      </div>

      {onlineUsersId?.includes(user?.uid) ? (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-500 dark:bg-green-400 border-2 border-white rounded-full"></span>
      ) : (
        <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
};

export default UserLayout;
