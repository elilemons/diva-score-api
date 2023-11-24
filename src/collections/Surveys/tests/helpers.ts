import { UserOnRequest } from '@elilemons/diva-score-lib'
import { Admin } from 'payload/generated-types'
import testCredentials from '../../Admins/tests/credentials'

export const getAdminToken = async (): Promise<string> => {
  const adminLoginJSON: UserOnRequest<Admin> = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/admins/login`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testCredentials.email,
        password: testCredentials.password,
      }),
    },
  ).then((res) => res.json())

  return adminLoginJSON.token
}
