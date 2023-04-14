const editLanguages = `
mutation LanguageUpdate($languages: [ID!], $id: ID!) {
    editLanguages(languages: $languages, id: $id)
}
`;

export { editLanguages };
