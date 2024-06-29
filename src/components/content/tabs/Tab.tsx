import style from "./Tab.module.scss";
import { TabProps } from "../../../types/tab/TabProps";

const Tab = ({ onClick, children }: TabProps) => {
  return (
    <div className={style.tab} onClick={onClick}>
      {children}
    </div>
  );
};

export default Tab;
