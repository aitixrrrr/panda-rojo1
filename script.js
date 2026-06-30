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
            n.lang = t, window.speechSynthesis.cancel(), window.speechSynthesis.speak(n);
        } catch (e) {}
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
        this.checked ? speak("Otras cantidad habilitada.Ahora puedes introducir el importe deseado.") : speak("Otras cantidad deshabilitada.Selecciona una cantidad fija si lo deseas.");
    });
}

const footerNewsletter = document.querySelector("form.newsletter-group");
if (footerNewsletter) {
    footerNewsletter.addEventListener("submit", function(e) {
        e.preventDefault();
        const t = this.querySelector('input[type="email"]');
        (t ? t.value.trim() : "") ? (speak("Gracias por suscribirte.Revisa tu correo para confirmar."), this.reset()) : speak("Introduce un correo electrónico válido.");
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const e = document.getElementById("otraCantidadCheck");
    const t = document.getElementById("contenedorOtraCantidad");
    const n = document.getElementById("importePersonalizado");
    const o = document.querySelector(".donation-card");
    const hc = document.getElementById("cantidadSeleccionada");
    const btns = document.querySelectorAll(".btn-amount-custom");

    if (e && t) {
        e.addEventListener("change", function() {
            if (this.checked) {
                t.classList.remove("d-none");
                if (n) { n.required = true; n.focus(); }
                btns.forEach(b => b.classList.remove("active"));
                if (hc) hc.value = "";
            } else {
                t.classList.add("d-none");
                if (n) { n.required = false; n.value = ""; }
            }
        });
    }

    btns.forEach(b => {
        b.addEventListener("click", function() {
            if (e && e.checked) {
                e.checked = false;
                t.classList.add("d-none");
                if (n) { n.required = false; n.value = ""; }
            }
            btns.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            if (hc) hc.value = this.getAttribute("data-amount") + " €";
        });
    });

    if (o) {
        o.addEventListener("reset", function() {
            if (t) t.classList.add("d-none");
            if (n) n.required = false;
            btns.forEach(b => b.classList.remove("active"));
            if (hc) hc.value = "";
        });
    }

    const navbar = document.getElementById("collapsibleNavbar");
    const links = navbar ? navbar.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-item") : [];
    links.forEach(function(l) {
        l.addEventListener("click", function() {
            if (navbar && navbar.classList.contains("show")) {
                const t = bootstrap.Collapse.getInstance(navbar);
                if (t) t.hide();
            }
        });
    });

    const fd = document.getElementById("form-donacion");
    if (fd) {
        fd.addEventListener("submit", function(evt) {
            evt.preventDefault();
            const esLibre = e && e.checked;
            const esFijo = hc && hc.value !== "";

            if (!esLibre && !esFijo) {
                alert("Por favor, selecciona una cantidad o introduce un importe personalizado.");
                return;
            }

            const btnSub = this.querySelector(".btn-footer-submit");
            const originalTxt = btnSub.textContent;
            btnSub.textContent = "Procesando...";
            btnSub.disabled = true;

            emailjs.sendForm("service_6e0g1zc", "TU_TEMPLATE_ID", this)
                .then(function() {
                    alert("¡Muchas gracias! El correo de confirmación de la donación ha sido enviado.");
                    fd.reset();
                }, function(err) {
                    alert("Hubo un error al procesar el envío: " + JSON.stringify(err));
                })
                .finally(function() {
                    btnSub.textContent = originalTxt;
                    btnSub.disabled = false;
                });
        });
    }
});
  document.addEventListener("DOMContentLoaded", function () {
    
            const detalles = {
                detalle1: {
                    titulo: "Producto Exclusivo",
                    precio: "€49,99",
                    imagen: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop",
                    texto: "Este producto exclusivo está diseñado con materiales de primera calidad. Ideal para quienes buscan innovación y estilo en un solo lugar. Características destacadas: diseño ergonómico, colores vibrantes y garantía extendida."
                },
                detalle2: {
                    titulo: "Edición Limitada",
                    precio: "€149,99",
                    imagen: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop",
                    texto: "Edición limitada con solo 100 unidades disponibles mundialmente. Cada pieza está numerada y certificada. Incluye accesorios especiales y un estuche de colección. No te quedes sin la oportunidad de tener esta joya."
                },
                detalle3: {
                    titulo: "Colección Especial",
                    precio: "€199,99",
                    imagen: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=880&auto=format&fit=crop",
                    texto: "Forma parte de nuestra colección especial de temporada. Combina la tradición con la modernidad, ofreciendo una experiencia única. Beneficios: envío gratis, 2 años de garantía y soporte técnico prioritario."
                }
            };
    
            const botones = document.querySelectorAll(".view-details");
    
            const modal = new bootstrap.Modal(
    document.getElementById("descriptionModal"), {
        backdrop: 'static',
        keyboard: false
    }
);
    
            const modalTitle = document.getElementById("modalProductLabel");
            const descriptionContainer = document.getElementById("descriptionProduct");
    
            function mostrarDescripcion(productId) {
                const producto = detalles[productId];
    
                if (producto) {
                    modalTitle.textContent = producto.titulo;
                    
                    descriptionContainer.innerHTML = `
                        <div class="mb-3">
                            <img src="${producto.imagen}" class="img-fluid rounded mb-3 shadow-sm" style="max-height: 250px; width: 100%; object-fit: cover;" alt="${producto.titulo}">
                            
                            <div>
                                <span class="badge bg-info text-dark mb-2">
                                    Información detallada
                                </span>
                            </div>
                            <p class="mt-2">
                                ${producto.texto}
                            </p>
                            <hr>
                            <h5 class="text">
                                Precio: ${producto.precio}
                            </h5>
                            <small class="text-muted">
                                ID del producto: ${productId}
                            </small>
                        </div>
                    `;
                } else {
                    descriptionContainer.innerHTML = `
                        <div class="alert alert-warning">
                            Producto no encontrado
                        </div>
                    `;
                }
    
                modal.show();
            }
    
            botones.forEach(boton => {
                boton.addEventListener("click", function (e) {
                    const productId = this.getAttribute("data-product");
                    mostrarDescripcion(productId);
                });
            });
    
        }); 