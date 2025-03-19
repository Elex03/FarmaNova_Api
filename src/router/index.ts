import { Router } from "express";
import authRouter from "./authRouter";
import inventoryRouter from "./inventoryRouter";
import distributorsRouter from "./distributors";

const appRouter = Router();


appRouter.use('/auth', authRouter);
appRouter.use('/inventory', inventoryRouter);
appRouter.use('/distributors', distributorsRouter);


export default appRouter;