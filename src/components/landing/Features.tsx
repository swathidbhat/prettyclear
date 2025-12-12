import { Eye, Zap, MessageCircle, Presentation } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "See exactly what changed",
    description: "Get a clear view of every modification without diving into diffs.",
  },
  {
    icon: Zap,
    title: "Understand product impact",
    description: "Focus on what matters for users, not implementation details.",
  },
  {
    icon: MessageCircle,
    title: "Ask follow-up questions naturally",
    description: "Have a conversation in plain English to go deeper.",
  },
  {
    icon: Presentation,
    title: "Explain with confidence",
    description: "Brief stakeholders accurately without technical jargon.",
  },
];

const Features = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            What You Can Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for product thinking
          </h2>
        </div>

        {/* Features grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
