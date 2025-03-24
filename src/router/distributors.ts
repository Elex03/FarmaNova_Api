import { Router } from "express";
import { createDistributor, getdistributors } from "../controllers/distributors";


const distributorsRouter = Router();

distributorsRouter.post('/', createDistributor);
distributorsRouter.get('/', getdistributors);


export default distributorsRouter;