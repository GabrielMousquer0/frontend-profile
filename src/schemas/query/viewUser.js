const viewUser = `
query viewUser($id: ID!) {
    viewUser(id: $id) {
        username
        id
        role
        avatar
        description
        created_at
    }
}
`;

export { viewUser };
