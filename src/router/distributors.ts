import { Router } from "express";
import { createDistributor, getCompanies, getdistributors, getdistributorsGraphic } from "../controllers/distributors";


const distributorsRouter = Router();

distributorsRouter.post('/', createDistributor);
distributorsRouter.get('/', getdistributors);
distributorsRouter.get('/getCompanies', getCompanies)
distributorsRouter.get('/getdistributors', getdistributorsGraphic)


export default distributorsRouter; 