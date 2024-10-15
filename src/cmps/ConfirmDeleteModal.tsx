import React from "react";
import { CloseIcon, ConfirmIcon } from "./Icons";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this task?",
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow bg-gray-800">
            <button
              type="button"
              className="flex items-center absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 justify-center items-cente hover:bg-gray-600 hover:text-white"
              onClick={onClose}
            >
              <CloseIcon className="w-3 h-3" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <ConfirmIcon className="mx-auto mb-4 w-12 h-12 text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-400">
                {message}
              </h3>
              <button
                type="button"
                className="bg-red-500 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={onConfirm}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="  py-2.5 px-5 ml-3 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800text-gray-400 border-gray-600 text-white hover:bg-gray-700"
                onClick={onClose}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={(ev) => {
          ev.stopPropagation();
          onClose();
        }}
        className="fixed inset-0 z-40 bg-slate-900 bg-opacity-50 backdrop-blur-sm"
      ></div>
    </>
  );
};

export default ConfirmDeleteModal;
