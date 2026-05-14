import { useState } from "react";
import axios from "axios";

const AddReview = () => {
	const [gymId, setGymId] = useState("");
	const [review, setReview] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!gymId || !review.trim()) return;

		setLoading(true);
		try {
			const response = await axios.put(
				`http://localhost:3000/gyms/${gymId}/reviews`,
				{ review },
				{ withCredentials: true },
			);
			alert("Recension tillagd!");
			setReview("");
		} catch (error) {
			console.error("Kunde inte lägga till recension", error);
			alert("Gym hittades inte eller något gick fel.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Lägg till recension till gym</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Gym ID:</label>
					<input
						type="number"
						value={gymId}
						onChange={(e) => setGymId(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Din recension:</label>
					<textarea
						value={review}
						onChange={(e) => setReview(e.target.value)}
						required
						placeholder="Skriv din erfarenhet..."
						style={{ width: "100%", height: 80 }}
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Sparar..." : "Skicka recension"}
				</button>
			</form>
		</div>
	);
};

export default AddReview;
