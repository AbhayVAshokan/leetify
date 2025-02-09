import Table from "./table";
import { fetchFavoriteProblems } from "../actions/problems";

const Favorites = async () => {
  const problems = await fetchFavoriteProblems();

  return (
    <div className="container mx-auto py-4">
      <Table problems={problems} />
    </div>
  );
};

export default Favorites;
