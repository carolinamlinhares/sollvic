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
var textC1, textC2, textC3;


$(document).ready(function() {
    
    // Building variable texts
    
    textC1 ="<p> 1º caso - Os cálculos anteriores aprovaram o domínio encontrado, o que ocorre porque a viga está no domínio 2 ou domínio 3 de deformação, e aprovaram a altura da linha neutra em relação à altura útil da viga\\(\\ \\frac{x}{d} \\). Tendo passado nestes dois critérios, a viga pode ser simplesmente armada. Assim, a área de aço necessária é calculada pela equação:<br><br>" + "<span class='eqcenter'> \\(\\ As = \\frac{M_d}{ \\sigma_{sd} * (d - 0.4 * x)} = \\)" + resultado.as + " cm² </span> </p>" + "<p> que comparada à área de aço inserida como dado de entrada (solicitante), define se a viga resiste ou não ao esforço provocado pelo momento fletor.<br><br>Ou seja:<br>Se \\(\\ (A_{stEntrada} * 1.05) ≥ A_s \\), a viga resiste ao momento fletor solicitado e pode ser simplesmente armada.<br><br>\\(\\ A_{stEntrada}\\) - área de aço inserida como dado de entrada<br>\\(\\ A_s\\) - área de aço necessária para resistir aos esforços<br><br>" + "<span class='eqcenter'> \\(\\ (A_{stEntrada}) =\\ \\)" + resultado.astForm + " cm² </span> </p>" + "<p> Caso contrário, a viga não resiste ao momento fletor solicitado.</p>";
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, textC1]); 

    textC2 = "<p> 2º caso – A viga foi aprovada no critério do domínio, mas reprovada na verificação do limite da linha neutra. O elemento em questão ainda pode possuir armadura simples, necessitando apenas de alguma alteração que faça com que a linha neutra esteja dentro do limite indicado por norma.<br><br>Algumas opções são:<br>-Aumentar a altura útil, o que ocorre com a redução da distância da borda tracionada ao centro de gravidade da armadura tracionada \\(\\ d'\\),<br>-Aumentar a altura da viga, para que seja possível ter um valor de altura útil maior,<br>-Reduzir a altura da linha neutra, alterando-se o momento solicitante ou o tipo do concreto e, por conseqüência, sua resistência.<br><br>Desta forma:<brSe\\(\\ A_{stEntrada} *1.05 ≥\\ A_s \\), a viga resiste ao momento fletor solicitado e pode ser simplesmente armada, mas não atende ao limite da linha neutra estabelecido em norma. Sugere-se aumentar a altura da viga.<br><br>Em qualquer caso onde a condição\\(\\ A_{stEntrada} *1.05 ≥\\ A_s \\) não for atendida, a viga não resiste ao momento fletor solicitado.<br><br>\\(\\ As = \\frac{M_d}{ \\sigma_{sd} * (d - 0.4 * x)} = \\)" + resultado.as + " cm²<br><br>\\(\\ A_{stEntrada} =\\ \\)" + resultado.astForm + " cm².<br><br></p>";
      //MathJax.Hub.Queue(["Typeset", MathJax.Hub, textC2]);
    
    textC3 = "<p> 3º caso – A viga encontra-se no domínio 4, e foi então reprovada neste critério. A mesma precisa ser duplamente armada de modo a passar para o Domínio 3. Uma parcela dos esforços de compressão será então resistida pelo aço inserido na zona comprimida da seção. Assim, procedem as seguintes etapas de cálculo:<br><br>3.1 - Cálculo de uma nova posição da LN.<br><br>Tomando-se a altura máxima que a linha neutra pode atingir para estar de acordo com os critérios da NBR 6118:2014, valor que corresponde à 45% da altura útil, tem-se:<br><br>\\(\\ x' = 0.45 * d =\\ \\)" + resultado.xd + " cm<br><br>Calcula-se então o valor da primeira parcela do momento fletor resistente, a ser gerado pela área de aço tracionada:<br><br>\\(\\ M_{1d} = 0.68 * bw * x_d * f_{cd} * (d - 0.4 * x_d) \\)<br><br>\\(\\ M_{1d} =\\ \\)" + resultado.m1d + " kN.cm<br><br>A segunda parcela do momento fletor resistente, a ser gerado pela área de aço na zona comprimida é calculado através da subtração:<br><br>\\(\\ M_{2d} = M_d - M_{1d} \\).<br><br>\\(\\ M_{2d} =\\ \\)" + resultado.m2d + " kN.cm<br><br>onde Md é o momento de flexão total solicitado, já majorado.<br><br>A área de aço comprimida necessária As` é então dada pela equação:<br><br>\\(\\ A'_{s} =\\ \\frac{M_{2d}}{ \\sigma'_{sd} * (d - d'c)}\\)<br>\\(\\ A'_s =\\ \\)" + resultado.asl + " cm²<br><br>\\(\\ \\sigma'_{sd}\\) – Tensão de escoamento do aço;<br>\\(\\ d'\\) – Distância da borda mais comprimida ao centro de gravidade da armadura comprimida;<br><br>Para encontrar o valor de \\(\\ \\sigma'_{sd}\\) e substituir na equação acima, calcula-se o valor da deformação da armadura comprimida através da equação:<br><br>\\(\\ \\varepsilon'_{sd} = 3.5 * (1 - \\frac{1}{0.45} * \\frac{d'c}{d}) =\\ \\)" + resultado.elsd + " cm <br><br>Multiplicando-se o seu valor pelo módulo de elasticidade do aço (210GPa), encontra-se a tensão de escoamento, que na equação acima, resultará a área de aço comprimida:<br><br>\\(\\ \\sigma'_{sd} = (\\frac{\\varepsilon'_{sd}}{10}) * (\\frac{Es}{100}) = \\)" + resultado.tlsd + " cm<br><br>\\(\\ E_s = \\) 210GPa - Módulo de elasticidade do aço;<br><br>A área de aço tracionada necessária é a soma de duas parciais \\(\\ A_{s1}\\) e \\(\\ A_{s2} \\). A primeira equilibra o momento fletor resistente da área de concreto comprimido e a segunda faz o equilíbrio com o momento fletor da armadura comprimida. Os cálculos são dados pelas equações abaixo, onde \\(\\ A_{st}\\) é a área de aço total necessária na zona tracionada.<br><br>\\(\\ A_{s1} = \\frac{M_{1d}}{\\sigma_sd * (d - 0.4 * x_d)} = \\)" + resultado.as1 + " cm²<br><br>\\(\\ A_{s2} = \\frac{M_{2d}}{\\sigma_sd * (d - d'_c)} = \\)" + resultado.as2 + " cm²<br><br>\\(\\ A_{st} = A_{s1} + A_{s2} = \\)" + resultado.ast + " cm²<br><br> Após os cálculos e detalhamento da armadura, deve-se verificar o novo valor da altura útil \\(\\ d\\).<br><br></p>";
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, textC3]);
    
    tableT1 = "<p>" + "<table class='reportable'><tr><th> Tipo de Viga </th><td> <span class='situationS'> </span></p>" + resultado.situationS + " </td></tr><tr><th> Altura Útil \\({(d)}\\) </th><td> <span class='d'> </span></p>" + resultado.d + " cm </td></tr><tr><th> Posição da Linha Neutra \\({(x)}\\) </th><td> <span class='x'> </span></p>" + resultado.x + " cm </td></tr><tr><th> Domínio de Deformação </th><td> <span class='dominio'> </span></p>" + resultado.dominio + " </td></tr><tr><th> Relação \\({(x/d)}\\) </th><td> <span class='ln'> </span></p>" + resultado.ln + " </td></tr><tr><th> Momento Fletor Majorado \\(M_{sd}\\) </th><td> <span class='md'> </span></p>" + resultado.md + "  kN.cm</td></tr><tr><th> Área de Aço Necessária \\(A_{s}\\) </th><td> <span class='as'> </span></p>" + resultado.as + "  cm²</td></tr><tr><th> Armadura de Pele \\(A_{sp}\\) </th><td> <span class='resultArmPele'> </span></p>" + resultado.resultArmPele + " </td></tr></table></p>";
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, tableT1]);
    
    tableT2 = "<p>" + "<table class='reportable'><tr><th> Tipo de Viga </th><td> <span class='situationS'> </span></p>" + resultado.situationS + " </td></tr><tr><th> Altura Útil \\({(d)}\\) </th><td> <span class='d'> </span></p>" + resultado.d + " cm </td></tr><tr><th> Posição da Linha Neutra \\({(x_d)}\\) </th><td> <span class='xd'> </span></p>" + resultado.xd + " cm </td></tr><tr><th> Domínio de Deformação </th><td> <span class='dominio'> </span></p>" + resultado.dominio + " </td></tr><tr><th> Relação \\({(x/d)}\\) </th><td> <span class='lnd'> </span></p>" + resultado.lnd + " </td></tr><tr><th> Momento Fletor Majorado \\(M_{sd}\\) </th><td> <span class='md'> </span></p>" + resultado.md + " kN.cm </td></tr><tr><th> Área de Aço Tracionada Necessária \\(A_{st}\\) </th><td> <span class='ast'> </span></p>" + resultado.ast + " cm² </td></tr><tr><th>Área de Aço Comprimida Necessária \\(A_{s'}\\) </th><td> <span class='asl'> </span></p>" + resultado.asl + " cm² </td></tr><tr><th> Armadura de Pele\\(A_{sp}\\) </th><td> <span class='resultArmPele'> </span></p>" + resultado.resultArmPele + " </td></tr></table></p>";
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, tableT2]);
    
    
    // Header
    $(".project").html(resultado.project);
    $(".beam").html(resultado.beam);
    $(".h").html(resultado.h);
    $(".bw").html(resultado.bw);
    $(".concrete").html(resultado.concrete);
    $(".steel").html(resultado.steel);
    $(".astForm").html(resultado.astForm);
    $(".ascForm").html(resultado.ascForm);
    
    $(".diamEstForm").html(resultado.diamEstForm);
    $(".diamLongTForm").html(resultado.diamLongTForm);
    $(".diamLongCForm").html(resultado.diamLongCForm);
    $(".dl").html(resultado.dl);
    $(".dlc").html(resultado.dlc);
    $(".cob").html(resultado.cob);
    $(".mk").html(resultado.mk);
    $(".gamac").html(resultado.gamac);
    $(".gamaf").html(resultado.gamaf);
    $(".gamas").html(resultado.gamas);

    
    // Section
    $(".h").html(resultado.h);
    $(".bw").html(resultado.bw);
    $(".cob").html(resultado.cob);
    $(".d").html(resultado.d);
    $(".diamEstForm").html(resultado.diamEstForm);
    $(".dl").html(resultado.dl);
    $(".dlc").html(resultado.dlc);
    $(".ac").html(resultado.ac);
    
    
    // Resultados
    $(".situationS").html(resultado.situationS);
    $(".md").html(resultado.md);
    $(".d").html(resultado.d);
    $(".x").html(resultado.x);
    $(".xd").html(resultado.xd);
    $(".dominio").html(resultado.dominio);
    $(".ln").html(resultado.ln);
    $(".lnd").html(resultado.lnd);
    $(".as").html(resultado.as);
    $(".as1").html(resultado.as1);
    $(".as2").html(resultado.as2);
    $(".ast").html(resultado.ast);
    $(".asl").html(resultado.asl);
    $(".resultArmPele").html(resultado.resultArmPele);
    $(".fcd").html(resultado.fcd);
    $(".fyd").html(resultado.fyd);
    $(".epc").html(resultado.epc);
    $(".eps").html(resultado.eps);
    $(".epyd").html(resultado.epyd);
    $(".betax23").html(resultado.betax23);
    $(".betax34").html(resultado.betax34);
    $(".x2lim").html(resultado.x2lim);
    $(".x3lim").html(resultado.x3lim);
    $(".m1d").html(resultado.m1d);
    $(".m2d").html(resultado.m2d);
    $(".elsd").html(resultado.elsd);
    $(".tlsd").html(resultado.tlsd);
    $(".astTol").html(resultado.astTol);
    $(".aslTol").html(resultado.aslTol);
    $(".caseS").html(resultado.caseS);
    $(".caseT").html(resultado.caseT);
    
 
    
    //Results CaseS
    $("#textC1").html(resultado.textC1);
    $("#textC2").html(resultado.textC2);
    $("#textC3").html(resultado.textC3);
        
    // CaseS
    switch (resultado.caseS) {
        case "Caso 1":
            $("#textC").html(textC1);
            break;
        case "Caso 2":
            $("#textC").html(textC2);
            break;
        case "Caso 3":
            $("#textC").html(textC3);
            break;
      }
    
    
    //Results CaseT
    $("#tableT1").html(resultado.tableT1);
    $("#tableT2").html(resultado.tableT2);
        
    // CaseT
    switch (resultado.caseT) {
        case "Tabela Simples":
            $("#tableT").html(tableT1);
            break;
        case "Tabela Dupla":
            $("#tableT").html(tableT2);
            break;
      }
    
    
    
});
