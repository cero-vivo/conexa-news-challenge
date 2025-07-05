# React Native Challenge - App de Lectura de Noticias

El objetivo es conseguir una aplicación de lectura de noticias, donde sea posible explorar e interactuar con el contenido navegando entre noticias, usuarios, y permitiendo guardar artículos o marcar usuarios como favoritos. (Opcionalmente, se podrían implementar consultas basadas en esas preferencias).

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


## Descripción general

La aplicación permite al usuario:

- Navegar por un listado de noticias actualizadas en formato de tarjetas.
- Consultar un listado de usuarios de artículos.
- Guardar noticias como favoritas y acceder a ellas posteriormente desde una pantalla dedicada.

## Pantallas principales

1. **Noticias**: Muestra un feed de noticias. Cada noticia se presenta en una tarjeta. Al presionar una tarjeta, se accede al detalle de la noticia.
2. **Usuarios**: Lista de usuarios relacionados a los artículos mostrados. Puede incluir información adicional sobre cada autor.
3. **Noticias guardadas**: Muestra todas las noticias que el usuario haya marcado como favoritas.

## Tecnologías utilizadas

- React Native
- Redux Toolkit
- TypeScript
- React Navigation
- Axios
- API pública de noticias (por ejemplo: NewsAPI, GNews)

## Estructura del proyecto

## Comenzar

1. Instalar dependencias

   ```bash
   npx expo install
   ```

2. Iniciar la aplicación

   ```bash
   npx expo start
   ```
# conexa-news-challenge
