import getAnalytics from "../controllers/analytics.controller.js";
import { Router } from "express";
const Analyticsrouter = Router();

Analyticsrouter.get("/analytics", getAnalytics);
export default Analyticsrouter;