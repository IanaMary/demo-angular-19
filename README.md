# AngularApiDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Json server

Para instalar globalmente, use o seguinte comando: npm install -g json-server

Criar um arquivo db.json - O arquivo db.json deve conter dados no formato JSON que o servidor vai utilizar para criar uma API RESTful. Aqui está um exemplo de um db.json simples:

```
{
  "users": [
    {
      "id": "1",
      "nome": "usuario",
      "email": "usuario@email.com"
    }
}

```

Iniciar o servidor - Com o json-server instalado e o db.json pronto, você pode iniciar o servidor com o comando: json-server --watch {caminho}/db.json

