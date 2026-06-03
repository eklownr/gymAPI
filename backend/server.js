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

const render_url = "https://gymapi-frontend.onrender.com"

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.BASE_URL, 'https://gymapi-frontend.onrender.com'] // Lägg till din frontend-URL här
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Tillåt requests utan origin (t.ex. mobilappar eller curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Inte tillåten av CORS'));
      }
    },
    credentials: true,
  })
);   


//app.use(
//	cors({
//		origin: "http://localhost:5173",
//		credentials: true,
//	}),
//);

//  Lägger till public routes
app.use(gymRoutes);

// Home route - public
app.get("/", (req, res) => {
	// when logged in, redirect to profile
	return res.oidc.login({ returnTo: render_url + "/profile" });
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

	// Enkel validering - checka att namn och ort finns
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };
