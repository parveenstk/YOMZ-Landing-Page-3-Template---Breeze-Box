// (Order Now & Save 50%) button floating on mobile screen
window.addEventListener('scroll', function () {
    const cta = document.getElementById('floating_cta');
    if (window.scrollY > 100) {
        cta.classList.add('open');
    } else {
        cta.classList.remove('open');
    }
});

// FAQs workig scripts
document.addEventListener('DOMContentLoaded', function () {
    // Find all accordion elements
    const accordions = document.querySelectorAll('.accordion');

    // Add click event listeners to each accordion element
    accordions.forEach(function (accordion) {
        accordion.addEventListener('click', function () {
            // Toggle the "active" class on the clicked accordion
            this.classList.toggle('active');

            // Get the panel element that follows this accordion
            const panel = this.nextElementSibling;

            // Toggle the panel's visibility
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Add necessary CSS styles for the accordion functionality
    const style = document.createElement('style');
    style.textContent = `
    /* Style for accordion buttons */
    .accordion {
      background-color: #f8f9fa;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      text-align: left;
      border: none;
      outline: none;
      transition: 0.4s;
      position: relative;
    }
    
    /* Add a plus/minus icon */
    .accordion:after {
      content: '+';
      font-size: 20px;
      color: #777;
      float: right;
      margin-left: 5px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    /* Change plus to minus when accordion is active */
    .accordion.active:after {
      content: '-';
    }
    
    /* Style for the active accordion button */
    .accordion.active, .accordion:hover {
      background-color: #e7f1ff;
    }
    
    /* Style for the accordion panel */
    .panel {
      padding: 0 18px;
      background-color: white;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }
    
    /* Add padding to panel content */
    .panel p {
      padding: 10px 0;
    }
  `;
    document.head.appendChild(style);
});