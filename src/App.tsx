import AddTask from "./components/AddTask";
import TaskFilters from "./components/TaskFilters";
import todoIcon from "./assets/list-icon.svg";
import DisplayTasks from "./components/DisplayTasks";
import { DataProvider } from "./contexts/DataProvider";

const App = () => {
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

export default App;
