function enviarPregunta() {
    const preguntaInput = document.getElementById('pregunta');
    const respuestaParrafo = document.getElementById('respuesta');
    const sugerenciasContainer = document.getElementById('sugerencias');

    // Obtener la pregunta del usuario
    const pregunta = preguntaInput.value.toLowerCase();

    // Definir respuestas del chatbot
    const respuestas = {
      'hola': '¡Hola! ¿En qué puedo ayudarte?',
      '¿cómo estás?': 'Estoy bien, gracias por preguntar. ¿Y tú?',
      '¿cuáles son los servicios disponibles?': 'Ofrecemos servicios de enfermería y alquiler de oxígeno. ¿En qué servicio estás interesado?',
      'explícame el proceso de pago': 'El proceso de pago es sencillo. Al seleccionar un servicio, serás redirigido a nuestra pasarela de pago segura, una vez enviado los datos y realizado el pago un agente se contactara contigo, contaras con un maximo de 30 minutos para cancelar el servicio de lo contrario obtendras una multa del 50%',
      '¿cuánto tiempo tarda el servicio?': 'El tiempo de servicio depende del tipo que elijas. Por ejemplo, el servicio de enfermería puede tardar entre 2 y 3 horas,',
      '¿hay descuentos disponibles?': 'Sí, ofrecemos descuentos en paquetes de servicios. ¿Te gustaría conocer las ofertas actuales?',
      '¿cómo puedo contactar al servicio de atención al cliente?': 'Puedes contactar a nuestro servicio de atención al cliente donde puedes tambien recibir informacion sobre servicio de ambulancia llamando al 123-456-789 o enviando un correo a atencion@enfermeria.com.',
      'más opciones...': '¡Claro! ¿Qué más te gustaría saber?',
    };

    // Verificar si hay una respuesta predefinida para la pregunta
    if (respuestas.hasOwnProperty(pregunta)) {
        // Mostrar la respuesta en el elemento HTML
        respuestaParrafo.textContent = respuestas[pregunta];
    } else {
        // Si no hay una respuesta predefinida, verificar si es un saludo genérico
        if (pregunta.includes('hola')) {
            respuestaParrafo.textContent = '¡Hola! ¿En qué puedo ayudarte?';
        } else {
            // Si no hay una respuesta predefinida ni es un saludo, mostrar un mensaje genérico
            respuestaParrafo.textContent = 'Lo siento, no entendí la pregunta. ¿Puedes ser más específico?';
        }

        // Mostrar sugerencias de preguntas
        mostrarSugerencias();
    }

    // Limpiar el campo de entrada después de enviar la pregunta
    preguntaInput.value = '';
}

function mostrarSugerencias() {
    const sugerenciasContainer = document.getElementById('sugerencias');

    // Lista de sugerencias de preguntas
    const sugerencias = ['¿Cuáles son los servicios disponibles?', 'Explícame el proceso de pago', '¿Cuánto tiempo tarda el servicio?', '¿Hay descuentos disponibles?', 'Más opciones...'];

    // Limpiar sugerencias anteriores
    sugerenciasContainer.innerHTML = '';

    // Mostrar cada sugerencia como un botón
    sugerencias.forEach(sugerencia => {
        const sugerenciaBtn = document.createElement('button');
        sugerenciaBtn.textContent = sugerencia;
        sugerenciaBtn.addEventListener('click', function () {
            // Al hacer clic en una sugerencia, la pregunta se llena automáticamente
            document.getElementById('pregunta').value = sugerencia;
            // Se envía automáticamente la pregunta
            enviarPregunta();
        });
        sugerenciasContainer.appendChild(sugerenciaBtn);
    });
}

// Resto del código...


