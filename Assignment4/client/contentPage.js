/**
 * Created by Brandon on 3/10/2016.
 */
$ = require('jquery')

window.onload = function(){
    var contentButton = $("#pagebutton");
    if(null!= contentButton && undefined != contentButton){
       contentButton.click(function(){
            if(contentButton.text()=="Go To Chat Page"){
                contentButton.text("Go To Content Page")
                $(".contentPage").css('display', 'none');
                $(".chatpage").css('display', 'block');
            }
           else{
                contentButton.text("Go To Chat Page")
                $(".chatpage").css('display', 'none');
                $(".contentPage").css('display', 'block');
            }
       })
    }
    $("#newChat").click(function(){
        $(".newChat").css('display','block');
        $(".currentChat").css('display','none');
    })

}
