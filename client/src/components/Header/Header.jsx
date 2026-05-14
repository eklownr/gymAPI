import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="http://localhost:3000/logout">Logout</Link>
		</div>
	);
};

export default Header;
