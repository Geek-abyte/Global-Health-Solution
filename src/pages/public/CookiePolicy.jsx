import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10 lg:p-12 w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-primary-7 mb-6 text-center">Cookie Policy</h1>
        <p className="text-lg text-gray-6 mb-6">
          Our web service uses cookies to improve your experience. This cookie policy explains what cookies are, how we use them, and your choices regarding cookies.
        </p>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">What Are Cookies?</h2>
        <p className="text-base text-gray-6 mb-4">
          Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third party to recognize you and make your next visit easier and the website more useful to you.
        </p>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">How We Use Cookies</h2>
        <p className="text-base text-gray-6 mb-4">
          When you use and access our web service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-6 text-base text-gray-6 pl-4">
          <li className="mb-2">To enable certain functions of the web service.</li>
          <li className="mb-2">To provide analytics.</li>
          <li className="mb-2">To store your preferences.</li>
          <li className="mb-2">To enable advertisements delivery, including behavioral advertising.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">Types of Cookies We Use</h2>
        <p className="text-base text-gray-6 mb-4">
          We use both session and persistent cookies on our web service, and we use different types of cookies to run the web service:
        </p>
        <ul className="list-disc list-inside mb-6 text-base text-gray-6 pl-4">
          <li className="mb-2"><strong>Essential cookies:</strong> These cookies are essential for providing you with services available through our web service and to enable you to use some of its features.</li>
          <li className="mb-2"><strong>Analytics cookies:</strong> These cookies collect information about your use of the web service and help us improve the service.</li>
          <li className="mb-2"><strong>Advertising cookies:</strong> These cookies are used to serve you with advertisements that may be relevant to you and your interests.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">Your Choices Regarding Cookies</h2>
        <p className="text-base text-gray-6 mb-4">
          If you would like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
        </p>
        <h2 className="text-2xl font-semibold text-primary-6 mb-4">More Information About Cookies</h2>
        <p className="text-base text-gray-6 mb-6">
          You can learn more about cookies and the following third-party websites:
        </p>
        <ul className="list-disc list-inside mb-6 text-base text-gray-6 pl-4">
          <li className="mb-2"><a href="https://www.allaboutcookies.org/" className="text-primary-6 underline">AllAboutCookies: www.allaboutcookies.org</a></li>
          <li className="mb-2"><a href="https://www.networkadvertising.org/" className="text-primary-6 underline">Network Advertising Initiative: www.networkadvertising.org</a></li>
        </ul>
        <p className="text-base text-gray-6 mb-6">
          If you have any questions about our use of cookies or other technologies, please email us at [Your Contact Information].
        </p>
        <p className="text-base text-gray-6">Effective Date: [Date]</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
