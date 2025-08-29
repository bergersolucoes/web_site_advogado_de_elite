// Handler para formulários usando Supabase Edge Function
export function initFormHandler() {
  const forms = document.querySelectorAll('.js-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const msgElement = form.querySelector('.js-msg');
      const originalText = submitBtn.textContent;
      
      // Estado de envio
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      if (msgElement) msgElement.textContent = '';
      
      try {
        const formData = new FormData(form);
        
        // Honeypot check
        if (formData.get('company')) {
          throw new Error('Spam detected');
        }
        
        // Prepare data for Supabase function
        const contactData = {
          name: formData.get('nome') || formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('telefone') || formData.get('phone'),
          message: formData.get('mensagem') || formData.get('message'),
          formType: form.dataset.formType || 'contact'
        };
        
        const response = await fetch('https://olzysjwkbkyvqdbwfiwi.supabase.co/functions/v1/send-contact-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          if (msgElement) {
            msgElement.textContent = result.message || 'Mensagem enviada com sucesso!';
            msgElement.style.color = '#22c55e';
          }
          form.reset();
        } else {
          throw new Error(result.error || 'Erro no envio');
        }
      } catch (error) {
        console.error('Error sending form:', error);
        if (msgElement) {
          msgElement.textContent = 'Erro ao enviar mensagem. Tente novamente.';
          msgElement.style.color = '#ef4444';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  });
}