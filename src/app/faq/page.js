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

// Organized FAQ data by category
const faqDataByCategory = {
  Patients: [
    {
      question: "Comment puis-je prendre rendez-vous avec un médecin?",
      answer:
        "Vous pouvez prendre rendez-vous en ligne via notre site web, par téléphone, ou directement à l'accueil de nos centres.",
    },
    {
      question: "Quels documents dois-je apporter lors de ma visite?",
      answer:
        "Veuillez apporter votre carte d'identité, votre carte vitale, et tout document médical pertinent à votre rendez-vous.",
    },
    {
      question: "Comment puis-je accéder à mon dossier médical?",
      answer:
        "Vous pouvez accéder à votre dossier médical en vous connectant à votre espace patient sur notre site web ou en faisant une demande écrite à notre service administratif.",
    },
  ],
  "Professionnels de santé": [
    {
      question: "Comment rejoindre votre équipe médicale?",
      answer:
        "Pour rejoindre notre équipe, veuillez consulter la section carrières de notre site web et soumettre votre candidature en ligne.",
    },
    {
      question: "Quels sont les avantages pour les professionnels de santé?",
      answer:
        "Nous offrons des horaires flexibles, un environnement de travail moderne, des formations continues et des possibilités d'évolution de carrière.",
    },
  ],
  "Nos centres": [
    {
      question: "Quels sont les horaires d'ouverture de vos centres?",
      answer:
        "Nos centres sont généralement ouverts du lundi au vendredi de 8h à 20h et le samedi de 9h à 17h. Les horaires peuvent varier selon le centre.",
    },
    {
      question: "Où sont situés vos différents centres médicaux?",
      answer:
        "Vous pouvez trouver la liste complète de nos centres et leurs adresses dans la section 'Nos centres' de notre site web.",
    },
  ],
  Administratif: [
    {
      question: "Comment puis-je obtenir un certificat médical?",
      answer:
        "Les certificats médicaux sont délivrés par nos médecins lors de votre consultation. Si vous avez besoin d'une copie, contactez notre service administratif.",
    },
    {
      question: "Comment fonctionne le remboursement des consultations?",
      answer:
        "Nos consultations sont prises en charge par l'Assurance Maladie. Nous pratiquons le tiers payant avec la plupart des mutuelles.",
    },
  ],
  Urgences: [
    {
      question: "Que faire en cas d'urgence médicale?",
      answer:
        "En cas d'urgence vitale, appelez immédiatement le 15 (SAMU) ou le 112. Pour les urgences non vitales pendant nos heures d'ouverture, contactez-nous pour une consultation prioritaire.",
    },
    {
      question: "Proposez-vous un service de téléconsultation d'urgence?",
      answer:
        "Oui, nous proposons un service de téléconsultation pour les situations urgentes mais non vitales. Connectez-vous à notre plateforme en ligne pour accéder à ce service.",
    },
  ],
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Patients");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(null); // Close any open FAQ when changing category
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? Object.values(faqDataByCategory)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqDataByCategory[activeCategory];

  return (
    <div className="pt-18 lg:pt-28 overflow-hidden">
      <Banner />
      <div className="container mx-auto px-20 py-20 lg:py-20 max-w-screen-xl">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold font-montserrat">
          Questions Fréquentes
        </h1>

        {/* Search Section */}
        <div className="mt-5 mb-8">
          <div className="flex items-start gap-2">
            <FaLightbulb className="text-yellow-500 mt-1" size={40} />
            <p className="text-[#757575] text-lg lg:text-2xl font-light lg:max-w-[55ch]">
              Vous avez une question ? Trouvez ici les réponses les plus
              courantes à propos de nos services
            </p>
          </div>
          <div className="relative mt-4">
            <input
              type="search"
              placeholder="Rechercher une question..."
              className="w-full p-5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories as Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-8 mt-20 w-full">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`flex items-center gap-4 px-6 py-4 rounded-full transition duration-300 ${
                activeCategory === category.label
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500"
              }`}
              onClick={() => handleCategoryChange(category.label)}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 mt-10 max-w-5xl mx-auto">
          {filteredFAQs.map((faq, index) => (
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
          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Aucune question trouvée pour votre recherche.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
