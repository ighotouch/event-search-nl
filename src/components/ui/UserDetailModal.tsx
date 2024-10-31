import React from "react";
import Image from "next/image";
import { User } from "@/schemas/user";
import { DEFAULT_AVATAR } from "@/lib/utils";

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-600 sm:mx-0 sm:h-10 sm:w-10">
                  <Image
                    src={user.avatarUrl || DEFAULT_AVATAR}
                    alt={`${user.name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold text-white"
                    id="modal-title"
                  >
                    User Details
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Username:</strong> {user.username}
                    </p>
                    <p className="text-sm text-gray-400">
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
