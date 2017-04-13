/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, mk, concrete, steel;
var tsd, as, bw, fcd;
var betax23, betax34, epc, eps, epyd, fyd, Es, fck, fyk, fckForm, fykForm;
var d, h, cob, diamEstForm, diamLongTForm, diamLongCForm, diamEst, diamLongT, diamLongC;
var a, b, c, delta, deltaR, x1, x2;
var x, mk, md, ln, lnd;
var x2lim, x3lim, dominio, dl;
var gamac, gamaf, gamas, s;
var situationD, situationLN, situationCG;
var dlc, xd, m1d, m2d, rtab, elsd, tlsd, asl, as1, as2, asc, ast, astTol, aslTol, situationS, result;
var astForm, ascForm;
var textC1, textC2, textC3, caseS;
var armPele, resultArmPele, bootbox;

var nBarras, nBarrasC, nBarrasT;
var arranjos = [];
var resultado = [];

var bitola = [
    {
        "diametro": 5.0,
        "area": 0.196349540849362
    },
    {
        "diametro": 6.3,
        "area": 0.311724531052447
    },
    {
        "diametro": 8.0,
        "area": 0.502654824574367
    },
    {
        "diametro": 10.0,
        "area": 0.785398163397448
    },
    {
        "diametro": 12.5,
        "area": 1.22718463030851
    },
    {
        "diametro": 16.0,
        "area": 2.01061929829747
    },
    {
        "diametro": 20.0,
        "area": 3.80132711084365
    },
    {
        "diametro": 25.0,
        "area": 4.90873852123405
    },
    {
        "diametro": 32.0,
        "area": 8.04247719318987
    },
    {
        "diametro": 40.0,
        "area": 12.5663706143592
    }
    
];

var steelProp = [
   /*{
        "steelType": "CA25",
        "fy": 250,
        "fu": 217.4,
        "E": 21000
    },*/
    {
        "steelType": "CA50",
        "fy": 500,
        "fu": 434.8,
        "E": 21000
    }
    /*{
        "steelType": "CA60",
        "fy": 600,
        "fu": 521.7,
        "E": 21000
    }*/
];

var concreteProp = [
    {
        "concType": "C20",
        "fckProp": 200
    },
    {
        "concType": "C25",
        "fckProp": 250
    },
    {
        "concType": "C30",
        "fckProp": 300
    },
    {
        "concType": "C35",
        "fckProp": 350
    },
    
    {
        "concType": "C40",
        "fckProp": 400
    },
    {
        "concType": "C45",
        "fckProp": 450
    },
    {
        "concType": "C50",
        "fckProp": 500
    }

];

