import { CollectionConfig } from 'payload/types'
import { isAdminOrRequestingSelf } from '../../access/roles'
import { generateForgotPasswordToken } from './endpoints/generateForgotPasswordToken'
import generateForgotPasswordEmail from './generateForgotPasswordEmail'
import generateVerifyEmail from './generateVerifyEmail'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 1814400,
    verify: {
      generateEmailHTML: generateVerifyEmail,
    },
    depth: 0,
    forgotPassword: {
      generateEmailHTML: generateForgotPasswordEmail,
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: () => true,
    update: isAdminOrRequestingSelf,
    delete: isAdminOrRequestingSelf,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
  endpoints: [
    {
      path: '/generate-forgot-password-token',
      method: 'get',
      handler: generateForgotPasswordToken,
    },
  ],
}

export default Users
