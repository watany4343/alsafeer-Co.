// سكريبت المتجر المحسن والموحد

(function() {
    'use strict';

    // بيانات المنتجات
    const products = {
        1: {
            title: "مضخات عمودية ذاتية التحضير",
            image: "img/works/1.jpg",
            description: "مضخات بعمود مكشوف ذاتية التحضير لربطها بأي نوع من محركات الديزل أو البنزين أو الخليط أو المحرك الكهربائي عن طريق اقتران مرن. توفر هذه المضخات معدل تدفق مرتفع برؤوس منخفضة إلى متوسطة. مناسب للمياه الصلبة النظيفة أو المتسخة أو العالقة. مناسب للري والتفريغ وإمدادات المياه. تسمح الإصدارات المختلفة المتاحة أيضًا باستخدام السوائل المسببة للتآكل."
        },
        2: {
            title: "سلسلة DG",
            image: "img/works/2.jpg",
            description: "تم تصميم سلسلة DG لتحريك المكونات الكاشطة المعلقة وخلطها مثل الرمل / الحصى والأحجار والحطام المماثلة ثم نقلها عبر مسافات كبيرة، وهي مثالية لمجموعة واسعة من عمليات التجريف واستخراج المعادن والتنظيف الصناعي."
        },
        3: {
            title: "سلسلة الصرف",
            image: "img/works/3.jpg",
            description: "مضخات كهربائية غاطسة مناسبة لرفع المياه النقية والقذرة. تستخدم بشكل خاص في مواقع البناء ولضخ السوائل الكاشطة. بفضل قدرتهم على المناورة يمكن نقلهم بسهولة من موقع إلى آخر."
        },
        4: {
            title: "مضخات مكافحة الحريق",
            image: "img/works/4.jpg",
            description: "تشمل مجموعتنا الكاملة من حلول الحماية من الحرائق ما يلي: مضخات حريق تعمل بالكهرباء والديزل بتكوين أفقي، ومضخات منقسمة، ومضخات بتكوين رأسي. متوفرة كوحدات مضخة فردية أو كنظم كاملة بكابينة أو بدونها. تم تصميمها وتصنيعها وتجميعها من قبل فريقنا لتلبية المتطلبات المحددة لأي تطبيق حريق."
        },
        5: {
            title: "مضخات سحب ودفع المياه",
            image: "img/works/5.jpg",
            description: "مضخات لسحب ودفع المياه الزراعية والنظيفة. تستخدم لتنظيف الشوارع والإطفاء. فرنسية المنشأ وبجودة عالية جداً ومختلف الأحجام والأنواع والقياسات. تعمل بنظام الربط الكاردن PTO لسيارات التنكر والإطفاء."
        },
        6: {
            title: "فاكيومات إيطالية",
            image: "img/works/6.jpg",
            description: "فاكيومات إيطالية المنشأ تستخدم لسحب مياه الأمطار ومياه أسنة المجاري بكافة الأحجام والموديلات. تتميز بالجودة العالية والكفاءة المتميزة في العمل."
        },
        7: {
            title: "مضخات التنكر",
            image: "img/works/7.jpg",
            description: "تستخدم هذه المضخات لدفع المياه النظيفة بواسطة سيارات التنكر وتربط بواسطة الكاردن PTO. مصممة خصيصاً للاستخدام مع المركبات الثقيلة."
        },
        8: {
            title: "مضخات متخصصة",
            image: "img/works/8.jpg",
            description: "مضخات متخصصة للاستخدامات الصناعية المتنوعة. تستخدم لدفع المياه النظيفة بواسطة سيارات التنكر وتربط بواسطة الكاردن PTO."
        }
    };

    // تهيئة المتجر عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        initPortfolio();
        initModal();
        initScrollAnimations();
    });

    // تهيئة المتجر
    function initPortfolio() {
        // إضافة مستمعات الأحداث لأزرار عرض التفاصيل
        const detailButtons = document.querySelectorAll('.btn-view-details');
        detailButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const productId = this.getAttribute('data-product');
                showProductDetails(productId);
            });
        });

        // إضافة تأثيرات التفاعل للبطاقات
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards.forEach(card => {
            // تأثير ثلاثي الأبعاد عند حركة الماوس
            card.addEventListener('mousemove', function(e) {
                if (isMobileDevice()) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });

            // تأثير النقر
            card.addEventListener('click', function() {
                const button = this.querySelector('.btn-view-details');
                if (button) {
                    button.click();
                }
            });
        });

        // تأثير Ripple عند النقر
        addRippleEffect();
    }

    // عرض تفاصيل المنتج
    function showProductDetails(productId) {
        const product = products[productId];
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const modalImage = document.getElementById('modal-product-image');
        const modalTitle = document.getElementById('modal-product-title');
        const modalDescription = document.getElementById('modal-product-description');

        modalImage.src = product.image;
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;

        // إظهار النافذة مع تأثير
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // منع التمرير في الخلفية
        document.body.style.overflow = 'hidden';

        // إضافة تحليلات (اختيارية)
        trackProductView(productId, product.title);
    }

    // تهيئة النافذة المنبثقة
    function initModal() {
        const modal = document.getElementById('product-modal');
        const closeBtn = document.querySelector('.modal-close');
        const telegramBtn = document.querySelector('.btn-contact-telegram');
        const whatsappBtn = document.querySelector('.btn-contact-whatsapp');

        // إغلاق النافذة
        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }

        // مستمعات إغلاق النافذة
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // أزرار التواصل
        telegramBtn.addEventListener('click', function() {
            const productTitle = document.getElementById('modal-product-title').textContent;
            const message = `مرحباً، أود الاستفسار عن المنتج: ${productTitle}`;
            const telegramUrl = `https://t.me/your_telegram_username?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
            
            trackContactClick('telegram', productTitle);
        });

        whatsappBtn.addEventListener('click', function() {
            const productTitle = document.getElementById('modal-product-title').textContent;
            const message = `مرحباً، أود الاستفسار عن المنتج: ${productTitle}`;
            const whatsappUrl = `https://wa.me/your_phone_number?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            trackContactClick('whatsapp', productTitle);
        });
    }

    // تهيئة رسوم التمرير المتحركة
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // تأثير متتالي للعناصر
                    if (entry.target.classList.contains('portfolio-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0)';
                            entry.target.style.opacity = '1';
                        }, delay);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // مراقبة العناصر
        const elementsToAnimate = document.querySelectorAll('.portfolio-item, .purchase-notice, .section-heading');
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    // إضافة تأثير Ripple
    function addRippleEffect() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple-effect {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // إضافة تأثير للأزرار والبطاقات
        const clickableElements = document.querySelectorAll('.btn-view-details, .portfolio-card');
        clickableElements.forEach(element => {
            element.classList.add('ripple-effect');
            
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // تحسين الأداء للأجهزة المحمولة
    function optimizeForMobile() {
        if (isMobileDevice()) {
            // تقليل الرسوم المتحركة للهواتف
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .portfolio-card {
                        transition: transform 0.2s ease, box-shadow 0.2s ease;
                    }
                    
                    .portfolio-card:hover {
                        transform: translateY(-5px);
                    }
                    
                    .portfolio-image img {
                        transition: transform 0.2s ease;
                    }
                    
                    .portfolio-card:hover .portfolio-image img {
                        transform: scale(1.05);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // دوال مساعدة
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function trackProductView(productId, productTitle) {
        // تحليلات المنتج (يمكن ربطها بـ Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                'item_id': productId,
                'item_name': productTitle,
                'item_category': 'مضخات ومحركات'
            });
        }
        
        console.log(`Product viewed: ${productTitle} (ID: ${productId})`);
    }

    function trackContactClick(platform, productTitle) {
        // تحليلات التواصل
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_click', {
                'platform': platform,
                'product': productTitle
            });
        }
        
        console.log(`Contact clicked: ${platform} for ${productTitle}`);
    }

    // تهيئة التحسينات عند التحميل
    window.addEventListener('load', function() {
        optimizeForMobile();
        
        // إضافة مؤشر التحميل النهائي
        setTimeout(() => {
            document.body.classList.add('portfolio-loaded');
        }, 500);
    });

    // تصدير الدوال للاستخدام الخارجي
    window.PortfolioManager = {
        showProductDetails: showProductDetails,
        products: products
    };

})();
