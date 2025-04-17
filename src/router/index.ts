import { Router } from "express";
import authRouter from "./authRouter";
import inventoryRouter from "./inventoryRouter";
import distributorsRouter from "./distributors";
import orderRoute from "./orderRouter";
import medicineRouter from "./medicines";
import generalRouter from "./generalRouter";
import path from "path";
import express from "express";
import { Prismaclient } from "../constants/db";

const appRouter = Router();


appRouter.use('/auth', authRouter);
appRouter.use('/inventory', inventoryRouter);
appRouter.use('/distributors', distributorsRouter);
appRouter.use('/orders', orderRoute);
appRouter.use('/medicines', medicineRouter);
appRouter.use('/general', generalRouter)
appRouter.use("/uploads", express.static(path.join(__dirname, "../../uploads")))


appRouter.get('/users', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
  
    const [users, total] = await Promise.all([
      Prismaclient.variante.findMany({
        skip,
        take: limit,
        orderBy: { fechaCreacion: 'desc' },
      }),
      Prismaclient.variante.count({ where: { EstadoMedicamento: 'DISPONIBLE' } }),
    ]);
  
    res.json({
      data: users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  });
  

export default appRouter;