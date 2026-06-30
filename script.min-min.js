const scrollBtn = document.getElementById("scrollTopBtn");

function toggleScrollButton() {
    if (scrollBtn) {
        window.scrollY > 300 ? scrollBtn.classList.add("show") : scrollBtn.classList.remove("show");
    }
}

function speak(e, t = "es-ES") {
    if ("speechSynthesis" in window) {
        try {
            const n = new SpeechSynthesisUtterance(e);
            n.lang = t;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(n);
        } catch (error) {}
    }
}

window.addEventListener("scroll", toggleScrollButton);
window.addEventListener("load", toggleScrollButton);

if (scrollBtn) {
    scrollBtn.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    });
}

const otraCheck = document.getElementById("otraCantidadCheck");
if (otraCheck) {
    otraCheck.addEventListener("change", function() {
        this.checked 
            ? speak("Otras cantidad habilitada. Ahora puedes introducir el importe deseado.") 
            : speak("Otras cantidad deshabilitada. Selecciona una cantidad fija si lo deseas.");
    });
}

const footerNewsletter = document.querySelector("form.newsletter-group");
if (footerNewsletter) {
    footerNewsletter.addEventListener("submit", function(e) {
        e.preventDefault();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".view-details");
    const modalElement = document.getElementById("descriptionModal");
    const modalTitle = document.getElementById("modalProductLabel");
    const descriptionContainer = document.getElementById("descriptionProduct");

    if (!modalElement || !descriptionContainer) return;

    const modal = new bootstrap.Modal(modalElement);

    const productosInfo = {
        "detalle1": {
            titulo: "🌱 Proyecto 1: Reforestación de Bambú",
            objetivo: "Restaurar 50 hectáreas de bosque de bambú en el Himalaya oriental.",
            acciones: "Plantación de 10,000 brotes de bambú nativo.",
            beneficio: "Asegura la fuente de alimentación del panda rojo.",
            impacto: "Beneficia a más de 30 especies de fauna local.",
            meta: "30% de la superficie reforestada.",
            imagen: "LIST_panda-rojo-min.webp"
        },
        "detalle2": {
            titulo: "📡 Proyecto 2: Monitoreo con GPS",
            objetivo: "Establecer mapas dinámicos de los desplazamientos de las poblaciones en peligro.",
            acciones: "Colocación de 15 collares satelitales GPS y despliegue de cámaras trampa.",
            beneficio: "Identificación precisa de corredores biológicos críticos y zonas de riesgo.",
            impacto: "Optimización del 100% de los recursos de patrullaje contra el furtivismo.",
            meta: "80% del área crítica mapeada bajo control continuo.",
            imagen: "curious-red-panda-stockcake.webp"
        },
        "detalle3": {
            titulo: "👥 Proyecto 3: Educación Ambiental",
            objetivo: "Reducir la presión y tala doméstica en los linderos del hábitat protegido.",
            acciones: "Talleres presenciales educativos y entrega de cocinas eco-eficientes.",
            beneficio: "Sensibilización y coexistencia pacífica entre comunidades y fauna.",
            impacto: "Disminución directa de conflictos incidentales humanos-animales.",
            meta: "25 comunidades de alta montaña completamente integradas.",
            imagen: "istockphoto-1584388277-612x612.webp"
        }
    };

    function mostrarDescripcion(productId) {
        const producto = productosInfo[productId];

        if (producto) {
            modalTitle.innerHTML = producto.titulo;

            descriptionContainer.innerHTML = `
                <div class="mb-3">
                    <img src="${producto.imagen}" class="img-fluid rounded shadow-sm mb-3" style="max-height: 260px; width: 100%; object-fit: cover;" alt="${producto.titulo}">
                    
                    <p class="text-dark mb-3"><strong>Objetivo:</strong> ${producto.objetivo}</p>
                    
                    <ul class="text-dark ps-3 mb-3" style="list-style-type: disc;">
                        <li class="mb-1"><strong>Acciones:</strong> ${producto.acciones}</li>
                        <li class="mb-1"><strong>Beneficio:</strong> ${producto.beneficio}</li>
                        <li class="mb-1"><strong>Impacto:</strong> ${producto.impacto}</li>
                    </ul>
                    
                    <div class="alert alert-success d-flex align-items-center py-2 px-3 border-0" style="background-color: #d1e7dd; color: #0f5132; font-size: 0.95rem;">
                        <i class="fa-solid fa-circle-check me-2" aria-hidden="true"></i>
                        <span><strong>Meta 2026:</strong> ${producto.meta}</span>
                    </div>
                </div>
            `;
        } else {
            descriptionContainer.innerHTML = `
                <div class="alert alert-warning">
                    Detalles del proyecto no encontrados.
                </div>
            `;
        }

        modal.show();
    }

    botones.forEach(boton => {
        boton.addEventListener("click", function (e) {
            e.preventDefault();
            const productId = this.getAttribute("data-product");
            if (productId) {
                mostrarDescripcion(productId);
            }
        });
    });
});