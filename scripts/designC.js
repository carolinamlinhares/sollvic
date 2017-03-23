/*jslint devel: true*/
/*global perfis */

// variables
var project, beam, mk, concrete, steel, estribo, bitola;
var tsd, as, bw, bwMin, bwMinNovo, bwMinAbs, fcd;
var betax23, betax34, epc, eps, epyd, fyd, Es, fck, fyk, fckForm, fykForm;
var d, h, cob, diamAgreg, agreg, diamEstForm, diamEst, diamAgregForm, diamLong, diamLongT, diamLongC;
var a, b, c, delta, deltaR, x1, x2;
var x, mk, md;
var x2lim, x3lim, dominio, dl;
var gamac, gamaf, gamas, s;
var situationD, situationLN;
var dlc, xd, m1d, m2d, rtab, elsd, tlsd, asl, as1, as2, ast, situationS, result;
var txCalc, txCalcT, txCalcC, inercia, wo, fctm, fctkSup, mdMin, astMin, astMinAbs, situationArmPele, armPele, situationTxMax, situationCG;
var ac, av, avMin, ah, ahMin, ahT, ahC, ahSugg, ahSuggT, ahSuggC, sPele, resultP, resultTx, resultArmPele, conditionTxFinal, conditionEsp, conditionPele, conditionAh, conditionAv;
var nBarras, nBarrasNovo, nBarrasC, nBarrasT, nBarrasPele, nCamadas, iCamadas, nBmax, nCam1, nCam2, nCam3, nCam4;
var asSugg, asSuggC, asSuggT, avSugg, ahSugg, txCalcSugg, txCalcTSugg, txCalcCSugg, condition;
var arranjos = [];

var bitola = [
    {
        "diametro": 8.0,
        "diametroCM": 0.8,
        "area": 0.502654824574367
    },
    {
        "diametro": 10.0,
        "diametroCM": 1.0,
        "area": 0.785398163397448
    },
    {
        "diametro": 12.5,
        "diametroCM": 1.25,
        "area": 1.22718463030851
    },
    {
        "diametro": 16.0,
        "diametroCM": 1.6,
        "area": 2.01061929829747
    },
    {
        "diametro": 20.0,
        "diametroCM": 2.0,
        "area": 3.80132711084365
    },
    {
        "diametro": 25.0,
        "diametroCM": 2.5,
        "area": 4.90873852123405
    },
    {
        "diametro": 32.0,
        "diametroCM": 3.2,
        "area": 8.04247719318987
    },
    {
        "diametro": 40.0,
        "diametroCM": 4.0,
        "area": 12.5663706143592
    }

];

var estriboProp = [
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
    }
];

