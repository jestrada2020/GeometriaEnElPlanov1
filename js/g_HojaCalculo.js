// Herramienta: GeoGebra - Vista Hoja de Cálculo
app.tools.g_HojaCalculo = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-table"></i> GeoGebra - Vista Hoja de Cálculo</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Vista Hoja de Cálculo de GeoGebra</h3>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-success">
                                    <h5><i class="fas fa-table"></i> Vista Hoja de Cálculo</h5>
                                    <p>La Vista Hoja de Cálculo combina las capacidades de una hoja de cálculo con las herramientas matemáticas de GeoGebra. Es perfecta para:</p>
                                    <ul>
                                        <li><strong>Análisis de datos:</strong> Importar, organizar y analizar conjuntos de datos</li>
                                        <li><strong>Estadística descriptiva:</strong> Calcular medias, medianas, desviaciones estándar</li>
                                        <li><strong>Gráficos estadísticos:</strong> Histogramas, diagramas de caja, gráficos de dispersión</li>
                                        <li><strong>Regresión:</strong> Líneas de tendencia y correlaciones</li>
                                        <li><strong>Simulaciones:</strong> Experimentos aleatorios y distribuciones de probabilidad</li>
                                    </ul>
                                    <p><strong>💡 Integración:</strong> Los datos de la hoja se conectan automáticamente con los gráficos y análisis.</p>
                                </div>
                                
                                <div class="text-center">
                                    <div id="geogebra-hoja-container" style="width: 100%; height: 650px; border: 2px solid #fd7e14; border-radius: 8px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                        <div>
                                            <i class="fas fa-table fa-3x text-muted mb-3"></i>
                                            <h4>Cargando GeoGebra Hoja de Cálculo...</h4>
                                            <p class="text-muted">Inicializando la vista de hoja de cálculo</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-3 text-center">
                                    <button class="btn btn-primary" onclick="app.tools.g_HojaCalculo.loadGeogebra()">
                                        <i class="fas fa-play"></i> Cargar Hoja de Cálculo
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.g_HojaCalculo.resetGeogebra()">
                                        <i class="fas fa-redo"></i> Reiniciar
                                    </button>
                                    <button class="btn btn-success" onclick="Grapher.openGeoGebraHojaModal()" title="Abrir en ventana ampliada">
                                        <i class="fas fa-expand"></i> Vista Ampliada
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.g_HojaCalculo.openInNewTab()">
                                        <i class="fas fa-external-link-alt"></i> Nueva Pestaña
                                    </button>
                                    <button class="btn btn-warning" onclick="Grapher.openGeoGebraHojaHelpModal()" title="Ayuda específica para Hoja de Cálculo">
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
                                <h3>Funciones de Hoja de Cálculo</h3>
                            </div>
                            <div class="card-body">
                                <h4>Operaciones Básicas</h4>
                                <ul>
                                    <li><strong>Entrada de datos:</strong> Clic en celdas para introducir valores</li>
                                    <li><strong>Fórmulas:</strong> =A1+B1, =SUMA(A1:A10)</li>
                                    <li><strong>Referencias:</strong> A1, B2:D5 (rangos de celdas)</li>
                                    <li><strong>Copiar fórmulas:</strong> Arrastra desde la esquina de la celda</li>
                                </ul>
                                
                                <h4>Funciones Matemáticas</h4>
                                <ul>
                                    <li><strong>SUMA(rango):</strong> Suma de valores</li>
                                    <li><strong>PROMEDIO(rango):</strong> Media aritmética</li>
                                    <li><strong>MAX(rango), MIN(rango):</strong> Valores extremos</li>
                                    <li><strong>CONTAR(rango):</strong> Cuenta celdas no vacías</li>
                                    <li><strong>POTENCIA(base, exp):</strong> Potenciación</li>
                                    <li><strong>RAIZ(número):</strong> Raíz cuadrada</li>
                                </ul>
                                
                                <h4>Funciones Estadísticas</h4>
                                <ul>
                                    <li><strong>MEDIA(lista):</strong> Media aritmética</li>
                                    <li><strong>MEDIANA(lista):</strong> Valor central</li>
                                    <li><strong>MODA(lista):</strong> Valor más frecuente</li>
                                    <li><strong>DESVEST(lista):</strong> Desviación estándar</li>
                                    <li><strong>VARIANZA(lista):</strong> Varianza de la muestra</li>
                                    <li><strong>CORRELACION(lista1, lista2):</strong> Coeficiente de correlación</li>
                                </ul>
                                
                                <h4>Importación y Exportación</h4>
                                <ul>
                                    <li><strong>Pegar datos:</strong> Ctrl+V desde otras aplicaciones</li>
                                    <li><strong>Importar CSV:</strong> Archivo → Importar</li>
                                    <li><strong>Exportar:</strong> Guardar como archivo de hoja</li>
                                    <li><strong>Vinculación:</strong> Datos conectados con gráficos</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Análisis Estadístico Avanzado</h3>
                            </div>
                            <div class="card-body">
                                <h4>Visualización de Datos</h4>
                                <ul>
                                    <li><strong>Gráfico de barras:</strong> Selecciona datos → Crear gráfico</li>
                                    <li><strong>Histograma:</strong> Para datos de frecuencia</li>
                                    <li><strong>Diagrama de caja:</strong> Muestra cuartiles y outliers</li>
                                    <li><strong>Gráfico de dispersión:</strong> Para correlaciones</li>
                                    <li><strong>Gráfico circular:</strong> Para proporciones</li>
                                </ul>
                                
                                <h4>Análisis de Regresión</h4>
                                <ul>
                                    <li><strong>RegresionLineal(lista_puntos):</strong> Línea de tendencia</li>
                                    <li><strong>RegresionExp(lista_puntos):</strong> Ajuste exponencial</li>
                                    <li><strong>RegresionLog(lista_puntos):</strong> Ajuste logarítmico</li>
                                    <li><strong>RegresionPol(lista_puntos, grado):</strong> Polinomial</li>
                                    <li><strong>CoeficienteCorrelacion(lista1, lista2):</strong> Fuerza de relación</li>
                                </ul>
                                
                                <h4>Distribuciones de Probabilidad</h4>
                                <ul>
                                    <li><strong>Normal(μ, σ, x):</strong> Distribución normal</li>
                                    <li><strong>Binomial(n, p, k):</strong> Distribución binomial</li>
                                    <li><strong>Uniforme(a, b, x):</strong> Distribución uniforme</li>
                                    <li><strong>TStudent(grados, x):</strong> Distribución t</li>
                                    <li><strong>ChiCuadrado(grados, x):</strong> Distribución χ²</li>
                                </ul>
                                
                                <h4>Simulación y Muestreo</h4>
                                <ul>
                                    <li><strong>Aleatorio():</strong> Número aleatorio [0,1]</li>
                                    <li><strong>AleatorioEntero(min, max):</strong> Entero aleatorio</li>
                                    <li><strong>AleatorioNormal(μ, σ):</strong> Variable normal aleatoria</li>
                                    <li><strong>Muestra(lista, tamaño):</strong> Muestra aleatoria</li>
                                    <li><strong>BarajarLista(lista):</strong> Permutación aleatoria</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Proyectos Prácticos con Hoja de Cálculo</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>1. Análisis de Datos Reales</h5>
                                        <p><strong>Objetivo:</strong> Analizar un conjunto de datos</p>
                                        <ol>
                                            <li>Importa datos de temperaturas mensuales</li>
                                            <li>Calcula: Media, Mediana, Desviación</li>
                                            <li>Crea: Histograma y diagrama de caja</li>
                                            <li>Busca: Tendencias y patrones estacionales</li>
                                        </ol>
                                        <p><strong>Habilidades:</strong> Estadística descriptiva, visualización</p>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>2. Regresión Lineal</h5>
                                        <p><strong>Objetivo:</strong> Encontrar relaciones entre variables</p>
                                        <ol>
                                            <li>Datos: Altura vs Peso de estudiantes</li>
                                            <li>Crea: Gráfico de dispersión</li>
                                            <li>Calcula: Línea de regresión</li>
                                            <li>Interpreta: Coeficiente de correlación</li>
                                        </ol>
                                        <p><strong>Habilidades:</strong> Correlación, predicción</p>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>3. Simulación de Monedas</h5>
                                        <p><strong>Objetivo:</strong> Explorar probabilidad experimental</p>
                                        <ol>
                                            <li>Simula: 1000 lanzamientos de moneda</li>
                                            <li>Cuenta: Frecuencia de caras y cruces</li>
                                            <li>Calcula: Probabilidad experimental</li>
                                            <li>Compara: Con probabilidad teórica (0.5)</li>
                                        </ol>
                                        <p><strong>Habilidades:</strong> Probabilidad, simulación</p>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>4. Análisis Financiero</h5>
                                        <p><strong>Objetivo:</strong> Modelar crecimiento exponencial</p>
                                        <ol>
                                            <li>Datos: Inversión con interés compuesto</li>
                                            <li>Fórmula: V(t) = P(1+r)^t</li>
                                            <li>Gráfica: Crecimiento en el tiempo</li>
                                            <li>Calcula: Tiempo para duplicar inversión</li>
                                        </ol>
                                        <p><strong>Habilidades:</strong> Funciones exponenciales, modelado</p>
                                    </div>
                                </div>
                                
                                <div class="mt-4">
                                    <h5>Consejos para Usar la Hoja de Cálculo Efectivamente</h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h6>Organización de Datos</h6>
                                            <ul>
                                                <li>Usa la primera fila para etiquetas de columnas</li>
                                                <li>Mantén un formato consistente en cada columna</li>
                                                <li>Separa diferentes conjuntos de datos</li>
                                                <li>Usa colores para destacar información importante</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-6">
                                            <h6>Análisis Eficiente</h6>
                                            <ul>
                                                <li>Conecta automáticamente datos con gráficos</li>
                                                <li>Usa nombres descriptivos para rangos de celdas</li>
                                                <li>Aprovecha las funciones estadísticas integradas</li>
                                                <li>Combina con otras vistas para análisis completo</li>
                                            </ul>
                                        </div>
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
        const container = document.getElementById('geogebra-hoja-container');
        
        // Crear iframe para GeoGebra Vista Hoja de Cálculo
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.geogebra.org/classic?lang=es&perspective=S';
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
                    <h4>Error al cargar GeoGebra Hoja de Cálculo</h4>
                    <p class="text-muted">Verifica tu conexión a internet e intenta nuevamente</p>
                    <button class="btn btn-primary" onclick="app.tools.g_HojaCalculo.loadGeogebra()">
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
        const container = document.getElementById('geogebra-hoja-container');
        container.innerHTML = `
            <div>
                <i class="fas fa-table fa-3x text-muted mb-3"></i>
                <h4>Reiniciando Hoja de Cálculo...</h4>
                <p class="text-muted">La vista se está recargando</p>
            </div>
        `;
        
        // Recargar después de un breve delay
        setTimeout(() => {
            this.loadGeogebra();
        }, 1000);
    },
    
    openInNewTab: function() {
        window.open('https://www.geogebra.org/classic?lang=es&perspective=S', '_blank');
    }
};