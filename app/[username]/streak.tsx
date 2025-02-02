import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface StreakProps {
  data: {
    streakCount: number;
    currentDayCompleted: boolean;
  };
}

const Streak = ({ data }: StreakProps) => {
  const { streakCount, currentDayCompleted } = data;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center">
            <Flame
              size={20}
              strokeWidth={1}
              className={cn({
                "fill-gray-500 text-gray-500": !currentDayCompleted,
                "fill-amber-500 text-amber-500": currentDayCompleted,
              })}
            />
            <p>{streakCount}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {
            <p>
              {currentDayCompleted
                ? "Nice, maintain your streak everyday."
                : "Solve a problem today to refresh your streak."}
            </p>
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Streak;
