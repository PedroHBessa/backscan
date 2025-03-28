FROM node:16.20.2

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar restante dos arquivos
COPY .env .env
COPY . .

# Expor a porta (mude se necessário)
EXPOSE 8088

# Comando para rodar a aplicação
CMD ["node", "-r", "dotenv/config", "server.js"]
