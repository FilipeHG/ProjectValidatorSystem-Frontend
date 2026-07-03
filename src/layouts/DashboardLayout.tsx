import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { apiClient } from "../services/apiClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "checking">(
    "checking",
  );

  useEffect(() => {
    apiClient
      .get("/health")
      .then(() => setApiStatus("online"))
      .catch(() => setApiStatus("offline"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-slate-800 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Project Validator System
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dashboard para gerenciamento simplificado de projetos
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              API Status
            </span>
            {apiStatus === "checking" && (
              <Activity className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
            )}
            {apiStatus === "online" && (
              <div
                className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                title="Online"
              />
            )}
            {apiStatus === "offline" && (
              <div
                className="w-2.5 h-2.5 rounded-full bg-rose-500"
                title="Offline"
              />
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} ProjectValidatorSystem. Todos os
            direitos reservados.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-xs">
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              v1.0.0
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
              React, TS, Vite, Tailwind
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
