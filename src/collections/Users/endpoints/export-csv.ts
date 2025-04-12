import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'
import Users from '..'
import { json2csv } from 'json-2-csv'

/**
 * Generates a CSV file of all users (Filters don't work though and I do not know why)
 * @param req
 * @param res
 * @returns
 */
const exportCSV = async (req: PayloadRequest, res: Response, next: NextFunction) => {
  try {
    const { payload, user } = req

    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized access' })
    }

    const query = req.query

    // Get the current filter parameters
    const where = query.where ? JSON.parse(query.where as string) : {}

    payload.logger.info(`Exporting users with filters: ${JSON.stringify(payload.Query)}`)

    // Fetch users with current filters
    const users = await payload.find({
      collection: Users.slug,
      where,
      limit: 0, // No limit to get all results
    })

    // Transform data for CSV
    const csvData = users.docs.map((user) => ({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      verified: user.verified ? 'Yes' : 'No',
      // Add any other fields you want to export
    }))

    // Convert to CSV
    const csv = json2csv(csvData)

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=users-export-${Date.now()}.csv`)

    return res.send(csv)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to export users' })
    next(error)
  }
}

export default exportCSV
