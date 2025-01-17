import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type ProblemType = {
  id: string;
  title: string;
  difficulty: string;
  url: string;
};

const problems: ProblemType[] = Array.from(Array(30)).map((_, index) => ({
  id: index.toString(),
  title: `Problem title ${index}`,
  difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
  url: "https://leetcode.com/problems/two-sum",
  favorite: [true, false][Math.floor(Math.random() * 2)],
}));

const Item = ({ problem }: { problem: ProblemType }) => (
  <div className="mr-4 grid grid-cols-12 items-center gap-4 px-2">
    <p className="col-span-9 truncate text-left sm:col-span-10">
      {problem.title}
    </p>
    <Badge variant="outline" className="mr-auto self-center">
      {problem.difficulty}
    </Badge>
  </div>
);

const AddProblem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [problem, setProblem] = useState("");

  return (
    <div className="flex w-full items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[min(425px,90vw)] items-center justify-between"
          >
            {problem ? (
              <Item
                problem={
                  problems.find(({ title }) => title === problem) || problems[0]
                }
              />
            ) : (
              <p className="px-2 text-muted-foreground">Add new problem</p>
            )}
            <ChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ml-4 w-[min(425px,90vw)] p-0 md:ml-0">
          <Command>
            <CommandInput
              placeholder="Search for a problem..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty className="w-[min(425px,90vw)]">
                No problems found
              </CommandEmpty>
              <CommandGroup>
                {problems.map((problem) => (
                  <CommandItem
                    key={problem.id}
                    value={problem.title}
                    onSelect={(currentValue) => {
                      setProblem(currentValue);
                      setIsOpen(false);
                    }}
                  >
                    <Item problem={problem} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button disabled={!problem}>Submit</Button>
    </div>
  );
};

export default AddProblem;
