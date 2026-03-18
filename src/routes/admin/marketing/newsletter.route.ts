import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import * as newsletterController from "../../../controllers/admin/marketing/newsletter.controller";

const router: Router = Router();

router.get(
  "/subscribers",
  authMiddleware.isAuthorized,
  newsletterController.getSubscribers,
);
router.patch(
  "/subscribers/:id/status",
  authMiddleware.isAuthorized,
  newsletterController.updateSubscriberStatus,
);

router.get(
  "/campaigns",
  authMiddleware.isAuthorized,
  newsletterController.getCampaigns,
);
router.post(
  "/campaigns",
  authMiddleware.isAuthorized,
  newsletterController.createCampaign,
);
router.post(
  "/campaigns/:id/send",
  authMiddleware.isAuthorized,
  newsletterController.sendCampaign,
);

export const newsletterRoute: Router = router;
