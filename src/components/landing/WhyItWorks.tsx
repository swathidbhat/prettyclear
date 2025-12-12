import { CheckCircle2 } from "lucide-react";

const WhyItWorks = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
              Why This Works
            </p>
          </div>

          {/* Content card */}
          <div className="relative p-8 md:p-12 rounded-2xl border border-border bg-gradient-to-b from-card to-background">
            {/* Glow effect */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
                This isn't a static summary.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                It's a conversational agent grounded in the actual pull request—
                so answers stay accurate, contextual, and trustworthy.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Accurate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Contextual</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Trustworthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
