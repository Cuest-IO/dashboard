import { useAppSelector } from "../hooks/redux";
import { selectCount } from "../../engine/core/counter/counterSlice";

export function Dashboard() {
  const count = useAppSelector(selectCount);
  return <div>Dashboard {count}</div>
}
