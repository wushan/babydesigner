CanvasComposer.Presets = function(){
  //讀取 Preset
  $('.layoutpresets').on('click', 'a', function(){
    if ($(this).attr('data-src') != '' || $(this).attr('data-src') != undefined) {
      $(this).parent().siblings().children('a').removeClass('active');
      $(this).addClass('active');
      //Check if there is already an object exist
      if (canvas._objects.length > 0) {
        var confirmation = confirm('讀取預設版型會移除目前畫面中的所有物件，是否確定讀取？');
        var confirmationBtn;
        if (confirmation == true) {
            CanvasComposer.Artboard.dispose();
            $('#loading').fadeIn('fast');
            CanvasComposer.Load.FromPresets($(this).attr('data-src'), function(res){
              console.log(res);
              CanvasComposer.History.Update();
              $('#presets').fadeOut('fast');
              $('#loading').fadeOut('fast');
            });
        } else {
            return;
        }
      } else {
        CanvasComposer.Load.FromPresets($(this).attr('data-src'), function(res){
          console.log(res);
          CanvasComposer.History.Update();
          $('#presets').fadeOut('fast');
        });
      }
    } else {
      alert('Error loading preset.');
    }
  });

  //讀取 Components
  $('.componentpresets').on('click', 'a', function(){
    CanvasComposer.Load.ComponentsFromJsonUrl($(this).attr('data-src'));
  });
};