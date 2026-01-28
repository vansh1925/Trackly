import getAnalytics from "../controllers/analytics.controller.js";
import { Router } from "express";
const Analyticsrouter = Router();

// Serve analytics at /api/analytics
Analyticsrouter.get("/", getAnalytics);
export default Analyticsrouter;