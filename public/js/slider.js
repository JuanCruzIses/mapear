//slider de dos cards

window.addEventListener('load', () => {
    // initial slide
    let slide = 1;

    
    // total slides
    let slides = document.querySelectorAll(".slider ul li");
    totalSlides = slides.length;
 
    next = document.querySelector(".next");
    prev = document.querySelector(".prev")
 
    /**
     * event next button
     */
    next.addEventListener('click', (evt) => {
        evt.preventDefault();
        slide++;
        if (slide >= totalSlides) { slide = 1; }
        showSlide(slide);
    })
 
    
    /* event prev button */
    prev.addEventListener("click", (evt) => {
        evt.preventDefault();
        slide--;
        if (slide < 1) { slide = totalSlides; }
        showSlide(slide);
    })
 
    
    // show first slide
    showSlide(1);

    /**
     * show slides
     * 
     * @param {number} n 
     * @return {null}
     * 
     */
    function showSlide(n) {
        console.log(n)
        // decrement 1
        for (i = 0; i < slides.length; i++) {
            if(i == n){
                slides[n].style.display = "block";
                slides[n -1].style.display = "block";
            } 
            else{
                slides[i].style.display = "none";
            }
        }
    }
 
})