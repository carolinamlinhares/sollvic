$(document).ready(function () {
    $('.switch-input').change(function () {
        if (this.checked) {
            $("#coef").show(500);
        } else {
            $("#coef").hide(500);
        }
    });
    
 
});
