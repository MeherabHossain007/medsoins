import { FaMapMarkerAlt } from "react-icons/fa";

const LocationCard = ({ name, distance }) => {
  const handleButtonClick = () => {
    window.location.href = "/doctor";
  };

  return (
    <div className="bg-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-300 hover:bg-gray-50 transition-colors duration-200">
      <div className="mb-3 md:mb-0 md:mr-4">
        <h2 className="text-base md:text-xl font-montserrat font-light">
          {name}
        </h2>
        <div className="flex items-center text-gray-700 mt-1">
          <FaMapMarkerAlt className="mr-2 text-sm md:text-base" />
          <span className="font-montserrat font-bold text-sm md:text-base">
            {distance}
          </span>
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className="text-secondary border border-secondary rounded-full px-4 py-2 md:px-5 md:py-3 font-montserrat font-semibold text-sm md:text-base w-full md:w-auto text-center hover:bg-secondary hover:text-white transition-colors duration-200"
      >
        Rejoindre une équipe
      </button>
    </div>
  );
};

export default LocationCard;
