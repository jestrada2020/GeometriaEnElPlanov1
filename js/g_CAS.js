// Herramienta: GeoGebra - Vista CAS (Computer Algebra System)
app.tools.g_CAS = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-function"></i> GeoGebra - Vista CAS</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Vista CAS (Computer Algebra System) de GeoGebra</h3>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-warning">
                                    <h5><i class="fas fa-function"></i> Vista CAS</h5>
                                    <p>La Vista CAS (Sistema de Álgebra Computacional) es la herramienta más potente de GeoGebra para:</p>
                                    <ul>
                                        <li><strong>Álgebra simbólica:</strong> Manipulación exacta de expresiones algebraicas</li>
                                        <li><strong>Cálculo avanzado:</strong> Derivadas, integrales, límites simbólicos</li>
                                        <li><strong>Resolución de ecuaciones:</strong> Sistemas complejos y ecuaciones diferenciales</li>
                                        <li><strong>Factorización:</strong> Polinomios y expresiones racionales</li>
                                        <li><strong>Simplificación:</strong> Expresiones trigonométricas y algebraicas</li>
                                        <li><strong>Expansión:</strong> Desarrollos de Taylor, series, etc.</li>
                                    </ul>
                                    <p><strong>💡 Potencia:</strong> Resultados exactos con fracciones, radicales y expresiones simbólicas.</p>
                                </div>
                                
                                <div class="text-center">
                                    <div id="geogebra-cas-container" style="width: 100%; height: 650px; border: 2px solid #dc3545; border-radius: 8px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                        <div>
                                            <i class="fas fa-function fa-3x text-muted mb-3"></i>
                                            <h4>Cargando GeoGebra CAS...</h4>
                                            <p class="text-muted">Inicializando el sistema de álgebra computacional</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-3 text-center">
                                    <button class="btn btn-primary" onclick="app.tools.g_CAS.loadGeogebra()">
                                        <i class="fas fa-play"></i> Cargar Vista CAS
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.g_CAS.resetGeogebra()">
                                        <i class="fas fa-redo"></i> Reiniciar
                                    </button>
                                    <button class="btn btn-success" onclick="Grapher.openGeoGebraCASModal()" title="Abrir en ventana ampliada">
                                        <i class="fas fa-expand"></i> Vista Ampliada
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.g_CAS.openInNewTab()">
                                        <i class="fas fa-external-link-alt"></i> Nueva Pestaña
                                    </button>
                                    <button class="btn btn-warning" onclick="Grapher.openGeoGebraCASHelpModal()" title="Ayuda específica para Vista CAS">
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
                                <h3>Comandos Básicos CAS</h3>
                            </div>
                            <div class="card-body">
                                <h4>Operaciones Algebraicas</h4>
                                <ul>
                                    <li><strong>Simplificar[expresión]:</strong> Simplifica expresiones</li>
                                    <li><strong>Expandir[expresión]:</strong> Desarrolla productos</li>
                                    <li><strong>Factorizar[polinomio]:</strong> Factoriza polinomios</li>
                                    <li><strong>Recopilar[expr, variable]:</strong> Agrupa términos</li>
                                    <li><strong>Sustituir[expr, var, valor]:</strong> Sustitución</li>
                                </ul>
                                
                                <h4>Resolución de Ecuaciones</h4>
                                <ul>
                                    <li><strong>Resolver[ecuación, variable]:</strong> Resuelve ecuaciones</li>
                                    <li><strong>Resolver[{ec1, ec2}, {x, y}]:</strong> Sistemas</li>
                                    <li><strong>ResolverN[ecuación, variable]:</strong> Soluciones numéricas</li>
                                    <li><strong>RSolve[ecuación_recurrencia, a(n), n]:</strong> Recurrencias</li>
                                </ul>
                                
                                <h4>Cálculo Diferencial</h4>
                                <ul>
                                    <li><strong>Derivada[f(x), x]:</strong> Derivada de función</li>
                                    <li><strong>Derivada[f(x), x, n]:</strong> Derivada n-ésima</li>
                                    <li><strong>DerivadaParcial[f(x,y), x]:</strong> Derivada parcial</li>
                                    <li><strong>DerivadaImplícita[ecuación, y, x]:</strong> Derivada implícita</li>
                                </ul>
                                
                                <h4>Cálculo Integral</h4>
                                <ul>
                                    <li><strong>Integral[f(x), x]:</strong> Integral indefinida</li>
                                    <li><strong>Integral[f(x), x, a, b]:</strong> Integral definida</li>
                                    <li><strong>IntegralN[f(x), x, a, b]:</strong> Integral numérica</li>
                                    <li><strong>IntegralPorPartes[f(x), g'(x), x]:</strong> Por partes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Comandos Avanzados CAS</h3>
                            </div>
                            <div class="card-body">
                                <h4>Límites y Continuidad</h4>
                                <ul>
                                    <li><strong>Límite[f(x), x, a]:</strong> Límite en un punto</li>
                                    <li><strong>LímiteIzquierda[f(x), x, a]:</strong> Límite lateral</li>
                                    <li><strong>LímiteDerecha[f(x), x, a]:</strong> Límite lateral</li>
                                    <li><strong>Asíntotas[f(x)]:</strong> Encuentra asíntotas</li>
                                </ul>
                                
                                <h4>Series y Desarrollos</h4>
                                <ul>
                                    <li><strong>Taylor[f(x), x, a, n]:</strong> Serie de Taylor</li>
                                    <li><strong>Maclaurin[f(x), x, n]:</strong> Serie de Maclaurin</li>
                                    <li><strong>SerieFourier[f(x), x, n]:</strong> Serie de Fourier</li>
                                    <li><strong>RestoTaylor[f(x), x, a, n]:</strong> Resto de Taylor</li>
                                </ul>
                                
                                <h4>Álgebra Lineal</h4>
                                <ul>
                                    <li><strong>Determinante[matriz]:</strong> Calcula determinante</li>
                                    <li><strong>Inversa[matriz]:</strong> Matriz inversa</li>
                                    <li><strong>AutovaloresAutovectores[matriz]:</strong> Valores/vectores propios</li>
                                    <li><strong>DiagonalizarJordan[matriz]:</strong> Forma de Jordan</li>
                                    <li><strong>RREF[matriz]:</strong> Forma escalonada reducida</li>
                                </ul>
                                
                                <h4>Ecuaciones Diferenciales</h4>
                                <ul>
                                    <li><strong>ResEcDif[ecuación, y, x]:</strong> ED ordinarias</li>
                                    <li><strong>ResEcDifN[ecuación, y, x, <condiciones>]:</strong> Con condiciones</li>
                                    <li><strong>CampoVectorial[f(x,y), g(x,y)]:</strong> Campo de direcciones</li>
                                </ul>
                                
                                <h4>Funciones Especiales</h4>
                                <ul>
                                    <li><strong>Gamma[x]:</strong> Función gamma</li>
                                    <li><strong>Beta[a, b]:</strong> Función beta</li>
                                    <li><strong>Zeta[s]:</strong> Función zeta de Riemann</li>
                                    <li><strong>PolinomiosLegendre[n, x]:</strong> Polinomios de Legendre</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Proyectos Avanzados con CAS</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>1. Análisis de Funciones</h5>
                                        <p><strong>Objetivo:</strong> Estudio completo de función</p>
                                        <ol>
                                            <li>Define: f(x) = (x³-3x²+2x)/(x²-1)</li>
                                            <li>Simplifica: Simplificar[f(x)]</li>
                                            <li>Dominio: Resolver[x²-1≠0, x]</li>
                                            <li>Derivada: f'(x) = Derivada[f(x), x]</li>
                                            <li>Críticos: Resolver[f'(x)=0, x]</li>
                                            <li>Límites: Límite[f(x), x, ±∞]</li>
                                            <li>Asíntotas: Asíntotas[f(x)]</li>
                                        </ol>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>2. Ecuaciones Diferenciales</h5>
                                        <p><strong>Objetivo:</strong> Resolver ED de crecimiento</p>
                                        <ol>
                                            <li>Plantea: dy/dx = ky, y(0) = y₀</li>
                                            <li>Resuelve: ResEcDif[y' = k*y, y, x]</li>
                                            <li>Condición: Sustituir en y(0) = y₀</li>
                                            <li>Solución: y(x) = y₀*e^(kx)</li>
                                            <li>Aplica: Crecimiento poblacional</li>
                                            <li>Visualiza: Gráfica de soluciones</li>
                                        </ol>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>3. Series de Taylor</h5>
                                        <p><strong>Objetivo:</strong> Aproximar funciones</p>
                                        <ol>
                                            <li>Función: f(x) = e^x * sin(x)</li>
                                            <li>Centro: a = 0 (Maclaurin)</li>
                                            <li>Desarrolla: Taylor[f(x), x, 0, 8]</li>
                                            <li>Aproxima: Para diferentes órdenes</li>
                                            <li>Error: RestoTaylor[f(x), x, 0, n]</li>
                                            <li>Gráfica: Compara f(x) con aproximaciones</li>
                                        </ol>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>4. Álgebra de Matrices</h5>
                                        <p><strong>Objetivo:</strong> Diagonalización</p>
                                        <ol>
                                            <li>Matriz: A = [[3,1],[0,2]]</li>
                                            <li>Autovalores: AutovaloresAutovectores[A]</li>
                                            <li>Verifica: det(A - λI) = 0</li>
                                            <li>Autovectores: Para cada λ</li>
                                            <li>Diagonal: P^(-1)*A*P = D</li>
                                            <li>Aplica: Potencias de matrices</li>
                                        </ol>
                                    </div>
                                </div>
                                
                                <div class="mt-4">
                                    <h5>Técnicas Avanzadas para CAS</h5>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h6>Manipulación Simbólica</h6>
                                            <ul>
                                                <li>Usa variables simbólicas para parámetros</li>
                                                <li>Aprovecha las sustituciones exactas</li>
                                                <li>Combina simplificación con factorización</li>
                                                <li>Verifica resultados con casos particulares</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-4">
                                            <h6>Resolución de Problemas</h6>
                                            <ul>
                                                <li>Plantea sistemas de ecuaciones complejos</li>
                                                <li>Usa condiciones de contorno en ED</li>
                                                <li>Aprovecha la exactitud de los resultados</li>
                                                <li>Explora casos límite y especiales</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-4">
                                            <h6>Integración con otras Vistas</h6>
                                            <ul>
                                                <li>Conecta resultados CAS con gráficos</li>
                                                <li>Exporta fórmulas a vista algebraica</li>
                                                <li>Usa en análisis de datos estadísticos</li>
                                                <li>Combina con visualización 3D</li>
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
        const container = document.getElementById('geogebra-cas-container');
        
        // Crear iframe para GeoGebra Vista CAS
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.geogebra.org/classic?lang=es&perspective=C';
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
                    <h4>Error al cargar GeoGebra CAS</h4>
                    <p class="text-muted">Verifica tu conexión a internet e intenta nuevamente</p>
                    <button class="btn btn-primary" onclick="app.tools.g_CAS.loadGeogebra()">
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
        const container = document.getElementById('geogebra-cas-container');
        container.innerHTML = `
            <div>
                <i class="fas fa-function fa-3x text-muted mb-3"></i>
                <h4>Reiniciando Vista CAS...</h4>
                <p class="text-muted">El sistema se está recargando</p>
            </div>
        `;
        
        // Recargar después de un breve delay
        setTimeout(() => {
            this.loadGeogebra();
        }, 1000);
    },
    
    openInNewTab: function() {
        window.open('https://www.geogebra.org/classic?lang=es&perspective=C', '_blank');
    }
};