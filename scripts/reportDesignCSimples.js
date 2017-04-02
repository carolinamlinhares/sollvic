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

var i = 0;
var tableHeader = '<tr><th> Nº de Barras </th> <th> Φ Bitola (mm) </th> <th> Área de Aço \\(A_{sCalc}\\) (cm²) </th> <th> Taxa de Armadura (%) </th> <th> Espaçamento horizontal mínimo (cm) </th> <th> Espaçamento vertical mínimo (cm) </th> </tr>';
MathJax.Hub.Queue(["Typeset", MathJax.Hub, tableHeader]);

$(document).ready(function() {
    // Header
    $(".project").html(resultado.project);
    $(".beam").html(resultado.beam);
    $(".h").html(resultado.h);
    $(".bw").html(resultado.bw);
    $(".concrete").html(resultado.concrete);
    $(".steel").html(resultado.steel);
    $(".diamEstForm").html(resultado.diamEstForm);
    $(".dl").html(resultado.dl);
    $(".dlc").html(resultado.dlc);
    $(".cob").html(resultado.cob);
    $(".agreg").html(resultado.agreg);
    $(".mk").html(resultado.mk);
    $(".gamac").html(resultado.gamac);
    $(".gamaf").html(resultado.gamaf);
    $(".gamas").html(resultado.gamas);

    
    // Section
    $("#h").html(resultado.h);
    $("#bw").html(resultado.bw);
    $("#cob").html(resultado.cob);
    $("#d").html(resultado.d);
    $("#diamEstForm").html(resultado.diamEstForm);
    $(".dl").html(resultado.dl);
    $(".dlc").html(resultado.dlc);
    $("#ac").html(resultado.ac);
    
    
    // Resultados
    $("#situationS").html(resultado.situationS);
    $("#md").html(resultado.md);
    $("#d").html(resultado.d);
    $("#x").html(resultado.x);
    $("#dominio").html(resultado.dominio);
    $("#ln").html(resultado.ln);
    $("#as").html(resultado.as);
    
    
    //Arranjos Table
    
    $('#suggestion_table').append('<table style="width: 100%"></table>');
    var table = $('#suggestion_table').children();
    table.append(tableHeader);
    for (i = 0; i <= resultado.arranjos.length; i += 1) {
        table.append('<tr><td>' +  resultado.arranjos[i].qtd + '</td>' + '<td>' +  resultado.arranjos[i].bitola + '</td>' + '<td>' +  resultado.arranjos[i].as + '</td>' + '<td>' +  resultado.arranjos[i].taxa + '</td>' + '<td>' +  resultado.arranjos[i].ah + '</td>' + '<td>' +  resultado.arranjos[i].av + '</td>' + '</tr>');
    }
    
    
});
