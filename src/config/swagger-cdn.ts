/**
 * Pin to the same line as `swagger-ui-dist` shipped with `@nestjs/swagger`
 * so behaviour matches the built-in UI.
 */
export const SWAGGER_UI_CDN_VERSION = '5.32.4';

export function getSwaggerUiShellHtml(openApiJsonPath = '/api-json'): string {
  const cdn = `https://unpkg.com/swagger-ui-dist@${SWAGGER_UI_CDN_VERSION}`;
  const specUrl = JSON.stringify(openApiJsonPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DT Money API – Swagger</title>
  <link rel="stylesheet" href="${cdn}/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="${cdn}/swagger-ui-bundle.js" crossorigin></script>
  <script src="${cdn}/swagger-ui-standalone-preset.js" crossorigin></script>
  <script>
    window.onload = function () {
      SwaggerUIBundle({
        url: ${specUrl},
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: 'StandaloneLayout'
      });
    };
  </script>
</body>
</html>`;
}
