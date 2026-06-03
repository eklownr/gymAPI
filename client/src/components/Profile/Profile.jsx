import { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://gymapi-backend.onrender.com";
const frontendUrl = "https://gymapi-frontend.onrender.com"
const backendUrl = "https://gymapi-backend.onrender.com"

const Profile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					`${backendUrl}/profile`,
					{
						withCredentials: true,
					},
				);
				setUser(response.data);
			} catch (error) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);
	if (loading) return <p>Loading ...</p>;
	if (!user) return <p>Not logged in.</p>;
	return (
		<div>
			<h2>Hello {user.given_name || user.name}</h2>
			{user.picture && (
				<img
					src={user.picture}
					alt={user.name}
					style={{ width: 80, borderRadius: "50%" }}
				/>
			)}
			<p>{user.email}</p>
			<p>{user.name}</p>
			<a href="https://gymapi-frontend.onrender.com/addGym">Add New Gym</a>
			<a href="https://gymapi-frontend.onrender.com/addReview/1">Add review to Gym</a>
		</div>
	);
};

export default Profile;
