import { Router } from "express";
import {
  getCatalogMedicines,
} from "../controllers/medicine";
import { getTherapeutiAaction } from "../controllers/inventory";
import { createMedicine } from "../controllers/medicals";
import { upload } from "../utils/multer";

const medicineRouter = Router();

medicineRouter.get("/catalogMedicine", getCatalogMedicines);
medicineRouter.get("/getTherapeuticAction", getTherapeutiAaction);
medicineRouter.post(
  "/createMedicine",
  upload.single("uploaded_file"),
  createMedicine
);

export default medicineRouter;
