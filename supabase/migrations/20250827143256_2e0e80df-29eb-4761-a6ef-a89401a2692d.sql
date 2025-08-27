-- Create a function to create a default site for new users
CREATE OR REPLACE FUNCTION public.create_default_site_for_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create a default site for the new user
  INSERT INTO public.sites (name, domain, owner_id, plan, active)
  VALUES (
    'Advogado de Elite - ' || COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'advogadodeelite-' || SUBSTRING(NEW.id::text, 1, 8) || '.adv.br',
    NEW.id,
    'basic',
    true
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create a site when a user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created_create_site
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_default_site_for_user();