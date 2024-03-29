import { AuthCollectionSlugs } from '@elilemons/diva-score-lib'
import { PayloadRequest } from 'payload/dist/express/types'
import { Access, FieldAccess } from 'payload/types'

export const checkCollection = (
  collectionsSlugs: Array<AuthCollectionSlugs> | AuthCollectionSlugs,
  req: PayloadRequest,
): boolean => {
  const { user } = req
  if (user && user.collection) {
    const collectionsToCheck = Array.isArray(collectionsSlugs)
      ? collectionsSlugs
      : [collectionsSlugs]
    return collectionsToCheck.includes(user.collection as AuthCollectionSlugs)
  }

  return false
}

export const isUser = ({ req }: { req: PayloadRequest }): boolean => {
  if (req.user) {
    return checkCollection(['admins', 'users'], req)
  }
  return false
}

export const isAdmin = ({ req }: { req: PayloadRequest }): boolean => {
  if (req.user) {
    return checkCollection('admins', req)
  }
  return false
}

export const isAdminOrRequestingSelf: FieldAccess = ({ req, id }) => {
  if (req?.user?.id) {
    if (checkCollection('admins', req) || req.user.id === id) {
      return true
    }
  }
  return false
}

export const isAdminOrUsersSurvey: Access = ({ req }) => {
  if (req?.user?.id) {
    if (checkCollection('admins', req)) {
      return true
    }
    return {
      surveyUser: { equals: req.user.id },
    }
  }
}
