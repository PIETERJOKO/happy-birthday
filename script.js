// ============================================
// HAPPY BIRTHDAY ONLINE
// HTML + CSS + JAVASCRIPT
// ============================================

// ====== GANTI BAGIAN INI ======
const birthdayName = "Mutia Dwi Septianti, S.Pd., Gr.";

const birthdayMessage =
    "Semoga di usia yang baru kamu selalu diberikan " +
    "kesehatan, kebahagiaan, kesuksesan, dan keberanian " +
    "untuk mengejar semua impianmu. ❤️";
// ============================================


const loading = document.getElementById("loading");
const nameEl = document.getElementById("name");
const modalName = document.getElementById("modalName");
const messageEl = document.getElementById("message");

const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const wishBtn = document.getElementById("wishBtn");
const againBtn = document.getElementById("againBtn");

const modal = document.getElementById("modal");
const finalScreen = document.getElementById("finalScreen");

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let confetti = [];
let animationFrame = null;


// ====== SETUP CANVAS ======

function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ====== DATA UCAPAN ======

nameEl.textContent = birthdayName;
modalName.textContent = birthdayName;
messageEl.textContent = birthdayMessage;


// ====== LOADING ======

window.addEventListener("load", () => {
    setTimeout(() => {
        loading.classList.add("hide");
    }, 900);
});


// ====== BUKA KEJUTAN ======

openBtn.addEventListener("click", () => {
    modal.classList.add("active");

    burstConfetti(
        window.innerWidth / 2,
        window.innerHeight / 2,
        100
    );
});


// ====== TUTUP ======

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});


// Klik area luar modal
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("active");
    }
});


// ====== MAKE A WISH ======

wishBtn.addEventListener("click", () => {

    modal.classList.remove("active");

    setTimeout(() => {
        finalScreen.classList.add("active");

        bigCelebration();

    }, 350);
});


// ====== LIHAT LAGI ======

againBtn.addEventListener("click", () => {

    finalScreen.classList.remove("active");

    setTimeout(() => {
        burstConfetti(
            window.innerWidth / 2,
            window.innerHeight / 2,
            120
        );
    }, 300);
});


// ====== CONFETTI ======

const colors = [
    "#ff4fa3",
    "#ffcf5c",
    "#72d8ff",
    "#a875ff",
    "#ffffff",
    "#68efb1"
];

function createParticle(x, y) {

    return {
        x: x,
        y: y,

        vx: (Math.random() - 0.5) * 12,
        vy: -(Math.random() * 10 + 4),

        gravity: 0.22,

        size: Math.random() * 6 + 3,

        rotation: Math.random() * Math.PI,

        rotationSpeed:
            (Math.random() - 0.5) * 0.25,

        color:
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ],

        life: 1,

        decay:
            Math.random() * 0.008 + 0.004
    };
}


function burstConfetti(x, y, amount) {

    for (let i = 0; i < amount; i++) {
        confetti.push(
            createParticle(x, y)
        );
    }

    if (!animationFrame) {
        animateConfetti();
    }
}


function animateConfetti() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for (let i = confetti.length - 1; i >= 0; i--) {

        const p = confetti[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vy += p.gravity;

        p.rotation += p.rotationSpeed;

        p.life -= p.decay;

        ctx.save();

        ctx.globalAlpha =
            Math.max(0, p.life);

        ctx.translate(p.x, p.y);

        ctx.rotate(p.rotation);

        ctx.fillStyle = p.color;

        ctx.fillRect(
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size * 1.8
        );

        ctx.restore();

        if (p.life <= 0 || p.y > window.innerHeight + 30) {
            confetti.splice(i, 1);
        }
    }

    if (confetti.length > 0) {
        animationFrame =
            requestAnimationFrame(
                animateConfetti
            );
    } else {
        animationFrame = null;

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
    }
}


// ====== PERAYAAN BESAR ======

function bigCelebration() {

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight * 0.45;

    for (let i = 0; i < 7; i++) {

        setTimeout(() => {

            const x =
                Math.random() *
                window.innerWidth;

            const y =
                Math.random() *
                window.innerHeight *
                0.65;

            burstConfetti(x, y, 70);

        }, i * 250);
    }

    burstConfetti(
        centerX,
        centerY,
        180
    );
}


// ====== KEYBOARD ======

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("active");
    }

});


// ====== TAMBAHAN: KLIK LAYAR UNTUK CONFETTI ======

document.addEventListener("click", (event) => {

    if (
        event.target.tagName !== "BUTTON" &&
        !modal.classList.contains("active") &&
        !finalScreen.classList.contains("active")
    ) {

        burstConfetti(
            event.clientX,
            event.clientY,
            25
        );
    }

});
