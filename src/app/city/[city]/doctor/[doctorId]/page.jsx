"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MapPin, ArrowLeft, CheckCircle, ChevronDown, Award, GraduationCap, Languages, Briefcase } from 'lucide-react';
import { doctorsData } from '@/app/data/doctorsData';
import Footer from '@/components/Footer';

export default function DoctorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const city = params?.city ? decodeURIComponent(params.city) : '';
  const doctorId = params?.doctorId ? decodeURIComponent(params.doctorId) : '';

  // Find doctor data
  const cityDoctors = doctorsData[city] || [];
  const doctor = cityDoctors.find(d => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">डॉक्टर नहीं मिले</p>
          <button 
            onClick={() => router.push(`/city/${encodeURIComponent(city)}`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            वापस जाएं
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    router.push(`/city/${encodeURIComponent(city)}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 min-w-0">
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={handleBackToHome}>
            <img src="/logo.png" alt="Muft Madad Logo" className="h-14 w-24 sm:h-20 sm:w-36 md:h-24 md:w-40 object-cover" 
              onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <div className="flex items-center gap-1 sm:gap-3 md:gap-4 flex-shrink min-w-0">
            <button className="flex items-center gap-1 px-2 py-1 border border-green-500 text-green-600 rounded hover:bg-green-50 transition text-xs sm:text-base">
              <span className="hidden sm:inline">हिंदी</span><span className="sm:hidden">HI</span><ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 transition text-xs sm:text-base">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" /><span className="hidden sm:inline">कॉल करें</span>
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded transition text-xs sm:text-base">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 fill-red-600" />
              <span className="font-semibold hidden md:inline">{city}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="h-20 mt-5 sm:h-24 md:h-28"></div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">वापस {city} के डॉक्टरों पर जाएं</span>
        </button>
      </div>

      {/* Doctor Detail Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {/* Doctor Profile Card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-blue-200', 'flex', 'items-center', 'justify-center');
                      e.target.parentElement.innerHTML = `<span class="text-5xl font-bold text-blue-700">${doctor.name.split(' ')[1]?.[0] || 'D'}</span>`;
                    }}
                  />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {doctor.name}
                </h1>
                <p className="text-lg text-gray-700 mb-2">{doctor.specialty}</p>
                <p className="text-sm text-gray-600 mb-4">{doctor.experience}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ मुफ्त मदद पार्टनर
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ आयुष्मान भारत
                  </span>
                </div>

                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md">
                  <Phone className="w-5 h-5" />
                  <span>अपॉइंटमेंट बुक करें</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hospital and Location */}
          <div className="p-6 sm:p-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  अस्पताल
                </h3>
                <p className="text-gray-700">{doctor.hospital}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  पता
                </h3>
                <p className="text-gray-700 text-sm">{doctor.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 sm:p-8 mb-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            डॉक्टर के बारे में
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">{doctor.about.full}</p>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Specialties */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              विशेषज्ञता
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ul className="space-y-3">
                {doctor.specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-gray-700">{specialty}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              शिक्षा
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ul className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span className="text-gray-700">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Languages */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Languages className="w-6 h-6 text-orange-600" />
              भाषाएं
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex flex-wrap gap-3">
                {doctor.languages.map((language, index) => (
                  <span 
                    key={index}
                    className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Available Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-teal-600" />
              अस्पतालों में उपलब्ध सेवाये
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ul className="space-y-3">
                {doctor.availableServices.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Awards (if any) */}
        {doctor.awards && doctor.awards.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-600" />
              पुरस्कार और उपलब्धियां
            </h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <ul className="space-y-3">
                {doctor.awards.map((award, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {doctor.name} से परामर्श लें
          </h2>
          <p className="text-gray-700 mb-6">
            आयुष्मान योजना के तहत मुफ्त इलाज पाएं
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition shadow-lg text-lg inline-flex items-center gap-2">
            <Phone className="w-6 h-6" />
            <span>अभी कॉल करें</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
