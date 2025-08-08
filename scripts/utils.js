// (Order Now & Save 50%) button floating on mobile screen
window.addEventListener('scroll', function () {
    const cta = document.getElementById('floating_cta');
    if (window.scrollY > 100) {
        cta.classList.add('open');
    } else {
        cta.classList.remove('open');
    }
});

// forms hide & show functions
document.addEventListener("DOMContentLoaded", function () {
    // Initial visibility
    document.querySelector(".form1").style.display = "block";
    document.querySelector(".form2").style.display = "none";
    document.querySelector(".form3").style.display = "none";

    // When "Next" is clicked on Form1
    document.getElementById("nextFromForm1").addEventListener("click", function () {
        document.querySelector(".form2").style.display = "block";
        document.querySelector(".form3").style.display = "block";
    });
});