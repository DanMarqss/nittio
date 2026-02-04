# Nittio - Frontend Challenge

Esta é a implementação do desafio frontend da Nittio, focando em uma experiência de usuário "Gen Z", vibrante e interativa para eventos.

## Funcionalidades Implementadas

### 1. Design System & UI/UX
- **Tema Escuro (Dark Mode):** Base `#0a0a0a` para imersão total.
- **Cor Primária:** Azul Elétrico (`#0055FF`) usado para ações principais e destaques.
- **Tipografia:** Fontes sem serifa modernas e limpas.
- **Grid Responsivo:** Layout de 12 colunas adaptável para mobile e desktop.

### 2. Página de Evento
- **Hero Section:** Poster do evento com efeito de hover e parallax.
- **Tabs de Navegação:** Alternância suave entre "Detalhes" e "Social" usando Framer Motion.
- **Grid de Participantes:** Visualização dos amigos e outros participantes do evento.

### 3. Funcionalidade "Flechada" (Cupid Arrow)
- **Conceito:** Uma interação divertida onde o usuário pode "flechar" alguém que também vai ao evento.
- **Animação:** Ao clicar em "Flechar", uma seta animada sai da posição do usuário atual e voa até o alvo.
- **Tecnologia:** Implementado com `Framer Motion` e cálculos de geometria (ângulo e distância) em tempo real.

## Estrutura do Projeto

- `/frontend`: Aplicação Next.js 13+ (App Router).
- `/backend`: API simples em Node.js/Express (Mock data).

## Como Rodar

### Pré-requisitos
- Node.js 18+
- NPM

### Passos

1. **Instalar dependências (Raiz):**
   ```bash
   npm install
   ```

2. **Iniciar o Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   O servidor rodará em `http://localhost:5000`.

3. **Iniciar o Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Acesse `http://localhost:3000`.

## Decisões Técnicas

- **Framer Motion:** Escolhido pela fluidez e facilidade em criar animações complexas de layout (`layoutId`) e elementos voadores.
- **Tailwind CSS:** Para desenvolvimento rápido e consistente seguindo o design system.
- **Arquitetura de Componentes:** 
  - `FlechadaLayer`: Camada superior isolada para animações globais, evitando problemas de z-index e overflow.
  - `Header`: Componente reutilizável de navegação.

## Próximos Passos (Melhorias)
- Integração com Banco de Dados Real (MongoDB).
- Sistema de Notificações em Tempo Real (Socket.io).
- Perfil detalhado do usuário.
