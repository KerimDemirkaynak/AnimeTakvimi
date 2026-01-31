import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Linking, Platform, StatusBar } from 'react-native';

const query = `
query {
  Page(perPage: 50) {
    media(type: ANIME, sort: POPULARITY_DESC, status_in: [RELEASING, NOT_YET_RELEASED]) {
      id
      title { romaji }
      coverImage { medium }
      nextAiringEpisode { airingAt episode }
      isAdult
      genres
      studios(isMain: true) { nodes { name } }
    }
  }
}
`;

export default function App() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ query })
      });
      const json = await response.json();
      
      const now = Math.floor(Date.now() / 1000);
      const sevenDays = 7 * 24 * 60 * 60;

      const filtered = json.data.Page.media.filter(anime => {
        if (!anime.isAdult && anime.nextAiringEpisode) {
          const diff = anime.nextAiringEpisode.airingAt - now;
          return Math.abs(diff) <= sevenDays;
        }
        return false;
      }).sort((a, b) => a.nextAiringEpisode.airingAt - b.nextAiringEpisode.airingAt);

      setAnimes(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAiringText = (timestamp) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = timestamp - now;
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (diff > 0) return `${days > 0 ? days + 'g ' : ''}${hours}sa ${minutes}dk kaldı`;
    return "Yeni yayınlandı";
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => Linking.openURL(`https://anilist.co/anime/${item.id}`)}
    >
      <Image source={{ uri: item.coverImage.medium }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title.romaji}</Text>
        <Text style={styles.episode}>
          {item.nextAiringEpisode.episode}. Bölüm
        </Text>
        <Text style={styles.time}>
          {getAiringText(item.nextAiringEpisode.airingAt)}
        </Text>
        <Text style={styles.studio}>
          {item.studios.nodes[0]?.name || 'Stüdyo Bilinmiyor'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Anime Takvimi</Text>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#4fc3f7" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={animes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#4fc3f7',
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 140,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  episode: {
    color: '#4fc3f7',
    fontWeight: 'bold',
    marginTop: 5,
  },
  time: {
    color: '#b0b0b0',
    fontSize: 13,
  },
  studio: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
