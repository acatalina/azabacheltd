function scrollIt(destination, duration = 200, callback) {
  function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }

  var start = window.pageYOffset;
  var startTime = window.performance.now ? performance.now() : new Date().getTime();
  var offset = 0;

  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - offset;
  var destinationOffsetToScroll = Math.floor(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if (window.requestAnimationFrame === false) {
    window.scroll(0, destinationOffsetToScroll);

    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    console.log('scrolling...')
    var now = window.performance.now ? performance.now() : new Date().getTime();
    var time = Math.min(1, ((now - startTime) / duration));
    var timeFunction = easeInOutQuart(time);

    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (Math.ceil(window.pageYOffset) === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

function scrollToTop() {
  scrollIt(0);
}

function scrollToTarget() {
  var target = this.dataset.target;

  scrollIt(
    document.querySelector(target),
    500
  );
}

document.querySelector('#contact-link').addEventListener('click', scrollToTarget);