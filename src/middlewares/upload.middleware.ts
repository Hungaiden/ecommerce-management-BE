import type { Request, Response, NextFunction } from 'express'
import { uploadImage } from '../services/admin/cloudinary.service'

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next()
  }

  try {
    const imageUrl = await uploadImage(req.file.buffer)
    req.body[req.file.fieldname] = imageUrl
    next()
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error })
  }
}
