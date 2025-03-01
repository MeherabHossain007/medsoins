const TeamMember = ({ imgSrc, name, specialty }) => (
  <div className="text-center">
    <img
      alt="Doctor portrait"
      className="rounded-lg mx-auto mb-4 w-72 h-72 object-cover"
      src={imgSrc}
    />
    <h3 className="text-lg font-bold font-montserrat">{name}</h3>
    <p className="text-lg text-gray-500 font-montserrat">{specialty}</p>
  </div>
);

export default TeamMember;
