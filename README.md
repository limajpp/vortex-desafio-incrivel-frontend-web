# 💻 Desafio Incrível - Expenzeus (Vortex)

A central de comando do ecossistema Vortex. Um dashboard administrativo focado em análise de dados, visualização gráfica e gestão detalhada de despesas.

## 📖 Sobre o Projeto

Este projeto é o Front-end Web do Desafio Vortex. Enquanto o aplicativo móvel foca na agilidade de inserção, esta aplicação web oferece uma visão macro da vida financeira do usuário.

Desenvolvido com React e Vite, o projeto utiliza componentes modernos do shadcn/ui para criar uma interface limpa, acessível e responsiva, com suporte nativo a temas (Dark/Light Mode).

## ✨ Funcionalidades

### 📊 Dashboard Analítico
- Visão Geral: Gráfico de barras interativo mostrando o fluxo de despesas por mês/ano.
- Tabela Detalhada: Listagem completa de gastos com paginação e formatação monetária.
- Resumos: Cards de destaque com totais calculados automaticamente.

### 🔐 Autenticação & Segurança
- Login & Cadastro: Interface elegante com validação de formulários em tempo real.
- Proteção de Rotas: Sistema de AuthGuard que impede acesso não autorizado às páginas internas.
- Persistência: Gerenciamento automático de tokens JWT no localStorage.

### 🛠️ Gestão Completa (CRUD)
- Adicionar/Editar: Modais intuitivos para criar ou corrigir lançamentos.
- Excluir: Remoção de registros com confirmação de segurança.
- Feedback Visual: Notificações (Toasts) para sucesso ou erro em todas as operações.

## 🛠️ Tech Stack
- Core: React + Vite
- Linguagem: TypeScript
- Estilização: Tailwind CSS
- Componentes UI: shadcn/ui (baseado em Radix UI)
- Gráficos: Recharts
- Formulários: React Hook Form (implícito na lógica) + Validações manuais robustas
- HTTP Client: Axios
- Ícones: Lucide React

## 🏃‍♂️ Como Rodar

### Pré-requisitos
- Node.js (v18+) e npm/yarn/pnpm instalados.
- A API do Vortex rodando (localmente ou em produção).

### Passo a Passo

Clone o repositório:
```bash
git clone https://github.com/seu-usuario/vortex-desafio-frontend-web.git
cd vortex-frontend-web
```

Instale as dependências:
```bash
npm install
```

Configure a API:
- Verifique o arquivo `src/services/api.ts`.
- Por padrão, ele pode apontar para `http://localhost:3000/`. Se necessário, ajuste a `baseURL`.

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse:
- O projeto estará disponível em http://localhost:5173.

## 📂 Estrutura do Projeto

```text
src/
├── components/
│   ├── dashboard/      # Widgets específicos (Gráficos, Tabelas, Dialogs)
│   ├── guards/         # Proteção de rotas (AuthGuard)
│   ├── layouts/        # Layouts de página (AuthLayout)
│   └── ui/             # Componentes base (Botões, Inputs, Cards - shadcn)
├── lib/                # Utilitários (cn, formatters)
├── pages/
│   ├── auth/           # Telas de Login e Registro
│   └── dashboard.tsx   # Tela principal
├── services/           # Comunicação com API (Axios)
└── App.tsx             # Configuração de Rotas

---
```
