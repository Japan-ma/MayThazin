// ၁။ စာမျက်နှာများကို တစ်ခုပြီးတစ်ခု ပြောင်းလဲပေးမည့် စနစ်
function nextPage(pageNumber) {
    // လက်ရှိပွင့်နေသော စာမျက်နှာကို ဖျောက်ခြင်း
    const currentActive = document.querySelector('.page.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }

    // စာမျက်နှာအသစ်ကို ဖွင့်ခြင်း
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// ၂။ နောက်ခံတွင် ကြယ်ပွင့်လေးများ ကျပန်း (Random) ဖြန့်ကျက်ဖန်တီးပေးသည့် စနစ်
function createCosmicStars() {
    const starsBox = document.getElementById('starsBox');
    const starCount = 60; // ကြယ်ပွင့်အရေအတွက်

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random အရွယ်အစားနှင့် တည်နေရာတွက်ချက်ခြင်း
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;

        starsBox.appendChild(star);
    }
}

// ၃။ သီချင်း ဖွင့်/ပိတ် (Play/Pause) ပြုလုပ်ပေးသည့် စနစ်
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(error => console.log("Music play blocked by browser. Click again!"));
        musicBtn.style.boxShadow = "0 0 20px #ff007f";
        musicBtn.style.borderColor = "#ff007f";
        musicBtn.style.color = "#ff007f";
    } else {
        bgMusic.pause();
        musicBtn.style.boxShadow = "0 0 10px #00d2ff";
        musicBtn.style.borderColor = "#00d2ff";
        musicBtn.style.color = "#00d2ff";
    }
});

// ၄။ မွေးနေ့အတွက် Countdown ရက်တွက်ချက်ပေးသည့် စနစ်
function startCountdown() {
    // မွေးနေ့ရှင်၏ မွေးနေ့ကို ထည့်သွင်းရန် (နှစ်၊ လ၊ ရက်)
    const targetDate = new Date("July 6, 2026 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // အချိန်တွက်ချက်ခြင်း Logic
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        // UI တွင် စာသားများ အစားထိုးခြင်း
        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    }, 1000);
}

// ၅။ ဓာတ်ပုံ Slider အတွက် စနစ်
let currentSlideIndex = 1;
const slides = document.querySelectorAll('.slide-card');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active-slide'));
    
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;
    
    slides[currentSlideIndex].classList.add('active-slide');
}

function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

// Website စတင်ပွင့်ချိန်တွင် လုပ်ဆောင်ချက်များကို နှိုးဆော်ခြင်း
window.onload = () => {
    createCosmicStars();
    startCountdown();
};
