# Manual Testing Checklist

## Cadastro
- [ ] POST `/users` com `email` e `password` retorna **201** e objeto do usuário

## Login
- [ ] POST `/auth/login` com credenciais válidas retorna **token**
- [ ] POST `/auth/login` com senha incorreta retorna **401**

## Painel Admin
- [ ] GET `/admin/users` **sem** token retorna **401**
- [ ] GET `/admin/users` **com** token retorna **200** e lista de usuários

## Fluxo Completo
1. Criar usuário
2. Realizar login e obter token
3. Acessar rota protegida com token

> Nenhum bug crítico identificado até o momento.
