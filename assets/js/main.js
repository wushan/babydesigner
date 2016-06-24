//Some ajax get
      $(document).ready(function(){
        $.ajax({
            method: "GET",
            url: "/user"
          })
            .done(function( data ) {
              //List em all
              $('#show').append('<ul></ul>');
              for (var i=0; i < data.length; i++) {
                  $('#show ul').append('<li>id:' + data[i].id + ' / email:' + data[i].email + '</li>');
                }
              //- $('#show').html(data[2].email);
            })
            .fail(function( err ){
              $('#show').append('failed:' + err );
            });
      });

//Socket

io.socket.on('connect', function socketConnected() {
	console.log('xxx');
});

	//Authorize
io.socket.get("/post", function (response) {
	if (response.passport){
		$('.js-login').hide();
		$('.js-logout').show();
	} else {
		$('.js-login').show();
		$('.js-logout').hide();
	}
});

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
//TypeKit
(function(d) {
    var config = {
      kitId: 'vsl2qdw',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);


