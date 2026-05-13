import { useState } from "react";
import axios from "axios";

const AddComment = () => {
	const [comment, setComment] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!comment.trim()) return;

		setLoading(true);
		try {
			await axios.post(
				"http://localhost:3000/comments",
				{ text: comment },
				{ withCredentials: true },
			);
			setComment(""); // Rensa formuläret
			alert("Kommentaren har lagts till!");
		} catch (error) {
			console.error("Kunde inte skicka kommentar", error);
			alert("Ett fel uppstod.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Lägg till en kommentar</h2>
			<form onSubmit={handleSubmit}>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Skriv din kommentar här..."
					disabled={loading}
					style={{ width: "100%", height: 80 }}
				/>
				<button type="submit" disabled={loading || !comment.trim()}>
					{loading ? "Skickar..." : "Skicka kommentar"}
				</button>
			</form>
		</div>
	);
};

export default AddComment;
