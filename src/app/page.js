import React from 'react';
import Heropage from '../components/Heropage';
import MedicalTreatmentsPage from '../components/Treatments';
import OurSpecialities from '../components/Specialities';
import WhyChooseMuftMadad from '../components/WhyChoose';
import PatientTestimonials from '../components/Testimonial';
import MuftMadadBlogs from '../components/Blog';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';



const page = () => {
  return (
    <div>
      <Navbar />
      <Heropage />
      <MedicalTreatmentsPage />
      <OurSpecialities />
      <WhyChooseMuftMadad />
      <PatientTestimonials />
      {/* <MuftMadadBlogs /> */}
      <Footer />
    </div>
  );
}

export default page;
