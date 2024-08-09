import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-white text-gray p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Breed App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-m font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className=" text-m font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className=" text-m font-semibold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
