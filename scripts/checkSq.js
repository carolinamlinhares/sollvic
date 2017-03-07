$(document).ready(function(){
    $('#stiffeningCS').change(function(){
        if (this.checked) {
            $('#aCS').hide(500);
        } else {
            $('#aCS').show(500);
        }                   
    });
    
    
    
});