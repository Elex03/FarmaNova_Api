import { Router } from "express";
import { getDetailsSales, getOneOrderHistory, getOrdersGraph, getSales, registerOrder } from "../controllers/orders";


const orderRoute = Router();

orderRoute.get('/getSales', getSales);
orderRoute.get('/getSales/:id', getDetailsSales);
orderRoute.get('/details/:id', getOneOrderHistory);
orderRoute.get('/getOrderGraph/:id', getOrdersGraph);


orderRoute.post('/registerOrder', registerOrder);



export default orderRoute;