var steelProp = [
    /* {
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

var agregProp = [
    {
        "agregType": "Brita 0",
        "diametro": 9.5

    },
    {
        "agregType": "Brita 1",
        "diametro": 19.0

    },
    {
        "agregType": "Brita 2",
        "diametro": 25.0

    },
    {
        "agregType": "Brita 3",
        "diametro": 50.0

    },
    {
        "agregType": "Brita 4",
        "diametro": 76.0

    }

];

function processFormD() {
    "use strict";
    var i, j, k, y, z;

    /* Clean suggestion array */
    arranjos = [];

    // Getting values from HTML form inputs
    project = document.formD.projectD.value;
    /* if (project === "") {
        alert("Por favor preencha o campo Projeto.");
        console.log("Por favor preencha o campo Projeto.");
        return false;
    } */
    if (project === "") {
        project = "Exemplo 1";
    }

    beam = document.formD.beamD.value;
    /* if (beam === "") {
        alert("Por favor preencha o campo Viga.");
        console.log("Por favor preencha o campo Viga.");
        return false;
    } */
    if (beam === "") {
        beam = "V1";
    }

    h = Number(document.formD.hD.value);
    if (document.formD.hD.value === "" || isNaN(h)) {
        alert("Por favor preencha o campo Altura da Viga com números.");
        console.log("Por favor preencha o campo Altura da Viga.");
        return false;
    }

    bw = Number(document.formD.bwD.value);
    if (document.formD.bwD.value === "" || isNaN(bw)) {
        alert("Por favor preencha o campo Largura da Viga com números.");
        console.log("Por favor preencha o campo Largura da Viga.");
        return false;
    }

    mk = Number(document.formD.mD.value);
    if (document.formD.mD.value === "" || isNaN(mk)) {
        alert("Por favor preencha o campo Momento com números.");
        console.log("Por favor preencha o campo Momento.");
        return false;
    }

    concrete = concreteProp[(document.formD.concreteD.value)].concType;
    steel = steelProp[(document.formD.steelD.value)].steelType;
    estribo = estriboProp[(document.formD.estriboD.value)].diametro;
    agreg = agregProp[(document.formD.agregD.value)].agregType;
    gamac = Number(document.formD.gamacD.value);
    gamaf = Number(document.formD.gamafD.value);
    gamas = Number(document.formD.gamasD.value);
    cob = Number(document.formD.cobD.value);
    dl = Number(document.formD.dlD.value);
    dlc = Number(document.formD.dlcD.value);

    // Getting concrete properties
    j = Number(document.getElementById("concrete").value);
    fckForm = concreteProp[j].fckProp;

    // Getting steel properties
    k = Number(document.getElementById("steel").value);
    fykForm = steelProp[k].fy;
    Es = steelProp[k].E;

    //Getting estribo properties
    y = Number(document.getElementById("estribo").value);
    diamEstForm = estriboProp[y].diametro;

    //Getting aggregate properties
    z = Number(document.getElementById("agreg").value);
    diamAgregForm = agregProp[z].diametro;

    //Bw Min
    bwMinAbs = 12;
    if (bw < bwMinAbs) {
        alert("A viga requer base mínima de 12cm. Por favor, aumente sua base.");
        return false;
    }

    // Converting Units 
    fyk = fykForm / 10;
    fck = fckForm / 100;
    diamEst = diamEstForm / 10;
    diamAgreg = diamAgregForm / 10;

    // Calculating parameters
    fcd = fck / gamac;
    fyd = fyk / gamas;
    tsd = fyd;
    epc = 3.5;
    eps = 10.0;

    //CÁLCULO DO MOMENTO FLETOR MAJORADO
    md = mk * gamaf;

    //CÁLCULO DA ALTURA ÚTIL (d)
    d = h - dl;

    // Verificação

    /*if (dl >= cob + diamEst + 0.5 * diamLongT && dlc >= cob + diamEst + 0.5 * diamLongC) {
        situationCG = "Coerente";
    } else {
        situationCG = "Incoerente";
    }*/

    console.log("situationCG = " + situationCG);

    //CÁLCULO DOS LIMITES DOS DOMÍNIOS 2 E 3
    //DOMÍNIO 2
    betax23 = epc / (epc + eps);

    //DOMÍNIO 3
    epyd = (fyd / Es) * 1000;
    betax34 = epc / (epc + epyd);

    //CÁLCULO DA POSIÇÃO DA LINHA NEUTRA (x)
    //md = 0.68*bw*x*fcd*(d-0.4*x);
    //(0.4*x^2)+(d*x)+(md/(0.68*bw*fcd))=0

    a = 0.4;
    b = -1 * d;
    c = md / (0.68 * bw * fcd);
    delta = Math.pow(b, 2) - ((4 * a) * c);

    if (delta > 0) {
        deltaR = Math.sqrt(delta);
        x1 = ((-b + deltaR) / (2 * a));
        x2 = ((-b - deltaR) / (2 * a));
    } else {
        x1 = ("Sem raiz");
        x2 = ("Sem raiz");
    }

    if (x1 > h) {
        x = x2;
    } else {
        x = x1;
    }

    //VERIFICAÇÃO DO DOMÍNIO DA VIGA

    x2lim = betax23 * d;
    x3lim = betax34 * d;

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

    if (x / d <= 0.45) {
        situationLN = "Aprovada";
    } else {
        situationLN = "Reprovada";
    }

    console.log("situationLN = " + situationLN);

    //CÁLCULO DA ÁREA DE AÇO

    /*if (situationCG === "Incoerente") {
        alert("A altura da viga não está coerente com as distâncias ao centro das armaduras, cobrimento e bitolas utilizadas. Por favor, verifique os dados de entrada.");
    } else {*/

    if (situationD === "Aprovado" && situationLN === "Aprovada") {
        situationS = "Simples";
        as = md / (tsd * (d - 0.4 * x));

        //CÁLCULO DA ARMADURA MÍNIMA DE TRAÇÃO
        inercia = (bw * Math.pow(h, 3)) / 12;
        wo = inercia / (h - x);
        fctm = 0.3 * Math.pow(fck, (2 / 3));
        fctkSup = 1.3 * fctm;
        mdMin = 0.8 * wo * fctkSup;
        astMin = mdMin / (tsd * (d - 0.4 * x));
        if (as < astMin) {
            as = astMin;
        }
        resultP = "A viga pode ser simplesmente armada: Área de aço = " + as + "cm²";
        alert(resultP);

    } else {
        situationS = "Dupla";

        //Cálculo da nova posição da LN
        xd = 0.45 * d;

        //Cálculo de M1d
        m1d = 0.68 * bw * xd * fcd * (d - 0.4 * xd);

        //Cálculo de M2d
        m2d = md - m1d;

        //Encontrar valor de tlsd na tabela (!!!!)
        rtab = dlc / d;
        elsd = 3.5 * (1 - (1 / 0.45) * rtab);
        tlsd = (elsd / 10) * (Es / 100);

        if ((rtab) < 0.1838571429) {
            (rtab) = 0.1838571429;
        }

        //Encontrar área de aço comprimida A's
        asl = m2d / (tlsd * (d - dlc));

        //Encontrar área de aço tracionada As
        as1 = m1d / (tsd * (d - 0.4 * xd));
        as2 = m2d / (tsd * (d - dlc));
        ast = as1 + as2;

        //CÁLCULO DA ARMADURA MÍNIMA DE TRAÇÃO
        inercia = (bw * Math.pow(h, 3)) / 12;
        wo = inercia / (h - xd);
        fctm = 0.3 * Math.pow(fck, (2 / 3));
        fctkSup = 1.3 * fctm;
        mdMin = 0.8 * wo * fctkSup;
        astMin = mdMin / (tsd * (d - 0.4 * xd));
        if (ast < astMin) {
            ast = astMin;
        }

        //Resultados
        resultP = "A viga deve ser duplamente armada: Área de aço comprimida = " + asl + "cm². Área de aço tracionada = " + ast + "cm².";
        alert(resultP);

    }

    console.log("situationS = " + situationS);

    //} //NOVO

    //CÁLCULO DA TAXA DE ARMADURA
    ac = bw * h;

    if (situationS === "Simples") {
        txCalc = (as / ac) * 100;
        if ((txCalc >= 0.15) && (txCalc <= 4.0)) {
            resultTx = "OK";
        } else {
            resultTx = "Taxa Simples Reprovada.";
        }
    } else if (situationS === "Dupla") {
        txCalcT = (ast / ac) * 100;
        txCalcC = (asl / ac) * 100;
        txCalc = txCalcT + txCalcC;
        if ((txCalc >= 0.15) && (txCalc <= 4.0)) {
            resultTx = "OK";
        } else {
            resultTx = "Taxa Dupla Reprovada.";
        }
    }
    console.log("resultTx" + resultTx);

    //Arranjos
    switch (situationS) {
        case "Simples":
            for (i = 0; i < bitola.length; i += 1) {
                nBarras = Math.ceil((as - 0.05 * as) / (bitola[i].area)); //Incluindo 5% de tolerância
                console.log("Montagem dos arranjos " + i + "bitola " + bitola[i].diametro);
                console.log("Barras necessarias = " + nBarras);
                asSugg = nBarras * bitola[i].area;
                console.log("asSugg = " + asSugg);
                txCalcSugg = (asSugg / ac) * 100;
                console.log("txCalcSugg = " + txCalcSugg);

                //Verificar taxa max CONDITION
                if ((txCalcSugg >= 0.15) && (txCalcSugg <= 4.0)) {
                    conditionTxFinal = "OK";
                } else {
                    conditionTxFinal = "Reprovado";
                }
                console.log(conditionTxFinal);

                //Espacamentos minimos

                ahMin = Math.max(2, bitola[i].diametroCM, (1.2 * diamAgreg));
                console.log("ahMin " + ahMin);
                avMin = Math.max(2, bitola[i].diametroCM, (0.5 * diamAgreg));
                console.log("avMin " + avMin);

                nBmax = nBarras;
                if (2 * (cob + diamEst) + nBmax * bitola[i].diametroCM + (nBmax - 1) * ahMin > bw) {
                    console.log("Nao cabe em 1 camada");
                    while (2 * (cob + diamEst) + nBmax * bitola[i].diametroCM + (nBmax - 1) * ahMin > bw) {
                        nBmax = nBmax - 1;
                    }
                    nCam1 = nBmax;
                    if (nBarras - nCam1 <= nCam1) {
                        nCamadas = 2;
                        nCam2 = nBarras - nCam1;
                        situationCam = "aprovado";
                    } else if (nBarras - 2 * nCam1 < nCam1) {
                        nCamadas = 3;
                        nCam2 = nCam1;
                        nCam3 = nBarras - nCam1 - nCam2;
                        situationCam = "aprovado";
                    } else if (nBarras - 3 * nCam1 < nCam1) {
                        nCamadas = 4;
                        nCam2 = nCam1;
                        nCam3 = nCam1;
                        nCam4 = nBarras - nCam1 - nCam2 - nCam3;
                        situationCam = "aprovado";
                    } else {
                        situationCam = "reprovado";
                    }
                } else {
                    nCamadas = 1;
                    situationCam = "aprovado";
                }
                console.log("Essa bitola cabe em " + nCamadas + " camadas")
            }

            //Verificação do espaçamento vertical mínimo

            av = h - x - cob - diamEst;

            if ((nCamadas > 1) && (avMin <= ((av - (nCamadas * bitola[i].diametroCM)) / (nCamadas - 1)))) {
                conditionAv = "av OK";
            } else {
                conditionAv = "av insuficiente";
            }
            console.log(conditionAv);

            if (conditionAv === "av OK") {
                ahSugg = ahMin;
                avSugg = avMin;
            }

            if ((conditionTxFinal === "OK") && (conditionAv === "av OK")) {
                arranjos.push({
                    "bitola": bitola[i].diametro,
                    "area": bitola[i].area,
                    "qtd": nBarras,
                    "ncam": nCamadas,
                    "as": asSugg,
                    "taxa": txCalcSugg,
                    "ah": ahSugg,
                    "av": avSugg
                });
            }


    arranjos.sort(function (a, b) {
        return a.ncam - b.ncam;
    });

    result = "Pode ser usada armadura com " + arranjos[0].qtd + "Ø" + arranjos[0].bitola + " em " + arranjos[0].ncam + " camadas. Confira relatório para os detalhes do dimensionamento e outras opções de armaduras.";
    alert(result);
    break;

    case "Dupla":
        for (i = 0; i < bitola.length; i += 1) {
            //diamLongT = bitola[i].diametro;    Precisa definir, sendo que comprimida e tracionada podem ser diferentes!!!
            //diamLongC = bitola[i].diametro;
            nBarrasC = Math.ceil((asl - 0.05 * asl) / (bitola[i].area)); //Incluindo 5% de tolerância
            nBarrasT = Math.ceil((ast - 0.05 * ast) / (bitola[i].area)); //Incluindo 5% de tolerância
            asSuggC = nBarrasC * bitola[i].area;
            asSuggT = nBarrasT * bitola[i].area;
            txCalcTSugg = (asSuggC / ac) * 100;
            txCalcCSugg = (asSuggT / ac) * 100;
            txCalcSugg = txCalcCSugg + txCalcTSugg;
            //Verificar taxa max CONDITION
            if ((txCalcTSugg >= 0.14) && (txCalcSugg <= 0.4)) {
                conditionTxFinal = "OK";
            } else {
                conditionTxFinal = "Reprovado";
            }
            txCalcSugg = txCalcTSugg + txCalcCSugg;

            //Verificar viabilidade espacamento CONDITION
            ahT = (bw - 2 * (cob + diamEst) - (nBarrasT * bitola[i].area)) / (nBarrasT - 1);
            ahC = (bw - 2 * (cob + diamEst) - (nBarrasC * bitola[i].area)) / (nBarrasC - 1);
            if (ahT >= 2 && ahT >= diamLongT && ahT >= 1.2 * diamAgreg && ahC >= 2 && ahC >= diamLongC && ahC >= 1.2 * diamAgreg) {
                conditionEsp = "ah OK";
            } else {
                conditionEsp = "ah insuficiente";
            }

            if (conditionEsp === "ah OK") {
                ahSuggT = Math.min(2, diamLongT, (1.2 * diamAgreg)); //E se der Não OK?????
                ahSuggC = Math.min(2, diamLongC, (1.2 * diamAgreg));
            }

            if ((conditionTxFinal === "OK") && (conditionEsp === "OK")) {
                arranjos.push({
                    "bitola": bitola[i],
                    "area": bitola[i].area,
                    "qtdC": nBarrasC,
                    "qtdT": nBarrasT,
                    "asC": asSuggC,
                    "asT": asSuggT,
                    "taxaC": txCalcCSugg,
                    "taxaT": txCalcTSugg,
                    "espC": ahSuggC,
                    "espT": ahSuggT
                });
            }
        }
        result = "Pode ser usada armadura com " + arranjos[0].qtdC + "Ø" + arranjos[0].bitola + " para a armadura comprimida. E " + arranjos[0].qtdT + "Ø" + arranjos[0].bitola + " para a armadura tracionada. Confira relatório para os detalhes do dimensionamento e outras opções de armaduras.";
        alert(result);
        break;
}


if (h > 60) {
    armPele = 0.001 * bw * h;
    resultArmPele = "É necessário utilizar armadura de pele com " + armPele + "cm² por face";
} else {
    resultArmPele = "Não é necessário utilizar armadura de pele";
}
if (resultArmPele === "É necessário utilizar armadura de pele com " + armPele + "cm² por face") {  alert(resultArmPele);
}

}


/*  
   CRIACAO DE VARIAVEL PARA MANDAR VIA URL PARA RELATORIO
 */

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

var acoLista = document.getElementById("steel"),
    concretoLista = document.getElementById("concrete"),
    estriboLista = document.getElementById("estribo"),
    agregLista = document.getElementById("agreg"),
    i;

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

function criarEstribo(nomeEstribo, linhaEstribo) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeEstribo);
    opcao.value = linhaEstribo;
    opcao.appendChild(texto);
    return opcao;
}

for (i = 0; i < estriboProp.length; i += 1) {
    estriboLista.appendChild(criarEstribo(estriboProp[i].diametro, i));
}

function criarAgreg(nomeAgreg, linhaAgreg) {
    "use strict";
    var opcao = document.createElement("OPTION"),
        texto = document.createTextNode(nomeAgreg);
    opcao.value = linhaAgreg;
    opcao.appendChild(texto);
    return opcao;
}

for (i = 0; i < agregProp.length; i += 1) {
    agregLista.appendChild(criarAgreg(agregProp[i].agregType, i));
}
