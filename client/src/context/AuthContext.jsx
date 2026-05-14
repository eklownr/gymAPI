// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// Add PropTypes for the children prop
	AuthProvider.propTypes = {
		children: PropTypes.node.isRequired,
	};
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const res = await axios.get("http://localhost:3000/profile", {
					withCredentials: true,
				});
				setUser(res.data);
			} catch (error) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
