//Preloader
window.onload = function () {
   document.body.classList.add('loaded_hiding');
   window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
   }, 500);
}

// Работа с шапкой при скроле
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
   var currentScrollPos = window.pageYOffset;
   if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "-0px";
   } else {
      document.getElementById("navbar").style.top = "-60px";
   }
   prevScrollpos = currentScrollPos;
}
//Menu burger
const burger = document.querySelector(".hamburger"),
   menu = document.querySelector(".menu"),
   menuLinks = document.querySelectorAll(".menu__link"),
   closeElem = document.querySelector('.menu__close'),
   overlay = document.querySelector('.menu__overlay');

burger.addEventListener("click", () => {
   menu.classList.toggle("active");
   burger.classList.toggle("active");
});
//Код закрывет меню при нажатии на ссылку
menuLinks.forEach((link) =>
   link.addEventListener("click", () => {
      menu.classList.remove("active");
      burger.classList.remove("active");
   })
);
//код который закрывает меню при нажатии на крестик
closeElem.addEventListener('click', () => {
   menu.classList.remove('active')
})
//код который закрывает меню при нажатии вне меню
overlay.addEventListener('click', () => {
   menu.classList.remove('active')
})



//Интерактив для линии
const counters = document.querySelectorAll('.skills__ratings-counter'),
   lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach((item, i) => {
   lines[i].style.width = item.innerHTML;
});

document.addEventListener('DOMContentLoaded', function () {

   new WOW().init();
});


//Modal 

$('[data-modal=consultation]').on('click', function () {
   $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function () {
   $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});
$('.button_mini').each(function (i) {
   $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
   });
});


//Php
$('form').submit(function (e) {
   e.preventDefault();

   //if (!$(this).valid()) {
   //   return;
   //}

   $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
   }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
   });
   return false;
});

//Плавный скрол
$(window).scroll(function () {
   if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
   } else {
      $('.pageup').fadeOut();
   }
});
//$(window).scroll(function () {
//   if ($(this).scrollTop() < 3800) {
//      $('.promo__call').fadeIn();
//   } else {
//      $('.promo__call').fadeOut();
//   }
//});

$("a[href=#up]").click(function () {
   const _href = $(this).attr("href");
   $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
   return false;
});
//$("a[href=#price]").click(function () {
//   const _href = $(this).attr("href");
//   $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
//   return false;
//});

//Themes
var btn = document.getElementById("theme-button");
var link = document.getElementById("theme-link");

btn.addEventListener("click", function () { ChangeTheme(); });

function ChangeTheme() {
   let lightTheme = "css/style.min.css";
   let darkTheme = "css/dark.min.css";

   var currTheme = link.getAttribute("href");
   var theme = "";

   if (currTheme == lightTheme) {
      currTheme = darkTheme;
      theme = "dark";
   }
   else {
      currTheme = lightTheme;
      theme = "style";
   }

   link.setAttribute("href", currTheme);

   //Save(theme);
}


//Change lang


const select = document.querySelector('select');
const allLang = ['en', 'ru', 'tm'];

select.addEventListener('change', changeURLLanguage);
//Перенаправить на url c указанием языка

function changeURLLanguage() {
   let lang = select.value;
   location.href = window.location.pathname + '#' + lang;
   location.reload();
}

function changeLanguage() {
   let hash = window.location.hash;
   hash = hash.substring(1);
   console.log(hash);
   if (!allLang.includes(hash)) {
      location.href = window.location.pathname + '#en';
      location.reload();
   }
   select.value = hash;
   //document.querySelector('title').innerHTML = langArr['unit'][hash];
   for (let key in langArr) {
      let elem = document.querySelector(".lng-" + key);
      if (elem) {
         elem.innerHTML = langArr[key][hash];
      }
   }
}


changeLanguage()