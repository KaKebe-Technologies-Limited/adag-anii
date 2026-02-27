(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Add year to copyright statement in footer
    var $year = $('.year');
    if ($year.length) $year.text(new Date().getFullYear());

    // EmailJS Form Handling
    (function() {
        // only do anything if the library actually loaded
        if (typeof emailjs !== 'undefined' && emailjs) {
            emailjs.init("DPrvjhLq84XQbhMAi");

            // Form submission handler
            $("#contact-form").on("submit", function(event) {
                event.preventDefault();

                // Get the submit button
                var submitBtn = $(this).find('button[type="submit"]');
                var originalBtnText = submitBtn.html();

                // Show loading state
                submitBtn.prop('disabled', true)
                         .html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...');

                // Send the form using EmailJS - replace with your actual service and template IDs
                emailjs.sendForm('service_kp8hgdu', 'template_ow18je3', this)
                    .then(function () {
                        // Show success message
                        $('#success-message').removeClass('d-none');
                        $('#error-message').addClass('d-none');
                        $('#contact-form')[0].reset();
                        // Scroll to the message
                        $('html, body').animate({
                            scrollTop: $('#success-message').offset().top - 100
                        }, 500);
                    })
                    .catch(function (error) {
                        // Show error message
                        $('#error-message').removeClass('d-none');
                        $('#success-message').addClass('d-none');
                        // Scroll to the message
                        $('html, body').animate({
                            scrollTop: $('#error-message').offset().top - 100
                        }, 500);
                    })
                    // Restore button state
                    .finally(function() {
                        submitBtn.prop('disabled', false).html(originalBtnText);
                    });
            });
        } else {
            // library not present – prevent errors if someone submits
            $("#contact-form").on("submit", function(event) {
                event.preventDefault();
                console.warn('EmailJS not loaded; contact form disabled.');
            });
        }
    })();

})(jQuery);

// Look into using environment variables for public key and other variables