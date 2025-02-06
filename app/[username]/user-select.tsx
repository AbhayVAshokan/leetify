import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRanked } from "@/types/user";
import { User } from "@prisma/client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useParams, useRouter } from "next/navigation";

const Item = ({ user }: { user: User }) => {
  const { name, avatar, score, rank } = user as UserRanked;

  return (
    <div className="flex items-center gap-2">
      {avatar && (
        <Avatar className="h-6 w-6">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}
      <p>{name}</p>
      <p className="text-sm text-gray-500">{`Rank: #${rank}`}</p>
      <p className="text-sm text-gray-500">{`Score: ${score}`}</p>
    </div>
  );
};

const UserSelect = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const { username } = useParams();
  const selectedUser =
    users.find((user) => user.username.toLowerCase() === username) || users[0];

  const handleValueChange = (username: string) =>
    router.push(`/${username.toLowerCase()}`);

  return (
    <Select value={selectedUser.username} onValueChange={handleValueChange}>
      <SelectTrigger className="h-8">
        <SelectValue placeholder={<Item user={selectedUser} />} />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.username}>
            <Item user={user} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserSelect;