// Función para actualizar las opciones de fecha y hora según el servicio seleccionado
function updateDateTimeOptions(serviceType) {
    const dateTimeSelect = document.getElementById(`${serviceType}DateTime`);
    dateTimeSelect.innerHTML = ''; // Limpiar las opciones existentes

    const selectedService = document.getElementById(`${serviceType}Service`).value;

    switch (selectedService) {
        case '6horas':
            addTimeOptions(dateTimeSelect, ['7:00 AM - 2:00 PM', '9:00 AM - 4:00 PM', '11:00 AM - 6:00 PM', '1:00 PM - 8:00 PM']);
            break;
        case '12horas':
            addTimeOptions(dateTimeSelect, ['6:00 AM - 6:00 PM', '8:00 AM - 8:00 PM', '6:00 PM - 6:00 AM', '8:00 PM - 8:00 AM']);
            break;
        case '24horas':
            addTimeOptions(dateTimeSelect, ['6:00 AM - 6:00 AM', '8:00 PM - 8:00 PM']);
            break;
        default:
            break;
    }
}

// Función para agregar opciones de tiempo a un elemento select
function addTimeOptions(select, times) {
    for (const time of times) {
        addTimeOption(select, time);
    }
}

// Función para agregar una opción de tiempo a un elemento select
function addTimeOption(select, time) {
    const option = document.createElement('option');
    option.text = time;
    select.add(option);
}

// Función para actualizar el precio y las opciones de fecha y hora para el alquiler de oxígeno
function updateOxigenoOptions() {
    const oxigenoService = document.getElementById('oxigenoService').value;
    const oxigenoPriceDiv = document.getElementById('oxigenoPrice');
    const oxigenoDateTimeSelect = document.getElementById('oxigenoDateTime');

    // Lógica para actualizar el precio según la opción seleccionada
    const price = getPriceForOxigenoService(oxigenoService);

    // Actualizar el elemento HTML que muestra el precio
    oxigenoPriceDiv.innerHTML = `Precio: $${price}`;

    // Lógica para actualizar las opciones de fecha y hora
    updateDateTimeOptions('oxigeno');
}

// Función para obtener el precio para el servicio de oxígeno
function getPriceForOxigenoService(service) {
    switch (service) {
        case '1semana':
            return 300000; // Precio para 1 semana (ejemplo)
        case '1mes':
            return 1000000; // Precio para 1 mes (ejemplo)
        default:
            return 0; // Precio predeterminado si no se selecciona ninguna opción
    }
}

// Función para manejar el envío del formulario de alquiler de oxígeno
function submitOxigenoForm(event) {
    event.preventDefault();

    // Obtener datos del formulario de alquiler de oxígeno
    const oxigenoService = document.getElementById('oxigenoService').value;
    const oxigenoDateTime = document.getElementById('oxigenoDateTime').value;

    // Realizar las acciones necesarias con los datos
    alert(`Datos de alquiler de oxígeno:\n\nServicio: ${oxigenoService}\nFecha y Hora: ${oxigenoDateTime}`);

    // Puedes agregar más lógica aquí, como enviar los datos a un servidor o redirigir a otra página
}

// Agregar evento de cambio para el servicio de alquiler de oxígeno
document.getElementById('oxigenoService').addEventListener('change', updateOxigenoOptions);

// Llamar a la función updateOxigenoOptions al cargar la página para configurar las opciones iniciales
document.addEventListener('DOMContentLoaded', updateOxigenoOptions);

// Resto del código...

// Función para actualizar el precio según el servicio seleccionado
function updatePrice(serviceType) {
    const serviceSelect = document.getElementById(`${serviceType}Service`);
    const priceDisplay = document.getElementById(`${serviceType}Price`);

    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex].value;
    const pricePerHour = getPricePerHourForService(selectedOption);

    priceDisplay.textContent = `Precio por horas: $${pricePerHour}`;
}

// Función para manejar el envío del formulario de servicio de enfermería
function submitEnfermeriaForm(event) {
    event.preventDefault();
    proceedToPayment('enfermeria');
}

// Función para manejar el envío del formulario de servicio de oxígeno
function submitOxigenoForm(event) {
    event.preventDefault();
    proceedToPayment('oxigeno');
}

