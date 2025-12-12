import { User, Users, Rocket } from "lucide-react";

const audiences = [
  {
    icon: User,
    title: "Product Managers",
    description: "Stay in the loop without context-switching to code.",
  },
  {
    icon: Users,
    title: "Product Leaders",
    description: "Oversee multiple teams with confidence.",
  },
  {
    icon: Rocket,
    title: "Founders",
    description: "Get clarity without deep technical dives.",
  },
];

const Audience = () => {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Who It's For
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Made for decision-makers
          </h2>
        </div>

        {/* Audience cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                <audience.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{audience.title}</h3>
              <p className="text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
