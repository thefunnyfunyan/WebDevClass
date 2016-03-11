/**
 * Created by Brandon on 3/10/2016.
 */
window.onload = function(){
    var newWiki = document.getElementById('newWikiButton');
    if(null!=newWiki&&undefined!=newWiki){
        newWiki.addEventListener('click', function(){
            location.href = '/page/new'
        })
    }
}