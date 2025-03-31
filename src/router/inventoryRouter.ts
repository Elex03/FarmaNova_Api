import { Router } from "express";
import { getCategory, getcompressedForm, getSalesPerWeek } from "../controllers/inventory";
import { createProduct, createMedicine, getMedicines } from "../controllers/medicne";

const inventoryRouter = Router();

// inventoryRouter.get('/getInventory', getInventory);
// inventoryRouter.get('/medicine', getMedicines);
inventoryRouter.get('/getSalesPerWeek',getSalesPerWeek );
inventoryRouter.get('/getCategories', getCategory);
inventoryRouter.post("/medicine",createProduct);
inventoryRouter.post('/createMedicineCatalog', createMedicine);
inventoryRouter.get('/getMedicine', getMedicines);
inventoryRouter.get('/getCompressedforms', getcompressedForm);

export default inventoryRouter;