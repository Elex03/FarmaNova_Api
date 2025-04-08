import { Router } from "express";
import { createSales, getCatalogMedicines, getCatalogMedicinesInventory } from "../controllers/medicine";


const medicineRouter = Router();

medicineRouter.get('/catalogMedicine', getCatalogMedicines);
medicineRouter.post('/createSales', createSales);
medicineRouter.get('/', getCatalogMedicinesInventory);

export default medicineRouter;