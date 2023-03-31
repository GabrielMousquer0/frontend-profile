const auth = `
mutation Auth($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    password
    username
    role
    avatar
    id
    email
  }
}
`;

const register = `
mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
}
`;

const edit = `
mutation Edit($email: String, $username: String, $password: String, $avatar: String, $id: ID!) {
    edit(email: $email, username: $username, password: $password, avatar: $avatar, id: $id) {
        id
        username
        email
        password
    }
}
`;

export { auth, register, edit };
