// Herramienta: GeoGebra - Vista Algebraica
app.tools.g_Algebraica = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-calculator"></i> GeoGebra - Vista Algebraica</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Vista Algebraica de GeoGebra</h3>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-primary">
                                    <h5><i class="fas fa-info-circle"></i> Vista Algebraica</h5>
                                    <p>La Vista Algebraica muestra una representación algebraica de los objetos matemáticos. Esta vista es especialmente útil para:</p>
                                    <ul>
                                        <li><strong>Análisis de ecuaciones:</strong> Ver las ecuaciones exactas de rectas, curvas y funciones</li>
                                        <li><strong>Valores numéricos:</strong> Coordenadas de puntos, longitudes, áreas y volúmenes</li>
                                        <li><strong>Propiedades algebraicas:</strong> Parámetros de funciones y objetos geométricos</li>
                                        <li><strong>Entrada directa:</strong> Crear objetos introduciendo comandos y ecuaciones</li>
                                    </ul>
                                    <p><strong>💡 Recomendación:</strong> Usa la "Vista Ampliada" para trabajar cómodamente con la vista algebraica en pantalla completa.</p>
                                </div>
                                
                                <div class="text-center">
                                    <div id="geogebra-algebraica-container" style="width: 100%; height: 650px; border: 2px solid #28a745; border-radius: 8px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                        <div>
                                            <i class="fas fa-calculator fa-3x text-muted mb-3"></i>
                                            <h4>Cargando GeoGebra Vista Algebraica...</h4>
                                            <p class="text-muted">Inicializando la vista algebraica</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-3 text-center">
                                    <button class="btn btn-primary" onclick="app.tools.g_Algebraica.loadGeogebra()">
                                        <i class="fas fa-play"></i> Cargar Vista Algebraica
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.g_Algebraica.resetGeogebra()">
                                        <i class="fas fa-redo"></i> Reiniciar
                                    </button>
                                    <button class="btn btn-success" onclick="Grapher.openGeoGebraAlgebraicaModal()" title="Abrir en ventana ampliada">
                                        <i class="fas fa-expand"></i> Vista Ampliada
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.g_Algebraica.openInNewTab()">
                                        <i class="fas fa-external-link-alt"></i> Nueva Pestaña
                                    </button>
                                    <button class="btn btn-warning" onclick="Grapher.openGeoGebraAlgebraicaHelpModal()" title="Ayuda específica para Vista Algebraica">
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
                                <h3>Comandos Principales de la Vista Algebraica</h3>
                            </div>
                            <div class="card-body">
                                <h4>Entrada de Objetos</h4>
                                <ul>
                                    <li><strong>Puntos:</strong> A = (2, 3) o A(2, 3)</li>
                                    <li><strong>Rectas:</strong> y = 2x + 1 o 2x - y + 1 = 0</li>
                                    <li><strong>Círculos:</strong> (x-2)² + (y-1)² = 9</li>
                                    <li><strong>Funciones:</strong> f(x) = x² - 3x + 2</li>
                                    <li><strong>Parábolas:</strong> y = ax² + bx + c</li>
                                </ul>
                                
                                <h4>Comandos de Análisis</h4>
                                <ul>
                                    <li><strong>Distancia:</strong> Distancia[A, B]</li>
                                    <li><strong>Área:</strong> Área[polígono]</li>
                                    <li><strong>Longitud:</strong> Longitud[segmento]</li>
                                    <li><strong>Intersección:</strong> Interseca[objeto1, objeto2]</li>
                                    <li><strong>Derivada:</strong> Derivada[f(x)]</li>
                                </ul>
                                
                                <h4>Transformaciones</h4>
                                <ul>
                                    <li><strong>Traslación:</strong> Traslada[objeto, vector]</li>
                                    <li><strong>Rotación:</strong> Rota[objeto, ángulo, centro]</li>
                                    <li><strong>Reflexión:</strong> Refleja[objeto, recta]</li>
                                    <li><strong>Homotecia:</strong> Dilata[objeto, factor, centro]</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Técnicas Avanzadas</h3>
                            </div>
                            <div class="card-body">
                                <h4>Trabajo con Variables</h4>
                                <ul>
                                    <li><strong>Deslizadores:</strong> a = 2 (crea automáticamente un deslizador)</li>
                                    <li><strong>Listas:</strong> lista1 = {1, 2, 3, 4, 5}</li>
                                    <li><strong>Secuencias:</strong> Secuencia[i², i, 1, 10]</li>
                                    <li><strong>Condiciones:</strong> Si[condición, valor_si_verdad, valor_si_falso]</li>
                                </ul>
                                
                                <h4>Análisis Matemático</h4>
                                <ul>
                                    <li><strong>Límites:</strong> Límite[f(x), a]</li>
                                    <li><strong>Integral:</strong> Integral[f(x), a, b]</li>
                                    <li><strong>Resolver:</strong> Resuelve[ecuación, variable]</li>
                                    <li><strong>Simplificar:</strong> Simplifica[expresión]</li>
                                    <li><strong>Factorizar:</strong> Factoriza[polinomio]</li>
                                </ul>
                                
                                <h4>Estadística y Probabilidad</h4>
                                <ul>
                                    <li><strong>Media:</strong> Media[lista]</li>
                                    <li><strong>Desviación:</strong> DesviaciónTípica[lista]</li>
                                    <li><strong>Regresión:</strong> RegresionLineal[lista_puntos]</li>
                                    <li><strong>Distribuciones:</strong> Normal[μ, σ, x]</li>
                                </ul>
                                
                                <h4>Consejos de Uso</h4>
                                <ul>
                                    <li>Usa paréntesis para agrupar operaciones</li>
                                    <li>Los nombres de objetos son sensibles a mayúsculas</li>
                                    <li>Haz doble clic en un objeto para editarlo</li>
                                    <li>Usa el autocompletado para comandos</li>
                                    <li>Arrastra objetos desde la vista algebraica al gráfico</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Ejemplos Prácticos para la Vista Algebraica</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <h5>1. Análisis de Funciones</h5>
                                        <p><strong>Pasos:</strong></p>
                                        <ol>
                                            <li>Escribe: f(x) = x³ - 3x² + 2</li>
                                            <li>Calcula: Derivada[f]</li>
                                            <li>Encuentra: Resuelve[f'(x) = 0, x]</li>
                                            <li>Evalúa: f''(puntos_críticos)</li>
                                        </ol>
                                        <p>Esto te permite analizar máximos y mínimos de la función.</p>
                                    </div>
                                    
                                    <div class="col-md-4">
                                        <h5>2. Geometría Analítica</h5>
                                        <p><strong>Pasos:</strong></p>
                                        <ol>
                                            <li>Define: A = (1, 2), B = (4, 6)</li>
                                            <li>Crea: recta1 = Recta[A, B]</li>
                                            <li>Encuentra: pendiente = Pendiente[recta1]</li>
                                            <li>Calcula: d = Distancia[A, B]</li>
                                        </ol>
                                        <p>Analiza propiedades geométricas algebraicamente.</p>
                                    </div>
                                    
                                    <div class="col-md-4">
                                        <h5>3. Sistemas de Ecuaciones</h5>
                                        <p><strong>Pasos:</strong></p>
                                        <ol>
                                            <li>Define: ec1: 2x + 3y = 7</li>
                                            <li>Define: ec2: x - y = 1</li>
                                            <li>Resuelve: Resuelve[{ec1, ec2}, {x, y}]</li>
                                            <li>Visualiza: intersección en el gráfico</li>
                                        </ol>
                                        <p>Combina álgebra y geometría para resolver sistemas.</p>
                                    </div>
                                </div>
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
        const container = document.getElementById('geogebra-algebraica-container');
        
        // Crear iframe para GeoGebra Vista Algebraica
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.geogebra.org/classic?lang=es&perspective=A';
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
                    <h4>Error al cargar GeoGebra Vista Algebraica</h4>
                    <p class="text-muted">Verifica tu conexión a internet e intenta nuevamente</p>
                    <button class="btn btn-primary" onclick="app.tools.g_Algebraica.loadGeogebra()">
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
        const container = document.getElementById('geogebra-algebraica-container');
        container.innerHTML = `
            <div>
                <i class="fas fa-calculator fa-3x text-muted mb-3"></i>
                <h4>Reiniciando Vista Algebraica...</h4>
                <p class="text-muted">La vista se está recargando</p>
            </div>
        `;
        
        // Recargar después de un breve delay
        setTimeout(() => {
            this.loadGeogebra();
        }, 1000);
    },
    
    openInNewTab: function() {
        window.open('https://www.geogebra.org/classic?lang=es&perspective=A', '_blank');
    }
};