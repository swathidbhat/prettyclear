const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient orb */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float-delayed" />
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent line-grow" />
      <div className="absolute top-1/3 left-1/5 w-32 h-px bg-gradient-to-r from-accent/50 to-transparent" />
      
      {/* Floating rings */}
      <div className="absolute top-20 right-1/4 w-20 h-20 rounded-full border border-primary/20 animate-spin-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full border border-accent/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      
      {/* Dots grid */}
      <div className="absolute top-1/2 right-20 grid grid-cols-3 gap-4 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 h-1 rounded-full bg-primary"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      
      {/* Diagonal line */}
      <div className="absolute top-0 left-1/2 w-px h-screen bg-gradient-to-b from-transparent via-border/30 to-transparent transform rotate-12" />
    </div>
  );
};

export default FloatingElements;
