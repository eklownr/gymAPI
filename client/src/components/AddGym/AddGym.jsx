import { useState } from "react";
import axios from "axios";

const AddGym = () => {
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [reviews, setReviews] = useState([""]);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axios.post(
				"http://localhost:3000/gyms",
				{
					name,
					location,
					reviews,
				},
				{ withCredentials: true },
			);
			alert("Gym tillagt!");
			setName("");
			setLocation("");
			setReviews([""]);
		} catch (error) {
			console.error("Kunde inte lägga till gym", error);
			alert("Ett fel uppstod.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Lägg till ett nytt gym</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Namn:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Ort:</label>
					<input
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Recension:</label>
					<textarea
						value={reviews[0]}
						onChange={(e) => setReviews([e.target.value])}
						placeholder="Skriv en recension"
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Sparar..." : "Lägg till gym"}
				</button>
			</form>
		</div>
	);
};

export default AddGym;
