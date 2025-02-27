"use client";

import { useState } from "react";
import Image from "next/image";
import InputField from "@/components/registration/InputField";
import Section from "@/components/registration/Section";

export default function Registration() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    specialite: "",
    centre: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="pt-18 lg:pt-28">
      {/* Form Section */}
      <div className="relative flex items-center justify-center px-5 lg:px-0 py-10 md:py-20">
        <Image
          src="/images/bgf.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
        <div className="flex flex-col w-full max-w-4xl justify-center items-center">
          <div className="flex items-center justify-center w-full max-w-[90%] md:max-w-[524px] min-h-[34px] rounded-[50px] bg-white bg-opacity-50 backdrop-blur-[5px] mb-4 sm:mb-8 px-2">
            <span className="text-black text-xs md:text-lg font-medium text-center">
              Page Rejoindre une équipe/Ouvrir un centre
            </span>
          </div>
          <div className="relative z-10 bg-white/30 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Nom*"
                  name="nom"
                  placeholder="Indiquez votre nom"
                  onChange={handleChange}
                />
                <InputField
                  label="Prénom*"
                  name="prenom"
                  placeholder="Indiquez votre prénom"
                  onChange={handleChange}
                />
                <InputField
                  label="Email*"
                  type="email"
                  name="email"
                  placeholder="Indiquez votre adresse email"
                  onChange={handleChange}
                />
                <InputField
                  label="Téléphone*"
                  type="tel"
                  name="telephone"
                  placeholder="Indiquez votre N° de téléphone"
                  onChange={handleChange}
                />
                <InputField
                  label="Spécialité pratiquée"
                  name="specialite"
                  placeholder="Médecin urgentiste"
                  onChange={handleChange}
                />
                <div>
                  <fieldset>
                    <legend className="text-sm font-light">
                      Centre MEDSOIN
                    </legend>
                    <select
                      name="centre"
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border bg-white border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionnez un centre</option>
                      <option value="centre1">Centre 1</option>
                      <option value="centre2">Centre 2</option>
                    </select>
                  </fieldset>
                </div>
              </div>
              <div>
                <fieldset>
                  <legend className="text-sm font-light">
                    Message (optionnel)
                  </legend>
                  <textarea
                    name="message"
                    placeholder="Votre message"
                    className="mt-1 block w-full p-2 border bg-white border-gray-300 rounded-md h-32"
                    onChange={handleChange}
                  />
                </fieldset>
              </div>
              <div className="text-center md:text-end">
                <button
                  type="submit"
                  className="bg-secondary text-white font-semibold px-6 py-3 rounded-md w-full md:w-auto"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <p className="text-2xl md:text-4xl font-bold py-10 text-center md:text-left">
          Page Rejoindre Une Equipe
        </p>
        <Section title="Avantage" />
        <Section title="Valeur De MEDSOIN" />
        <Section title="Collaborer Avec Le Réseau" />
      </div>
    </div>
  );
}