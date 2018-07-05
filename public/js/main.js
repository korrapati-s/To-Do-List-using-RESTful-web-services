$(document).ready(function (){
  $('.delete-post').on('click', function(){
    var id = $(this).data('id');
    var url = '/delete/'+id;
    if(confirm('Delete Post?')){
      $.ajax({
        url: url,
        type:'DELETE',
        success: function(result){
          console.log('Deleting Recipe..');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }

      });
    }
  });

  $('.edit-post').on('click', function(){
    $('#editformtitle').val($(this).data('title'));
    $('#editformdescr').val($(this).data('descr'));
    $('#editformid').val($(this).data('id'));
  });
});
