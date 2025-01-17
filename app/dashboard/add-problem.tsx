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
  title: `Problem title some really really long name that does not fit here more length ${index}`,
  difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
  url: "https://leetcode.com/problems/two-sum",
}));

const Item = ({ problem }: { problem: ProblemType }) => (
  <div className="grid grid-cols-12 items-center gap-4 px-2">
    <p className="col-span-9 truncate sm:col-span-10">{problem.title}</p>
    <Badge
      variant="outline"
      className="col-span-3 m-auto self-center sm:col-span-2"
    >
      {problem.difficulty}
    </Badge>
  </div>
);

const AddProblem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [problemId, setProblemId] = useState("");

  return (
    <div className="flex w-full gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full max-w-[min(500px,90vw)] items-center justify-between"
          >
            {problemId ? (
              <Item problem={problems.find(({ id }) => id === problemId)} />
            ) : (
              <p className="px-2 text-muted-foreground">Add new problem</p>
            )}
            <ChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ml-4 w-full max-w-[min(500px,90vw)] p-0 md:ml-0">
          <Command>
            <CommandInput
              placeholder="Search for a problem..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No problems found</CommandEmpty>
              <CommandGroup>
                {problems.map((problem) => (
                  <CommandItem
                    key={problem.id}
                    value={problem.id}
                    onSelect={(currentValue) => {
                      setProblemId(
                        currentValue === problemId ? "" : currentValue,
                      );
                      setIsOpen(false);
                      setSearchTerm("");
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
      <Button size="sm" disabled={!problemId}>
        Submit
      </Button>
    </div>
  );
};

export default AddProblem;
