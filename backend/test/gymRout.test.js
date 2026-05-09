// backend/tests/gymRoutes.test.js
import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";
import express from "express";

// Mock the auth middleware globally before importing any route that uses it
vi.mock("../middleware/auth.js", () => ({
	authMiddleware: (req, res, next) => next(),
}));

// Import routes after mock is set
import gymRoutes from "../routes/gymRoutes.js";

const app = express();
app.use(express.json()); // Ensure body parsing if needed
app.use(gymRoutes);

// Optional: setup before all tests (e.g., DB seeding)
beforeAll(() => {
	// Example: seed mock data if routes depend on it
	// await db.connect();
	// await Gym.insertMany(mockGyms);
});

describe("GET /gyms", () => {
	it("should return all gyms with status 200", async () => {
		const res = await request(app).get("/gyms");

		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBe(3);

		// Optional: validate shape of each gym
		res.body.forEach((gym) => {
			expect(gym).toHaveProperty("name");
			expect(gym).toHaveProperty("location");
		});
	});
});

describe("GET /gyms/:id", () => {
	it("returns gym by id", async () => {
		const res = await request(app).get("/gyms/1");
		expect(res.statusCode).toBe(200);
		expect(res.body.name).toBe("Power Gym");
	});

	it("returns 404 if gym not found", async () => {
		const res = await request(app).get("/gyms/999");
		expect(res.statusCode).toBe(404);
	});
});
