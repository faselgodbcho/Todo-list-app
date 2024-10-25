import { useEffect } from "react";
import useDataContext from "../hooks/useDataContext";
import Task from "./Task";

const DisplayTasks = () => {
  const {
    tasks,
    handleCheck,
    handleDelete,
    filter,
    filteredTasks,
    setFilteredTasks,
    handleEdit,
    loading,
  } = useDataContext();

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.checked);
    const inCompleteTasks = tasks.filter((task) => !task.checked);

    if (filter === "all") {
      setFilteredTasks(tasks);
    } else if (filter === "progress") {
      setFilteredTasks(inCompleteTasks);
    } else if (filter === "completed") {
      setFilteredTasks(completedTasks);
    }
  }, [filter, tasks]);

  // if (loading) {
  //   return <div className="display-tasks scrollbar"></div>;
  // }

  return (
    <div className="display-tasks scrollbar">
      {filteredTasks.length ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))
      ) : loading ? (
        <p className="task-empty">Loading Tasks...</p>
      ) : filter === "all" ? (
        <p className="task-empty">You have no tasks.</p>
      ) : filter === "progress" ? (
        <p className="task-empty">You have no tasks in progress</p>
      ) : (
        <p className="task-empty">You have no completed tasks</p>
      )}
    </div>
  );
};

export default DisplayTasks;
