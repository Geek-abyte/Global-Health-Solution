import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaRunning, FaStethoscope, FaWheelchair, FaHome, FaShieldVirus, FaUserMd, FaTruck, FaLock, FaHeadset } from 'react-icons/fa';
import { PATH } from '../../routes/path';
import { medicalDevicesHero } from '../../assets';
import { motion, AnimatePresence } from 'framer-motion';

const MedicalDevices = () => {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleContactClick = () => {
    navigate(PATH.general.contact);
  };

  const deviceCategories = [
    {
      icon: <FaRunning />,
      title: "Fitness and Wellness Devices",
      description: "Stay on top of your fitness goals with our range of smart wearables and fitness trackers.",
      devices: ["Fitness Trackers", "Smart Watches", "Heart Rate Monitors", "Activity Trackers"]
    },
    {
      icon: <FaStethoscope />,
      title: "Diagnostic and Monitoring Devices",
      description: "Keep a close eye on your health with our advanced diagnostic tools.",
      devices: ["Blood Pressure Monitors", "Glucose Meters", "Pulse Oximeters", "Thermometers", "Body Composition Analyzers"]
    },
    {
      icon: <FaWheelchair />,
      title: "Mobility and Rehabilitation",
      description: "Enhance mobility and rehabilitation with our range of products.",
      devices: ["Walkers", "Canes", "Wheelchairs", "Ergonomic Supports", "Physical Therapy Tools"]
    },
    {
      icon: <FaHome />,
      title: "Home Medical Devices",
      description: "Equip your home with medical-grade devices for easy monitoring and care.",
      devices: ["Nebulizers", "CPAP Machines", "TENS Machines", "Infrared Thermometers"]
    },
    {
      icon: <FaShieldVirus />,
      title: "Personal Care and Hygiene",
      description: "Stay healthy and protected with our range of personal care and hygiene products.",
      devices: ["UV-C Sanitizers", "Air Purifiers", "Massagers"]
    }
  ];

  const benefits = [
    { icon: <FaHeartbeat />, title: "Wide Range of Health Devices", description: "We provide a broad selection of health devices across multiple categories to meet various health needs." },
    { icon: <FaUserMd />, title: "Quality Assurance", description: "We only stock products from reputable brands known for their accuracy, reliability, and compliance with international safety standards." },
    { icon: <FaTruck />, title: "Fast and Reliable Shipping", description: "We ensure prompt delivery so you can start using your health devices as soon as possible." },
    { icon: <FaLock />, title: "Secure Shopping Experience", description: "Our platform is protected by the latest encryption technology, ensuring that your personal and payment information remains secure at all times." },
    { icon: <FaHeadset />, title: "Expert Customer Support", description: "We provide comprehensive customer support to answer your questions and guide you in choosing the right products." }
  ];

  return (
    <div className="medical-devices">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={medicalDevicesHero} alt="Medical Devices Hero" className='absolute h-full w-full object-cover' />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Sozo-hal Medical Devices</h1>
          <p className="text-2xl mb-8">Your Trusted Source for Health and Wellness Devices</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Medical Devices */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">About Sozo-hal Medical Devices</h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform skew-y-3"></div>
            <div className="relative bg-white p-8 shadow-lg">
              <p className="text-lg">
                At Sozo-hal, we specialize in providing innovative, high-quality health and wellness devices designed to improve your well-being and help you manage your health with ease. From fitness trackers and smart health monitors to medical-grade equipment, we are committed to offering products that meet the diverse needs of individuals, healthcare professionals, and organizations alike.
              </p>
              <p className="text-lg mt-4">
                Our platform is dedicated to delivering reliable, medically-approved devices and wellness tools to consumers and healthcare providers. We carefully curate products from top global manufacturers and emerging innovators to ensure that our customers have access to the latest advancements in health technology.
              </p>
            </div>
          </div>
        </section>

        {/* Device Categories */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Product Categories</h2>
          <div className="space-y-4">
            {deviceCategories.map((category, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={false}
              >
                <motion.header
                  className="bg-gray-100 px-4 py-2 flex items-center cursor-pointer"
                  onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                >
                  <div className="text-2xl mr-4 text-blue-500">{category.icon}</div>
                  <h3 className="text-xl font-semibold flex-grow">{category.title}</h3>
                  <motion.div
                    initial={false}
                    animate={{ rotate: expandedCategory === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.div>
                </motion.header>
                <AnimatePresence initial={false}>
                  {expandedCategory === index && (
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
                        <p className="mb-2">{category.description}</p>
                        <h4 className="font-semibold mt-2 mb-1">Key Devices:</h4>
                        <ul className="list-disc list-inside">
                          {category.devices.map((device, i) => (
                            <li key={i}>{device}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Sozo-hal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-4 text-blue-500">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For Healthcare Providers */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">For Healthcare Providers and Organizations</h2>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <p className="mb-4">Are you a healthcare provider or organization looking to purchase health devices and equipment in bulk? We offer exclusive solutions for clinics, hospitals, and care facilities, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bulk Discounts</li>
              <li>Dedicated Account Management</li>
              <li>Customizable Product Bundles</li>
              <li>After-Sales Support and Training</li>
            </ul>
            <p className="mt-4">Contact our corporate sales team on our website to discuss your needs and tailor solutions for your organization.</p>
          </div>
        </section>

        {/* How to Shop */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">How to Shop</h2>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <h3 className="font-semibold">Browse and Select</h3>
                <p>Explore our wide range of health devices and equipment by navigating our intuitive website or mobile app.</p>
              </li>
              <li>
                <h3 className="font-semibold">Add to Cart</h3>
                <p>Once you find the products you want, simply add them to your cart.</p>
              </li>
              <li>
                <h3 className="font-semibold">Secure Payment</h3>
                <p>At checkout, select from a variety of secure payment methods. Our platform is SSL-encrypted, ensuring that your transaction details are safe.</p>
              </li>
              <li>
                <h3 className="font-semibold">Fast Shipping</h3>
                <p>Select your preferred shipping method during checkout. We offer express shipping, standard delivery, and in some locations, same-day delivery.</p>
              </li>
              <li>
                <h3 className="font-semibold">Customer Support</h3>
                <p>If you need assistance with any product setup or have any post-purchase questions, our dedicated customer service team is always available to help you.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 rounded-lg shadow-xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Invest in Your Health?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team of experts is here to help you find the perfect health devices for your needs. Let us guide you through our extensive catalog and find the best solutions for your well-being.
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

export default MedicalDevices;