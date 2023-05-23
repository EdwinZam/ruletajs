import headerNavLinks from "@/data/headerNavLinks";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="Home">
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-lg font-bold">
              RuletaMaster
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-gray-900 sm:p-4"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
