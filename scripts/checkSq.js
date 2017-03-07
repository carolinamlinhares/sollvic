$(document).ready(function(){
    $('#stiffeningCS').change(function(){
        if (this.checked) {
            $("#aCS").css("visibility", "hidden");
        } else {
            $("#aCS").css("visibility", "visible");
        }                   
    });
    
    
    
});