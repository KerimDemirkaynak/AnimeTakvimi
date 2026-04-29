const fs = require('fs');

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
        console.log('AniList API\'sine istek atılıyor...');
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        
        // Veriyi JSON formatında aynı dizine kaydet
        fs.writeFileSync('anime-data.json', JSON.stringify(data, null, 2));
        console.log('anime-data.json başarıyla güncellendi.');
        
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        process.exit(1); 
    }
}

fetchData();
