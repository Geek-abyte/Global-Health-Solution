import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFlask, FaDna, FaHeartbeat, FaVirus, FaHandHoldingMedical, FaCheckCircle, FaMicroscope, FaUserMd, FaClock, FaHospital } from 'react-icons/fa';
import { PATH } from '../../routes/path';
import { labServicesHero } from '../../assets';
import { motion } from 'framer-motion';

const LaboratoryServices = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate(PATH.general.contact);
  };

  return (
    <div className="laboratory-services">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={labServicesHero} alt="Laboratory Services Hero" className='absolute h-full w-full object-cover' />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Sozo-hal Laboratory Referral Services</h1>
          <p className="text-2xl mb-8">Excellence in Diagnostic Services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Our Service */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">About Our Service</h2>
          <div className=" mx-auto">
            <p className="text-lg mb-4">
              At Sozo-hal Services, we are dedicated to ensuring that high-quality, reliable, and efficient medical diagnosis and diagnostic services are delivered by our informed AI, consultant and through our trusted network of partners. By collaborating with industry-leading laboratories equipped with state-of-the-art technology, we promise a comprehensive range of diagnostic tests and analyses, supporting accurate diagnoses, treatment plans, and disease prevention for healthcare providers, patients, and communities.
            </p>
            <p className="text-lg mb-4">
              Sozo-hal laboratory service serves as a vital link between our client and our accredited and certified partner laboratories. Our partners are top-tier facilities staffed by expert pathologists, lab technicians, and professionals committed to the highest standards of precision and accuracy in every test. We coordinate services for individuals, ensuring fast and dependable diagnostic results.
            </p>
            <p className="text-lg">
              Through close collaboration, we help our partners stay at the cutting edge of medical science. They continuously update their technologies and procedures, maintaining compliance with national and international standards through rigorous quality control measures.
            </p>
          </div>
        </section>

        {/* Our Partners' Services */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Partners' Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Routine Diagnostic Tests</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Complete Blood Count (CBC):</strong> Detects infections, anemia, and blood-related conditions.</li>
                <li><strong>Blood Chemistry Panels:</strong> Monitors liver and kidney function, electrolyte balance, and lipid profiles.</li>
                <li><strong>Urinalysis:</strong> Identifies infections, kidney issues, and metabolic conditions.</li>
                <li><strong>Microbiology Testing:</strong> Detects bacterial, fungal, and viral infections.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Specialized Testing</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Molecular Diagnostics:</strong> DNA-based tests for genetic disorders, infectious diseases, and cancer markers.</li>
                <li><strong>Histopathology & Cytology:</strong> Tissue analysis for cancer detection and other conditions.</li>
                <li><strong>Immunology & Allergy Testing:</strong> Evaluates immune system function and identifies allergens.</li>
                <li><strong>Endocrinology:</strong> Assesses hormone levels for thyroid, adrenal, and reproductive health.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Preventive Health Screening</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cardiovascular Risk Profiles</li>
                <li>Diabetes Screening</li>
                <li>Cancer Markers</li>
                <li>Men's and Women's Health Panels</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">COVID-19 Testing</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>PCR Tests</li>
                <li>Rapid Antigen Tests</li>
                <li>Antibody Testing</li>
              </ul>
              <p className="mt-4">These services are available for individuals, healthcare providers, and corporate clients.</p>
            </div>
          </div>
        </section>

        {/* Why We Choose Our Partners */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Why We Choose Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
            <div className="flex items-start space-x-4">
              <FaMicroscope className="text-4xl text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
                <p>Our partner laboratories are equipped with cutting-edge diagnostic tools to deliver precise and timely results, using automated systems to minimize errors and improve efficiency.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaUserMd className="text-4xl text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Highly Qualified Team</h3>
                <p>The expert pathologists and technicians at our partner facilities are certified and highly trained, ensuring that each sample is handled with meticulous care for accurate results.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-4xl text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p>We ensure that our partner labs follow stringent quality control procedures and comply with national and international regulatory standards, guaranteeing reliable and precise diagnostic services.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaClock className="text-4xl text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Turnaround Times</h3>
                <p>Our partners have streamlined processes to deliver high-quality results quickly, ensuring healthcare providers and patients receive the information they need without delay.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaHospital className="text-4xl text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Patient-Centered Care</h3>
                <p>We coordinate with partner labs that prioritize patient comfort and convenience, offering services at accessible collection centers or through home sample collection.</p>
              </div>
            </div>
          </div>
        </section>

        {/* For Our Patients */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">For Our Patients</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8  mx-auto">
            <div className="text-center">
              <FaHandHoldingMedical className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Convenient Sample Collection</h3>
              <p>Arranging home collection at a cost or book an appointment that suits our client's schedule.</p>
            </div>
            <div className="text-center">
              <FaCheckCircle className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accurate and Confidential Results</h3>
              <p>Secure delivery of results, directly to Sozo-hal for upward review.</p>
            </div>
            <div className="text-center">
              <FaHeartbeat className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Health Monitoring</h3>
              <p>Access preventive screening services to monitor and maintain your health.</p>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Process</h2>
          <ol className="list-decimal pl-6 space-y-4  mx-auto">
            <li>
              <strong>Sample Collection:</strong> Samples are collected at designated centers or through home collection services provided by our partners.
            </li>
            <li>
              <strong>Sample Analysis:</strong> Expert technicians at partner labs conduct thorough analyses using advanced equipment.
            </li>
            <li>
              <strong>Results Delivery:</strong> Results are delivered securely online.
            </li>
          </ol>
        </section>

        {/* Accreditation and Certifications */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Accreditation and Certifications</h2>
          <p className="text-center  mx-auto">
            Sozo-hal's partner laboratories are accredited by recognized bodies, ensuring compliance with national and international diagnostic standards.
          </p>
        </section>

        {/* Call to Action */}
        <section className="mb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Need Laboratory Testing Services?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              By leveraging our network of leading laboratories, Sozo-hal ensures you receive high-quality, timely, and reliable diagnostic solutions for optimal health outcomes.
            </p>
            <button
              onClick={handleContactClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-100 transition duration-300 transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LaboratoryServices;
