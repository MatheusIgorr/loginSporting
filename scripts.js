// Global variables
let currentImageIndex = 0;
let isLogin = true;
let showPassword = false;

const carImages = [
    {
        url: "https://cdn.imoveisgodoy.com.br/wp-content/uploads/2022/09/02125424/Porsche.webp",
        title: "Luxo Redefinido",
        subtitle: "Performance e elegância em cada detalhe"
    },
    {
        url: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Potência Suprema",
        subtitle: "Acelere seus sonhos com estilo"
    },
    {
        url: "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "Inovação Premium",
        subtitle: "Tecnologia de ponta ao seu alcance"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    startCarousel();
    setupFormValidation();
});

// Carousel functionality
function startCarousel() {
    setInterval(() => {
        nextImage();
    }, 4000);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % carImages.length;
    updateCarousel();
}

function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? carImages.length - 1 : currentImageIndex - 1;
    updateCarousel();
}

function setCurrentImage(index) {
    currentImageIndex = index;
    updateCarousel();
}

function updateCarousel() {
    // Update slides
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentImageIndex);
    });

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });

    // Update content
    const currentImage = carImages[currentImageIndex];
    document.getElementById('heroTitle').textContent = currentImage.title;
    document.getElementById('heroSubtitle').textContent = currentImage.subtitle;
}

// Form toggle functionality
function toggleForm() {
    isLogin = !isLogin;
    
    const formTitle = document.getElementById('formTitle');
    const toggleText = document.getElementById('toggleText');
    const toggleButton = document.getElementById('toggleButton');
    const submitButton = document.getElementById('submitButton');
    const dividerAction = document.getElementById('dividerAction');
    
    const nameFields = document.getElementById('nameFields');
    const phoneField = document.getElementById('phoneField');
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const loginOptions = document.getElementById('loginOptions');
    const termsField = document.getElementById('termsField');

    if (isLogin) {
        // Switch to login mode
        formTitle.textContent = 'Login';
        toggleText.textContent = 'Não tem uma conta? ';
        toggleButton.textContent = 'Criar conta';
        submitButton.textContent = 'Entrar';
        dividerAction.textContent = 'entre';
        
        // Hide registration fields
        nameFields.style.display = 'none';
        phoneField.style.display = 'none';
        confirmPasswordField.style.display = 'none';
        termsField.style.display = 'none';
        
        // Show login options
        loginOptions.style.display = 'flex';
        
        // Remove required attributes
        const registerFields = nameFields.querySelectorAll('input');
        registerFields.forEach(field => field.removeAttribute('required'));
        phoneField.querySelector('input').removeAttribute('required');
        confirmPasswordField.querySelector('input').removeAttribute('required');
        termsField.querySelector('input').removeAttribute('required');
        
    } else {
        // Switch to register mode
        formTitle.textContent = 'Criar conta';
        toggleText.textContent = 'Já tem uma conta? ';
        toggleButton.textContent = 'Fazer login';
        submitButton.textContent = 'Criar conta';
        dividerAction.textContent = 'registre-se';
        
        // Show registration fields
        nameFields.style.display = 'grid';
        phoneField.style.display = 'block';
        confirmPasswordField.style.display = 'block';
        termsField.style.display = 'block';
        
        // Hide login options
        loginOptions.style.display = 'none';
        
        // Add required attributes
        const registerFields = nameFields.querySelectorAll('input');
        registerFields.forEach(field => field.setAttribute('required', ''));
        phoneField.querySelector('input').setAttribute('required', '');
        confirmPasswordField.querySelector('input').setAttribute('required', '');
        termsField.querySelector('input').setAttribute('required', '');
    }
    
    // Add animation class
    document.querySelector('.form-container').classList.add('fade-in');
    setTimeout(() => {
        document.querySelector('.form-container').classList.remove('fade-in');
    }, 300);
}

// Password toggle functionality
function togglePassword() {
    showPassword = !showPassword;
    const passwordInput = document.getElementById('passwordInput');
    const passwordIcon = document.getElementById('passwordIcon');
    
    if (showPassword) {
        passwordInput.type = 'text';
        passwordIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        passwordIcon.className = 'fas fa-eye';
    }
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('loginForm');
    const inputs = form.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove previous error styling
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Email inválido');
            return false;
        }
    }
    
    // Password confirmation validation
    if (fieldName === 'confirmPassword' && value) {
        const passwordField = document.querySelector('input[name="password"]');
        if (value !== passwordField.value) {
            showFieldError(field, 'As senhas não coincidem');
            return false;
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Telefone inválido');
            return false;
        }
    }
    
    // Clear error if validation passes
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.2)';
    
    // You could add error message display here
    field.title = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    field.style.boxShadow = '';
    field.title = '';
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    const inputs = form.querySelectorAll('.form-input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Por favor, corrija os erros no formulário', 'error');
        return;
    }
    
    // Check terms agreement for registration
    if (!isLogin) {
        const termsCheckbox = form.querySelector('input[name="agreeToTerms"]');
        if (!termsCheckbox.checked) {
            showNotification('Você deve concordar com os termos e condições', 'error');
            return;
        }
    }
    
    // Simulate form submission
    showNotification(isLogin ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!', 'success');
    console.log('Form submitted:', data);
    
    // Here you would typically send the data to your server
    // fetch('/api/auth/' + (isLogin ? 'login' : 'register'), {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Social login handlers
document.addEventListener('DOMContentLoaded', function() {
    const googleButton = document.querySelector('.google-button');
    const appleButton = document.querySelector('.apple-button');
    
    googleButton.addEventListener('click', function() {
        showNotification('Login com Google em desenvolvimento', 'info');
    });
    
    appleButton.addEventListener('click', function() {
        showNotification('Login com Apple em desenvolvimento', 'info');
    });
    
    // Forgot password handler
    const forgotPasswordButton = document.querySelector('.forgot-password');
    if (forgotPasswordButton) {
        forgotPasswordButton.addEventListener('click', function() {
            showNotification('Funcionalidade de recuperação de senha em desenvolvimento', 'info');
        });
    }
    
    // Back button handler
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            showNotification('Redirecionando para o site principal...', 'info');
        });
    }
});