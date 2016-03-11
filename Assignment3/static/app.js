var $ = require('jquery');

window.onload = function(){
  var commentButton = document.getElementById('CommentButton');
  if(null!== commentButton && undefined !== commentButton){
    commentButton.addEventListener('click', function(){
      if(commentButton.innerHTML === 'Add Comment') {
        commentButton.innerHTML = 'Publish Comment';
        $.get({
          url:'/post/1/comments/new',
          success: function(data){
            document.getElementsByClassName('New Comment')[0].innerHTML = data;}
        });
      }
      else {
        commentButton.innerHTML = 'Add Comment';
        var author = document.getElementsByName('author')[0].value;
        var content = document.getElementsByName('comment')[0].value;
        document.getElementsByClassName('New Comment')[0].innerHTML = '';
        $('#Publish').submit(function(data){
          document.getElementsByClassName('Blog Comments')[0].appendChild(data);
        })
      }
    });
  }
}
