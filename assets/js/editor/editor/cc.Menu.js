CanvasComposer.Menu = function(){
  //toolBar Actions  
  var actions = {
    addRect:   function (event) {
                  CanvasComposer.Artboard.addRect();
                },
    addUsb:   function (event) {
                  CanvasComposer.Artboard.addUsb();
                },
    addWeb: function(event) {
              CanvasComposer.Artboard.addWeb();
            },
    addCircle: function (event) {
                  CanvasComposer.Artboard.addCircle();
                },
    addText: function (event) {
                  CanvasComposer.Artboard.addText();
                },
    addMarquee: function (event) {
                  //Trigger Settings
                  $('#marquee-settings').addClass('active');
                  $(document).mouseup(function (e){
                    var container = $('.marquee-settings-inner');

                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        container.parent().removeClass('active');
                    }
                  });
                },
    addClock: function(event) {
                //Disable All 'floating-menu'
                $(this).parents('.tools').siblings().find('.floating-menu').fadeOut('fast');
                $(this).siblings().fadeToggle();
                $(document).mouseup(function (e){
                    var container = $('#sidebar');

                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        container.find($('.floating-menu')).hide();
                    }
                });
              },
    addWeather: function(event) {
                $(this).parent().siblings().children('a, ul').removeClass('active');
                //Trigger Submenu
                $(this).toggleClass('active');
                var sub = $(this).siblings('ul');
                sub.toggleClass('active');
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
                    var container = $('#sidebar');

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
      var currentCanvas = JSON.stringify(canvas);
      
      CanvasComposer.Interface.save();

    }
  };

  //
  $('a[data-action]').on('click', function (event) {
    var link = $(this),
        action = link.data('action');

    event.preventDefault();

    // If there's an action with the given name, call it
    if( typeof actions[action] === 'function' ) {
      actions[action].call(this, event);
    }
  });

  //WEATHER
  $('a[data-action=addWeather]').siblings('ul').on('click','a', function(){
    var location = $('#weatherCity option:selected').val();
    var locationText = $('#weatherCity option:selected').text();
    console.log(location);
    CanvasComposer.Artboard.Multimedia.weather(location, locationText);
    //Deactive myself
    $(this).parents('ul').removeClass('active');
  });

  //MARQUEE EVENTS
  $('#marquee-source').on('change', function(){
    var val = $(this).val();
    //Get the proper form
    $('#' + val).slideDown().promise().done(function(){
      $(this).addClass('active');
      $(this).siblings().slideUp().promise().done(function(){
        $(this).removeClass('active');
      })
    });
  });

  $('.js-addRow').on('click', function(){
    var el = $('.string-list-wrapper .string-item:last-child').clone();
    $('.string-list-wrapper').append(el);
  });
  
  $('.js-removeRow').on('click', function(){
    $('.string-list-wrapper .string-item:last-child').remove();
  });

  $('.js-sendToMarquee').on('click', function(){
    var marquee = {};
    var marqueeGroup;
    var marqueestring,
      marqueeleasttime,
      marqueetype,
      marqueetransitionperiod;
    var marqueedefault = 3;

    var activeTarget = $('.marquee-form.active');
    activeTarget.each(function(){
      marqueestring = new Array;
      marqueestring = $(this).find('.marquee-string').val().split('\n');
      console.log(marqueestring);
      marqueeleasttime = $(this).find('.marquee-leasttime').val();
      marqueetype = $(this).find('.marquee-type').val();
      marqueetransitionperiod = $(this).find('.marquee-transitionperiod').val();

      if (marqueestring == '') {
        marqueestring = 'null';
      }
      if (marqueeleasttime == '') {
        marqueeleasttime = marqueedefault;
      }
      if (marqueetype == '') {
        marqueetype = 'default';
      }
      if(marqueetransitionperiod == '') {
        marqueetransitionperiod = marqueedefault;
      }
      marquee = { string: marqueestring, leastTime: marqueeleasttime, transitionType: marqueetype, transitionPeriod: marqueetransitionperiod };
      // marqueeGroup.push(marquee);
    });
    console.log(marquee);
    //Create
    CanvasComposer.Artboard.addMarquee(marquee);
    $('#marquee-settings').removeClass('active');
  });

  $('#marquee-settings').find('.js-close').on('click', function(){
    $('#marquee-settings').removeClass('active');
  });
};
