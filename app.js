/* -------------------------------------------------------------
   LUCY'S SWEET 16TH BIRTHDAY CELEBRATION APP SCRIPT
   Interactive Runaway Button, Video Modals, Melody, & Confetti
------------------------------------------------------------- */

// ==========================================
// 1. FLOATING HEARTS CANVAS ANIMATION
// ==========================================
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas.getContext('2d');
let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = Math.random() > 0.3 ? 'rgba(255, 77, 128, ' : 'rgba(255, 182, 193, ';
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, (this.size + topCurveHeight) / 2 + 5, 0, this.size);
        ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 2 + 5, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
            this.reset();
        }
    }
}

for (let i = 0; i < 26; i++) {
    hearts.push(new Heart());
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animateHearts);
}
animateHearts();


// ==========================================
// 2. ROMANTIC DREAMY WEB-AUDIO SYNTHESIZER
// ==========================================
let audioCtx = null;
let isPlayingMelody = false;
let melodyInterval = null;

const notesFrequency = [
    261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25
];
// Sweet music-box tune
const tuneSequence = [4, 6, 7, 6, 4, 2, 4, 5, 7, 8, 7, 5, 4, 3, 2, 3];

function playChimeNote(freq, time = 0) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + time);

    gain.gain.setValueAtTime(0, audioCtx.currentTime + time);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + time + 1.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime + time);
    osc.stop(audioCtx.currentTime + time + 1.8);
}

const musicToggleBtn = document.getElementById('musicToggle');
const musicIcon = musicToggleBtn.querySelector('.music-icon');
const musicText = musicToggleBtn.querySelector('.music-text');

musicToggleBtn.addEventListener('click', () => {
    if (!isPlayingMelody) {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isPlayingMelody = true;
        musicToggleBtn.classList.add('playing');
        musicIcon.textContent = '⏸️';
        musicText.textContent = 'Pause Melody';

        let step = 0;
        playChimeNote(notesFrequency[tuneSequence[step]]);
        step++;

        melodyInterval = setInterval(() => {
            const noteIdx = tuneSequence[step % tuneSequence.length];
            playChimeNote(notesFrequency[noteIdx]);
            // gentle bell harmony
            if (step % 4 === 0) {
                playChimeNote(notesFrequency[noteIdx] * 0.5, 0.1);
            }
            step++;
        }, 460);
    } else {
        isPlayingMelody = false;
        clearInterval(melodyInterval);
        musicToggleBtn.classList.remove('playing');
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Play Melody';
    }
});


// ==========================================
// 3. POLAROID PHOTO ZOOM
// ==========================================
const photoModal = document.getElementById('photoModal');
const photoModalImg = document.getElementById('photoModalImg');
const photoModalCaption = document.getElementById('photoModalCaption');

document.querySelectorAll('.polaroid-item').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.getAttribute('data-photo');
        const caption = item.getAttribute('data-caption');
        photoModalImg.src = src;
        photoModalCaption.textContent = caption;
        photoModal.classList.add('active');
    });
});


// ==========================================
// 4. HEARTFELT BIRTHDAY NOTES
// ==========================================
const notesData = {
    1: {
        title: "From June 30th to Forever 💕",
        body: "Lucy, remember that train ride on June 30th? Seeing you in your school uniform stopped time for me. I was nervous, but walking up to talk to you was the single best decision I have ever made. You bring so much light and beauty into my life."
    },
    2: {
        title: "Our 11:11 Promise 🌟",
        body: "11th September at 11:11 PM — when everyone else was making wishes on the clock, I was wishing for a lifetime with you. We've had our misunderstandings, arguments, and conflicts, but fighting FOR each other rather than WITH each other made us invincible."
    },
    3: {
        title: "Happy Sweet 16th Birthday! 🎂✨",
        body: "Born on 26th October, 2010. Today you officially turn 16! May this year bring you the happiest smiles, all the dreams you wish for, and endless reasons to laugh. Thank you for being my girlfriend, my best friend, and my whole heart."
    }
};

function openNote(id) {
    const note = notesData[id];
    if (note) {
        document.getElementById('noteTitle').textContent = note.title;
        document.getElementById('noteBody').textContent = note.body;
        document.getElementById('noteModal').classList.add('active');
    }
}


// ==========================================
// 5. THE RUNAWAY "NO" BUTTON (MOBILE-PROOF)
// ==========================================
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttonArena = document.getElementById('buttonArena');
const noTauntText = document.getElementById('noTauntText');

const taunts = [
    "Nice try! 😜 Can't click that!",
    "Wrong button haha! Try the pink one 💕",
    "Nope! You're stuck with me forever 🥰",
    "Error 404: 'No' does not exist! 😂",
    "You know you love me! Don't lie 🤭",
    "That button is purely decorative 💅",
    "Nu-uh! Only YES allowed for the birthday girl! 💖",
    "Too slow! Try catching me! 🏃‍♀️💨"
];

