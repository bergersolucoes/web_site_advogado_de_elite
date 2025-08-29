import { FORMS } from './config.js';

// Handler para formulários usando FormSubmit
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
        
        const response = await fetch(`https://formsubmit.co/ajax/${FORMS.SEND_TO}`, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          if (msgElement) {
            msgElement.textContent = 'Mensagem enviada com sucesso!';
            msgElement.style.color = '#22c55e';
          }
          form.reset();
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
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