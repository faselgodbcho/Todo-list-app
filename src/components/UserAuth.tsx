import AddTask from "./AddTask";
import TaskFilters from "./TaskFilters";
import todoIcon from "../assets/list-icon.svg";
import DisplayTasks from "./DisplayTasks";
import { DataProvider } from "../contexts/DataProvider";
import { CiSettings } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import useDataContext from "../hooks/useDataContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const UserApp = () => {
  const { user, logout } = useAuth();
  const { displaySettings, setDisplaySettings } = useDataContext();
  const [username, setUsername] = useState<string>("");

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  useEffect(() => {
    const fetchUser = async (id: string): Promise<void> => {
      try {
        const usersData = await getDoc(doc(db, "users", id));
        setUsername(usersData?.data()?.username);
      } catch (e) {
        console.error(e);
        if (e instanceof Error) alert(e.message);
      }
    };

    if (user) fetchUser(user.uid);

    return () => setDisplaySettings(false);
  }, []);

  return (
    <>
      <div className="container">
        <div className="header-icon">
          To-do list <img src={todoIcon} />
        </div>

        <AddTask />
        <TaskFilters />
        <DisplayTasks />
      </div>
      <div className="settings">
        <div
          className="settings-icon"
          onClick={() => setDisplaySettings((prev) => !prev)}
        >
          <CiSettings size="1.5em" />
        </div>

        <div
          className="settings-container"
          style={{ display: displaySettings ? "block" : "none" }}
        >
          <h3>Name: {username || "No username"}</h3>
          <h3>Email: {user?.email}</h3>
          <button
            className="logout-button"
            style={{ marginRight: "10px" }}
            onClick={() => setDisplaySettings((prev) => !prev)}
          >
            ok
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserApp;
