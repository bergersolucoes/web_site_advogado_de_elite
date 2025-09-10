import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'number';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  rows?: number;
}

interface FormModalProps {
  title: string;
  description?: string;
  fields: FormField[];
  trigger: React.ReactNode;
  onSubmit?: (data: Record<string, any>) => void;
  submitText?: string;
}

export default function FormModal({
  title,
  description,
  fields,
  trigger,
  onSubmit,
  submitText = "Enviar"
}: FormModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !formData[f.name]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Determinar tipo de formulário baseado no título
      let formType = 'contact';
      if (title.toLowerCase().includes('petição')) formType = 'petition';
      else if (title.toLowerCase().includes('mentoria')) formType = 'mentoria';
      else if (title.toLowerCase().includes('oab')) formType = 'oab';

      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: formType,
          company: '' // Honeypot field
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Formulário enviado!",
          description: result.message || "Entraremos em contato em breve."
        });
        setOpen(false);
        setFormData({});
        onSubmit?.(formData);
      } else {
        throw new Error(result.error || 'Erro no envio');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      toast({
        title: "Erro no Envio",
        description: "Não foi possível enviar o formulário. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (field: FormField) => {
    const baseProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...baseProps}
            rows={field.rows || 4}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
      
      case 'select':
        return (
          <Select onValueChange={(value) => handleFieldChange(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Selecione..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={formData[field.name] || false}
              onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
            />
            <Label htmlFor={field.name} className="text-sm leading-relaxed">
              {field.label}
            </Label>
          </div>
        );
      
      default:
        return (
          <Input
            {...baseProps}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {title}
          </DialogTitle>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              {field.type !== 'checkbox' && (
                <Label htmlFor={field.name} className="text-foreground font-medium">
                  {field.label}
                  {field.required && <span className="text-accent ml-1">*</span>}
                </Label>
              )}
              {renderField(field)}
            </div>
          ))}
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="btn-gold flex-1">
              {submitText}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="btn-outline-gold"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}