import { Router } from "express";
import { createCompany, getBackups } from "../controllers/general";
import { getMakeSales } from "../controllers/makeSales/GET/getMakeSales.controller";
import { createMakeSales } from "../controllers/makeSales/POST/createMakeSales.controller";


const generalRouter = Router();

generalRouter.post('/createCompany', createCompany);
generalRouter.get('/getMakeSales', getMakeSales)
generalRouter.post('/createMakeSales', createMakeSales);
generalRouter.get('/getBackups', getBackups);

export default generalRouter;