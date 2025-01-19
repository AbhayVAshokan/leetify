import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "./constants";
import { useParams, useRouter } from "next/navigation";

const Item = ({ user }: { user: User }) => {
  const { name, avatar } = user;
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      {name}
    </div>
  );
};

const UserSelect = ({ users }: { users: User[] }) => {
  const router = useRouter();
  const { userId } = useParams();
  const selectedUser = users.find((user) => user.id === userId) || users[0];

  const handleValueChange = (id: string) => router.push(`/${id}`);

  return (
    <Select value={selectedUser.id} onValueChange={handleValueChange}>
      <SelectTrigger className="h-8 w-52">
        <SelectValue placeholder={<Item user={selectedUser} />} />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            <Item user={user} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserSelect;
