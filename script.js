// ===================================
// Анимация появления блоков при скролле
// ===================================
function initScrollAnimation() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===================================
// Плавная прокрутка к якорям
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Обработка формы RSVP
// ===================================
function initForm() {
    const form = document.getElementById('weddingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбор данных формы
        const formData = {
            name: document.getElementById('name').value,
            attendance: document.getElementById('attendance').value,
            companion: document.getElementById('companion').value,
            food: document.getElementById('food').value,
            phone: document.getElementById('phone').value
        };
        
        // Валидация телефона
        const phoneRegex = /^[\d\+\-\(\)\s]{10,20}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }
        
        // Здесь можно добавить отправку данных на сервер
        // Например, через fetch() или отправка в Telegram бота
        console.log('Данные формы:', formData);
        
        // Показываем сообщение об успехе
        form.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Прокрутка к сообщению
        setTimeout(() => {
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    });
}

// ===================================
// Маска для телефона
// ===================================
function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }
            
            let formattedValue = '+7';
            if (value.length > 0) formattedValue += ' (' + value.substring(0, 3);
            if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
            if (value.length > 6) formattedValue += '-' + value.substring(6, 8);
            if (value.length > 8) formattedValue += '-' + value.substring(8, 10);
            
            e.target.value = formattedValue;
        }
    });
}

// ===================================
// Инициализация
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimation();
    initSmoothScroll();
    initForm();
    initPhoneMask();
    
    // Показываем первый блок сразу
    setTimeout(() => {
        document.querySelector('.section')?.classList.add('visible');
    }, 500);
});
