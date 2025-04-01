import { Router } from "express";
import authRouter from "./authRouter";
import inventoryRouter from "./inventoryRouter";
import distributorsRouter from "./distributors";
import orderRoute from "./orderRouter";
import medicineRouter from "./medicines";
import generalRouter from "./generalRouter";

const appRouter = Router();


appRouter.use('/auth', authRouter);
appRouter.use('/inventory', inventoryRouter);
appRouter.use('/distributors', distributorsRouter);
appRouter.use('/orders', orderRoute);
appRouter.use('/medicines', medicineRouter);
appRouter.use('/general', generalRouter)


export default appRouter;