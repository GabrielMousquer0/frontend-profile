const languages = `
mutation LanguageUpdate($LanguageInput: LanguageInput, $id: ID!) {
    languages(input: $LanguageInput, id: $id) {
        javascript
        typescript
        python
    }
}
`;

export { languages };
