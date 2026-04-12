import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Fragment, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Logout = ({ modal, setModal }) => {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { logout, setError } = useAuth();

  const closeModal = useCallback(() => {
    setModal(false);
  }, [setModal]);

  const handleLogout = useCallback(async () => {
    try {
      setError("");
      await logout();
      setModal(false);
      navigate("/login");
    } catch (err) {
      setError("Failed to logout");
    }
  }, [logout, setError, setModal, navigate]);

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>

                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Confirm Logout
                  </Dialog.Title>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to log out?
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button
                  ref={cancelButtonRef}
                  onClick={closeModal}
                  className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Logout;
