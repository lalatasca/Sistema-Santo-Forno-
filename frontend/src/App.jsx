import { useEffect, useState } from 'react';

function App() {
  // Estados para guardar a lista de produtos, o carregamento e possíveis erros
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca os produtos no back-end assim que a tela abre
  useEffect(() => {
    async function carregarProdutos() {
      try {
        // O Vite redireciona /api/produtos para http://localhost:3000/api/produtos
        const resposta = await fetch('/api/produtos');

        if (!resposta.ok) {
          throw new Error('Erro ao buscar dados do servidor');
        }

        const dados = await resposta.json();
        setProdutos(dados);
      } catch (err) {
        setErro('Não foi possível carregar os produtos. Verifique se o back-end está rodando.');
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  // Formata números como moeda brasileira (ex: 40 -> R$ 40,00)
  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <div className="container">
      <header>
        <h1>Santo Forno</h1>
        <p>Produtos cadastrados no sistema</p>
      </header>

      <main>
        {carregando && <p className="mensagem">Carregando produtos...</p>}

        {erro && <p className="mensagem erro">{erro}</p>}

        {!carregando && !erro && produtos.length === 0 && (
          <p className="mensagem">Nenhum produto ativo encontrado.</p>
        )}

        {!carregando && !erro && produtos.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.categoria}</td>
                  <td className="preco">{formatarPreco(produto.preco)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default App;
