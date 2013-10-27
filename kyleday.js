$(function () {

  var S = $.superscrollorama(),

      overflow = $('html').css('overflow');

  $(window).scrollTop(0);
  $('html').css({overflow: 'hidden'});

  setTimeout(function () {
    $('html').css({overflow: overflow});
    $('#hello').animate({
      opacity: 0.5,
      fontSize: '100px'
    });
  }, 1000);

  setTimeout(function () {
    $('#plz').fadeIn();
  }, 5000);

  S.addTween(0,
    (new TimelineLite())
      .append([
        TweenMax.fromTo($('#hello'), 1, {css: {opacity: 0.5}, immediateRender: true}, {css: {opacity: 1}}),
        TweenMax.fromTo($('#hello-box'), 0.1, {css: {height: 94}, immediateRender: true}, {css: {height: 74}})
      ]),
  500);

  S.addTween(500, TweenMax.fromTo($('#hello-box'), 1, {css: {top: 0}, immediateRender: true, ease: Linear.easeInOut}, {css: {top: -300}, ease: Linear.easeInOut}), 1000);
  S.addTween(2000, TweenMax.to($(document.body), 1, {css: {backgroundColor: '#000', color: '#fff'}}), 1000);

  S.pin($('#info1'), 2000, {offset: -400, anim:
    (new TimelineLite())
      .append(TweenMax.to($('#info1'), 0.25, {css: {top: 300}}))
      .append(TweenMax.to($('#info1'), 1, {css: {top: 300}}))
      .append(TweenMax.to($('#info1'), 1, {css: {top: -100}, ease: Quad.easeIn}))
  });

  S.addTween(3000,
    (new TimelineLite())
      .append(TweenMax.to($('#info2'), 1, {css: {left: 100}}))
      .append(TweenMax.to($('#info2'), 2, {css: {left: 100}}))
      .append(TweenMax.to($('#info2'), 1, {css: {left: '-100%'}, ease: Quad.easeIn})),
    1000);

  S.addTween(4000,
    (new TimelineLite())
      .append(TweenMax.to($('#info3'), 1, {css: {left: 100}}))
      .append(TweenMax.to($('#info3'), 2, {css: {left: 100}}))
      .append(TweenMax.to($('#info3'), 1, {css: {left: '100%'}, ease: Quad.easeIn})),
    1000);

  S.addTween(6500,
    (new TimelineLite())
      .append(TweenMax.to($('#info5'), 1, {css: {left: 100}}))
      .append(TweenMax.to($('#info5'), 2, {css: {left: 100}}))
      .append(TweenMax.to($('#info5'), 1, {css: {left: '-100%'}, ease: Quad.easeIn})),
    1000);

  S.addTween(7750,
    (new TimelineLite())
      .append(TweenMax.to($('#invite'), 1, {css: {backgroundColor: 'rgb(150, 150, 255)'}}))
      .append(TweenMax.to($('#invite'), 1, {css: {backgroundColor: 'rgb(220, 150, 200)'}}))
      .append(TweenMax.to($('#invite'), 1, {css: {backgroundColor: 'rgb(160, 255, 160)'}})),
    1000);

  S.addTween(7750,
      TweenMax.to($('#boxes'), 1, {css: {top: '100%'}}),
    1750);

  S.pin($('#invite'), 2000, {offset: -500, anim:
    (new TimelineLite())
      .append(TweenMax.to($('#invite'), 0.25, {css: {top: 200}}))
      .append(TweenMax.to($('#invite'), 1, {css: {top: 200}}))
      .append(TweenMax.to($('#invite'), 1, {css: {top: -500}, ease: Quad.easeIn})),
    onPin: function () {
      $('#boxes-cover').show();
    },
    onUnpin: function () {
      $('#boxes-cover').hide();
    }
  });

  S.addTween(10000,
    (new TimelineLite())
      .append(TweenMax.to($('#info6'), 1, {css: {top: 100}}))
      .append(TweenMax.to($('#info6'), 2, {css: {top: 100}}))
      .append(TweenMax.to($('#info6'), 1, {css: {top: '100%'}, ease: Quad.easeIn})),
    1000);

  S.addTween(10200,
    (new TimelineLite())
      .append(TweenMax.to($('#info7'), 1, {css: {top: 114}}))
      .append(TweenMax.to($('#info7'), 2, {css: {top: 114}}))
      .append(TweenMax.to($('#info7'), 1, {css: {top: -100}, ease: Quad.easeIn})),
    1000);


  function rand(from, to) {
    if (to == undefined) {
      to = from;
      to = 0;
    }

    return Math.random() * (to - from) + from;
  }

  function randRange(range) {
    return rand(range[0], range[1]);
  }

  var stars = [],
      star,
      pos;

  for (var i = 1; i < 102; i++) {
    pos = randRange([0, Math.PI]);
    star = $('<div class="star"/>')
      .css({
        position: 'absolute',
        top: randRange([0, 3000]),
        left: randRange([0, 100]) + '%',
        transform: 'scale(' + randRange([0.9, 1.1]) + ')',
        opacity: Math.sin(pos)
      })
      .appendTo('#field');

    star.pos = pos;
    stars[i] = star;
  }

  if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) {
      window.requestAnimationFrame = webkitRequestAnimationFrame;
    }
    else if (window.mozRequestAnimationFrame) {
      window.requestAnimationFrame = mozRequestAnimationFrame;
    }
    else {
      window.requestAnimationFrame = function (func) {
        return setTimeout(func, 20);
      }
    }
  }

  var boing = false,
      count = 0;
  function pulse() {
    if (boing) {
      boing = false;
      requestAnimationFrame(pulse);
      return;
    }

    boing = true;

    for (var i = 1; i < 100; i++) {
      star = stars[i];
      star.pos += 0.05;
      star.css({
        opacity: Math.abs(Math.sin(star.pos))
      });
    }

    var time = $.now(),
        shootTime = time % 5000;

    if (shootTime < 1000) {
      stars[100].css({
        top: 2000 + shootTime,
        left: 1000 - shootTime,
        opacity: (1000 - shootTime) / 1000
      });
    }

    shootTime = time % 4000;
    if (shootTime < 800)  {
      stars[101].css({
        top: 2000 + shootTime,
        left: 800 - shootTime,
        opacity: (800 - shootTime) / 800
      });
    }

    requestAnimationFrame(pulse);
  }

  S.addTween('#field',
      TweenMax.from($('#field'), 1, {css: {opacity: 0}, onComplete: pulse}),
    500);
});

