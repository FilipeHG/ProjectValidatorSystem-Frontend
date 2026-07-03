import { useState } from "react";
import { PlusCircle } from "lucide-react";
import ProjectsTable from "../components/tables/ProjectsTable";
import ProjectFormModal from "../components/modals/ProjectFormModal";

export default function ProjectsDashboardPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Projetos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gerencie todos os projetos da organização.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar Novo Projeto
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <ProjectsTable />
      </div>

      <ProjectFormModal open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
