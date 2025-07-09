// Herramienta: Geogebra Clásico
app.tools.g_Geogebra = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-compass"></i> Geogebra Clásico</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Applet de Geogebra</h3>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-info">
                                    <h5><i class="fas fa-info-circle"></i> Información</h5>
                                    <p>GeoGebra es un software interactivo de matemáticas que combina geometría, álgebra, estadística y cálculo en un solo programa fácil de usar.</p>
                                    <p><strong>💡 Sugerencia:</strong> Para una mejor experiencia, usa el botón "Vista Ampliada" que abrirá GeoGebra en una ventana modal de pantalla completa.</p>
                                </div>
                                
                                <div class="text-center">
                                    <div id="geogebra-container" style="width: 100%; height: 650px; border: 2px solid #3498db; border-radius: 8px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                        <div>
                                            <i class="fas fa-compass fa-3x text-muted mb-3"></i>
                                            <h4>Cargando GeoGebra...</h4>
                                            <p class="text-muted">El applet se está inicializando</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-3 text-center">
                                    <button class="btn btn-primary" onclick="app.tools.g_Geogebra.loadGeogebra()">
                                        <i class="fas fa-play"></i> Cargar GeoGebra
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.g_Geogebra.resetGeogebra()">
                                        <i class="fas fa-redo"></i> Reiniciar
                                    </button>
                                    <button class="btn btn-success" onclick="Grapher.openGeoGebraModal()" title="Abrir GeoGebra en ventana ampliada">
                                        <i class="fas fa-expand"></i> Vista Ampliada
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.g_Geogebra.openInNewTab()">
                                        <i class="fas fa-external-link-alt"></i> Nueva Pestaña
                                    </button>
                                    <button class="btn btn-warning" onclick="Grapher.openGeoGebraHelpModal()" title="Ayuda y tutoriales de GeoGebra">
                                        <i class="fas fa-question-circle"></i> Ayuda
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Funciones Principales</h3>
                            </div>
                            <div class="card-body">
                                <h4>Herramientas de Geometría</h4>
                                <ul>
                                    <li><strong>Puntos:</strong> Crear y manipular puntos en el plano</li>
                                    <li><strong>Líneas:</strong> Rectas, segmentos, rayos</li>
                                    <li><strong>Polígonos:</strong> Triángulos, cuadriláteros, etc.</li>
                                    <li><strong>Círculos:</strong> Por centro y radio, por tres puntos</li>
                                    <li><strong>Cónicas:</strong> Elipses, parábolas, hipérbolas</li>
                                </ul>
                                
                                <h4>Herramientas de Álgebra</h4>
                                <ul>
                                    <li><strong>Funciones:</strong> Gráficas de funciones</li>
                                    <li><strong>Ecuaciones:</strong> Resolver sistemas</li>
                                    <li><strong>Transformaciones:</strong> Traslaciones, rotaciones</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Instrucciones de Uso</h3>
                            </div>
                            <div class="card-body">
                                <h4>Opciones de Visualización</h4>
                                <ul>
                                    <li><strong>Vista Normal:</strong> Usa GeoGebra en esta página</li>
                                    <li><strong>Vista Ampliada:</strong> Abre una ventana modal de pantalla completa</li>
                                    <li><strong>Nueva Pestaña:</strong> Abre GeoGebra en una pestaña separada</li>
                                </ul>
                                
                                <h4>Navegación</h4>
                                <ul>
                                    <li><strong>Zoom:</strong> Usar la rueda del mouse</li>
                                    <li><strong>Mover vista:</strong> Click derecho y arrastrar</li>
                                    <li><strong>Seleccionar:</strong> Click izquierdo</li>
                                </ul>
                                
                                <h4>Construcciones</h4>
                                <ol>
                                    <li>Selecciona una herramienta de la barra</li>
                                    <li>Haz click en el área de trabajo</li>
                                    <li>Sigue las instrucciones en pantalla</li>
                                    <li>Usa el panel de álgebra para ver ecuaciones</li>
                                </ol>
                                
                                <h4>Consejos</h4>
                                <ul>
                                    <li>Click derecho para opciones contextuales</li>
                                    <li>Usa la vista de álgebra para ver ecuaciones</li>
                                    <li>Arrastra objetos para explorar propiedades</li>
                                    <li><strong>Recomendado:</strong> Usa la "Vista Ampliada" para mejor experiencia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Cargar GeoGebra automáticamente
        setTimeout(() => {
            this.loadGeogebra();
        }, 1000);
    },
    
    loadGeogebra: function() {
        const container = document.getElementById('geogebra-container');
        
        // Crear iframe para GeoGebra
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.geogebra.org/classic?lang=es';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allowfullscreen', 'true');
        
        // Limpiar container y agregar iframe
        container.innerHTML = '';
        container.appendChild(iframe);
        
        // Manejar errores de carga
        iframe.onerror = function() {
            container.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                    <h4>Error al cargar GeoGebra</h4>
                    <p class="text-muted">Verifica tu conexión a internet e intenta nuevamente</p>
                    <button class="btn btn-primary" onclick="app.tools.g_Geogebra.loadGeogebra()">
                        <i class="fas fa-redo"></i> Reintentar
                    </button>
                </div>
            `;
        };
        
        // Mostrar mensaje de carga
        container.style.backgroundColor = '#f8f9fa';
        
        // Agregar evento de carga
        iframe.onload = function() {
            container.style.backgroundColor = 'white';
        };
    },
    
    resetGeogebra: function() {
        const container = document.getElementById('geogebra-container');
        container.innerHTML = `
            <div>
                <i class="fas fa-compass fa-3x text-muted mb-3"></i>
                <h4>Reiniciando GeoGebra...</h4>
                <p class="text-muted">El applet se está recargando</p>
            </div>
        `;
        
        // Recargar después de un breve delay
        setTimeout(() => {
            this.loadGeogebra();
        }, 1000);
    },
    
    openInNewTab: function() {
        window.open('https://www.geogebra.org/classic?lang=es', '_blank');
    }
};