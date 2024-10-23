# Use a imagem base do Nginx
FROM nginx:latest

# Copie o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copie o conteúdo da pasta build para o diretório padrão do Nginx
COPY build /usr/share/nginx/html

# Exponha a porta 8080
EXPOSE 8080

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]