import 'dotenv/config';
import express from 'express';
import prisma from './prisma.js';

const app = express();
const porta = process.env.PORT || 3000;

// Permite que o servidor entenda requisições com corpo em JSON
app.use(express.json());

// Rota simples para verificar se o servidor está no ar
app.get('/api/saude', (req, res) => {
  res.json({ status: 'ok' });
});

// Rota que busca os produtos ativos no banco, ordenados pelo nome
app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    res.json(produtos);
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    res.status(500).json({ erro: 'Não foi possível carregar os produtos.' });
  }
});

// Inicia o servidor na porta configurada
app.listen(porta, () => {
  console.log(`Servidor da Santo Forno rodando em http://localhost:${porta}`);
});
