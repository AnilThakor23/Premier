function locomotive_code() {
  gsap.registerPlugin(ScrollTrigger);

  // --- smooth scrolling
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    smoothMobile: true,
    scrollingSpeed: window.innerWidth < 600 ? 1000 : 100,
    lerp: 0.05,
  });

  //-- scrolltrigger to work
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  //--- page1 contact btn
  document.querySelector(".pg1-right #elem5").addEventListener("click", () => {
    locoScroll.scrollTo("bottom");
    if(window.innerWidth <= 600){
      document.querySelector(".pg1-right .menubar i").style.display = "initial";
      gsap.to(".pg1-right-nav", {
      left: "110%",
      duration: 0.5,
      });
    }
  });

  // crsr animation( circle move with mouse)
  var body= document.body;
  var crsr=body.querySelector(".curser-circle");
  body.addEventListener("mousemove",(dets)=>{
    gsap.to(crsr,{ left:dets.x , top:dets.y})})
  locoScroll.on("scroll",(scrollArgs)=>{
     crsr.style.transform = `translateY(${scrollArgs.scroll.y}px)`;
  })
}
function page1() {
  // -----to manage animation extra thing
  document.querySelectorAll(".pg1-left .text h1").forEach((elem) => {
    elem.style.opacity = 0;
  });
  gsap.to(".pg1-left .text h1", {
    y: "5vh",
  });
  document.querySelector(".pg1-right-nav").style.opacity = 0;
  document.querySelector(".curser-circle").style.opacity = 0;
  gsap.to(".pg1-right-nav", {
    y: -20,
  });
  document.querySelector(".pg1-right .text").style.opacity = 0;
  document.querySelector(".pg1-scroll-btn").style.opacity = 0;
  document.querySelector(".pg1-modeling-text").style.opacity = 0;
  document.querySelector(".pg1-right .menubar i").style.opacity = 0;

  // -------
  let tl = gsap.timeline();

  tl.from(".pg1-left .logo span", {
    y: 150,
    delay: 0.2,
    stagger: 0.12,
    fontSize: "10vw",
    ease: 2,
  });
  tl.from(".page1", {
    delay: 0.3,
    onStart: function () {
      gsap.to(".pg1-left .logo span", {
        delay: 0.8,
        duration: 0.5,
        fontSize: "8vw",
        ease: 2,
      });
      gsap.to(".curser-circle", {
        delay: 0.8,
        duration: 0.5,
        opacity:1,
        ease: 2,
      });
      // pc - video set
      if (window.innerWidth > 600) {
        gsap.fromTo(
          ".pg1-video",
          { width: "40vw", height: "40vh" },
          {
            opacity: 1,
            delay: 0.95,
            duration: 0.5,
            width: "35vw",
            height: "35vh",
            ease: "linear",
          }
        );
      }
      // mobile
      if (window.innerWidth <= 600) {
        gsap.fromTo(
          ".pg1-video",
          { width: "60vw", height: "18vh" },
          {
            opacity: 1,
            delay: 0.95,
            duration: 0.5,
            width: "50vw",
            height: "15vh",
            ease: "linear",
          }
        );
      }
      gsap.to(".pg1-left .text h1", {
        opacity: 1,
        y: 0,
        delay: 0.95,
        duration: 0.5,
        stagger: 0.15,
        ease: 2,
      });
      gsap.to(".pg1-right-nav", {
        y: 0,
        opacity: 1,
        delay: 0.95,
        duration: 0.5,
        width: "45vw",
        ease: 2,
      });
      gsap.to(".pg1-right .text", {
        opacity: 1,
        delay: 1.1,
        duration: 0.7,
        ease: 2,
      });
      gsap.to(".pg1-scroll-btn", {
        opacity: 1,
        delay: 1.1,
        duration: 0.7,
        ease: 2,
      });
      gsap.to(".pg1-modeling-text", {
        opacity: 1,
        delay: 1.1,
        duration: 0.7,
        ease: 2,
      });
      // menubar of mobile
      gsap.to(".pg1-right .menubar i", {
        opacity: 1,
        delay: 1.1,
        duration: 0.7,
        ease: 2,
      });
    },
  });

  //  -----left-top layer2 animation
  tl.fromTo(
    ".pg1-left .layer2 span",
    { opacity: 0 },
    { opacity: 1, duration: 2, repeat: -1, stagger: 0.1 }
  );

  //  --------right text animation
  var text1 = document.querySelector(".pg1-right .text #text1");
  var text2 = document.querySelector(".pg1-right .text #text2");
  let isText1 = true;
  var tl5 = gsap.timeline({ repeat: -1 });
  tl5.fromTo(
    ".pg1-right #inner",
    { width: "0%" },
    {
      width: "100%",
      duration: 9,
      ease: "linear",
      onComplete: () => {
        var k = "";
        k = text1.innerHTML;
        text1.innerHTML = text2.innerHTML;
        text2.innerHTML = k;
        gsap.fromTo(text1, { opacity: 0, y: -100 }, { opacity: 1, y: 0 });
      },
    }
  );

  // ------- right nav hover animation ( magnet animation )
  if(window.innerWidth > 600){
    document.querySelectorAll(".pg1-right-nav .elem").forEach((elem)=>{
      const rect = elem.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const top = rect.top;
      const left = rect.left;
      const right= rect.right;
      elem.addEventListener("mousemove",(dets)=>{
         gsap.to( elem.querySelector("h3"),{
          x: gsap.utils.mapRange(-width/2 , width/2 ,-10, 10, `${dets.clientX - left - width/2}`),
          y: gsap.utils.mapRange(-height/2 , height/2 ,-10, 10, `${dets.clientY - top - height/2}`),
         })
      })
      elem.addEventListener("mouseleave",()=>{gsap.to(elem.querySelector("h3"),{x:0,y:0,})})
    })
  }
 

  //------------------ video scroll aimation
  var videoContainer = document.querySelector(".pg1-video");
  if (window.innerWidth > 600) {
    gsap.fromTo(
      videoContainer,
      { width: "35vw", height: "35vh" },
      {
        width: "96.5vw",
        height: "97vh",
        duration: 2,
        scrollTrigger: {
          trigger: ".page1",
          scroller: ".main",
          scrub: true,
          pin: true,
          start: "top 0%",
          end: "top -200%",
          onUpdate: (self) => {
            if (self.process >= 0.7) {
            }
          },
        },
      }
    );
  }
  // for mobile
  if (window.innerWidth <= 600) {
    gsap.fromTo(
      videoContainer,
      { width: "50vw", height: "15vh" },
      {
        width: "100vw",
        height: "30vh",
        duration: 2,
        scrollTrigger: {
          trigger: ".page1",
          scroller: ".main",
          scrub: true,
          pin: true,
          start: "top 0%",
          end: "top -200%",
          onUpdate: (self) => {
            if (self.process >= 0.7) {
            }
          },
        },
      }
    );
  }

  // =============for mobile
  // menubar
  var menubar = document.querySelector(".pg1-right .menubar i");
  menubar.addEventListener("click", () => {
    menubar.style.display = "none";
    gsap.to(".pg1-right-nav", {
      left: "-100%",
      duration: 0.5,
    });
  });
  document
    .querySelector(".pg1-right .backInMobile i")
    .addEventListener("click", () => {
      menubar.style.display = "initial";
      gsap.to(".pg1-right-nav", {
        left: "110%",
        duration: 0.5,
      });
    });
}
function page2() {
  // ---------slogan scrolling animation
  var sloganH1s = document.querySelectorAll(".pg2-slogan h1");
  sloganH1s.forEach((h1) => {
    splitedH1 = h1.textContent.split("");
    var counter = "";
    splitedH1.forEach((e) => {
      counter += `<span> ${e} </span>`;
    });
    h1.innerHTML = counter;
  });
  gsap.to(".pg2-slogan h1 span", {
    duration: 5,
    color: "white",
    ease: "power2.in",
    stagger: 1,
    scrollTrigger: {
      trigger: ".pg2-slogan h1",
      scroller: ".main",
      start: "top 95%",
      end: "top 20%",
      scrub: true,
    },
  });

  // ----about text animetion
  gsap.from(".aboutSection .about h1", {
    duration: 1,
    opacity: 0,
    ease: "power2.in",
    scrollTrigger: {
      trigger: ".aboutSection .about h1",
      scroller: ".main",
      start: "top 70%",
    },
  });

  // ----about text underline animetion

  gsap.to(".aboutSection .about div", {
    width: "100%",
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".aboutSection .about div",
      scroller: ".main",
      start: "top 99%",
    },
  });

  // -----scroll-text-coming (scroll kerte hi jo image ke upe dusri greeen chiz aa rahi he)

  gsap.to(
    ".page2 .aboutContent  .image-scrollanime-Wrapper .scroll-text-coming",
    {
      top: "0%",
      ease: "linear",
      scrollTrigger: {
        trigger: ".page2 .aboutContent  .image-scrollanime-Wrapper ",
        scroller: ".main",
        scrub: 4,
        start: "top 30%",
        end: "top 12%",
      },
    }
  );
}
function page3() {
  // ----model text animetion
  gsap.from(".page3 .modelHeading h1", {
    duration: 0.7,
    opacity: 0,
    ease: "power2.in",
    scrollTrigger: {
      trigger: ".page3 .modelHeading h1",
      scroller: ".main",
      start: "top 80%",
    },
  });

  // ----model text underline animetion
  gsap.to(".page3 .modelHeading div", {
    width: "100%",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".page3 .modelHeading div",
      scroller: ".main",
      start: "top 99%",
    },
  });

  // -------swiperjs  animation ( not for mobile)
  if (window.innerWidth > 600) {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3.5,
      spaceBetween: 50,
      freeMode: true,
    });
  }
  //----- be-model,hire-model hover
  document
    .querySelectorAll(".page3 .joinUsBtns .part")
    .forEach(function (elem) {
      var h1 = elem.querySelector("h1");
      var i = h1.querySelector("i");
     if(window.innerWidth > 600){
      elem.addEventListener("mouseenter", () => {
        gsap.to(h1, { fontSize: "1.7vw" });
        gsap.to(i, { fontSize: "1.9vw" });
      });
      elem.addEventListener("mouseleave", () => {
        gsap.to(h1, { fontSize: "1.5vw" });
        gsap.to(i, { fontSize: "1.8vw" });
      });   } 
      else{
        elem.addEventListener("mouseenter", () => {
          gsap.to(h1, { fontSize: "4.1vw" });
          gsap.to(i, { fontSize: "4.9vw" });
        });
        elem.addEventListener("mouseleave", () => {
          gsap.to(h1, { fontSize: "3.8vw" });
          gsap.to(i, { fontSize: "4.5vw" });
        });
      }
    });
}
function contactUsPage() {
  // ----------on submit page dont reload
  document
    .querySelector("#emailForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      // You can add your own logic here, such as sending the email via AJAX
      console.log(
        "Email submitted:",
        document.getElementById("useremail").value
      );
      document.getElementById("useremail").value = "";

      document.querySelector("#emailForm button p").textContent = "SUBMITED";
      document.getElementById("useremail").placeholder =
        "Re-enter Email or submit other Email";

      document.getElementById("useremail").addEventListener("click", () => {
        document.querySelector("#emailForm button p").textContent = "SUBMIT";
      });
    });

  // privacy policy hover anime
  document
    .querySelector(".ContactUsPage .copyrightLayer .left")
    .addEventListener("mouseenter", () => {
      var parent = document.querySelector(".copyrightLayer .left");
      var line_child = parent.querySelector("div");
      gsap.to(parent, { color: "rgba(108, 108, 214, 0.874)" });
      gsap.from(line_child, { width: "0%", duration: 0.8 });
    });
  document
    .querySelector(".ContactUsPage .copyrightLayer .left")
    .addEventListener("mouseleave", () => {
      var parent = document.querySelector(".copyrightLayer .left");
      gsap.to(parent, { color: "#ddd" });
    });
}
function joinUsPage() {
  // ------- slide animation
  document
    .querySelector(".pg1-right-nav #elem4")
    .addEventListener("click", function () {
      gsap.to(".joinUsPage", {
        duration: 0.8,
        top: "0%",
        scale: 1,
      });
    });
  document
    .querySelector(".joinUsPage .back")
    .addEventListener("click", function () {
      gsap.to(".joinUsPage", {
        duration: 0.8,
        top: "100%",
        scale: 0,
      });
    });
}
function formPage() {
  // --------------------------------------------------prevent reload and change text on submit for both form
  document
    .querySelector("#ragisterAsModel")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      gsap.to(".formPage .modelForm button", {
        duration: 0.4,
        backgroundColor: "#AADD3A",
        onComplete: () => {
          document
            .querySelectorAll(".formPage .modelForm input")
            .forEach((elem) => {
              elem.value = "";
            });
          document.querySelector(".formPage .modelForm button").innerHTML =
            "Ragistered";
        },
      });
    });
  document
    .querySelector("#ragisterAsUser")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      gsap.to(".formPage .signUpForm button", {
        duration: 0.4,
        backgroundColor: "#AADD3A",
        onComplete: () => {
          document
            .querySelectorAll(".formPage .signUpForm input")
            .forEach((elem) => {
              elem.value = "";
            });
          document.querySelector(".formPage .signUpForm button").innerHTML =
            "Ragistered";
        },
      });
    });

  // -------------------------------------------------------------- page coming animation with suitable form
  document
    .querySelector(".joinUsPage #btn1")
    .addEventListener("click", function () {
      document.querySelector(".formPage .signUpForm").style.display = "none";
      gsap.to(".formPage", {
        duration: 0.8,
        top: "0%",
        scale: 1,
      });
    });
  document
    .querySelector(".page3 .joinUsBtns #btn1")
    .addEventListener("click", function () {
      document.querySelector(".formPage .signUpForm").style.display = "none";
      gsap.to(".formPage", {
        duration: 0.8,
        top: "0%",
        scale: 1,
      });
    });

  document
    .querySelector(".joinUsPage #btn3")
    .addEventListener("click", function () {
      document.querySelector(".formPage .modelForm").style.display = "none";
      gsap.to(".formPage", {
        duration: 0.8,
        top: "0%",
        scale: 1,
      });
    });
  document
    .querySelector(".formPage .back")
    .addEventListener("click", function () {
      gsap.to(".formPage", {
        duration: 0.8,
        top: "100%",
        scale: 0,
        onComplete: function () {
          document.querySelector(".formPage .modelForm").style.display = "flex";
          document.querySelector(".formPage .signUpForm").style.display =
            "flex";
        },
      });
    });
}
locomotive_code();
page1();
page2();
page3();
contactUsPage();
joinUsPage();
formPage();