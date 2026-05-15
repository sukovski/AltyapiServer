# 📁 Doğru Klasör Yapısı

## ❌ Sorun
Netlify `/Tools/DamageSimulator/` klasöründe React projesini bulmaya çalışıyor ama klasör yapısı yanlış.

## ✅ Çözüm

GitHub'da **kendi repository** oluştur (AltyapiServer'ı fork etme):

```
damage-simulator/  (yeni repository)
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── netlify.toml
├── .gitignore
└── README.md
```

---

## Adım Adım

### 1. Yeni Folder Oluştur (Lokal)
```bash
mkdir damage-simulator
cd damage-simulator
```

### 2. Dosyaları Hazırla
```bash
mkdir public src

# public/index.html - hazırlanan dosyayı kopyala
# src/App.jsx - hazırlanan dosyayı kopyala
# src/index.js - hazırlanan dosyayı kopyala
# src/index.css - hazırlanan dosyayı kopyala
# package.json - hazırlanan dosyayı kopyala
# netlify.toml - hazırlanan dosyayı kopyala
# .gitignore - hazırlanan dosyayı kopyala
```

### 3. Bağımlılıkları Yükle
```bash
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Local Test
```bash
npm start
```

### 5. GitHub'a Push Et
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/damage-simulator
git push -u origin main
```

### 6. Netlify'da Deploy Et
1. https://app.netlify.com aç
2. "Add new site" → "Import an existing project"
3. GitHub seç ve `damage-simulator` repository'ni seç
4. Build settings:
   - Base directory: `.` (veya boş bırak)
   - Build command: `npm run build`
   - Publish directory: `build`
5. Deploy et

---

## Tailwind CSS Setup (ÖNEMLİ!)

### `tailwind.config.js`
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

### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Kontrol Listesi

- ✅ `public/index.html` var mı?
- ✅ `src/App.jsx` var mı?
- ✅ `src/index.js` var mı?
- ✅ `src/index.css` var mı?
- ✅ `package.json` var mı?
- ✅ `netlify.toml` var mı?
- ✅ `node_modules` gitignore'da mı?
- ✅ `npm install` çalıştı mı?
- ✅ `npm start` çalışıyor mu?

---

## Netlify Build Hatası Çözümleri

### Hata: "Could not find a required file. Name: index.html"
**Çözüm:** `public/index.html` dosyasının var olduğundan emin ol

### Hata: "Module not found: Can't resolve 'lucide-react'"
**Çözüm:** 
```bash
npm install lucide-react
```

### Hata: "Build script returned non-zero exit code"
**Çözüm:** Local'de test et:
```bash
npm run build
```

### Hata: "Tailwind CSS not working"
**Çözüm:** `tailwind.config.js` ve `postcss.config.js` kontrol et

---

## Quick Download

Dosyalar buradan indir:
- GitHub: `/Tools/DamageSimulator/` (ama bu AltyapiServer'da)
- Veya `/mnt/user-data/outputs/` klasöründen al

