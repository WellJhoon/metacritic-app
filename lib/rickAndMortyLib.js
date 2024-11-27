
export async function getCharacters(page = 1) {
  const API_URL = `https://rickandmortyapi.com/api/character?page=${page}`;
  
  const rawData = await fetch(API_URL);
  const json = await rawData.json();
  
  const { results } = json;

  return results.map((character) => {
    const { id, name, status, species, gender, origin, location, image } = character;
    
    return {
      id,
      name,
      status,
      species,
      gender,
      origin: origin.name,
      location: location.name,
      image,
    };
  });
}
