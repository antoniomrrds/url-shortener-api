># Encurtar URL

## Dados da Requisição
- originalUrl

## Dados Internos
- shortUrl
- accessCounter

>## Fluxo Primário
1. ⛔️ Recebe uma requisição do tipo **POST** na rota **/api/url**.
2. ⛔️ Valida se o campo obrigatório **originalUrl** está presente na requisição.
3. ⛔️ Verifica se o campo **originalUrl** é uma URL válida.
4. ✅ Gera uma chave única para o campo **shortUrl**.
5. ✅ Cria a URL encurtada utilizando os dados fornecidos e os dados internos.
6. ⛔️ Retorna **200 OK** com os dados da URL encurtada.

>## Fluxo Alternativo 1: URL Inválida
1. ⛔️ Se o sistema não receber uma URL válida, retorna um erro **400 Bad Request** com uma mensagem explicativa.

>## Exceções
1. ⛔️ Retorna erro **404 Not Found** se a API não existir.
2. ⛔️ Retorna erro **400 Bad Request** se a **url** não for fornecida pelo cliente ou se o campo URL for inválido.
3. ⛔️ Retorna erro **500 Internal Server Error** em caso de erro interno durante a manipulação da URL encurtada.
