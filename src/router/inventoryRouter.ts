import { Router } from "express";
import { getCategory, getInventory, getSalesPerWeek } from "../controllers/inventory";

import { upload } from "../utils/multer";
import getMedicines, { createMedicines } from "../controllers/medicne";

const inventoryRouter = Router();


inventoryRouter.get('/getInventory', getInventory);
inventoryRouter.get('/medicine', getMedicines);
inventoryRouter.get('/getSalesPerWeek',getSalesPerWeek );
inventoryRouter.get('/getCategories', getCategory);
inventoryRouter.post("/medicine", upload.array('imagenes[]'), createMedicines);

export default inventoryRouter;