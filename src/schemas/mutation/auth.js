const auth = `
mutation Auth($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    password
    username
    role
    avatar
    id
    email
    created_at
    description
  }
}
`;

export { auth };
