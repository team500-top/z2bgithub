document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------
       1. SCROLL REVEAL
       ---------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));


    /* ----------------------------------------------------------------
       2. HERO CARD ANIMATION
       ---------------------------------------------------------------- */
    const heroCards = document.querySelectorAll('.hero-card');
    const heroProgress = document.getElementById('heroProgress');
    const heroCounter = document.getElementById('currentHeroCard');
    let currentHeroIndex = 0;
    const heroDuration = 4000; // 4 seconds per card
    let heroStartTime = null;

    if (heroCards.length > 0) {
        function animateHero(timestamp) {
            if (!heroStartTime) heroStartTime = timestamp;
            const elapsed = timestamp - heroStartTime;

            // Update Progress
            if (heroProgress) {
                const progress = Math.min((elapsed / heroDuration) * 100, 100);
                heroProgress.style.width = `${progress}%`;
            }

            if (elapsed >= heroDuration) {
                // Switch Card
                heroCards[currentHeroIndex].classList.remove('active');
                currentHeroIndex = (currentHeroIndex + 1) % heroCards.length;
                heroCards[currentHeroIndex].classList.add('active');

                // Update Counter
                if (heroCounter) heroCounter.textContent = `0${currentHeroIndex + 1}`;

                // Reset Timing
                heroStartTime = timestamp;
                if (heroProgress) heroProgress.style.width = '0%';
            }

            requestAnimationFrame(animateHero);
        }
        requestAnimationFrame(animateHero);
    }


    /* ----------------------------------------------------------------
       2.1 HERO WAVE ANIMATION (Dynamic)
       ---------------------------------------------------------------- */
    const canvas = document.getElementById('heroGraph');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let waves = [];

        function resize() {
            const parent = canvas.parentElement;
            if (parent) {
                width = canvas.width = parent.offsetWidth;
                height = canvas.height = parent.offsetHeight;
            } else {
                width = canvas.width = window.innerWidth;
                height = canvas.height = 500;
            }
            initWaves();
        }

        function initWaves() {
            waves = [];
            // Create 5 waves as requested
            for (let i = 0; i < 5; i++) {
                waves.push({
                    y: height / 2 + (Math.random() * 60 - 30), // Spread vertically
                    length: 0.002 + Math.random() * 0.004,     // Varied wavelength
                    amplitude: 20 + Math.random() * 30,        // Varied amplitude
                    speed: 0.01 + Math.random() * 0.02,        // Varied speed
                    offset: Math.random() * Math.PI * 2,       // Random start phase
                    color: `rgba(0, 85, 255, ${0.12 - i * 0.01})` // Fading opacity
                });
            }
        }

        function drawWaves() {
            ctx.clearRect(0, 0, width, height);

            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, height / 2);

                for (let x = 0; x < width; x++) {
                    const y = wave.y + Math.sin(x * wave.length + wave.offset) * wave.amplitude;
                    ctx.lineTo(x, y);
                }

                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                wave.offset += wave.speed;
            });

            requestAnimationFrame(drawWaves);
        }

        window.addEventListener('resize', resize);
        resize();
        requestAnimationFrame(drawWaves);
    }


    /* ----------------------------------------------------------------
       3. BENCHMARKS SYSTEM (Full Content Injection + Slider)
       ---------------------------------------------------------------- */
    // Split Desc into Main Desc + Highlight
    const benchmarksData = [
        {
            name: "Revolut",
            value: "$45B",
            meta: "Fintech • Николай Сторонский",
            desc: "Глобальный финансовый SuperApp. Успех построен на устранении банковских комиссий за конвертацию валют.",
            highlight: "Самый дорогой финтех-стартап Великобритании — 35+ млн клиентов",
            loc: "Global, UK, EU"
        },
        {
            name: "Telegram",
            value: "$30B+",
            meta: "Social / Communication • Павел Дуров",
            desc: "Мессенджер с фокусом на приватность и скорость. Уникальная модель каналов и полная независимость.",
            highlight: "900 млн пользователей практически без маркетингового бюджета",
            loc: "Global"
        },
        {
            name: "Miro",
            value: "$17.5B",
            meta: "B2B SaaS • Андрей Хусид",
            desc: "Платформа для визуальной коллаборации. Стала незаменимой в пандемию, заменив офисную доску.",
            highlight: "Используется 99% компаний из списка Fortune 100",
            loc: "US, Global"
        },
        {
            name: "Playrix",
            value: "~$16B",
            meta: "Gamedev • Братья Бухманы",
            desc: "Гигант мобильного гейминга. Идеальная реализация Match-3 и глубокий нарратив.",
            highlight: "В тройке самых успешных мобильных издателей в мире",
            loc: "Global"
        },
        {
            name: "ServiceTitan",
            value: "$9.5B",
            meta: "Vertical B2B SaaS • Ара Магдесян, Ваге Кузоян",
            desc: "ПО для управления сервисным бизнесом. Создали софт для бизнесов своих отцов-иммигрантов.",
            highlight: "Стандарт индустрии в США — десятки миллиардов $ транзакций ежегодно",
            loc: "US, Canada"
        },
        {
            name: "JetBrains",
            value: "$7B+",
            meta: "DevTools • Сергей Дмитриев, Валентин Кипятков",
            desc: "Интеллектуальные инструменты для разработчиков. Создали язык Kotlin — стандарт для Android.",
            highlight: "Построили глобальную империю без венчурных инвестиций (Bootstrapped)",
            loc: "Global, EU"
        },
        {
            name: "Veeam",
            value: "$5B",
            meta: "Enterprise Software • Ратмир Тимашев, Андрей Баронов",
            desc: "Решения для бэкапа и управления данными. Продукт, который «просто работал».",
            highlight: "Продана за $5 млрд — один из крупнейших экзитов в истории софта",
            loc: "Global, US"
        },
        {
            name: "inDrive",
            value: "$3B+",
            meta: "Mobility / Ride-hailing • Арсен Томский",
            desc: "Такси-сервис «предложи свою цену». Пассажиры и водители сами договариваются о стоимости.",
            highlight: "2-е самое скачиваемое приложение такси в мире (2022-2023)",
            loc: "LatAm, Asia, Africa"
        },
        {
            name: "TradingView",
            value: "$3B",
            meta: "Fintech • Константин Иванов, Ден Глоба, Стэн Боков",
            desc: "Соцсеть и графики для трейдеров. Перенесли Bloomberg-инструментарий в обычный браузер.",
            highlight: "Стандарт де-факто для крипто-рынка — 50 млн пользователей/месяц",
            loc: "Global"
        },
        {
            name: "Nginx",
            value: "$670M",
            meta: "DeepTech / Infra • Игорь Сысоев",
            desc: "Веб-сервер с открытым кодом. Решил проблему C10k — 10,000 одновременных подключений.",
            highlight: "На Nginx работает треть всех сайтов в мире (Netflix, Instagram, Pinterest)",
            loc: "Global"
        },
        {
            name: "ZeroAvia",
            value: "$1B+",
            meta: "DeepTech / CleanTech • Валерий Мифтахов",
            desc: "Водородно-электрические двигатели для авиации. Первый полет на водородном топливном элементе.",
            highlight: "Инвестиции от Билла Гейтса, Amazon, Airbus и American Airlines",
            loc: "US, UK"
        },
        {
            name: "Krisp",
            value: "$100M+",
            meta: "AI / Audio • Давит Багдасарян",
            desc: "AI-шумоподавление для звонков. Кнопка «Mute» для плача детей и лая собак — вирусный рост.",
            highlight: "Официальный партнер Discord — миллионы геймеров ежедневно",
            loc: "US, Global"
        },
        {
            name: "Scentbird",
            value: "$100M+",
            meta: "E-commerce / Subscription • Мария Нурисламова",
            desc: "«Netflix для духов» — подписка на люксовые ароматы за $15/мес вместо целого флакона.",
            highlight: "После Y Combinator: от 400 подписчиков до выручки $60 млн+",
            loc: "US"
        },
        {
            name: "ManyChat",
            value: "Private",
            meta: "MarTech / SaaS • Микаэл Ян",
            desc: "Автоматизация маркетинга в мессенджерах. Чат-боты для Instagram и Facebook без кода.",
            highlight: "Миллиарды сообщений ежегодно — крупнейший партнер Meta по чат-маркетингу",
            loc: "Global, US"
        },
        {
            name: "CodeSignal",
            value: "$500M+",
            meta: "HR Tech / EdTech • Тигран Слоян",
            desc: "Платформа технического скрининга. Геймифицированная оценка навыков вместо резюме.",
            highlight: "Uber, Zoom, Facebook и Robinhood нанимают инженеров через CodeSignal",
            loc: "US"
        }
    ];

    const bmContent = document.getElementById('bmCardContent');
    const bmNavList = document.getElementById('bmNavList');
    const bmLogoLarge = document.getElementById('bmLogoLarge');
    let currentBmIndex = 0;
    let bmInterval;

    function renderBenchmark(index, isAuto = false) {
        const item = benchmarksData[index];
        // Fade out
        if (bmContent) {
            bmContent.style.opacity = 0;

            setTimeout(() => {
                bmContent.innerHTML = `
                    <div class="bm-details">
                        <span class="bm-value">${item.value}</span>
                        <h3 class="bm-title">${item.name}</h3>
                        <span class="bm-meta">${item.meta}</span>
                        <hr style="border: 0; border-top: 1px solid var(--c-border); margin: 24px 0;">
                        <p class="text-lg text-secondary mb-md">${item.desc}</p>
                        
                        <div class="bm-highlight-box">
                             <div class="bm-icon">★</div>
                             <p class="bm-highlight-text">${item.highlight}</p>
                        </div>

                        <span class="font-mono text-xs text-secondary-light uppercase tracking-wide mt-md display-block">${item.loc}</span>
                    </div>
                `;
                if (bmLogoLarge) bmLogoLarge.textContent = item.name.charAt(0);

                // Fade in
                bmContent.style.opacity = 1;
            }, 200);
        }

        // Update Nav Active State - SILENTLY (No Scroll)
        const navItems = document.querySelectorAll('.bm-nav-item');
        navItems.forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
    }

    // Init Nav List
    if (bmNavList) {
        benchmarksData.forEach((item, index) => {
            const navItem = document.createElement('div');
            navItem.className = `bm-nav-item ${index === 0 ? 'active' : ''}`;
            navItem.innerHTML = `
                <span class="bm-nav-name">${item.name}</span>
                <span class="bm-nav-val">${item.value}</span>
            `;
            navItem.addEventListener('click', () => {
                currentBmIndex = index;
                renderBenchmark(currentBmIndex, false); // User interaction
                resetBmInterval();
            });
            bmNavList.appendChild(navItem);
        });
    }

    // Auto Play Benchmarks
    function startBmInterval() {
        bmInterval = setInterval(() => {
            currentBmIndex = (currentBmIndex + 1) % benchmarksData.length;
            renderBenchmark(currentBmIndex, true); // Automatic
        }, 5000); // 5 seconds per slide
    }

    function resetBmInterval() {
        clearInterval(bmInterval);
        startBmInterval();
    }

    renderBenchmark(0, false);
    startBmInterval();



    /* ----------------------------------------------------------------
       7. FAQ ACCORDION
       ---------------------------------------------------------------- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Toggle active class
            const isActive = item.classList.contains('active');

            // Close all others (Accordion behavior)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

    /* ----------------------------------------------------------------
       8. FORMS & POPUP LOGIC
       ---------------------------------------------------------------- */
    const popup = document.getElementById('customPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupMsg = document.getElementById('popupMessage');
    const popupIcon = document.getElementById('popupIcon');
    const popupClose = document.getElementById('popupClose');

    function showPopup(title, message, isError = false) {
        if (!popup) return;
        popupTitle.textContent = title;
        popupMsg.textContent = message;

        // Icon Logic
        popupIcon.className = 'popup-icon'; // Reset class
        if (isError) {
            popupIcon.style.background = '#ff4d4d';
            popupIcon.textContent = '!';
            popupIcon.style.boxShadow = '0 10px 20px rgba(255, 77, 77, 0.3)';
            // Trigger Shake
            const card = popup.querySelector('.popup-card');
            card.classList.remove('shake');
            void card.offsetWidth; // Force reflow
            card.classList.add('shake');
        } else {
            popupIcon.style.background = '#00cc66'; // Green for success
            popupIcon.textContent = '✓';
            popupIcon.style.boxShadow = '0 10px 20px rgba(0, 204, 102, 0.3)';
            popup.querySelector('.popup-card').classList.remove('shake');
        }

        popup.classList.remove('hidden');
        // Force reflow
        void popup.offsetWidth;
        popup.classList.add('active');
    }

    function hidePopup() {
        if (!popup) return;
        popup.classList.remove('active');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 300);
    }

    if (popupClose) {
        popupClose.addEventListener('click', hidePopup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup) hidePopup();
        });
    }

    // Lead Magnet Forms
    const lmForms = document.querySelectorAll('.lm-form');
    lmForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                showPopup("Ошибка", "Поле Email не может быть пустым.", true);
                emailInput.focus();
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showPopup("Ошибка", "Пожалуйста, введите корректный Email адрес.", true);
                emailInput.focus();
                return;
            }

            // Real AJAX
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            const type = form.dataset.lmId;
            btn.textContent = "Отправка...";
            btn.disabled = true;

            const scriptURL = 'https://script.google.com/macros/s/AKfycbx6zvJU8aIJMcL0oN4V7htwlNwSVF8EgD_3I0jUwjEYDRN5GZ9O20fVI2hqhBCtHkw/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: type,
                    contact: email,
                    date: new Date().toISOString()
                })
            })
                .then(() => {
                    // With no-cors, we can't read the response, but we assume success if no network error
                    btn.textContent = "Успешно";
                    emailInput.value = "";
                    showPopup("Готово!", "Ссылка на материал отправлена на " + email);
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.textContent = originalText;
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    showPopup("Ошибка", "Не удалось отправить данные. Попробуйте позже.", true);
                    btn.disabled = false;
                    btn.textContent = originalText;
                });
        });
    });

    // Strategic Form
    const stratForm = document.getElementById('strategicForm');
    if (stratForm) {
        stratForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const contactInput = stratForm.querySelector('input[name="contact"]');
            const contact = contactInput.value.trim();

            if (!contact) {
                showPopup("Внимание", "Поле 'Telegram / WhatsApp / Email' обязательно для заполнения.", true);
                return;
            }

            // Real AJAX
            const btn = stratForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = "Отправка...";
            btn.disabled = true;

            const scriptURL = 'https://script.google.com/macros/s/AKfycbx6zvJU8aIJMcL0oN4V7htwlNwSVF8EgD_3I0jUwjEYDRN5GZ9O20fVI2hqhBCtHkw/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'strategic',
                    name: nameInput.value,
                    contact: contactInput.value,
                    message: msgInput.value,
                    date: new Date().toISOString()
                })
            })
                .then(() => {
                    btn.textContent = "Успешно";
                    stratForm.reset();
                    showPopup("Заявка принята!", "Мы свяжемся с вами в ближайшее время.");
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.textContent = originalText;
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    showPopup("Ошибка", "Не удалось отправить заявку. Попробуйте позже.", true);
                    btn.disabled = false;
                    btn.textContent = originalText;
                });
        });
    }

});
