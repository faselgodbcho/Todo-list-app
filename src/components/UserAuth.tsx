import AddTask from "./AddTask";
import TaskFilters from "./TaskFilters";
import todoIcon from "../assets/list-icon.svg";
import DisplayTasks from "./DisplayTasks";
import { DataProvider } from "../contexts/DataProvider";

const UserApp = () => {
  return (
    <div className="container">
      <div className="header-icon">
        To-do list <img src={todoIcon} />
      </div>

      <DataProvider>
        <AddTask />
        <TaskFilters />
        <DisplayTasks />
      </DataProvider>
    </div>
  );
};

export default UserApp;
