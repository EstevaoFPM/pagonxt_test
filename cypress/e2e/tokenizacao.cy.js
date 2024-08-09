
describe('Teste de Tokenização', () => {
  before(() => {
    cy.getAuthToken();
  });

  it('Consultar bin', () => {
    cy.request({
      method: 'GET',
      url: 'v1/cards/binlookup/515590',
      headers: {
        Authorization: `Bearer ${Cypress.env('authToken')}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.results).to.have.length(1);

      const results = response.body.results;
      expect(results).to.be.an('array').that.is.not.empty;

      results.forEach((result) => {
        expect(result).to.have.property('country').and.not.be.empty;
        expect(result).to.have.property('issuer').and.not.be.empty;
        expect(result).to.have.property('product').and.not.be.empty;
        expect(result).to.have.property('brand').and.not.be.empty;
        expect(result).to.have.property('bin').and.be.a('number');
        expect(result).to.have.property('type').and.not.be.empty;
        expect(result).to.have.property('country_code').and.not.be.empty;
        expect(result).to.have.property('brand_code').and.be.a('number');
        expect(result).to.have.property('brazilian_issued').and.not.be.empty;
        expect(result).to.have.property('country_code_iso').and.not.be.empty;
      });
    });
  });
});
