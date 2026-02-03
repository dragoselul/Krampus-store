import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-28 px-4">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-5xl font-bold text-center">
          Bine ați venit la magazinul nostru online!
        </h1>
        <p className="text-xl text-center text-gray-600">
          Descoperiți cele mai noi produse și oferte exclusive.
        </p>
        <Image
          src="/pictures/welcome-image.jpg"
          alt="Welcome Image"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <Link href="/catalog">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors">
            Începeți cumpărăturile
          </button>
        </Link>
      </div>
    </div>
  );
}
