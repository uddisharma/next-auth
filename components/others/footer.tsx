import { IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react";
import { Phone, UtilityPole } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-btnblue text-white rounded-[144px_144px_0_0]">
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 justify-center m-auto text-center md:text-left">
          <div className="m-auto">
            <h3 className=" mb-4">Mr. Mard</h3>
            <p className="text-sm text-white/80 w-20">
              Your go to place for all wellness needs
            </p>
          </div>
          <div className="m-auto">
            <h3 className=" mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="#">Lorem</Link>
              </li>
              <li>
                <Link href="#">Lorem Ipsum</Link>
              </li>
              <li>
                <Link href="#">Lorem ip</Link>
              </li>
            </ul>
          </div>
          <div className="m-auto">
            <h3 className=" mb-4">About</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Work</Link>
              </li>
              <li>
                <Link href="#">Services</Link>
              </li>
            </ul>
          </div>
          <div className="text-sm text-white/80 space-y-2 m-auto grid grid-cols-2 justify-between gap-x-10 mt-5 md:block">
            <p className="flex gap-4 ">
              <UtilityPole className="w-4 h-4" /> Bengaluru, India
            </p>
            <p className="flex gap-4 ">
              <Phone className="w-4 h-4" /> 0000000000
            </p>
            <p className="flex gap-4 ">
              <IconBrandInstagram className="w-4 h-4" /> Services
            </p>
            <p className="flex gap-4 ">
              <IconBrandYoutube className="w-4 h-4" /> Services
            </p>
          </div>
        </div>
        <div className="bg-yellow py-4 md:mx-6 px-4 rounded-[144px] md:mt-20">
          <p className="text-[#1E2A4A] text-sm text-center">
            © {new Date().getFullYear()} Mr Mard. All Rights Reserved. Made
            With ❤️ In India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
