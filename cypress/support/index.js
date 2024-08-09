const toBase64 = (str) => Buffer.from(str).toString('base64');

Cypress.Commands.add('getAuthToken', () => {

    const clientId = '67823c6d-58de-494f-96d9-86a4c22682cb';
    const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4';
    const authString = `${clientId}:${clientSecret}`;

    const base64AuthString = toBase64(authString);

    cy.request({
        method: 'POST',
        url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64AuthString}`
        },
        body: 'grant_type=client_credentials&scope=oob',
        form: true
    }).then((response) => {
        expect(response.status).to.eq(200);
        Cypress.env('authToken', response.body.access_token);
    });
});
