# Anime Takvimi

[![Lisans](https://img.shields.io/badge/LİSANS-MIT-blue.svg?color=97CA01&logoColor=blue&style=for-the-badge)](https://opensource.org/license/mit/)
[![Website](https://img.shields.io/badge/Website-kerimdemirkaynak.github.io-00215E?style=for-the-badge)](https://kerimdemirkaynak.github.io/AnimeTakvimi)

Anlık anime yayın takvimi. Yeni bölümlerin ne zaman yayınlanacağını gösterir ve Anilist GraphQL API'sinden veri çeker.

![Anime Takvimi Ekran Görüntüsü](https://github.com/user-attachments/assets/4e3c5eaa-87b2-46be-b33d-1067b7cd66a9)


**Canlı Demo:** [https://kerimdemirkaynak.github.io/AnimeTakvimi](https://kerimdemirkaynak.github.io/AnimeTakvimi)

## ✨ Özellikler

*   **Anlık Geri Sayım:** Yeni anime bölümlerinin yayınlanmasına kalan süreyi gösterir.
*   **Anilist Entegrasyonu:** Güncel anime verilerini doğrudan Anilist API'sinden alır.
*   **Detaylı Bilgi:** Her anime için başlangıç tarihi, türler, temalar ve puan gibi ek bilgileri modal pencerede gösterir.
*   **Platform Bağlantıları:** Crunchyroll, HIDIVE, YouTube gibi resmi yayın platformlarına doğrudan bağlantılar sunar (eğer mevcutsa).
*   **Anilist Sayfasına Bağlantı:** Her animenin başlığına tıklandığında ilgili Anilist sayfasına yönlendirir.
*   **Duyarlı Tasarım:** Farklı ekran boyutlarında düzgün görüntülenir.
*   **Yetişkin İçeriği Filtresi:** Hentailer listelenmez.

## 🛠️ Kullanılan Teknolojiler

*   HTML5
*   CSS3
*   Vanilla JavaScript
*   [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)
*   [Google Fonts (Russo One)](https://fonts.google.com/specimen/Russo+One)

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için:

1.  Bu repoyu klonlayın:
    ```bash
    git clone https://github.com/kerimdemirkaynak/AnimeTakvimi.git
    ```
    *(Reponuzun adını ve kullanıcı adınızı uygun şekilde değiştirin)*
2.  Proje dizinine gidin:
    ```bash
    cd anime-takvimi
    ```
3.  `index.html` dosyasını tarayıcınızda açın.

Herhangi bir derleme veya bağımlılık kurulumu gerektirmez.

## 📊 API Kullanımı

Bu proje, anime verilerini almak için [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)'sini kullanır. Mevcut sezondaki popüler animeleri listeler.
