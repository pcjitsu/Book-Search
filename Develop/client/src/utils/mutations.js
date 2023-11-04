import { gql } from "@apollo/client";
export const login_user = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const add_user = gql`
  mutation addUser($username: String, $password: String, $email: String) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const save_book = gql`
  mutation saveBook(
    $authors: [String]
    $description: String
    $bookId: ID
    $title: String
    $image: String
    $link: String
  ) {
    saveBook(authors: $authors, description: $description, bookId: $bookId, title: $title, image: $image, link: $link) {
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
export const remove_book = gql `
mutation removeBook(
    $bookId: ID
){
    removeBook(
        bookId: $bookId
    ){
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

