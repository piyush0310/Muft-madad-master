'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import bannerData from '@/app/content/HeroData';

const   HeroContent = () => {
  const { lang } = useLanguage();
  const content = bannerData[lang];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 mt-30">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium uppercase text-gray-900 leading-tight tracking-widest">
            {content.title}
            <br />
            {content.subtitle}
          </h1>

          <ul className="space-y-3 sm:space-y-4">
            {content.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">▸</span>
                <span className="text-base sm:text-lg md:text-xl text-gray-700">{point}</span>
              </li>
            ))}
          </ul>

          <a href="tel:+917088440387" className="w-full sm:w-auto">
            <button className="flex cursor-pointer items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md transition shadow-md text-base sm:text-lg w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{content.button}</span>
            </button>
          </a>
        </div>

        {/* Right Image */}
        <div className="relative mt-8 lg:mt-0">
          <img
            src="/HeroImage.png"
            alt="Happy family"
            className="w-full h-auto rounded-lg shadow-xl"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3EFamily Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default HeroContent;
