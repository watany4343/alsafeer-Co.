// ميزات إبداعية لتحسين تجربة المستخدم

(function() {
    'use strict';

    // تهيئة الميزات الإبداعية عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        initCreativeFeatures();
        initCursorTrail();
        initReadingProgress();
        initSmartNavigation();
        initParticleBackground();
        initTypewriterEffect();
        initScrollAnimations();
        initHoverEffects();
    });

    // تهيئة الميزات الإبداعية الرئيسية
    function initCreativeFeatures() {
        // إضافة فئة للجسم للكشف عن الأجهزة التفاعلية
        if (!isMobileDevice()) {
            document.body.classList.add('desktop-device');
        }

        // إضافة تأثير الموج للخلفية
        addWaveBackground();
        
        // إضافة التأثيرات للبطاقات
        enhanceCards();
        
        // إضافة التأثيرات للأزرار
        enhanceButtons();
    }

    // مؤثر الماوس المتتبع
    function initCursorTrail() {
        if (isMobileDevice()) return;

        const trails = [];
        const trailCount = 5;

        // إنشاء عناصر المؤثر
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            trails.push({
                element: trail,
                x: 0,
                y: 0,
                delay: i * 50
            });
        }

        let mouseX = 0, mouseY = 0;

        // تتبع حركة الماوس
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // تحديث مواضع المؤثرات
        function updateTrails() {
            trails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.x += (mouseX - trail.x) * 0.1;
                    trail.y += (mouseY - trail.y) * 0.1;
                    
                    trail.element.style.left = trail.x + 'px';
                    trail.element.style.top = trail.y + 'px';
                    trail.element.style.opacity = 1 - (index * 0.2);
                    trail.element.classList.add('active');
                }, trail.delay);
            });
            requestAnimationFrame(updateTrails);
        }

        updateTrails();
    }

    // شريط تقدم القراءة
    function initReadingProgress() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'reading-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        function updateReadingProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min(scrollTop / docHeight, 1);
            
            progressBar.style.width = (scrollPercent * 100) + '%';
        }

        window.addEventListener('scroll', debounce(updateReadingProgress, 10));
    }

    // التنقل الذكي
    function initSmartNavigation() {
        const nav = document.createElement('nav');
        nav.className = 'smart-navigation';
        
        const ul = document.createElement('ul');
        const sections = ['intro', 'about', 'services', 'portfolio', 'team', 'contact'];
        
        sections.forEach(section => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${section}`;
            a.setAttribute('data-section', section);
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        nav.appendChild(ul);
        document.body.appendChild(nav);

        // إظهار/إخفاء التنقل الذكي
        let scrollTimer;
        window.addEventListener('scroll', function() {
            nav.classList.add('visible');
            
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                if (window.pageYOffset < 200) {
                    nav.classList.remove('visible');
                }
            }, 2000);
            
            updateActiveSection();
        });

        // تحديث القسم النشط
        function updateActiveSection() {
            const scrollY = window.pageYOffset + 100;
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                const navLink = nav.querySelector(`a[data-section="${sectionId}"]`);
                
                if (section && navLink) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        nav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }

        // تمرير سلس عند النقر
        nav.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    smoothScrollTo(targetElement.offsetTop - 80, 800);
                }
            }
        });
    }

    // خلفية الجسيمات
    function initParticleBackground() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-bg';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (20 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }

    // تأثير الكتابة المتحركة
    function initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            let index = 0;
            function typeWriter() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    element.style.width = (index + 1) * 0.6 + 'em';
                    index++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // بدء التأثير عند ظهور العنصر
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // تأثيرات التمرير المتقدمة
    function initScrollAnimations() {
        const parallaxElements = document.querySelectorAll('.parallax-card');
        
        function updateParallax() {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const speed = 0.05 + (index * 0.01);
                const yPos = -(scrollY * speed);
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }
        
        window.addEventListener('scroll', debounce(updateParallax, 10));
    }

    // تحسين تأثيرات الهوفر
    function initHoverEffects() {
        // إضافة تأثير الضوء للأزرار
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.classList.contains('btn-glow')) {
                btn.classList.add('btn-glow');
            }
        });

        // إضافة تأثير النبضات للأيقونات
        document.querySelectorAll('.fa, .icon').forEach(icon => {
            icon.classList.add('pulse-icon');
        });

        // إضافة تأثير الهولوجرام للبطاقات
        document.querySelectorAll('.card, .service-item, .portfolio-item').forEach(card => {
            card.classList.add('hologram-card');
        });
    }

    // إضافة تأثير الموج للخلفية
    function addWaveBackground() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                section.classList.add('wave-bg');
            }
        });
    }

    // تحسين البطاقات
    function enhanceCards() {
        const cards = document.querySelectorAll('.og-grid li, .service-item, .team-member');
        
        cards.forEach(card => {
            card.classList.add('parallax-card');
            
            // إضافة تأثير ثلاثي الأبعاد
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // تحسين الأزرار
    function enhanceButtons() {
        const buttons = document.querySelectorAll('.btn, button, a[class*="btn"]');
        
        buttons.forEach(btn => {
            // إضافة تأثير الموج عند النقر
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // إضافة CSS للتأثير
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleAnimation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // دوال مساعدة
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // إضافة مستمعات إضافية للتحسينات
    window.addEventListener('load', function() {
        // تأخير تحميل الميزات الثقيلة
        setTimeout(() => {
            document.body.classList.add('features-loaded');
        }, 1000);
    });

    // تحسين الأداء عند تغيير حجم النافذة
    window.addEventListener('resize', debounce(function() {
        // إعادة حساب المواضع والأحجام
        const smartNav = document.querySelector('.smart-navigation');
        if (smartNav && window.innerWidth < 768) {
            smartNav.style.display = 'none';
        } else if (smartNav) {
            smartNav.style.display = 'block';
        }
    }, 250));

})();
