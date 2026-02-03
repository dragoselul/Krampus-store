import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-16 xl:-ml-20">
      <div className="max-w-5xl mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-60 text-center lg:text-left items-center lg:items-start">
          
          {/* Branding / ANPC logos */}
          <div className="flex flex-col gap-3 mt-4 justify-center">
            <Link href="https://anpc.ro/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/pictures/SAL-PICTOGRAMA.png"
                alt="ANPC"
                width={72}
                height={72}
                className="mx-auto lg:mx-0"
              />
            </Link>
            <Link
              href="https://reclamatiisal.anpc.ro/?_gl=1*1xjwnv6*_ga*MzM2MDczMTg5LjE3NTI0MDI1NTQ.*_ga_FDVTGP2007*czE3NTI0MDI1NTMkbzEkZzEkdDE3NTI0MDMwMDgkajU2JGwwJGgw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/pictures/pictogramaSOL.png"
                alt="ANPC SAL"
                width={72}
                height={72}
                className="mx-auto lg:mx-0"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4 mt-4 md:mt-0">
            <p className="font-bold">Linkuri utile</p>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/blog" className="hover:underline">
              Politica de returnare
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/contact" className="hover:underline">
              Livrare
            </Link>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-4 mt-4 md:mt-0">
            <p className="font-bold">Detalii de contact</p>
            <Link href="tel:+40123456789" className="flex items-center gap-2 justify-center lg:justify-start">
              <FaPhone className="w-5 h-5" />
              <span>+40 123 456 789</span>
            </Link>
            <Link href="mailto:covestitiu@destept.ro" className="flex items-center gap-2 justify-center lg:justify-start">
              <FaEnvelope className="w-5 h-5" />
              <span>covestitiu@destept.ro</span>
            </Link>
            <Link
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center lg:justify-start"
            >
              <FaInstagram className="w-5 h-5" />
              <span>bunanusuntcove</span>
            </Link>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm mt-8">
        © {new Date().getFullYear()} Covesitiu. All rights reserved.
      </p>
    </footer>
  );
}
