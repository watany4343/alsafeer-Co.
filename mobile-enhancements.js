// تحسينات JavaScript للهواتف المحمولة والتنقل السلس

(function() {
    'use strict';

    // إعدادات عامة
    const config = {
        scrollOffset: 80,
        animationDuration: 600,
        debounceDelay: 100
    };

    // تهيئة التطبيق عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        initMobileEnhancements();
        initSmoothScrolling();
        initNavigationHighlight();
        initLazyLoading();
        initTouchGestures();
        initProgressBar();
        initModalEnhancements();
    });

    // تحسينات الهواتف المحمولة
    function initMobileEnhancements() {
        // إضافة فئة للكشف عن الأجهزة المحمولة
        if (isMobileDevice()) {
            document.body.classList.add('mobile-device');
        }

        // تحسين شريط التنقل للهواتف
        const navbar = document.querySelector('.navbar');
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggle && navbarCollapse) {
            navbarToggle.addEventListener('click', function() {
                setTimeout(() => {
                    if (navbarCollapse.classList.contains('in')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }, 100);
            });

            // إغلاق القائمة عند النقر على رابط
            const navLinks = document.querySelectorAll('.navbar-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth < 768) {
                        navbarToggle.click();
                        document.body.style.overflow = '';
                    }
                });
            });
        }

        // تحسين الأداء للتمرير
        let ticking = false;
        function updateScrollEffects() {
            const scrollY = window.pageYOffset;
            
            if (navbar) {
                if (scrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    // التمرير السلس المحسن
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const targetPosition = targetElement.offsetTop - config.scrollOffset;
                    
                    smoothScrollTo(targetPosition, config.animationDuration);
                }
            });
        });
    }

    // دالة التمرير السلس المخصصة
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    // دالة التحريك السلس
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // تمييز القسم النشط في التنقل
    function initNavigationHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        let ticking = false;
        
        function updateActiveSection() {
            const scrollY = window.pageYOffset + config.scrollOffset + 50;
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                
                link.parentElement.classList.remove('current');
                if (targetId === currentSection) {
                    link.parentElement.classList.add('current');
                }
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        });
    }

    // تحميل الصور البطيء (Lazy Loading)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback للمتصفحات القديمة
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    // إيماءات اللمس للهواتف
    function initTouchGestures() {
        let startX, startY, distX, distY;
        const threshold = 100; // المسافة الدنيا للإيماءة
        const restraint = 100; // المسافة القصوى المسموحة في الاتجاه المعاكس
        
        document.addEventListener('touchstart', function(e) {
            const touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
        }, false);

        document.addEventListener('touchend', function(e) {
            const touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    // إيماءة يمين - إغلاق القائمة
                    const navbarCollapse = document.querySelector('.navbar-collapse.in');
                    if (navbarCollapse) {
                        document.querySelector('.navbar-toggle').click();
                    }
                } else {
                    // إيماءة يسار - فتح القائمة
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && !navbarCollapse.classList.contains('in')) {
                        document.querySelector('.navbar-toggle').click();
                    }
                }
            }
        }, false);
    }

    // شريط التقدم
    function initProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'loading-bar';
        document.body.appendChild(progressBar);

        function updateProgressBar() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        }

        window.addEventListener('scroll', debounce(updateProgressBar, config.debounceDelay));
    }

    // تحسينات النوافذ المنبثقة
    function initModalEnhancements() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            modal.addEventListener('show.bs.modal', function() {
                document.body.style.overflow = 'hidden';
            });
            
            modal.addEventListener('hide.bs.modal', function() {
                document.body.style.overflow = '';
            });
        });
    }

    // إضافة تأثيرات الظهور عند التمرير
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(el => animationObserver.observe(el));
        } else {
            elements.forEach(el => el.classList.add('visible'));
        }
    }

    // دوال مساعدة
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // تحسين الأداء العام
    function optimizePerformance() {
        // تحسين الصور
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });

        // تحسين الخطوط
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    }

    // تهيئة التحسينات الإضافية
    window.addEventListener('load', function() {
        initScrollAnimations();
        optimizePerformance();
    });

    // معالجة تغيير حجم النافذة
    window.addEventListener('resize', debounce(function() {
        // إعادة حساب الأبعاد والمواضع
        if (window.innerWidth >= 768) {
            document.body.style.overflow = '';
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse) {
                navbarCollapse.classList.remove('in');
            }
        }
    }, config.debounceDelay));

})();
