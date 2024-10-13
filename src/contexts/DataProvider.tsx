import React, {
  createContext,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export type Task = {
  id: number;
  item: string;
  checked: boolean;
};

export type InitDataState = {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  tasks: Task[];
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleFocus: () => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const initState: InitDataState = {
  newTask: "",
  setNewTask: () => {},
  filter: "",
  setFilter: () => {},
  handleSubmit: () => {},
  tasks: [],
  handleCheck: () => {},
  handleDelete: () => {},
  inputRef: { current: null },
  handleFocus: () => {},
  filteredTasks: [],
  setFilteredTasks: () => {},
};

const DataContext = createContext<InitDataState>(initState);

type ChildrenProps = {
  children?: ReactNode;
};

export const DataProvider = ({ children }: ChildrenProps): ReactNode => {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("user-todos");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  }, []);

  const saveTasks = (task: Task[]): void => {
    localStorage.setItem("user-todos", JSON.stringify(task));
  };

  const handleFocus = (): void => {
    inputRef.current?.focus();
  };

  const handleCheck = (id: number): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );

      saveTasks(updatedTasks);

      return updatedTasks;
    });
  };

  const handleDelete = (id: number): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      saveTasks(updatedTasks);

      return updatedTasks;
    });
  };

  const addTask = (): void => {
    if (!newTask.trim()) return;

    setTasks((prevTasks) => {
      const newTaskObj = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        item: newTask,
        checked: false,
      };

      const updatedTasks = [...prevTasks, newTaskObj];

      saveTasks(updatedTasks);

      return updatedTasks;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask();

    setNewTask("");
  };

  return (
    <DataContext.Provider
      value={{
        newTask,
        setNewTask,
        filter,
        setFilter,
        handleSubmit,
        tasks,
        handleCheck,
        handleDelete,
        inputRef,
        handleFocus,
        filteredTasks,
        setFilteredTasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
