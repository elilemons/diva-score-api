import dotenv from 'dotenv'
import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Admins from './collections/Admins'
import Users from './collections/Users'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const mockModulePath = path.resolve(__dirname, './mocks/emptyModule.js')

export default buildConfig({
  admin: {
    user: Admins.slug,
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          'handlebars',
          'inline-css',
          path.resolve(__dirname, './email/sendTemplatedEmail'),
          path.resolve(__dirname, './email/generateEmailHTML'),
        ].reduce(
          (alias, aliasPath) => ({
            ...alias,
            [aliasPath]: mockModulePath,
          }),
          config.resolve.alias,
        ),
      },
    }),
  },

  editor: slateEditor({}),
  collections: [Admins, Users],
  typescript: {
    declare: false, // Makes this useable in a non-payload lib
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  cors: [process.env.PAYLOAD_PUBLIC_APP_URL, 'capacitor://localhost'].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_APP_URL, 'capacitor://localhost'].filter(Boolean),
})
