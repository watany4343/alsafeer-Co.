// ================================
// Professional JavaScript for Alsafer Website
// ================================

$(document).ready(function() {
    'use strict';

    // Initialize all components
    initializeWebsite();
});

// ================================
// Main Initialization Function
// ================================

function initializeWebsite() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize buttons and interactions
    initializeButtons();
    
    // Initialize portfolio
    initializePortfolio();
    
    // Initialize forms
    initializeForms();
    
    // Initialize performance optimizations
    initializePerformance();
    
    // Initialize accessibility
    initializeAccessibility();
    
    console.log('Website initialized successfully');
}

// ================================
// Animation System
// ================================

function initializeAnimations() {
    // Initialize WOW.js for scroll animations
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        }).init();
    }

    // Smooth scrolling with easing
    $('a[href^="#"]').on('click', function(event) {
        var href = $(this).attr('href');
        var target = $(href);
        
        // التأكد من وجود العنصر المستهدف
        if (target.length && href !== '#') {
            event.preventDefault();
            
            // حساب الموقع مع مراعاة ارتفاع النافبار
            var navbarHeight = $('.navbar').outerHeight() || 70;
            var offset = target.offset().top - navbarHeight;
            
            // التنقل السلس
            $('html, body').stop().animate({
                scrollTop: offset
            }, {
                duration: 1000,
                easing: 'swing'
            });
            
            // تحديث النافبار النشط
            updateActiveNavigation($(this));
            
            // تسجيل عملية التنقل للتأكد
            console.log('Navigating to:', href, 'Target found:', target.length > 0);
            
            // إغلاق القائمة المحمولة إذا كانت مفتوحة
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-collapse').removeClass('show');
                $('.navbar-toggle').removeClass('active');
            }
        }
    });

    // Parallax effects
    if (typeof $.fn.stellar !== 'undefined') {
        $(window).stellar({
            responsive: true,
            parallaxBackgrounds: true,
            parallaxElements: true,
            horizontalScrolling: false,
            verticalOffset: 0
        });
    }

    // Carousel with enhanced controls
    $('.carousel').carousel({
        interval: 6000,
        pause: 'hover',
        wrap: true
    });

    // Add carousel controls
    $('.carousel-control').on('click', function() {
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 200);
    });
}

// ================================
// Navigation System
// ================================

function initializeNavigation() {
    // Navbar scroll effect with smooth transitions
    var navbar = $('.navbar');
    var lastScrollTop = 0;
    
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        
        // Add/remove fixed class
        if (scrollTop > 50) {
            navbar.addClass('fixed-to-top');
        } else {
            navbar.removeClass('fixed-to-top');
        }
        
        // Hide/show navbar on scroll (mobile)
        if ($(window).width() < 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.addClass('navbar-hidden');
            } else {
                navbar.removeClass('navbar-hidden');
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation based on scroll position
        updateActiveNavigationOnScroll();
    });

    // Mobile menu with enhanced interactions
    $('.navbar-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.navbar-collapse').toggleClass('show');
        
        // Add animation to menu items
        $('.navbar-nav li').each(function(index) {
            $(this).css({
                'animation-delay': (index * 0.1) + 's'
            });
        });
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-toggle').removeClass('active');
            $('.navbar-collapse').removeClass('show');
        }
    });

    // Enhanced navigation item interactions
    $('.navbar-nav a').on('click', function() {
        // Add ripple effect
        addRippleEffect($(this));
        
        // Close mobile menu
        if ($(window).width() < 768) {
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggle').removeClass('active');
        }
    });
}

// ================================
// Button System
// ================================

function initializeButtons() {
    // Enhanced button interactions
    $('.btn').on('click', function(e) {
        addRippleEffect($(this));
        addButtonLoadingState($(this));
    });

    // CTA buttons with special effects
    $('.cta-buttons .btn').on('mouseenter', function() {
        $(this).addClass('btn-hover');
    }).on('mouseleave', function() {
        $(this).removeClass('btn-hover');
    });

    // Back to top button with smooth animation
    var backToTop = $('.back-to-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn(300).addClass('visible');
        } else {
            backToTop.fadeOut(300).removeClass('visible');
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, {
            duration: 800,
            easing: 'easeInOutCubic'
        });
    });

    // Social media buttons with hover effects
    $('.social-link').on('mouseenter', function() {
        $(this).addClass('social-hover');
    }).on('mouseleave', function() {
        $(this).removeClass('social-hover');
    });

    // Contact buttons with enhanced functionality
    $('.contact-link').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        
        if (href.startsWith('tel:')) {
            // Add call animation
            $(this).addClass('calling');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        } else if (href.startsWith('mailto:')) {
            // Add email animation
            $(this).addClass('emailing');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
}

// ================================
// Portfolio System
// ================================

