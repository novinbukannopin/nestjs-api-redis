# Step 1: Menggunakan image Node.js sebagai base image
FROM node:16 as builder

# Step 2: Set working directory dalam container
WORKDIR /app

# Step 3: Copy package.json dan package-lock.json untuk instalasi dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy seluruh kode ke dalam container (tanpa node_modules karena sudah di-ignore)
COPY . .

# Step 6: Build proyek NestJS
RUN npm run build

# Step 7: Stage untuk produksi
FROM node:16-alpine

# Step 8: Set working directory dalam container
WORKDIR /app

# Step 9: Copy node_modules dan hasil build dari stage builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Step 10: Expose port 3000
EXPOSE 3000

# Step 11: Menjalankan aplikasi
CMD ["node", "dist/main"]
