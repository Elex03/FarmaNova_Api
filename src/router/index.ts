import { Router } from "express";
import authRouter from "./authRouter";
import inventoryRouter from "./inventoryRouter";
import distributorsRouter from "./distributors";
import orderRoute from "./orderRouter";
import medicineRouter from "./medicines";
import generalRouter from "./generalRouter";
import path from "path";
import express from "express";
import serviceRoute from "./services";

const appRouter = Router();


appRouter.use('/auth', authRouter);
appRouter.use('/inventory', inventoryRouter);
appRouter.use('/distributors', distributorsRouter);
appRouter.use('/orders', orderRoute);
appRouter.use('/medicines', medicineRouter);
appRouter.use('/general', generalRouter);
appRouter.use('/services', serviceRoute);
appRouter.use("/uploads", express.static(path.join(__dirname, "../../uploads")))


export default appRouter;