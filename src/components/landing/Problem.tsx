const Problem = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section label */}
          <p className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            The Problem
          </p>

          {/* Main statement */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            Shipping is fast.
            <br />
            <span className="text-muted-foreground">Product understanding isn't.</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Pull requests are written for engineers—
            <br className="hidden md:block" />
            not for people making product decisions.
          </p>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-24 bg-gradient-to-b from-border to-transparent" />
    </section>
  );
};

export default Problem;
