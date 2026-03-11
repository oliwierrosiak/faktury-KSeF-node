import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import { SignedXml, Application } from "xadesjs";
import { Crypto } from "@peculiar/webcrypto";
import fs from "fs";
import { setNodeDependencies } from "xml-core";

setNodeDependencies({
  DOMParser,
  XMLSerializer,
});

const crypto = new Crypto();
Application.setEngine("NodeJS", crypto);


async function sign(xmlString) {
    const certPem = fs.readFileSync(process.env.XML_CERTIFICATE_PATH, "utf-8")
    .replace(/-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|\s+/g, "");
    
    const keyPem = fs.readFileSync(process.env.XML_PRIVATE_KEY_PATH, "utf-8")
    .replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s+/g, "");

    const xmlDoc = new DOMParser().parseFromString(xmlString, "application/xml");

    const key = await crypto.subtle.importKey(
        "pkcs8",
        Buffer.from(keyPem, "base64"),
        { 
            name: "ECDSA", 
            namedCurve:"P-256"
        },
        false,
        ["sign"]
    );

    const signedXml = new SignedXml();


    signedXml.CanonicalizationMethod = "http://www.w3.org/2001/10/xml-exc-c14n#"

    const signatureId = "id-" + Math.random().toString(36).substr(2, 9);
    const xadesId = "id-" + Math.random().toString(36).substr(2, 9);


    await signedXml.Sign(
        {
            name: "ECDSA",
            hash:"SHA-256"
        },
        key,
        xmlDoc,
        {
            references: [
                {
                    hash: "SHA-256",
                    transforms: ["enveloped", "exc-c14n"],
                    uri: "",
                }, 
            ],
            id:signatureId,
            signingCertificate: certPem,
            x509: [certPem],
            qualifyingProperties: {
                id: xadesId,
                target: `#${signatureId}`
            }
        }
    );

    const signature = signedXml.GetXml();
    xmlDoc.documentElement.appendChild(signature);

    return new XMLSerializer().serializeToString(xmlDoc);
}

export default sign