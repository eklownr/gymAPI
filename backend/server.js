// backend/index.js
import express from "express";
import { authMiddleware } from "./middleware/auth.js";
import pkg from "express-openid-connect";
import cors from "cors";
// import { gyms } from "./data.js";
import gymRoutes from "./routes/gymRoutes.js";

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

// add all gym routes, not protected
app.use(gymRoutes);

// Home route - public
app.get("/", (req, res) => {
	return res.oidc.login({ returnTo: "http://localhost:5173/profile" });
});

// List all Gyms
//app.get("/gyms", (req, res) => {
//	return res.json({ gyms });
//});

/* Get single gym
app.get("/gyms/:id", (req, res) => {
	const gym = gyms.find((g) => g.id == req.params.id);
	gym ? res.json(gym) : res.status(404).json({ error: "Gym not found" });
});
*/

// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

app.get("/profile", requiresAuth(), (req, res) => {
	try {
		res.json(req.oidc.user);
	} catch (error) {
		console.log(error);
	}
});

// Protected route
// app.get("/secure-data", verifyToken, (req, res) => {
//   res.json({
//     message: "This is protected data",
//     user: req.user, // Decoded token info
//   });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// export app for testing
export { app };
