export default function PageHeader({ title, description }) {
  return (
    <section className="bg-maroon-deep px-4 pt-16 pb-14 sm:px-6 lg:px-8 lg:pt-20 lg:pb-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
