# Gunakan image Node.js sebagai base image
FROM node:18

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode proyek ke dalam container
COPY . .

# Ekspos port yang akan digunakan
EXPOSE 8080

# Tetapkan perintah untuk menjalankan server
CMD ["npm", "start"]
