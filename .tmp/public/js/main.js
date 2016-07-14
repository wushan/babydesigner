//Some ajax get
$(document).ready(function(){
  $('.user-dropdown > a').on('click', function(){
  	$(this).toggleClass('active');
  });
  //Image Error Handle
  jQuery("img").one('error', function () {
      jQuery(this).attr("src", "/images/components/thumbnail-placeholder.svg"); //.unbind("error") is useless here
  }).each(function () {
      if (this.complete && !this.naturalHeight && !this.naturalWidth) {
          $(this).triggerHandler('error');
      }
  });
});

//Socket
io.socket.on('connect', function socketConnected() {
	console.log('xxx');
});

var user;

//Authorize
// io.socket.get("/post", function (response) {
	
// 	if (response.passport){
// 		user = response.passport.user;
// 		$('.js-login').hide();
// 		$('.js-logout').show();
// 	} else {
// 		$('.js-login').show();
// 		$('.js-logout').hide();
// 	}
// });

// socket = io.connect();

// typeof console !== 'undefined' &&
// console.log('Connecting Socket.io to Sails.js...');

// // Attach a listener which fires when a connection is established:
// socket.on('connect', function socketConnected() {

//   typeof console !== 'undefined' &&
//   console.log(
//     'Socket is now connected and globally accessible as `socket`.\n' +
//     'e.g. to send a GET request to Sails via Socket.io, try: \n' +
//     '`socket.get("/foo", function (response) { console.log(response); })`'
//   );

//   // Attach a listener which fires every time the server publishes a message:
//   socket.on('message', function newMessageFromSails ( message ) {

//     typeof console !== 'undefined' &&
//     console.log('New message received from Sails ::\n', message);

//   });
//   socket.get("/foo", function (response) { console.log(response); });
// });


//SVG Fallback by Modernizr
// if (!Modernizr.svg) {
//     var imgs = document.getElementsByTagName('img');
//     var svgExtension = /.*\.svg$/
//     var l = imgs.length;
//     for(var i = 0; i < l; i++) {
//         if(imgs[i].src.match(svgExtension)) {
//             imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
//             console.log(imgs[i].src);
//         }
//     }
// }


//TypeKit
(function(d) {
    var config = {
      kitId: 'vsl2qdw',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);


