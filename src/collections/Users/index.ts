import { CollectionConfig } from 'payload/types'
import { isAdminOrRequestingSelf } from '../../access/roles'
import generateForgotPasswordEmail from './emails/generateForgotPasswordEmail'
import generateVerifyEmail from './emails/generateVerifyEmail'
import generateForgotPasswordToken from './endpoints/generateForgotPasswordToken'

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
  endpoints: [
    {
      path: '/generate-forgot-password-token',
      method: 'get',
      handler: generateForgotPasswordToken,
    },
  ],
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
}

export default Users
