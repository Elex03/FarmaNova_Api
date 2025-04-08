# Instala dependencias
RUN npm install

# Compila si usas TypeScript
RUN npm run dev

# Comando para iniciar
CMD ["npm", "start"]
