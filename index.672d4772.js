"use strict";
///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const openModal = function() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
for(let i = 0; i < btnsOpenModal.length; i++)btnsOpenModal[i].addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function(e) {
    const s1coords = section1.getBoundingClientRect(); // gives dimension of the selected tag
    console.log(s1coords);
    // window.scrollTo(s1coords.left+ window.pageXOffset, s1coords.top + window.pageYOffset)                   
    // window.scrollTo({ left: s1coords.left + window.pageXOffset, top: window.pageYOffset + s1coords.top, behavior: 'smooth' })    Old Methods.
    section1.scrollIntoView({
        behavior: "smooth"
    }) // works only in super modern browsers.
    ;
});
// document.querySelectorAll('.nav__link').forEach(function (e) {
//     e.addEventListener('click', function (el) {                                      Inefficient method. event delegation is 
//         el.preventDefault();                                                             more efficient.
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     })
// });
/* Event Delegation steps
1. Add event listener to the common parent
2.Determine what element originated the event
 */ document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab"); // finds the closest tag with desired class name
    if (!clicked) return; // Guard Clause. returns if clicked anywhere other than the desired area.
    tabs.forEach((t)=>{
        t.classList.remove("operations__tab--active");
    });
    clicked.classList.add("operations__tab--active");
    tabContent.forEach((c)=>c.classList.remove("operations__content--active"));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});
const hnadleHover = function(e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const sibling = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        sibling.forEach((el)=>{
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
//Menu fade animation
const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", hnadleHover.bind(0.5));
nav.addEventListener("mouseout", hnadleHover.bind(1));
//reveal sections
const AllSection = document.querySelectorAll(".section");
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});
AllSection.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});
//lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]"); // selecting all images having the property 'data-src'
const loadImg = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img"); //removes the 'lazy-img' class once the final image is loaded.
    });
    observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px"
});
imgTargets.forEach((img)=>imageObserver.observe(img));
//slider
const slides = document.querySelectorAll(".slide ");
slides.forEach((s, i)=>s.style.transform = `translateX(${i * 100}% )`);
const btnleft = document.querySelector(".slider__btn--left");
const btnright = document.querySelector(".slider__btn--right");
let curslide = 0;
const maxSlides = slides.length;
const activateDots = function(e) {
    document.querySelectorAll(".dots__dot").forEach((dot)=>dot.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${e}"]`).classList.add("dots__dot--active");
};
const SwipeRight = function() {
    if (curslide === maxSlides - 1) curslide = 0;
    else curslide++;
    slides.forEach((s, i)=>s.style.transform = `translateX(${(i - curslide) * 100}% )`);
    activateDots(curslide);
};
const Swipeleft = function() {
    if (curslide === 0) curslide = maxSlides - 1;
    else curslide--;
    slides.forEach((s, i)=>s.style.transform = `translateX(${(i - curslide) * 100}% )`);
    activateDots(curslide);
};
btnright.addEventListener("click", SwipeRight);
btnleft.addEventListener("click", Swipeleft);
document.addEventListener("keydown", function(e) {
    console.log(e);
    if (e.key === "ArrowLeft") Swipeleft();
    e.key === "ArrowRight" && SwipeRight(); // short circuiting
});
const dotsContainer = document.querySelector(".dots");
const createDots = function() {
    slides.forEach(function(_, i) {
        dotsContainer.insertAdjacentHTML("beforeend", `<button class = "dots__dot" data-slide = "${i}"></button>`);
    });
};
createDots();
activateDots(curslide);
dotsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("dots__dot")) {
        const { slide  } = e.target.dataset;
        curslide = slide;
        slides.forEach((s, i)=>s.style.transform = `translateX(${(i - curslide) * 100}% )`);
        activateDots(curslide);
    }
});
if (module.hot) module.hot.accept();

//# sourceMappingURL=index.672d4772.js.map
