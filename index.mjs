import { animate, scroll, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

$(document).ready(function() {
    // Initialize page with fade in
    setTimeout(() => {
        $("#body").css("opacity", "1");
    }, 100);

    // Update current year in footer
    $("#current-year").text(new Date().getFullYear());
    
    // Animate hero content on load
    setTimeout(() => {
        $(".hero-content").css({
            "opacity": "1",
            "transform": "translateY(0)"
        });
        
        setTimeout(() => {
            $(".hero-image").css({
                "opacity": "1",
                "transform": "translateY(0)"
            });
        }, 300);
    }, 300);
    
    // Navbar functionality
    const $navbar = $("#navbar");
    const $hamburger = $(".hamburger");
    const $navLinks = $(".nav-links");
    
    // Add scrolled class to navbar on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $("#header").removeClass("py-8").addClass("py-4 bg-white shadow-md");
        } else {
            $("#header").removeClass("py-4 bg-white shadow-md").addClass("py-8");
        }
    });
    
    // Mobile menu toggle
    $hamburger.on("click", function() {
        $(this).toggleClass("active");
        
        if ($(this).hasClass("active")) {
            // Open menu
            $navLinks.css({
                display: "flex",
                position: "fixed",
                top: 0,
                right: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "white",
                flexDirection: "column",
                justifyContent: "center",
                zIndex: 999
            });
            
            // Animate hamburger icon
            $(this).find("span").eq(0).css({
                transform: "translateY(9px) rotate(45deg)"
            });
            
            $(this).find("span").eq(1).css({
                opacity: 0
            });
            
            $(this).find("span").eq(2).css({
                transform: "translateY(-9px) rotate(-45deg)"
            });
            
            $navLinks.animate({right: "0%"}, 300);
            $("body").addClass("overflow-hidden");
        } else {
            // Close menu
            $navLinks.animate({right: "100%"}, 300, function() {
                $(this).css("display", "none");
            });
            
            $("body").removeClass("overflow-hidden");
            
            // Reset hamburger icon
            $(this).find("span").eq(0).css({
                transform: "translateY(0) rotate(0)"
            });
            
            $(this).find("span").eq(1).css({
                opacity: 1
            });
            
            $(this).find("span").eq(2).css({
                transform: "translateY(0) rotate(0)"
            });
        }
    });
    
    // Close mobile menu when clicking on a link
    $(".nav-links a").click(function() {
        if ($hamburger.hasClass("active")) {
            $hamburger.removeClass("active");
            
            $navLinks.animate({right: "100%"}, 300, function() {
                $(this).css("display", "none");
            });
            
            $("body").removeClass("overflow-hidden");
            
            // Reset hamburger icon
            $hamburger.find("span").eq(0).css({
                transform: "translateY(0) rotate(0)"
            });
            
            $hamburger.find("span").eq(1).css({
                opacity: 1
            });
            
            $hamburger.find("span").eq(2).css({
                transform: "translateY(0) rotate(0)"
            });
        }
    });
    
    // Scroll indicator click event
    $(".scroll-indicator").click(function() {
        const aboutSection = document.getElementById('about');
        $('html, body').animate({
            scrollTop: $(aboutSection).offset().top - 80
        }, 800, 'easeInOutCubic');
    });
    
    // Typewriter effect
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = ['Entrepreneur', 'Sales Professional', 'Digital Marketer', 'Business Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end of typing
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing the next phrase
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start the typewriter effect
    typeWriter();
    
    // Animate sections when they come into view
    inView("section", ({ target }) => {
        target.classList.add("animate");
        
        // Animate timeline items if in the experience section
        if (target.id === "experience") {
            animateTimelineItems($("#experience-timeline"));
        }
        
        return () => {};
    });
    
    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        $(".scroll-progress").css("width", scrollPercent + "%");
    }
    
    $(window).on("scroll", updateScrollProgress);
    updateScrollProgress(); // Initialize on page load
    
    // Portfolio filter
    $(".filter-btn").click(function() {
        // Remove active class from all buttons
        $(".filter-btn").removeClass("bg-primary text-white shadow-md").addClass("bg-transparent text-gray border border-gray-light");
        
        // Add active class to clicked button
        $(this).removeClass("bg-transparent text-gray border border-gray-light").addClass("bg-primary text-white shadow-md");

        const filterValue = $(this).attr("data-filter");
        
        // If all filter, just show all items
        if (filterValue === "all") {
            $(".portfolio-item").show();
            return;
        }
        
        // Hide all items first
        $(".portfolio-item").each(function() {
            if ($(this).attr("data-category") === filterValue) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    
    // Timeline tabs
    function initTimelineTabs() {
        // Show experience timeline on initial load
        $("#experience-timeline").show();
        $("#education-timeline").hide();
        
        // Animate the initial timeline
        animateTimelineItems($("#experience-timeline"));
        
        $(".timeline-tab").click(function() {
            // Add/remove active class styling
            $(".timeline-tab").removeClass("bg-primary text-white shadow-md").addClass("bg-transparent text-gray border border-gray-light");
            $(this).removeClass("bg-transparent text-gray border border-gray-light").addClass("bg-primary text-white shadow-md");
            
            const tabValue = $(this).attr("data-tab");
            
            // Hide all timelines first
            $(".timeline").hide();
            
            // Show the selected timeline
            $("#" + tabValue + "-timeline").fadeIn(300);
            
            // Animate timeline items
            animateTimelineItems($("#" + tabValue + "-timeline"));
        });
    }
    
    // Helper function to animate timeline items
    function animateTimelineItems($timeline) {
        const timelineItems = $timeline.find(".timeline-item");
        
        timelineItems.each(function(index) {
            const $item = $(this);
            setTimeout(() => {
                $item.css({
                    "opacity": "1",
                    "transform": "translateY(0)"
                });
            }, 150 * index);
        });
    }
    
    // Initialize timeline tabs
    initTimelineTabs();
    
    // Contact form with Formspree integration
    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        // Validate form
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();
        
        if (!name || !email || !subject || !message) {
            formStatus.innerHTML = "Please fill in all fields";
            formStatus.className = "mt-4 text-center text-red-500 font-medium block";
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.innerHTML = "Please enter a valid email address";
            formStatus.className = "mt-4 text-center text-red-500 font-medium block";
            return;
        }
        
        // Show loading state
        const $submitBtn = $(".form-submit");
        $submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        $submitBtn.prop("disabled", true);
        formStatus.className = "mt-4 text-center hidden";
        
        // Get form data
        const formData = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formStatus.innerHTML = '<i class="fas fa-check-circle text-green-500 mr-2"></i> Thank you! Your message has been sent successfully.';
                formStatus.className = "mt-4 text-center text-green-500 font-medium block bg-white p-4 rounded-md shadow-md border-l-4 border-green-500";
                form.reset();
            } else {
                // Server error
                const data = await response.json();
                let errorMessage = "Oops! There was a problem submitting your form";
                
                if (Object.hasOwn(data, 'errors')) {
                    errorMessage = data.errors.map(error => error.message).join(", ");
                }
                
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 mr-2"></i> ' + errorMessage;
                formStatus.className = "mt-4 text-center text-red-500 font-medium block bg-white p-4 rounded-md shadow-md border-l-4 border-red-500";
            }
        } catch (error) {
            // Network error
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 mr-2"></i> Oops! There was a network problem submitting your form. Please try again.';
            formStatus.className = "mt-4 text-center text-red-500 font-medium block bg-white p-4 rounded-md shadow-md border-l-4 border-red-500";
        }
        
        // Reset button state
        $submitBtn.html('Send Message <i class="fas fa-paper-plane ml-2"></i>');
        $submitBtn.prop("disabled", false);
    }
    
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        const targetElement = $(targetId);
        if (targetElement.length) {
            const targetPosition = targetElement.offset().top - 80;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, 'easeInOutCubic');
        }
    });
    
    // jQuery easing function for smoother scrolling
    $.extend($.easing, {
        easeInOutCubic: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    });
    
    // Download CV button functionality
    $("#download-cv").click(function(e) {
        // If no real file exists, show a fallback message
        if (!$(this).attr('download')) {
            e.preventDefault();
            alert('CV download is set up. In a real website, your actual CV file would be downloaded here.');
        } else {
            // Add visual feedback for download
            const originalText = $(this).html();
            $(this).html('<i class="fas fa-spinner fa-spin"></i> Downloading...');
            
            setTimeout(() => {
                $(this).html(originalText);
            }, 1500);
        }
    });
    
    // Project Modal Functionality
    const $projectModal = $("#project-modal");
    const $modalTitle = $("#modal-title");
    const $modalContent = $("#modal-content");
    
    // Project details data
    const projectData = {
        basecamp: {
            title: 'Basecamp Airsoft Ltd',
            content: `
                <h4 class="text-xl text-primary mb-4">About This Project</h4>
                <p class="text-gray mb-6">Basecamp Airsoft Ltd is a ticket sales startup for the airsoft industry that I founded and currently lead as Company Director. This business provides a unified booking platform for airsoft events across the UK.</p>
                <h4 class="text-xl text-primary mb-4">Key Responsibilities</h4>
                <ul class="mb-8 space-y-4">
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Developed and implemented the business strategy and revenue model</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Built relationships with airsoft sites across the UK to create a unified booking platform</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Managed resource allocation for optimal business growth</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Implemented sales strategies to increase client acquisition</li>
                </ul>
                <h4 class="text-xl text-primary mb-4">Results & Achievements</h4>
                <p class="text-gray">Successfully launched the platform with multiple airsoft sites onboarded, creating a streamlined booking experience for enthusiasts while providing valuable business analytics for site owners.</p>
            `
        },
        digigrow: {
            title: 'DigiGrow LTD',
            content: `
                <h4 class="text-xl text-primary mb-4">About This Project</h4>
                <p class="text-gray mb-6">DigiGrow LTD is my digital marketing agency that provides comprehensive marketing solutions for businesses. As Company Director, I oversee all operations and strategic direction.</p>
                <h4 class="text-xl text-primary mb-4">Key Responsibilities</h4>
                <ul class="mb-8 space-y-4">
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Created and implemented marketing strategies for clients across different industries</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Developed compelling copy for websites, social media, and advertising campaigns</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Managed client relationships and provided education on digital marketing best practices</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Analyzed campaign performance and optimized for improved results</li>
                </ul>
                <h4 class="text-xl text-primary mb-4">Results & Achievements</h4>
                <p class="text-gray">Successfully helped multiple clients increase their online presence and business growth through targeted marketing campaigns and strategic brand positioning.</p>
            `
        },
        yip: {
            title: 'Young Innovators Project',
            content: `
                <h4 class="text-xl text-primary mb-4">About This Project</h4>
                <p class="text-gray mb-6">The Young Innovators Project is a collaborative initiative I co-partner with Farnborough councillors and the mayor to help young people aged 13-25 develop entrepreneurial skills and business acumen.</p>
                <h4 class="text-xl text-primary mb-4">Key Responsibilities</h4>
                <ul class="mb-8 space-y-4">
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Organized and sold events focused on business skills development</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Coordinated with local government officials and business leaders</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Developed workshop content and presentation materials</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Managed sales and marketing for event attendance</li>
                </ul>
                <h4 class="text-xl text-primary mb-4">Results & Achievements</h4>
                <p class="text-gray">Successfully launched multiple workshops with strong attendance, creating valuable networking opportunities for young entrepreneurs and providing them with practical business skills and knowledge.</p>
            `
        },
        tavern: {
            title: 'The Thatched Tavern Management',
            content: `
                <h4 class="text-xl text-primary mb-4">About This Role</h4>
                <p class="text-gray mb-6">In my role as Bar Manager at The Thatched Tavern, I've gained valuable experience in hospitality management, customer service, and team leadership over three years of employment.</p>
                <h4 class="text-xl text-primary mb-4">Key Responsibilities</h4>
                <ul class="mb-8 space-y-4">
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Managed daily bar operations and inventory control</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Led and trained a team of service staff to ensure excellent customer experiences</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Resolved customer inquiries and concerns with a focus on satisfaction</li>
                    <li class="relative pl-8 text-gray before:content-[''] before:absolute before:top-2 before:left-0 before:w-2 before:h-2 before:bg-primary before:rounded-full">Implemented protocols to improve operational efficiency</li>
                </ul>
                <h4 class="text-xl text-primary mb-4">Results & Achievements</h4>
                <p class="text-gray">Successfully advanced to a management position through demonstrated leadership and customer service excellence, contributing to improved staff retention and customer satisfaction.</p>
            `
        }
    };
    
    // Open modal with project details
    $(".project-modal-trigger").click(function(e) {
        e.preventDefault();
        const projectId = $(this).attr("data-project");
        const project = projectData[projectId];
        
        if (project) {
            // Prepare modal content
            $modalTitle.text(project.title);
            $modalContent.html(project.content);
            
            // Show modal with animation
            $projectModal.css({
                visibility: "visible",
                opacity: 0
            }).animate({
                opacity: 1
            }, 300);
            
            // Animate modal content
            $projectModal.find(".modal").css({
                transform: "scale(0.9) translateY(30px)"
            }).animate({
                transform: "scale(1) translateY(0)"
            }, 500);
            
            $("body").addClass("overflow-hidden");
            
            // Focus trap for accessibility
            setTimeout(() => {
                $projectModal.find(".modal-close").first().focus();
            }, 100);
        }
    });
    
    // Close modal
    $(".modal-close").click(function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    $projectModal.click(function(e) {
        if (e.target === $projectModal[0]) {
            closeModal();
        }
    });
    
    // Helper function to close modal
    function closeModal() {
        $projectModal.animate({
            opacity: 0
        }, 300, function() {
            $(this).css("visibility", "hidden");
            $("body").removeClass("overflow-hidden");
        });
    }
    
    // Handle escape key for modals
    $(document).keydown(function(e) {
        if (e.key === "Escape" && $projectModal.css("visibility") === "visible") {
            closeModal();
        }
    });
    
    // Add footer gradient animation
    $("#footer-gradient").css({
        backgroundPosition: "0% 50%"
    }).animate({
        backgroundPosition: "100% 50%"
    }, 10000, "linear", function() {
        $(this).animate({
            backgroundPosition: "0% 50%"
        }, 10000, "linear");
    });
    
    // Add Hover Effects to links and buttons
    $(".soft-skill").hover(
        function() {
            $(this).addClass("bg-primary text-white -translate-y-1");
            $(this).removeClass("bg-blue-100 text-primary");
        },
        function() {
            $(this).removeClass("bg-primary text-white -translate-y-1");
            $(this).addClass("bg-blue-100 text-primary");
        }
    );
    
    // Add active class to current section in navigation
    function setActiveNavItem() {
        const scrollPosition = $(window).scrollTop() + 200;
        
        $("section").each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            const sectionId = $(this).attr("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                $(".nav-links a").removeClass("text-primary");
                $(`.nav-links a[href="#${sectionId}"]`).addClass("text-primary");
            }
        });
    }
    
    $(window).scroll(setActiveNavItem);
    setActiveNavItem(); // Initialize on page load
    
    // Form field animations
    $("input, textarea").focus(function() {
        $(this).next("label").addClass("text-primary font-semibold");
    }).blur(function() {
        if (!$(this).val()) {
            $(this).next("label").removeClass("text-primary font-semibold");
        }
    });
    
    // Check for existing values on page load
    $("input, textarea").each(function() {
        if ($(this).val()) {
            $(this).next("label").addClass("text-primary font-semibold");
        }
    });
    
    // Add ripple effect to buttons
    $(".btn, button").on("mousedown", function(e) {
        const x = e.pageX - $(this).offset().left;
        const y = e.pageY - $(this).offset().top;
        
        // Create and add ripple element
        const $ripple = $("<span class='ripple'></span>");
        $ripple.css({
            position: "absolute",
            top: y + "px",
            left: x + "px",
            width: "10px",
            height: "10px",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "50%",
            transform: "scale(0)",
            opacity: 1,
            zIndex: -1
        });
        
        $(this).css("position", "relative");
        $(this).css("overflow", "hidden");
        $(this).append($ripple);
        
        // Animate the ripple
        const size = Math.max($(this).outerWidth(), $(this).outerHeight()) * 2;
        $ripple.animate({
            width: size + "px",
            height: size + "px",
            top: y - (size / 2) + "px",
            left: x - (size / 2) + "px",
            opacity: 0
        }, 600, function() {
            $(this).remove();
        });
    });
    
    // Enhanced portfolio hover effects
    $(".portfolio-item").each(function() {
        $(this).hover(
            function() {
                // Mouse enter
                $(this).find(".portfolio-overlay").css({
                    opacity: 1
                });
                $(this).find(".portfolio-info").css({
                    transform: "translateY(0)"
                });
                $(this).find("img").css({
                    transform: "scale(1.1)"
                });
            },
            function() {
                // Mouse leave
                $(this).find(".portfolio-overlay").css({
                    opacity: 0
                });
                $(this).find(".portfolio-info").css({
                    transform: "translateY(5px)"
                });
                $(this).find("img").css({
                    transform: "scale(1)"
                });
            }
        );
    });
    
    // Optimize images with lazy loading
    function lazyLoadImages() {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const src = image.getAttribute('src');
                        
                        // If image has a src attribute already, it's already loaded
                        if (src && !src.includes('placeholder')) {
                            observer.unobserve(image);
                            return;
                        }
                        
                        // Set the data-src as the actual src
                        if (image.getAttribute('data-src')) {
                            image.setAttribute('src', image.getAttribute('data-src'));
                            image.removeAttribute('data-src');
                        }
                        
                        observer.unobserve(image);
                    }
                });
            });
            
            images.forEach(image => {
                imageObserver.observe(image);
            });
        }
    }
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Add parallax effect to hero section background
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const heroSection = $('#hero');
        const heroHeight = heroSection.height();
        
        if (scrollTop <= heroHeight) {
            const yPos = -(scrollTop * 0.2);
            heroSection.css({
                backgroundPosition: `center ${yPos}px`
            });
        }
    });
    
    // Add counter animation for statistic numbers
    function animateCounters() {
        $('.card h3').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.text());
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }
    
    // Trigger counter animation when cards come into view
    inView(".about-cards", ({ target }) => {
        animateCounters();
        return () => {}; // Only trigger once
    });
    
    // Add ARIA support for better accessibility
    function enhanceAccessibility() {
        // Add ARIA labels to form fields
        $('input, textarea').each(function() {
            const $label = $(this).next('label');
            if ($label.length) {
                const labelText = $label.text();
                $(this).attr('aria-label', labelText);
            }
        });
        
        // Make modal fully accessible
        $('#project-modal').attr({
            'role': 'dialog',
            'aria-labelledby': 'modal-title',
            'aria-modal': 'true'
        });
        
        // Add appropriate roles to navigation
        $('nav').attr('role', 'navigation');
        
        // Make portfolio filter buttons accessible
        $('.filter-btn').attr({
            'role': 'button',
            'aria-pressed': function() {
                return $(this).hasClass('active') ? 'true' : 'false';
            }
        });
    }
    
    // Initialize accessibility enhancements
    enhanceAccessibility();
    
    // Add browser support check
    function checkBrowserSupport() {
        // Check for CSS Grid support
        if (!CSS.supports('display', 'grid')) {
            console.warn('Your browser does not fully support CSS Grid. The layout might not appear as intended.');
        }
        
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            console.warn('Your browser does not support Intersection Observer. Some animations may not work.');
            
            // Fallback for older browsers - just show all sections
            $('section').css({
                'opacity': 1,
                'transform': 'translateY(0)'
            });
            
            $('.timeline-item').css({
                'opacity': 1,
                'transform': 'translateY(0)'
            });
        }
    }
    
    // Run browser compatibility check
    checkBrowserSupport();
    
    // Handle viewport resize events
    $(window).resize(function() {
        // Recalculate any dimension-dependent elements
        updateScrollProgress();
    });
    
    // Print stylesheet trigger
    $('.print-cv').click(function(e) {
        e.preventDefault();
        window.print();
    });
    
    console.log('Website initialization complete');
});