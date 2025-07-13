window.addEventListener('load', function() {
  setTimeout(function() {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('preloader-hide');
  }, 600);
});

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.footer-filter-btn');
  const cards = document.querySelectorAll('.card-min');
  const cardsContainer = document.querySelector('.cards-min');

  if (filterButtons.length && cards.length && cardsContainer) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        let firstVisible = null;
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            // Плавно показываем
            card.classList.remove('card-hide');
            card.classList.add('card-show');
            setTimeout(() => {
              card.style.display = '';
              if (!firstVisible) {
                // Перемещаем первую подходящую карточку в начало
                cardsContainer.insertBefore(card, cardsContainer.firstChild);
                firstVisible = card;
              }
            }, 10);
          } else {
            // Плавно скрываем
            card.classList.remove('card-show');
            card.classList.add('card-hide');
            setTimeout(() => {
              card.style.display = 'none';
            }, 350);
          }
        });
      });
    });
  }

  // Смена текста при наведении
  document.querySelectorAll('.card-min-overlay').forEach(overlay => {
    const label = overlay.querySelector('.card-min-label');
    if (!label.dataset.orig) {
      label.dataset.orig = label.textContent;
    }
    overlay.addEventListener('mouseenter', function() {
      label.textContent = 'Подробнее о проекте';
    });
    overlay.addEventListener('mouseleave', function() {
      label.textContent = label.dataset.orig;
    });
  });
});

// Лайтбокс для inter-gallery.html
(function() {
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  if (!galleryImgs.length || !lightbox) return;
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const leftBtn = lightbox.querySelector('.lightbox-arrow-left');
  const rightBtn = lightbox.querySelector('.lightbox-arrow-right');
  let current = 0;

  function show(index) {
    if (index < 0) index = galleryImgs.length - 1;
    if (index >= galleryImgs.length) index = 0;
    current = index;
    lightboxImg.src = galleryImgs[current].src;
    lightboxImg.alt = galleryImgs[current].alt;
    lightbox.classList.add('active');
  }
  function hide() {
    lightbox.classList.remove('active');
    setTimeout(() => { lightboxImg.src = ''; }, 200);
  }
  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', e => {
      e.preventDefault();
      show(i);
    });
  });
  closeBtn.addEventListener('click', hide);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) hide();
  });
  leftBtn.addEventListener('click', e => {
    e.stopPropagation();
    show(current - 1);
  });
  rightBtn.addEventListener('click', e => {
    e.stopPropagation();
    show(current + 1);
  });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
