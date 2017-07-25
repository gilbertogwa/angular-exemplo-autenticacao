## Angular, API .Net Core, Nancy Framework, JWT e Angular Material

Este repositório contém projetos demonstrando soluções de como implementar uma autenticação JWT com
Angular e ASP.NET CORE.

### Coisas que você pode aprender com este exemplo?

1. Usar o framework Nancy para criação de APIs REST no .NET Core
2. Desabilitar o CORS no framework Nancy
3. Usar o framework AutoFac com Nancy para injeção de dependência
4. Implementar Autenticação usando JWT no .NET Core
5. Token com tempo de expiração
6. Usar o componente Table do angular2-material
7. Implementar Autenticação JWT no Angular
8. Proteger um link no Angular

### Instruções para execução em desenvolvimento

#### I. Baixe este repositório

#### II. Crie o banco de dados

1. Abra uma conexão com o SQL Server (deve ter direito administrativos)
2. Execute os scripts de criação do banco de dados, tabela e inserts

#### III. Configure e execute a API (Visual Studio 2017)
 
1. Abra o projeto
2. No arquivo **appsettings.json**, configure a conexão com o banco de dados
3. Execute o projeto

#### IV. Baixe os pacotes e inicie o projeto Web 

> Para este projeto você precisa ter instalado o NodeJs (versão min 4) e Angular CLI
>> Se não tiver o NodeJS, baixe-o através do site http://nodejs.org/

>> Caso não tenha o Angular CLI (depende do NodeJS), você pode instalá-lo 
>> executando o comando **npm install -g @angular/cli** 

1. Dentro da pasta web, execute o comando **npm install**
2. Após a conclusão, execute o comando **ng serve**

Para navegar no site use a URL `http://localhost:4200/`

