import { Router } from "express";
import { getDetailsSales, getOneOrderHistory, getOrders, getSales } from "../controllers/orders";


const orderRoute = Router();

orderRoute.get('/', getOrders);
orderRoute.get('/getSales', getSales);
orderRoute.get('/getSales/:id', getDetailsSales);
orderRoute.get('/details/:id', getOneOrderHistory);



export default orderRoute;