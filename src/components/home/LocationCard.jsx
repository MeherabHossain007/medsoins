import { FaMapMarkerAlt } from "react-icons/fa";
const LocationCard = ({ name, distance }) => {
  return (
    <div className="bg-white p-4 flex justify-between items-center border-b border-zinc-300">
      <div>
        <h2 className="text-xl font-montserrat font-light">{name}</h2>
        <div className="flex items-center text-gray-700 mt-1">
          <FaMapMarkerAlt className="mr-2" />
          <span className="font-montserrat font-bold">{distance}</span>
        </div>
      </div>
      <button className="text-secondary border border-secondary rounded-full px-5 py-3 font-montserrat font-semibold">
        Rejoindre une équipe
      </button>
    </div>
  );
};

export default LocationCard;
