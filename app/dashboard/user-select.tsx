import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  avatar?: string;
};

// TODO: Fetch all users
const users: User[] = [
  {
    id: "ab",
    name: "Abhay V Ashokan",
    avatar: "https://avatars.githubusercontent.com/u/35297280",
  },
  {
    id: "ca",
    name: "Calvin Wilson",
    avatar: "https://avatars.githubusercontent.com/u/35304653",
  },
];

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

const UserSelect = () => {
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  return (
    <Select
      value={selectedUser.id}
      onValueChange={(id) =>
        setSelectedUser(users.find((user) => user.id === id))
      }
    >
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
