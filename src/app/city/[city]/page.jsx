"use client";
import React from "react";
import { Phone, ArrowLeft, Star } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import MedicalTreatmentsPage from "@/components/Treatments";
import OurSpecialities from "@/components/Specialities";
import MuftMadadBlogs from "@/components/Blog";
import Footer from "@/components/Footer";
import { hospitalsData } from "@/app/data/hospitalsData";
import { doctorsData } from "@/app/data/doctorsData";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CityPage() {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const router = useRouter();
  const params = useParams();
  const { lang } = useLanguage();

  // Get city from URL parameter
  const cityFromUrl = params?.city
    ? decodeURIComponent(params.city)
    : "मुरादाबाद";
  const [selectedCity, setSelectedCity] = React.useState(cityFromUrl);

  // Bilingual content
  const content = lang === 'en' ? {
    backButton: "Back to Home Page",
    hero: {
      part1: "Get Completely Free Treatment in",
      part2: "under Ayushman Yojana through Muft Madad"
    },
    benefits: [
      "Free consultation with doctors",
      "More than 60% discount on tests",
      "Easy treatment with Muft Madad assistant's help in hospital",
      "Post-treatment care and follow-up"
    ],
    callButton: "Call Now",
    doctorsHeading: "Doctors in",
    viewMore: "View More",
    aboutHeading: "About",
    aboutText: {
      part1: "In {city}, we provide completely free treatment facility under Ayushman Bharat Yojana through Muft Madad. Our team is committed to providing you with the best medical services.",
      part2: "According to the 2011 census, the population of {city} was approximately 887,871 and it is among India's 100 smart cities. It is the second most industrialized city of Uttar Pradesh and is famous for brass and handicrafts."
    },
    hospitalsHeading: "Hospitals in",
    ayushmanBadge: "Ayushman Bharat",
    muftMadadBadge: "Muft Madad",
    discount: "Discount",
    address: "Address",
    timing: "Timing",
    aboutHospital: "About Hospital",
    testimonialsHeading: "Successful Treatment of Patients in {city} by Muft Madad",
    treatment: "Treatment",
    cataract: "Cataract",
    city: "City",
    verified: "Verified"
  } : {
    backButton: "वापस होम पेज पर जाएं",
    hero: {
      part1: "मुफ्त मदद द्वारा आयुष्मान योजना के तहत",
      part2: "में कराएं एकदम मुफ्त इलाज"
    },
    benefits: [
      "मुफ्त में डॉक्टर को दिखाना",
      "जाँच पर 60 % से ज्यादा छूट",
      "अस्पताल में मुफ्त मदद साथी की मदद से आसान इलाज",
      "इलाज के बाद भी देख-रेख"
    ],
    callButton: "कॉल करें",
    doctorsHeading: "में डॉक्टर",
    viewMore: "और देखें",
    aboutHeading: "के बारे में",
    aboutText: {
      part1: "{city} में मुफ्त मदद के माध्यम से हम आयुष्मान भारत योजना के तहत पूरी तरह से मुफ्त इलाज की सुविधा प्रदान करते हैं। हमारी टीम आपको सर्वोत्तम चिकित्सा सेवाएं उपलब्ध कराने के लिए प्रतिबद्ध है।",
      part2: "2011 की जनगणना के अनुसार, {city} की जनसंख्या लगभग 887,871 थी और यह भारत के 100 स्मार्ट शहरों के अंतर्गत आता है। यह शहर उत्तर प्रदेश का दूसरा सबसे औद्योगिक शहर है और ताज और हस्तशिल्प के लिए प्रसिद्ध है।"
    },
    hospitalsHeading: "में अस्पताल",
    ayushmanBadge: "आयुष्मान भारत",
    muftMadadBadge: "मुफ्त मदद",
    discount: "डिस्काउंट",
    address: "पता",
    timing: "समय",
    aboutHospital: "अस्पताल के बारे में",
    testimonialsHeading: "मुफ्त मदद द्वारा {city} में मरीजों का सफल इलाज",
    treatment: "इलाज",
    cataract: "मोतियाबिंद",
    city: "शहर",
    verified: "सत्यापित"
  };

  const cities = ["मुरादाबाद", "चंदौसी", "अमरोहा", "बिलारी"];

  // City name translation mapping
  const cityTranslation = {
    "मुरादाबाद": "Moradabad",
    "चंदौसी": "Chandausi",
    "अमरोहा": "Amroha",
    "बिलारी": "Bilari"
  };

  const getTranslatedCity = () => {
    return lang === 'en' ? cityTranslation[selectedCity] : selectedCity;
  };

  // Testimonials data
  const allTestimonials = [
    {
      name: "नजीज अहमद",
      nameEn: "Najeez Ahmad",
      city: "मुरादाबाद",
      cityEn: "Moradabad",
      rating: 5,
      date: "24/09/2024",
      verified: true,
      text: '"मैं मुफ्त मदद की सहायता से गया था आयुष्मान कार्ड से इलाज कराने। बहुत बढ़िया इलाज हुआ मेरा एक नंबर का कोई दिक्कत नहीं, और एक भी पैसा नहीं लगा मेरा इलाज करने में, सिर्फ आने जाने में पैसा लगा मेरा।"',
      textEn: '"I went for treatment with Ayushman Card with the help of Muft Madad. I got excellent treatment, no problem at all, and not a single penny was spent on my treatment, only money was spent on coming and going."'
    },
    {
      name: "बिन्ते जेहरा",
      nameEn: "Binte Zehra",
      city: "मुरादाबाद",
      cityEn: "Moradabad",
      rating: 4,
      date: "24/09/2024",
      verified: true,
      text: '"मेरे अब्बू की आँखों में दिक्कत थी उन्हें देखने में दिक्कत होती थी। मेरे पास मुफ्त मदद का हेल्पलाइन नंबर था मैंने कॉल किया और मुफ्त मदद साथी की मदद के कारण से मेरे अब्बू को सफल मोतियाबिंद का ऑपरेशन हुआ और इलाज में कोई दिक्कत नहीं हुई।"',
      textEn: '"My father had trouble with his eyes, he had difficulty seeing. I had the Muft Madad helpline number, I called and because of the help of Muft Madad companion, my father had a successful cataract operation and there was no problem in the treatment."'
    },
    {
      name: "अभिनाश",
      nameEn: "Abhinash",
      city: "मुरादाबाद",
      cityEn: "Moradabad",
      rating: 5,
      date: "24/09/2024",
      verified: true,
      text: '"मैं वीरेंद्र सिंह अपने दोस्त अभिनाश के कहने पर मुफ्त मदद की मदद से इलाज करवाया और मेरा इलाज सफल हुआ और बिना किसी समस्या या दिक्कत के।"',
      textEn: '"I am Virendra Singh, at the behest of my friend Abhinash, I got treatment with the help of Muft Madad and my treatment was successful without any problem or difficulty."'
    },
    {
      name: "शकीला",
      nameEn: "Shakila",
      city: "मुरादाबाद",
      cityEn: "Moradabad",
      rating: 4.5,
      date: "14/06/2024",
      verified: true,
      text: '"मेरी आँख में डीवालपन आ गया था क्योंकि मुझे मोतियाबिंद था, मैंने दोस्त के कहने पर मुफ्त मदद से संपर्क कर लिया या आज में साफ देख पा रहा हूं। मेरे कोई पैसे नहीं लगा, इलाज से बहुत खुश हूं।"',
      textEn: '"I had developed cloudiness in my eye because I had cataract, I contacted Muft Madad on the advice of a friend and today I can see clearly. I did not spend any money, very happy with the treatment."'
    },
    {
      name: "छोटी देवी",
      nameEn: "Chhoti Devi",
      city: "मुरादाबाद",
      cityEn: "Moradabad",
      rating: 5,
      date: "14/06/2024",
      verified: true,
      text: '"हम बहुत खुश है, मुफ्त मदद ने हमारी आँखों की रोशनी लौटा दी, हम बाकी सब को भी मुफ्त मदद के बारे में बता रहे हैं। मुफ्त मदद में बहुत अच्छा काम हो रहा है।"',
      textEn: '"We are very happy, Muft Madad restored our eyesight, we are telling everyone else about Muft Madad. Very good work is being done in Muft Madad."'
    },
    {
      name: "रमेश कुमार",
      nameEn: "Ramesh Kumar",
      city: "चंदौसी",
      cityEn: "Chandausi",
      rating: 5,
      date: "15/08/2024",
      verified: true,
      text: '"मुफ्त मदद की टीम ने मेरे पिताजी का ऑपरेशन करवाने में बहुत मदद की। पूरा खर्चा आयुष्मान योजना में कवर हो गया। धन्यवाद!"',
      textEn: '"Muft Madad team helped a lot in getting my father\'s operation done. The entire cost was covered under Ayushman Yojana. Thank you!"'
    },
    {
      name: "सुनीता देवी",
      nameEn: "Sunita Devi",
      city: "अमरोहा",
      cityEn: "Amroha",
      rating: 4.5,
      date: "20/07/2024",
      verified: true,
      text: '"मेरी बेटी का इलाज बिल्कुल मुफ्त में हुआ। डॉक्टर और स्टाफ बहुत अच्छा व्यवहार करते हैं। मुफ्त मदद की सेवा काबिले तारीफ है।"',
      textEn: '"My daughter\'s treatment was completely free. Doctors and staff behave very well. Muft Madad\'s service is commendable."'
    },
    {
      name: "अजय वर्मा",
      nameEn: "Ajay Verma",
      city: "बिलारी",
      cityEn: "Bilari",
      rating: 5,
      date: "10/09/2024",
      verified: true,
      text: '"आयुष्मान कार्ड से पहली बार इलाज करवाया और मुफ्त मदद की टीम ने पूरी प्रक्रिया आसान बना दी। बहुत अच्छा अनुभव रहा।"',
      textEn: '"Got treatment with Ayushman Card for the first time and Muft Madad team made the entire process easy. It was a very good experience."'
    },
  ];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    router.push(`/city/${encodeURIComponent(city)}`);
  };

  const handleBackToHome = () => {
    router.push(-1);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get doctors from hospitalsData
  const getCityDoctors = () => {
    return doctorsData[selectedCity] || [];
  };

  // Get testimonials for the selected city
  const getCityTestimonials = () => {
    return allTestimonials.filter(
      (testimonial) => testimonial.city === selectedCity
    );
  };

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
      stars.push(
        <Star
          key="half-empty"
          className="w-4 h-4 text-yellow-400 absolute"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="h-20 mt-5 sm:h-24 md:h-28"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <button
          onClick={handleBackToHome}
          className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">{content.backButton}</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-lg shadow-md overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="p-6 sm:p-8 md:p-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.4]">
                  {lang === 'en' ? (
                    <>
                      {content.hero.part1}{' '}
                      <span className="text-red-600">{getTranslatedCity()}</span>{' '}
                      {content.hero.part2}
                    </>
                  ) : (
                    <>
                      {content.hero.part1}{' '}
                      <span className="text-red-600">{selectedCity}</span>{' '}
                      {content.hero.part2}
                    </>
                  )}
                </h1>

                <ul className="space-y-3 mb-8">
                  {content.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-green-600 font-bold text-xl mt-1">
                        ▸
                      </span>
                      <span className="text-base sm:text-lg">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition shadow-lg text-base sm:text-lg">
                  <Phone className="w-5 h-5" />
                  <span>{content.callButton}</span>
                </button>
              </div>
              <div className="hidden lg:block relative h-full min-h-[400px]">
                <img
                  src="/HeroImage.webp"
                  alt="Happy family"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Doctors Section */}
          {getCityDoctors().length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {lang === 'en' 
                  ? `${content.doctorsHeading} ${getTranslatedCity()}`
                  : `${getTranslatedCity()} ${content.doctorsHeading}`
                }
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {getCityDoctors().map((doctor, index) => (
                  <div
                    key={doctor.id || index}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition cursor-pointer"
                    onClick={() => router.push(`/city/${encodeURIComponent(selectedCity)}/doctor/${doctor.id}`)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-blue-200">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('bg-blue-100', 'flex', 'items-center', 'justify-center');
                            e.target.parentElement.innerHTML = `<span class="text-3xl font-bold text-blue-700">${doctor.name.split(" ")[1]?.[0] || "D"}</span>`;
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {doctor.specialty}
                      </p>
                      <p className="text-gray-500 text-xs mb-4">
                        {doctor.experience}
                      </p>
                      <button
                        className="text-green-700 font-semibold underline hover:text-green-600 transition text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/city/${encodeURIComponent(selectedCity)}/doctor/${doctor.id}`);
                        }}
                      >
                        {content.viewMore}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* City Information Section */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {lang === 'en' 
              ? `${content.aboutHeading} ${getTranslatedCity()}`
              : `${getTranslatedCity()} ${content.aboutHeading}`
            }
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>{content.aboutText.part1.replace('{city}', getTranslatedCity())}</p>
            <p className="mt-4">
              {content.aboutText.part2.replace('{city}', getTranslatedCity())}
            </p>
          </div>
        </div>
      </section>

      {/* Hospitals Grid Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {lang === 'en'
              ? `${content.hospitalsHeading} ${getTranslatedCity()}`
              : `${getTranslatedCity()} ${content.hospitalsHeading}`
            }
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(hospitalsData[selectedCity] || []).map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() =>
                  router.push(
                    `/city/${encodeURIComponent(
                      selectedCity
                    )}/hospital/${hospital.id}`
                  )
                }
              >
                {/* Hospital Image */}
                <div className="relative h-32 bg-gradient-to-br from-blue-100 to-green-100">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/HeroImage.webp";
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {hospital.badges.ayushman && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        ✓ {content.ayushmanBadge}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 left-2">
                    {hospital.badges.muftMadadPartner && (
                      <span className="bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        ✓ {content.muftMadadBadge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded">
                      {content.discount} {hospital.discount}
                    </span>
                  </div>
                </div>

                {/* Hospital Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {hospital.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p className="font-semibold text-gray-700">{content.address}</p>
                    <p className="text-xs leading-relaxed line-clamp-2">
                      {hospital.address}
                    </p>

                    <p className="font-semibold text-gray-700 mt-3">{content.timing}</p>
                    <p className="text-xs">{hospital.timing}</p>
                  </div>

                  <div className="border-t pt-3">
                    <p className="font-semibold text-gray-900 text-sm mb-2">
                      {content.aboutHospital}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {hospital.about.short}
                    </p>
                    <button
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xs mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/city/${encodeURIComponent(
                            selectedCity
                          )}/hospital/${hospital.id}`
                        );
                      }}
                    >
                      {content.viewMore}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MedicalTreatmentsPage />
      <OurSpecialities />
      <MuftMadadBlogs />

      {/* Testimonials Section */}
      {getCityTestimonials().length > 0 && (
        <div className="bg-gray-50 p-6 mx-4 sm:mx-20 sm:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {content.testimonialsHeading.replace('{city}', getTranslatedCity())}
          </h2>
          <p className="text-gray-600 mb-6">
            {content.treatment}: {content.cataract}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {getCityTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {lang === 'en' ? testimonial.nameEn : testimonial.name}
                    </h3>
                    {testimonial.verified && (
                      <span className="text-xs text-gray-500">
                        {content.treatment}: {content.cataract}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                  {lang === 'en' ? testimonial.textEn : testimonial.text}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <span className="font-semibold">
                    {content.city}: {lang === 'en' ? testimonial.cityEn : testimonial.city}
                  </span>
                  <span>{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
