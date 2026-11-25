# Sistema Administrativo - Santo Forno

Esqueleto inicial do sistema da padaria artesanal **Santo Forno** (Serra Negra - SP).

## Pré-requisitos
Antes de começar, certifique-se de ter instalados no seu computador:
- **Node.js** (versão 20 ou superior)
- **PostgreSQL** rodando localmente

---

## Passo a passo para rodar o projeto

### 1. Criar o banco de dados no PostgreSQL
Abra o terminal do PostgreSQL (`psql`) ou o pgAdmin e crie um banco vazio chamado `santo_forno`:

```sql
CREATE DATABASE santo_forno;
```

### 2. Configurar e preparar o Back-end
Abra um terminal na pasta `backend`:

```bash
cd backend
```

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure a conexão com o banco:**
   Copie o arquivo `.env.example` para um novo arquivo chamado `.env`:
   ```bash
   cp .env.example .env
   ```
   Abra o arquivo `backend/.env` e coloque o seu usuário e senha reais do PostgreSQL na linha `DATABASE_URL`.

3. **Crie a tabela no banco (Migration):**
   ```bash
   npx prisma migrate dev --name cria_tabela_produtos
   ```

4. **Insira os 5 produtos iniciais (Seed):**
   ```bash
   npx prisma db seed
   ```

5. **Inicie o servidor back-end:**
   ```bash
   npm run dev
   ```
   Deixe este terminal aberto. Você verá a mensagem: `Servidor da Santo Forno rodando em http://localhost:3000`.
   *(Você pode testar acessando `http://localhost:3000/api/saude` no navegador).*

---

### 3. Configurar e iniciar o Front-end
Abra um **segundo terminal** (sem fechar o primeiro) e entre na pasta `frontend`:

```bash
cd frontend
```

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie a interface web:**
   ```bash
   npm run dev
   ```

3. **Acesse o sistema:**
   Abra o navegador em `http://localhost:5173` para ver a tabela com os produtos da Santo Forno.

---

### 4. Como visualizar o banco de dados (Prisma Studio)
O Prisma tem uma ferramenta visual que abre as tabelas do banco no navegador, parecida com uma planilha. Para usá-la, abra um terminal na pasta `backend` e rode:

```bash
npx prisma studio
```
Ele abrirá automaticamente no navegador (geralmente em `http://localhost:5555`), onde você pode ver, editar ou adicionar produtos diretamente na tabela `produtos`.
