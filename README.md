# Anime Takvimi

[![Lisans](https://img.shields.io/badge/LİSANS-MIT-blue.svg?color=97CA01&logoColor=blue&style=for-the-badge)](https://opensource.org/license/mit/)
[![Website](https://img.shields.io/badge/Website-takvim.kerim.qzz.io-00215E?style=for-the-badge)](https://takvim.kerim.qzz.io/)

Anlık anime yayın takvimi ve bölüm geri sayım aracı. Bu proje, kullanıcıların tarayıcılarını yormadan ve API limitlerine takılmadan en güncel anime takvimini sunmak için **Jamstack** mimarisi ve **GitHub Actions** otomasyonu kullanılarak geliştirilmiştir. Aynı zamanda bir **PWA (Progressive Web App)** olarak cihazlara yüklenebilir.

![Anime Takvimi Ekran Görüntüsü](https://github.com/user-attachments/assets/3c23a8a8-8e08-4fbb-800e-3abdd116aa95)

## 🌐 Demo
**Canlı Demo:** [takvim.kerim.qzz.io](https://takvim.kerim.qzz.io/)

## ✨ Özellikler

* **PWA (Progressive Web App) Desteği:** Tarayıcı üzerinden Android, iOS ve masaüstü cihazlara yerel bir mobil uygulama gibi yüklenebilir (Installable). Tam ekran ve pürüzsüz bir uygulama deneyimi sunar.
* **Sıfır API Gecikmesi (Jamstack):** İstemci tarafında her girişte API'ye istek atmak yerine, GitHub Actions günde iki kez AniList API'sinden verileri çeker ve statik bir JSON dosyası oluşturur. Sayfa saniyeler içinde, bekleme olmadan yüklenir.
* **Kişisel İzleme Listesi Entegrasyonu (MAL):** Veri çekme işlemi sırasında MyAnimeList hesabınızdaki güncel "İzleniyor" (Watching) listesi de taranır. Arayüzdeki "✨ Listem" filtresi ile sadece kendi takip ettiğiniz animeleri görebilirsiniz.
* **Dahili Otomatik Çeviri:** Konu özetleri GitHub Actions tarafından Google Translate API kullanılarak arka planda otomatik çevrilir ve JSON'a kaydedilir. Kullanıcılar başka bir sekmeye yönlendirilmeden, tek tıkla arayüz üzerinden İngilizce/Türkçe özetler arasında anında geçiş yapabilir.
* **Dinamik Geri Sayım:** Yeni bölümlerin yayınlanmasına kalan süreyi Unix Timestamp üzerinden matematiksel olarak hesaplayarak milisaniyesine kadar doğru bir geri sayım sunar.
* **Tek Sayfada Çoklu Dil (TR/EN):** Sayfayı yenilemeye veya farklı bir URL'e gitmeye gerek kalmadan anında arayüz dilini değiştirebilirsiniz.
* **Modern Hero Slider:** Haftanın öne çıkan popüler animeleri otomatik kayan şık bir slider ile sunulur.
* **Hızlı Filtreleme ve Arama:** Animeleri isimlerine göre anlık arayabilir veya modern "hap" (pill) butonlarla türlerine göre filtreleyebilirsiniz.
* **Detaylı Bilgi Modalı:** Animelerin başlangıç tarihi, stüdyosu, puanı, konu özeti ve resmi yayın platformlarının (Crunchyroll, Netflix vb.) direkt bağlantıları şık bir pencerede listelenir.
* **Duyarlı (Responsive) Tasarım:** Mobil cihazlar, tabletler ve masaüstü sistemler için kusursuz ızgara (grid) yapısı.

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+), PWA (Service Workers, Web App Manifest)
* **Otomasyon (Backend):** Node.js & GitHub Actions
* **Veri Kaynağı ve API'ler:** * [AniList GraphQL API v2](https://anilist.gitbook.io/anilist-apiv2-docs/) (Ana veri)
  * [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2) (İzleme listesi)
  * Google Translate Endpoint (Anlık özet çevirisi)
* **Tipografi & İkonlar:** Google Fonts (Outfit), Font Awesome

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak herhangi bir paket yükleyicisi gerektirmez.

1.  Bu repoyu klonlayın:
    ```bash
    git clone [https://github.com/KerimDemirkaynak/AnimeTakvimi.git](https://github.com/KerimDemirkaynak/AnimeTakvimi.git)
    cd AnimeTakvimi
    ```

2.  (Opsiyonel) Güncel veriyi, MAL izleme listesini ve çevirileri çekmek için Node.js scriptini çalıştırın:
    ```bash
    node fetch_data.js
    ```
    *Bu işlem, repodaki `anime-data.json` dosyasını en güncel AniList verileriyle ve çevirilerle yeniler.*

3.  `index.html` dosyasını herhangi bir modern tarayıcıda veya Live Server eklentisiyle açın.

## 🤖 GitHub Actions Otomasyonu Nasıl Çalışır?

Proje içerisinde yer alan `.github/workflows/update-data.yml` dosyası, otomatik bir iş akışı tanımlar. 
1. Bot, günde iki defa (UTC 00:00 ve 12:00) uyanır.
2. `fetch_data.js` dosyasını çalıştırır:
   - AniList GraphQL API'sinden yayınlanacak animeleri çeker.
   - MyAnimeList API'sine bağlanıp izlenenler listesini alır ve animelerle eşleştirir.
   - Anime konu özetlerini Google Translate ile çevirip veriye dâhil eder.
3. Hazırlanan zengin veriyi `anime-data.json` dosyasına yazar.
4. Eğer veride bir değişiklik (yeni bölüm, erteleme vb.) varsa, bunu otomatik olarak repoya `commit` ve `push` yapar.
Bu sayede web sitesi her zaman güncel kalır ve AniList'in hız limitlerine (Rate Limit) hiçbir zaman takılmaz.

## 📝 Çeviri Katkısı

Tür ve tema çevirileri projenin içerisindeki statik metinlerden değil, doğrudan harici bir JSON [çeviri dosyasından](https://raw.githubusercontent.com/KerimDemirkaynak/AnimeTakvimi/refs/heads/main/turtemaceviri.json) çekilmektedir. Çevirileri güncellemek veya yeni türler eklemek için bu dosyayı düzenleyebilirsiniz.
