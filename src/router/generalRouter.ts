import { Router } from "express";
import { createCompany } from "../controllers/general";


const generalRouter = Router();

generalRouter.post('/createCompany', createCompany);

export default generalRouter;