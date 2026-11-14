/* =========================================
   SKINGS MAIN JAVASCRIPT
   Premium Portfolio Functionality
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================
       1. PRELOADER
    ================================= */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {

        if (!preloader) return;

        preloader.style.opacity = "0";

        setTimeout(function () {

            preloader.style.display = "none";

        }, 500);

    }

    if (document.readyState === "complete") {

        hidePreloader();

    } else {

        window.addEventListener("load", hidePreloader, {
            once: true
        });

    }


    /* =================================
       2. MOBILE NAVIGATION
    ================================= */

    const menuToggle = document.getElementById("menu-toggle");

    const navMenu = document.getElementById("nav-menu");

    const navLinks = document.querySelectorAll(".nav-link");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("active")) {

                    icon.classList.replace("fa-bars", "fa-xmark");

                } else {

                    icon.classList.replace("fa-xmark", "fa-bars");

                }

            }

        });


        // CLOSE MENU WHEN LINK IS CLICKED

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.replace("fa-xmark", "fa-bars");

                }

            });

        });

    }


    /* =================================
       3. AUTOMATIC COPYRIGHT YEAR
    ================================= */

    const currentYear = new Date().getFullYear();

    const yearElements = document.querySelectorAll(
        "#year, #current-year"
    );

    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });


    /* =================================
       4. HEADER SCROLL EFFECT
    ================================= */

    const header = document.getElementById("header");

    if (header) {

        function updateHeader() {

            if (window.scrollY > 50) {

                header.style.background = "rgba(8,10,16,0.97)";

            } else {

                header.style.background = "rgba(8,10,16,0.85)";

            }

        }

        window.addEventListener("scroll", updateHeader);

        updateHeader();

    }


    /* =================================
       5. SKINGS CONTACT FORM
       WHATSAPP INTEGRATION
    ================================= */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        const nameInput = document.getElementById("contact-name");

        const emailInput = document.getElementById("contact-email");

        const serviceInput = document.getElementById("contact-service");

        const messageInput = document.getElementById("contact-message");

        const feedback = document.getElementById("form-feedback");

        const submitButton = contactForm.querySelector(".contact-submit");


        // WHATSAPP NUMBER

        const whatsappNumber = "2349032597421";


        let isSubmitting = false;


        // FEEDBACK FUNCTION

        function showFeedback(type, message) {

            if (!feedback) return;

            feedback.className = "form-feedback " + type;

            feedback.textContent = message;

        }


        // RESET BUTTON

        function resetButton() {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'Send Message <i class="fab fa-whatsapp"></i>';

            }

            isSubmitting = false;

        }


        // SUBMIT FORM

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();


            if (isSubmitting) return;


            if (
                !nameInput ||
                !emailInput ||
                !serviceInput ||
                !messageInput ||
                !submitButton
            ) {

                showFeedback(
                    "error",
                    "The contact form is not configured correctly."
                );

                return;

            }


            // GET VALUES

            const name = nameInput.value.trim();

            const email = emailInput.value.trim();

            const service = serviceInput.value;

            const message = messageInput.value.trim();


            // REQUIRED FIELDS

            if (!name || !email || !service || !message) {

                showFeedback(
                    "error",
                    "Please complete all required fields."
                );

                return;

            }


            // NAME VALIDATION

            if (name.length < 2) {

                showFeedback(
                    "error",
                    "Please enter your full name."
                );

                nameInput.focus();

                return;

            }


            // EMAIL VALIDATION

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showFeedback(
                    "error",
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            // MESSAGE VALIDATION

            if (message.length < 10) {

                showFeedback(
                    "error",
                    "Your message must contain at least 10 characters."
                );

                messageInput.focus();

                return;

            }


            // WHATSAPP NUMBER VALIDATION

            if (!/^234\d{10}$/.test(whatsappNumber)) {

                showFeedback(
                    "error",
                    "WhatsApp contact is not configured correctly."
                );

                return;

            }


            // PREPARE MESSAGE

            const whatsappMessage =

                "NEW PORTFOLIO ENQUIRY - SKINGS\n\n" +

                "Name: " + name + "\n" +

                "Email: " + email + "\n" +

                "Service: " + service + "\n\n" +

                "Message:\n" + message + "\n\n" +

                "Sent through SKINGS Portfolio.";


            // GENERATE WHATSAPP URL

            const whatsappURL =

                "https://wa.me/" +

                whatsappNumber +

                "?text=" +

                encodeURIComponent(whatsappMessage);


            // OPEN WHATSAPP

            isSubmitting = true;

            submitButton.disabled = true;

            submitButton.innerHTML =
                'Opening WhatsApp <i class="fas fa-spinner fa-spin"></i>';


            showFeedback(
                "success",
                "Preparing your WhatsApp enquiry..."
            );


            const whatsappWindow = window.open(
                whatsappURL,
                "_blank"
            );


            // CHECK POPUP BLOCKING

            if (!whatsappWindow) {

                showFeedback(
                    "error",
                    "WhatsApp could not open. Please allow pop-ups and try again."
                );

                resetButton();

                return;

            }


            showFeedback(
                "success",
                "WhatsApp opened. Review your message and press Send."
            );


            // RESTORE BUTTON

            setTimeout(function () {

                resetButton();

            }, 2500);

        });


        // CLEAR ERRORS WHEN EDITING

        contactForm.querySelectorAll("input, select, textarea")
            .forEach(function (field) {

                field.addEventListener("input", function () {

                    if (
                        feedback &&
                        feedback.classList.contains("error")
                    ) {

                        feedback.textContent = "";

                        feedback.className = "form-feedback";

                    }

                });

            });

    }

});

/* =================================
   SKINGS SCROLL REVEAL ANIMATIONS
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(
        ".section-header, " +
        ".service-card, " +
        ".project-card, " +
        ".timeline-card, " +
        ".why-card, " +
        ".cv-intro, " +
        ".cv-detail-card, " +
        ".contact-form-wrapper"
    );


    // CHECK BROWSER SUPPORT

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {
            element.classList.add("revealed");
        });

        return;

    }


    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

});

/* =================================
   ACTIVE NAVIGATION HIGHLIGHTING
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav-link"
    );


    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    navigationLinks.forEach(function (link) {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") === "#" + currentId
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },

        {
            rootMargin: "-25% 0px -65% 0px"
        }

    );


    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });

});

/* =================================
   BACK TO TOP FUNCTIONALITY
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.querySelector(".back-to-top");


    if (!backToTop) return;


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    });


    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});