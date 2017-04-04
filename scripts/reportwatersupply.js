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

$(document).ready(function() {
    $(".project").html(resultado.project);
    $(".npav").html(resultado.npav);
    $(".npes").html(resultado.npes);
    $(".napt").html(resultado.napt);
    $(".interm").html(resultado.interm);
    $(".srest").html(resultado.srest);
    $(".scine").html(resultado.scine);
    $(".stemplo").html(resultado.stemplo);
    $(".sfunc").html(resultado.sfunc);
    $(".qtdrest").html(resultado.qtdrest);
    $(".qtdcine").html(resultado.qtdcine);
    $(".qtdtemplo").html(resultado.qtdtemplo);
    $(".qtdfunc").html(resultado.qtdfunc);
    $(".percaprest").html(resultado.percaprest);
    $(".percapcine").html(resultado.percapcine);
    $(".percaptemplo").html(resultado.percaptemplo);
    $(".percapfunc").html(resultado.percapfunc);
    $(".percap").html(resultado.percap);
    $(".q").html(resultado.q);
    $(".vri").html(resultado.vri);
    $(".vrs").html(resultado.vrs);
    $(".vtot").html(resultado.vtot);
    $(".cd").html(resultado.cd);
    $(".vinc").html(resultado.vinc);
    
});