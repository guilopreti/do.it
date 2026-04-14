# DO.IT ✅

O **DO.IT** é uma aplicação front-end voltada para o gerenciamento de rotina e anotação de tarefas diárias. O projeto conta com páginas para cadastro de conta, login seguro e um dashboard pessoal de atividades.

## 🚀 Funcionalidades

- **Cadastro e Login:** Crie sua conta com e-mail/senha.
- **Gerenciamento de Tarefas:** Adicione suas atividades do dia-a-dia e as marque para exclusão/conclusão com um clique.
- **Funcionamento Local (Off-grid):** Anteriormente o projeto dependia de uma API da Kenzie Academy para o seu funcionamento. Devido à sua descontinuação, o serviço inteiro foi contornado construindo uma API Mockada Local. Cadastros e tarefas agora residem ativamente e perfeitamente funcionais via `localStorage` do navegador.
- **Criptografia Simulada:** Durante o processo de sign-up local, operamos um hash nas senhas processando-as com `bcryptjs` de forma que nem ao debugar o LocalStorage os dados originais se tornem legíveis de primeira.
- **Avisos (Toasts):** Feedback visual para todas as ações cruciais do sistema (campos em branco, senhas inválidas, criação com sucesso, etc).

## 🛠 Tecnologias Principais

- [ReactJS](https://reactjs.org/) na base
- [Styled Components](https://styled-components.com/) para estilização elegante
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) para lidar com inputs e formulários
- [React Router DOM (v5)](https://v5.reactrouter.com/) para roteamento de páginas
- [React Toastify](https://fkhadra.github.io/react-toastify/) e [React Icons](https://react-icons.github.io/react-icons/)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) para segurança no armazenamento

## 💻 Como Rodar o Projeto Localmente

1. **Clone repositório e navegue até a pasta:**

```bash
git clone <url-do-repositorio>
cd do.it
```

2. **Instale as dependências:**

```bash
yarn install
# ou
npm install
```

3. **Inicie o servidor de desenvolvimento:**

```bash
yarn start
# ou
npm start
```

A página abrirá automaticamente no navegador em `http://localhost:3000`.
