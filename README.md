# PROTEXXION ACADEMY

Demo comercial navegable para capacitación en seguridad privada en Chile. Next.js App Router, React, TypeScript, CSS responsive, Lucide y React-PDF/PDF.js. Sin base de datos, autenticación, pagos ni backend de formularios.

## Ejecutar

Requiere Node.js 22 o superior.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para producción:

```sh
npm run lint
npm run build
npm run start
```

## Rutas

- `/`: inicio, propuesta institucional y accesos.
- `/cursos`: catálogo con búsqueda y categorías.
- `/cursos/os10-guardia-seguridad`: detalle y 12 módulos.
- `/empresas`: propuesta corporativa y formulario de demostración.
- `/nosotros`: identidad y metodología.
- `/contacto`: formulario validado, sin envío ni almacenamiento.
- `/acceso`: acceso explícito de demostración, sin contraseña.
- `/aula-virtual`: aula, visor, biblioteca, progreso, certificado demo y ayuda.

## Organización

- `src/app`: rutas, metadata, estilos y fuentes locales.
- `src/components`: navegación, identidad, formularios y componentes comunes.
- `src/sections`: secciones de la página de inicio.
- `src/lms`: interfaz del aula y visor cargado dinámicamente sin SSR.
- `src/data/course.json`: manifiesto real de los 12 PDF, orden, títulos y páginas.
- `src/data/site.ts`: navegación y rutas de fotografías.
- `src/types/course.ts`: Course, CourseModule y ContentItem discriminado por tipo.
- `src/lib/progress.ts`: reglas de avance, normalización y repositorio de persistencia.
- `public/pdfs`: copias idénticas de los documentos originales.
- `public/images`: fotografías y logo optimizados desde los originales.
- `public/pdfjs` y `public/pdf.worker.min.mjs`: recursos locales de PDF.js.
- `tests`: pruebas de navegador con Playwright.
- `recursos`: recursos originales conservados; excluidos del deployment.

## Progreso del aula

El módulo 1 comienza disponible. Las páginas se registran después de renderizarse correctamente en el visor. Al visitar todas las páginas se habilita completar el módulo. Su finalización desbloquea el siguiente; los anteriores permanecen disponibles.

El repositorio local guarda en `protexxion-demo-progress-v1` los módulos completados, módulo actual, módulo desbloqueado, páginas revisadas, última página y porcentaje. El porcentaje representa módulos completados sobre 12. La lectura valida el esquema y recupera un estado seguro si los datos no son válidos. El reinicio requiere confirmación y afecta únicamente esa clave.

El progreso depende del navegador y dispositivo. No se sincroniza entre dispositivos ni entre pestañas abiertas simultáneamente. El bloqueo es una regla de interfaz para la demo, no un control de autorización: los PDF son recursos públicos.

## Extender el contenido

Para agregar otro PDF, copiarlo en `public/pdfs`, verificar su número real de páginas y agregar su definición al manifiesto. Mantener IDs únicos y orden de estudio. Si se modifica este curso, actualizar también el total de módulos y la versión de almacenamiento; la demo actual contiene exactamente los 12 módulos entregados.

`ContentItem` admite `pdf`, `video`, `audio`, `text/html`, `quiz` y `resource`. Para implementar un tipo adicional, añadir su renderizador al aula y definir qué evento de aprendizaje valida su finalización. Los tipos futuros no tienen componentes ficticios en esta fase. Cualquier HTML externo deberá sanitizarse antes de renderizarse.

Para reemplazar localStorage, implementar un repositorio remoto y adaptar la carga/guardado del aula a operaciones asíncronas. Las funciones puras de progreso y el manifiesto no dependen de localStorage. La fase con backend deberá validar autorizaciones y finalizaciones en el servidor, además de gestionar sesiones reales.

Los formularios usan validación HTML nativa, límites de longitud y formato de teléfono. Su handler actual confirma exclusivamente el flujo demo. En la siguiente fase puede reemplazarse por un adaptador API con validación de servidor y estados de envío/error.

## Recursos y mantenimiento

`npm run prepare:assets` regenera las imágenes optimizadas y copia el worker/recursos de la versión instalada de PDF.js. Ejecutarlo tras actualizar react-pdf/pdfjs-dist. Los PDF originales no se modifican. Sus encabezados conservan la denominación presente en los documentos entregados. El certificado es una previsualización sin validez oficial. Las evaluaciones pertenecen al material PDF; no existe motor de calificación en esta fase.

Las fuentes DM Sans y Manrope están alojadas localmente. La aplicación no depende de Google Fonts durante la navegación.

## Verificación

```sh
npx playwright install chromium
npm run build
npm test
```

Playwright inicia un servidor de producción si no existe uno. Comprueba rutas, assets, los 12 PDF, filtros, formularios, anchos de 375 a 1920 px, recorrido completo de las 85 páginas, desbloqueo, persistencia, 100% y reinicio. Las capturas se guardan en `artifacts` y no se publican.

Para comprobar una instalación desplegada, configurar `TEST_BASE_URL` con su URL antes de ejecutar las pruebas.

## Vercel

Producción: https://protexxion-academy-demo.vercel.app

Proyecto: `protexxion-academy-demo`. Deployment mediante `vercel --prod --yes`, con la configuración existente en `.vercel/project.json` (archivo local excluido de Git).

Validación del 21 de septiembre de 2026: lint sin errores, build de producción correcto y las 3 pruebas integrales de Playwright aprobadas. Se verificó también la identidad SHA-256 de los 12 PDF originales y sus copias públicas. Las pruebas incluyen 85 páginas renderizadas, desbloqueo secuencial, persistencia, finalización y reinicio.

Commit de implementación: `b413dfe` — `feat: build premium Protexxion Academy demo and LMS`. El repositorio fue inicializado localmente porque no existía Git previo; no hay remoto configurado.
