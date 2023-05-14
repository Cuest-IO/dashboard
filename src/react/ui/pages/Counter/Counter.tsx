// Parts
import { Counter as CounterUI } from "../../components/Counter/Counter";

export function Counter() {
  return (
    <div className="Counter">
      <div className="Counter-header">
        <CounterUI />
        <p>
          Edit <code>src/Counter.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="Counter-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="Counter-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="Counter-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="Counter-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </div>
    </div>
  )
}
