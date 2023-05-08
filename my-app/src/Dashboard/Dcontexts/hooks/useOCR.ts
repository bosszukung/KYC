import {AzureKeyCredential, DocumentAnalysisClient, AnalyzeResult, DocumentObjectField} from '@azure/ai-form-recognizer'
import { Error } from "../../../unities";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        FR_KEY: string;
        FR_ENDPOINT: string;
      }
    }
  }  
  const key: any = process.env["1f8a4e8629014b179844b91df2886c2f"];
const endpoint: any = process.env["https://ocrforkyc.cognitiveservices.azure.com/"];

export async function UseOCR(documentUrl: string, inputName: string): Promise<boolean> {
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-idDocument", documentUrl);
  const result: AnalyzeResult = await poller.pollUntilDone();

  if (result && result.documents && result.documents.length > 0) {
    const analyzedDocument = result.documents[0];
    if (analyzedDocument.docType === "idDocument.driverLicense") {
      const { FirstName, LastName } = analyzedDocument.fields;
      const extractedName = `${FirstName?.content ?? ''} ${LastName?.content ?? ''}`.trim();
      return extractedName === inputName;
    } else if (analyzedDocument.docType === "idDocument.passport") {
      if (!analyzedDocument.fields.machineReadableZone) {
        throw Error("No Machine Readable Zone extracted from passport.");
      }
      const machineReadableZone = analyzedDocument.fields.machineReadableZone as DocumentObjectField;
      const { FirstName, LastName } = machineReadableZone.properties;
      const extractedName = `${FirstName?.content ?? ''} ${LastName?.content ?? ''}`.trim();
      return extractedName === inputName;
    } else {
      console.error("Unknown document type in result:", analyzedDocument);
    }
  } else {
    throw Error("Expected at least one document in the result.");
  }
  return false;
}