// Función para redirigir a la pasarela de pago según el servicio y el precio total
function proceedToPayment(serviceType) {
    const priceDisplay = document.getElementById(`${serviceType}Price`);
    const selectedDateTime = document.getElementById(`${serviceType}DateTime`).value;

    // Obtén el precio por hora
    const pricePerHour = getPricePerHourForService(document.getElementById(`${serviceType}Service`).value);

    // Calcula el precio total basado en el tiempo seleccionado
    const selectedHours = getSelectedHours(selectedDateTime);
    const totalPrice = selectedHours * pricePerHour;

    // Crear el botón de pasarela de pago
    const paymentButton = document.createElement('button');
    paymentButton.textContent = 'Ir a Pasarela de Pago';
    paymentButton.addEventListener('click', () => redirectToPayment(serviceType, totalPrice));

    // Agregar el botón al DOM (puedes personalizar según tu estructura HTML)
    priceDisplay.appendChild(paymentButton);

    // Alerta para demostración (puedes eliminar esto en tu implementación real)
    alert(`¡Precio total calculado: $${totalPrice.toFixed(2)}`);
}

// Función para redirigir a la pasarela de pago según el servicio y el precio total
function redirectToPayment(serviceType, totalPrice) {
    // Puedes realizar lógica específica para cada tipo de servicio si es necesario
    alert(`Redirigiendo a la Pasarela de Pago para ${serviceType} con un precio total de $${totalPrice.toFixed(2)} (simulado).`);
    // Aquí deberías redirigir a tu pasarela de pago real
}

// Función para obtener el precio por hora para el servicio de enfermería
function getPricePerHourForService(service) {
    switch (service) {
        case '6horas':
            return 100000; // Precio por hora para Servicio de Enfermería 8 horas
        case '12horas':
            return 135000; // Precio por hora para Servicio de Enfermería 12 horas
        case '24horas':
            return 260000; // Precio por hora para Servicio de Enfermería 24 horas
        default:
            return 0; // Ninguno
    }
}

// ... (código posterior)
// ... (código anterior)

// Función para redirigir a la pasarela de pago según el servicio y el precio total
function redirectToPayment(serviceType, totalPrice) {
    // Puedes realizar lógica específica para cada tipo de servicio si es necesario
    alert(`Redirigiendo a la Pasarela de Pago para ${serviceType} con un precio total de $${totalPrice.toFixed(2)} (simulado).`);

    // Simulación de redirección a la pasarela de pago (puedes personalizar según tu implementación real)
    window.location.href = 'https://ejemplo.com/pasarela-de-pago'; // Reemplaza con la URL real de tu pasarela de pago
}

// ... (código posterior)
// ... (código anterior)

// ... (código anterior)

// Función para manejar el envío del formulario de datos personales
function submitForm(event) {
    event.preventDefault();

    // Obtener datos del formulario de datos personales
    const patientName = document.getElementById('patientName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const admissionReason = document.getElementById('admissionReason').value;
    const patientDateOfBirth = document.getElementById('patientDateOfBirth').value;

    // Construir el enlace mailto con datos prellenados en el cuerpo del correo
    const mailtoLink = `mailto:enfermeria24horaszip@gmail.com?subject=Datos%20Personales&body=Nombres%20y%20Apellidos:%20${patientName}%0ATeléfono:%20${phone}%0ACorreo:%20${email}%0AUbicación:%20${location}%0AMotivo%20de%20Ingreso:%20${admissionReason}%0AFecha%20del%20Servicio:%20${patientDateOfBirth}`;

    // Abrir el cliente de correo predeterminado con el enlace mailto
    window.location.href = mailtoLink;
}

// ... (código posterior)
// Crear un objeto para almacenar las respuestas
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('#sideGallery img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox img');
    const closeBtn = document.createElement('div');

    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;'; // Símbolo de "x" para cerrar la lightbox
    lightbox.appendChild(closeBtn);

    images.forEach(function (image) {
        image.addEventListener('click', function () {
            // Muestra la lightbox al hacer clic en una imagen
            lightboxImage.src = this.src;
            lightbox.style.display = 'flex';
        });
    });

    // Cierra la lightbox al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    // Cierra la lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (event) {
        if (event.target === this) {
            lightbox.style.display = 'none';
        }
    });
});
