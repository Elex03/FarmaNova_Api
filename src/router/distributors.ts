import { Router } from "express";
import { createDistributor, getCompanies, getdistributors, getdistributorsGraphic, getListDistributors } from "../controllers/distributors";


const distributorsRouter = Router();

distributorsRouter.post('/', createDistributor);
distributorsRouter.get('/', getdistributors);
distributorsRouter.get('/List', getListDistributors);
distributorsRouter.get('/getCompanies', getCompanies)
distributorsRouter.get('/getdistributors', getdistributorsGraphic)


export default distributorsRouter; 