import { Admin, UserOnRequest } from '@elilemons/diva-score-lib'
import testCredentials from './credentials'

// TODO Set up tests
require('isomorphic-fetch')

describe('Admins', () => {
  it('should allow an admin to log in', async () => {
    const result: UserOnRequest<Admin> = await fetch(
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

    expect(result.token).toBeDefined()
  })
})
