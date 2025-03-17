## **HERRAMIENTAS UTILIZADAS:**

TypeScript, Angular y Angular Material.

## **JUSTIFICACIÓN DEL STACK TECNOLÓGICO Y PATRONES DE DISEÑO:**

Para el desarrollo del frontend, se ha optado por un stack tecnológico basado en TypeScript, Angular y Angular Material. Al utilizar TypeScript, mejora la calidad del código proporcionando detección temprana de errores y facilitando el mantenimiento. Angular garantiza modularización y un enfoque estructurado. Al implementar Angular Material se tiene acceso a componentes preconstruídos que le dan un aspecto profesional y consistente a la aplicación, lo que permite ahorrar tiempo en el desarrollo del UI/UX. 

Al diseñar la estructura del proyecto se tiene en cuenta el principio Separation of Concerns (SoC), cada responsabilidad está separada en módulos específicos (components, services, directives, models). Además, se aplica una arquitectura basada en componentes (add-task, list-task, edit-task, modal), esto garantiza la independencia entre componentes y su posible reutilización. También se implementa el patrón de diseño Dependency Injection (DI), reflejado en la utilización de servicios (task.service.ts y priority.service.ts), que manejan de forma independiente la lógica del negocio y las solicitudes al backend. Finalmente, se trabaja con el modelo MVC adaptado a Angular; los modelos(Task y Priority) definen la estructura de los datos, las vistas serían los archivos .html(components) y los controladores estarían representados por los archivos .ts(components).

## **INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN EN LOCAL:**

1. Dentro de la carpeta "ToDo" (que se sugirió crear en el README.md de intrucciones del backend) ejecutar el comando: **git clone https://github.com/AlenOviedo92/ToDo_list.git**
2. Ingresar al directorio clonado: **cd ToDo_list**
3. Instalar las dependencias: **npm install**
4. Levantar el servidor, ejecutando el comando: **ng serve -o**

## **FUNCIONALIDADES DE LA APLICACIÓN**

La aplicación cuenta con 3 vistas:

1. **Lista de tareas:** En esta vista es posible visualizar una tabla que contiene las tareas creadas por el usuario. La tabla cuenta con 8 columnas:
    1. Check: Marca una tarea como "completada" o "pendiente".
    2. No: Indica el número de tareas en la aplicación.
    3. Tarea: El título de la tarea.
    4. Prioridad: Indica la prioridad de la tarea.
    5. Descripción: Descripción detallada de la tarea.
    6. Fecha de vencimiento: Fecha de vencimiento de la tarea.
    7. Recurrente: Indica si la tarea es recurrente o no.
    8. Acciones: Contiene dos botones, para eliminar o actualizar una tarea.

    La tabla tiene integrado un paginador en la parte inferior con las opciones 5, 10 o 20 ítems por página. Además cuenta con un filtro en la parte superiror, que muestra todas las tareas, las tareas pendientes y las tareas completadas.

2. **Formulario de creación:** Contiene los siguientes inputs:

    1. Título: Título o nombre de la tarea. Cuenta con tres validaciones: debe ser obligatorio, contener máximo 20 caracteres y no se admiten números ni caracteres especiales.
    2. Fecha: Fecha de vencimiento de la tarea. Cuenta con dos validaciones: debe ser obligatoria y tener el formato correcto.
    3. Prioridad: Prioridad de la tarea. Cuenta con una validación: debe ser obligatoria.
    4. Descripción: Descripción de la tarea(opcional).
    5. Tarea recurrente: Marca la tarea como recurrente o no(opcional).

    NOTA: El botón "Enviar" se activa, cuando los 3 inputs obligatorios están diligenciados y pasan las validaciones mencionadas anteriormente.

3. **Formulario de actualización:** Contiene los mismos inputs y validaciones que el formulario de creación.

## **DESPLIEGUE**

1. **Base de datos:** Se utiliza neon.tech porque está diseñado específicamente para PostgreSQL en la nube, lo que permite escalar sin esfuerzo.
2. **Backend:** Se utiliza Render porque cuenta con despliegue automático desde GitHub y tiene soporte para Node.js y PostgreSQL.
1. **Frontend:** Se utiliza Vercel porque es especializado en Frontend y Frameworks Modernos, además, tiene un despliegue automático y rápido:

link backend: 
https://todo-backend-g7f1.onrender.com

link frontend: 
https://to-do-list-orcin-nine.vercel.app
   

