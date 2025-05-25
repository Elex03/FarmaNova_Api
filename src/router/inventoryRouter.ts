import { Router } from "express";
import { getCategory, getcompressedForm, getInventoryData, getSalesPerWeek } from "../controllers/inventory";


const inventoryRouter = Router();

inventoryRouter.get('/getSalesPerWeek',getSalesPerWeek );
inventoryRouter.get('/getCategories', getCategory);
inventoryRouter.get('/getCompressedforms', getcompressedForm);

inventoryRouter.get('/getInventoryData', getInventoryData);

export default inventoryRouter;