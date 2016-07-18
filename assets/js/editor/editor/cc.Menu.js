CanvasComposer.Menu = function(){
  //toolBar Actions  
  var actions = {
    addRect:   function (event) {
                  CanvasComposer.Artboard.addRect();
                },
    addCircle: function (event) {
                  CanvasComposer.Artboard.addCircle();
                },
    addImage: function (event) {
                  // CanvasComposer.Artboard.addImage();
                  // Open Media panel
                  $('#imageLibrary').toggleClass('active');
                },
    addText: function (event) {
                  CanvasComposer.Artboard.addText();
                },
    presets: function( event ) {
            $('#presets').toggleClass('active');
            },
    lockAll: function(event) {
                //
              },
    reset: function(event) {
                CanvasComposer.Artboard.reset();
              },
    delete: function(event) {
                event.preventDefault(); event.stopPropagation();
                CanvasComposer.Artboard.removeObject();
              },
    disposeAll: function(event) {
                CanvasComposer.Artboard.dispose();
              },
    artboardSettings: function(event) {
                //Disable All 'floating-menu'
                $(this).parents('.tools').siblings().find('.floating-menu').fadeOut('fast');
                $(this).siblings().fadeToggle();
                $(document).mouseup(function (e){
                    var container = $('#menu');

                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        container.find($('.floating-menu')).hide();
                    }
                });
              },
    saveState: function(event) {
                // CanvasComposer.Save.toSvg();
                // CanvasComposer.Save.toPng();
                // CanvasComposer.Save.toObj();
                // Alert after save
                //SELECT SAVE TYPE
                $(this).toggleClass('active');
                var sub = $(this).siblings('ul');
                sub.toggleClass('active');
              },
    savePng: function(event) {
      CanvasComposer.Save.toPng();
    },
    saveSvg: function(event) {
      CanvasComposer.Save.toSvg();
    },
    saveJSON: function(event) {
      CanvasComposer.Interface.save();
      console.log('exed');
    },
    update: function(event) {
      //Update Canvas Size
      var height = $('#subcategory-selector option:selected').data('height'),
          width = $('#subcategory-selector option:selected').data('width');
        //Set Canvas Size
      canvas.setHeight(height);
      canvas.setWidth(width);
      canvas.renderAll();
      CanvasComposer.initCanvas.fit();
        //Update Current Canvas Info
        var slug = $('#subcategory-selector option:selected').text();
        slug = slug.split('(');

        $('#current-preset').data({
          'width': width,
          'height': height
        }).html('Current Preset: ' + slug[0] + ' / ' + width + ' x ' + height);

        //Auto Save
        CanvasComposer.Interface.save();
        //Set Canvas tip tags
        $('.sizeTag .tag.width span').html(width);
        //Set Canvas tip tags
        $('.sizeTag .tag.height span').html(height);
      // Close Presets Dialog
      $('#presets').removeClass('active');
    }
  };

  //
  $('#canadEditor').on('click','a[data-action]', function (event) {
    console.log('click');
    var link = $(this),
        action = link.data('action');
    console.log(action);
    console.log(actions);
    event.preventDefault();
    // If there's an action with the given name, call it
    if( typeof actions[action] === 'function' ) {
      actions[action].call(this, event);
    }
  });
};
