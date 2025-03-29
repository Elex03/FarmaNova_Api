import { Router } from "express";
import { createDistributor, getdistributors, getListDistributors } from "../controllers/distributors";


const distributorsRouter = Router();

distributorsRouter.post('/', createDistributor);
distributorsRouter.get('/', getdistributors);
distributorsRouter.get('/List', getListDistributors);


export default distributorsRouter;