# 🚀 Metin2 Hasar Simulatörü - Hızlı Başlangıç

## 📦 Dosyalar

Hazırlanan dosyalar:
- `package.json` - NPM konfigürasyonu
- `App.jsx` - Ana React komponenti
- `index.js` - Entry point
- `index.html` - HTML template
- `index.css` - Tailwind CSS

## ⚡ Kurulum (3 Adım)

### 1️⃣ Node.js Yükle
https://nodejs.org/ (LTS sürüm indir ve yükle)

### 2️⃣ Proje Oluştur
```bash
npx create-react-app damage-simulator
cd damage-simulator
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3️⃣ Dosyaları Kopyala
Aşağıdaki dosyaları `src/` klasörüne kopyala:
- `App.jsx` → `src/App.jsx`
- `index.js` → `src/index.js`
- `index.css` → `src/index.css`

`public/` klasörüne kopyala:
- `index.html` → `public/index.html`

Proje root'una kopyala:
- `package.json` (üzerine yazabilir)

## 🎮 Çalıştır

```bash
npm start
```

Tarayıcın otomatik açılacak: **http://localhost:3000**

## 🌐 Deploy Et (Vercel)

### Git Setupı
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/damage-simulator
git push -u origin main
```

### Vercel Deploy
1. https://vercel.com adresine git
2. "New Project" seç
3. GitHub repository'ni seç
4. Deploy et

**Otomatik live olacak!** 🎉

## 📝 Tailwind CSS Konfigürasyonu

`tailwind.config.js` dosyasını şu şekilde güncelle:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## ❓ Sorun Giderme

### "Module not found" hatası
```bash
npm install
```

### Tailwind CSS çalışmıyor
```bash
npm run build
```

### Port 3000 kullanımda
```bash
PORT=3001 npm start
```

---

## 🎯 Özellikler

✅ 6 farklı sınıf seçeneği
✅ Tam istatistik kontrolü (STR, DEX, VIT, INT)
✅ Ekipman ayarlaması
✅ 3 farklı skill türü (P, G1, M1)
✅ 100 denemeden ortalama hasar hesaplaması
✅ Metin2 oyun limitlerini dikkate alan formülü

Viel Spaß! 🎮⚔️
