import { Router } from "express";
import { getCatalogMedicines } from "../controllers/medicine";
import { getMedicalsCloseToExpire, getTherapeutiAaction } from "../controllers/inventory";
import { createMedicine, getMedicineSelect, getOneMedicine } from "../controllers/medicals";
import { upload } from "../utils/multer";

const medicineRouter = Router();

medicineRouter.get("/catalogMedicine", getCatalogMedicines);
medicineRouter.get("/getTherapeuticAction", getTherapeutiAaction);
medicineRouter.get("/getOneMedicine/:id", getOneMedicine);
medicineRouter.get("/getMedicalsCloseToExpire", getMedicalsCloseToExpire);
medicineRouter.get("/getMedicineSelect", getMedicineSelect);

medicineRouter.post("/createMedicine", upload.single("imagen"), createMedicine);



export default medicineRouter;
