import { getAnimalDetail } from "../../../lib/animalData";
import { notFound } from "next/navigation";

interface AnimalPageProps {
  params: {
    type: "cat" | "dog";
    id: string;
  };
}

interface AnimalDetail {
  breed: string;
  description: string;
  images: string[];
}

export default async function AnimalPage({ params }: AnimalPageProps) {
  const { type, id } = params;

  try {
    const animalData: AnimalDetail = await getAnimalDetail(type, id);

    return (
      <div className="container mx-auto p-6 bg-mint-green rounded">
        <div className=" bg-white bg-opacity-75 rounded p-4">
          <h1 className="text-2xl font-bold mb-4">
            {type === "cat" ? "Cat" : "Dog"}
          </h1>
          <h2 className="text-xl font-bold mb-2">Breed: {animalData.breed}</h2>
          <p className="text-gray-700 text-base w-2/3">
            {animalData.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {animalData.images.map((imageUrl: string, index: number) => (
            <img
              key={index}
              src={imageUrl}
              alt={animalData.breed}
              className="w-96 h-72 object-cover"
            />
          ))}
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
