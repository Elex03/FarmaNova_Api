import { Router } from "express";
import authRouter from "./authRouter";
import inventoryRouter from "./inventoryRouter";
import distributorsRouter from "./distributors";
import orderRoute from "./orderRouter";

const appRouter = Router();


appRouter.use('/auth', authRouter);
appRouter.use('/inventory', inventoryRouter);
appRouter.use('/distributors', distributorsRouter);
appRouter.use('/orders', orderRoute);


export default appRouter;