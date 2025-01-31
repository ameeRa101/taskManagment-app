import "./App.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {/* Here we define our routes from react-router-dom */}
      <AppRoutes />
      {/* You should add this container from react-toastify in order it works in your application and call it everywhere */}
      <ToastContainer />
    </div>
  );
}

export default App;