function processFormCD() {
    "use strict";
    var i, j, k, w;
    
    /* Clean suggestion array */
    arranjos = [];
   
    // Getting values from HTML form inputs
    project = document.formCD.projectCD.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }
       
    beam = document.formCD.beamCD.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }
    
    h = Number(document.formCD.hCD.value);
    if (document.formCD.hCD.value === "" || isNaN(h)) {
        alert("Por favor preencha o campo Altura da Viga com números.");
        console.log("Por favor preencha o campo Altura da Viga.");
        return false;
    }
    
    bw = Number(document.formCD.bwCD.value);
    if (document.formCD.bwCD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Largura da Viga com números.");
        console.log("Por favor preencha o campo Largura da Viga.");
        return false;
    }
    
    astForm = Number(document.formCD.astCD.value);
    if (document.formCD.astCD.value === "" || isNaN(astForm)) {
        alert("Por favor preencha o campo Área de Aço Tracionada com números.");
        console.log("Por favor preencha o campo Área de Aço Tracionada.");
        return false;
    }
    
    ascForm = Number(document.formCD.ascCD.value);
    if (document.formCD.ascCD.value === "" || isNaN(ascForm)) {
        alert("Por favor preencha o campo Área de Aço Comprimida com números.");
        console.log("Por favor preencha o campo Área de Aço Comprimida.");
        return false;
    }
                
    mk = Number(document.formCD.mCD.value);
    if (document.formCD.mCD.value === "" || isNaN(mk)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }
    
    concrete = concreteProp[(document.formCD.concreteCD.value)].concType;
    steel = steelProp[(document.formCD.steelCD.value)].steelType;
    diamLongTForm = bitola[Number(document.formCD.longTCD.value)].diametro;
    diamLongCForm = bitola[Number(document.formCD.longCCD.value)].diametro;
    diamEstForm = bitola[Number(document.formCD.estCD.value)].diametro;
    gamac = Number(document.formCD.gamacCD.value);
    gamaf = Number(document.formCD.gamafCD.value);
    gamas = Number(document.formCD.gamasCD.value);
    /*s = Number(document.formCD.sCD.value);*/
    cob = Number(document.formCD.cobCD.value);
    dl = Number(document.formCD.dlCD.value);
    dlc = Number(document.formCD.dlcCD.value);
        
    // Getting bitolaLong properties
    i = Number(document.getElementById("bitolaLongT").value);
    w = Number(document.getElementById("bitolaLongC").value);
    
    // Getting concrete properties
    j = Number(document.getElementById("concrete").value);
    
    fckForm = concreteProp[j].fckProp;
    
    // Getting steel properties
    k = Number(document.getElementById("steel").value);
    
    fykForm = steelProp[k].fy;
    Es = steelProp[k].E;
    
    // Converting Units 
    fyk = fykForm / 10;
    fyk = Number(fyk.toFixed(2));
    fck = fckForm / 100;
    fck = Number(fck.toFixed(2));
    diamEst = diamEstForm / 10;
    diamLongT = diamLongTForm / 10;
    diamLongC = diamLongCForm / 10;
    
    // Calculating parameters
    fcd = fck / gamac;
    fcd = Number(fcd.toFixed(2));
    fyd = fyk / gamas;
    fyd = Number(fyd.toFixed(2));
    tsd = fyd;
    epc = 3.5;
    eps = 10.0;
    
    //CÁLCULO DO MOMENTO FLETOR MAJORADO
    md = mk * gamaf;
    md = Number(md.toFixed(2));

    //CÁLCULO DA ALTURA ÚTIL (d)
    d = h - dl;
    
    // Verificação
    
    if (dl >= cob + diamEst + 0.5 * diamLongT && dlc >= cob + diamEst + 0.5 * diamLongC) {
        situationCG = "Coerente";
    } else {
        situationCG = "Incoerente";
    }
    
    console.log("situationCG = " + situationCG);
        
    //CÁLCULO DOS LIMITES DOS DOMÍNIOS 2 E 3
    //DOMÍNIO 2
    betax23 = epc / (epc + eps);
    betax23 = Number(betax23.toFixed(2));
   
    //DOMÍNIO 3
    epyd = (fyd / Es) * 1000;
    epyd = Number(epyd.toFixed(2));
    betax34 = epc / (epc + epyd);
    betax34 = Number(betax34.toFixed(2));
    
    //CÁLCULO DA POSIÇÃO DA LINHA NEUTRA (x)
    //md = 0.68*bw*x*fcd*(d-0.4*x);
    //(0.4*x^2)+(d*x)+(md/(0.68*bw*fcd))=0
	
    a = 0.4;
    b = -1 * d;
    c = md / (0.68 * bw * fcd);
    delta = Math.pow(b, 2) - ((4 * a) * c);
    
    if (delta > 0) {
	    deltaR = Math.sqrt(delta);
	    x1 = ((-b +  deltaR)  / (2 * a));
        x1 = Number(x1.toFixed(2));
	    x2 = ((-b -  deltaR)  / (2 * a));
        x2 = Number(x2.toFixed(2));
    } else {
        x1 = ("Sem raiz");
		x2 = ("Sem raiz");
    }
    
    if (x1 > h) {
        x = x2;
    } else {
        x = x1;
    }
    
    //x = Number(x.toFixed(2));
    //VERIFICAÇÃO DO DOMÍNIO DA VIGA

    x2lim = betax23 * d;
    x2lim = Number(x2lim.toFixed(2));
    x3lim = betax34 * d;
    x3lim = Number(x3lim.toFixed(2));
    
    if (x > x2lim && x < x3lim) {
        dominio = "Domínio 3";
        situationD = "Aprovado";
    } else if (x < x2lim) {
        dominio = "Domínio 2";
        situationD = "Aprovado";
    } else if (x > x3lim) {
        dominio = "Domínio 4";
        situationD = "Reprovado";
    } else {
        dominio = "Error";
    }

    console.log("situationD = " + situationD);
    
    //VERIFICAÇÃO DA RELAÇÃO x/d
    ln = x / d;
    ln = Number(ln.toFixed(2));
    
    if (x / d <= 0.45) {
        situationLN = "Aprovada";
    } else {
        situationLN = "Reprovada";
    }
    
    console.log("situationLN = " + situationLN);
    
    /* //CÁLCULO DA ÁREA DE AÇO UTILIZADA NA VIGA EM VERIFICAÇÃO
    astcalc = nBarrasT * ncamT * bitola[i].area;
    asccalc = nBarrasC * ncamC * bitola[w].area; */
    
    //CÁLCULO DA ÁREA DE AÇO NECESSÁRIA

    if (situationCG === "Incoerente") {
        alert("A altura da viga não está coerente com as distâncias ao centro das armaduras, cobrimento e bitolas utilizadas. Por favor, verifique os dados de entrada.");
    } else {
        if (situationD === "Aprovado" && situationLN === "Aprovada") {
            situationS = "Simplesmente Armada";
            caseS = "Caso 1";
	        as = md / (tsd * (d - 0.4 * x));
            as = Number(as.toFixed(2));
            astTol = as * 1.05;
            astTol = Number(astTol.toFixed(2));
            if ((astForm + (0.05 * astForm)) >= as) {
                result = "A viga resiste ao momento fletor solicitado e pode ser simplesmente armada";
            } else {
                result = "A viga não resiste ao momento fletor solicitado";
            }
                
        } else if (situationD === "Aprovado" && situationLN === "Reprovada") {
            situationS = "Simplesmente Armada";
            caseS = "Caso 2";
	        as = md / (tsd * (d - 0.4 * x));
            as = Number(as.toFixed(2));
            astTol = as * 1.05;
            astTol = Number(astTol.toFixed(2));
            if ((astForm + (0.05 * astForm)) >= as) {
                result = "A viga resiste ao momento fletor solicitado e pode ser simplesmente armada, mas não atende ao limite da linha neutra estabelecido em norma. Sugere-se aumentar a altura da viga.";
            } else {
                result = "A viga não resiste ao momento fletor solicitado";
            }
                    
        } else {
            situationS = "Duplamente Armada";
            caseS = "Caso 3";
        
            //Cálculo da nova posição da LN
            xd = 0.45 * d;
            
            //Cálculo da nova relação x/d
            lnd = xd / d;
            lnd = Number(lnd.toFixed(2));
        
            //Cálculo de M1d
            m1d = 0.68 * bw * xd * fcd * (d - 0.4 * xd);
        
            //Cálculo de M2d
            m2d = md - m1d;
        
            //Encontrar valor de tlsd na tabela
            rtab = dlc / d;
            elsd = 3.5 * (1 - (1 / 0.45) * rtab);
            elsd = Number(elsd.toFixed(2));
            tlsd = (elsd / 10) * (Es / 100);
            tlsd = Number(tlsd.toFixed(2));
            
            if ((rtab) < 0.1838571429) {
                (rtab) = 0.1838571429;
            }
                        
            //Encontrar área de aço comprimida necessária A's
            asl = m2d / (tlsd * (d - dlc));
            asl = Number(asl.toFixed(2));
            aslTol = ascForm * 1.05;
            aslTol = Number(aslTol.toFixed(2));
        
            //Encontrar área de aço tracionada necessária As
            as1 = m1d / (tsd * (d - 0.4 * xd));
            as2 = m2d / (tsd * (d - dlc));
            ast = as1 + as2;
            ast = Number(ast.toFixed(2));
            astTol = astForm * 1.05;
            astTol = Number(astTol.toFixed(2));
         
            if ((astForm + (0.05 * astForm)) >= ast && (ascForm + (0.05 * ascForm)) >= asl) {
                result = "A viga resiste ao momento fletor solicitado com a armadura dupla utilizada.";
            } else {
                result = "A viga não resiste ao momento fletor solicitado.";
            }
        }
        //alert(result);
    }
    
    

    if (h > 60) {
        armPele = 0.001 * bw * h;
        armPele = Number(armPele.toFixed(2));
        resultArmPele = "É necessário utilizar armadura de pele com " + armPele + "cm² por face";
    } else {
        resultArmPele = "Não é necessário utilizar armadura de pele";
    }
    if (resultArmPele === "É necessário utilizar armadura de pele com " + armPele + "cm² por face") {
        //alert(resultArmPele);
    }
    
    
    
    
    
    
    
    
    
    
    /*  
   CRIACAO DE VARIAVEL PARA MANDAR VIA URL PARA RELATORIO
 */
    
        
  // Report Array

    resultado = {
        "project": project,
        "beam": beam,
        "h": h,
        "bw": bw,
        "concrete": concrete,
        "steel": steel,
        "astForm": astForm,
        "ascForm": ascForm,
        "dl": dl,
        "dlc": dlc,
        "diamLongTForm": diamLongTForm,
        "diamLongCForm": diamLongCForm,
        "diamEstForm": diamEstForm,
        "cob": cob,
        "mk": mk,
        "gamac": gamac,
        "gamaf": gamaf,
        "gamas": gamas,
        "d": d,
        "situationS": situationS,
        "resultArmPele": resultArmPele,
        "md": md,
        "as": as,
        "ast": ast,
        "as1": as1,
        "as2": as2,
        "asl": asl,
        "x": x,
        "xd": xd,
        "dominio": dominio,
        "result": result,
        "fcd": fcd,
        "fyd": fyd,
        "epc": epc,
        "eps": eps,
        "epyd": epyd,
        "betax23": betax23,
        "betax34": betax34,
        "x2lim": x2lim,
        "x3lim": x3lim,
        "m1d": m1d,
        "m2d": m2d,
        "elsd": elsd,
        "tlsd": tlsd,
        "astTol": astTol,
        "aslTol": aslTol,
        "caseS": caseS,
        "textC1": textC1,
        "textC2": textC2,
        "textC3": textC3,
        "lnd": lnd,
        "ln": ln

        
    };
    
    var menu_prompt = {
        title: "Resultado",
        message: result,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Voltar'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Mostrar relatório'
            }
        },
        callback: function (result) {
            if (result) {
                location.href = "reportCheckCD.html?test=" + JSON.stringify(resultado);
            }
        }
    };
    
    bootbox.confirm(menu_prompt);
}
                
    

