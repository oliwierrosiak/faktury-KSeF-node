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
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signedXml = new SignedXml();

    signedXml.CanonicalizationMethod = "http://www.w3.org/2001/10/xml-exc-c14n#"

    await signedXml.Sign(
        { name: "RSASSA-PKCS1-v1_5" },
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
            id:'Signature',
            signingCertificate: certPem,
            x509: [certPem],
        }
    );

    const signature = signedXml.GetXml();
    xmlDoc.documentElement.appendChild(signature);

    return new XMLSerializer().serializeToString(xmlDoc);
}

export default sign