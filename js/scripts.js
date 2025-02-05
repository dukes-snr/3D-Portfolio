// Add any JavaScript functionality here 

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-container');
    const content = document.querySelector('.content');
    const loaderNumber = document.querySelector('.loader-number');
    let progress = 0;

    // Enhanced loading progress
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 100) progress = 100;
        
        loaderNumber.textContent = progress.toString().padStart(2, '0');
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                content.classList.remove('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
    }, 50);

       // Create a promise for each Spline viewer to load
    //    const splineLoaders = Array.from(document.querySelectorAll('spline-viewer')).map(viewer => {
    //     return new Promise((resolve) => {
    //         viewer.addEventListener('load', () => resolve());
    //         // Add timeout fallback in case spline fails to load
    //         setTimeout(resolve, 10000); // 10 second timeout
    //     });
    // });

    // // Create promises for all images
    // const imageLoaders = Array.from(document.querySelectorAll('img')).map(img => {
    //     return new Promise((resolve) => {
    //         if (img.complete) {
    //             resolve();
    //         } else {
    //             img.onload = () => resolve();
    //             img.onerror = () => resolve(); // Resolve even on error to prevent loader from hanging
    //         }
    //     });
    // });

    // // Combine all loading promises
    // const allLoaders = [...splineLoaders, ...imageLoaders];
    // let loadedItems = 0;

    // // Update progress as items load
    // allLoaders.forEach(loader => {
    //     loader.then(() => {
    //         loadedItems++;
    //         progress = Math.floor((loadedItems / allLoaders.length) * 100);
    //         loaderNumber.textContent = progress.toString().padStart(2, '0');
            
    //         // When everything is loaded, complete the loader animation
    //         if (loadedItems === allLoaders.length) {
    //             setTimeout(() => {
    //                 loader.style.opacity = '0';
    //                 loader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    //                 content.classList.remove('hidden');
    //                 setTimeout(() => {
    //                     loader.style.display = 'none';
    //                 }, 800);
    //             }, 500);
    //         }
    //     });
    // });

    // // Add a maximum loading time of 15 seconds
    // setTimeout(() => {
    //     if (loader.style.display !== 'none') {
    //         loader.style.opacity = '0';
    //         loader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    //         content.classList.remove('hidden');
    //         setTimeout(() => {
    //             loader.style.display = 'none';
    //         }, 800);
    //     }
    // }, 15000);

    // Enhanced Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stagger-children')) {
                    entry.target.querySelectorAll('*').forEach(child => {
                        child.classList.add('visible');
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add animation classes to elements
    document.querySelectorAll('.content-item').forEach(item => {
        item.classList.add('fade-up');
        animationObserver.observe(item);
    });

    document.querySelectorAll('.project-info').forEach(info => {
        info.classList.add('slide-in');
        animationObserver.observe(info);
    });

    document.querySelectorAll('.project-gallery').forEach(gallery => {
        gallery.classList.add('stagger-children');
        animationObserver.observe(gallery);
    });

    document.querySelectorAll('.detail-section').forEach(section => {
        section.classList.add('fade-up');
        animationObserver.observe(section);
    });

    // Enhanced mobile menu animation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        navLinks.classList.toggle('active');
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        
        // Animate menu icon
        mobileMenuBtn.classList.toggle('active');
    });

    // Smooth scroll with dynamic offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (menuOpen) {
                menuOpen = false;
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Parallax effect with performance optimization
    let ticking = false;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Enhanced image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Show images that are already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
        
        // Add loaded class when images load
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });

        // Handle errors gracefully
        img.addEventListener('error', () => {
            img.classList.add('loaded');
            img.src = 'assets/images/placeholder.jpg'; // Add a placeholder image
        });
    });

    // Handle form submissions with animation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        });
    }

    // Add this after the existing animation observer code
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to the section
                entry.target.classList.add('section-visible');
                
                // Find and animate all animatable elements within the section
                const animatableElements = entry.target.querySelectorAll('.fade-up, .fade-in, .slide-in');
                animatableElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, index * 100); // Stagger the animations
                });

                // Handle stagger children containers
                const staggerContainers = entry.target.querySelectorAll('.stagger-children');
                staggerContainers.forEach(container => {
                    container.classList.add('visible');
                });

                // Unobserve after animation
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: '-50px'
    });

    // Add animation classes to sections and observe them
    document.querySelectorAll('section').forEach(section => {
        // Add animation classes to section elements
        section.querySelectorAll('h1, h2, h3, p, .btn, .content-item, .portfolio-item, .process-step, .skill-category, .stat').forEach(el => {
            el.classList.add('fade-up');
        });

        section.querySelectorAll('.portfolio-grid, .skills-grid, .process-steps').forEach(grid => {
            grid.classList.add('stagger-children');
        });

        // Observe the section
        sectionObserver.observe(section);
    });

    // Cache DOM elements
    const sections = document.querySelectorAll('section');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const processSteps = document.querySelectorAll('.process-step');
});

// Performance optimization
const optimizePerformance = () => {
    // Debounce scroll events
    let scrollTimeout;
    const scrollHandler = () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Optimize scroll animations
            sections.forEach(section => {
                if (isInViewport(section) && !section.classList.contains('section-visible')) {
                    section.classList.add('section-visible');
                }
            });
        });
    };

    // Use passive scroll listener
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Optimize image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
};

// Initialize optimizations
optimizePerformance(); 