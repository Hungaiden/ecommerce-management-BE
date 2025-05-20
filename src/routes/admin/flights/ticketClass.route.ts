import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
const router: Router = Router();

import * as ticketClassController from "../../../controllers/admin/flights/ticketClass.controller";

router.post(
  "/create",
  authMiddleware.isAuthorized,
  ticketClassController.createTicketClass
);

router.get("/", ticketClassController.getAllTicketClasses);

router.get("/detail/:id", ticketClassController.getTicketClassById);

router.patch(
  "/update/:id",
  authMiddleware.isAuthorized,
  ticketClassController.updateTicketClass
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthorized,
  ticketClassController.deleteTicketClass
);

export const ticketClassRoute: Router = router;
