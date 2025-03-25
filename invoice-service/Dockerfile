# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./
RUN npm install

# Copia todo o restante do código
COPY . .

# Expõe a porta 4003 (se sua API rodar nessa porta)
EXPOSE 4003

# Comando para rodar o serviço
CMD ["npm", "start"]
