# Anime Takvimi
[**English**](/en/README.en.md) | [**Türkçe**](../README.md)

[![Lisans](https://img.shields.io/badge/LİSANS-MIT-blue.svg?color=97CA01&logoColor=blue&style=for-the-badge)](https://opensource.org/license/mit/)
[![Website](https://img.shields.io/badge/Website-kerimdemirkaynak.github.io-00215E?style=for-the-badge)](https://kerimdemirkaynak.github.io/AnimeTakvimi)

Anlık anime yayın takvimi. Yeni bölümlerin ne zaman yayınlanacağını gösterir ve Anilist GraphQL API'sinden veri çeker. Kullanıcılara türlere göre filtreleme imkanı sunar ve arayüzde Türkçe çeviriler kullanır.

![Anime Takvimi Ekran Görüntüsü](https://github.com/user-attachments/assets/3c23a8a8-8e08-4fbb-800e-3abdd116aa95)


## 🌐 Demo
*   **Türkçe:** [Canlı Demo](https://kerimdemirkaynak.github.io/AnimeTakvimi)
*   **English:** [Live Demo](https://kerimdemirkaynak.github.io/AnimeTakvimi/en)

## ✨ Özellikler

*   **Anlık Geri Sayım:** Yeni anime bölümlerinin yayınlanmasına kalan süreyi veya ne kadar süre önce yayınlandığını gösterir.
*   **Anilist Entegrasyonu:** Güncel anime verilerini doğrudan Anilist API'sinden alır.
*   **Türlere Göre Filtreleme:** Kullanıcıların animeleri belirli türlere göre (çoklu seçim destekli) filtrelemesine olanak tanır.
*   **Türkçe Tür ve Tema İsimleri:** Anime türleri ve temaları kullanıcıya Türkçe olarak gösterilir (İngilizce versiyonda orijinal isimler kullanılır).
*   **Detaylı Bilgi Modalı:** Her anime için başlangıç tarihi, stüdyo, (varsa çevrilmiş) türler, (varsa çevrilmiş) temalar ve puan gibi ek bilgileri şık bir modal pencerede gösterir.
*   **Platform Bağlantıları:** Crunchyroll, HIDIVE, YouTube, Netflix gibi resmi yayın platformlarına doğrudan bağlantılar sunar (eğer mevcutsa).
*   **Anilist Sayfasına Bağlantı:** Her animenin başlığına veya modal içerisindeki butona tıklandığında ilgili Anilist sayfasına yönlendirir.
*   **Duyarlı Tasarım:** Farklı ekran boyutlarında (mobil, tablet, masaüstü) düzgün görüntülenir. Header ve filtre çubuğu mobil cihazlarda yapışkan (sticky) özelliktedir.
*   **Yetişkin İçeriği Filtresi:** Hentai gibi yetişkinlere yönelik içerikler listelenmez.
*   **Yakın Zamandaki Yayınlar:** Varsayılan olarak son 7 gün içinde yayınlanmış veya yayınlanacak olan animeleri listeler.
*   **Modern Arayüz:** Google Fonts (Russo One ve Poppins) ve Font Awesome ikonları ile geliştirilmiş kullanıcı arayüzü.

## 🛠️ Kullanılan Teknolojiler

*   HTML5
*   CSS3 (Flexbox, Grid, Animasyonlar)
*   Vanilla JavaScript (ES6+)
*   [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)
*   [Google Fonts (Russo One & Poppins)](https://fonts.google.com/)
*   [Font Awesome](https://fontawesome.com/) (İkonlar için)

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için:

1.  Bu repoyu klonlayın:
    ```bash
    git clone https://github.com/kerimdemirkaynak/AnimeTakvimi.git
    ```
2.  Proje dizinine gidin:
    ```bash
    cd AnimeTakvimi
    ```
3.  `index.html` dosyasını (Türkçe versiyon için) veya `en/index.html` dosyasını (İngilizce versiyon için) tarayıcınızda açın.

Herhangi bir derleme veya karmaşık bağımlılık kurulumu gerektirmez.

## 📊 API Kullanımı

Bu proje, anime verilerini almak için [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)'sini kullanır. Mevcut sezondaki popüler animeleri, yayınlanmakta olan veya henüz yayınlanmamış olanları ve son 7 gün içinde yayınlanmış/yayınlanacak olanları listeleyecek şekilde sorgular. Yetişkin içeriği (`isAdult`) hariç tutulur.