function initializePortfolio() {
    // Initialize portfolio grid
    if (typeof Grid !== 'undefined') {
        Grid.init();
    }

    // Enhanced product interactions
    $('.og-grid li a').on('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        $(this).closest('li').addClass('product-clicked');
        
        // Show purchase overlay with delay
        setTimeout(() => {
            showPurchaseOverlay();
        }, 300);
    });

    // Product hover effects
    $('.og-grid li').on('mouseenter', function() {
        $(this).addClass('product-hover');
    }).on('mouseleave', function() {
        $(this).removeClass('product-hover');
    });

    // Touch interactions for mobile
    if ('ontouchstart' in window) {
        $('.og-grid li').on('touchstart', function() {
            $(this).addClass('touch-active');
        }).on('touchend', function() {
            $(this).removeClass('touch-active');
        });
    }
}

// ================================
// Form System
// ================================

function initializeForms() {
    // Enhanced form validation
    $('form').on('submit', function(e) {
        var form = $(this);
        var isValid = validateForm(form);
        
        if (!isValid) {
            e.preventDefault();
            showFormError('يرجى ملء جميع الحقول المطلوبة');
            return false;
        }
        
        // Add loading state
        addFormLoadingState(form);
    });

    // Real-time form validation
    $('input, textarea').on('blur', function() {
        validateField($(this));
    }).on('input', function() {
        clearFieldError($(this));
    });

    // Enhanced input focus effects
    $('input, textarea').on('focus', function() {
        $(this).addClass('input-focused');
    }).on('blur', function() {
        $(this).removeClass('input-focused');
    });
}

// ================================
// Performance System
// ================================

function initializePerformance() {
    // Lazy loading for images
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Debounced scroll events
    var scrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Handle scroll events here
        }, 100);
    });

    // Preload critical images
    preloadImages([
        'img/logo/ALSAFFER.png',
        'img/about-img.jpg'
    ]);
}

// ================================
// Accessibility System
// ================================

function initializeAccessibility() {
    // Keyboard navigation
    $(document).on('keydown', function(e) {
        switch(e.key) {
            case 'Escape':
                hidePurchaseOverlay();
                $('.navbar-collapse').removeClass('show');
                break;
            case 'Tab':
                handleTabNavigation(e);
                break;
        }
    });

    // Focus management
    $('a, button, input, textarea').on('focus', function() {
        $(this).addClass('focused');
    }).on('blur', function() {
        $(this).removeClass('focused');
    });

    // Screen reader announcements
    $('.btn').on('click', function() {
        announceToScreenReader($(this).text() + ' تم النقر');
    });
}

// ================================
// Utility Functions
// ================================

function addRippleEffect(element) {
    var ripple = $('<span class="ripple"></span>');
    element.append(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addButtonLoadingState(button) {
    if (!button.hasClass('loading')) {
        var originalText = button.text();
        button.addClass('loading')
              .data('original-text', originalText)
              .html('<span class="loading-spinner"></span> جاري التحميل...');
        
        setTimeout(() => {
            button.removeClass('loading').text(originalText);
        }, 2000);
    }
}

function addFormLoadingState(form) {
    var submitBtn = form.find('button[type="submit"]');
    var originalText = submitBtn.text();
    
    submitBtn.addClass('loading')
             .data('original-text', originalText)
             .html('<span class="loading-spinner"></span> جاري الإرسال...');
}

function validateForm(form) {
    var isValid = true;
    form.find('input[required], textarea[required]').each(function() {
        if (!validateField($(this))) {
            isValid = false;
        }
    });
    return isValid;
}

function validateField(field) {
    var value = field.val().trim();
    var isValid = value.length > 0;
    
    if (!isValid) {
        field.addClass('error');
        showFieldError(field, 'هذا الحقل مطلوب');
    } else {
        field.removeClass('error');
        clearFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    var errorDiv = field.siblings('.field-error');
    if (errorDiv.length === 0) {
        errorDiv = $('<div class="field-error"></div>');
        field.after(errorDiv);
    }
    errorDiv.text(message).show();
}

function clearFieldError(field) {
    field.siblings('.field-error').hide();
}

function showFormError(message) {
    showMessage(message, 'error');
}

function updateActiveNavigation(link) {
    $('.navbar-nav li').removeClass('active');
    link.closest('li').addClass('active');
}

function updateActiveNavigationOnScroll() {
    var scrollTop = $(window).scrollTop();
    var navbarHeight = $('.navbar').outerHeight() || 70;
    
    // البحث في جميع الأقسام (div و section)
    var sections = $('#intro, section[id]');
    var currentSection = '';
    
    sections.each(function() {
        var section = $(this);
        var sectionTop = section.offset().top - navbarHeight - 50;
        var sectionBottom = sectionTop + section.height();
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            currentSection = section.attr('id');
        }
    });
    
    // تحديث النافبار النشط
    if (currentSection) {
        $('.navbar-nav li').removeClass('active');
        $('.navbar-nav a[href="#' + currentSection + '"]').closest('li').addClass('active');
    }
}

function showPurchaseOverlay() {
    $('#overlay').fadeIn(300);
    $('body').addClass('overlay-open');
    
    // Add entrance animation
    $('.overlay-content').addClass('overlay-entrance');
}

function hidePurchaseOverlay() {
    $('#overlay').fadeOut(300);
    $('body').removeClass('overlay-open');
    $('.overlay-content').removeClass('overlay-entrance');
}

function showMessage(message, type) {
    var alertClass = type === 'error' ? 'alert-danger' : 'alert-success';
    var alertHtml = `
        <div class="alert ${alertClass} alert-dismissible fade in" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            ${message}
        </div>
    `;
    
    $('.container').first().prepend(alertHtml);
    
    setTimeout(() => {
        $('.alert').fadeOut();
    }, 5000);
}

function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        var img = new Image();
        img.src = url;
    });
}

