import Link from "next/link";

interface CardProps {
  id: string;
  name: string;
  imageUrl: string;
  breed: string;
  description: string;
  type: "cat" | "dog";
}

const Card: React.FC<CardProps> = ({ id, imageUrl, breed, type }) => (
  <Link href={`/${type}/${id}`} passHref>
    <div className="border c shadow p-4 cursor-pointer bg-white bg-opacity-75">
      <img
        src={imageUrl}
        alt={breed}
        className="w-full h-60 object-cover mb-4"
      />
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-2">{breed}</h2>
        <p className="text-sm text-gray-500 capitalize">{type}</p>
      </div>
    </div>
  </Link>
);

export default Card;
