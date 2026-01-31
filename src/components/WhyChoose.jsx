"use client";
import React from 'react';
import { Shield, UserCheck, Handshake } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function WhyChooseMuftMadad() {
  const { lang } = useLanguage();

  const features = lang === 'en' ? [
    {
      icon: Shield,
      title: "100% Free Surgery Guarantee",
      subtitle: "Complete financial coverage for approved surgeries"
    },
    {
      icon: UserCheck,
      title: "Experienced Doctors",
      subtitle: "Board-certified specialists with 10+ years experience"
    },
    {
      icon: Handshake,
      title: "Complete Treatment Support",
      subtitle: "End-to-end assistance from consultation to recovery"
    }
  ] : [
    {
      icon: Shield,
      title: "100% मुफ्त सर्जरी की गारंटी",
      subtitle: "स्वीकृत सर्जरी पर पूर्ण वित्तीय कवरेज"
    },
    {
      icon: UserCheck,
      title: "अनुभवी डॉक्टर",
      subtitle: "10+ वर्ष अनुभव वाले बोर्ड प्रमाणित विशेषज्ञ"
    },
    {
      icon: Handshake,
      title: "सम्पूर्ण उपचार सहायता",
      subtitle: "परामर्श से रिकवरी तक पूर्ण सहायता"
    }
  ];

  const sectionTitle = lang === 'en' ? 'Why Choose Muft Madad?' : 'मुफ़्त मदद क्यों चुनें?';

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.1),transparent)] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl uppercase font-medium bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {sectionTitle}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'en' ? 'Trusted by 500+ patients for free treatment' : '500+ मरीजों का विश्वास निःशुल्क इलाज के लिए'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group flex flex-col items-center text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl hover:shadow-2xl border border-white/50 hover:border-emerald-300/50 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Icon */}
                <div className="relative mb-8 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto p-6 bg-gradient-to-br rounded-3xl shadow-2xl group-hover:shadow-emerald-500/25 transition-all">
                  <Icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-all duration-300 mx-auto" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-md mx-auto">
                    {feature.subtitle}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all blur-xl scale-150"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
