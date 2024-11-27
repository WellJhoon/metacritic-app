import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { getCharacters } from './lib/rickAndMortyLib';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCharacters()
      .then((characters) => {
        setCharacters(characters);
      })
      .catch((err) => {
        setError('Error fetching characters. Please try again later.');
        console.error(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView contentContainerStyle={styles.scroll}>
        {characters.map((character) => (
          <View key={character.id} style={styles.card}>
            <Image
              source={{ uri: character.image }}
              style={styles.image}
            />
            <Text style={styles.title}>{character.name}</Text>
            <Text style={styles.info}>Status: {character.status}</Text>
            <Text style={styles.info}>Species: {character.species}</Text>
            <Text style={styles.info}>Gender: {character.gender}</Text>
            <Text style={styles.info}>Origin: {character.origin}</Text>
            <Text style={styles.info}>Location: {character.location}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: 250,
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  info: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
