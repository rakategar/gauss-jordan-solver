import React from "react";
import Footer from "../../utils/Footer";
import Link from "next/link";
import Navbar from "../../utils/Navbar";
import { startConfetti } from "../../utils/confetti";

export default function page() {
  return (
    <div >
      <div className="sticky top-0">
        <Navbar/>
      </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="px-20 py-8 bg-white shadow-lg rounded-lg gap-4 "> 
          
            <p className="text-primary font-bold text-2xl p-4 mb-20">WELLCOME TO GAUS GACOR TOOLS</p>
            
            <div className="flex justify-center gap-6">
          
              <Link href={"/alat"} className="bg-secondary rounded px-10 py-4 text-white font-bold hover:bg-cyan-600 animation ">Tools</Link>
              <Link href={"/games"} className="bg-secondary rounded px-10 py-4 text-white font-bold hover:bg-cyan-600 animation ">Games</Link>
            </div>
          </div>
          
          <div className="fixed bottom-0">
            <Footer/>
          </div>
        </div>
    </div>
  );
}
