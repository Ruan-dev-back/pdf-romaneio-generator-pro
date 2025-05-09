
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, FileText, Box, AlertCircle } from "lucide-react";

interface PreviewCardProps {
  carrierName: string;
  fileCount: number;
}

const PreviewCard: FC<PreviewCardProps> = ({ carrierName, fileCount }) => {
  const totalVolumes = fileCount * 2; // Simulation of volume count (in a real app, this would be calculated from actual data)
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Prévia do Romaneio</CardTitle>
        <CardDescription>
          Visualize como ficará o seu romaneio
        </CardDescription>
      </CardHeader>
      <CardContent>
        {fileCount > 0 && carrierName ? (
          <div className="bg-white border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">ROMANEIO DE ENTREGA</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Truck size={16} />
                  <span>Transportadora: {carrierName}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                <FileText size={24} />
              </div>
            </div>

            <div className="border rounded">
              <div className="grid grid-cols-5 bg-gray-100 text-xs font-medium p-2">
                <div className="col-span-1">NFe</div>
                <div className="col-span-1">Razão Social</div>
                <div className="col-span-1">Município</div>
                <div className="col-span-1">Volumes</div>
                <div className="col-span-1">Valor Total</div>
              </div>

              {[...Array(Math.min(fileCount, 3))].map((_, i) => (
                <div key={i} className="grid grid-cols-5 text-xs p-2 border-t">
                  <div className="col-span-1 truncate">123.{(456 + i).toString().padStart(3, '0')}</div>
                  <div className="col-span-1 truncate">Empresa Exemplo LTDA</div>
                  <div className="col-span-1 truncate">Campinas</div>
                  <div className="col-span-1">{2}</div>
                  <div className="col-span-1">R$ {(1500 + i * 230).toFixed(2).replace(".", ",")}</div>
                </div>
              ))}

              {fileCount > 3 && (
                <div className="text-xs text-center py-1 border-t text-gray-500">
                  + {fileCount - 3} notas fiscais
                </div>
              )}
            </div>

            <div className="flex justify-between text-sm pt-2">
              <div className="flex items-center space-x-1">
                <Box size={16} className="text-gray-500" />
                <span>Total de volumes: <strong>{totalVolumes}</strong></span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText size={16} className="text-gray-500" />
                <span>Notas processadas: <strong>{fileCount}</strong></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Sem prévia disponível
            </h3>
            <p className="text-sm text-gray-500">
              Adicione notas fiscais e informe a transportadora para visualizar a prévia
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
