'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTreatmentIdFromLabel } from '@/app/data/treatmentsData';

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const TreatmentItem = ({ icon, label, onClick }) => (
  <div
    className="flex flex-col items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 rounded-lg transition hover:shadow-lg hover:scale-105"
    onClick={onClick}
  >
    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-xl shadow-md p-2">
      <img src={icon} alt={label} className="w-full h-full object-contain" />
    </div>
    <p className="text-center text-sm sm:text-base font-medium text-gray-800 leading-tight">{label}</p>
  </div>
);

// Separate component that uses useSearchParams
function MedicalTreatmentsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();

  const currentLang = lang || searchParams.get('lang') || 'hi';

  const treatments = currentLang === 'en' ? [
    { icon: 'https://cdn-icons-png.flaticon.com/128/8670/8670680.png', label: 'Cataract' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/18812/18812542.png', label: 'Glaucoma' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/19033/19033465.png', label: 'Knee Replacement' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/9874/9874950.png', label: 'Brain Tumor' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/8855/8855348.png', label: 'Uterus' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/2864/2864524.png', label: 'PCNL' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/822/822202.png', label: 'Chronic Kidney Disease' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10207/10207704.png', label: 'Uterine Fibroid' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/14437/14437420.png', label: 'PCOD/PCOS Treatment' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/2309/2309061.png', label: 'Uterus Infection' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10034/10034717.png', label: 'Piles' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/2217/2217851.png', label: 'Hernia' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/6762/6762146.png', label: 'Gallbladder Stone' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/7350/7350760.png', label: 'Appendix' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/4473/4473639.png', label: 'Coronary Disease' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/12243/12243683.png', label: 'Heart Failure' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/17911/17911042.png', label: 'Nose & Sinus' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/5793/5793558.png', label: 'Kidney Surgery' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/14777/14777221.png', label: 'Ovarian Cyst' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/6204/6204564.png', label: 'Fistula' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10475/10475910.png', label: 'Fissure' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/9450/9450306.png', label: 'Kidney Stone' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/5674/5674074.png', label: 'Spinal Disease' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/11604/11604209.png', label: 'Bypass Surgery' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10606/10606508.png', label: 'Hip Replacement' }
  ] : [
    { icon: 'https://cdn-icons-png.flaticon.com/128/8670/8670680.png', label: 'मोतियाबिंद' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/18812/18812542.png', label: 'ग्लूकोमा' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/19033/19033465.png', label: 'घुटना प्रत्यारोपण' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/9874/9874950.png', label: 'ब्रेन ट्यूमर' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/8855/8855348.png', label: 'गर्भाशय' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/2864/2864524.png', label: 'PCNL' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/822/822202.png', label: 'क्रॉनिक किडनी रोग' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10207/10207704.png', label: 'गर्भाशय फाइब्रॉइड' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/14437/14437420.png', label: 'पीसीओडी/पीसीओएस इलाज' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/2309/2309061.png', label: 'गर्भाशय इन्फेक्शन' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10034/10034717.png', label: 'बवासीर' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/2217/2217851.png', label: 'हर्निया' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/6762/6762146.png', label: 'पित्त की पथरी' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/7350/7350760.png', label: 'अपेंडिक्स' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/4473/4473639.png', label: 'कोलोनरी रोग' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/12243/12243683.png', label: 'हृदय विफलता' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/17911/17911042.png', label: 'नाक व साइनस' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/5793/5793558.png', label: 'गुर्दे की सर्जरी' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/14777/14777221.png', label: 'ओवेरियन सिस्ट' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/6204/6204564.png', label: 'फिस्टुला' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10475/10475910.png', label: 'फिशर' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/9450/9450306.png', label: 'किडनी स्टोन' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/5674/5674074.png', label: 'रीढ़ की हड्डी रोग' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/11604/11604209.png', label: 'बाईपास सर्जरी' },
    { icon: 'https://cdn-icons-png.flaticon.com/128/10606/10606508.png', label: 'हिप प्रत्यारोपण' }
  ];

  const handleTreatmentClick = (label) => {
    const treatmentId = getTreatmentIdFromLabel(label);
    router.push(`/treatment/${encodeURIComponent(treatmentId)}?lang=${currentLang}`);
  };

  const pageTitle = currentLang === 'en' ? 'Treatments We Provide' : 'हमारे द्वारा प्रदान किए जाने वाले उपचार';
  const stats = currentLang === 'en' ? {
    consulted: 'Consulted Patients',
    surgeries: 'Surgeries Performed',
    cities: 'Cities',
    hospitals: 'Partner Hospitals'
  } : {
    consulted: 'परामर्शित मरीज',
    surgeries: 'किए गए सर्जरी',
    cities: 'शहर',
    hospitals: 'सहयोगी अस्पताल'
  };

  return (
    <div className="bg-white">
      <div className="h-20 sm:h-24 md:h-28"></div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium uppercase bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            {pageTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentLang === 'en'
              ? 'Free treatment available for 25+ major diseases with up to 80% discount'
              : '25+ प्रमुख रोगों का निःशुल्क इलाज 80% तक छूट के साथ उपलब्ध'
            }
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-4 sm:gap-6 lg:gap-8 mb-10">
          {treatments.map((treatment, index) => (
            <TreatmentItem
              key={index}
              icon={treatment.icon}
              label={treatment.label}
              onClick={() => handleTreatmentClick(treatment.label)}
            />
          ))}
        </div>
      </section>

      <section className="bg-white/80 backdrop-blur-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="group text-center">
              <div className="text-4xl  font-medium text-gray-900 mb-4 bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500">
                <CountUp end={1000} suffix="+" />
              </div>
              <p className="text-lg sm:text-xl font-medium text-gray-700">{stats.consulted}</p>
            </div>

            <div className="group text-center">
              <div className="text-4xl font-medium text-gray-900 mb-4 bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500">
                <CountUp end={200} suffix="+" />
              </div>
              <p className="text-lg sm:text-xl  font-medium text-gray-700">{stats.surgeries}</p>
            </div>

            <div className="group text-center">
              <div className="text-4xl font-medium text-gray-900 mb-4 bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500">
                <CountUp end={5} suffix="+" />
              </div>
              <p className="text-lg sm:text-xl  font-medium text-gray-700">{stats.cities}</p>
            </div>

            <div className="group text-center">
              <div className="text-4xl font-medium text-gray-900 mb-4 bg-linear-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-all duration-500">
                <CountUp end={12} suffix="+" />
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-700">{stats.hospitals}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Main component with Suspense wrapper
export default function MedicalTreatmentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MedicalTreatmentsContent />
    </Suspense>
  );
}