import { Router } from "express";
import * as CategoryController from "../../controllers/admin/category.controller";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken);

router.get("/categories", CategoryController.getCategories);
router.post("/categories", CategoryController.createCategory);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

export default router;