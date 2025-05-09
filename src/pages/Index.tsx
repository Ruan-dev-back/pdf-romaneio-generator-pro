
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UploadArea from "@/components/UploadArea";
import { Separator } from "@/components/ui/separator";
import PreviewCard from "@/components/PreviewCard";
import Header from "@/components/Header";
import { toast } from "sonner";

const Index = () => {
  const [carrierName, setCarrierName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleFileUpload = (uploadedFiles: File[]) => {
    // Filter for only PDF files
    const pdfFiles = uploadedFiles.filter(file => 
      file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf')
    );
    
    if (pdfFiles.length !== uploadedFiles.length) {
      toast.warning("Somente arquivos PDF são aceitos.");
    }
    
    setFiles(prevFiles => [...prevFiles, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleGenerateRomaneio = async () => {
    if (!carrierName.trim()) {
      toast.error("Por favor, informe o nome da transportadora.");
      return;
    }

    if (files.length === 0) {
      toast.error("Por favor, faça upload de pelo menos uma nota fiscal.");
      return;
    }

    setIsGenerating(true);

    // In a real implementation, we would send the files to a backend API
    // and receive the generated romaneio PDF in response
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This is where you would make the actual API call to your Spring Boot backend
      // const formData = new FormData();
      // formData.append("carrierName", carrierName);
      // files.forEach(file => formData.append("files", file));
      // const response = await fetch("/api/generate-romaneio", { method: "POST", body: formData });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);

      toast.success("Romaneio gerado com sucesso! (Simulação)");
    } catch (error) {
      console.error("Error generating romaneio:", error);
      toast.error("Erro ao gerar o romaneio. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          <div className="col-span-1 md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Romaneio</CardTitle>
                <CardDescription>
                  Informe a transportadora e faça upload das notas fiscais para gerar o romaneio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="carrier" className="block text-sm font-medium mb-1">
                    Nome da Transportadora
                  </label>
                  <Input
                    id="carrier"
                    placeholder="Digite o nome da transportadora"
                    value={carrierName}
                    onChange={(e) => setCarrierName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Upload de Notas Fiscais (PDF)
                  </label>
                  <UploadArea onFileUpload={handleFileUpload} />
                </div>

                {files.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Arquivos carregados ({files.length})</h3>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex justify-between items-center p-2 bg-white border rounded-md">
                          <span className="truncate max-w-[80%]">{file.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remover
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleGenerateRomaneio} 
                  disabled={isGenerating || !carrierName.trim() || files.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? "Gerando..." : "Gerar Romaneio PDF"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-1 md:col-span-3">
            <PreviewCard carrierName={carrierName} fileCount={files.length} />
          </div>
        </div>

        <Separator className="my-8" />

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Como funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">1</div>
                  <h3 className="font-semibold">Upload de Notas</h3>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Faça upload das notas fiscais em PDF que deseja incluir no romaneio
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">2</div>
                  <h3 className="font-semibold">Extração Automática</h3>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  O sistema extrai automaticamente as informações relevantes de cada nota fiscal
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">3</div>
                  <h3 className="font-semibold">Geração de PDF</h3>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Um romaneio profissional em PDF é gerado com todas as informações consolidadas
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; 2025 Gerador de Romaneio PDF. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
