## Mi Aplicación de Tareas (My Todo App)

Esta es una aplicación de gestión de tareas construida con Ionic y Angular. Permite a los usuarios organizar sus actividades diarias a través de una interfaz limpia, rápida y moderna, con la capacidad de crear tareas y agruparlas por categorías.

\[Imagen de la interfaz principal de la aplicación de tareas\]

## ✨ Características Principales

*   **Gestión Completa de Tareas**: Crear, editar, marcar como completadas y eliminar tareas.
*   **Organización por Categorías**: Crear, editar y eliminar categorías para agrupar las tareas.
*   **Filtrado Dinámico**: Filtrar tareas por categoría de forma instantánea.
*   **Interfaz de Usuario Moderna**: Reemplazo de alertas nativas por modales y menús de acción (`ActionSheet`) para una experiencia de usuario superior.
*   **Configuración Remota**: La capacidad de activar o desactivar funciones (como el filtro de categorías) remotamente desde Firebase.
*   **Alto Rendimiento**: Optimizada para manejar grandes cantidades de tareas sin afectar la fluidez de la aplicación.

## 🚀 Tecnologías Utilizadas

*   [**Ionic**](https://ionicframework.com/): Framework principal para el desarrollo de la interfaz de usuario.
*   [**Angular**](https://angular.io/): Framework base para la lógica de la aplicación.
*   [**Capacitor**](https://capacitorjs.com/): Herramienta para compilar la aplicación web en una aplicación nativa para iOS y Android.
*   [**TypeScript**](https://www.typescriptlang.org/): Lenguaje de programación principal.
*   [**RxJS**](https://rxjs.dev/): Para la gestión de estado y programación reactiva.
*   [**Firebase**](https://firebase.google.com/): Utilizado para la configuración remota de funcionalidades.

## 🛠️ Instalación y Ejecución Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el repositorio:**
    
    ```plaintext
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    
    ```
    
2.  **Instalar dependencias:**
    
    ```plaintext
    npm install
    
    ```
    
3.  **Ejecutar la aplicación en el navegador:** El comando `ionic serve` levantará un servidor de desarrollo local.
    
    ```plaintext
    ionic serve
    
    ```
    

## 🌟 Optimizaciones Implementadas

Este proyecto ha sido refactorizado para aplicar las mejores prácticas de rendimiento y mantenibilidad.

### 1\. Gestión de Estado Reactiva con RxJS

El servicio principal (`TaskService.ts`) fue completamente reescrito para usar un patrón reactivo.

*   **Antes**: Los datos se manejaban en arrays privados y se exponían a través de métodos `get...()`, lo que requería recargas manuales de la vista.
*   **Ahora**: Se utilizan `BehaviorSubject` para mantener el estado de las tareas y categorías. Los componentes se suscriben a los observables (`tasks$`, `categories$`) y la interfaz de usuario se actualiza **automáticamente** cuando los datos cambian, eliminando la necesidad de `NgZone` o recargas forzadas.

### 2\. Optimización de Listas con Virtual Scrolling (CDK de Angular)

Para manejar de forma eficiente listas con cientos o miles de tareas, se implementó el Virtual Scrolling del CDK de Angular.

*   **Antes**: Se usaba `*ngFor`, que renderizaba un elemento del DOM para cada tarea, causando problemas de rendimiento con listas grandes.
*   **Ahora**: Se utiliza `<cdk-virtual-scroll-viewport>` y `*cdkVirtualFor`. Esto renderiza únicamente los elementos visibles en la pantalla, reciclando los nodos del DOM a medida que el usuario se desplaza, lo que resulta en un rendimiento excelente y un bajo consumo de memoria.

### 3\. Mejora de la Experiencia de Usuario (UI/UX)

Se reemplazaron las alertas nativas (`AlertController`) por componentes de Ionic más modernos y visualmente atractivos.

*   **Creación y Edición**: Se utilizan modales (`<ion-modal>`) para los formularios de añadir/editar tareas y categorías, ofreciendo más espacio y una mejor experiencia.
*   **Confirmaciones y Opciones**: Se usa el componente `ActionSheetController` para las acciones de eliminar y para mostrar menús de opciones, siguiendo los patrones de diseño nativos de iOS y Android.

### 4\. Configuración Remota Reactiva con Firebase

El servicio `RemoteConfigService.ts` fue refactorizado para reaccionar a cambios en tiempo real desde la consola de Firebase.

*   **Antes**: La configuración se cargaba una vez al inicio y se mantenía en caché.
*   **Ahora**: Se utiliza la función `onConfigUpdated` de Firebase para crear un "escuchador" en tiempo real. Combinado con un `BehaviorSubject`, cualquier cambio en una bandera de configuración en la consola de Firebase se propaga automáticamente a toda la aplicación, permitiendo activar o desactivar funcionalidades al instante.

## 📱 Compilación para Plataformas Nativas

### Android (APK)

1.  Añadir la plataforma de Android: `ionic cap add android`
2.  Sincronizar los cambios: `ionic cap sync`
3.  Abrir el proyecto en Android Studio: `ionic cap open android`
4.  Generar el APK firmado desde Android Studio.

### iOS (IPA)

La compilación para iOS requiere obligatoriamente un Mac con Xcode y una cuenta del Apple Developer Program ($99/año).

**Alternativa para usuarios de Windows/Linux:** Se puede utilizar un servicio de compilación en la nube como [**Ionic Appflow**](https://ionic.io/appflow). Este servicio compila el código en un Mac virtual y genera el archivo `.ipa` sin necesidad de tener un Mac físico.
