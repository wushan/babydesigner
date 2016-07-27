CanvasComposer.Presets = function(){
  
  var defaultCategory = $('#category-selector').data('init-cate');
  var defaultSubCategory = $('#subcategory-selector').data('init-cate');
  //Load Initial Category datas
  $.ajax({
    url: '/category',
    method: 'GET',
    success: function(cate) {
      for (var i = 0; i < cate.length; i ++) {
        if (cate[i].id == defaultCategory) {
          $('#category-selector').append('<option value=' + cate[i].id + ' selected>' + cate[i].name + '</option>');
        } else {
          $('#category-selector').append('<option value=' + cate[i].id + '>' + cate[i].name + '</option>');
        }
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
          if (subcate.sizes[i].id == defaultSubCategory) {
            $('#subcategory-selector').append('<option value="' + subcate.sizes[i].id + '" data-width=' + subcate.sizes[i].width + ' data-height=' + subcate.sizes[i].height + ' selected>' + subcate.sizes[i].slug + ' ( ' + subcate.sizes[i].width + ' x ' + subcate.sizes[i].height + ' )</option>');
          } else {
            $('#subcategory-selector').append('<option value="' + subcate.sizes[i].id + '" data-width=' + subcate.sizes[i].width + ' data-height=' + subcate.sizes[i].height + '>' + subcate.sizes[i].slug + ' ( ' + subcate.sizes[i].width + ' x ' + subcate.sizes[i].height + ' )</option>');
          }
        }
        //Update Presets
        updatePresetList($('#subcategory-selector').val());
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
      updatePresetList($(this).val());
  });

  function updatePresetList(subcateid){
    //Clean first
    $('.preset-list').empty();
    $.ajax({
      url: '/works/size/' + subcateid,
      method: 'GET',
      success: function(presets) {
        for (var i=0; i<presets.length; i++) {
          var presetItem = $('<div class=preset><a href=/editor/' + presets[i].workid + '><div class=thumbnail><img src=' + presets[i].thumbnail + '></div></a></div>')
          $('.preset-list').append(presetItem);
        }
      }
    }).fail(function(err){
      console.log(err);
    })
  }
};