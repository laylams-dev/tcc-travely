## Instruções úteis para o backend

- Duplicar o arquivo **.env.test** e preenchê-lo conforme configurações da sua máquina;
  
- Necessário ter uma instância ativa e rodando do MySQL:
  - Durante o primeiro acesso, necessário criar manualmente um *schema* chamado **travely**
  - Em caso de erro, verificar se o serviço a seguir está rodando, no gerenciador de tarefas
  ```
  MySQL80
  ```

- A autenticação do usuário é feita por meio de cookie de sessão;

- Há vários comandos úteis do AdonisJS disponíveis. Para conhecer:
  ```
  node ace -h
  ```

- Para rodar o backend utilizar um dos comandos
  ```
  npm run dev
  OU
  node ace serve --watch
  ```

