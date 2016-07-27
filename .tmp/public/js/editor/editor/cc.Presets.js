CanvasComposer.Presets = function(){

  //Load Initial Category datas
  $.ajax({
    url: '/category',
    method: 'GET',
    success: function(cate) {
      for (var i = 0; i < cate.length; i ++) {
        $('#category-selector').append('<option value=' + cate[i].id + '>' + cate[i].name + '</option>');
      }
      refreshSubcate();
    }
  }).fail(function(err){
    alert(err);
  });

  //Load Initial Subcategory datas
  function refreshSubcate(request) {
    if (!request) {
      request = $('#category-selector').data('init-cate');
    }
    //Clean Up
    $('#subcategory-selector').empty();

    $.ajax({
      url: '/category/' + request,
      method: 'GET',
      success: function(subcate) {
        console.log(subcate);
        for (var i = 0; i < subcate.sizes.length; i ++) {
          $('#subcategory-selector').append('<option value="' + subcate.sizes[i].id + '" data-width=' + subcate.sizes[i].width + ' data-height=' + subcate.sizes[i].height + '>' + subcate.sizes[i].slug + ' ( ' + subcate.sizes[i].width + ' x ' + subcate.sizes[i].height + ' )</option>');
        }
      }
    }).fail(function(err){
      alert(err);
    });
  }

  $('#category-selector').on('change', function(){
      selectedCate = $(this).val();
      refreshSubcate(selectedCate);
    });

    $('#subcategory-selector').on('change', function(){
      updatePresetList();
    });

    // function selectionRenew(subcategory) {
    //   $('#subcategory-selector').empty();
    //   for (var i = 0; i < subcategory.length; i ++) {
    //     $('#subcategory-selector').append('<option value="' + subcategory[i].id + '" data-width=' + subcategory[i].width + ' data-height=' + subcategory[i].height + '>' + subcategory[i].slug + ' ( ' + subcategory[i].width + ' x ' + subcategory[i].height + ' )</option>');
    //   }
    // }
    // function updatePresetList(){
    //   $('.btn-update').addClass('disabled');
    //   //Get Works From subcategory
    //   $.ajax({
    //     url: '/size/' + $('#subcategory-selector').val(),
    //     method: 'GET',
    //     success: function(subcate){
    //       console.log(subcate.works);
    //       if (subcate.works.length > 0) {
    //         $('.preset-list').empty();
    //         for (var i = 0; i < subcate.works.length; i++ ) {
    //           $('.preset-list').append('<div class=preset><a href=/editor/' + subcate.works[i].workid + '><div class=thumbnail><img src=' + subcate.works[i].thumbnail + '></div></a></div>')
    //         }
    //       }
    //       $('.btn-update').removeClass('disabled');
    //     }
    //   });
    // }


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