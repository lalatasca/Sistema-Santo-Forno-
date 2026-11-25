import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lista inicial de produtos da Santo Forno
  const produtosIniciais = [
    {
      nome: 'Toscano',
      categoria: 'Pães Italianos',
      preco: 40,
      ativo: true,
    },
    {
      nome: 'Focaccia Italiana',
      categoria: 'Especiais da Casa',
      preco: 70,
      ativo: true,
    },
    {
      nome: 'Capeletti de 4 queijos (0,5Kg)',
      categoria: 'Massas Artesanais',
      preco: 60,
      ativo: true,
    },
    {
      nome: 'Torta de Limão',
      categoria: 'Tortas',
      preco: 160,
      ativo: true,
    },
    {
      nome: 'Mel 330g',
      categoria: 'Santa Colmeia',
      preco: 25,
      ativo: true,
    },
  ];

  // Limpa a tabela antes de inserir para evitar duplicados caso rode o seed novamente
  await prisma.produto.deleteMany();

  // Insere todos os produtos de uma vez
  await prisma.produto.createMany({
    data: produtosIniciais,
  });

  console.log('Produtos iniciais da Santo Forno cadastrados com sucesso!');
}

main()
  .catch((erro) => {
    console.error('Erro ao popular o banco:', erro);
    process.exit(1);
  })
  .finally(async () => {
    // Encerra a conexão com o banco ao terminar
    await prisma.$disconnect();
  });
