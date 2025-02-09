import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { Item } from "../[username]/user-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserSelectProps {
  users: User[];
  onChange: Dispatch<SetStateAction<User[]>>;
  selectedUsers: User[];
}

interface SelectedItemProps {
  user: User;
  onChange: Dispatch<SetStateAction<User[]>>;
}

const SelectedItem = ({ user, onChange }: SelectedItemProps) => {
  const handleUnselect = (user: User) => {
    onChange((users) =>
      users.filter(({ username }) => username !== user.username),
    );
  };

  return (
    <Badge
      variant="outline"
      onClick={() => handleUnselect(user)}
      className="gap-1"
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={user.avatar ?? ""} alt={user.name} />
        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <X className="h-3 w-3" />
    </Badge>
  );
};

const UserSelect = ({ users, selectedUsers, onChange }: UserSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (user: User) => {
    setIsOpen(true);
    onChange((users) => {
      return selectedUsers.find(({ username }) => username === user.username)
        ? users.filter(({ username }) => username !== user.username)
        : [...users, user];
    });
  };

  const handleSelectAll = () =>
    selectedUsers.length === users.length ? onChange([]) : onChange(users);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          className={`h-auto justify-between`}
          onClick={() => setIsOpen((open) => !open)}
        >
          <div className="flex flex-wrap gap-1">
            {selectedUsers.length > 0
              ? selectedUsers.map((user) => (
                  <SelectedItem
                    key={user.username}
                    user={user}
                    onChange={onChange}
                  />
                ))
              : "Select users"}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-[360px]">
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No users found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            <CommandItem onSelect={handleSelectAll}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedUsers.length === users.length
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              Select All
            </CommandItem>
            {users.map((user) => (
              <CommandItem
                key={user.username}
                onSelect={() => handleSelect(user)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedUsers.find(
                      ({ username }) => username === user.username,
                    )
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                <Item user={user} />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UserSelect;
