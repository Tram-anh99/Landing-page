document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     CUSTOM CURSOR
     ========================================================================== */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      // Direct dot tracking
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      // Ring smooth tracking with delay
      cursor.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 150, fill: 'forwards' });
    });
    
    // Hide default cursor on desktop
    if (window.innerWidth > 1024) {
      document.body.style.cursor = 'none';
    }
  }

  /* ==========================================================================
     STICKY HEADER & SCROLL DEPTH
     ========================================================================== */
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.remove('at-top');
      } else {
        header.classList.add('at-top');
      }
    });
  }

  /* ==========================================================================
     MOBILE MENU DRAWER
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (mobileToggle && header) {
    mobileToggle.addEventListener('click', () => {
      header.classList.toggle('menu-expanded');
      
      // Animate hamburger lines
      const spans = mobileToggle.querySelectorAll('span');
      if (header.classList.contains('menu-expanded')) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu on clicking links
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('menu-expanded');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ==========================================================================
     ACCORDION SYSTEM (SECTIONS 2 & 3)
     ========================================================================== */
  const accordionSections = document.querySelectorAll('.accordion-section');
  
  accordionSections.forEach(section => {
    const rows = section.querySelectorAll('.accordion-row');
    const slides = section.querySelectorAll('.media-slide');
    
    rows.forEach(row => {
      row.addEventListener('click', () => {
        // If already active, do nothing
        if (row.classList.contains('active')) return;
        
        // Remove active class from all rows in this section
        rows.forEach(r => r.classList.remove('active'));
        
        // Add active class to clicked row
        row.classList.add('active');
        
        // Get index
        const index = row.getAttribute('data-index');
        
        // Update active image slide
        slides.forEach(slide => {
          if (slide.getAttribute('data-index') === index) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      });
    });
  });

  /* ==========================================================================
     TAB SYSTEM (SECTION 5)
     ========================================================================== */
  const tabSection = document.getElementById('sovereign-advantage');
  
  if (tabSection) {
    const tabButtons = tabSection.querySelectorAll('.tab-btn');
    const tabPanes = tabSection.querySelectorAll('.tab-pane');
    const tabSlides = tabSection.querySelectorAll('.tab-media-slide');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabIndex = button.getAttribute('data-tab');
        
        // Switch buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Switch text contents
        tabPanes.forEach(pane => {
          if (pane.getAttribute('data-tab') === tabIndex) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
        
        // Switch media slides
        tabSlides.forEach(slide => {
          if (slide.getAttribute('data-tab') === tabIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      });
    });
  }

  /* ==========================================================================
     CYBER REVEAL TILE GRID (SECTION 6)
     ========================================================================== */
  const gridContainer = document.getElementById('grid-reveal-tile');
  
  if (gridContainer) {
    const columns = 10;
    const rows = 5;
    const totalTiles = columns * rows;
    
    // Create grid tiles
    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      gridContainer.appendChild(tile);
    }
    
    const tiles = gridContainer.querySelectorAll('.tile');
    
    // Trigger staggered reveal using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Generate a randomized array of indices
          const indices = Array.from({ length: totalTiles }, (_, i) => i);
          
          // Shuffle array
          for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
          }
          
          // Staggered reveal
          indices.forEach((tileIndex, staggerIndex) => {
            setTimeout(() => {
              tiles[tileIndex].classList.add('revealed');
            }, staggerIndex * 30); // 30ms stagger delay
          });
          
          // Unobserve once triggered
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    observer.observe(gridContainer);
  }
  
});
