"use client";
import { IoSearch } from "react-icons/io5";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  onSearch: (query: string) => void;
};

const Navbar: React.FC<Props> = ({ onSearch }) => {
  // const [dropdown, setDropdown] = useState(false);
  const [input, setInput] = useState("");

  React.useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input);
    }, 300);

    return () => clearTimeout(handler);
  }, [input, onSearch]);

  const listDropdown = [
    { text: "Internet", href: "#" },
    { text: "Book", href: "#" },
    { text: "Open Source", href: "#" },
  ];
  return (
    <nav className="glass sticky top-0 z-50">
      <div className="container py-3 mx-auto ">
        <div className="flex items-center ">
          <div className="w-6/12 flex items-center gap-4">
            <Image src="/LOGO_AI.png" width={40} height={45} alt="logo" />
            <h1 className='text-gradient font-bold text-2xl'>AI News Portal</h1>
          </div>
          {/* <div className="w-8/12">
                  <ul className="flex gap-4 font-light">
                    <li><a href="">AI Terbaru</a></li>
                    <li><a href="">Machine Learning</a></li>
                    <li className="relative">
                      <a 
                      className="cursor-pointer hover:underline" 
                      onClick={() => setDropdown(!dropdown)}
                      >Lainya</a>
                      {dropdown && (
                        <ul className="absolute w-[200px] bg-gray-800 rounded shadow-2xl mt-4">
                          <li className="">
                            {listDropdown.map((item, index) => (
                              <a key={index} className="border-b border-white/6 last:border-0 hover:bg-gray-700/60 flex py-3 px-4 " href={item.href}>{item.text}</a>
                            ))}
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
              </div> */}
          <div className="w-6/12 flex items-center bg-background rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1">
            <IoSearch className="mr-3 text-gray-400" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="bg-background focus:outline-none w-full text-white "
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
