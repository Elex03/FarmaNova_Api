import { Router } from "express";
import { createDistributor } from "../controllers/distributors";


const distributorsRouter = Router();

distributorsRouter.post('/', createDistributor);


export default distributorsRouter;