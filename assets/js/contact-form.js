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
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.checkUrlParams();
        }
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
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccess();
                this.form.reset();
            } else {
                const data = await response.json();
                this.showError(data.error || this.getCurrentMessage('error'));
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(this.getCurrentMessage('networkError'));
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
    
    showMessage(message, type) {
        if (!this.formStatus) return;
        
        this.formStatus.className = `form-status p-4 rounded-lg mb-4 ${type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`;
        this.formStatus.textContent = message;
        this.formStatus.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (this.formStatus) {
                this.formStatus.classList.add('hidden');
            }
        }, 5000);
        
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
