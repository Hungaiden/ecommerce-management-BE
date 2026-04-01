import type { Request, Response } from 'express';
import * as bannerService from '../../../services/admin/marketing/banner.service';
import type {
  ResponseDetailSuccess,
  ResponseFailure,
  ResponseListSuccess,
} from '../../../utils/types/ResponseTypes';
import cloudinary from '../../../config/cloudinary';

export const getBanners = async (req: Request, res: Response) => {
  try {
    const result = await bannerService.getBanners({
      isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined,
      offset: req.query.offset ? parseInt(req.query.offset as string, 10) : 0,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 20,
    });

    const totalPages = Math.ceil(result.pagination.total / result.pagination.limit);
    const response: ResponseListSuccess<typeof result.hits> = {
      code: 200,
      message: 'Lấy danh sách banner thành công',
      data: {
        hits: result.hits,
        pagination: {
          totalRows: result.pagination.total,
          totalPages,
        },
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message || 'Lỗi khi lấy danh sách banner',
      errors: [],
    };

    res.status(500).json(response);
  }
};

export const getBannerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const banner = await bannerService.getBannerById(id);

    if (!banner) {
      const notFoundResponse: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Banner không tồn tại',
        errors: [],
      };
      res.status(404).json(notFoundResponse);
      return;
    }

    const response: ResponseDetailSuccess<typeof banner> = {
      code: 200,
      message: 'Lấy chi tiết banner thành công',
      data: banner,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message || 'Lỗi khi lấy chi tiết banner',
      errors: [],
    };

    res.status(500).json(response);
  }
};

export const createBanner = async (req: Request, res: Response) => {
  try {
    const { imageUrl, title, subtitle, link, order, isActive, startDate, endDate } = req.body;

    if (!imageUrl || order === undefined) {
      const badRequest: ResponseFailure = {
        code: 400,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc (imageUrl, order)',
        errors: [],
      };
      res.status(400).json(badRequest);
      return;
    }

    // Parse order to number
    const parsedOrder = parseInt(order as string, 10);
    if (isNaN(parsedOrder)) {
      const badRequest: ResponseFailure = {
        code: 400,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Thứ tự hiển thị phải là số nguyên',
        errors: [],
      };
      res.status(400).json(badRequest);
      return;
    }

    // Parse isActive from string to boolean
    const parsedIsActive = isActive === 'true' || isActive === true;

    const newBanner = await bannerService.createBanner({
      imageUrl: imageUrl.trim(),
      title: title?.trim(),
      subtitle: subtitle?.trim(),
      link: link?.trim(),
      order: parsedOrder,
      isActive: parsedIsActive,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });

    const response: ResponseDetailSuccess<typeof newBanner> = {
      code: 201,
      message: 'Tạo banner thành công',
      data: newBanner,
    };

    res.status(201).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message || 'Lỗi khi tạo banner',
      errors: [],
    };

    res.status(500).json(response);
  }
};

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, order, isActive, startDate, endDate, imageUrl: bodyImageUrl } = req.body;
    const file = (req as any).file;

    // If file is uploaded, upload to cloudinary; otherwise use imageUrl from body
    let imageUrl: string | undefined;
    if (file) {
      const cloudinaryRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'banner',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(file.buffer);
      });
      imageUrl = (cloudinaryRes as any).secure_url;
    } else if (bodyImageUrl) {
      imageUrl = bodyImageUrl;
    }

    // Parse order to number if provided
    const parsedOrder = order !== undefined ? parseInt(order as string, 10) : undefined;
    if (order !== undefined && isNaN(parsedOrder!)) {
      const badRequest: ResponseFailure = {
        code: 400,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Thứ tự hiển thị phải là số nguyên',
        errors: [],
      };
      res.status(400).json(badRequest);
      return;
    }

    const updateData: any = {};

    if (title !== undefined) updateData.title = title.trim();
    if (subtitle !== undefined) updateData.subtitle = subtitle.trim();
    if (link !== undefined) updateData.link = link.trim();
    if (parsedOrder !== undefined) updateData.order = parsedOrder;
    if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : undefined;
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : undefined;

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedBanner = await bannerService.updateBanner(id, updateData);

    if (!updatedBanner) {
      const notFoundResponse: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Banner không tồn tại',
        errors: [],
      };
      res.status(404).json(notFoundResponse);
      return;
    }

    const response: ResponseDetailSuccess<typeof updatedBanner> = {
      code: 200,
      message: 'Cập nhật banner thành công',
      data: updatedBanner,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message || 'Lỗi khi cập nhật banner',
      errors: [],
    };

    res.status(500).json(response);
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await bannerService.deleteBanner(id);

    if (!deleted) {
      const notFoundResponse: ResponseFailure = {
        code: 404,
        timestamp: new Date().toISOString(),
        path: req.path,
        message: 'Banner không tồn tại',
        errors: [],
      };
      res.status(404).json(notFoundResponse);
      return;
    }

    const response: ResponseDetailSuccess<typeof deleted> = {
      code: 200,
      message: 'Xóa banner thành công',
      data: deleted,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message || 'Lỗi khi xóa banner',
      errors: [],
    };

    res.status(500).json(response);
  }
};

export const getActiveBanners = async (req: Request, res: Response) => {
  try {
    const banners = await bannerService.getActiveBanners();

    const response: ResponseListSuccess<typeof banners> = {
      code: 200,
      message: 'Lấy danh sách banner hoạt động thành công',
      data: {
        hits: banners,
        pagination: {
          totalRows: banners.length,
          totalPages: 1,
        },
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: ResponseFailure = {
      code: 500,
      timestamp: new Date().toISOString(),
      path: req.path,
      message: error.message || 'Lỗi khi lấy danh sách banner',
      errors: [],
    };

    res.status(500).json(response);
  }
};
