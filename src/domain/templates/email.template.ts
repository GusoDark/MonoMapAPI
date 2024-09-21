import { envs } from "../../config/envs.plugin";

export function generateCaseEmailTemplate(lat: number, lng: number, genre: string, age: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng)
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #615689;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .content h2 {
            color: #615689;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            font-size: 12px;
            color: #777;
            padding: 10px;
            border-radius: 0 0 8px 8px;
        }
        .map-img{
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
    </style>
    <title>Actualización de Salud: Caso de Viruela del Mono</title>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Noticias de Salud: Caso de Viruela del Mono</h1>
        </div>
        <div class="content">
            <h2>Nuevo caso de viruela del mono</h2>
            <p>Genero del afecado: ${genre}</p>
            <p>Edad de la persona: ${age}</p>
            <p>Latitud: ${lat}</p>
            <p>Longitud: ${lng}</p>
            <img class="map-img" src="${mapboxUrl}"/>
        </div>
    </div>
</body>
</html>
    `;
}

export const generateMapboxStaticImageURL= (lat:number, lng:number) =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${lng},${lat})/${lng},${lat}),14/600x600?access_token=${accessToken}`;
    //En el navegador funciona bien la url
    return mapboxUrl;
}

/**
- MONOMAPAAPI
  - .github/workflows
    - publish.yml
  - node_modules
  - scr
    - config
      - envs.plugin.ts
    - data
      - init.ts
      - models
        - mono.model.ts
    - domain
      - jobs
        - email.jobs.ts
      - services
        - email.template.ts
      - templates
        - email.template.ts
    - presentation
      - controllers
        - cases
          - controller.ts
          - routes.ts
      - routes.ts
    - app.ts
    - .dockerignore/.env/.env.template/ .gitignore/ docker-compose.yaml/ Dockerfile/ package.json/ package-lock.json/ tsconfig.ts
 */