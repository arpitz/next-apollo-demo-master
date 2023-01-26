import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import { getNameQuery } from '@/queries/name.query'
import { MockedProvider } from '@apollo/client/testing'

describe('Home', () => {
  const mockData = [
    {
      request: {
        query: getNameQuery,
      },
      result: {
        data: {
          name: 'David',
        },
      },
    },
  ]

  it('renders without error', async () => {
    render(
      <MockedProvider mocks={mockData} addTypename={false}>
        <Home name="David" />
      </MockedProvider>
    )
    const welcomeText = screen.getByTestId('welcome-text')
    expect(welcomeText).toHaveTextContent('Welcome, David')
  })
})
