export default function BulletCard({
  title,
  description,
  className,
  titleClass,
}) {
  return (
    <div className="flex gap-5">
      <div className={`h-[98px] rounded-full ${className}`} />
      <div>
        <h2
          className={`text-lg lg:text-xl xl:text-2xl font-bold font-montserrat ${titleClass}`}
        >
          {title}
        </h2>
        <p className="text-sm lg:text-base xl:text-lg text-gray-700 font-poppins font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
