import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-radial" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            See your last feature—
            <br />
            <span className="text-gradient">explained.</span>
          </h2>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Request Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Small print */}
          <p className="mt-8 text-sm text-muted-foreground">
            Join the waitlist. We'll reach out when it's your turn.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
