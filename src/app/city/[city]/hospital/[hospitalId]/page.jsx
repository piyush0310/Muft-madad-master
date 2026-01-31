"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';
import { hospitalsData } from '@/app/data/hospitalsData';
import Footer from '@/components/Footer';

export default function HospitalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const city = params?.city ? decodeURIComponent(params.city) : '';
  const hospitalId = params?.hospitalId ? decodeURIComponent(params.hospitalId) : '';

  // Find hospital data
  const cityHospitals = hospitalsData[city] || [];
  const hospital = cityHospitals.find(h => h.id === hospitalId);

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">अस्पताल नहीं मिला</p>
      </div>
    );
  }

  const handleBack = () => {
    router.push(`/city/${encodeURIComponent(city)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as your existing header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 shadow-sm">
        {/* Copy your existing header code */}
      </header>

      <div className="h-20 mt-5 sm:h-24 md:h-28"></div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">वापस {city} के अस्पतालों पर जाएं</span>
        </button>
      </div>

      {/* Hospital Detail Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {/* Hospital Hero */}
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="relative h-64 sm:h-80">
            <img 
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/HeroImage.webp';
              }}
            />
            
            {/* Badges Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {hospital.badges.ayushman && (
                <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> आयुष्मान भारत
                </span>
              )}
              {hospital.badges.muftMadadPartner && (
                <span className="bg-white text-green-600 border-2 border-green-600 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> मुफ्त मदद पार्टनर
                </span>
              )}
              {hospital.badges.nabhAccredited && (
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> NABH से मान्यता प्राप्त
                </span>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {hospital.name}
            </h1>

            {/* Location and Contact */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">पता</p>
                  <p className="text-sm">{hospital.address}</p>
                  <p className="text-sm mt-1">दिशा</p>
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className="mb-6">
              <p className="font-semibold text-gray-900 mb-1">समय</p>
              <p className="text-gray-600">{hospital.timing}</p>
            </div>

            {/* Call Button */}
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition">
              <Phone className="w-5 h-5" />
              <span>कॉल करें</span>
            </button>
          </div>
        </div>

        {/* About Hospital */}
        <section className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">अस्पताल के बारे में</h2>
          <p className="text-gray-700 leading-relaxed">{hospital.about.full}</p>
        </section>

        {/* Facilities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">सुविधाएं</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospital.facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{facility}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">विशेषज्ञताएं</h2>
          <div className="flex flex-wrap gap-3">
            {hospital.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {specialty}
              </span>
            ))}
          </div>
        </section>

       
      </main>

      <Footer />
    </div>
  );
}
