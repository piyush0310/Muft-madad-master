"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MapPin, ArrowLeft, CheckCircle, ChevronDown, Activity, AlertCircle, TrendingUp, User, Hospital, DollarSign, Award } from 'lucide-react';
import { treatmentsData } from '@/app/data/treatmentsData';
import { doctorsData } from '@/app/data/doctorsData';
import { hospitalsData } from '@/app/data/hospitalsData';
import { specialitiesData } from '@/app/data/specialitiesData';
import Footer from '@/components/Footer';

export default function TreatmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedCity, setSelectedCity] = React.useState('मुरादाबाद');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = React.useState(false);
  
  const treatmentId = params?.treatmentId ? decodeURIComponent(params.treatmentId) : '';
  const treatment = treatmentsData[treatmentId];

  const cities = ['मुरादाबाद', 'चंदौसी', 'अमरोहा', 'बिलारी'];

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">उपचार की जानकारी नहीं मिली</p>
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

  // Get doctors for this treatment in selected city
  const getTreatmentDoctors = () => {
    const cityDoctorsList = doctorsData[selectedCity] || [];
    const relatedSpeciality = specialitiesData[treatment.speciality];
    
    if (!relatedSpeciality) return [];
    
    return cityDoctorsList.filter(doctor => 
      doctor.specialties.some(spec => 
        spec.toLowerCase().includes(relatedSpeciality.title.toLowerCase()) ||
        relatedSpeciality.title.toLowerCase().includes(spec.toLowerCase())
      )
    );
  };

  // Get hospitals for this treatment in selected city
  const getTreatmentHospitals = () => {
    const cityHospitalsList = hospitalsData[selectedCity] || [];
    const relatedSpeciality = specialitiesData[treatment.speciality];
    
    if (!relatedSpeciality) return [];
    
    return cityHospitalsList.filter(hospital => 
      hospital.specialties && hospital.specialties.some(spec => 
        spec.toLowerCase().includes(relatedSpeciality.title.toLowerCase()) ||
        relatedSpeciality.title.toLowerCase().includes(spec.toLowerCase())
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

  const treatmentDoctors = getTreatmentDoctors();
  const treatmentHospitals = getTreatmentHospitals();

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
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded transition text-xs sm:text-base"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 fill-red-600" />
                <span className="font-semibold hidden md:inline">{selectedCity}</span>
                <span className="font-semibold md:hidden">शहर</span>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {cities.map((city, index) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={`block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition ${
                        index !== cities.length - 1 ? 'border-b border-gray-100' : ''
                      } ${selectedCity === city ? 'bg-red-50 text-red-600 font-semibold' : ''}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

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
              <div className="flex items-center gap-4 mb-4">
                <img src={treatment.icon} alt={treatment.title} className="w-16 h-16 object-contain" />
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                    {treatment.title}
                  </h1>
                  <p className="text-lg text-gray-600">{treatment.englishTitle}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{treatment.description.short}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {treatment.cost}
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {treatment.success_rate}
                </div>
              </div>
              
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md">
                <Phone className="w-5 h-5" />
                <span>अपॉइंटमेंट बुक करें</span>
              </button>
            </div>
            
            <div className="hidden lg:block relative h-96">
              <img 
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-full object-cover rounded-r-lg"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-7 h-7 text-blue-600" />
            {treatment.title} के बारे में
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">{treatment.description.full}</p>
        </section>

        {/* Symptoms, Causes, Treatments Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Symptoms */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-100 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              लक्षण
            </h2>
            <ul className="space-y-3">
              {treatment.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Causes */}
          <section className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-100 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
              कारण
            </h2>
            <ul className="space-y-3">
              {treatment.causes.map((cause, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span className="text-gray-700">{cause}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Treatments */}
          <section className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              उपचार के विकल्प
            </h2>
            <ul className="space-y-3">
              {treatment.treatments.map((treat, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{treat}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recovery Info */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-100 rounded-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">रिकवरी और देखभाल</h2>
          <p className="text-gray-700 leading-relaxed">{treatment.recovery}</p>
        </section>

        {/* Doctors Section */}
        {treatmentDoctors.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-7 h-7 text-purple-600" />
              {selectedCity} में {treatment.title} के विशेषज्ञ डॉक्टर
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {treatmentDoctors.map((doctor) => (
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
        {treatmentHospitals.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Hospital className="w-7 h-7 text-teal-600" />
              {selectedCity} में {treatment.title} के लिए अस्पताल
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {treatmentHospitals.map((hospital) => (
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
            {treatment.title} का मुफ्त इलाज पाएं
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            आयुष्मान योजना के तहत {selectedCity} में बिल्कुल मुफ्त में करवाएं इलाज
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-semibold">{treatment.cost}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{treatment.success_rate}</span>
            </div>
          </div>
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
