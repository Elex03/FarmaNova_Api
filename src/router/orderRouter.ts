import { Router } from "express";
import { getDetailsSales, getOrders, getSales } from "../controllers/orders";


const orderRoute = Router();

orderRoute.get('/', getOrders);
orderRoute.get('/getSales', getSales);
orderRoute.get('/getSales/:id', getDetailsSales);



export default orderRoute;