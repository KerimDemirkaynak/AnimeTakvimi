const fs = require('fs');

// MAL Kullanıcı Adını Buraya Gir
const MAL_USERNAME = "KerimDemirkaynak";

// Google Translate Ücretsiz Endpoint'i ile Çeviri Fonksiyonu
async function translateText(text) {
    if (!text) return "";
    
    // 1. Paragraf ve satır atlama etiketlerini \n karakterine dönüştür
    let cleanText = text.replace(/<br\s*[\/]?>/gi, '\n').replace(/<\/p>/gi, '\n\n');
    
    // 2. Geriye kalan diğer tüm HTML etiketlerini temizle (<i>, <b> vb.)
    cleanText = cleanText.replace(/<[^>]*>?/gm, ''); 
    
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=tr&dt=t&q=${encodeURIComponent(cleanText)}`;
    
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Çeviri sunucusu yanıt vermedi");
        const json = await res.json();
        
        // 3. Google Translate'in karmaşık dizi yapısından sadece çevrilmiş metinleri birleştir
        let translatedText = json[0].map(item => item[0]).join('');
        
        // 4. Arayüzde (innerHTML) tekrar düzgün paragraf boşlukları oluşması için \n'leri <br>'ye çevir
        return translatedText.replace(/\n/g, '<br>');
        
    } catch (e) {
        console.error("Çeviri atlandı (Hata veya Limit):", e.message);
        return text; 
    }
}

function getCurrentSeasonAndYear() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (month <= 2) return { season: 'WINTER', year };
    if (month <= 5) return { season: 'SPRING', year };
    if (month <= 8) return { season: 'SUMMER', year };
    return { season: 'FALL', year };
}

async function fetchData() {
    const { season, year } = getCurrentSeasonAndYear();
    const query = `
    query {
      Page(perPage: 50) {
        media(season: ${season}, seasonYear: ${year}, type: ANIME, sort: POPULARITY_DESC, status_in: [RELEASING, NOT_YET_RELEASED]) {
          id title { romaji english native } 
          synonyms
          startDate { year month day }
          coverImage { extraLarge large } bannerImage
          nextAiringEpisode { airingAt episode }
          isAdult genres tags { name isMediaSpoiler }
          averageScore studios(isMain: true) { nodes { name } }
          description(asHtml: true)
          externalLinks { site url }
        }
      }
    }`;

    try {
        // 1. MyAnimeList İzleme Listesini Çek (Status 1 = Watching)
        console.log('MAL izleme listesi çekiliyor...');
        let malTitles = [];
        try {
            const malUrl = `https://myanimelist.net/animelist/${MAL_USERNAME}/load.json?status=1`;
            const malRes = await fetch(malUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
            if (malRes.ok) {
                const malData = await malRes.json();
                malTitles = malData.map(a => a.anime_title.toLowerCase());
            }
        } catch (e) {
            console.error('MAL Verisi alınamadı, listesiz devam ediliyor:', e);
        }

        // 2. AniList Verisini Çek
        console.log('AniList API\'sine istek atılıyor...');
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        
        // 3. Verileri Birleştir ve Çevir
        console.log('Açıklamalar çevriliyor ve MAL listesi eşleştiriliyor...');
        const animes = data.data.Page.media;
        
        for (let anime of animes) {
            // A. İzleme Listesi Eşleştirmesi
            const titlesToMatch = [
                anime.title.romaji?.toLowerCase(),
                anime.title.english?.toLowerCase(),
                ...(anime.synonyms || []).map(s => s.toLowerCase())
            ].filter(Boolean);
            
            // Eğer başlıklar eşleşirse veya biri diğerini içeriyorsa "isMyList" true olur
            anime.isMyList = malTitles.some(malTitle => 
                titlesToMatch.some(t => t.includes(malTitle) || malTitle.includes(t))
            );

            // B. Açıklama Çevirisi
            if (anime.description) {
                anime.descriptionTr = await translateText(anime.description);
                // Rate-limit yememek için her çeviride kısa bir bekleme ekleyelim
                await new Promise(r => setTimeout(r, 200)); 
            }
        }
        
        // 4. Kaydet
        fs.writeFileSync('anime-data.json', JSON.stringify(data, null, 2));
        console.log('anime-data.json başarıyla güncellendi.');
        
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        process.exit(1); 
    }
}

fetchData();
