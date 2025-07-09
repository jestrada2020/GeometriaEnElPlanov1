// Aplicación principal - Caja de Herramientas Matemáticas
window.app = {
    currentTool: null,
    
    // Inicialización de la aplicación
    init: function() {
        this.setupEventListeners();
        this.loadTool('introduccion1'); // Cargar herramienta por defecto
        this.setupMathJax();
    },
    
    // Configurar event listeners
    setupEventListeners: function() {
        // Manejar clicks en el sidebar
        document.addEventListener('click', function(e) {
            if (e.target.matches('#sidebar button')) {
                // Remover clase active de todos los botones
                document.querySelectorAll('#sidebar button').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Agregar clase active al botón clickeado
                e.target.classList.add('active');
            }
        });
        
        // Manejar responsive sidebar
        this.setupResponsiveSidebar();
    },
    
    // Configurar sidebar responsive
    setupResponsiveSidebar: function() {
        // Agregar botón hamburguesa en móviles
        if (window.innerWidth <= 768) {
            const hamburger = document.createElement('button');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            hamburger.className = 'hamburger-btn';
            hamburger.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                z-index: 1001;
                background: #2c3e50;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
            `;
            document.body.appendChild(hamburger);
            
            hamburger.addEventListener('click', function() {
                document.getElementById('sidebar').classList.toggle('active');
            });
        }
    },
    
    // Cargar herramienta específica
    loadTool: function(toolName) {
        const content = document.getElementById('tool-content');
        this.currentTool = toolName;
        
        // Mostrar indicador de carga
        content.innerHTML = '<div class="loading-container text-center"><div class="loading"></div><p>Cargando herramienta...</p></div>';
        
        // Simular carga y mostrar contenido
        setTimeout(() => {
            if (this.tools[toolName]) {
                this.tools[toolName].render(content);
                this.reprocessMathJax();
            } else {
                content.innerHTML = '<div class="error-message">Herramienta no encontrada: ' + toolName + '</div>';
            }
        }, 200);
    },
    
    // Configurar MathJax
    setupMathJax: function() {
        // La configuración ya está en el HTML, solo necesitamos funciones de utilidad
        this.reprocessMathJax();
    },
    
    // Reprocesar MathJax después de cambios dinámicos
    reprocessMathJax: function(element) {
        if (typeof window.reprocessMathJax === 'function') {
            window.reprocessMathJax(element);
        }
    },
    
    // Funciones de utilidad para fórmulas
    validateAndFixSqrtFormulas: function(container) {
        const mathElements = container.querySelectorAll('.MathJax, .math');
        mathElements.forEach(element => {
            let content = element.textContent || element.innerHTML;
            // Corregir errores comunes con sqrt
            content = content.replace(/\\sqrt\s*\{([^}]*)\}/g, '\\sqrt{$1}');
            content = content.replace(/\\sqrt([^{])/g, '\\sqrt{$1}');
            if (element.innerHTML !== content) {
                element.innerHTML = content;
            }
        });
    },
    
    validateAndFixCasesFormulas: function(container) {
        const mathElements = container.querySelectorAll('.MathJax, .math');
        mathElements.forEach(element => {
            let content = element.textContent || element.innerHTML;
            // Corregir errores comunes con cases
            content = content.replace(/\\begin\{cases\}/g, '\\begin{cases}');
            content = content.replace(/\\end\{cases\}/g, '\\end{cases}');
            if (element.innerHTML !== content) {
                element.innerHTML = content;
            }
        });
    },
    
    // Objeto contenedor de todas las herramientas
    tools: {}
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.app.init();
});

// Utilidades globales
window.utils = {
    // Formatear número con decimales
    formatNumber: function(num, decimals = 2) {
        return Number(num).toFixed(decimals);
    },
    
    // Validar si es un número válido
    isValidNumber: function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    
    // Mostrar mensaje de error
    showError: function(container, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        container.appendChild(errorDiv);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    },
    
    // Mostrar mensaje de éxito
    showSuccess: function(container, message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        container.appendChild(successDiv);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    },
    
    // Crear elemento HTML con atributos
    createElement: function(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (content) {
            element.textContent = content;
        }
        
        return element;
    }
};