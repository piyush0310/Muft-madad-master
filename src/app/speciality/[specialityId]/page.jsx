"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MapPin, ArrowLeft, CheckCircle, ChevronDown, Stethoscope, Hospital, User } from 'lucide-react';
import { specialitiesData } from '@/app/data/specialitiesData';
import { doctorsData } from '@/app/data/doctorsData';
import { hospitalsData } from '@/app/data/hospitalsData';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function SpecialityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedCity, setSelectedCity] = React.useState('मुरादाबाद');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = React.useState(false);
  
  const specialityId = params?.specialityId ? decodeURIComponent(params.specialityId) : '';
  const speciality = specialitiesData[specialityId];

  const cities = ['मुरादाबाद', 'चंदौसी', 'अमरोहा', 'बिलारी'];

  if (!speciality) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">विशेषज्ञता नहीं मिली</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            होम पेज पर जाएं
          </button>
        </div>
      </div>
    );
  }

  // Get doctors with this speciality in selected city
  const getSpecialityDoctors = () => {
    const cityDoctorsList = doctorsData[selectedCity] || [];
    return cityDoctorsList.filter(doctor => 
      doctor.specialties.some(spec => 
        spec.toLowerCase().includes(speciality.title.toLowerCase()) ||
        speciality.title.toLowerCase().includes(spec.toLowerCase())
      )
    );
  };

  // Get hospitals with this speciality in selected city
  const getSpecialityHospitals = () => {
    const cityHospitalsList = hospitalsData[selectedCity] || [];
    return cityHospitalsList.filter(hospital => 
      hospital.specialties && hospital.specialties.some(spec => 
        spec.toLowerCase().includes(speciality.title.toLowerCase()) ||
        speciality.title.toLowerCase().includes(spec.toLowerCase())
      )
    );
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  const specialityDoctors = getSpecialityDoctors();
  const specialityHospitals = getSpecialityHospitals();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      <div className="h-20 mt-5 sm:h-24 md:h-28"></div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button 
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">वापस होम पेज पर जाएं</span>
        </button>
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg overflow-hidden shadow-lg mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-6 sm:p-8 md:p-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {speciality.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{speciality.englishTitle}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{speciality.description.short}</p>
              
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md">
                <Phone className="w-5 h-5" />
                <span>अपॉइंटमेंट बुक करें</span>
              </button>
            </div>
            
            <div className="hidden lg:block relative h-80">
              <img 
                src={speciality.image}
                alt={speciality.title}
                className="w-full h-full object-cover rounded-r-lg"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Stethoscope className="w-7 h-7 text-blue-600" />
            {speciality.title} के बारे में
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">{speciality.description.full}</p>
        </section>

        {/* Common Diseases and Treatments */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Common Diseases */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">सामान्य बीमारियां</h2>
            <ul className="space-y-3">
              {speciality.commonDiseases.map((disease, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{disease}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Treatments */}
          <section className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">उपलब्ध उपचार</h2>
            <ul className="space-y-3">
              {speciality.treatments.map((treatment, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{treatment}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Doctors Section */}
        {specialityDoctors.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-7 h-7 text-purple-600" />
              {selectedCity} में {speciality.title} विशेषज्ञ डॉक्टर
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {specialityDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition cursor-pointer"
                  onClick={() => router.push(`/city/${encodeURIComponent(selectedCity)}/doctor/${doctor.id}`)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('bg-blue-200', 'flex', 'items-center', 'justify-center');
                          e.target.parentElement.innerHTML = `<span class="text-3xl font-bold text-blue-700">${doctor.name.split(" ")[1]?.[0] || "D"}</span>`;
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
                    <p className="text-gray-500 text-xs mb-3">{doctor.experience}</p>
                    <p className="text-gray-600 text-xs mb-4">{doctor.hospital}</p>
                    <button className="text-green-600 hover:text-green-700 font-semibold text-sm underline">
                      विस्तार से देखें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hospitals Section */}
        {specialityHospitals.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Hospital className="w-7 h-7 text-teal-600" />
              {selectedCity} में {speciality.title} के लिए अस्पताल
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {specialityHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                  onClick={() => router.push(`/city/${encodeURIComponent(selectedCity)}/hospital/${hospital.id}`)}
                >
                  <div className="relative h-32">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/HeroImage.webp';
                      }}
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded">
                        ✓ आयुष्मान भारत
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{hospital.name}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{hospital.address}</p>
                    <p className="text-xs text-gray-500 mb-3">{hospital.timing}</p>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-xs">
                      और देखें →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center border-2 border-green-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {speciality.title} के लिए मुफ्त इलाज पाएं
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            आयुष्मान योजना के तहत {selectedCity} में मुफ्त में करवाएं इलाज
          </p>
          <a href="tel:+919876543210" className="w-full sm:w-auto">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition shadow-lg text-lg inline-flex items-center gap-2">
            <Phone className="w-6 h-6" />
            <span>अभी कॉल करें</span>
          </button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
