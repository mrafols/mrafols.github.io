/**
 * Contact Form Handler
 * Manages form submission state, validation, and user feedback
 */

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.formStatus = document.getElementById('form-status');
        this.loadingSpinner = this.submitBtn?.querySelector('.loading-spinner');
        this.submitText = this.submitBtn?.querySelector('[data-translate="send-message"]');
        
        this.messages = {
            es: {
                sending: 'Enviando...',
                success: '¡Mensaje enviado con éxito! Te responderé pronto.',
                error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
                networkError: 'Error de conexión. Verifica tu conexión a internet.',
                validationError: 'Por favor, completa todos los campos requeridos.',
                emailError: 'Por favor, introduce una dirección de email válida.'
            },
            en: {
                sending: 'Sending...',
                success: 'Message sent successfully! I\'ll get back to you soon.',
                error: 'Error sending message. Please try again.',
                networkError: 'Connection error. Please check your internet connection.',
                validationError: 'Please fill in all required fields.',
                emailError: 'Please enter a valid email address.'
            }
        };
        
        this.init();
    }
      init() {
        if (this.form) {
            // Check if FormSubmit.co should be used with native form submission
            // This is more reliable for FormSubmit.co
            if (this.form.action.includes('formsubmit.co')) {
                // Use native form submission for better compatibility
                this.setupNativeSubmission();
            } else {
                // Use fetch API for other services
                this.form.addEventListener('submit', this.handleSubmit.bind(this));
            }
            this.checkUrlParams();
        }
    }
    
    setupNativeSubmission() {
        this.form.addEventListener('submit', (event) => {
            if (!this.validateForm()) {
                event.preventDefault();
                return;
            }
            
            // Let the form submit naturally to FormSubmit.co
            this.setLoading(true);
            
            // Show a message that the form is being submitted
            setTimeout(() => {
                this.showMessage(this.getCurrentMessage('sending'), 'info');
            }, 100);
        });
    }
    
    checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('sent') === 'true') {
            this.showSuccess();
            // Clean URL
            const url = new URL(window.location);
            url.searchParams.delete('sent');
            window.history.replaceState({}, document.title, url.pathname);
        }
    }
      async handleSubmit(event) {
        event.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.setLoading(true);
        
        try {
            const formData = new FormData(this.form);
            
            // For FormSubmit.co, we can use a direct form submission
            // or fetch API for better control
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData
            });
            
            // FormSubmit.co returns a redirect on success
            // If we reach here without error, it's likely successful
            this.showSuccess();
            this.form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            // On error, provide fallback option
            this.showErrorWithFallback();
        } finally {
            this.setLoading(false);
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.highlightField(field, false);
                isValid = false;
            } else {
                this.highlightField(field, true);
            }
        });
        
        // Validate email specifically
        const emailField = this.form.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                this.highlightField(emailField, false);
                this.showError(this.getCurrentMessage('emailError'));
                isValid = false;
            }
        }
        
        if (!isValid) {
            this.showError(this.getCurrentMessage('validationError'));
        }
        
        return isValid;
    }
    
    highlightField(field, isValid) {
        field.classList.remove('border-red-500', 'border-green-500');
        if (isValid) {
            field.classList.add('border-green-500');
        } else {
            field.classList.add('border-red-500');
        }
    }
    
    setLoading(isLoading) {
        if (!this.submitBtn) return;
        
        this.submitBtn.disabled = isLoading;
        
        if (isLoading) {
            this.submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            if (this.loadingSpinner) {
                this.loadingSpinner.classList.remove('hidden');
            }
            if (this.submitText) {
                this.submitText.textContent = this.getCurrentMessage('sending');
            }
        } else {
            this.submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            if (this.loadingSpinner) {
                this.loadingSpinner.classList.add('hidden');
            }
            if (this.submitText) {
                // Restore original text based on current language
                const currentLang = localStorage.getItem('language') || 'en';
                const originalText = currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message';
                this.submitText.textContent = originalText;
            }
        }
    }
    
    showSuccess() {
        this.showMessage(this.getCurrentMessage('success'), 'success');
        
        // Scroll to form status for better UX
        if (this.formStatus) {
            this.formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
      showError(message) {
        this.showMessage(message, 'error');
        
        // Scroll to form status for better UX
        if (this.formStatus) {
            this.formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    showErrorWithFallback() {
        const currentLang = localStorage.getItem('language') || 'en';
        const fallbackMessage = currentLang === 'es' 
            ? 'Error al enviar el formulario. Por favor, usa el enlace "Escríbeme directamente" más abajo.'
            : 'Error submitting form. Please use the "Email me directly" link below.';
        
        this.showError(fallbackMessage);
    }
      showMessage(message, type) {
        if (!this.formStatus) return;
        
        let bgClass, textClass, borderClass;
        if (type === 'success') {
            bgClass = 'bg-green-100';
            textClass = 'text-green-800';
            borderClass = 'border-green-200';
        } else if (type === 'info') {
            bgClass = 'bg-blue-100';
            textClass = 'text-blue-800';
            borderClass = 'border-blue-200';
        } else {
            bgClass = 'bg-red-100';
            textClass = 'text-red-800';
            borderClass = 'border-red-200';
        }
        
        this.formStatus.className = `form-status p-4 rounded-lg mb-4 ${bgClass} ${textClass} border ${borderClass}`;
        this.formStatus.textContent = message;
        this.formStatus.classList.remove('hidden');
        
        // Auto-hide after 5 seconds for info messages
        if (type === 'info') {
            setTimeout(() => {
                if (this.formStatus) {
                    this.formStatus.classList.add('hidden');
                }
            }, 5000);
        }
        
        // Announce to screen readers
        this.announceToScreenReader(message);
    }
    
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    getCurrentMessage(key) {
        const currentLang = localStorage.getItem('language') || 'en';
        return this.messages[currentLang]?.[key] || this.messages.en[key];
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormHandler();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactFormHandler;
}
