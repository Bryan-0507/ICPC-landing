"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-6 border-t border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Logo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative group">
              <Image
                src="/icpc_icon.svg"
                alt="ICPC Logo"
                width={100}
                height={100}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="space-y-4 text-center md:text-right">
            <h3 className="text-2xl font-heading font-bold text-white">
              CAMPUS CENTRAL
            </h3>
            
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center justify-center md:justify-end gap-3 group">
                <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm md:text-base">
                  18 AV. 11-95 Zona 15, Vista Hermosa III, Guatemala
                </p>
              </div>
              
              <div className="flex items-center justify-center md:justify-end gap-3 group">
                <Phone className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />
                <p className="text-sm md:text-base">
                  PBX: (502) 2507-1500
                </p>
              </div>
              
              <div className="flex items-center justify-center md:justify-end gap-3 group">
                <Mail className="w-5 h-5 text-tertiary group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="mailto:info@uvg.edu.gt"
                  className="text-sm md:text-base hover:text-primary transition-colors duration-300"
                >
                  info@uvg.edu.gt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
