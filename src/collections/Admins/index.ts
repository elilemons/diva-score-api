import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../../access/roles'

const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  auth: true,
  fields: [],
}

export default Admins
