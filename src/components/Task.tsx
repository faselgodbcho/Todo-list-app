import { GoPencil, GoTrash } from "react-icons/go";
import { Task as TaskType } from "../contexts/DataProvider";
import CustomCheckbox from "./CustomCheckbox";

type TaskProps = {
  task: TaskType;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

const Task = ({ task, handleCheck, handleDelete }: TaskProps) => {
  return (
    <div className="task">
      <CustomCheckbox task={task} handleCheck={handleCheck} />

      <p
        className="task-body scrollbar"
        onClick={() => handleCheck(task.id)}
        style={{ textDecoration: task.checked ? "line-through" : "none" }}
      >
        {task.item}
      </p>

      <div className="options">
        <div className="edit-task">
          <GoPencil size="1.1em" />
        </div>
        <div className="delete-task" onClick={() => handleDelete(task.id)}>
          <GoTrash size="1.1em" />
        </div>
      </div>
    </div>
  );
};

export default Task;
