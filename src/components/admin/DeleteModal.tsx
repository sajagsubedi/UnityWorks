import React from "react";

interface DeleteModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const DeleteModal = ({ message, onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <div className="max-h-screen bg-gray-900 bg-opacity-25 w-full h-screen flex py-3 px-3 justify-center fixed z-50 top-0 left-0">
      <div className="w-96 h-max bg-white rounded-md p-5 flex-flex-col mt-5 items-center gap-2">
        <h2 className="text-red-600 font-semibold text-center mb-3">
          Delete Confirmation
        </h2>
        <p className="text-center">
          Are you sure you want to delete this {message}? This action cannot be
          undone.
        </p>
        <div className="flex gap-5 w-full mt-5 justify-center">
          <button
            className="px-2 py-1 bg-white text-red-500 border border-red-500 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 text-white bg-red-500 rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
