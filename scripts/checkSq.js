$(document).ready(function(){
    $('#stiffeningCS').change(function(){
        if (this.checked) {
            $("#aCS").css("visibility", "hidden");
        } else {
            $("#aCS").css("visibility", "visible");
        }                   
    });
    
    $('.switch').change(function(){
        if (this.checked) {
            $("#coef").show(500);
        } else {
            $("#coef").hide(500);
        }                   
    });
    
    
    
});