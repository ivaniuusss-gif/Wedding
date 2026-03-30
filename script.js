document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Логика разблокировки экрана ---
    const unlockBtn = document.getElementById('unlock-btn');
    const heroScreen = document.getElementById('unlock-screen');
    const mainContent = document.getElementById('main-content');

    unlockBtn.addEventListener('click', () => {
        // Скрываем начальный экран
        heroScreen.classList.add('hidden');
        
        // Показываем основной контент
        mainContent.classList.remove('content-hidden');
        mainContent.classList.add('content-visible');
        
        // Прокручиваем в самый верх страницы плавно
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Если хотите, чтобы первый экран полностью удалялся из DOM после анимации:
        setTimeout(() => {
            heroScreen.style.display = 'none';
        }, 800);
    });


    // --- 2. Таймер обратного отсчета ---
    // Устанавливаем дату: 25 мая 2025 года, 12:30
    const countDownDate = new Date("May 25, 2025 12:30:00").getTime();

    // Обновляем таймер каждую секунду
    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Вычисления времени
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Вставляем результаты в HTML
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        // Если дата прошла
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "<p class='main-text'>Этот день настал!</p>";
        }
    }, 1000);


    // --- 3. Обработка отправки формы ---
    const rsvpForm = document.getElementById('rsvp-form');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        
        // Здесь можно добавить логику отправки данных (Fetch API для Telegram бота или Google Таблиц)
        // Для примера просто показываем уведомление:
        
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        btn.innerText = "ОТПРАВЛЕНО!";
        btn.style.backgroundColor = "#000";
        btn.style.color = "#fff";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "transparent";
            btn.style.color = "#000";
            rsvpForm.reset();
        }, 3000);
    });
});