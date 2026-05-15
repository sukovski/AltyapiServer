# 🚀 Netlify'a Deploy Rehberi

## Seçenek 1: Netlify Drag & Drop (En Kolay - 30 saniye)

### Adım 1: Build Et
```bash
npm run build
```

### Adım 2: Netlify'a Git
https://app.netlify.com

### Adım 3: Drag & Drop
`build` klasörünü tarayıcıya sürükle ve bırak.

**Bitti!** URL alacaksın: `https://xxxx.netlify.app`

---

## Seçenek 2: GitHub Bağlantısı (Otomatik Deploy)

### Adım 1: GitHub'a Push Et
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/damage-simulator
git push -u origin main
```

### Adım 2: Netlify'a Bağla
1. https://app.netlify.com adresine git
2. "Add new site" → "Import an existing project"
3. "GitHub" seç
4. Repository'ni seç: `damage-simulator`
5. Build settings (otomatik doldurulacak):
   - Base directory: `.`
   - Build command: `npm run build`
   - Publish directory: `build`
6. "Deploy site" tıkla

### Adım 3: Otomatik Updates
Her push yaptığında otomatik deploy olur!

---

## Seçenek 3: Netlify CLI (Komut Satırı)

### Yükle
```bash
npm install -g netlify-cli
```

### Deploy Et
```bash
cd damage-simulator
netlify deploy --prod --dir=build
```

---

## Custom Domain Ekle

### 1. Netlify'da
- Site settings → Domain management
- "Add custom domain" tıkla
- Kendi domain'ini gir (ör: simulator.com)

### 2. Domain Sağlayıcısında (Godaddy, Namecheap, vs.)
DNS records'u güncelle:
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## Environment Variables

### Ekle
1. Site settings → Build & deploy → Environment
2. "Edit variables"
3. Ekle: `NODE_ENV = production`

---

## Analytics & Monitoring

### Netlify Analytics
- Site settings → Analytics → Enable analytics
- Real-time visitor data, page views, top pages

### Deploy Log
- Deployments → Deploy log
- Build hataları burada görülür

---

## Troubleshooting

### Build Hatası
```bash
# Local'de test et
npm run build
```

### Port Hatası
netlify.toml'de kontrol et:
```toml
[build]
  command = "npm run build"
  publish = "build"
```

### Routing Hatası
netlify.toml'de şu var mı:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Production Checklist

- ✅ `npm run build` local'de çalışıyor mu?
- ✅ `build/` klasörü oluştuluyor mu?
- ✅ `.gitignore` var mı?
- ✅ `netlify.toml` var mı?
- ✅ GitHub'a push edildi mi?
- ✅ Netlify'da deploy successful mu?

---

## Sık Sorulan Sorular

**S: Canlı site ne kadar sürede açılır?**
A: 30 saniye ile 5 dakika arası. Deployment log'da takip edebilirsin.

**S: Domain nasıl güncellerim?**
A: DNS records'u güncelle veya Netlify'dan yönet (Site settings → Domain management).

**S: Her push'ta otomatik deploy olur mu?**
A: Evet, GitHub'a bağlanırsan. `main` branch'e push her zaman deploy tetikler.

**S: Önceki deploy'a geri dönebilir miyim?**
A: Evet! Deployments kısmında "Rollback" var.

**S: Netlify ücretsiz mi?**
A: Evet! Unlimited deployments, 125 built minutes/ay (genellikle yeterli).

