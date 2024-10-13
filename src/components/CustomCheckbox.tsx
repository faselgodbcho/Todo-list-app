import { Task as TaskType } from "../contexts/DataProvider";

type CustomCheckbox = {
  task: TaskType;
  handleCheck: (id: number) => void;
};

const CustomCheckbox = ({ task, handleCheck }: CustomCheckbox) => {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => handleCheck(task.id)}
      />
      <span className="check-mark">
        <div className="tick-mark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16px"
            height="16px"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L19 7" />
          </svg>
        </div>
      </span>
    </label>
  );
};

export default CustomCheckbox;
