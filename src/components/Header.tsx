import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image alt="" height={60} width={60} src="/logo.png" />
        <div>
          <h1 className="font-bold">
            The hdariodev <span className="text-violet-600">AI</span> Image
            Generator
          </h1>
          <h2 className="text-xs">
            Powered by DALL-E 2, Chat GPT & Microsoft Azure
          </h2>
        </div>
      </div>
      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link href="hdariodev.com" className="px-2 font-light text-right">
          Visit my site
        </Link>
        <Link href="https://github.com/hdarioDev" className="px-2 font-light">
          Github
        </Link>
      </div>
    </header>
  );
};

export default Header;
