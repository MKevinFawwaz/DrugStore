import { Router } from "express";
import { createMedicine, deleteMedicine} from "../controller/medicineController";
import {createValidation, updateValidation } from "../middleware/medicineValidation";
import { readMedicine,updateMedicine} from "../controller/medicineController";

const router = Router();

/**route for add new medicine */
router.post('/',[createValidation],createMedicine)

router.get(`/`, readMedicine)

router.put(`/:id`, [updateValidation],updateMedicine)

router.delete(`/:id`,deleteMedicine)

export default router