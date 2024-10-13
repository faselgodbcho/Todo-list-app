import useDataContext from "../hooks/useDataContext";

const TaskFilters = () => {
  const { filter, setFilter } = useDataContext();

  return (
    <div className="filters">
      <div
        className={`filter ${filter === "all" && "active"}`}
        onClick={() => setFilter("all")}
      >
        All
      </div>
      <div
        className={`filter ${filter === "progress" && "active"}`}
        onClick={() => setFilter("progress")}
      >
        Progress
      </div>
      <div
        className={`filter ${filter === "completed" && "active"}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </div>
    </div>
  );
};

export default TaskFilters;
