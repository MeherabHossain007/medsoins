"use client";
import { useState } from "react";
import Banner from "@/components/layout/Banner";
import {
  FaSearch,
  FaUser,
  FaUserMd,
  FaHospital,
  FaFileAlt,
  FaAmbulance,
  FaPlus,
  FaMinus,
  FaLightbulb,
} from "react-icons/fa";

const categories = [
  { icon: <FaUser />, label: "Patients" },
  { icon: <FaUserMd />, label: "Professionnels de santé" },
  { icon: <FaHospital />, label: "Nos centres" },
  { icon: <FaFileAlt />, label: "Administratif" },
  { icon: <FaAmbulance />, label: "Urgences" },
];

const faqData = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis commodo ligula eget dolor.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis commodo ligula eget dolor.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis commodo ligula eget dolor.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-18 lg:pt-28">
      <Banner />
      <div className="container mx-auto px-5 py-10 lg:py-20">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold font-montserrat">
          Questions Fréquent
        </h1>

        {/* Search Section */}
        <div className="mt-5 mb-8">
          <div className="flex items-start gap-2">
            <FaLightbulb className="text-yellow-500 mt-1" size={40}/>
            <p className="text-[#757575] text-lg lg:text-3xl font-light lg:max-w-[55ch]">
              Vous avez une question ? Trouvez ici les réponses les plus
              courantes à propos de nos services
            </p>
          </div>
          <div className="relative mt-4">
            <input
              type="search"
              placeholder="Rechercher une question..."
              className="w-full p-5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-x-2 gap-y-4 my-8 justify-between">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-full hover:bg-blue-100 hover:text-blue-500 transition duration-300"
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mt-10 max-w-5xl mx-auto">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-white border-b-2 border-gray-200"
            >
              <button
                className="w-full flex justify-between items-center cursor-pointer focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <h2 className="text-lg font-medium">{faq.question}</h2>
                {openIndex === index ? (
                  <FaMinus className="text-black" />
                ) : (
                  <FaPlus className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
