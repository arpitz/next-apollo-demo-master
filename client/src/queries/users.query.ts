import { gql } from '@apollo/client'

export const getAllUsersQuery = gql`
  query users($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      name
      email
      phoneNumber
      address {
        street
        city
        zipCode
      }
    }
  }
`
