//let number = 7;

//const pi = 3.14;

//number = 4;

//let leftBorderWidth = 200;

//number 7
//string 'werwr' "" ``

//true/false
//null
//undefined
//let obj = {
//   name: 'apple',
//   color: 'green',
//   weight: 200
//}

//Symbol

//alert(1234)
//console.log(number);
//let answer = confirm('Вам есть 18?')

//console.log(answer)
//let answer = prompt('Вам есть 18?')

//console.log(answer)


//let isChecked = true,
//   isClosed = false;

//console.log(isChecked && isClosed)
//console.log(isChecked || isClosed)

//if (2 * 6 == 8 * 1) {
//   console.log('Верно');
//} else {
//   console.log('Ошибка');
//}

//let answer = confirm('Вам есть 18?')

//if (answer) {
//   console.log('Проходите')
//} else {
//   console.log('Уходи');
//}


//const num = 50;

//if (num < 49) {
//   console.log('Неправильно');
//} else if (num > 100) {
//   console.log('Много')
//} else {
//   console.log('Верно');
//}

//for (let i = 1; i <= 8; i++) {
//   console.log(i);
//}


//function logging(a, b) {
//   console.log(a + b);
//}

//logging(3, 5);

//logging(6, 8);




//$(document).ready(function () {
//   $('.carousel__inner').slick({
//      speed: 1200,
//      //adaptiveHeight: true,
//      prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider_arrows/left.png"></button>',
//      nextArrow: '<button type="button" class="slick-next"><img src="icons/slider_arrows/right.png"></button>',
//      responsive: [
//         {
//            breakpoint: 992,
//            settings: {
//               dots: true,
//               arrows: false
//            }
//         }
//      ]
//   });
//});

const slider = tns({
   container: '.carousel__inner',
   items: 1,
   slideBy: 'page',
   //autoplay: true,
   controls: false,
   nav: true,
   responsive: {
      640: {
         edgePadding: 20,
         gutter: 20,
         items: 1
      },
      700: {
         gutter: 30
      },
      1100: {
         items: 1,

      }
   }
});

document.querySelector('.prev').addEventListener('click', function () {
   slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
   slider.goTo('next');
});

$(document).ready(function () {
   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         })
      });
   };

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

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


   function validateForms(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2
            },
            phone: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: {
               required: "Пожалуйста, введите свое имя",
               minlength: jQuery.validator.format("Введите {0} символа!")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
               required: "Пожалуйста, введите свою почту",
               email: "Неправильно введен адрес почты"
            }
         }
      });
   };



   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');
   $('input[name=phone]').mask("+999 99-99-99-99");


   $('form').submit(function (e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }

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

   // Smooth scroll and pageup

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });

   $("a[href=#up]").click(function () {
      const _href = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
   });

   new WOW().init();
});


