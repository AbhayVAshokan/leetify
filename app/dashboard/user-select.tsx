import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useCallback, useEffect, useState } from "react";
import { User } from "./constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get("user");

  const [selectedUser, setSelectedUser] = useState<User>(
    users.find((user) => user.id === userId) || users[0],
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (userId) return;

    router.push(pathname + "?" + createQueryString("user", users[0].id));
  }, []);

  const handleValueChange = (id: string) => {
    setSelectedUser(users.find((user) => user.id === id) || users[0]);
    router.push(pathname + "?" + createQueryString("user", id));
  };

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
