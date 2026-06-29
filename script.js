// ၁။ စာမျက်နှာများကို တစ်ခုပြီးတစ်ခု ပြောင်းလဲပေးမည့် စနစ်
function nextPage(pageNumber) {
    const currentActive = document.querySelector('.page.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }

    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// ၂။ နောက်ခံတွင် ကြယ်ပွင့်လေးများ ကျပန်း (Random) ဖြန့်ကျက်ဖန်တီးပေးသည့် စနစ်
function createCosmicStars() {
    const starsBox = document.getElementById('starsBox');
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
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
    const targetDate = new Date("July 6, 2026 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

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

function nextSlide() { currentSlideIndex++; showSlide(currentSlideIndex); }
function prevSlide() { currentSlideIndex--; showSlide(currentSlideIndex); }


// ၆။ SCREEN ထိလျှင် မီးပန်းပွင့်မည့် အထူးစနစ် (FIREWORKS ENGINE)
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Canvas အရွယ်အစားကို Screen နှင့် အပြည့်ညှိခြင်း
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];

// မီးပန်းမှုန် အမှုန်အမွှားတစ်ခုချင်းစီ၏ တည်ဆောက်ပုံ Class
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // ကျပန်း လွင့်စင်မည့် လားရာနှုန်း
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2; 
        this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
        this.gravity = 0.05; // အောက်သို့ ပြန်ကြွေကျမည့် အရှိန်
        this.alpha = 1; // မှုန်ဝါးပျောက်ကွယ်သွားမည့် တန်ဖိုး
        this.decay = Math.random() * 0.015 + 0.015;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        // မီးပန်းကို တောက်ပစေရန် Glow Effect ထည့်ခြင်း
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }
}

// Screen ကို ထိလိုက်/နှိပ်လိုက်လျှင် မီးပန်းဖန်တီးပေးခြင်း
function createFirework(clientX, clientY) {
    const particleCount = 40; // နှိပ်လိုက်တိုင်း ကွဲထွက်မည့် အမှုန်အရေအတွက်
    // အရောင်စုံ နီယွန်ကာလာများ
    const colors = ['#ff007f', '#00d2ff', '#00ffaa', '#ffea00', '#ff00ff', '#ffffff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(clientX, clientY, randomColor));
    }
}

// Mouse Click သို့မဟုတ် ဖုန်း Screen Touch ထိမှုများကို ဖမ်းယူခြင်း
window.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

window.addEventListener('touchstart', (e) => {
    // ဖုန်း Screen ပေါ်တွင် ထိသည့်နေရာ
    createFirework(e.touches[0].clientX, e.touches[0].clientY);
});

// မီးပန်းများကို ဇာတ်တိုက် ရွှေ့လျားစေပြီး ပုံဖော်ပေးမည့် Loop Animation
function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });
}

// Website စတင်ပွင့်ချိန်တွင် လုပ်ဆောင်ချက်များကို နှိုးဆော်ခြင်း
window.onload = () => {
    createCosmicStars();
    startCountdown();
    animateFireworks();
};
