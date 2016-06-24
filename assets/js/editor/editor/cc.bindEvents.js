function bindEvents(obj) {
  obj.on('selected', function() {
    $('.objectControl').addClass('active');
    //Determine which Config Panel Should be shown
    if (obj.type !== null || obj.type !== undefined ) {
      switch (obj.type) {
        case 'textbox':
          $('.text-attr').show();
          $('.webview').hide();
          break;
        case 'i-text':
          $('.text-attr').show();
          $('.webview').hide();
          break;
        case 'clock':
          $('.text-attr').show();
          $('.webview').hide();
          break;
        case 'marquee':
          $('.text-attr').show();
          $('.webview').hide();
          break;
        case 'weather':
          $('.text-attr').hide();
          $('.webview').hide();
          break;
        case 'rect':
          $('.text-attr').hide();
          $('.webview').hide();
          break;
        case 'circle':
          $('.text-attr').hide();
          $('.webview').hide();
          break;
        case 'usbframe':
          $('.text-attr').hide();
          $('.webview').hide();
          break;
        case 'webview':
          $('.text-attr').hide();
          $('.webview').show();
          break;
      }
    }
    // if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'clock' || obj.type === "marquee") {
    //   $('.text-attr').show();
    //   $('.basic-attr').hide();
    // } else {
    //   $('.text-attr').hide();
    //   $('.basic-attr').show();
    // }
    
    $('#config').fadeIn('fast').promise().done(function(){
      $(this).fadeTo('fast',0.9);
    })
    CanvasComposer.Log.update(obj);
  });
  //deselect

  canvas.on('before:selection:cleared', function() {
    console.log('deselected');
    $('.objectControl').removeClass('active');
    $('#config').fadeOut('fast');
    CanvasComposer.Log.clean(obj);
  });

  //Scaling
  obj.on('scaling', function() {
    console.log('scaling');
    CanvasComposer.Log.update(obj);
  });
  //Moving
  obj.on('moving', function() {
    console.log('moving');
    CanvasComposer.Log.update(obj);
  });
  //Rotating
  obj.on('rotating', function() {
    console.log('rotating');
    CanvasComposer.Log.update(obj);
  });
  //After Edit
  obj.on('changed', function() {
    console.log('Exited');
    CanvasComposer.Log.update(obj);
  })
}