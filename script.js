// This function runs once the entire page is loaded and ready.
$(document).ready(function () {
    console.log("jQuery is ready!");

    // --- DARK/LIGHT MODE ---
    const themeToggleButton = $('#theme-toggle');
    const body = $('body');

    function applyInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'night') {
            body.addClass('night-mode');
            themeToggleButton.html('<i class="fas fa-sun"></i>');
        } else {
            body.removeClass('night-mode');
            themeToggleButton.html('<i class="fas fa-moon"></i>');
        }
    }

    themeToggleButton.on('click', () => {
        body.toggleClass('night-mode');
        if (body.hasClass('night-mode')) {
            localStorage.setItem('theme', 'night');
            themeToggleButton.html('<i class="fas fa-sun"></i>');
        } else {
            localStorage.setItem('theme', 'day');
            themeToggleButton.html('<i class="fas fa-moon"></i>');
        }
    });

    applyInitialTheme();


    // --- DYNAMIC TRAINERS LIST ---
    const trainers = [
        { id: 1, name: 'Anna', specialty: 'Yoga Instructor', bio: 'Certified yoga teacher with 8 years of experience...', img: 'images/5413438310036140376.jpg', alt: 'Trainer Anna' },
        { id: 2, name: 'Alina', specialty: 'Fitness Coach', bio: 'Specialist in functional training and HIIT...', img: 'images/5413438310036140384.jpg', alt: 'Trainer Alina' },
        { id: 3, name: 'Sarah', specialty: 'Pilates Instructor', bio: 'Certified Pilates instructor with a focus on posture...', img: 'images/5413438310036140377.jpg', alt: 'Trainer Sarah' },
        { id: 4, name: 'Maria', specialty: 'Strength Coach', bio: 'Strength and conditioning specialist...', img: 'images/5413438310036140381.jpg', alt: 'Trainer Maria' }
    ];

    const trainersGrid = $('#trainers-grid');
    if (trainersGrid.length) {
        let trainersHTML = '';
        trainers.forEach(trainer => {
            trainersHTML += `
            <div class="col-lg-3 col-md-6 trainer-card-container">
                <div class="card trainer-card text-center h-100">
                    <img src="${trainer.img}" class="card-img-top" alt="${trainer.alt}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">${trainer.name}</h3>
                        <p class="trainer-specialty">${trainer.specialty}</p>
                        <p class="card-text">${trainer.bio}</p>
                        
                        <div class="star-rating mt-auto" data-trainer-id="${trainer.id}">
                          <span class="star" data-value="1">&starf;</span>
                          <span class="star" data-value="2">&starf;</span>
                          <span class="star" data-value="3">&starf;</span>
                          <span class="star" data-value="4">&starf;</span>
                          <span class="star" data-value="5">&starf;</span>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        trainersGrid.html(trainersHTML);
        
        // После генерации HTML, загружаем сохраненные рейтинги
        loadAllRatings();
    }


    // --- SEARCH AND FILTER FUNCTIONALITY ---
    $('#trainer-search').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#trainers-grid .trainer-card-container").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#trainer-search').on('input', function () {
        let val = this.value;
        $('#autocomplete-list').empty();
        if (!val) { return false; }
        trainers.forEach(trainer => {
            if (trainer.name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                $('#autocomplete-list').append(`<div data-name="${trainer.name}"><strong>${trainer.name.substr(0, val.length)}</strong>${trainer.name.substr(val.length)}</div>`);
            }
        });
    });

    $(document).on('click', '#autocomplete-list div', function () {
        $('#trainer-search').val($(this).data('name'));
        $('#autocomplete-list').empty();
        $('#trainer-search').trigger('keyup');
    });


    // --- INTERACTIVE UI ELEMENTS ---
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentRounded = Math.round(scrollPercent * 100);
        $('.v-progress-bar').css('height', scrollPercentRounded + '%');
    });

    var counted = 0;
    $(window).on('scroll', function () {
        var counter = $('.counter');
        if (counter.length === 0) return;
        var oTop = counter.offset().top - window.innerHeight;
        if (counted == 0 && $(window).scrollTop() > oTop) {
            counter.each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-target');
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                },
                {
                    duration: 2000,
                    easing: 'swing',
                    step: function () { $this.text(Math.floor(this.countNum)); },
                    complete: function () { $this.text(this.countNum); }
                });
            });
            counted = 1;
        }
    });

    function lazyLoad() {
        $('.lazy').each(function () {
            var rect = this.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                $(this).attr('src', $(this).data('src'));
                $(this).removeClass('lazy');
            }
        });
    }
    lazyLoad();
    $(window).on('scroll', lazyLoad);


    // --- CONTACT FORM HANDLING ---
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const form = this;
        const nameInput = $('#name');
        const messageInput = $('#message');
        const nameFeedback = $('#name-feedback');
        const messageFeedback = $('#message-feedback');
        let customValid = true;
        const nameRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я\- ]*$/;
        if (nameInput.val() === '') {
            nameInput[0].setCustomValidity('Please enter your name.');
            nameFeedback.text('Please enter your name.');
            customValid = false;
        } else if (!nameRegex.test(nameInput.val())) {
            nameInput[0].setCustomValidity('Please start your name with a capital letter.');
            nameFeedback.text('Please start your name with a capital letter.');
            customValid = false;
        } else {
            nameInput[0].setCustomValidity('');
        }
        if (messageInput.val() === '') {
            messageInput[0].setCustomValidity('Please enter a message.');
            messageFeedback.text('Please enter a message.');
            customValid = false;
        } else if (messageInput.val().length < 6) {
            messageInput[0].setCustomValidity('Message must be at least 6 characters long.');
            messageFeedback.text('Message must be at least 6 characters long.');
            customValid = false;
        } else {
            messageInput[0].setCustomValidity('');
        }
        if (form.checkValidity() === false || customValid === false) {
            // Stop
        } else {
            const submitBtn = $('#submit-btn');
            submitBtn.prop('disabled', true);
            submitBtn.find('.spinner-border').removeClass('d-none');
            submitBtn.contents().filter(function () { return this.nodeType === 3; }).first().replaceWith(" Please wait...");
            setTimeout(() => {
                submitBtn.prop('disabled', false);
                submitBtn.find('.spinner-border').addClass('d-none');
                submitBtn.contents().filter(function () { return this.nodeType === 3; }).first().replaceWith(" Send Message");
                showToast('Form submitted successfully!');
                $('#contact-form')[0].reset();
                $(form).removeClass('was-validated');
                nameInput[0].setCustomValidity('');
                messageInput[0].setCustomValidity('');
                nameFeedback.text('Please enter your name.');
                messageFeedback.text('Please enter a message.');
            }, 2000);
        }
        $(form).addClass('was-validated');
    });

    // A helper function to show toast notifications (Global)
    function showToast(message) {
        const toast = $(`<div class="toast-notification">${message}</div>`);
        $('#notification-container').append(toast);
        setTimeout(() => { toast.css('opacity', 1); }, 100);
        setTimeout(() => {
            toast.css('opacity', 0);
            setTimeout(() => { toast.remove(); }, 500);
        }, 5000);
    }

    $('#copy-email-btn').on('click', function () {
        var emailText = $('#email-text').text();
        navigator.clipboard.writeText(emailText).then(() => {
            showToast('Email copied to clipboard!');
            const originalIcon = $(this).html();
            $(this).html('<i class="fas fa-check"></i>');
            setTimeout(() => { $(this).html(originalIcon); }, 2000);
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

    $('#filter-buttons .btn-check').on('change', function () {
        const filter = $(this).data('filter');
        $('#schedule-body tr').each(function () {
            if (filter === 'all' || $(this).data('category') === filter) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // ----- API (Совет дня) -----
    fetchAdvice();
    
    // ----- ЛОГИКА РЕЙТИНГА -----

    // 1. При наведении на звезду - подсвечиваем
    trainersGrid.on('mouseover', '.star', function() {
        $(this).prevAll('.star').addBack().addClass('hover');
        $(this).nextAll('.star').removeClass('hover');
    });

    // 2. Когда убираем мышь с блока звезд - сбрасываем hover
    trainersGrid.on('mouseout', '.star-rating', function() {
        $(this).find('.star').removeClass('hover');
    });

    // 3. При клике на звезду - сохраняем рейтинг
    trainersGrid.on('click', '.star', function() {
        const rating = $(this).data('value');
        const trainerId = $(this).closest('.star-rating').data('trainer-id');
        
        saveTrainerRating(trainerId, rating);
        updateStarDisplay(trainerId, rating); // Обновляем UI
        showToast(`You rated ${rating} stars!`);
    });

}); // <-- КОНЕЦ $(document.ready)


// --- API FUNCTION (Используем AdviceSlip) ---
/**
 * Fetches a random piece of advice and displays it.
 * (Использует https://api.adviceslip.com/advice)
 */
function fetchAdvice() {
  const quoteElement = $('#fitness-quote');
  const authorElement = $('#fitness-author');

  // Проверяем, есть ли этот элемент на текущей странице
  if (quoteElement.length) {
    
    // Используем API AdviceSlip
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        // API возвращает { "slip": { "id": 1, "advice": "..." } }
        const adviceText = data.slip.advice;

        // Вставляем совет в наш HTML
        quoteElement.html(`<p><em>"${adviceText}"</em></p>`);
        
        // У этого API нет автора, поэтому мы просто прячем элемент автора
        authorElement.hide();
      })
      .catch(error => {
        console.error('Error fetching advice:', error);
        // Показываем сообщение об ошибке
        quoteElement.html('<p>Could not load advice at this time.</p>');
        authorElement.text('Error');
      });
  }
}


// --- RATING FUNCTIONS ---

/**
 * Получает все рейтинги из localStorage
 * @returns {Object} - Объект вида { "trainer_1": 4, "trainer_2": 5 }
 */
function getRatings() {
    return JSON.parse(localStorage.getItem('celeryTrainerRatings')) || {};
}

/**
 * Сохраняет рейтинг для ОДНОГО тренера
 * @param {number} trainerId - ID тренера (1, 2, 3...)
 * @param {number} rating - Оценка (1-5)
 */
function saveTrainerRating(trainerId, rating) {
    const ratings = getRatings();
    ratings['trainer_' + trainerId] = rating;
    localStorage.setItem('celeryTrainerRatings', JSON.stringify(ratings));
}

/**
 * Обновляет отображение звезд для одного тренера
 * @param {number} trainerId - ID тренера
 * @param {number} rating - Оценка
 */
function updateStarDisplay(trainerId, rating) {
    const stars = $(`.star-rating[data-trainer-id="${trainerId}"] .star`);
    stars.removeClass('rated'); // Сначала сбрасываем все
    stars.each(function() {
        if ($(this).data('value') <= rating) {
            $(this).addClass('rated'); // Добавляем класс 'rated'
        }
    });
}

/**
 * Загружает ВСЕ сохраненные рейтинги и обновляет UI
 */
function loadAllRatings() {
    const ratings = getRatings();
    // 'ratings' это { "trainer_1": 4, "trainer_3": 5 }
    for (const key in ratings) {
        // key = "trainer_1"
        const trainerId = key.split('_')[1]; // "1"
        const rating = ratings[key]; // 4
        updateStarDisplay(trainerId, rating);
    }
}