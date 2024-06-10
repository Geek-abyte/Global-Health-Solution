import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10 lg:p-12 w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-primary-7 mb-6 text-center">Privacy Policy</h1>
        <p className="text-lg text-gray-6 mb-6">
          Your privacy is important to us. This privacy policy explains what personal data our web service collects from you and how we use it.
        </p>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">Information We Collect</h2>
        <p className="text-base text-gray-6 mb-4">
          We collect information to provide better services to our users. This includes:
        </p>
        <ul className="list-disc list-inside mb-6 text-base text-gray-6 pl-4">
          <li className="mb-2">Personal identification information (Name, email address, phone number, etc.)</li>
          <li className="mb-2">Health-related information provided by you during consultations.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">How We Use Your Information</h2>
        <p className="text-base text-gray-6 mb-4">
          We use the information we collect in the following ways:
        </p>
        <ul className="list-disc list-inside mb-6 text-base text-gray-6 pl-4">
          <li className="mb-2">To provide you with health advice and consultations.</li>
          <li className="mb-2">To improve our services and develop new ones.</li>
          <li className="mb-2">To communicate with you, including sending updates and notifications.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">Sharing Your Information</h2>
        <p className="text-base text-gray-6 mb-4">
          We do not share your personal information with companies, organizations, or individuals outside of our service except in the following cases:
        </p>
        <ul className="list-disc list-inside mb-6 text-base text-gray-6 pl-4">
          <li className="mb-2">With your consent.</li>
          <li className="mb-2">For legal reasons.</li>
          <li className="mb-2">With service providers and partners who process data on our behalf.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">Your Data Protection Rights</h2>
        <p className="text-base text-gray-6 mb-6">
          You have the right to request access to your personal data, correct any inaccuracies, and request the deletion of your data. If you would like to exercise any of these rights, please contact us.
        </p>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">Changes to This Privacy Policy</h2>
        <p className="text-base text-gray-6 mb-6">
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
        </p>
        <p className="text-base text-gray-6 mb-6">
          If you have any questions about this privacy policy, please contact us at [Your Contact Information].
        </p>
        <p className="text-base text-gray-6">Effective Date: [Date]</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
