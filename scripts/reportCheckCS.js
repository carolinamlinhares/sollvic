
// Start of parsing results
function getJsonFromUrl(hashBased) {
    'use strict'
    var query;
    if (hashBased) {
        var pos = location.href.indexOf("?");
        if (pos === -1) return [];
        query = location.href.substr(pos + 1);
    } else {
        query = location.search.substr(1);
    }
    var result = {};
    query.split("&").forEach(function(part) {
        if (!part) return;
        part = part.split("+").join(" "); // replace every + with space, regexp-free version
        var eq = part.indexOf("=");
        var key = eq > -1 ? part.substr(0, eq) : part;
        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
        var from = key.indexOf("[");
        if (from == -1) result[decodeURIComponent(key)] = val;
        else {
            var to = key.indexOf("]");
            var index = decodeURIComponent(key.substring(from + 1, to));
            key = decodeURIComponent(key.substring(0, from));
            if (!result[key]) result[key] = [];
            if (!index) result[key].push(val);
            else result[key][index] = val;
        }
    });
    return result;
}

var resultado = [];
resultado = JSON.parse(getJsonFromUrl().test);
//End of parsing results

//Variables

/*resultado.project = (resultado.project);
resultado.beam = (resultado.beam);
resultado.as = (resultado.as);
resultado.md = (resultado.md);
resultado.msd = Number (resultado.msd);*/


$(document).ready(function() {
    
    // Header
    $(".project").html(resultado.project);
    $(".beam").html(resultado.beam);
    $(".h").html(resultado.h);
    $(".bw").html(resultado.bw);
    $(".concrete").html(resultado.concrete);
    $(".steel").html(resultado.steel);
    $(".as").html(resultado.as);
    $(".d").html(resultado.d);
    $(".cob").html(resultado.cob);
    $(".diamLongForm").html(resultado.diamLongForm);
    $(".diamEstForm").html(resultado.diamEstForm);
    $(".mk").html(resultado.mk);
    $(".gamac").html(resultado.gamac);
    $(".gamaf").html(resultado.gamaf);
    $(".gamas").html(resultado.gamas);
    
    
    // Results

    $(".as").html(resultado.as);
    $(".d").html(resultado.d);
    $("#x").html(resultado.x);
    $("#dominio").html(resultado.dominio);
    $("#ln").html(resultado.ln);
    $("#md").html(resultado.md);
    $("#msd").html(resultado.msd);
    $(".resultArmPele").html(resultado.resultArmPele);
    

    // Conclusion
    $(".result").html(resultado.result);
    
    /*if (resultado.result === "OK") {
        $("#textR").html(textApp);
    } else if (resultado.vsd >= resultado.vrd && resultado.msd <= resultado.mrdOut) {
        $("#textR").html(textNAppV);
    } else if (resultado.vsd <= resultado.vrd && resultado.msd > resultado.mrdOut) {
        $("#textR").html(textNAppM);
    } else if (resultado.vsd > resultado.vrd && resultado.msd > resultado.mrdOut) {
        $("#textR").html(textNAppVM);
    }*/

});
