import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FileText,
  Settings,
  PieChart,
  CreditCard,
  Building2,
  BarChart3,
  Calendar,
  Bell,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Fake complex code that looks intimidating
const fakeCode = `import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { calculateQuarterlyMetrics, aggregateByDepartment } from '@/lib/analytics';
import { RevenueProjection, ExpenseCategory, BudgetAllocation } from '@/types/finance';

interface DashboardMetrics {
  revenue: number;
  expenses: number;
  netIncome: number;
  growthRate: number;
  departmentBreakdown: DepartmentData[];
  quarterlyTrends: QuarterlyTrend[];
  forecastAccuracy: number;
  budgetVariance: BudgetVariance[];
}

export const useFinancialDashboard = (fiscalYear: string, quarter: Quarter) => {
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['revenue', fiscalYear, quarter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('revenue_transactions')
        .select(\`
          id, amount, category, department_id,
          departments!inner(name, cost_center),
          created_at, fiscal_period
        \`)
        .gte('fiscal_period', \`\${fiscalYear}-Q\${quarter}\`)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return calculateQuarterlyMetrics(data);
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: expenseData } = useQuery({
    queryKey: ['expenses', fiscalYear, quarter],
    queryFn: async () => {
      const { data } = await supabase
        .from('expense_allocations')
        .select(\`
          id, amount, category, vendor_id,
          vendors(name, payment_terms),
          approval_status, budget_code
        \`)
        .eq('fiscal_year', fiscalYear);
      
      return aggregateByDepartment(data);
    },
  });

  const updateBudgetAllocation = useMutation({
    mutationFn: async (allocation: BudgetAllocation) => {
      const { data, error } = await supabase
        .from('budget_allocations')
        .upsert({
          department_id: allocation.departmentId,
          fiscal_year: fiscalYear,
          q1_budget: allocation.q1,
          q2_budget: allocation.q2,
          q3_budget: allocation.q3,
          q4_budget: allocation.q4,
          variance_threshold: allocation.varianceThreshold,
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['budgets', fiscalYear]);
    },
  });

  const computedMetrics = useMemo(() => {
    if (!revenueData || !expenseData) return null;
    
    const netIncome = revenueData.total - expenseData.total;
    const growthRate = ((revenueData.total - revenueData.previousPeriod) 
      / revenueData.previousPeriod) * 100;
    
    return {
      revenue: revenueData.total,
      expenses: expenseData.total,
      netIncome,
      growthRate,
      departmentBreakdown: aggregateByDepartment([...revenueData.items]),
      forecastAccuracy: calculateForecastAccuracy(revenueData, fiscalYear),
    };
  }, [revenueData, expenseData, fiscalYear]);

  return {
    metrics: computedMetrics,
    isLoading: revenueLoading,
    updateBudget: updateBudgetAllocation.mutate,
  };
};

// Dashboard component with real-time updates
export const FinanceDashboard: React.FC<DashboardProps> = ({ 
  fiscalYear,
  quarter,
  permissions 
}) => {
  const { metrics, isLoading } = useFinancialDashboard(fiscalYear, quarter);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
  const chartData = useMemo(() => {
    return metrics?.departmentBreakdown.map(dept => ({
      name: dept.name,
      revenue: dept.revenue,
      expenses: dept.expenses,
      budget: dept.allocatedBudget,
      variance: ((dept.expenses - dept.allocatedBudget) / dept.allocatedBudget) * 100,
    }));
  }, [metrics]);

  // Real-time subscription for live updates
  useEffect(() => {
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'revenue_transactions',
      }, (payload) => {
        handleRealtimeUpdate(payload);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fiscalYear]);`;

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Revenue Analytics" },
  { icon: PieChart, label: "Budget Planning" },
  { icon: Users, label: "Client Accounts" },
  { icon: Building2, label: "Departments" },
  { icon: CreditCard, label: "Invoicing" },
  { icon: FileText, label: "Reports" },
  { icon: BarChart3, label: "Forecasting" },
  { icon: Calendar, label: "Fiscal Calendar" },
  { icon: Settings, label: "Settings" },
];

