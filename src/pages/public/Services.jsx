import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../routes/path';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard
          title="Medical Devices and Equipment"
          description="Browse and purchase high-quality medical devices and equipment for your healthcare needs."
          link={PATH.general.medicalDevices}
        />
        <ServiceCard
          title="Medical Tourism"
          description="Explore healthcare services and treatments available in different locations around the world."
          link={PATH.general.medicalTourism}
        />
        <ServiceCard
          title="Laboratory Refferal Services"
          description="Access a network of trusted laboratories for various medical tests and diagnostics."
          link={PATH.general.laboratoryServices}
        />
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, link }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={link} className="text-primary-6 hover:text-primary-7 font-medium">
      Learn More
    </Link>
  </div>
);

export default Services;
