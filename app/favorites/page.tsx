import Table from "./table";
import { fetchFavoriteProblems } from "../actions/problems";
import { fetchUsers } from "../actions/users";

const Favorites = async () => {
  const [problems, users] = await Promise.all([
    fetchFavoriteProblems(),
    fetchUsers(),
  ]);

  return (
    <div className="container mx-auto py-4">
      <Table problems={problems} users={users} />
    </div>
  );
};

export default Favorites;
