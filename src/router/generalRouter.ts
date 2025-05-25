import { Router } from "express";
import { createCompany } from "../controllers/general";
import { getMakeSales } from "../controllers/makeSales/GET/getMakeSales.controller";


const generalRouter = Router();

generalRouter.post('/createCompany', createCompany);
generalRouter.get('/getMakeSales', getMakeSales)

export default generalRouter;