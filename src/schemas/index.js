const auth = `
mutation Auth($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    password
    id
    email
  }
}
`;

const register = `
mutation Register($email: String!, $username: String!, $password: String!, $id: ID!) {
    register(email: $email, username: $username, password: $password, id: $id)
}
`;

export { auth, register };
