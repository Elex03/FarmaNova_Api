import { Router } from "express";
import { getOrders } from "../controllers/orders";


const orderRoute = Router();

orderRoute.get('/', getOrders);

export default orderRoute;