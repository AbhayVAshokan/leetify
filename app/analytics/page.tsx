import { fetchScoreProgression } from "../actions/analytics";
import { fetchUsers } from "../actions/users";
import Data from "./analytics";

const Analytics = async () => {
  const [users, scoreProgression] = await Promise.all([
    fetchUsers(),
    fetchScoreProgression(),
  ]);

  return (
    <div className="container mx-auto py-4">
      <Data users={users} analytics={{ scoreProgression }} />
    </div>
  );
};

export default Analytics;
