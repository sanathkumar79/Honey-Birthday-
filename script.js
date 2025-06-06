const qaPairs = [
  { keywords: ['favorite person'], answer: 'Your favourite person is Sana sir 😊' },
  { keywords: ['favorite color', 'fav color'], answer: 'Your favorite color is Black🖤' },
  { keywords: ['favourite song', 'favorite song'], answer: 'Your favorite song is "[Your song here 🎶]"' },
  { keywords: ['curd', 'dislike food'], answer: 'You cannot eat curd.' },
  { keywords: ['first met'], answer: 'We met for the first time on 13 Nov.' },
  { keywords: ['cry', 'cried'], answer: 'You cried for the first time before me on 15 December.' },
  { keywords: ['birthday', 'date of birth'], answer: 'Your date of birth is 06-06-2008.' },
  { keywords: ['promise'], answer: 'You gave a very valuable promise on 18 January at 10:47 pm.' },
  { keywords: ['place'], answer: 'Your place is Mahaboobnagar, Vallabhnagar.' },
  { keywords: ['father'], answer: "Your father's name is Gopal Reddy." }
];

const music = document.getElementById("bg-music");
const landing = document.getElementById("landing");
const openChatBtn = document.getElementById("open-chat-btn");
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send-btn");

chatInput.addEventListener('input', () => {
  chatSendBtn.disabled = chatInput.value.trim().length === 0;
});

openChatBtn.addEventListener('click', () => {
  landing.style.display = 'none';
  chatContainer.style.display = 'flex';
  addBotMessage('Hi Honey madam! 🎀 Ask me anything about us or your favorites.');
  confetti(); // trigger confetti
  music.play(); // play birthday music
});

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
  addMessage(text, 'user');
}

function addBotMessage(text) {
  addMessage(text, 'bot');
}

function findAnswer(userText) {
  const text = userText.toLowerCase();
  for (const pair of qaPairs) {
    if (pair.keywords.some(k => text.includes(k))) {
      return pair.answer;
    }
  }
  return "Sorry, I’m still learning 💭. Please try a different question!";
}

function handleUserInput() {
  const userText = chatInput.value.trim();
  if (!userText) return;
  addUserMessage(userText);
  chatInput.value = '';
  chatSendBtn.disabled = true;

  setTimeout(() => {
    const answer = findAnswer(userText);
    addBotMessage(answer);
  }, 700);
}

chatSendBtn.addEventListener('click', handleUserInput);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !chatSendBtn.disabled) {
    handleUserInput();
  }
});

function toggleMenu() {
  document.getElementById('menu').classList.toggle('active');
}

// Confetti trigger
function confetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confettiLib({
      particleCount,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { y: 0.6 }
    });
  }, 250);
}

// Load confetti lib
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
script.onload = () => { window.confettiLib = window.confetti; };
document.head.appendChild(script);