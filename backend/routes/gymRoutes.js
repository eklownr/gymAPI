// routes/gymRoutes.js
import { Router } from "express";
import { gyms } from "../data.js";

const router = Router();

// GET /gyms - Hämta alla gym
router.get("/gyms", (req, res) => {
	res.json(gyms);
});

// GET /gyms/:id - Hämta ett specifikt gym
router.get("/gyms/:id", (req, res) => {
	const gym = gyms.find((g) => g.id == req.params.id);
	if (gym) {
		res.json(gym);
	} else {
		res.status(404).json({ error: "Gym not found" });
	}
});

export default router;
