# Sistema de Emissão de Certificados

Um sistema web moderno para gerenciamento e emissão de certificados educacionais, desenvolvido com React e Vite.

🌐 **[Acesse o sistema aqui](https://front-sistema-emissao-certificado.vercel.app/)**

## 📋 Descrição

O Sistema de Emissão de Certificados é uma aplicação completa que permite a gestão de estudantes, cursos e certificados. O sistema oferece funcionalidades administrativas para emissão e validação pública de certificados através de códigos únicos.

## 🚀 Funcionalidades

### Para Administradores
- **Dashboard**: Visão geral com estatísticas de cursos, estudantes e certificados
- **Gerenciamento de Estudantes**: CRUD completo com validação de CPF
- **Gerenciamento de Cursos**: Criação e edição de cursos com carga horária e datas
- **Emissão de Certificados**: Interface para vincular estudantes a cursos e gerar certificados
- **Gerenciamento de Administradores**: Controle de usuários do sistema
- **Autenticação**: Sistema de login seguro com proteção de rotas

### Para o Público
- **Validação de Certificados**: Verificação pública através de código único
- **Visualização de PDFs**: Exibição direta do certificado no navegador
- **Impressão**: Funcionalidade para impressão dos certificados válidos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19.0.0
- **Build Tool**: Vite 6.3.1
- **Roteamento**: React Router 7.5.3
- **Estilização**: Bootstrap 5.3.5
- **Gráficos**: Chart.js 4.4.9 com React-ChartJS-2 5.3.0
- **Linting**: ESLint 9.22.0

## 📁 Estrutura do Projeto

```
src/
├── api/                    # Serviços de API
│   ├── admin.js           # Funções para comunicação com backend
│   └── BASE_URL.js        # Configuração da URL base
├── assets/                # Recursos estáticos
│   ├── green-logo.png
│   └── logo.png
├── components/            # Componentes reutilizáveis
│   ├── Header.jsx
│   ├── NavLinks.jsx
│   └── Sidebar.jsx
├── hooks/                 # Hooks customizados
│   └── useProtectedPage.jsx
├── pages/                 # Páginas da aplicação
│   ├── Admin/            # Gerenciamento de administradores
│   ├── Certificates/     # Emissão de certificados
│   ├── Courses/          # Gerenciamento de cursos
│   ├── Dashboard/        # Painel principal
│   ├── Home/             # Página inicial
│   ├── Login/            # Autenticação
│   ├── Students/         # Gerenciamento de estudantes
│   └── Validate/         # Validação pública
├── utils/                # Utilitários
│   └── utils.js
└── main.jsx              # Ponto de entrada
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd front-sistema-emissao-certificado
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
   - Edite o arquivo `src/api/BASE_URL.js`
   - Defina a URL do seu backend

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:5173`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linting do código

## 🔐 Autenticação e Rotas

### Rotas Públicas
- `/` - Página inicial
- `/certificados/validar` - Validação de certificados
- `/login` - Página de login

### Rotas Protegidas (Requer Autenticação)
- `/dashboard` - Painel administrativo
- `/alunos` - Gerenciamento de estudantes
- `/cursos` - Gerenciamento de cursos
- `/certificados` - Emissão de certificados
- `/admin` - Gerenciamento de administradores

## 📡 API Integration

O sistema se integra com uma API RESTful que deve fornecer os seguintes endpoints:

### Autenticação
- `POST /auth/login` - Login de administradores

### Administradores
- `GET /admin/admins` - Listar administradores
- `POST /admin/admins` - Criar administrador
- `PUT /admin/admins/:id` - Atualizar administrador
- `DELETE /admin/admins/:id` - Deletar administrador

### Estudantes
- `GET /admin/students` - Listar estudantes
- `POST /admin/students` - Criar estudante
- `PUT /admin/students/:id` - Atualizar estudante
- `DELETE /admin/students/:id` - Deletar estudante

### Cursos
- `GET /admin/courses` - Listar cursos
- `POST /admin/courses` - Criar curso
- `PUT /admin/courses/:id` - Atualizar curso
- `DELETE /admin/courses/:id` - Deletar curso

### Certificados
- `GET /admin/certificates` - Listar certificados
- `POST /admin/certificates/issue` - Emitir certificado
- `GET /public/certificates/download/:code` - Validar e baixar certificado

## 🎨 Características da Interface

- **Design Responsivo**: Totalmente adaptável a diferentes tamanhos de tela
- **Tema Consistente**: Paleta de cores harmoniosa com tons verdes e azuis
- **Feedback Visual**: Alertas e notificações para ações do usuário
- **Loading States**: Indicadores visuais durante carregamentos
- **Modais Interativos**: Confirmações e formulários em modais

## 🔍 Validações

- **CPF**: Validação automática de formato e dígitos verificadores
- **Email**: Validação de formato de email
- **Campos Obrigatórios**: Verificação de preenchimento
- **Códigos de Certificado**: Validação de códigos únicos

## 📱 Responsividade

O sistema é totalmente responsivo, oferecendo:
- Layout adaptável para desktop, tablet e mobile
- Navegação otimizada em dispositivos móveis
- Tabelas com scroll horizontal em telas pequenas
- Modais responsivos

## 🚀 Deploy

Para fazer o deploy em produção:

1. Execute a build:
```bash
npm run build
```

2. Os arquivos serão gerados na pasta `dist/`

3. Hospede os arquivos em um servidor web (Apache, Nginx, etc.)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](https://choosealicense.com/licenses/mit/).
