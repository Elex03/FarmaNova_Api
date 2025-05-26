import { Router } from "express";
import { getCatalogMedicines } from "../controllers/medicine";
import { getTherapeutiAaction } from "../controllers/inventory";
import { createMedicine, getOneMedicine } from "../controllers/medicals";
import { upload } from "../utils/multer";

const medicineRouter = Router();

medicineRouter.get("/catalogMedicine", getCatalogMedicines);
medicineRouter.get("/getTherapeuticAction", getTherapeutiAaction);
medicineRouter.post("/createMedicine", upload.single("imagen"), createMedicine);
medicineRouter.get("/getOneMedicine/:id", getOneMedicine);

export default medicineRouter;
