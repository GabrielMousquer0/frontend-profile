const description = `
mutation DescriptionUser($description: String, $id: ID!) {
    description(description: $description, id: $id) {
        description
    }
}
`;

export { description };
