"use client";
import { useState, useEffect } from "react";
import { getAnimals, Animal } from "../lib/animalData";
import Card from "../components/breed-card/Card";

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    async function fetchAnimals() {
      const [cats, dogs] = await Promise.all([
        getAnimals("cat"),
        getAnimals("dog"),
      ]);
      setAnimals([...cats, ...dogs]);
    }
    fetchAnimals();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    setFilteredAnimals(
      animals.filter((animal) =>
        animal.breed.toLowerCase().includes(lowercasedSearchTerm)
      )
    );
  }, [searchTerm, animals]);

  return (
    <div
      className="container mx-auto p-6"
      style={{ background: "url(/images/paws.svg)" }}
    >
      <div className="flex justify-center items-center p-4 mb-4 bg-mint-green rounded">
        <h1 className="text-4xl text-white font-bold">Cats and Dogs</h1>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAnimals.map((animal: Animal) => (
          <Card
            key={animal.id}
            id={animal.id}
            name={animal.name}
            imageUrl={animal.imageUrl}
            breed={animal.breed}
            description={animal.description}
            type={animal.type}
          />
        ))}
      </div>
    </div>
  );
}
