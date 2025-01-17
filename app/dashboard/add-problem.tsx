import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const problems = Array.from(Array(30)).map((_, index) => ({
  id: index,
  title: `Problem title some really really long name that does not fit here more length ${index}`,
  difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
  url: "https://leetcode.com/problems/two-sum",
}));

const AddProblem = () => {
  const [problemId, setProblemId] = useState(null);

  return (
    <div className="select-width-override flex w-full gap-2">
      <Select
        onValueChange={(id) => {
          console.log(id);
          setProblemId(problems.find((problem) => problem.id === id)?.id);
        }}
      >
        <SelectTrigger className="h-8">
          <SelectValue placeholder={<p>Add new problem</p>} />
        </SelectTrigger>
        <SelectContent className="select-width-override">
          {problems.map(({ id, title, difficulty }) => (
            <SelectItem key={id} value={id}>
              <div className="grid grid-cols-12 gap-4 px-2">
                <p className="col-span-9 truncate sm:col-span-10">{title}</p>
                <Badge
                  variant="outline"
                  className="col-span-3 m-auto self-center sm:col-span-2"
                >
                  {difficulty}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" disabled={!problemId}>
        Submit
      </Button>
    </div>
  );
};

export default AddProblem;
