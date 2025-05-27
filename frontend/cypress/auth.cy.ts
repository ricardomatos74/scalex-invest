describe('Fluxo de autenticação', () => {
  it('deve cadastrar e fazer login', () => {
    const email = `test${Date.now()}@example.com`;
    const password = 'password123';

    // Cadastro
    cy.request('POST', 'http://localhost:4000/users', { email, password }).then((res) => {
      expect(res.status).to.eq(201);
    });

    // Login
    cy.request('POST', 'http://localhost:4000/auth/login', { email, password }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
      // Armazena token para outros testes se necessário
      cy.wrap(res.body.token).as('token');
    });
  });
});
