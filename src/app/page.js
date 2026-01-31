import React, { Suspense } from 'react';
import Heropage from '../components/Heropage';
import MedicalTreatmentsPage from '../components/Treatments';
import OurSpecialities from '../components/Specialities';
import WhyChooseMuftMadad from '../components/WhyChoose';
import PatientTestimonials from '../components/Testimonial';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';

const Page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <Heropage />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <MedicalTreatmentsPage />
      </Suspense>
      
      <OurSpecialities />
      <WhyChooseMuftMadad />
      <PatientTestimonials />
      <Footer />
    </div>
  );
};

export default Page;