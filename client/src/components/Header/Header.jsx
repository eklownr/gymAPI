// Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
	const { user, loading } = useAuth();

	if (loading) return <div>Laddar...</div>;

	return (
		<div>
			<Link to="/">Home</Link>
			{user ? (
				<a href="http://localhost:3000/logout">Logout</a>
			) : (
				<Link to="/login">Login</Link>
			)}
		</div>
	);
};

export default Header;

/*
const Header = () => {
	return (
		<div>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="http://localhost:3000/logout">Logout</Link>
		</div>
	);
};
*/
