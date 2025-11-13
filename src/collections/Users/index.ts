import { CollectionConfig } from 'payload/types'
import { isAdminOrRequestingSelf } from '../../access/roles'
import generateForgotPasswordEmail from './emails/generateForgotPasswordEmail'
import generateVerifyEmail from './emails/generateVerifyEmail'
import exportCSV from './endpoints/export-csv'
import generateForgotPasswordToken from './endpoints/generateForgotPasswordToken'
import { getTotalUsers } from './endpoints/getTotalUsers'

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
      path: '/export-csv',
      method: 'get',
      handler: exportCSV,
    },
    {
      path: '/generate-forgot-password-token',
      method: 'get',
      handler: generateForgotPasswordToken,
    },
    {
      path: '/get-total-users',
      method: 'get',
      handler: getTotalUsers,
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
