
# Projeto Backend com TypeORM

Este projeto é um serviço de backend desenvolvido em Node.js com TypeScript, usando TypeORM para integração com o banco de dados PostgreSQL. Ele permite gerenciar leituras individualizadas de consumo de água e gás, utilizando IA para extrair medições a partir de imagens de medidores.

## Testes no Postman

Você pode testar os endpoints deste projeto usando a coleção Postman disponível no link abaixo:

[Postman Collection - Projeto Backend](https://www.postman.com/lunar-crater-216395/workspace/projeto/collection/27352023-1dfb8eec-37fa-426f-a68d-c3c6a115123f?action=share&creator=27352023)

## Passos para Rodar o Projeto

### 1. Instalação das Dependências

Antes de iniciar o projeto, você precisa instalar as dependências. Execute o comando abaixo:

```bash
npm install
```

### 2. Configuração do Banco de Dados

Configure as informações do banco de dados no arquivo `src/data-source.ts` ou defina as variáveis de ambiente no arquivo `.env`. As variáveis necessárias são:

```plaintext
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=seu_password_aqui
DB_NAME=projeto_backend
GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 3. Rodando a Aplicação com Docker

O projeto está dockerizado para facilitar a configuração e execução. Para subir a aplicação e todos os serviços necessários (incluindo o banco de dados PostgreSQL), execute o comando abaixo:

```bash
docker-compose up --build
```

Esse comando irá construir as imagens Docker e iniciar os contêineres necessários para a aplicação.

### 4. Endpoints Disponíveis

#### POST /upload
Este endpoint recebe uma imagem em base64, consulta a API do Google Gemini e retorna a medida lida pela API.

**Request Body:**

```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```

**Response Body:**

- **200**: Operação realizada com sucesso.
- **400**: Dados inválidos.
- **409**: Já existe uma leitura para este tipo no mês atual.

#### PATCH /confirm
Este endpoint confirma ou corrige o valor lido pelo LLM.

**Request Body:**

```json
{
  "measure_uuid": "string",
  "confirmed_value": integer
}
```

**Response Body:**

- **200**: Operação realizada com sucesso.
- **400**: Dados inválidos.
- **404**: Leitura não encontrada.
- **409**: Leitura já confirmada.

#### GET /<customer_code>/list
Este endpoint lista as medidas realizadas por um determinado cliente.

**Query Parameters:**

- **measure_type**: Tipo de medição (`WATER` ou `GAS`), case insensitive.

**Response Body:**

```json
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": boolean,
      "image_url": "string"
    }
  ]
}
```

- **200**: Operação realizada com sucesso.
- **400**: Tipo de medição inválido.
- **404**: Nenhuma leitura encontrada.

### 5. Testes e Validação

- **Clean Code**: O projeto segue práticas de código limpo para facilitar a leitura e manutenção.
- **Testes Unitários**: (Se aplicável) - Inclua informações sobre testes unitários aqui.

### 6. Observações

- **Chave Gemini**: Certifique-se de definir corretamente a variável de ambiente `GEMINI_API_KEY` com a sua chave de API do Google Gemini.
- **Segurança**: Nunca compartilhe suas chaves de API ou credenciais sensíveis em repositórios públicos.

---

Para mais detalhes sobre o desenvolvimento do projeto, consulte o arquivo `data-source.ts` para configuração do banco de dados e as documentações da [API Gemini](https://ai.google.dev/gemini-api/docs/api-key).