let noDodgeCount = 0;
let yesScale = 1.0;

function dodgeNoButton(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    noDodgeCount++;

    // Grow the YES button to make it even more irresistible!
    yesScale += 0.08;
    if (yesScale > 1.8) yesScale = 1.8;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Select random taunt
    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    noTauntText.textContent = randomTaunt;

    // Get arena boundaries
    const arenaRect = buttonArena.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // In mobile, move it dynamically within the safe visible arena box
    const maxRelX = Math.max(10, (arenaRect.width - btnRect.width) / 2);
    const maxRelY = 70;

    const randomX = (Math.random() * 2 - 1) * maxRelX;
    const randomY = (Math.random() * 2 - 1) * maxRelY;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.92)`;

    // If she tries 6+ times, convert No to Yes as a funny fail-safe!
    if (noDodgeCount >= 6) {
        noBtn.textContent = "YES! 💖 (I gave up)";
        noBtn.style.background = "linear-gradient(135deg, #ff759f, #ff8fab)";
        noBtn.style.color = "#ffffff";
        noBtn.style.borderColor = "#ff4d80";
    }
}

// Mobile and Desktop comprehensive evasion triggers
noBtn.addEventListener('mouseenter', dodgeNoButton);
noBtn.addEventListener('mouseover', dodgeNoButton);
noBtn.addEventListener('touchstart', dodgeNoButton, { passive: false });
noBtn.addEventListener('pointerdown', dodgeNoButton, { passive: false });
noBtn.addEventListener('pointerover', dodgeNoButton, { passive: false });
noBtn.addEventListener('click', (e) => {
    // If somehow clicked or if converted
    if (noDodgeCount < 6) {
        dodgeNoButton(e);
    } else {
        triggerYesCelebration();
    }
});

// YES BUTTON CELEBRATION
yesBtn.addEventListener('click', triggerYesCelebration);

function triggerYesCelebration() {
    // Canvas confetti burst
    confettiCelebration();

    // Open confirmation modal
    document.getElementById('yesModal').classList.add('active');
}

function confettiCelebration() {
    if (typeof confetti === 'function') {
        // Multi-stage confetti
        confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            confetti({
                particleCount: 60,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
        }, 200);

        setTimeout(() => {
            confetti({
                particleCount: 60,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 400);
    }
}

function closeYesModalAndScroll() {
    closeModal('yesModal');
    const surpriseSection = document.getElementById('surprise-section');
    surpriseSection.scrollIntoView({ behavior: 'smooth' });
}


// ==========================================
// 6. GIFTS & VIDEO MODAL SURPRISES
// ==========================================
let gift1Opened = false;

function openCringeGift() {
    gift1Opened = true;
    const modal = document.getElementById('cringeModal');
    modal.classList.add('active');
    const video = document.getElementById('cringeVideo');
    video.currentTime = 0;
    video.play().catch(() => {});

    // Unlock Grand Finale Gift 2
    unlockGift2();
}

function unlockGift2() {
    const gift2Card = document.getElementById('giftCard2');
    gift2Card.classList.remove('locked-gift');
    gift2Card.classList.add('unlocked');
    document.getElementById('gift2Icon').textContent = '👑';
    document.getElementById('gift2Desc').textContent = 'Unlocked! Tap here to watch our grand fabulous finale! ✨';
    document.getElementById('gift2BtnText').textContent = 'Open Final Gift 👑✨';
}

function proceedToFinalGift() {
    closeModal('cringeModal');
    setTimeout(() => {
        openFabGift();
    }, 400);
}

function openFabGift() {
    if (!gift1Opened) {
        const gift2Card = document.getElementById('giftCard2');
        gift2Card.style.animation = 'gentleBounce 0.4s 2';
        alert("Psst! Open Surprise #1 first to unlock this one! 😉💖");
        setTimeout(() => {
            gift2Card.style.animation = '';
        }, 1000);
        return;
    }

    const modal = document.getElementById('fabModal');
    modal.classList.add('active');
    const video = document.getElementById('fabVideo');
    video.currentTime = 0;
    video.play().catch(() => {});

    // Golden fireworks confetti
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 90,
            colors: ['#f6c867', '#ffd700', '#ff69b4', '#ff1493'],
            origin: { y: 0.5 }
        });
    }
}


// ==========================================
// 7. MODAL HELPERS
// ==========================================
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Pause any running videos inside
        const videos = modal.querySelectorAll('video');
        videos.forEach(v => v.pause());
    }
}

// Close modals when clicking outside card
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});
