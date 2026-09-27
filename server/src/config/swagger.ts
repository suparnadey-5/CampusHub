import path from "path";
import SwaggerParser from "@apidevtools/swagger-parser";

const loadSwaggerSpec = async () => {
  const openApiPath = path.join(
    process.cwd(),
    "src",
    "docs",
    "openapi.yaml"
  );

  const swaggerSpec = await SwaggerParser.dereference(openApiPath);

  return swaggerSpec;
};

export default loadSwaggerSpec;