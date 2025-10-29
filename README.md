# PostVision

Sistema de Correção de Postura com Análise de Agachamento via Visão Computacional

O **PostVision** é um aplicativo desenvolvido em **Next.js** que utiliza **visão computacional** para analisar a postura do usuário durante o exercício de **agachamento**, auxiliando na correção de movimentos incorretos e promovendo treinos mais seguros e eficientes.

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/renanzanettio/web-postvision.git

```

### 2. Inicie o servidor de banco de dados

- Abra o **XAMPP** e ative o módulo **MySQL**.
- Inicie o banco de dados pelo **HeidiSQL** ou **MySQL Workbench**.

### 3. Importe o banco de dados

Na raiz do projeto existe o arquivo `postvision.sql`.

Importe-o para o seu servidor MySQL para criar as tabelas e dados necessários.

Dica: No HeidiSQL, clique com o botão direito sobre o banco de dados e selecione **Executar SQL**, depois carregue o arquivo `postvision.sql`.

---

### 4. Configure o arquivo `.env`

Renomeie o arquivo:

```bash
.env-RENAME → .env

```

Dentro dele há a variável de conexão com o banco:

```
DATABASE_URL="mysql://root@localhost:3306/postvision"

```

Se o seu MySQL tiver senha ou porta diferente, altere conforme necessário:

- `root` → nome do seu usuário MySQL
- `localhost` → endereço do servidor
- `3306` → porta do MySQL
- `postvision` → nome do banco criado

Exemplo:

```
DATABASE_URL="mysql://usuario:minhasenha@localhost:3307/postvision"

```

---

### 5. Instale as dependências

```bash
npm install

```

---

### 6. Execute o projeto

```bash
npm run dev

```

O servidor será iniciado em:

http://localhost:3000

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
| --- | --- |
| **Next.js** | Framework React moderno, com renderização híbrida (SSR e SSG). |
| **TypeScript** | Tipagem estática e segurança no desenvolvimento. |
| **MySQL + Prisma ORM** | Banco de dados relacional com ORM moderno e intuitivo. |
| **Node.js** | Ambiente de execução JavaScript para o backend. |

---

## Principais Bibliotecas

### Prisma

ORM que facilita a integração com o banco de dados MySQL, permitindo gerar o cliente automaticamente e realizar migrações com segurança.

Usado para autenticação, cadastro e gerenciamento de usuários.

### bcryptjs

Biblioteca para criptografia de senhas, garantindo segurança nos dados armazenados.

### jsonwebtoken (JWT)

Usado para autenticação de usuários, gerando tokens seguros para login e controle de sessão.

### Recharts

Biblioteca de gráficos interativos em React, utilizada para exibir estatísticas dos treinos, comparativos e desempenhos do usuário.

### MediaPipe

Usado para análise de postura e detecção de landmarks corporais, possibilitando a avaliação da execução dos agachamentos em tempo real.

### Iconify

Biblioteca de ícones universais, integrada ao design do sistema para compor uma interface moderna e intuitiva.
