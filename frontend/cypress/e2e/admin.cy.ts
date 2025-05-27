describe('Painel Admin', () => {
  it('deve permitir acesso com token válido', () => {
    const email = `admin${Date.now()}@example.com`;
    const password = 'password123';

    // Cadastro do usuário
    cy.request('POST', 'http://localhost:4000/users', { email, password });

    // Login para obter token
    cy.request('POST', 'http://localhost:4000/auth/login', { email, password }).then((loginRes) => {
      const token = loginRes.body.token;

      cy.request({
        method: 'GET',
        url: 'http://localhost:4000/admin/users',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((adminRes) => {
        expect(adminRes.status).to.eq(200);
      });
    });
  });

  it('deve negar acesso sem token', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:4000/admin/users',
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });
});
