import Banner from '../../../models/marketing/banner.model';

interface BannerQuery {
  isActive?: boolean;
  offset?: number;
  limit?: number;
}

interface BannerData {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  order?: number;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export const getBanners = async (query: BannerQuery) => {
  const { isActive, offset = 0, limit = 20 } = query;

  const filter: any = {};
  if (isActive !== undefined) {
    filter.isActive = isActive;
  }

  const total = await Banner.countDocuments(filter);
  const hits = await Banner.find(filter).sort({ order: 1 }).skip(offset).limit(limit);

  return {
    hits,
    pagination: {
      total,
      offset,
      limit,
    },
  };
};

export const getBannerById = async (id: string) => {
  return await Banner.findById(id);
};

export const createBanner = async (data: BannerData) => {
  const banner = new Banner(data);
  return await banner.save();
};

export const updateBanner = async (id: string, data: BannerData) => {
  return await Banner.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBanner = async (id: string) => {
  return await Banner.findByIdAndDelete(id);
};

export const getActiveBanners = async () => {
  const now = new Date();
  return await Banner.find({
    isActive: true,
    $and: [
      { $or: [{ startDate: { $exists: false } }, { startDate: { $lte: now } }] },
      { $or: [{ endDate: { $exists: false } }, { endDate: { $gte: now } }] },
    ],
  }).sort({ order: 1 });
};
