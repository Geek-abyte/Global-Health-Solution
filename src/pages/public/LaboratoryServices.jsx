import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFlask, FaDna, FaHeartbeat, FaVirus, FaHandHoldingMedical, FaCheckCircle, FaMicroscope, FaUserMd, FaClock, FaHospital, FaArrowRight } from 'react-icons/fa';
import { PATH } from '../../routes/path';
import { labServicesHero } from '../../assets';
import { motion } from 'framer-motion';

const LaboratoryServices = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate(PATH.general.contact);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="laboratory-services bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={labServicesHero} alt="Laboratory Services Hero" className='absolute h-full w-full object-cover' />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          className="relative z-10 text-center text-white"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-6xl font-bold mb-4">Sozo-hal Laboratory Referral Services</h1>
          <p className="text-2xl mb-8">Excellence in Diagnostic Services</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Our Service */}
        <motion.section
          className="mb-20 bg-white rounded-lg shadow-lg p-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">About This Service</h2>
          <div className="mx-auto space-y-4">
            <p className="text-lg">
              At Sozo-hal Services, we are dedicated to ensuring that high-quality, reliable, and efficient medical diagnostic services are delivered through our trusted network of partners. By collaborating with industry-leading laboratories equipped with state-of-the-art technology, we promise a comprehensive range of diagnostic tests and analyses, supporting accurate diagnoses, treatment plans, and disease prevention for healthcare providers, patients, and communities.
            </p>
            <p className="text-lg">
              Sozo-hal laboratory service serves as a vital link between our client and our accredited and certified partner laboratories. Our partners are top-tier facilities staffed by expert pathologists, lab technicians, and professionals committed to the highest standards of precision and accuracy in every test. We coordinate services for individuals, ensuring fast and dependable diagnostic results.
            </p>
            <p className="text-lg">
              Through close collaboration, we help our partners stay at the cutting edge of medical science. They continuously update their technologies and procedures, maintaining compliance with national and international standards through rigorous quality control measures.
            </p>
          </div>
        </motion.section>

        {/* Our Partners' Services */}
        <motion.section
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Our Partners' Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {[
              {
                title: "Routine Diagnostic Tests", icon: FaFlask, items: [
                  "Complete Blood Count (CBC): Detects infections, anemia, and blood-related conditions.",
                  "Blood Chemistry Panels: Monitors liver and kidney function, electrolyte balance, and lipid profiles.",
                  "Urinalysis: Identifies infections, kidney issues, and metabolic conditions.",
                  "Microbiology Testing: Detects bacterial, fungal, and viral infections."
                ]
              },
              {
                title: "Specialized Testing", icon: FaDna, items: [
                  "Molecular Diagnostics: DNA-based tests for genetic disorders, infectious diseases, and cancer markers.",
                  "Histopathology & Cytology: Tissue analysis for cancer detection and other conditions.",
                  "Immunology & Allergy Testing: Evaluates immune system function and identifies allergens.",
                  "Endocrinology: Assesses hormone levels for thyroid, adrenal, and reproductive health."
                ]
              },
              {
                title: "Preventive Health Screening", icon: FaHeartbeat, items: [
                  "Cardiovascular Risk Profiles",
                  "Diabetes Screening",
                  "Cancer Markers",
                  "Men's and Women's Health Panels"
                ]
              },
              {
                title: "COVID-19 Testing", icon: FaVirus, items: [
                  "PCR Tests",
                  "Rapid Antigen Tests",
                  "Antibody Testing"
                ]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <service.icon className="text-5xl text-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg">These services are available for individuals, healthcare providers, and corporate clients.</p>
        </motion.section>

        {/* Why We Choose Our Partners */}
        <motion.section
          className="mb-20 bg-blue-50 rounded-lg p-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Why We Choose Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            {[
              { icon: FaMicroscope, title: "Advanced Technology", description: "Our partner laboratories are equipped with cutting-edge diagnostic tools to deliver precise and timely results, using automated systems to minimize errors and improve efficiency." },
              { icon: FaUserMd, title: "Highly Qualified Team", description: "The expert pathologists and technicians at our partner facilities are certified and highly trained, ensuring that each sample is handled with meticulous care for accurate results." },
              { icon: FaCheckCircle, title: "Quality Assurance", description: "We ensure that our partner labs follow stringent quality control procedures and comply with national and international regulatory standards, guaranteeing reliable and precise diagnostic services." },
              { icon: FaClock, title: "Fast Turnaround Times", description: "Our partners have streamlined processes to deliver high-quality results quickly, ensuring healthcare providers and patients receive the information they need without delay." },
              { icon: FaHospital, title: "Patient-Centered Care", description: "We coordinate with partner labs that prioritize patient comfort and convenience, offering services at accessible collection centers or through home sample collection." }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <item.icon className="text-5xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* For Our Patients */}
        <motion.section
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">For Our Patients</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8 mx-auto">
            {[
              { icon: FaHandHoldingMedical, title: "Convenient Sample Collection", description: "Arranging home collection at a cost or book an appointment that suits our client's schedule." },
              { icon: FaCheckCircle, title: "Accurate and Confidential Results", description: "Secure delivery of results, directly to Sozo-hal for upward review." },
              { icon: FaHeartbeat, title: "Health Monitoring", description: "Access preventive screening services to monitor and maintain your health." }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex-1">
                <item.icon className="text-5xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Our Process */}
        <motion.section
          className="mb-20 bg-white rounded-lg shadow-lg p-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Our Process</h2>
          <ol className="space-y-4 mx-auto">
            {[
              { title: "Sample Collection", description: "Samples are collected at designated centers or through home collection services provided by our partners." },
              { title: "Sample Analysis", description: "Expert technicians at partner labs conduct thorough analyses using advanced equipment." },
              { title: "Results Delivery", description: "Results are delivered securely online." }
            ].map((step, index) => (
              <li key={index} className="flex items-center space-x-4 bg-blue-50 rounded-lg p-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">{index + 1}</div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Accreditation and Certifications */}
        <motion.section
          className="mb-20 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Accreditation and Certifications</h2>
          <p className="text-lg mx-auto max-w-2xl">
            Sozo-hal's partner laboratories are accredited by recognized bodies, ensuring compliance with national and international diagnostic standards.
          </p>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 rounded-lg"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Laboratory Testing Services?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              By leveraging our network of leading laboratories, Sozo-hal ensures you receive high-quality, timely, and reliable diagnostic solutions for optimal health outcomes.
            </p>
            <button
              onClick={handleContactClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-100 transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              Contact Us <FaArrowRight className="ml-2" />
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default LaboratoryServices;
