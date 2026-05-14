import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importera AuthProvider
import Main from "./Layout/Main";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import AddGym from "./components/AddGym/AddGym";
import AddReview from "./components/AddReview/AddReview";

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
			{
				path: "addReview/:id",
				element: <AddReview />,
			},
		],
	},
]);

//const App = () => {
//	return <RouterProvider router={router} />;
//};

const App = () => {
	return (
		<AuthProvider>
			{" "}
			{/* Omsluta med AuthProvider */}
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

export default App;