const DashboardUI = () => {
  const [cursorPos, setCursorPos] = useState({ x: 200, y: 150 });
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const positions = [
      { x: 200, y: 150 },
      { x: 350, y: 80 },
      { x: 450, y: 200 },
      { x: 300, y: 280 },
      { x: 150, y: 180 },
      { x: 400, y: 120 },
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % positions.length;
      setCursorPos(positions[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-background rounded-lg overflow-hidden flex text-[10px] sm:text-xs">
      {/* Sidebar */}
      <div className="w-[140px] sm:w-[160px] bg-muted/50 border-r border-border/50 p-2 sm:p-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
            <Building2 className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground text-xs">FinanceOS</span>
        </div>
        <div className="space-y-0.5">
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-foreground">Financial Dashboard</h2>
            <p className="text-muted-foreground text-[10px]">Q4 2024 Overview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-muted-foreground">
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">Search...</span>
            </div>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
          {[
            { label: "Total Revenue", value: "$2.4M", change: "+12.5%", up: true },
            { label: "Expenses", value: "$1.8M", change: "+3.2%", up: false },
            { label: "Net Income", value: "$620K", change: "+18.7%", up: true },
            { label: "Accounts", value: "847", change: "+24", up: true },
          ].map((metric, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-2 sm:p-3 border border-border/30">
              <p className="text-muted-foreground text-[9px] sm:text-[10px] mb-1">{metric.label}</p>
              <p className="text-sm sm:text-lg font-bold text-foreground">{metric.value}</p>
              <div className={`flex items-center gap-0.5 text-[9px] ${metric.up ? "text-green-500" : "text-red-500"}`}>
                {metric.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium text-foreground">Revenue by Quarter</span>
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                2024 <ChevronDown className="w-2.5 h-2.5" />
              </div>
            </div>
            {/* Fake chart bars */}
            <div className="flex items-end gap-2 h-16">
              {[65, 80, 55, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/60 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[8px] text-muted-foreground">Q{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium text-foreground">Department Allocation</span>
            </div>
            {/* Fake pie chart segments */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-4 border-primary relative">
                <div className="absolute inset-1 rounded-full border-4 border-primary/40" />
              </div>
              <div className="space-y-1 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Operations 42%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                  <span className="text-muted-foreground">Sales 28%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary/30" />
                  <span className="text-muted-foreground">R&D 30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Cursor */}
        {cursorVisible && (
          <motion.div
            className="absolute pointer-events-none z-50"
            animate={{ x: cursorPos.x, y: cursorPos.y }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--primary-foreground))"
                strokeWidth="1.5"
              />
            </svg>
            {/* Click ripple effect */}
            <motion.div
              className="absolute top-0 left-0 w-6 h-6 rounded-full border-2 border-primary"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.6 }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

const CodePanel = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = fakeCode.split("\n");

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) return prev;
        return prev + 3;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className="w-full h-full bg-[#0d1117] rounded-lg overflow-hidden font-mono text-[9px] sm:text-[10px] leading-relaxed">
      {/* Editor header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[#8b949e] text-[10px]">useFinancialDashboard.tsx</span>
      </div>
      {/* Code content */}
      <div className="p-3 overflow-hidden h-[calc(100%-36px)]">
        <div className="flex">
          {/* Line numbers */}
          <div className="pr-3 text-[#484f58] select-none border-r border-[#30363d] mr-3">
            {lines.slice(0, visibleLines).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <div className="overflow-hidden flex-1">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="whitespace-pre">
                {colorCodeLine(line)}
              </div>
            ))}
            {/* Blinking cursor */}
            <span className="inline-block w-2 h-4 bg-[#58a6ff] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple syntax highlighting
const colorCodeLine = (line: string) => {
  const keywords = ["import", "export", "const", "return", "async", "await", "if", "from", "interface", "useMemo", "useEffect", "useState"];
  const types = ["string", "number", "boolean", "null", "undefined"];
  
  let result = line;
  
  // Color strings
  result = result.replace(/(["'`].*?["'`])/g, '<span class="text-[#a5d6ff]">$1</span>');
  // Color keywords
  keywords.forEach((kw) => {
    result = result.replace(new RegExp(`\\b(${kw})\\b`, "g"), '<span class="text-[#ff7b72]">$1</span>');
  });
  // Color types
  types.forEach((t) => {
    result = result.replace(new RegExp(`\\b(${t})\\b`, "g"), '<span class="text-[#79c0ff]">$1</span>');
  });
  // Color comments
  result = result.replace(/(\/\/.*$)/g, '<span class="text-[#8b949e]">$1</span>');
  // Color functions
  result = result.replace(/(\w+)(\()/g, '<span class="text-[#d2a8ff]">$1</span>$2');
  
  return <span dangerouslySetInnerHTML={{ __html: result }} className="text-[#c9d1d9]" />;
};

const CodeToUIDemo = () => {
  const [showUI, setShowUI] = useState(false);
  const [phase, setPhase] = useState<"code" | "transforming" | "ui">("code");

  useEffect(() => {
    const cycle = () => {
      // Show code for 4 seconds
      setPhase("code");
      setShowUI(false);

      setTimeout(() => {
        // Transform for 0.8 seconds
        setPhase("transforming");
      }, 4000);

      setTimeout(() => {
        // Show UI for 5 seconds
        setPhase("ui");
        setShowUI(true);
      }, 4800);

      setTimeout(() => {
        // Transform back
        setPhase("transforming");
      }, 9800);

      setTimeout(() => {
        // Restart cycle
        cycle();
      }, 10600);
    };

    cycle();
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12">
      {/* Label */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs sm:text-sm text-muted-foreground font-mono">
          {phase === "code" && "Reading 2,847 lines of code..."}
          {phase === "transforming" && "✨ Transforming..."}
          {phase === "ui" && "What actually shipped →"}
        </span>
      </motion.div>

      {/* Demo Container */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border/50 bg-background shadow-2xl shadow-primary/5">
        <AnimatePresence mode="wait">
          {!showUI ? (
            <motion.div
              key="code"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 1.05,
                filter: "blur(10px)",
              }}
              transition={{ duration: 0.5 }}
            >
              <CodePanel />
            </motion.div>
          ) : (
            <motion.div
              key="ui"
              className="absolute inset-0"
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                filter: "blur(10px)",
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95,
              }}
              transition={{ duration: 0.5 }}
            >
              <DashboardUI />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transformation overlay */}
        {phase === "transforming" && (
          <motion.div
            className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>

      {/* Caption */}
      <motion.p
        className="text-center text-xs sm:text-sm text-muted-foreground mt-4 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        No more digging through PRs. Just clarity.
      </motion.p>
    </div>
  );
};

export default CodeToUIDemo;
