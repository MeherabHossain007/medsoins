export default function BulletCard({ id, title, description, isActive, onClick }) {
  return (
    <div className="flex gap-5 cursor-pointer" onClick={onClick}>
      <div
        className={`h-[98px] rounded-full transition-all duration-300 ${
          isActive ? "bg-black w-6" : "bg-black opacity-25 w-2"
        }`}
      />
      <div>
        <h2
          className={`text-lg lg:text-xl xl:text-2xl font-bold font-montserrat transition-all duration-300 ${
            !isActive ? "text-black opacity-25" : ""
          }`}
        >
          {title}
        </h2>
        {isActive && (
          <p className="text-sm lg:text-base xl:text-lg text-gray-700 font-poppins font-light mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
