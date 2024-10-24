import React, {
  createContext,
  FormEvent,
  ReactElement,
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
  isEditing: { editing: boolean; taskId: number | null };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      editing: boolean;
      taskId: number | null;
    }>
  >;
  handleEdit: (id: number) => void;
  displaySettings: boolean;
  setDisplaySettings: React.Dispatch<React.SetStateAction<boolean>>;
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
  isEditing: { editing: false, taskId: null },
  setIsEditing: () => {},
  handleEdit: () => {},
  displaySettings: false,
  setDisplaySettings: () => {},
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
  const [isEditing, setIsEditing] = useState<{
    editing: boolean;
    taskId: number | null;
  }>({ editing: false, taskId: null });
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);
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
    setIsEditing({ editing: false, taskId: null });
  };

  const addTask = (newTask: string): void => {
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

    setNewTask("");
  };

  const editTask = (id: number): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, item: newTask } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
    setIsEditing({ editing: false, taskId: null });
    setNewTask("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    e.preventDefault();
    if (!isEditing.editing) {
      addTask(newTask);
    } else {
      editTask(isEditing.taskId as number);
    }
  };

  const handleEdit = (id: number): void => {
    setIsEditing({ editing: true, taskId: id });
    const selectedTask: Task | undefined = tasks.find((task) => task.id === id);
    if (!selectedTask) return;
    setNewTask(selectedTask.item);
    handleFocus();
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
        isEditing,
        setIsEditing,
        handleEdit,
        displaySettings,
        setDisplaySettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
