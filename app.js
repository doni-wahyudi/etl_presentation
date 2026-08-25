/**
 * ETL Presentation Deck Engine
 * Handles 16:9 Slide Transitions, Navigation, Hotkeys, Overview Grid & PDF Export
 */

class PresentationDeck {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.currentSlideIndex = 0;
    
    // UI Elements
    this.slideCounterEl = document.getElementById('slideCounter');
    this.moduleTagEl = document.getElementById('moduleTag');
    this.progressBarFill = document.getElementById('progressBarFill');
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.overviewModal = document.getElementById('overviewModal');
    this.helpModal = document.getElementById('helpModal');
    this.overviewGrid = document.getElementById('overviewGrid');

    this.init();
  }

  init() {
    this.buildOverviewGrid();
    this.bindEvents();
    
    // Handle URL Hash deep linking on load
    this.handleHashChange();
  }

  handleHashChange() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const slideNum = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= this.totalSlides) {
        this.goToSlide(slideNum - 1, false);
      } else {
        this.goToSlide(0, false);
      }
    } else {
      this.goToSlide(0, false);
    }
  }

  goToSlide(index, updateHash = true) {
    if (index < 0 || index >= this.totalSlides) return;

    // Deactivate previous slide
    this.slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    this.currentSlideIndex = index;
    this.updateHUD();

    if (updateHash) {
      history.replaceState(null, null, `#slide-${index + 1}`);
    }

    // Highlight current card in overview grid
    const cards = this.overviewGrid.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('current');
      } else {
        card.classList.remove('current');
      }
    });
  }

  nextSlide() {
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }

  updateHUD() {
    const currentNum = this.currentSlideIndex + 1;
    const padNum = String(currentNum).padStart(2, '0');
    const padTotal = String(this.totalSlides).padStart(2, '0');

    // Update Counter
    if (this.slideCounterEl) {
      this.slideCounterEl.innerHTML = `${padNum} <span>/ ${padTotal}</span>`;
    }

    // Update Progress Bar
    if (this.progressBarFill) {
      const percentage = (currentNum / this.totalSlides) * 100;
      this.progressBarFill.style.width = `${percentage}%`;
    }

    // Update Module Tag from Active Slide data-module
    const activeSlide = this.slides[this.currentSlideIndex];
    const moduleName = activeSlide.getAttribute('data-module') || 'ETL Fundamentals';
    if (this.moduleTagEl) {
      this.moduleTagEl.textContent = moduleName;
    }

    // Update Button Disabled States
    if (this.btnPrev) this.btnPrev.disabled = (this.currentSlideIndex === 0);
    if (this.btnNext) this.btnNext.disabled = (this.currentSlideIndex === this.totalSlides - 1);
  }

  buildOverviewGrid() {
    if (!this.overviewGrid) return;
    this.overviewGrid.innerHTML = '';

    this.slides.forEach((slide, idx) => {
      const slideNum = String(idx + 1).padStart(2, '0');
      const titleEl = slide.querySelector('.slide-title');
      const titleText = titleEl ? titleEl.textContent : `Slide ${idx + 1}`;
      const moduleName = slide.getAttribute('data-module') || 'Module';

      const card = document.createElement('div');
      card.className = `overview-card ${idx === this.currentSlideIndex ? 'current' : ''}`;
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="overview-card-num">#${slideNum}</span>
          <span style="font-size:0.65rem; color:#A5B4FC; text-transform:uppercase; font-weight:700;">${moduleName}</span>
        </div>
        <div class="overview-card-title">${titleText}</div>
      `;

      card.addEventListener('click', () => {
        this.goToSlide(idx);
        this.closeOverview();
      });

      this.overviewGrid.appendChild(card);
    });
  }

  toggleOverview() {
    if (this.overviewModal.classList.contains('open')) {
      this.closeOverview();
    } else {
      this.openOverview();
    }
  }

  openOverview() {
    this.overviewModal.classList.add('open');
    this.closeHelp();
  }

  closeOverview() {
    this.overviewModal.classList.remove('open');
  }

  toggleHelp() {
    if (this.helpModal.classList.contains('open')) {
      this.closeHelp();
    } else {
      this.openHelp();
    }
  }

  openHelp() {
    this.helpModal.classList.add('open');
    this.closeOverview();
  }

  closeHelp() {
    this.helpModal.classList.remove('open');
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  exportPDF() {
    // Trigger native browser print dialog configured for 16:9 PDF export
    window.print();
  }

  bindEvents() {
    // Window Hash Change (Browser Back/Forward buttons)
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is in an input
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          this.nextSlide();
          break;

        case 'ArrowLeft':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          this.prevSlide();
          break;

        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;

        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;

        case 'o':
        case 'O':
          e.preventDefault();
          this.toggleOverview();
          break;

        case '?':
          e.preventDefault();
          this.toggleHelp();
          break;

        case 'Escape':
          this.closeOverview();
          this.closeHelp();
          break;

        case 'p':
        case 'P':
          if (e.ctrlKey || e.metaKey) {
            // Let default print trigger
          } else {
            e.preventDefault();
            this.exportPDF();
          }
          break;
      }
    });

    // Touch Swipe Detection for mobile/tablets
    let touchStartX = 0;
    let touchEndX = 0;

    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const threshold = 50;
      if (touchStartX - touchEndX > threshold) {
        this.nextSlide(); // Swiped left -> Next
      } else if (touchEndX - touchStartX > threshold) {
        this.prevSlide(); // Swiped right -> Prev
      }
    }, { passive: true });

    // Buttons
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prevSlide());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextSlide());

    const btnOverview = document.getElementById('btnOverview');
    if (btnOverview) btnOverview.addEventListener('click', () => this.toggleOverview());

    const btnCloseOverview = document.getElementById('btnCloseOverview');
    if (btnCloseOverview) btnCloseOverview.addEventListener('click', () => this.closeOverview());

    const btnHelp = document.getElementById('btnHelp');
    if (btnHelp) btnHelp.addEventListener('click', () => this.toggleHelp());

    const btnCloseHelp = document.getElementById('btnCloseHelp');
    if (btnCloseHelp) btnCloseHelp.addEventListener('click', () => this.closeHelp());

    const btnFullscreen = document.getElementById('btnFullscreen');
    if (btnFullscreen) btnFullscreen.addEventListener('click', () => this.toggleFullscreen());

    const btnExportPDF = document.getElementById('btnExportPDF');
    if (btnExportPDF) btnExportPDF.addEventListener('click', () => this.exportPDF());

    // Close modals on clicking backdrop
    if (this.overviewModal) {
      this.overviewModal.addEventListener('click', (e) => {
        if (e.target === this.overviewModal) this.closeOverview();
      });
    }
    if (this.helpModal) {
      this.helpModal.addEventListener('click', (e) => {
        if (e.target === this.helpModal) this.closeHelp();
      });
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.deck = new PresentationDeck();
});
