import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex p-3 md:p-5  bg-violet-500 justify-between sticky top-0 text-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image alt="" height={40} width={40} src="/logo.png" />
        <div>
          <h1 className="font-bold md:text-xl">
            <span className="text-black">AI</span> Image Generator
          </h1>
          <h2 className="text-xs md:text-sm">DALL-E 2, ChatGPT, Azure</h2>
        </div>
      </div>
      <div className="flex text-xs md:text-sm divide-x items-center text-gray-100">
        <Link
          href="https://hdariodev.com"
          rel="noopener noreferrer"
          target="_blank"
          className="px-2 font-light text-right"
        >
          My site
        </Link>
        <Link
          href="https://github.com/hdarioDev"
          rel="noopener noreferrer"
          target="_blank"
          className="px-2 font-light"
        >
          Github
        </Link>
      </div>
    </header>
  );
};

export default Header;
