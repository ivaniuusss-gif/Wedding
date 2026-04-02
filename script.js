document.addEventListener('DOMContentLoaded', () => {

    // 1. Разблокировка сайта (Свайп / Клик)
    const unlockBtn = document.getElementById('unlock-btn');
    const unlockScreen = document.getElementById('unlock-screen');
    const mainWrapper = document.getElementById('main-wrapper');

    unlockBtn.addEventListener('click', () => {
        unlockScreen.classList.add('unlocked');
        mainWrapper.classList.remove('hidden');
        mainWrapper.style.opacity = '1';
        mainWrapper.style.pointerEvents = 'auto';
        
        // Даем время на CSS-анимацию сдвига, затем скрываем элемент
        setTimeout(() => {
            unlockScreen.style.display = 'none';
        }, 800);
    });

    // 2. Таймер до 15 августа 2026 года
    const targetDate = new Date(2026, 7, 15, 0, 0, 0).getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "<h3 style='color: white;'>Ура! Этот день настал!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Добавляем ведущий ноль
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // 3. Анимация появления элементов при скролле (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.1, // Элемент появляется, когда 10% видно
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Обработка формы
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = rsvpForm.querySelector('.btn-solid');
        const originalText = btn.innerText;
        
        btn.innerText = 'Отправлено! ♥';
        btn.style.backgroundColor = 'var(--accent-green)';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = 'var(--accent-red)';
            rsvpForm.reset();
        }, 3000);
    });
});