import { useEffect, useState } from 'react'
import { User } from '@/types/auto-generated'
import { useLazyQuery } from '@apollo/client'
import { getAllUsersQuery } from '../queries/users.query'
import Link from 'next/link'

type Props = {
  users: User[]
}
const LoadMoreUsers = ({ users }: Props) => {
  const [usersData, setUsersData] = useState(users)
  const [offset, setOffset] = useState(10)

  useEffect(() => {
    setUsersData(users)
  }, [users])

  const setUsers = (users: User[]) => {
    if (!users) {
      return
    }

    const newUsers = usersData.concat(users)
    setUsersData(newUsers)
    setOffset(offset + 10)
  }

  const [fetchUsers, { loading, error }] = useLazyQuery(getAllUsersQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setUsers(data?.users ?? [])
    },
  })

  const loadMoreData = () => {
    let queryVariables = {
      limit: 10,
      offset,
    }
    fetchUsers({
      variables: queryVariables,
    })
  }

  return (
    <div>
      <div className="row">
        {usersData.map((user, index) => {
          return (
            <div
              className="card user-card"
              data-testid={'user-info-' + index}
              key={index}
              data-cy="user-card"
            >
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <Link target="_blank" href={'mailto:' + user.email}>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {' '}
                    {user.email}
                  </h6>
                </Link>
                <Link href={'tel:' + user.phoneNumber}>{user.phoneNumber}</Link>
                <div>
                  <div>{user.address?.street}</div>
                  <div>{user.address?.city}</div>
                  <div>{user.address?.zipCode}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {error ? (
        <div>Error fetching more users.</div>
      ) : (
        <div className="d-grid col-4 mx-auto my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => loadMoreData()}
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  )
}
export default LoadMoreUsers;
