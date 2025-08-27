import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { LogOut, Plus, ExternalLink } from 'lucide-react';

interface Site {
  id: string;
  name: string;
  domain: string;
  plan: string;
  active: boolean;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  form_type: string;
  created_at: string;
}

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Carrega sites do usuário
      const { data: sitesData, error: sitesError } = await supabase
        .from('sites')
        .select('*')
        .eq('owner_id', user?.id)
        .order('created_at', { ascending: false });

      if (sitesError) throw sitesError;
      setSites(sitesData || []);

      // Carrega contatos dos sites do usuário
      if (sitesData && sitesData.length > 0) {
        const siteIds = sitesData.map(site => site.id);
        const { data: contactsData, error: contactsError } = await supabase
          .from('contacts')
          .select('*')
          .in('site_id', siteIds)
          .order('created_at', { ascending: false });

        if (contactsError) throw contactsError;
        setContacts(contactsData || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultSite = async () => {
    try {
      const { data, error } = await supabase
        .from('sites')
        .insert({
          name: 'Advogado de Elite',
          domain: 'advogadodeelite.adv.br',
          owner_id: user?.id,
          plan: 'basic'
        })
        .select()
        .single();

      if (error) throw error;
      
      setSites([data, ...sites]);
      toast.success('Site criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar site:', error);
      toast.error('Erro ao criar site');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Bem-vindo, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Seção de Sites */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Meus Sites</CardTitle>
                <CardDescription>
                  Gerencie seus sites e visualize estatísticas
                </CardDescription>
              </div>
              {sites.length === 0 && (
                <Button onClick={createDefaultSite}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Site
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {sites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum site encontrado.</p>
                  <p className="text-sm">Clique em "Criar Site" para começar.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {sites.map((site) => (
                    <div key={site.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{site.name}</h3>
                          <p className="text-sm text-muted-foreground">{site.domain}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={site.active ? "default" : "secondary"}>
                              {site.active ? 'Ativo' : 'Inativo'}
                            </Badge>
                            <Badge variant="outline">{site.plan}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção de Contatos */}
          <Card>
            <CardHeader>
              <CardTitle>Contatos Recebidos</CardTitle>
              <CardDescription>
                Lista de contatos enviados através dos formulários
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum contato recebido ainda.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.slice(0, 10).map((contact) => (
                    <div key={contact.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                          )}
                          {contact.message && (
                            <p className="text-sm mt-2 line-clamp-2">{contact.message}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{contact.form_type}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(contact.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {contacts.length > 10 && (
                    <p className="text-center text-sm text-muted-foreground">
                      ... e mais {contacts.length - 10} contatos
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}