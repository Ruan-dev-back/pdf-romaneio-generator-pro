
import { FC } from "react";
import { FileText } from "lucide-react";

const Header: FC = () => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-2 rounded">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-900">Gerador de Romaneio</h1>
            <p className="text-xs md:text-sm text-gray-500">Sistema de geração de romaneio em PDF</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
