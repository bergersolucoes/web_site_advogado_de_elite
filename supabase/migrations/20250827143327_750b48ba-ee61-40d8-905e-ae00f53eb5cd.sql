-- Fix security issues by setting search_path for functions

-- Update existing functions to have secure search_path
ALTER FUNCTION public.get_user_site_access(uuid) SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.create_default_site_for_user() SET search_path = public;