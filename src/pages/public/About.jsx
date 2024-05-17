import React from 'react';
import { bridge, group, stethoscope } from '../../assets';

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
            The idea of Global Health Solutions (GHS) emerged from a pressing health need that transcends geographical boundaries.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-[500px] overflow-hidden">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src={stethoscope}
              alt="Image 1"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-75 rounded-lg p-8 max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800">Healthcare Access</h2>
                <p className="mt-4 text-gray-600">
                  The challenge of delivering efficient and effective healthcare services is pervasive worldwide, affecting individuals across diverse socio-economic backgrounds.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] overflow-hidden">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src={bridge}
              alt="Image 2"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-75 rounded-lg p-8 max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800">Bridging the Gap</h2>
                <p className="mt-4 text-gray-600">
                  By leveraging technological advancements and global networks, GHS endeavors to bridge the gap in healthcare access, ensuring that individuals, regardless of their geographical location or socio-economic status, can access timely, reliable, and life-saving medical consultations and services.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 max-w-3xl mx-auto text-gray-500">
          <p className="text-lg">
            In societies where healthcare is provided free of charge, timely access to these services remains a significant hurdle. Conversely, in regions where healthcare is monetized, many individuals, particularly from marginalized communities, find themselves unable to afford essential medical care.
          </p>
          <p className="mt-6 text-lg">
            Additionally, even in areas where world-class medical expertise is available, accessing such services can be daunting due to bureaucratic hurdles, lengthy appointment processes, and paperwork, particularly in emergency situations and for those considering medical tourism.
          </p>
          <p className="mt-6 text-lg">
            These disparities in healthcare access not only jeopardize individuals' (rich and poor) health outcomes but also contribute to preventable deaths. Addressing this gap in a timely manner, and ensuring prompt medical consultation and services is crucial for saving lives.
          </p>
          <p className="mt-6 text-lg">
            Through GHS, individuals can overcome geographical barriers, bureaucratic obstacles, and financial constraints to receive the healthcare they urgently need, thus promoting global health equity and improving health outcomes on a worldwide scale. As a Company, GHS offers its clients a broad array of Medical Experts, as well as other supporting team members whose focus is on providing the enabling environment for immediate medical attention needed by these clients.
          </p>
          <p className="mt-8 text-gray-700 font-bold">
            We look forward to a mutually healthy future! Welcome on Board!
          </p>
          <p className="mt-4 text-gray-500 italic">
            Anthony Onwughai, Bsc, MBA<br />
            Managing Director
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;