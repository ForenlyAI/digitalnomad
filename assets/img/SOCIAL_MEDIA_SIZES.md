# Sosyal Medya Görsel Boyutlandırma Kılavuzu

Bu belge, **Bahadir.ai** markası için kullanılan ana görselin (`channel_banner.png`) farklı sosyal medya platformlarına uyarlanması için gereken standart boyutları içerir.

## 📁 Ana Kaynak Dosya
*   **Dosya Yolu:** `/home/macb/follow/bahadir.ai/assets/img/channel_banner.png`
*   **Orijinal Boyut:** 2560 x 1440 piksel
*   **İçerik:** Merkezde Logo + "Bahadir.ai" + "Building Tech Solutions | Digital Nomad" sloganı.
*   **Not:** Bu görselin büyük bölümü "boşluktur" (safe area mantığı). İçerik tam ortada yer alır.

---

## 📏 Hedef Platform Boyutları

### 1. YouTube
*   **Kanal Banner (Tüm Cihazlar):** 2560 x 1440 px
*   **Güvenli Alan (Safe Area - Metin buraya sığmalı):** 1546 x 423 px
    *   *Bu alanın dışındaki her şey mobilde kesilir.*

### 2. Twitter / X
*   **Header (Kapak Görseli):** 1500 x 500 px
    *   *Not: YouTube'un 'Safe Area' kısmı buraya mükemmel uyar.*

### 3. LinkedIn
*   **Kişisel Profil Arka Planı:** 1584 x 396 px
*   **Şirket Sayfası Kapak:** 1128 x 191 px
    *   *Bu çok dar bir şerittir, logo ve metinlerin dikey olarak sığması zordur, ayarlama gerekir.*

### 4. Facebook
*   **Sayfa Kapak Görseli:** 820 x 312 px
    *   *Masaüstünde bu boyutta görünür, mobilde 640x360 px görünür. Kenarlardan pay bırakılmalı.*

### 5. Instagram
*   **Kare Gönderi (Post):** 1080 x 1080 px
*   **Hikaye (Story):** 1080 x 1920 px
    *   *Burada banner'ın ortasındaki logo/yazı alınıp kare veya dikey bir arka plana yerleştirilmelidir.*

### 6. TikTok
*   **Profil Fotoğrafı:** 200 x 200 px (En az)
    *   *UYARI: Bu kadar küçük boyutta "Building Tech Solutions" yazısı okunmayacaktır. Sadece pusula ikonunun kullanılması önerilir ancak talep üzerine metinli versiyon da üretilecektir.*

---

## ⚙️ Otomasyon Scripti
Bu boyutlandırmaları otomatik yapmak için `resize_branding.py` scripti kullanılacaktır.
Script şu mantıkla çalışır:
1.  Ana görselin (`channel_banner.png`) tam ortasındaki **dolu alanı (logo+yazı)** tespit eder (crop).
2.  Bu dolu alanı, hedef platformun boyutlarına göre ölçekler ve yeni bir arka plana (aynı renk tonunda) yerleştirir.
