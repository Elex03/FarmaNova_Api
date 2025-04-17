import { Router } from "express";
import { getDetailsSales, getOneOrderHistory, getOrders, getOrdersGraph, getSales } from "../controllers/orders";


const orderRoute = Router();

orderRoute.get('/', getOrders);
orderRoute.get('/getSales', getSales);
orderRoute.get('/getSales/:id', getDetailsSales);
orderRoute.get('/details/:id', getOneOrderHistory);
orderRoute.get('/getOrderGraph/:id', getOrdersGraph);



export default orderRoute;