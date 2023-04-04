const EmailUpdate = `
mutation EditEmail($email: String, $id: ID!) {
  editEmail(email: $email, id: $id) {
    email
  }
}
`;
const UsernameUpdate = `
mutation EditUsername($username: String, $id: ID!) {
  editUsername(username: $username, id: $id) {
    username
  }
}
`;
const PasswordUpdate = `
mutation EditPassword($password: String, $id: ID!) {
  editPassword(password: $password, id: $id) {
    password
  }
}
`;

const AvatarUpdate = `
mutation EditAvatar($avatar: String, $id: ID!) {
  editAvatar(avatar: $avatar, id: $id) {
    avatar
  }
}
`;

export { EmailUpdate, UsernameUpdate, PasswordUpdate, AvatarUpdate };
