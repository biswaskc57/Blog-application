/* eslint-disable react/react-in-jsx-scope */
import "../style/app.css";
import { useSelector } from "react-redux";

export default function Notification() {
  let notification = useSelector((state) => state.notification);
  if (notification === null) {
    return <div>{""}</div>;
  } else if (
    notification.includes("a new blog") ||
    notification.includes("has logged ") ||
    notification.includes("have voted")
  )
    return (
      <div className="addMessage">
        <p>{notification}</p>
      </div>
    );
  else
    return (
      <div className="error">
        <p>{notification}</p>
      </div>
    );
}
