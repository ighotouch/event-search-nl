import Image from "next/image";
import { User } from "@/schemas/user";
import { DEFAULT_AVATAR } from "@/lib/utils";

const UserAvatar = ({ user }: { user: User }) => {
  const avatarUrl = user.avatarUrl || DEFAULT_AVATAR;

  return (
    <div className="flex items-center space-x-2">
      <Image
        src={avatarUrl}
        alt={`${user.name}'s avatar`}
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>{user.name}</span>
    </div>
  );
};

export default UserAvatar;
