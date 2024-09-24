import React from 'react';

interface WarningModalProps {
  isOpen: boolean;
  toggle: () => void;
  onDelete: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, toggle, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex items-center space-x-2">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9V11.25M11.25 13.5h.008v.008h-.008V13.5zM4.5 12.75v3.75M3.75 4.5h16.5v15H3.75v-15z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Delete Entity</h2>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to delete this blog? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={toggle}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
