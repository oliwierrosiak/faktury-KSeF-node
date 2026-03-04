import { Crypto } from "@peculiar/webcrypto";
import { Application, SignedXml } from "xadesjs";
import { setNodeDependencies } from "xml-core";
import { DOMParser, XMLSerializer } from "xmldom";
import fs from 'fs'

setNodeDependencies({
  DOMParser,
  XMLSerializer,
});

async function sign(xmlString)
{
    const crypto = new Crypto()
    Application.setEngine('NodeJS',crypto)

    const xmlDoc = new DOMParser().parseFromString(xmlString)
    const privateKey = fs.readFileSync(process.env.XML_PRIVATE_KEY_PATH,'utf-8')
    
    const privateKeyBase64 = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");

    const key = await crypto.subtle.importKey("pkcs8",
        Buffer.from(privateKeyBase64,"base64"),
        {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
        },
        false,
        ["sign"]
    );

    const cert = fs.readFileSync(process.env.XML_CERTIFICATE_PATH,'utf-8')

    const certBase64 = cert
    .replace(/-----BEGIN CERTIFICATE-----/, "")
    .replace(/-----END CERTIFICATE-----/, "")
    .replace(/\s+/g, "");

    const signedXml = new SignedXml();

    await signedXml.Sign(
        { name: "RSASSA-PKCS1-v1_5" },
        key,
        xmlDoc,
        {
        references: [
            {
            hash: "SHA-256",
            transforms: ["enveloped"],
            uri:"",
            },
        ],
        signingCertificate: certBase64,
        }
    );

    const resultString = new XMLSerializer().serializeToString(signedXml.GetXml());
    return resultString;
}

export default sign
