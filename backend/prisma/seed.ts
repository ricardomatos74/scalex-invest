import bcrypt from 'bcryptjs';
import prisma from '../src/prisma/client';

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const investor = await prisma.user.create({
    data: { name: 'Investidor', email: 'investidor@example.com', passwordHash, role: 'investidor' },
  });

  const companyUser = await prisma.user.create({
    data: { name: 'Empresa', email: 'empresa@example.com', passwordHash, role: 'empresa' },
  });

  const company = await prisma.company.create({
    data: { userId: companyUser.id, name: 'ScaleX', bio: 'Bio exemplo', website: 'https://scalex.com' },
  });

  await prisma.project.create({
    data: {
      companyId: company.id,
      title: 'Projeto Exemplo',
      description: 'Descrição do projeto',
      totalAmount: 100000,
      percentageOffered: 10,
      maxInvestors: 100,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'ativo',
    },
  });

  await prisma.user.create({
    data: { name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
