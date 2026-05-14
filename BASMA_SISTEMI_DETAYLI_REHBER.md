# Metin2 Basma (Refine) Sistemi - Detaylı Teknik Rehber

## 1. Temel Basma Mekanizması

### DoRefine() - Normal Basma
```cpp
int prob = number(1, 100);  // 1-100 random

if (IsRefineThroughGuild())
    prob -= 10;  // +%10 başarı bonus

if (prob <= prt->prob)
    // BAŞARILI
else
    // BAŞARILI DEĞİL
```

**Konum Bonusu:** ❌ YOKTUR

## 2. Basma Şansını Artırma Yolları

### A. Kutsama Kaydırması (Blessing Scrolls)
DoRefineWithScroll() fonksiyonu çağrılır.

#### MUSIN_SCROLL (Type = 3)
- **Vnum:** 39014, 71021
- **Başarı:** %100 (Garantili)
- **Kısıtlama:** +4'a kadar (GetRefineLevel() < 4)

#### MEMO_SCROLL (Type = 5)
- **Vnum:** 70027, 72306
- **Başarı:** %100 (Garantili)
- **Kısıtlama:** Belirli seviye (+4 vs +5 gibi)

#### YONGSIN_SCROLL / GOD_SCROLL (Type = 2)
- **Vnum:** 39022, 71032, 76009 (gift), 74014
- **Başarı (Level'e göre):**
  - Lv0: %100, Lv1: %75, Lv2: %65, Lv3: %55
  - Lv4: %45,  Lv5: %40, Lv6: %35, Lv7: %30, Lv8: %25

#### YAGONG_SCROLL (Type = 4)
- **Vnum:** 39007, 72309, 70039
- **Başarı (Level'e göre):**
  - Lv0: %100, Lv1: %100, Lv2: %90, Lv3: %80
  - Lv4: %70,  Lv5: %60,  Lv6: %50, Lv7: %30, Lv8: %20

#### BDRAGON_SCROLL (Type = 6)
- **Başarı:** %80
- **Kısıtlama:** ITEM_METIN Type + Level 4 only

### B. Guild Bonusu
```cpp
if (IsRefineThroughGuild())
    prob -= 10;  // +%10 başarı
```
- Lonca tapınağında basma → +%10 başarı oranı

### C. Priv Bonusu (CPrivManager::GetPriv)
```cpp
int val_ch = GetPrivByCharacter(playerID, type);

if (val_ch < 0 && !HasKarmaMuskasi)
    return val_ch;  // BAD LUCK uygulanır
else
    return MAX(personal, empire, guild);
```

**Karma Muskası (70052) Etkisi:**
- BAD LUCK (negatif şans) ortadan kalkar
- Empire/Guild bonusu uygulanır

## 3. Kaydırma Kullanma Kodu

```cpp
bool CHARACTER::DoRefineWithScroll(LPITEM item)
{
    // Kaydırma kontrolü
    LPITEM pkItemScroll = GetInventoryItem(m_iRefineAdditionalCell);
    
    int prob = number(1, 100);
    int success_prob = prt->prob;
    
    // Kaydırma türüne göre başarı şansı
    if (pkItemScroll->GetValue(0) == MUSIN_SCROLL)
        success_prob = 100;
    else if (pkItemScroll->GetValue(0) == MEMO_SCROLL)
        success_prob = 100;
    else if (pkItemScroll->GetValue(0) == YONGSIN_SCROLL)
        success_prob = hyuniron_prob[item->GetRefineLevel()];
    else if (pkItemScroll->GetValue(0) == YAGONG_SCROLL)
        success_prob = yagong_prob[item->GetRefineLevel()];
    else if (pkItemScroll->GetValue(0) == BDRAGON_SCROLL)
        success_prob = 80;
    
    pkItemScroll->SetCount(pkItemScroll->GetCount() - 1);
    
    if (prob <= success_prob)
        // BAŞARILI
    else
        // BAŞARILI DEĞİL (eğer bDestroyWhenFail false ise downgrade)
}
```

## 4. Başarı Tabloları

### YONGSIN Probability (Level based)
```
Lv0: 100%, Lv1: 75%, Lv2: 65%, Lv3: 55%
Lv4: 45%,  Lv5: 40%, Lv6: 35%, Lv7: 30%, Lv8: 25%
```

### YAGONG Probability (Level based)
```
Lv0: 100%, Lv1: 100%, Lv2: 90%, Lv3: 80%
Lv4: 70%,  Lv5: 60%,  Lv6: 50%, Lv7: 30%, Lv8: 20%
```

## 5. Önemli Bulgular

❌ **Konum/Koordinat Bonusu:** Yoktur
❌ **Haritalara özel bonus:** Yoktur
✅ **Guild Bonus:** +%10 (tapınakta basma)
✅ **Kaydırma Sistemi:** Başarı şansını sabit değere setler
✅ **Karma Muskası:** BAD LUCK ortadan kaldırır

## 6. En Yüksekten En Düşük Başarıya

1. **MUSIN_SCROLL:** %100 garantili
2. **MEMO_SCROLL:** %100 garantili (+4'a kadar)
3. **YAGONG_SCROLL Lv0-1:** %100
4. **YONGSIN_SCROLL Lv0:** %100
5. **Guild Bonusu + Normal:** prt->prob + %10
6. **Normal Basma:** prt->prob (değişken)

