"use client";

import { ScoreProgression as ScoreProgressionType } from "@/types/analytics";
import ScoreProgression from "./score-progression";
import UserSelect from "@/app/favorites/user-select";
import { useState } from "react";
import { User } from "@prisma/client";

interface AnalyticsProps {
  users: User[];
  analytics: {
    scoreProgression: ScoreProgressionType[];
  };
}

const Analytics = ({ users, analytics }: AnalyticsProps) => {
  const [selectedUsers, setSelectedUsers] = useState(users);

  return (
    <section className="space-y-4">
      <div className="flex h-8 justify-end">
        <UserSelect
          users={users}
          onChange={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
      </div>
      <div className="mx-auto max-w-4xl">
        <ScoreProgression
          users={selectedUsers}
          data={analytics.scoreProgression}
        />
      </div>
    </section>
  );
};

export default Analytics;
