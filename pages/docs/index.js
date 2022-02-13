// TODO: CSP policy needs to be adjusted because of the below.
import { RedocStandalone } from "redoc";
import openapispec from "../../public/openapi.yml";

export default function Docs() {
  return <RedocStandalone spec={openapispec} />;
}
