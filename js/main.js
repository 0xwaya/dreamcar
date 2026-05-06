// ============================================
// Dream Car Auto Repair — JavaScript
// ============================================

(function () {
    'use strict';

    // ============================================
    // Scroll Reveal Animation (Intersection Observer)
    // ============================================

    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ============================================
    // Sticky Header on Scroll
    // ============================================

    const header = document.getElementById('header');
    let lastScrollTop = 0;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });

    // ============================================
    // Mobile Navigation Toggle
    // ============================================

    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.header__mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.hidden = isExpanded;

            // Prevent body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.hidden = true;
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.hidden = true;
                document.body.style.overflow = '';
                mobileToggle.focus();
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore empty hash or just "#"
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // ============================================
    // FAQ Accordion
    // ============================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
            });
        }
    });

    // ============================================
    // Contact Form Handling
    // ============================================

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitButton = contactForm.querySelector('.form-submit');

            // Disable submit button and show loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('btn-loading');
                submitButton.textContent = 'Sending...';
            }

            // Form will submit normally to Formspree
            // On success/error, Formspree will redirect or show message

            // Alternatively, for a custom AJAX submission:
            /*
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json'
              }
            })
            .then(response => {
              if (response.ok) {
                alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
                contactForm.reset();
              } else {
                alert('Oops! There was a problem sending your message. Please call us instead.');
              }
            })
            .catch(error => {
              alert('Oops! There was a problem sending your message. Please call us instead.');
            })
            .finally(() => {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('btn-loading');
                submitButton.textContent = 'Send Message';
              }
            });
            */
        });
    }

    // ============================================
    // Phone Number Click Tracking (Optional Analytics)
    // ============================================

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Track phone click with analytics (if available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call_click', {
                    'event_category': 'engagement',
                    'event_label': 'Phone: (513) 620-7006'
                });
            }

            // Or use custom analytics
            console.log('Phone link clicked:', link.href);
        });
    });

    // ============================================
    // Lazy Load Google Maps (Performance Optimization)
    // ============================================

    const mapContainer = document.getElementById('map-container');

    if (mapContainer) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = mapContainer.querySelector('iframe');

                    // Map is already loaded in HTML for better UX
                    // This is a placeholder for additional lazy loading logic if needed

                    mapObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '200px'
        });

        mapObserver.observe(mapContainer);
    }

    // ============================================
    // Gallery Lightbox (Simple Implementation)
    // ============================================

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
        <div class="lightbox__overlay"></div>
        <div class="lightbox__content">
          <img src="${img.src}" alt="${img.alt}">
          <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
        </div>
      `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Add styles dynamically
            const style = document.createElement('style');
            style.textContent = `
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .lightbox__overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          cursor: pointer;
        }
        .lightbox__content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          z-index: 1;
        }
        .lightbox__content img {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .lightbox__close {
          position: absolute;
          top: -50px;
          right: 0;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          border-radius: 50%;
          font-size: 2rem;
          line-height: 1;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .lightbox__close:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
            document.head.appendChild(style);

            // Close lightbox handlers
            const closeLightbox = () => {
                lightbox.remove();
                style.remove();
                document.body.style.overflow = '';
            };

            lightbox.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // ============================================
    // Form Input Validation Enhancement
    // ============================================

    const formInputs = document.querySelectorAll('.form-input, .form-textarea');

    formInputs.forEach(input => {
        // Show validation on blur
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = 'var(--color-error)';
            } else {
                input.style.borderColor = '';
            }
        });

        // Clear error styling on input
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });

        // Phone number formatting (US format)
        if (input.type === 'tel') {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');

                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = `(${value}`;
                    } else if (value.length <= 6) {
                        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                    } else {
                        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                    }
                }

                e.target.value = value;
            });
        }
    });

    // ============================================
    // Service Worker Registration (Optional PWA)
    // ============================================

    /*
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registered:', registration);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }
    */

    // ============================================
    // Console Welcome Message
    // ============================================

    console.log('%cDream Car Auto Repair', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
    console.log('%cQuality auto repair you can trust. Visit us at 5133 Montgomery Rd, Norwood, OH.', 'font-size: 14px; color: #1A2B4A;');
    console.log('%cCall us: (513) 620-7006', 'font-size: 14px; font-weight: bold; color: #10B981;');

})();
