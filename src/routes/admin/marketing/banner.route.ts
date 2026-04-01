import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import * as bannerController from '../../../controllers/admin/marketing/banner.controller';

const router: Router = Router();

// Public routes (NO auth required)
router.get('/public/active', bannerController.getActiveBanners);

// Admin routes (auth required)
router.get(
  '/',
  authMiddleware.isAuthorized,
  authMiddleware.hasRoles('admin'),
  bannerController.getBanners,
);

router.get(
  '/:id',
  authMiddleware.isAuthorized,
  authMiddleware.hasRoles('admin'),
  bannerController.getBannerById,
);

router.post(
  '/',
  authMiddleware.isAuthorized,
  authMiddleware.hasRoles('admin'),
  bannerController.createBanner,
);

router.patch(
  '/:id',
  authMiddleware.isAuthorized,
  authMiddleware.hasRoles('admin'),
  bannerController.updateBanner,
);

router.delete(
  '/:id',
  authMiddleware.isAuthorized,
  authMiddleware.hasRoles('admin'),
  bannerController.deleteBanner,
);

export const bannerRoute: Router = router;
