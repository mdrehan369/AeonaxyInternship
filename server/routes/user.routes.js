import express from "express";
import { upload } from "../utils/cloudinary.js"
import {
    signupController,
    updateAvatarController,
    updateOptionController,
    sendEmailController
} from "../controllers/user.controller.js"

const router = express.Router();

router.route("/email/:email").get(sendEmailController);

router.route("/signup").post(signupController);
router.route("/avatar").post(upload.single("avatar"), updateAvatarController);
router.route("/option").post(updateOptionController);

export default router;