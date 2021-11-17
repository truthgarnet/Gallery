var req = new XMLHttpRequest();
document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";

req.open("GET", "./json/image_list.json");
req.onreadystatechange = function(){
    if( this.readyState == 4){
        //console.log(this.response);
        var data = JSON.parse(this.response);
        for( var i = 0 ; i < data.length; i++){
            var div = document.createElement("div");
            div.setAttribute("class", "image");
            div.setAttribute("id", "image")
            div.onclick = function(){
               this.classList.toggle("image-selected");
               $(document).on('click', '#remove', function() {
                if(document.getElementById("image").className == "image image-selected"){
                    $(document.getElementsByClassName("image image-selected")).remove();
                }
             })
            }
            div.onmouseover = function(){
                var element = this;
                this.timerId = setTimeout( function(){
                    element.classList.add("image-magnified");
                }, 1000);
            }
            div.onmouseout = function(){
                clearTimeout(this.timerId);
                this.classList.remove("image-magnified")
            }
            var img = document.createElement("img");
            img.src = data[i];
            div.appendChild(img);
            document.body.appendChild(div);
        }
    }
}

req.send();

function selectAll(btn){
    var images = document.getElementsByClassName("image");
    for( var i = 0; i < images.length; i++){
        if(btn.value == "Unselect All")
        {
            images[i].classList.remove("image-selected")
        }else{
            images[i].classList.add("image-selected")
        }   
    }
    
    if(btn.value == "Unselect All")
        {
            btn.value = "Select All";
        }else{
            btn.value = "Unselect All";
        }   
    
}


function slideShow(btn){
    var images = document.getElementsByClassName("image");
    var index = 0;
    
    images[index].classList.add("image-magnified");

    var intervalId = setInterval( function(){
        images[index].classList.remove("image-magnified");
        index++;
        if( index < images.length){
            images[index].classList.add("image-magnified");
            console.log(index);
        }else{
            clearInterval(intervalId);
        }
        
    }, 1000);
}

$(document).on('click', '#removeAll', function(){
    $(document.getElementsByClassName("image")).remove();
 })

 

$(document).on('click', '#append', function() {
    let append = prompt("추가하고 싶은 src");
    var img = document.createElement("img");
    img.src = append;
    var div = document.createElement("div");
    div.setAttribute("class", "image");
    div.appendChild(img);
    document.body.appendChild(div);
})