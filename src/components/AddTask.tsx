import { ChangeEvent } from "react";
import useDataContext from "../hooks/useDataContext";

const AddTask = () => {
  const { newTask, setNewTask, handleSubmit, inputRef, handleFocus } =
    useDataContext();

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new Task"
        className="task-input"
        value={newTask}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTask(e.target.value)
        }
        ref={inputRef}
      />
      <button className="add-task-btn" type="submit" onClick={handleFocus}>
        Add
      </button>
    </form>
  );
};
export default AddTask;
