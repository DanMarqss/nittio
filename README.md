# Nittio - Monorepo

Este projeto é um teste técnico full-stack (Node.js + Next.js) que implementa uma plataforma social interativa.

## Estrutura do Projeto

O projeto está organizado como um monorepo com duas pastas principais:

- **backend/**: API Node.js com Express e Mongoose (TypeScript).
- **frontend/**: Aplicação Next.js (TypeScript) com Tailwind CSS.

## Funcionalidades

- Listagem de usuários.
- Envio de "flechadas" (interações) entre usuários.
- Animação visual da flechada no frontend.
- Backend robusto com suporte a MongoDB e modo Mock (fallback).

## Pré-requisitos

- Node.js (v18+)
- MongoDB (Opcional - o sistema roda em modo Mock se não encontrar o banco)

## Como Rodar

1. Instale as dependências de ambos os projetos:
   ```bash
   npm run install:all
   ```

2. Inicie a aplicação (Front e Back simultaneamente):
   ```bash
   npm start
   ```

   - O Frontend estará disponível em: `http://localhost:3000`
   - O Backend estará disponível em: `http://localhost:5000`

## Decisões Técnicas

- **Monorepo**: Facilita a gestão de dependências e execução do projeto em um único comando.
- **Backend**:
  - **Arquitetura em Camadas**: Controllers, Models, Routes e Config separados.
  - **Mock Mode**: Implementado um fallback para dados em memória caso o MongoDB não esteja disponível, garantindo que o avaliador consiga testar a aplicação sem configurar banco de dados local.
  - **TypeScript**: Tipagem forte para maior segurança e manutenibilidade.
- **Frontend**:
  - **Next.js App Router**: Utilizando a versão mais recente e performática.
  - **Tailwind CSS**: Estilização rápida e responsiva.
  - **Framer Motion**: Utilizado para criar a animação da flecha de forma fluida.
  - **Componentização**: `UserCard` e `FlechadaLayer` isolados para reutilização e clareza.

## API Endpoints

- `GET /api/users`: Lista todos os usuários.
- `POST /api/interactions`: Cria uma nova interação (flechada).
  - Body: `{ senderId: string, receiverId: string }`

## Diferenciais Implementados

- ✅ Componentização bem definida
- ✅ Feedback visual (loading, animação)
- ✅ Organização de pastas clara (Monorepo)
- ✅ Boas práticas de API (Status codes, tratamento de erros)
- ✅ Fallback para Mock Mode (Zero config database)
