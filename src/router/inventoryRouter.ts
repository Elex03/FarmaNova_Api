import { Router } from "express";
import { getInventory } from "../controllers/inventory";

const inventoryRouter = Router();


inventoryRouter.get('/getInventory', getInventory);

export default inventoryRouter;