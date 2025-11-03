// This function runs once the entire page is loaded and ready.
$(document).ready(function () {
    console.log("jQuery is ready!");

    // --- DARK/LIGHT MODE ---
    // This is a key feature for Assignment 8.
    // It checks the user's saved preference and applies the theme.
    const themeToggleButton = $('#theme-toggle');
    const body = $('body');

    // When the page loads, check if we saved a theme preference in localStorage.
    function applyInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'night') {
            body.addClass('night-mode');
            themeToggleButton.html('<i class="fas fa-sun"></i>'); // Show the sun icon.
        } else {
            body.removeClass('night-mode');
            themeToggleButton.html('<i class="fas fa-moon"></i>'); // Show the moon icon.
        }
    }

    // Handle clicks on the theme toggle button.
    themeToggleButton.on('click', () => {
        body.toggleClass('night-mode'); // Switch the class on the body.

        // Now, save the user's choice to localStorage.
        if (body.hasClass('night-mode')) {
            localStorage.setItem('theme', 'night');
            themeToggleButton.html('<i class="fas fa-sun"></i>');
        } else {
            localStorage.setItem('theme', 'day');
            themeToggleButton.html('<i class="fas fa-moon"></i>');
        }
    });

    applyInitialTheme(); // Apply the theme when the page first loads.


    // --- DYNAMIC TRAINERS LIST ---
    // Instead of hardcoding trainers in HTML, we define them here.
    // This makes it much easier to add or remove trainers later on.
    const trainers = [
        { name: 'Anna', specialty: 'Yoga Instructor', bio: 'Certified yoga teacher with 8 years of experience...', img: 'images/5413438310036140376.jpg', alt: 'Trainer Anna' },
        { name: 'Alina', specialty: 'Fitness Coach', bio: 'Specialist in functional training and HIIT...', img: 'images/5413438310036140384.jpg', alt: 'Trainer Alina' },
        { name: 'Sarah', specialty: 'Pilates Instructor', bio: 'Certified Pilates instructor with a focus on posture...', img: 'images/5413438310036140377.jpg', alt: 'Trainer Sarah' },
        { name: 'Maria', specialty: 'Strength Coach', bio: 'Strength and conditioning specialist...', img: 'images/5413438310036140381.jpg', alt: 'Trainer Maria' }
    ];

    const trainersGrid = $('#trainers-grid');
    // If we are on the trainers page, generate the trainer cards.
    if (trainersGrid.length) {
        let trainersHTML = '';
        trainers.forEach(trainer => {
            trainersHTML += `
            <div class="col-lg-3 col-md-6 trainer-card-container">
                <div class="card trainer-card text-center h-100">
                    <img src="${trainer.img}" class="card-img-top" alt="${trainer.alt}">
                    <div class="card-body">
                        <h3 class="card-title">${trainer.name}</h3>
                        <p class="trainer-specialty">${trainer.specialty}</p>
                        <p class="card-text">${trainer.bio}</p>
                    </div>
                </div>
            </div>`;
        });
        trainersGrid.html(trainersHTML);
    }


    // --- SEARCH AND FILTER FUNCTIONALITY ---

    // Task 1: Real-time Search Filter for trainers.
    $('#trainer-search').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#trainers-grid .trainer-card-container").filter(function () {
            // This toggles the visibility of the card based on the search term.
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Task 2: Autocomplete for the search bar.
    $('#trainer-search').on('input', function () {
        let val = this.value;
        $('#autocomplete-list').empty();
        if (!val) { return false; } // Don't do anything if the input is empty.
        trainers.forEach(trainer => {
            // Check if the trainer's name starts with the input value.
            if (trainer.name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                $('#autocomplete-list').append(`<div data-name="${trainer.name}"><strong>${trainer.name.substr(0, val.length)}</strong>${trainer.name.substr(val.length)}</div>`);
            }
        });
    });

    // When a user clicks on an autocomplete suggestion...
    $(document).on('click', '#autocomplete-list div', function () {
        $('#trainer-search').val($(this).data('name')); // ...fill the input...
        $('#autocomplete-list').empty(); // ...hide the suggestions...
        $('#trainer-search').trigger('keyup'); // ...and trigger the search.
    });


    // --- INTERACTIVE UI ELEMENTS ---

    // Task 4: Colorful and Stylized Scroll Progress Bar (Vertical)
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();

        // Just a bit of math to calculate how far down the page we've scrolled.
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentRounded = Math.round(scrollPercent * 100);

        // Update the height of the progress bar.
        $('.v-progress-bar').css('height', scrollPercentRounded + '%');
    });

    // Task 5: Animated Number Counter on the homepage.
    var counted = 0; // A flag to make sure the animation only runs once.
    $(window).on('scroll', function () {
        var counter = $('.counter');
        if (counter.length === 0) return; // Don't run if there's no counter on the page.

        var oTop = counter.offset().top - window.innerHeight;
        if (counted == 0 && $(window).scrollTop() > oTop) {
            counter.each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-target');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                },
                    {
                        duration: 2000, // Animation duration in milliseconds.
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum); // Ensure the final number is exact.
                        }
                    });
            });
            counted = 1; // Set the flag so it doesn't run again.
        }
    });

    // Task 9: Image Lazy Loading
    // This helps the page load faster by only loading images when they are visible.
    function lazyLoad() {
        $('.lazy').each(function () {
            var rect = this.getBoundingClientRect(); // Get the image's position.
            // If the top of the image is inside the viewport...
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                $(this).attr('src', $(this).data('src')); // ...load the real image source.
                $(this).removeClass('lazy'); // Remove the class so we don't check it again.
            }
        });
    }

    lazyLoad(); // Load visible images on page load.
    $(window).on('scroll', lazyLoad); // And keep checking as the user scrolls.


    // --- CONTACT FORM HANDLING ---
    // Assignment 8 requires form validation.
    $('#contact-form').on('submit', function (e) {
        e.preventDefault(); // Stop the form from submitting the old-fashioned way.

        // Use Bootstrap's built-in validation styles.
        if (this.checkValidity() === false) {
            e.stopPropagation();
        } else {
            // Show a loading spinner to give the user feedback.
            const submitBtn = $('#submit-btn');
            submitBtn.prop('disabled', true);
            submitBtn.find('.spinner-border').removeClass('d-none');
            submitBtn.contents().filter(function () { return this.nodeType === 3; }).first().replaceWith(" Please wait...");

            // Simulate a network request.
            setTimeout(() => {
                // Reset the button after 2 seconds.
                submitBtn.prop('disabled', false);
                submitBtn.find('.spinner-border').addClass('d-none');
                submitBtn.contents().filter(function () { return this.nodeType === 3; }).first().replaceWith(" Send Message");

                showToast('Form submitted successfully!'); // Show a success notification.
                $('#contact-form')[0].reset(); // Clear the form.
                $('#contact-form').removeClass('was-validated'); // Reset validation styles.
            }, 2000);
        }
        $(this).addClass('was-validated'); // Show validation feedback to the user.
    });

    // A helper function to show toast notifications.
    function showToast(message) {
        const toast = $(`<div class="toast-notification">${message}</div>`);
        $('#notification-container').append(toast);
        setTimeout(() => { toast.css('opacity', 1); }, 100); // Fade in.
        setTimeout(() => {
            toast.css('opacity', 0); // Fade out.
            setTimeout(() => { toast.remove(); }, 500); // Then remove from the DOM.
        }, 5000);
    }

    // Task 8: "Copy to Clipboard" button for the email address.
    $('#copy-email-btn').on('click', function () {
        var emailText = $('#email-text').text();
        navigator.clipboard.writeText(emailText).then(() => {
            showToast('Email copied to clipboard!');
            const originalIcon = $(this).html();
            $(this).html('<i class="fas fa-check"></i>'); // Temporarily show a checkmark.
            setTimeout(() => { $(this).html(originalIcon); }, 2000); // Change it back.
        });
    });



    const readMoreBtn = $('#read-more-btn');
    const readMoreContent = $('#read-more-content');

    if (readMoreBtn.length && readMoreContent.length) {
        readMoreBtn.on('click', function () {
            readMoreContent.slideToggle();

            const btn = $(this);

            if (btn.text() === 'Read more...') {
                btn.text('Hide');
            } else {
                btn.text('Read more...');
            }
        });
    }

    // Schedule page filters.
    $('#filter-buttons .btn-check').on('change', function () {
        const filter = $(this).data('filter');
        $('#schedule-body tr').each(function () {
            // Show or hide rows based on the selected filter.
            if (filter === 'all' || $(this).data('category') === filter) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

});