$(window).scroll(function () {
 if ($(this).scrollTop() > 250) {
  $('header').addClass("sticky");
 }
 else {
  $('header').removeClass("sticky");
 }
});











// Hero Fomo ticker



var currentItem = 0;

function tick() {
 var ticker = $("#ticker"),
  list = $("#ticker li"),
  last = list.last(),
  top;

 list.each(function () {
  if ($(this).index() == currentItem) {
   top = $(this);
  }
 })

 var item = top.clone();

 console.log(item);

 ticker.css({ 'margin-top': '-=75px' })
 ticker.append(item);

 currentItem += 1;

}

setInterval(function () {
 tick()
}, 5000)

$('#info').on('click', function () {

 tick();

});

