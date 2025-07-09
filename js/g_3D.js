// Herramienta: GeoGebra - Vista Gráfica 3D
app.tools.g_3D = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-cube"></i> GeoGebra - Vista Gráfica 3D</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Vista Gráfica 3D de GeoGebra</h3>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-info">
                                    <h5><i class="fas fa-cube"></i> Vista Gráfica 3D</h5>
                                    <p>La Vista Gráfica 3D permite trabajar con objetos tridimensionales. Es ideal para:</p>
                                    <ul>
                                        <li><strong>Geometría espacial:</strong> Puntos, rectas, planos y sólidos en el espacio</li>
                                        <li><strong>Superficies:</strong> Gráficas de funciones de dos variables z = f(x,y)</li>
                                        <li><strong>Curvas en el espacio:</strong> Curvas paramétricas y vectoriales</li>
                                        <li><strong>Transformaciones 3D:</strong> Rotaciones, traslaciones y proyecciones</li>
                                        <li><strong>Análisis vectorial:</strong> Campos vectoriales y gradientes</li>
                                    </ul>
                                    <p><strong>💡 Navegación:</strong> Arrastra para rotar, rueda del mouse para zoom, Ctrl+arrastra para mover la vista.</p>
                                </div>
                                
                                <div class="text-center">
                                    <div id="geogebra-3d-container" style="width: 100%; height: 650px; border: 2px solid #6f42c1; border-radius: 8px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                        <div>
                                            <i class="fas fa-cube fa-3x text-muted mb-3"></i>
                                            <h4>Cargando GeoGebra 3D...</h4>
                                            <p class="text-muted">Inicializando la vista tridimensional</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-3 text-center">
                                    <button class="btn btn-primary" onclick="app.tools.g_3D.loadGeogebra()">
                                        <i class="fas fa-play"></i> Cargar Vista 3D
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.g_3D.resetGeogebra()">
                                        <i class="fas fa-redo"></i> Reiniciar
                                    </button>
                                    <button class="btn btn-success" onclick="Grapher.openGeoGebra3DModal()" title="Abrir en ventana ampliada">
                                        <i class="fas fa-expand"></i> Vista Ampliada
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.g_3D.openInNewTab()">
                                        <i class="fas fa-external-link-alt"></i> Nueva Pestaña
                                    </button>
                                    <button class="btn btn-warning" onclick="Grapher.openGeoGebra3DHelpModal()" title="Ayuda específica para Vista 3D">
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
                                <h3>Herramientas Básicas 3D</h3>
                            </div>
                            <div class="card-body">
                                <h4>Objetos Básicos</h4>
                                <ul>
                                    <li><strong>Punto:</strong> A = (1, 2, 3)</li>
                                    <li><strong>Vector:</strong> v = (2, -1, 3) o Vector[A, B]</li>
                                    <li><strong>Recta:</strong> Recta[punto, vector_dirección]</li>
                                    <li><strong>Plano:</strong> Plano[A, B, C] o ax + by + cz = d</li>
                                    <li><strong>Esfera:</strong> Esfera[centro, radio]</li>
                                </ul>
                                
                                <h4>Superficies</h4>
                                <ul>
                                    <li><strong>Superficie:</strong> z = x² + y² (paraboloide)</li>
                                    <li><strong>Superficie paramétrica:</strong> Superficie[x(u,v), y(u,v), z(u,v)]</li>
                                    <li><strong>Superficie de revolución:</strong> SuperficieRevolución[curva, eje]</li>
                                    <li><strong>Cilindro:</strong> Cilindro[base_circular, altura]</li>
                                    <li><strong>Cono:</strong> Cono[base_circular, altura]</li>
                                </ul>
                                
                                <h4>Curvas Espaciales</h4>
                                <ul>
                                    <li><strong>Curva paramétrica:</strong> Curva[x(t), y(t), z(t), t, inicio, fin]</li>
                                    <li><strong>Intersección:</strong> Interseca[superficie1, superficie2]</li>
                                    <li><strong>Hélice:</strong> Curva[cos(t), sin(t), t/5, t, 0, 4π]</li>
                                </ul>
                                
                                <h4>Medidas 3D</h4>
                                <ul>
                                    <li><strong>Distancia:</strong> Distancia[punto, plano]</li>
                                    <li><strong>Ángulo:</strong> Ángulo[recta1, recta2]</li>
                                    <li><strong>Volumen:</strong> Volumen[sólido]</li>
                                    <li><strong>Área:</strong> Área[superficie]</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Técnicas Avanzadas 3D</h3>
                            </div>
                            <div class="card-body">
                                <h4>Transformaciones Espaciales</h4>
                                <ul>
                                    <li><strong>Rotación:</strong> Rota[objeto, ángulo, eje]</li>
                                    <li><strong>Traslación:</strong> Traslada[objeto, vector]</li>
                                    <li><strong>Reflexión:</strong> Refleja[objeto, plano]</li>
                                    <li><strong>Proyección:</strong> Proyección[punto, plano]</li>
                                </ul>
                                
                                <h4>Análisis Vectorial</h4>
                                <ul>
                                    <li><strong>Producto escalar:</strong> u * v</li>
                                    <li><strong>Producto vectorial:</strong> u ⊗ v</li>
                                    <li><strong>Magnitud:</strong> |v|</li>
                                    <li><strong>Vector unitario:</strong> VectorUnitario[v]</li>
                                    <li><strong>Campo vectorial:</strong> CampoVectorial[f(x,y,z), g(x,y,z), h(x,y,z)]</li>
                                </ul>
                                
                                <h4>Cálculo Multivariable</h4>
                                <ul>
                                    <li><strong>Derivada parcial:</strong> DerivadaParcial[f(x,y), x]</li>
                                    <li><strong>Gradiente:</strong> Gradiente[f(x,y,z)]</li>
                                    <li><strong>Integral doble:</strong> IntegralDoble[f(x,y), región]</li>
                                    <li><strong>Integral triple:</strong> IntegralTriple[f(x,y,z), región]</li>
                                </ul>
                                
                                <h4>Navegación y Visualización</h4>
                                <ul>
                                    <li><strong>Rotar vista:</strong> Clic y arrastra</li>
                                    <li><strong>Zoom:</strong> Rueda del mouse</li>
                                    <li><strong>Mover vista:</strong> Ctrl + arrastra</li>
                                    <li><strong>Vista estándar:</strong> Botones de vista predefinida</li>
                                    <li><strong>Planos de corte:</strong> Mostrar/ocultar planos xy, xz, yz</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Proyectos Prácticos para Vista 3D</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <h5>1. Geometría de Sólidos</h5>
                                        <p><strong>Objetivo:</strong> Crear y analizar poliedros</p>
                                        <ol>
                                            <li>Define vértices: A=(0,0,0), B=(1,0,0), etc.</li>
                                            <li>Construye: Polígono[A,B,C,D] (base)</li>
                                            <li>Extrude: Prisma[base, altura]</li>
                                            <li>Calcula: Volumen[prisma], Área[prisma]</li>
                                        </ol>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>2. Superficies Cuádricas</h5>
                                        <p><strong>Objetivo:</strong> Explorar elipsoides, paraboloides</p>
                                        <ol>
                                            <li>Elipsoide: x²/4 + y²/9 + z²/1 = 1</li>
                                            <li>Paraboloide: z = x² + y²</li>
                                            <li>Hiperboloide: x² + y² - z² = 1</li>
                                            <li>Interseca con planos para ver curvas</li>
                                        </ol>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>3. Curvas Paramétricas</h5>
                                        <p><strong>Objetivo:</strong> Visualizar trayectorias 3D</p>
                                        <ol>
                                            <li>Hélice: Curva[cos(t), sin(t), t, t, 0, 6π]</li>
                                            <li>Espiral: Curva[t*cos(t), t*sin(t), t, t, 0, 10]</li>
                                            <li>Calcula: longitud de curva</li>
                                            <li>Encuentra: vector tangente y curvatura</li>
                                        </ol>
                                    </div>
                                    
                                    <div class="col-md-3">
                                        <h5>4. Campos Vectoriales</h5>
                                        <p><strong>Objetivo:</strong> Visualizar campos de fuerza</p>
                                        <ol>
                                            <li>Campo radial: CampoVectorial[x, y, z]</li>
                                            <li>Campo rotacional: CampoVectorial[-y, x, 0]</li>
                                            <li>Calcula: divergencia y rotacional</li>
                                            <li>Visualiza: líneas de campo</li>
                                        </ol>
                                    </div>
                                </div>
                                
                                <div class="mt-3">
                                    <h5>Consejos para Trabajar en 3D</h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <ul>
                                                <li>Usa múltiples vistas para verificar construcciones</li>
                                                <li>Aprovecha la transparencia para ver objetos internos</li>
                                                <li>Utiliza colores diferentes para distinguir objetos</li>
                                                <li>Guarda vistas importantes con nombres descriptivos</li>
                                            </ul>
                                        </div>
                                        <div class="col-md-6">
                                            <ul>
                                                <li>Practica la navegación 3D regularmente</li>
                                                <li>Usa coordenadas para construcciones precisas</li>
                                                <li>Combina vista 3D con vista algebraica</li>
                                                <li>Experimenta con animaciones usando deslizadores</li>
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
        const container = document.getElementById('geogebra-3d-container');
        
        // Crear iframe para GeoGebra Vista 3D
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.geogebra.org/3d?lang=es';
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
                    <h4>Error al cargar GeoGebra 3D</h4>
                    <p class="text-muted">Verifica tu conexión a internet e intenta nuevamente</p>
                    <button class="btn btn-primary" onclick="app.tools.g_3D.loadGeogebra()">
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
        const container = document.getElementById('geogebra-3d-container');
        container.innerHTML = `
            <div>
                <i class="fas fa-cube fa-3x text-muted mb-3"></i>
                <h4>Reiniciando Vista 3D...</h4>
                <p class="text-muted">La vista se está recargando</p>
            </div>
        `;
        
        // Recargar después de un breve delay
        setTimeout(() => {
            this.loadGeogebra();
        }, 1000);
    },
    
    openInNewTab: function() {
        window.open('https://www.geogebra.org/3d?lang=es', '_blank');
    }
};