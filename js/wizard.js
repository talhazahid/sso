// init slider:
var $slider = $('.section_slider');

// needs to be put before $slider.slick
$slider.on('init', function (event, slick) {
 $('.section_footer .button.back').hide();
});

$slider.slick({
 slidesToShow: 1,
 slidesToScroll: 1,
 infinite: false,
 arrows: false,
 dots: false,
 draggable: false,
 adaptiveHeight: true,
 swipe: true
});

$('.section_footer .button.next').off('click').on('click', function () {
 $slider.slick('slickNext');
});
$('.section_footer .button.back').off('click').on('click', function () {
 var currentIndex = $slider.slick('slickCurrentSlide');
 if (currentIndex != 0) $slider.slick('slickPrev');
});

$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
 $('.section_footer .button').show();
 if (nextSlide == slick.slideCount - 1) $('.section_footer .button.next').hide();
 else if (nextSlide == 0) $('.section_footer .button.back').hide();
 setProgress(nextSlide);
});

var progresssteps = [];

// set progress bar steps:
$('.slider_step').each(function (i, e) {
 if (!!$(e).attr('chapter')) {
  var index = parseInt($(e).attr('chapter'));
  if (!!!progresssteps[index]) progresssteps[index] = [];
  progresssteps[index].push(i);
 }
});

console.log(">>>>>>", progresssteps);
for (var i = 0; i < progresssteps.length; i++) {
 var left = i * 100 / (progresssteps.length - 1);
 $('<span class="circle" style="left:' + left + '%"></span>').appendTo($('.progress_container'));
 $('<p class="chapter" style="left:' + left + '%">Chapter ' + (i + 1) + '</p>').appendTo($('.progress_container'));
}

$('.progress_container .bar').progressbar({
 value: 0
});


function setProgress(step) {
 for (var i = 0; i < progresssteps.length; i++) {
  var j = progresssteps[i].indexOf(step);
  if (j > -1) {
   var perChapterLength = 100 / (progresssteps.length - 1);
   var val = i * perChapterLength + perChapterLength * j / progresssteps[i].length;
   console.log("set progressbar: ", i, j, val);
   $('.progress_container .bar').progressbar("value", val);
   $('.progress_container .circle').removeClass('active');
   for (var k = 0; k <= i; k++) {
    $('.progress_container .circle:eq(' + k + ')').addClass('active');
   }
   return;
  }
 }
}

// slider:
$(".slider_step .range_slider").slider({
 range: "min",
 min: $(this).attr('min'),
 max: $(this).attr('max'),

 create: function (event, ui) {
  var min = parseInt($(this).attr('min'));
  var max = parseInt($(this).attr('max'));
  var value = parseInt($(this).siblings('.text').children('.value').text());

  $(this).slider("option", { min: min, max: max });
  $(this).slider("value", value);
  $(this).children('span.ui-slider-handle').text(value);
  var left = (value - min) / (max - min) * 100;
  console.log(value, min, max, "test")
  $(this).siblings('.text').css('left', left + "%");
 },
 slide: function (event, ui) {
  event.stopPropagation();

  $(this).siblings('.text').children('.value').text(ui.value);
  if ($(window).width() > 750) {
   $(this).children('span.ui-slider-handle').text(ui.value);
   var min = parseInt($(this).attr('min'));
   var max = parseInt($(this).attr('max'));
   var left = (ui.value - min) / (max - min) * 100;
   $(this).siblings('.text').css('left', left + "%");
  }
 }
});

// datepicker
$('.date_container input').datepicker({
 minDate: '+2d', showAnim: "slideDown", dateFormat: "DD, d MM, yy",
 beforeShow: function (input, inst) {
  $(input).after($(input).datepicker('widget'));
 }
});