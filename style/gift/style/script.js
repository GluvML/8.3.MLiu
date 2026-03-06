const stars = document.getElementById("stars");
const fireflies = document.getElementById("fireflies");
const petals = document.getElementById("petals");
const sparkles = document.getElementById("sparkles");
const ground = document.getElementById("ground");
const mainContent = document.getElementById("mainContent");
const popSound = document.getElementById("pop-sound");

const IMAGE_COUNT = 14;
const IMAGE_BASE_PATH = "./style/img";

let explosionIcon = "💗";
let isGifting = true;
let giftInterval = null;
let isMessaging = true;
let messageInterval = null;
let messages = ["Anh yêu em ❤️"];

/* =========================
   LOAD MESSAGE
========================= */
async function loadMessages() {
  try {
    const res = await fetch("./style/mess.txt");
    const text = await res.text();

    const list = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (list.length > 0) {
      messages = list;
    }
  } catch (error) {
    console.error("Không tải được mess.txt:", error);
    messages = ["Anh yêu em ❤️"];
  }
}

/* =========================
   BACKGROUND EFFECTS
========================= */
function makeStars(count = 90) {
  if (!stars) return;

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 72}%`;
    s.style.setProperty("--dur", `${2 + Math.random() * 4}s`);
    s.style.setProperty("--op", `${0.2 + Math.random() * 0.8}`);
    s.style.transform = `scale(${0.6 + Math.random() * 1.2})`;
    stars.appendChild(s);
  }
}

function makeSparkles(count = 28) {
  if (!sparkles) return;

  for (let i = 0; i < count; i++) {
    const sp = document.createElement("span");
    sp.className = "spark";
    sp.style.left = `${34 + Math.random() * 32}%`;
    sp.style.top = `${34 + Math.random() * 36}%`;
    sp.style.setProperty("--sd", `${1.6 + Math.random() * 3}s`);
    sp.style.opacity = `${0.3 + Math.random() * 0.8}`;
    sparkles.appendChild(sp);
  }
}

function makeFireflies(count = 34) {
  if (!fireflies) return;

  for (let i = 0; i < count; i++) {
    const f = document.createElement("span");
    const zone = Math.random();

    const x =
      zone < 0.2
        ? 8 + Math.random() * 22
        : zone > 0.8
        ? 70 + Math.random() * 22
        : 24 + Math.random() * 52;

    const y = 26 + Math.random() * 54;
    const size = 0.34 + Math.random() * 0.58;
    const duration = 4.8 + Math.random() * 7.2;
    const isSoft = Math.random() > 0.55;
    const isFast = Math.random() > 0.62;

    f.className = `firefly${isSoft ? " soft" : ""}${isFast ? " fast" : ""}`;
    f.style.left = `${x}%`;
    f.style.top = `${y}%`;
    f.style.setProperty("--size", `${size}vmin`);
    f.style.setProperty("--fd", `${duration}s`);
    f.style.setProperty("--op", `${0.5 + Math.random() * 0.45}`);
    f.style.setProperty("--dx1", `${(-2 + Math.random() * 4).toFixed(2)}`);
    f.style.setProperty("--dy1", `${(-1.5 - Math.random() * 2.5).toFixed(2)}`);
    f.style.setProperty("--dx2", `${(-3 + Math.random() * 6).toFixed(2)}`);
    f.style.setProperty("--dy2", `${(-4 - Math.random() * 3.5).toFixed(2)}`);
    f.style.setProperty("--dx3", `${(-4 + Math.random() * 8).toFixed(2)}`);
    f.style.setProperty("--dy3", `${(-6 - Math.random() * 4).toFixed(2)}`);
    f.style.setProperty("--dx4", `${(-4 + Math.random() * 8).toFixed(2)}`);
    f.style.setProperty("--dy4", `${(-9 - Math.random() * 4.2).toFixed(2)}`);
    f.style.setProperty("--dx5", `${(-3 + Math.random() * 6).toFixed(2)}`);
    f.style.setProperty("--dy5", `${(-12 - Math.random() * 5).toFixed(2)}`);
    f.style.animationDelay = `${-Math.random() * 12}s`;

    fireflies.appendChild(f);
  }
}

function makePetals(count = 14) {
  if (!petals) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "falling-petal";
    p.style.left = `${15 + Math.random() * 70}%`;
    p.style.setProperty("--size", `${1 + Math.random() * 1.6}vmin`);
    p.style.setProperty("--fall", `${8 + Math.random() * 9}s`);
    p.style.setProperty("--x", `${-10 + Math.random() * 20}vw`);
    p.style.setProperty("--rot", `${180 + Math.random() * 260}deg`);
    p.style.animationDelay = `${-Math.random() * 12}s`;
    petals.appendChild(p);
  }
}

function makeGrass(count = 280) {
  if (!ground) return;

  const zones = [
    { center: 18, spread: 20, weight: 0.2 },
    { center: 50, spread: 42, weight: 0.56 },
    { center: 82, spread: 20, weight: 0.24 }
  ];

  for (let i = 0; i < count; i++) {
    const blade = document.createElement("span");
    const pick = Math.random();

    const zone =
      pick < zones[0].weight
        ? zones[0]
        : pick < zones[0].weight + zones[1].weight
        ? zones[1]
        : zones[2];

    const x = zone.center + (Math.random() - 0.5) * zone.spread;
    const edgeBoost = zone.center !== 50;
    const front = Math.random() > (edgeBoost ? 0.28 : 0.38);
    const tall = edgeBoost ? 9 + Math.random() * 14 : 10 + Math.random() * 15;

    blade.className = `grass ${front ? "front" : "back"} ${Math.random() > 0.48 ? "curve" : ""}`;
    blade.style.left = `${Math.max(0, Math.min(100, x))}%`;
    blade.style.setProperty("--h", `${tall}vmin`);
    blade.style.setProperty("--w", `${0.36 + Math.random() * (edgeBoost ? 1.22 : 1.02)}vmin`);
    blade.style.setProperty("--r", `${-54 + Math.random() * 108}deg`);
    blade.style.setProperty("--d", `${2.4 + Math.random() * 3.6}s`);
    blade.style.setProperty("--o", `${front ? 0.54 + Math.random() * 0.34 : 0.2 + Math.random() * 0.3}`);
    blade.style.setProperty("--z", `${front ? 2 + Math.floor(Math.random() * 3) : 1}`);
    blade.style.animationDelay = `${-Math.random() * 3.4}s`;

    ground.appendChild(blade);
  }
}

function makeBushBase() {
  if (!ground) return;

  const clumps = [
    { x: 50, w: 42, h: 16 },
    { x: 18, w: 22, h: 10 },
    { x: 32, w: 18, h: 9 },
    { x: 68, w: 18, h: 9 },
    { x: 82, w: 22, h: 10 }
  ];

  clumps.forEach((item) => {
    const c = document.createElement("span");
    c.className = "ground-clump";
    c.style.left = `${item.x}%`;
    c.style.setProperty("--w", `${item.w}vmin`);
    c.style.setProperty("--h", `${item.h}vmin`);
    ground.appendChild(c);
  });
}

function makeBushLeaves(count = 32) {
  if (!ground) return;

  const anchors = [18, 30, 50, 70, 82];

  for (let i = 0; i < count; i++) {
    const stem = document.createElement("span");
    const anchor = anchors[Math.floor(Math.random() * anchors.length)];
    const x = anchor + (Math.random() - 0.5) * (anchor === 50 ? 18 : 12);
    const height = 10 + Math.random() * 16;
    const rot = -22 + Math.random() * 44;
    const z = 2 + Math.floor(Math.random() * 3);

    stem.className = "bush-stem";
    stem.style.setProperty("--x", `${x}%`);
    stem.style.setProperty("--h", `${height}vmin`);
    stem.style.setProperty("--w", `${0.42 + Math.random() * 0.7}vmin`);
    stem.style.setProperty("--r", `${rot}deg`);
    stem.style.setProperty("--z", `${z}`);
    stem.style.setProperty("--d", `${3.4 + Math.random() * 2.8}s`);
    stem.style.animationDelay = `${-Math.random() * 4}s`;
    ground.appendChild(stem);

    const leafCount = 2 + Math.floor(Math.random() * 3);

    for (let j = 0; j < leafCount; j++) {
      const leaf = document.createElement("span");
      const side = Math.random() > 0.5 ? 1 : -1;

      leaf.className = "bush-leaf";
      leaf.style.setProperty("--x", `${x + side * (1.2 + Math.random() * 2.6)}%`);
      leaf.style.setProperty("--y", `${3.8 + j * (height / (leafCount + 0.6)) + Math.random() * 1.8}vmin`);
      leaf.style.setProperty("--w", `${3.8 + Math.random() * 4.4}vmin`);
      leaf.style.setProperty("--h", `${2 + Math.random() * 2.4}vmin`);
      leaf.style.setProperty("--r", `${(side === 1 ? -1 : 1) * (18 + Math.random() * 30)}deg`);
      leaf.style.setProperty("--z", `${z + 1}`);
      leaf.style.setProperty("--o", `${0.78 + Math.random() * 0.22}`);
      leaf.style.setProperty("--d", `${3 + Math.random() * 2.4}s`);
      leaf.style.animationDelay = `${-Math.random() * 4}s`;

      ground.appendChild(leaf);
    }
  }
}

/* =========================
   IMAGE HELPERS
========================= */
function getRandomImagePath() {
  const index = Math.floor(Math.random() * IMAGE_COUNT) + 1;
  return `${IMAGE_BASE_PATH}/Anh (${index}).jpg`;
}

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

/* =========================
   FALLING IMAGES
========================= */
async function createFallingImage() {
  if (!isGifting || !document.body) return;

  const imageSrc = getRandomImagePath();

  try {
    await preloadImage(imageSrc);
  } catch {
    return;
  }

  const img = document.createElement("img");
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 600;

  const width = isMobile
    ? 55 + Math.random() * 40
    : 70 + Math.random() * 70;

  const left = Math.random() * Math.max(screenWidth - width, 0);
  const duration = 4.2 + Math.random() * 4.3;
  const delay = Math.random() * 0.35;
  const opacity = 0.78 + Math.random() * 0.22;
  const radius = 14 + Math.random() * 16;

  const startRotate = -14 + Math.random() * 28;
  const endRotate = startRotate + (-22 + Math.random() * 44);
  const driftX = -90 + Math.random() * 180;
  const driftMid = driftX * (0.35 + Math.random() * 0.15);
  const driftLate = driftX * (0.72 + Math.random() * 0.12);

  img.src = imageSrc;
  img.alt = "falling photo";
  img.className = "falling-image";
  img.style.left = `${left}px`;
  img.style.width = `${width}px`;
  img.style.height = "auto";
  img.style.opacity = `${opacity}`;
  img.style.borderRadius = `${radius}px`;
  img.style.animation = "none";

  document.body.appendChild(img);

  const animation = img.animate(
    [
      {
        transform: `translate3d(0, -180px, 0) rotate(${startRotate}deg) scale(0.92)`,
        opacity: 0
      },
      {
        transform: `translate3d(${driftMid}px, 32vh, 0) rotate(${startRotate + 6}deg) scale(1)`,
        opacity: opacity
      },
      {
        transform: `translate3d(${driftLate}px, 72vh, 0) rotate(${endRotate - 4}deg) scale(1.03)`,
        opacity: opacity
      },
      {
        transform: `translate3d(${driftX}px, calc(100vh + 220px), 0) rotate(${endRotate}deg) scale(0.98)`,
        opacity: 0
      }
    ],
    {
      duration: duration * 1000,
      delay: delay * 1000,
      easing: "linear",
      fill: "forwards"
    }
  );

  animation.onfinish = () => {
    img.remove();
  };

  setTimeout(() => {
    img.remove();
  }, (duration + delay) * 1000 + 400);
}

/* =========================
   FALLING MESSAGES
========================= */
function createFallingMessage() {
  if (!isMessaging || !document.body) return;

  const el = document.createElement("div");
  const palette = [
    { text: "#ff69b4", border: "#ffb6c1" },
    { text: "#9370db", border: "#e6e6fa" },
    { text: "#ff8c00", border: "#ffe4b5" },
    { text: "#20b2aa", border: "#e0ffff" },
    { text: "#ff1493", border: "#ffc0cb" },
    { text: "#40e0d0", border: "#afeeee" }
  ];

  const picked = palette[Math.floor(Math.random() * palette.length)];
  const text = messages[Math.floor(Math.random() * messages.length)] || "Anh yêu em ❤️";

  const screenWidth = window.innerWidth;
  const padding = 20;
  const safeWidth = 220;
  const left = Math.random() * Math.max(screenWidth - safeWidth - padding * 2, 60) + padding;
  const duration = 5 + Math.random() * 5;
  const fontSize = screenWidth < 600
    ? 14 + Math.random() * 4
    : 16 + Math.random() * 6;

  el.className = "falling-message";
  el.innerText = text;
  el.style.left = `${left}px`;
  el.style.fontSize = `${fontSize}px`;
  el.style.color = picked.text;
  el.style.borderColor = picked.border;

  document.body.appendChild(el);

  const driftX = -25 + Math.random() * 50;
  const animation = el.animate(
    [
      { transform: "translate3d(0, -120px, 0)", opacity: 0 },
      { transform: `translate3d(${driftX * 0.3}px, 30vh, 0)`, opacity: 1 },
      { transform: `translate3d(${driftX * 0.8}px, 70vh, 0)`, opacity: 0.95 },
      { transform: `translate3d(${driftX}px, calc(100vh + 140px), 0)`, opacity: 0 }
    ],
    {
      duration: duration * 1000,
      easing: "linear",
      fill: "forwards"
    }
  );

  animation.onfinish = () => {
    el.remove();
  };

  setTimeout(() => {
    el.remove();
  }, duration * 1000 + 300);
}

/* =========================
   HEART BURST
========================= */
function createHearts(x, y) {
  const icons = ["💗", "💖", "💕", "💘", "💝", "❤️"];
  const total = 15;

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("div");
    const angle = Math.random() * Math.PI * 2;
    const radius = 50 + Math.random() * 150;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    heart.className = "heart";
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)] || explosionIcon;
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${10 + Math.random() * 20}px`;
    heart.style.setProperty("--x", `${dx}px`);
    heart.style.setProperty("--y", `${dy}px`);
    heart.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360 - 180}deg)`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

/* =========================
   SOUND
========================= */
function playPopSound() {
  if (!popSound) return;

  const sound = popSound.cloneNode(true);
  sound.play().catch(() => {});
}

/* =========================
   START
========================= */
function startExperience() {
  if (mainContent && mainContent.classList.contains("hidden")) {
    mainContent.classList.remove("hidden");
  }

  document.body.classList.remove("container");

  setTimeout(() => {
    createFallingImage();
    createFallingMessage();

    giftInterval = setInterval(() => {
      createFallingImage();
    }, 900);

    messageInterval = setInterval(() => {
      createFallingMessage();
    }, 1500);
  }, 5000);
}

/* =========================
   INIT
========================= */
window.addEventListener("load", async () => {
  await loadMessages();

  makeStars();
  makeSparkles();
  makeFireflies();
  makePetals();
  makeBushBase();
  makeGrass();
  makeBushLeaves();

  startExperience();
});

/* =========================
   INTERACTION
========================= */
document.addEventListener("pointerdown", (e) => {
  createHearts(e.clientX, e.clientY);
  playPopSound();
});