function announceToScreenReader(message) {
    var announcement = $('<div class="sr-only" aria-live="polite"></div>');
    $('body').append(announcement);
    announcement.text(message);
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

function handleTabNavigation(event) {
    // Handle tab navigation for custom components
    var focusedElement = document.activeElement;
    var tabbableElements = $('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    var currentIndex = tabbableElements.index(focusedElement);
    
    if (event.shiftKey) {
        // Shift + Tab
        if (currentIndex === 0) {
            event.preventDefault();
            tabbableElements.last().focus();
        }
    } else {
        // Tab
        if (currentIndex === tabbableElements.length - 1) {
            event.preventDefault();
            tabbableElements.first().focus();
        }
    }
}

// ================================
// Mobile-specific functions
// ================================

function isMobile() {
    return window.innerWidth <= 768;
}

function handleMobileMenu() {
    if (isMobile()) {
        $('.navbar-nav').addClass('mobile-nav');
    } else {
        $('.navbar-nav').removeClass('mobile-nav');
    }
}

// ================================
// Performance optimization functions
// ================================

function debounce(func, wait, immediate) {
    var timeout;
    return function executedFunction() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    var inThrottle;
    return function() {
        var args = arguments;
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ================================
// Event listeners for window events
// ================================

$(window).on('resize', debounce(function() {
    handleMobileMenu();
}, 250));

$(window).on('orientationchange', function() {
    setTimeout(function() {
        handleMobileMenu();
    }, 100);
});

// Smooth scroll for navbar links only (محسّن)
$(document).ready(function() {
  $('.navbar-nav a').on('click', function(event) {
    var href = $(this).attr('href');
    if (href && href.startsWith('#') && href.length > 1) {
      var target = $(href);
      if (target.length) {
        event.preventDefault();
        var navHeight = $('.navbar').outerHeight() || 64;
        var scrollTo = target.offset().top - navHeight + 1;
        $('html, body').stop().animate({
          scrollTop: scrollTo
        }, 700, 'swing');
        // إبراز العنصر النشط
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        // إغلاق القائمة في الموبايل
        if ($(window).width() < 992) {
          $('.navbar-collapse').removeClass('show');
          $('.navbar-toggle').removeClass('active');
        }
      }
    }
  });
});

// Modern Product Modal Logic
$(document).ready(function() {
  // فتح نافذة التفاصيل عند الضغط على زر التفاصيل فقط
  $(document).on('click', '.btn-details', function(e) {
    e.stopPropagation();
    var card = $(this).closest('.modern-product-card');
    var modal = $('#modernProductModal');
    modal.find('.modern-modal-img').attr('src', card.data('img'));
    modal.find('.modern-modal-title').text(card.data('title'));
    modal.find('.modern-modal-desc').text(card.data('desc'));
    modal.fadeIn(200);
    $('body').addClass('overlay-open');
  });

  // إغلاق النافذة عند الضغط على زر الإغلاق أو خارج المحتوى
  $(document).on('click', '.modern-modal-close', function() {
    $('#modernProductModal').fadeOut(200);
    $('body').removeClass('overlay-open');
  });
  $(document).on('click', '#modernProductModal', function(e) {
    if ($(e.target).is('#modernProductModal')) {
      $('#modernProductModal').fadeOut(200);
      $('body').removeClass('overlay-open');
    }
  });
  // منع تمرير الصفحة عند فتح النافذة
  var originalOverflow = $('body').css('overflow');
  $('#modernProductModal').on('show', function() {
    $('body').css('overflow', 'hidden');
  }).on('hide', function() {
    $('body').css('overflow', originalOverflow);
  });
});

// ================================
// Initialize everything when DOM is ready
// ================================

$(document).ready(function() {
    // Set up focus trap for overlay
    setFocusTrap($('#overlay'));
    
    // Handle mobile menu
    handleMobileMenu();
    
    // Save user preferences
    var userPreferences = {
        language: 'ar',
        theme: 'default',
        lastVisit: new Date().toISOString()
    };
    saveToLocalStorage('userPreferences', userPreferences);
    
    // Track page views
    var pageViews = getFromLocalStorage('pageViews') || 0;
    pageViews++;
    saveToLocalStorage('pageViews', pageViews);
    
    console.log('Website initialized successfully');
});

// ================================
// Legacy functions for compatibility
// ================================

function setFocusTrap(element) {
    var focusableElements = element.find('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    var firstElement = focusableElements.first();
    var lastElement = focusableElements.last();

    element.on('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement[0]) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement[0]) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone);
}

function loadImage(img) {
    return new Promise((resolve, reject) => {
        if (img.complete) {
            resolve(img);
        } else {
            img.onload = () => resolve(img);
            img.onerror = reject;
        }
    });
}

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}
