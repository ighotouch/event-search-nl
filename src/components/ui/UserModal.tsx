import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserSchema, User } from "@/schemas/user";
import { z } from "zod";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    console.log("Form data submitted:", data);
    try {
      const userWithId = { ...data, id: Date.now() };
      UserSchema.parse(userWithId);
      onAddUser(data);
      reset();
      onClose();
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          setError(error.path[0] as keyof User, {
            type: "manual",
            message: error.message,
          });
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

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
              <h2 className="text-lg font-semibold text-white" id="modal-title">
                Add User
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Name"
                  className="w-full mb-2 rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-red-600"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="Username"
                  className="w-full mb-2 rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-red-600"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}

                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="w-full mb-2 rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-red-600"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
