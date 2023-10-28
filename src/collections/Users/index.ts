import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 1814400,
    verify: true,
    depth: 0,
    forgotPassword: {
      // generateEmailHTML: generateForgotPasswordEmail, // TODO
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