/*
    Cria um objeto bitola
*/
function criarBitola(nomeBitola, linhaBitola) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeBitola);
    opcao.value = linhaBitola;
    opcao.appendChild(texto);
    return opcao;
}

var bitolaLista1 = document.getElementById("bitolaLongT"),
    bitolaLista2 = document.getElementById("bitolaEst"),
    acoLista = document.getElementById("steel"),
    concretoLista = document.getElementById("concrete"),
    i;
    
for (i = 0; i < bitola.length; i += 1) {
    bitolaLista1.appendChild(criarBitola(bitola[i].diametro, i));
}
        
for (i = 0; i < bitola.length; i += 1) {
    bitolaLista2.appendChild(criarBitola(bitola[i].diametro, i));
}

var bitolaLista3 = document.getElementById("bitolaLongC"),
    acoLista = document.getElementById("steel"),
    concretoLista = document.getElementById("concrete"),
    w;
    
for (w = 0; w < bitola.length; w += 1) {
    bitolaLista3.appendChild(criarBitola(bitola[w].diametro, w));
}
        
function criarAco(nomeAco, linhaAco) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeAco);
    opcao.value = linhaAco;
    opcao.appendChild(texto);
    return opcao;
}
    
for (i = 0; i < steelProp.length; i += 1) {
    acoLista.appendChild(criarAco(steelProp[i].steelType, i));
}

function criarConcreto(nomeConcreto, linhaConcreto) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeConcreto);
    opcao.value = linhaConcreto;
    opcao.appendChild(texto);
    return opcao;
}
    
for (i = 0; i < concreteProp.length; i += 1) {
    concretoLista.appendChild(criarConcreto(concreteProp[i].concType, i));
}
