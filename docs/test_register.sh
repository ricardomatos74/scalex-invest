#!/bin/bash
# Example curl command to test registration endpoint
curl -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","password":"123456","role":"INVESTIDOR"}'
