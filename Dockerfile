# Usar uma imagem base mais recente com Node.js
FROM node:20

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Compilar o TypeScript
RUN npm run build

# Expor a porta que a aplicação usará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]