import { GitPullRequest, MessageSquareText, MessagesSquare } from "lucide-react";

const steps = [
  {
    icon: GitPullRequest,
    title: "A feature ships",
    description: "The agent reads the pull request.",
  },
  {
    icon: MessageSquareText,
    title: "You get a product-level explanation",
    description: "What changed, why it matters, and what to watch for.",
  },
  {
    icon: MessagesSquare,
    title: "You talk to the agent in plain English",
    description: "It explains accurately—without code.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From code to clarity in seconds
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group relative flex gap-6 md:gap-8 items-start"
              >
                {/* Step number and line */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-full min-h-[3rem] bg-gradient-to-b from-border to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
