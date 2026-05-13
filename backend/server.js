import express from "express";
import { authMiddleware } from "./middleware/auth.js";
import pkg from "express-openid-connect";
import cors from "cors";
import gymRoutes from "./routes/gymRoutes.js";
import { gyms } from "./data.js";

const { requiresAuth } = pkg;
const app = express();

app.use(authMiddleware);

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

//  Lägger till public routes
app.use(gymRoutes);

// Home route - public
app.get("/", (req, res) => {
	return res.oidc.login({ returnTo: "http://localhost:5173/profile" });
});

/**
 * Protected routes
 */

// GET /profile - Hämta info om användare
app.get("/profile", requiresAuth(), (req, res) => {
	try {
		res.json(req.oidc.user);
	} catch (error) {
		console.log(error);
	}
});

// POST /gyms - Skapa ett nytt gym
app.post("/gyms", requiresAuth(), (req, res) => {
	const { name, location, reviews } = req.body;

	// Enkel validering
	if (!name || !location) {
		return res.status(400).json({ error: "Namn och ort krävs" });
	}

	// Generera unikt id
	const newId = gyms.length > 0 ? Math.max(...gyms.map((g) => g.id)) + 1 : 1;

	const newGym = {
		id: newId,
		name,
		location,
		reviews: reviews || [],
	};

	gyms.push(newGym);
	res.status(201).json(newGym);
});

// POST /gyms/:id - lägg till kommentar
app.put("/gyms/:id/reviews", requiresAuth(), (req, res) => {
	const gym = gyms.find((g) => g.id == req.params.id);
	if (gym) {
		gym.reviews.push(req.body.review);
		res.json(gym);
	} else {
		res.status(404).json({ error: "Gym not found" });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };
