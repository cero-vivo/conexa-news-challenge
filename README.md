# React Native Challenge - App de Lectura de Noticias

> ### 📌 Nota importante
>Esta aplicación la he tomado como un desafío y una oportunidad para poner a prueba el desarrollo con IA sujeta a mis conocimientos.
>
>TODO lo que aquí está implementado ha sido estricta y celosamente pulido por mí, Luis Espinoza.
>
>He desarrollado con IA de manera exhaustiva y meticulosa, con el objetivo de plasmar mis conocimientos sin perder el control ni la comprensión del código base.
>
>Dicho esto, manifiesto mi convicción en abrazar estas herramientas en el desarrollo de software.
>
> En apenas **15 horas** logré un prototipo completo que incluye:
> - **Expo Router**
> - Feed con *scroll* infinito (paginado)
> - Arquitectura limpia + custom hooks
> - Modo *debug*
> - Multilenguaje (*i18n*)
> - Temas claro / oscuro
> - Notificaciones *push*
> - Autenticación *dummy*
> - Onboarding
> - Animaciones en la navegación (News Feed)
> - Persistencia local de datos
> - Estado global (Redux)
> - Pruebas unitarias (Jest)
> …y muchos otros detalles que reflejan una aplicación de **alta calidad**.

El objetivo es conseguir una aplicación de lectura de noticias, donde sea posible explorar e interactuar con el contenido navegando entre noticias, usuarios, y permitiendo guardar artículos o marcar usuarios como favoritos. (Opcionalmente, se podrían implementar consultas basadas en esas preferencias).

La aplicación permite al usuario:

- Navegar por un listado de noticias actualizadas en formato de tarjetas.
- Consultar un listado de usuarios de artículos.
- Guardar noticias como favoritas y acceder a ellas posteriormente desde una pantalla dedicada.

## Pantallas principales

1. **Noticias**: Muestra un feed de noticias. Cada noticia se presenta en una tarjeta. Al presionar una tarjeta, se accede al detalle de la noticia.
2. **Usuarios**: Lista de usuarios relacionados a los artículos mostrados. Puede incluir información adicional sobre cada autor.
3. **Noticias guardadas**: Muestra todas las noticias que el usuario haya marcado como favoritas.

## Tecnologías principales utilizadas

- React Native
- Redux Toolkit
- TypeScript
- Axios
- API Jsonplaceholder
- AsyncStorage
- Expo

## Arquitectura

Utilizo una **Clean Architecture** adaptada a React Native, esto lo hago manteniendo las clasicas capas de entidades, use cases e infrastructura y, agrego una capa extra "Presenter" para manejar los eventos que se comuniquen con el modelo.

- **Model**: Contiene entidades, casos de uso (actions), interfaces de servicios (gateways) y contratos de presentación.
- **Infrastructure**: Implementa los gateways definidos en el dominio. Puede conectarse a servicios externos o ser mockeada para testing.
- **View**: Implementa los presenters, captura eventos de la UI y muestra datos ya estructurados. Las pantallas (`screens`) están enfocadas solo en la representación visual.

- Model  
   1. **Entities**: Interfaces que definen los objetos centrales del universo (por ejemplo, Noticia, Autor).  
   2. **Actions**: Interfaces que describen las operaciones permitidas sobre las entidades (use cases).  
   3. **Gateways**: Interfaces tipo servicios, puertos de obtención y envío de datos. Intercambiables.  
   4. **Presenters**: Interfaces que se diseñan para que los componentes se comuniquen con el modelo.  

- Infrastructure  
   1. **Gateways**: Se hace una implementación para el servicio o repositorio externo que se quiera usar. (Se puede mockear fácilmente).  

- View  
   1. **Presenter**: Se implementan los presenters definidos; un evento se procesa y el presenter se encargará de enviar una respuesta, canal de la UI con el modelo.
   2. **Screens**: Aquí dentro hay archivos `.tsx`, lo que haga falta para las screens concretas.

## Patrón de Diseño: Custom Hooks (Contenedor / Vista)

ada pantalla sigue un patrón **Contenedor – Vista** inspirado en las Clean Architecture y el enfoque Hooks First de React:

1. **Custom Hook** (`use<ScreenName>Screen`) → Contiene toda la lógica de negocio, manejo de estado, llamadas a gateways, side-effects y navegación.
2. **Componente de Vista** (`<ScreenName>Screen.tsx`) → Consume el hook anterior y se limita a renderizar la UI con los datos y callbacks que éste expone.

Esto aporta:

• Reutilización y testeo: la lógica queda desacoplada de React Native y puede probarse como función pura.  
• Responsabilidad única: el componente visual sólo se enfoca en layout/estilos, sin efectos ni estados complejos.  
• Escalabilidad: nuevos requerimientos se incorporan en el hook sin contaminar la vista.

Ejemplo simplificado:

```tsx
// view/hooks/useNewsFeedScreen.ts
export function useNewsFeedScreen() {
  const { data, loading } = useGetNews();
  const onRefresh = () => refetch();
  return { data, loading, onRefresh };
}

// view/screens/NewsFeedScreen.tsx
export default function NewsFeedScreen() {
  const { data, loading, onRefresh } = useNewsFeedScreen();
  return <NewsFeedView data={data} loading={loading} onRefresh={onRefresh} />;
}
```

Con esto mantenemos una clara separación de preocupaciones y adherimos al principio de inversión de dependencias.

## Estructura del proyecto

```text
conexa-rn-test/
├── app/          # Entradas de ruta (pantallas) gestionadas por Expo Router
├── features/     # Cada módulo de negocio (auth, news, users, etc.) con su dominio, infraestructura y vista
├── components/   # Componentes UI reutilizables y agnósticos de negocio
├── hooks/        # Hooks globales (temas, galería, etc.)
├── store/        # Configuración y slices globales de Redux
├── constants/    # Configuraciones compartidas (colores, rutas, i18n…)
├── __test__/     # Tests unitarios agrupados por feature
├── assets/       # Imágenes, íconos y fuentes
```

La estructura favorece la separación de dominios y la escalabilidad sin acoplar código entre features.

## Comenzar

1. Instalar dependencias

   ```bash
   npx expo install
   ```

2. Iniciar la aplicación

   ```bash
   npx expo start
   ```

## Cómo ejecutar los tests

Los tests unitarios están escritos con **Jest** en `__test__/features/<feature>` siguiendo el patrón de gateways mockeables.
  
1. Instala dependencias (si no lo hiciste):

```bash
npm install
```

2. Ejecuta todos los tests:

```bash
npm test
```
