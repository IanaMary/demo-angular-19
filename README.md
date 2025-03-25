### Passos para usar o `json-server`

1. **Instalar o `json-server`**
   
   Primeiro, você precisa instalar o `json-server` globalmente ou como uma dependência de desenvolvimento no seu projeto.

   Para instalar globalmente, use o seguinte comando:

   ```bash
   npm install -g json-server
   ```

   Se você preferir instalar como dependência de desenvolvimento no seu projeto, faça:

   ```bash
   npm install --save-dev json-server
   ```

2. **Criar um arquivo `db.json`**

   O arquivo `db.json` deve conter dados no formato JSON que o servidor vai utilizar para criar uma API RESTful. Aqui está um exemplo de um `db.json` simples:

   ```json
   {
     "posts": [
       { "id": 1, "title": "Hello World", "author": "Iana" }
     ],
     "comments": [
       { "id": 1, "body": "Great post!", "postId": 1 }
     ]
   }
   ```

3. **Iniciar o servidor**

   Com o `json-server` instalado e o `db.json` pronto, você pode iniciar o servidor com o comando:

   ```bash
   json-server --watch db.json
   ```

   Isso vai criar um servidor de API RESTful fictício com os dados do seu arquivo `db.json`. O servidor estará rodando na porta padrão 3000, e a estrutura das rotas será automaticamente gerada com base nas coleções do JSON (como `posts`, `comments`, etc.).

   Por exemplo, você pode acessar:
   - `GET http://localhost:3000/posts` para obter todos os posts.
   - `GET http://localhost:3000/posts/1` para obter o post com o id 1.
   - `POST http://localhost:3000/posts` para adicionar um novo post.

4. **Customização**

   Você pode adicionar várias opções ao comando `json-server`, como escolher uma porta diferente com `--port`:

   ```bash
   json-server --watch db.json --port 5000
   ```

### Exemplos de uso da API gerada

- **GET** `/posts`: Retorna todos os posts.
- **POST** `/posts`: Cria um novo post.
- **GET** `/posts/1`: Retorna o post com `id` 1.
- **PUT/PATCH** `/posts/1`: Atualiza o post com `id` 1.
- **DELETE** `/posts/1`: Deleta o post com `id` 1.

Esse comando é muito útil para protótipos rápidos ou para testar front-end sem precisar configurar um back-end completo.