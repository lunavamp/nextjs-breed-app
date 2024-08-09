import axios from "axios";

export interface Animal {
  id: string;
  name: string;
  imageUrl: string;
  breed: string;
  description: string;
  type: "cat" | "dog";
}
export async function getAnimals(
  type: "cat" | "dog",
  limit: number = 10
): Promise<Animal[]> {
  const breedUrl =
    type === "cat"
      ? `https://api.thecatapi.com/v1/breeds`
      : `https://api.thedogapi.com/v1/breeds`;

  const image =
    type === "cat"
      ? `https://api.thecatapi.com/v1/images/search?breed_id=`
      : `https://api.thedogapi.com/v1/images/search?breed_id=`;

  const breedsResponse = await axios.get(breedUrl);
  const breeds = breedsResponse.data;

  const animals = await Promise.all(
    breeds.slice(0, limit).map(async (breed: any) => {
      const imageResponse = await axios.get(`${image}${breed.id}`);
      const imageUrl = imageResponse.data[0]?.url || "";
      return {
        id: breed.id,
        name: type === "cat" ? "Cat" : "Dog",
        imageUrl,
        breed: breed.name,
        description: breed.description,
        type,
      };
    })
  );

  return animals;
}

export async function getAnimalDetail(type: "cat" | "dog", id: string) {
  const breedUrl =
    type === "cat"
      ? `https://api.thecatapi.com/v1/breeds/${id}`
      : `https://api.thedogapi.com/v1/breeds/${id}`;
  const imagesUrl =
    type === "cat"
      ? `https://api.thecatapi.com/v1/images/search?breed_id=${id}&limit=5`
      : `https://api.thedogapi.com/v1/images/search?breed_id=${id}&limit=5`;

  const [breedResponse, imagesResponse] = await Promise.all([
    axios.get(breedUrl),
    axios.get(imagesUrl),
  ]);

  if (!breedResponse.data || !imagesResponse.data.length) {
    throw new Error("Data not found");
  }

  const breed = breedResponse.data.name;
  const description = breedResponse.data.description;
  const images = imagesResponse.data.map((img: { url: string }) => img.url);

  return {
    breed,
    description,
    images,
  };
}
