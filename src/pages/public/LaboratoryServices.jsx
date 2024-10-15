import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFlask, FaDna, FaVial, FaMicroscope, FaHeartbeat, FaBrain, FaAllergies, FaVirus, FaUserMd, FaClock, FaCheckCircle, FaHospital, FaLaptopMedical, FaClipboardList, FaHandHoldingMedical } from 'react-icons/fa';
import { PATH } from '../../routes/path';
import { labServicesHero } from '../../assets';
import { motion, AnimatePresence } from 'framer-motion';

const LaboratoryServices = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState(null);
  const [expandedBenefit, setExpandedBenefit] = useState(null);

  const handleContactClick = () => {
    navigate(PATH.general.contact);
  };

  const labServices = [
    {
      icon: <FaFlask />,
      title: "Routine Diagnostic Tests",
      description: "Comprehensive range of common medical tests.",
      tests: ["Complete Blood Count (CBC)", "Blood Chemistry Panels", "Urinalysis", "Microbiology Testing"]
    },
    {
      icon: <FaDna />,
      title: "Specialized Testing",
      description: "Advanced diagnostic tests for specific clinical needs.",
      tests: ["Molecular Diagnostics", "Histopathology & Cytology", "Immunology & Allergy Testing", "Endocrinology"]
    },
    {
      icon: <FaHeartbeat />,
      title: "Preventive Health Screening",
      description: "Proactive health management and early risk identification.",
      tests: ["Cardiovascular Risk Profiles", "Diabetes Screening", "Cancer Markers", "Men's and Women's Health Panels"]
    },
    {
      icon: <FaVirus />,
      title: "COVID-19 Testing",
      description: "Fast and reliable testing for SARS-CoV-2.",
      tests: ["PCR Tests", "Rapid Antigen Tests", "Antibody Testing"]
    }
  ];

  const benefits = [
    { icon: <FaMicroscope />, title: "Advanced Technology", description: "State-of-the-art diagnostic tools ensuring precise and fast results. We use automated systems to minimize errors and enhance efficiency." },
    { icon: <FaUserMd />, title: "Highly Qualified Team", description: "Our team comprises board-certified pathologists, experienced technicians, and customer service professionals. Their expertise ensures that every sample is handled with the utmost care and accuracy." },
    { icon: <FaCheckCircle />, title: "Quality Assurance", description: "We adhere to the highest standards of quality control in every aspect of our work. Our lab is accredited by national regulatory bodies, and we follow strict protocols to ensure accuracy and reliability." },
    { icon: <FaClock />, title: "Fast Turnaround Times", description: "We understand the importance of timely results. Our streamlined processes ensure quick turnaround times without compromising the quality of the tests." },
    { icon: <FaHospital />, title: "Patient-Centered Care", description: "At Sozo-hal, we prioritize patient comfort and privacy. Our collection centers are designed for efficiency and convenience, and our staff is trained to provide compassionate care during sample collection." }
  ];

  return (
    <div className="laboratory-services">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={labServicesHero} alt="Laboratory Services Hero" className='absolute h-full w-full object-cover' />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Sozo-hal Laboratory Services</h1>
          <p className="text-2xl mb-8">Excellence in Diagnostic Services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Laboratory Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">About Sozo-hal Laboratory Services</h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform skew-y-3"></div>
            <div className="relative bg-white p-8 shadow-lg">
              <p className="text-lg">
                At Sozo-hal laboratory services, we are dedicated to providing high-quality, reliable, and efficient medical diagnostic services to healthcare providers, patients, and the broader community. With state-of-the-art technology and highly trained professionals, we offer a comprehensive range of laboratory tests and analyses to support accurate diagnosis, treatment, and prevention of diseases.
              </p>
              <p className="text-lg mt-4">
                Sozo-hal is a fully accredited and certified medical laboratory, committed to delivering the highest standards of diagnostic testing. Our team of pathologists, lab technicians, and support staff work together to ensure that every test is conducted with precision and accuracy. We serve hospitals, clinics, doctors, and individuals, providing fast and dependable results.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {labServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExpandedService(expandedService === index ? null : index)}
              >
                <div className="text-4xl mb-4 text-blue-500">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {expandedService === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mt-2">
                      {service.tests.map((test, i) => (
                        <li key={i}>{test}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                <button
                  className="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedService(expandedService === index ? null : index);
                  }}
                >
                  {expandedService === index ? 'Read Less' : 'Read More'}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Sozo-hal?</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={false}
              >
                <motion.header
                  className="bg-gray-100 px-4 py-2 flex items-center cursor-pointer"
                  onClick={() => setExpandedBenefit(expandedBenefit === index ? null : index)}
                >
                  <div className="text-2xl mr-4 text-blue-500">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold flex-grow">{benefit.title}</h3>
                  <motion.div
                    initial={false}
                    animate={{ rotate: expandedBenefit === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.div>
                </motion.header>
                <AnimatePresence initial={false}>
                  {expandedBenefit === index && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-4 py-2">
                        <p className="text-gray-700">{benefit.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* For Healthcare Providers */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">For Healthcare Providers</h2>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <p className="mb-4">We partner with healthcare providers to deliver reliable diagnostic support for better patient care. Our laboratory offers:</p>
            <ul className="list-none space-y-4">
              <li className="flex items-start">
                <FaLaptopMedical className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Online Test Ordering and Reporting System</h3>
                  <p>Physicians can order tests and receive results electronically through a secure online portal.</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaClipboardList className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Custom Test Panels</h3>
                  <p>We can create customized test panels based on your clinic or hospital's specific needs.</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaUserMd className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Consultation Services</h3>
                  <p>Our pathologists are available to consult on complex cases and test results.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* For Patients */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">For Patients</h2>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <p className="mb-4">At Sozo-hal, we strive to make the testing process as easy and stress-free as possible. Our services include:</p>
            <ul className="list-none space-y-4">
              <li className="flex items-start">
                <FaHandHoldingMedical className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Convenient Sample Collection</h3>
                  <p>Visit one of our many collection centers or arrange for home sample collection.</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Accurate and Confidential Results</h3>
                  <p>You can trust us to provide accurate results, delivered securely and confidentially to you or your healthcare provider.</p>
                </div>
              </li>
              <li className="flex items-start">
                <FaHeartbeat className="text-blue-500 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold">Health Monitoring</h3>
                  <p>Use our preventive health screenings to keep track of your health status and catch potential issues early.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Process */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Process</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex-1">
              <FaVial className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sample Collection</h3>
              <p>We collect samples at our laboratory collection centers or via home collection services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex-1">
              <FaMicroscope className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sample Analysis</h3>
              <p>Our highly trained lab technicians and state-of-the-art equipment ensure precise analysis.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center flex-1">
              <FaLaptopMedical className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Results Delivery</h3>
              <p>Results are made available through our secure online portal, or sent directly to your healthcare provider.</p>
            </div>
          </div>
        </section>

        {/* Accreditation and Certifications */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Accreditation and Certifications</h2>
          <div className="bg-white p-8 shadow-lg rounded-lg text-center">
            <p className="mb-4">Sozo-hal is proud to be fully accredited by:</p>
            <ul className="list-none space-y-2">
              <li>[Relevant National Accrediting Body]</li>
              <li>ISO Certification (if applicable)</li>
              <li>Local Health Authorities</li>
            </ul>
            <p className="mt-4">Our accreditation demonstrates our commitment to quality and patient safety.</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 rounded-lg shadow-xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Laboratory Testing Services?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We are here to answer any questions and assist with your diagnostic needs. Whether you are a healthcare provider or a patient, feel free to get in touch with us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleContactClick}
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-100 transition duration-300 transform hover:scale-105"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LaboratoryServices;