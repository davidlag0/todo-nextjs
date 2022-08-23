// TODO: CSP policy needs to be adjusted because of the below.
import { RedocStandalone } from "redoc";
import openapispec from "../../public/openapi.json";

export default function Docs() {
  return <RedocStandalone spec={openapispec} />;
}
