$(document).ready(function(){
    $('.switch-input').change(function(){
        if (this.checked) {
            $("#iadd").show(500);
        } else {
            $("#iadd").hide(500);
        }                   
    });
    
    $('#rest').change(function(){
        if (this.checked) {
            $("#iaddrest").show(500);
        } else {
            $("#iaddrest").hide(500);
        }                   
    });
    
    $('#func').change(function(){
        if (this.checked) {
            $("#iaddfunc").show(500);
        } else {
            $("#iaddfunc").hide(500);
        }                   
    });
    
    $('#cine').change(function(){
        if (this.checked) {
            $("#iaddcine").show(500);
        } else {
            $("#iaddcine").hide(500);
        }                   
    });
    
    $('#templo').change(function(){
        if (this.checked) {
            $("#iaddtemplo").show(500);
        } else {
            $("#iaddtemplo").hide(500);
        }                   
    });
    
    
    
});