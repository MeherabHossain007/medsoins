export default function Section({ title }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl md:text-4xl font-bold mb-5 text-center md:text-left text-gray-500">
        {title}
      </h3>
      <p className="text-gray-700 font-light mb-10 text-center md:text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        purus enim, egestas suscipit consequat nec, blandit imperdiet nunc. Sed
        varius ac magna ut volutpat.
      </p>
    </section>
  );
}
