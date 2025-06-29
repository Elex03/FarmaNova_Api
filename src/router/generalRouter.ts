import { Router } from "express";
import { createBackup, createCompany, getBackups, restoreBackup } from "../controllers/general";
import { getItemPerCode, getMakeSales } from "../controllers/makeSales/GET/getMakeSales.controller";
import { createMakeSales } from "../controllers/makeSales/POST/createMakeSales.controller";


const generalRouter = Router();

generalRouter.post('/createCompany', createCompany);
generalRouter.get('/getMakeSales', getMakeSales);
generalRouter.get('/getItemPerCode/:code', getItemPerCode);
generalRouter.post('/createMakeSales', createMakeSales);
generalRouter.get('/getBackups', getBackups);
generalRouter.post('/createBackup', createBackup);
generalRouter.post('/restoreBackup', restoreBackup);

export default generalRouter;