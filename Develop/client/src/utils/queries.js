import { gql } from "@apollo/client";

export const query_me = gql`
{
    me{
        _id
        username
        email
        savedBooks {
          authors
          description
          bookId
          title
          image
          link
        }
    }
}
`





