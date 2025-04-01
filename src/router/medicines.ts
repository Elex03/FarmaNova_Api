import { Router } from "express";
import { createSales, getCatalogMedicines } from "../controllers/medicine";


const medicineRouter = Router();

medicineRouter.get('/catalogMedicine', getCatalogMedicines);
medicineRouter.post('/createSales', createSales);

export default medicineRouter;