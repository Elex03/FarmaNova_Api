import { Router } from "express";
import { getCatalogMedicines } from "../controllers/medicine";
import { getMedicalsCloseToExpire, getTherapeutiAaction } from "../controllers/inventory";
import { createMedicine, getMedicineSales, getMedicineSelect, getMedicineStock, getOneMedicine, getSymptoms, updateMedicine } from "../controllers/medicals";
import { upload } from "../utils/multer";

const medicineRouter = Router();

medicineRouter.get("/catalogMedicine", getCatalogMedicines);
medicineRouter.get("/getTherapeuticAction", getTherapeutiAaction);
medicineRouter.get("/getOneMedicine/:id", getOneMedicine);
medicineRouter.get("/getMedicalsCloseToExpire", getMedicalsCloseToExpire);
medicineRouter.get("/getMedicineSelect", getMedicineSelect);
medicineRouter.get("/getSymptoms", getSymptoms);
medicineRouter.get("/getMedicineSale", getMedicineSales);
medicineRouter.get("/getMedicineStock", getMedicineStock);

medicineRouter.post("/createMedicine", upload.single("imagen"), createMedicine);
medicineRouter.post("/updateMedicine", upload.single("imagen"), updateMedicine);



export default medicineRouter;
