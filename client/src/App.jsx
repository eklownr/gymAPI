import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import AddGym from "./components/AddGym/AddGym";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "addGym",
				element: <AddGym />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
