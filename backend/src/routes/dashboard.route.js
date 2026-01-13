import express from 'express';

import dashboard from '../controllers/dashboard.controller';

const Dashboardrouter=express.Router();
Dashboardrouter.get('/',dashboard);

export default Dashboardrouter;