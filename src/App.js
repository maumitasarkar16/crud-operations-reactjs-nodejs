import { Provider } from "react-redux";
//import Form from "./components/Form";
import appStore from "./utils/appStore";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
//import List from "./components/List";

function App() {
  return (
    <Provider store={appStore}>
      <div className="App bg-gray-900 h-screen w-screen object-cover overflow-auto">
        <Header />
        <div className=" flex ">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}

export default App;
