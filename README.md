# Simulador Cuna Mas: PEI, POI y contrataciones publicas

Aplicacion web educativa para practicar la articulacion entre OEI, AEI, actividades operativas, insumos y estrategia de contratacion publica en el caso del Programa Nacional Cuna Mas, articulado al PEI 2024-2030 del MIDIS y al POI del Pliego MIDIS.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Luego abre la URL local que muestre Vite, normalmente `http://localhost:5173`.

## Compilar

```bash
npm run build
```

## Estructura principal

- `src/data/cunamasCase.ts`: data embebida del caso.
- `src/utils/scoring.ts`: validacion exacta y calculo de puntaje.
- `src/App.tsx`: flujo del simulador y componentes de etapa.
- `src/styles.css`: estilos visuales institucionales.

El avance se guarda automaticamente en `localStorage`. Usa el boton `Reiniciar simulacion` para borrar el progreso local.
