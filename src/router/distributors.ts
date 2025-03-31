import { Router } from "express";
import { createDistributor, getCompanies, getdistributors, getListDistributors } from "../controllers/distributors";


const distributorsRouter = Router();

distributorsRouter.post('/', createDistributor);
distributorsRouter.get('/', getdistributors);
distributorsRouter.get('/List', getListDistributors);
distributorsRouter.get('/getCompanies', getCompanies)


export default distributorsRouter;