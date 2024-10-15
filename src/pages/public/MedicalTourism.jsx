import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaHospital, FaUserMd, FaGlobe, FaMoneyBillWave, FaCalendarAlt, FaHandHoldingMedical, FaPassport } from 'react-icons/fa';
import { PATH } from '../../routes/path';
import { medicalTourismHero } from '../../assets';

const MedicalTourism = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    console.log("Navigating to:", PATH.general.contact);
    navigate(PATH.general.contact);
  };

  return (
    <div className="medical-tourism">
      {/* Hero Section */}
      <div className="hero-section relative bg-cover bg-center overflow-hidden h-96 flex items-center justify-center" style={{ backgroundImage: `url(${medicalTourismHero})` }}>
        <div className="overlay absolute inset-0 bg-black h-full opacity-50"></div>
        <div className="text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Welcome to Sozo-hal</h1>
          <p className="text-2xl">Your Premier Medical Tourism Partner</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Medical Tourism with Sozo-hal?</h2>
          <p className="text-lg mb-6">
            At Sozo-hal, we specialize in providing comprehensive medical tourism services, connecting individuals with world-class healthcare facilities and expert medical professionals across the globe. Our mission is to offer you high-quality healthcare solutions while ensuring a seamless, comfortable, and cost-effective experience.
          </p>
          <p className="text-lg mb-6">
            Medical tourism allows you to access advanced medical treatments and procedures abroad, often at a fraction of the cost compared to your home country. With the rise of globally accredited hospitals, cutting-edge medical technology, and highly trained specialists worldwide, patients can combine their healthcare needs with the opportunity to recover in serene, relaxing environments.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Benefits of Medical Tourism</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: <FaMoneyBillWave />, title: "Affordable Healthcare", description: "Save up to 70% on medical procedures without compromising on quality. Many procedures cost a fraction of what they would in Western countries." },
              { icon: <FaUserMd />, title: "Access to Expertise", description: "Benefit from world-class specialists and healthcare providers in leading international facilities, many of whom have trained in top medical schools globally." },
              { icon: <FaCalendarAlt />, title: "No Long Wait Times", description: "Receive timely treatments without the long waiting periods commonly experienced in some countries. Most procedures can be scheduled within weeks." },
              { icon: <FaGlobe />, title: "Combine Healthcare with Travel", description: "Explore new destinations and recuperate in beautiful, tranquil settings. Turn your medical journey into a rejuvenating vacation." },
              { icon: <FaHandHoldingMedical />, title: "Personalized Care", description: "Enjoy customized care packages that cater to your medical and travel needs, with dedicated support throughout your journey." },
              { icon: <FaHospital />, title: "State-of-the-Art Facilities", description: "Access cutting-edge medical technology and internationally accredited hospitals that often surpass the standards found in many Western countries." },
              { icon: <FaPassport />, title: "Medical Visa Support", description: "We assist with obtaining medical visas, ensuring a smooth entry process for your healthcare journey abroad." },
              { icon: <FaPlane />, title: "Comprehensive Travel Services", description: "From flights to accommodation and local transportation, we handle all aspects of your medical travel experience." },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-blue-500">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Medical Consultations",
                description: "We begin with a detailed consultation to understand your medical requirements. Our network of healthcare specialists will review your medical history, offer advice, and propose a tailored treatment plan. We also provide second-opinion services if needed, connecting you with multiple experts to ensure you make an informed decision."
              },
              {
                title: "Hospital and Doctor Selection",
                description: "We work with internationally accredited hospitals and clinics that meet the highest standards of care. Our extensive network includes facilities accredited by organizations such as JCI, NABH, and ACHSI. We help you select the right facility and medical professionals based on your specific needs, considering factors such as specialization, success rates, and patient reviews."
              },
              {
                title: "Travel and Accommodation Coordination",
                description: "We take care of all your travel arrangements, including flights, visas, and accommodation. Choose from a variety of recovery-friendly hotels, resorts, or serviced apartments, ensuring a comfortable and peaceful stay while you recuperate. We also arrange airport transfers and provide local transportation services throughout your stay."
              },
              {
                title: "Treatment and Procedure Management",
                description: "We coordinate all aspects of your medical treatment, including scheduling consultations, surgeries, and follow-up appointments. Our team remains in close communication with you and your healthcare provider throughout the process to ensure everything runs smoothly. We also provide language interpretation services to facilitate clear communication with your medical team."
              },
              {
                title: "Post-Treatment Care",
                description: "After your procedure, we provide ongoing support to monitor your recovery and manage any follow-up care. If necessary, we can arrange for rehabilitation services, additional consultations, or coordinate with your local healthcare provider for continuity of care upon your return home. We also offer telemedicine follow-ups with your treating physician."
              },
              {
                title: "Concierge Services",
                description: "We offer personalized concierge services to make your stay as pleasant as possible. This includes arranging local transportation, providing translation services, organizing tours and leisure activities for you and your travel companions, and assisting with any special requests or dietary needs during your recovery period."
              },
            ].map((service, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Medical Specialties</h2>
          <p className="text-lg mb-6">
            At Sozo-hal, we cater to a wide range of medical procedures and treatments. Our expertise spans across various medical fields, ensuring that we can meet diverse healthcare needs. Here are some of our key specialties:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cosmetic Surgery",
                procedures: ["Facelifts", "Liposuction", "Breast augmentation", "Rhinoplasty", "Tummy tucks", "Body contouring"]
              },
              {
                title: "Orthopedic Procedures",
                procedures: ["Knee replacements", "Hip replacements", "Spine surgeries", "Sports injury treatments", "Shoulder surgeries", "Arthroscopic procedures"]
              },
              {
                title: "Cardiology",
                procedures: ["Coronary artery bypass", "Angioplasty", "Heart valve replacements", "Pacemaker implantations", "Cardiovascular diagnostics"]
              },
              {
                title: "Fertility Treatments",
                procedures: ["In Vitro Fertilization (IVF)", "Intracytoplasmic Sperm Injection (ICSI)", "Egg and sperm donation", "Surrogacy arrangements", "Fertility preservation"]
              },
              {
                title: "Dental Care",
                procedures: ["Dental implants", "Veneers", "Full mouth reconstruction", "Orthodontics", "Root canal treatments", "Cosmetic dentistry"]
              },
              {
                title: "Oncology",
                procedures: ["Cancer surgeries", "Chemotherapy", "Radiation therapy", "Immunotherapy", "Stem cell transplants", "Precision medicine treatments"]
              },
              {
                title: "Bariatric Surgery",
                procedures: ["Gastric bypass", "Gastric sleeve", "Adjustable gastric banding", "Duodenal switch", "Non-surgical weight loss treatments"]
              },
              {
                title: "Neurology and Neurosurgery",
                procedures: ["Brain tumor removals", "Spine surgeries", "Deep brain stimulation", "Epilepsy treatments", "Stroke rehabilitation"]
              },
              {
                title: "Wellness and Rehabilitation",
                procedures: ["Physical therapy", "Ayurvedic treatments", "Detox programs", "Holistic wellness therapies", "Stress management retreats", "Anti-aging treatments"]
              },
            ].map((specialty, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{specialty.title}</h3>
                <ul className="list-disc pl-5">
                  {specialty.procedures.map((procedure, idx) => (
                    <li key={idx}>{procedure}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Medical Tourism Destinations</h2>
          <p className="text-lg mb-6">
            We offer medical tourism services in some of the world's top healthcare destinations, each known for their specialties and high-quality care:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                country: "Thailand",
                specialties: ["Cosmetic surgery", "Gender reassignment procedures", "Dental care", "Wellness retreats"],
                description: "Known for its world-class hospitals, skilled surgeons, and affordable prices, Thailand offers a perfect blend of quality healthcare and tropical recovery environments."
              },
              {
                country: "India",
                specialties: ["Cardiac care", "Orthopedic treatments", "Fertility services", "Ayurvedic medicine"],
                description: "India is a leader in complex cardiac procedures and orthopedic treatments, offering cutting-edge technology at a fraction of Western prices."
              },
              {
                country: "Turkey",
                specialties: ["Hair transplants", "Dental treatments", "Eye surgeries", "Plastic surgery"],
                description: "Turkey has become a hub for aesthetic procedures, particularly hair transplants and dental work, with state-of-the-art clinics in Istanbul and other major cities."
              },
              {
                country: "Mexico",
                specialties: ["Bariatric surgery", "Dental care", "Cosmetic procedures"],
                description: "Popular among North American patients, Mexico offers high-quality, affordable treatments, especially in dental care and weight loss surgeries."
              },
              {
                country: "Costa Rica",
                specialties: ["Dental implants", "Cosmetic surgery", "Orthopedics"],
                description: "Costa Rica combines excellent medical care with eco-tourism, allowing patients to recover in beautiful, natural settings."
              },
              {
                country: "Hungary",
                specialties: ["Dental care", "Thermal spa treatments", "Orthopedic procedures"],
                description: "Hungary, especially Budapest, is famous for its dental tourism, offering top-quality treatments at significantly lower prices than other European countries."
              },
            ].map((destination, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{destination.country}</h3>
                <p className="mb-2"><strong>Specialties:</strong> {destination.specialties.join(", ")}</p>
                <p>{destination.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Patient Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Eunice Ebuala",
                procedure: "Breast Augmentation in Thailand",
                testimonial: "Sozo-hal made my entire medical tourism journey smooth and stress-free. From coordinating my surgery in Thailand to arranging my accommodation, everything was perfectly handled. The staff was incredibly supportive, and the results of my procedure exceeded my expectations. I felt safe and cared for throughout the entire process."
              },
              {
                name: "Rice Strandford",
                procedure: "Full Mouth Reconstruction in Mexico",
                testimonial: "Thanks to the Sozo-hal team, I received top-quality dental care in Mexico and saved thousands. I felt supported every step of the way, from the initial consultation to the final follow-up. The clinic they recommended was state-of-the-art, and the dentists were highly skilled. I now have the smile I've always dreamed of, and the experience was actually enjoyable!"
              },
              {
                name: "Amelia Thompson",
                procedure: "Knee Replacement in India",
                testimonial: "I was hesitant about traveling abroad for my knee replacement, but Sozo-hal put all my fears to rest. The hospital in India was world-class, and the surgeons were exceptional. The cost savings were significant, and I received personalized care that I doubt I would have gotten at home. The recovery period in a beautiful resort was an added bonus!"
              },
              {
                name: "Mohammed Al-Fayed",
                procedure: "Hair Transplant in Turkey",
                testimonial: "My experience with Sozo-hal for my hair transplant in Turkey was nothing short of amazing. The clinic they recommended was cutting-edge, and the results are fantastic. The entire process, from travel arrangements to post-procedure care, was seamless. I highly recommend their services to anyone considering medical tourism."
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <p className="mb-4 italic">"{testimonial.testimonial}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.procedure}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Medical Tourism Journey?</h2>
          <p className="mb-6">Contact Sozo-hal today for a free consultation and take the first step towards affordable, high-quality healthcare abroad.</p>
          <button
            onClick={handleContactClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalTourism;