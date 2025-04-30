
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutDashboard, FileText, Settings, Users, ChartPie, Badge } from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Skills Management",
      path: "/dashboard/module/skills-management",
      icon: ChartPie
    },
    {
      name: "Resume Inference",
      path: "/dashboard/module/skills-management/resume-inference",
      icon: FileText
    },
    {
      name: "Certificate Inference",
      path: "/dashboard/module/skills-management/certificate-inference",
      icon: Badge
    },
    {
      name: "Employee Skills",
      path: "/dashboard/module/skills-management/employee-skills",
      icon: Users
    },
    {
      name: "Settings",
      path: "/dashboard/module/skills-management/settings",
      icon: Settings
    }
  ];

  return (
    <aside
      className={cn(
        "bg-white shadow-md flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-primary">SkillScribe AI</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
