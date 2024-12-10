# Menggunakan image Node.js resmi
FROM node:18

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin file package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Menginstal dependensi
RUN npm install

# Menyalin semua file kode aplikasi ke dalam container
COPY . .

# Mengekspos port yang akan digunakan oleh aplikasi
EXPOSE 8080

# Menentukan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
