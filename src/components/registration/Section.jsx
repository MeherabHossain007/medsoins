"use client";
export default function Section({ title }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl md:text-4xl font-bold mb-5 text-center md:text-left text-[#757575]">
        {title}
      </h3>
      <p className="text-[#010101] font-light mb-10 text-center md:text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        purus enim, egestas suscipit consequat nec, blandit imperdiet nunc. Sed
        varius ac magna ut volutpat. Curabitur fringilla felis risus. Nunc
        vehicula ullamcorper arcu, ac sagittis est hendrerit sed. Integer in
        gravida velit. Nam nec velit egestas, eleifend diam sit amet, fringilla
        velit. Nam ante tortor, luctus non viverra non, placerat a tortor.
        Praesent quis enim quis felis pretium fringilla.
      </p>
    </section>
  );
}
