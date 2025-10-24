"use client";

import { useBuilder } from "@/context/builderContext";

export default function ConfirmationModal() {
  const {
    confirmationModal,
    setConfirmationModal,
    confirmDeleteNode,
    confirmSaveNodeChanges,
  } = useBuilder();

  if (!confirmationModal.show) {
    return null;
  }

  const handleConfirm = () => {
    if (confirmationModal.type === "delete" && confirmationModal.nodeId) {
      confirmDeleteNode(confirmationModal.nodeId);
    } else if (confirmationModal.type === "save") {
      confirmSaveNodeChanges();
    }
    setConfirmationModal({
      show: false,
      nodeId: null,
      message: "",
      type: "delete",
    });
  };

  const handleCancel = () => {
    setConfirmationModal({
      show: false,
      nodeId: null,
      message: "",
      type: "delete",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <div
            className={`shrink-0 w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
              confirmationModal.type === "delete" ? "bg-red-100" : "bg-blue-100"
            }`}
          >
            {confirmationModal.type === "delete" ? (
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {confirmationModal.type === "delete"
              ? "Are you sure?"
              : "Save Changes?"}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {confirmationModal.message || "This action cannot be undone."}
          </p>

          <div className="flex space-x-3 justify-center">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 ${
                confirmationModal.type === "delete"
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
            >
              {confirmationModal.type === "delete" ? "Delete" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
