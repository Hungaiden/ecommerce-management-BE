import { Router } from "express";
import upload from '../../../config/multer';
import { uploadSingle } from '../../../middlewares/upload.middleware';

const router: Router = Router();

import * as accountController from "../../../controllers/admin/accounts/account.controller";

router.get("/", accountController.getAllAccounts);

router.post(
  "/create",
  upload.single('avatar'),
  uploadSingle,
  accountController.createAccount
);

router.get("/detail/:id", accountController.getAccountById);

router.patch(
  "/update/:id",
  upload.single('avatar'),
  uploadSingle,
  accountController.updateAccount
);

router.delete("/deleteOne/:id", accountController.deleteAccount);

export const accountsRoute: Router = router;
