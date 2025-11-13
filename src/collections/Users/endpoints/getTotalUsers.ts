import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import Users from '..'

export const getTotalUsers = async (req: PayloadRequest, res: Response, next?: NextFunction) => {
  const { payload } = req

  try {
    const totalUsers = await payload
      .count({
        collection: Users.slug,
      })
      .then((res) => res)

    return res.json({ totalUsers: totalUsers.totalDocs })
  } catch (error) {
    next(error)
  }
}
