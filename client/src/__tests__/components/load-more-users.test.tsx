import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import LoadMoreUsers from '@/components/load-more-users'
import { getAllUsersQuery } from '@/queries/users.query'


describe('Load more users component testing', () => {
  const mocks = [
    {
      request: {
        query: getAllUsersQuery,
      },
      result: {
        data: {
          users: [
            {
              name: 'Kristi Daniel',
              email: 'Ellis43@hotmail.com',
              phoneNumber: '386-645-6579',
              address: {
                street: 'Rogahn Greens',
                city: 'Fort Eudoraside',
                zipCode: '25639-6477',
              },
            },
          ],
        },
      },
    },
  ]

  it('renders without error', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoadMoreUsers users={mocks[0].result.data.users} />
      </MockedProvider>
    )
    const userText = screen.getByTestId('user-info-0')
    expect(userText).toHaveTextContent(
      'Kristi Daniel Ellis43@hotmail.com 386-645-6579'
    )
  })
})
