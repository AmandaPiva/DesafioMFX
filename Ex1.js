const { DOMParser } = require("xmldom");

//função que retorna o corpo da requisição em formato XML
function gerarCorpoSoap(number) {
    return `
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
            <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                <ubiNum>${number}</ubiNum>
            </NumberToWords>
            </soap:Body>
        </soap:Envelope>
    `;
}

async function convertNumberToWords(number) {
    if (typeof number !== "number" || number < 0) {
        throw new Error("O número fornecido deve ser um número positivo.");
    }
    const url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso";
    const requestSoap = gerarCorpoSoap(number); //Chamando a função que contém o corpo da mensagem SOAP

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml; charset=utf-8",
                "SOAPAction": "http://www.dataaccess.com/webservicesserver/NumberToWords",
            },
            body: requestSoap,
        })

        if (!response.ok) {
            throw new Error(`Ocorreu um erro ao fazer a requisição SOAP! ${response.status}`);
        }

        const responseSOAP = await response.text();

        //Transformando a resposta da requisição em DOM para acessas seus elementos no XML
        const domParser = new DOMParser();
        const xmlDocument = domParser.parseFromString(responseSOAP, "text/xml");
        const result = xmlDocument.getElementsByTagName("m:NumberToWordsResult")[0].textContent;

        return result;
    } catch (error) {
        console.error("Erro ao chamar o serviço SOAP:", error);
        return null;
    }
}

//Chamando a função
convertNumberToWords(234)
    .then((result) => {
        if (result) {
            console.log("Número escrito por extenso: ", result)
        } else {
            console.log("Não foi possível converter o número.");
        }
    })
    .catch((error) => console.error(error));