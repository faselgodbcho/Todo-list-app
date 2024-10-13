import { useContext } from "react";
import DataContext from "../contexts/DataProvider";
import { InitDataState } from "../contexts/DataProvider";

const useDataContext = (): InitDataState => {
  return useContext(DataContext);
};

export default useDataContext;
