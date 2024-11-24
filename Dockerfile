# Gunakan Node.js versi 18 sebagai base image
FROM node:18

# Tentukan direktori kerja di container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file proyek ke container
COPY . .

# Tentukan port aplikasi (sesuai dengan server Anda)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
