// 1. Typing Effect Animation
const words = ["C++ & Java", "Data Structures", "Arduino Systems", "Clean UI Code"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function type() {
  if (!typingElement) return;
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 40 : 90);
  }
}

// 2. Animated Stats Counters
const counters = document.querySelectorAll('.counter');
let animated = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = target / 40;

    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.ceil(count) + "+";
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
}

// 3. Scroll Trigger for Skill Progress Bars & Stats
window.addEventListener('scroll', () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (sectionPos < screenPos) {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });

    if (!animated) {
      startCounters();
      animated = true;
    }
  }
});

// 4. Project Category Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  type();
});