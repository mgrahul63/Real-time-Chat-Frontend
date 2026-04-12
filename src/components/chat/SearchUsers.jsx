import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchUsers = ({ handleSearch }) => {
  const onSearchChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="mx-3 my-3">
      <div className="relative">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>

        {/* Input */}
        <input
          type="search"
          name="search"
          placeholder="Search users..."
          onChange={onSearchChange}
          className="w-full py-2 pl-10 pr-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg outline-none
          focus:ring-sky-500 focus:border-sky-500
          dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

export default SearchUsers;
