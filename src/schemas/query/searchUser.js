const searchUser = `
query searchUser($username: String!) {
    searchUser(username: $username) {
        username
        id
        role
        avatar
        description
        created_at
    }
}
`;

export { searchUser };
