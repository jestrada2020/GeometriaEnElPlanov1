// Herramienta: Concepto de Círculo
app.tools.conceptoCirculo = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-circle"></i> Concepto de Círculo</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Círculo</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Método de definición:</label>
                                    <select id="circle-method" class="form-control" onchange="app.tools.conceptoCirculo.changeMethod()">
                                        <option value="center-radius">Centro y Radio</option>
                                        <option value="equation">Ecuación General</option>
                                        <option value="three-points">Tres Puntos</option>
                                    </select>
                                </div>
                                
                                <div id="center-radius-inputs">
                                    <div class="form-group">
                                        <label for="center-x">Centro X (h):</label>
                                        <input type="number" id="center-x" class="form-control" placeholder="Coordenada x del centro" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="center-y">Centro Y (k):</label>
                                        <input type="number" id="center-y" class="form-control" placeholder="Coordenada y del centro" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="radius">Radio (r):</label>
                                        <input type="number" id="radius" class="form-control" placeholder="Radio del círculo" step="any" min="0">
                                    </div>
                                </div>
                                
                                <div id="equation-inputs" style="display: none;">
                                    <p>Ecuación: $x^2 + y^2 + Dx + Ey + F = 0$</p>
                                    <div class="form-group">
                                        <label for="coeff-d">Coeficiente D:</label>
                                        <input type="number" id="coeff-d" class="form-control" placeholder="Coeficiente D" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="coeff-e">Coeficiente E:</label>
                                        <input type="number" id="coeff-e" class="form-control" placeholder="Coeficiente E" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="coeff-f">Coeficiente F:</label>
                                        <input type="number" id="coeff-f" class="form-control" placeholder="Coeficiente F" step="any">
                                    </div>
                                </div>
                                
                                <div id="three-points-inputs" style="display: none;">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h5>Punto 1</h5>
                                            <div class="form-group">
                                                <input type="number" id="p1-x" class="form-control" placeholder="x₁" step="any">
                                            </div>
                                            <div class="form-group">
                                                <input type="number" id="p1-y" class="form-control" placeholder="y₁" step="any">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <h5>Punto 2</h5>
                                            <div class="form-group">
                                                <input type="number" id="p2-x" class="form-control" placeholder="x₂" step="any">
                                            </div>
                                            <div class="form-group">
                                                <input type="number" id="p2-y" class="form-control" placeholder="y₂" step="any">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <h5>Punto 3</h5>
                                            <div class="form-group">
                                                <input type="number" id="p3-x" class="form-control" placeholder="x₃" step="any">
                                            </div>
                                            <div class="form-group">
                                                <input type="number" id="p3-y" class="form-control" placeholder="y₃" step="any">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.conceptoCirculo.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.conceptoCirculo.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría del Círculo</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>Un círculo es el lugar geométrico de todos los puntos del plano que están a una distancia constante (radio) de un punto fijo llamado centro.</p>
                                
                                <h4>Ecuaciones</h4>
                                
                                <h5>Forma Canónica</h5>
                                <div class="math-formula">
                                    <p>$$(x - h)^2 + (y - k)^2 = r^2$$</p>
                                </div>
                                <p>Donde $(h, k)$ es el centro y $r$ es el radio.</p>
                                
                                <h5>Forma General</h5>
                                <div class="math-formula">
                                    <p>$$x^2 + y^2 + Dx + Ey + F = 0$$</p>
                                </div>
                                
                                <h5>Conversión</h5>
                                <p>Para convertir de forma general a canónica:</p>
                                <ul>
                                    <li>$h = -\\frac{D}{2}$</li>
                                    <li>$k = -\\frac{E}{2}$</li>
                                    <li>$r^2 = h^2 + k^2 - F$</li>
                                </ul>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li><strong>Área:</strong> $A = \\pi r^2$</li>
                                    <li><strong>Perímetro:</strong> $P = 2\\pi r$</li>
                                    <li><strong>Diámetro:</strong> $d = 2r$</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div id="results" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Resultados</h3>
                            </div>
                            <div class="card-body">
                                <div id="result-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div id="graph-container" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Gráfica del Círculo</h3>
                            </div>
                            <div class="card-body text-center">
                                <div id="graph-canvas"></div>
                                <small class="text-muted">Usa la rueda del mouse para zoom y arrastra para mover</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="math-controls-container-circulo"></div>
            </div>
        `;
        
        // Agregar controles de configuración matemática
        MathUtils.createControls('math-controls-container-circulo');
    },
    
    changeMethod: function() {
        const method = document.getElementById('circle-method').value;
        
        // Ocultar todos los inputs
        document.getElementById('center-radius-inputs').style.display = 'none';
        document.getElementById('equation-inputs').style.display = 'none';
        document.getElementById('three-points-inputs').style.display = 'none';
        
        // Mostrar inputs según el método seleccionado
        if (method === 'center-radius') {
            document.getElementById('center-radius-inputs').style.display = 'block';
        } else if (method === 'equation') {
            document.getElementById('equation-inputs').style.display = 'block';
        } else if (method === 'three-points') {
            document.getElementById('three-points-inputs').style.display = 'block';
        }
    },
    
    calculate: function() {
        // Actualizar configuración antes de calcular
        MathUtils.updateSettings();
        
        const method = document.getElementById('circle-method').value;
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let h, k, r;
        
        if (method === 'center-radius') {
            h = utils.parseInput(document.getElementById('center-x').value);
            k = utils.parseInput(document.getElementById('center-y').value);
            r = utils.parseInput(document.getElementById('radius').value);
            
            if (!utils.isValidNumber(document.getElementById('center-x').value) || 
                !utils.isValidNumber(document.getElementById('center-y').value) || 
                !utils.isValidNumber(document.getElementById('radius').value) || r <= 0) {
                utils.showError(resultContent, 'Por favor, ingresa valores válidos (decimales o fracciones como 3/2). El radio debe ser positivo.');
                return;
            }
        } else if (method === 'equation') {
            const D = utils.parseInput(document.getElementById('coeff-d').value);
            const E = utils.parseInput(document.getElementById('coeff-e').value);
            const F = utils.parseInput(document.getElementById('coeff-f').value);
            
            if (!utils.isValidNumber(document.getElementById('coeff-d').value) || 
                !utils.isValidNumber(document.getElementById('coeff-e').value) || 
                !utils.isValidNumber(document.getElementById('coeff-f').value)) {
                utils.showError(resultContent, 'Por favor, ingresa valores válidos para todos los coeficientes (decimales o fracciones como 1/3).');
                return;
            }
            
            h = -D / 2;
            k = -E / 2;
            const r2 = h * h + k * k - F;
            
            if (r2 <= 0) {
                utils.showError(resultContent, 'La ecuación no representa un círculo válido (r² ≤ 0).');
                return;
            }
            
            r = Math.sqrt(r2);
        } else if (method === 'three-points') {
            const x1 = utils.parseInput(document.getElementById('p1-x').value);
            const y1 = utils.parseInput(document.getElementById('p1-y').value);
            const x2 = utils.parseInput(document.getElementById('p2-x').value);
            const y2 = utils.parseInput(document.getElementById('p2-y').value);
            const x3 = utils.parseInput(document.getElementById('p3-x').value);
            const y3 = utils.parseInput(document.getElementById('p3-y').value);
            
            if (!utils.isValidNumber(document.getElementById('p1-x').value) || !utils.isValidNumber(document.getElementById('p1-y').value) || 
                !utils.isValidNumber(document.getElementById('p2-x').value) || !utils.isValidNumber(document.getElementById('p2-y').value) || 
                !utils.isValidNumber(document.getElementById('p3-x').value) || !utils.isValidNumber(document.getElementById('p3-y').value)) {
                utils.showError(resultContent, 'Por favor, ingresa valores válidos para todos los puntos (decimales o fracciones como 5/2).');
                return;
            }
            
            // Resolver sistema para encontrar centro
            const A = 2 * (x2 - x1);
            const B = 2 * (y2 - y1);
            const C = x2*x2 + y2*y2 - x1*x1 - y1*y1;
            const D = 2 * (x3 - x1);
            const E = 2 * (y3 - y1);
            const F = x3*x3 + y3*y3 - x1*x1 - y1*y1;
            
            const det = A * E - B * D;
            
            if (Math.abs(det) < 1e-10) {
                utils.showError(resultContent, 'Los puntos son colineales y no definen un círculo.');
                return;
            }
            
            h = (C * E - B * F) / det;
            k = (A * F - C * D) / det;
            r = Math.sqrt((x1 - h) * (x1 - h) + (y1 - k) * (y1 - k));
        }
        
        // Calcular propiedades
        const area = Math.PI * r * r;
        const perimeter = 2 * Math.PI * r;
        const diameter = 2 * r;
        
        // Ecuación general
        const D_coeff = -2 * h;
        const E_coeff = -2 * k;
        const F_coeff = h * h + k * k - r * r;
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Información del Círculo</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5>Parámetros Básicos</h5>
                        <ul>
                            <li><strong>Centro:</strong> $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$</li>
                            <li><strong>Radio:</strong> $r = ${utils.formatLatex(r)}$</li>
                            <li><strong>Diámetro:</strong> $d = ${utils.formatLatex(diameter)}$</li>
                        </ul>
                        
                        <h5>Propiedades</h5>
                        <ul>
                            <li><strong>Área:</strong> $A = \\pi r^2 = ${utils.formatLatex(area)}$</li>
                            <li><strong>Perímetro:</strong> $P = 2\\pi r = ${utils.formatLatex(perimeter)}$</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5>Ecuaciones</h5>
                        <p><strong>Forma Canónica:</strong></p>
                        <div class="math-formula">
                            <p>$$(x - ${utils.formatLatex(h)})^2 + (y - ${utils.formatLatex(k)})^2 = ${utils.formatLatex(r * r)}$$</p>
                        </div>
                        
                        <p><strong>Forma General:</strong></p>
                        <div class="math-formula">
                            <p>$$x^2 + y^2 + ${utils.formatLatex(D_coeff)}x + ${utils.formatLatex(E_coeff)}y + ${utils.formatLatex(F_coeff)} = 0$$</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(h, k, r);
        
        app.reprocessMathJax();
    },
    
    drawGraph: function(h, k, r) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Círculo');
            
            if (plotId) {
                // Dibujar círculo
                Grapher.drawCircle(plotId, h, k, r, {
                    color: 'blue',
                    width: 3,
                    name: `Círculo: r = ${r.toFixed(2)}`
                });
                
                // Dibujar radio (línea desde centro a un punto en el círculo)
                Grapher.drawLine(plotId, h, k, h + r, k, {
                    color: 'green',
                    width: 2,
                    name: `Radio = ${r.toFixed(2)}`
                });
                
                // Marcar punto en el círculo donde termina el radio
                Grapher.drawPoints(plotId, [{
                    x: h + r, 
                    y: k, 
                    label: `Radio = ${r.toFixed(2)}`
                }], {
                    color: 'green',
                    size: 8,
                    name: 'Punto del radio',
                    symbol: 'circle'
                });
                
                // Configurar rango apropiado
                const margin = r * 1.3;
                Grapher.updateRange(plotId, 
                    [h - margin, h + margin],
                    [k - margin, k + margin]
                );
                
                // Agregar controles de navegación con modal
                Grapher.addNavigationControls(plotId, 'graph-container', 'Concepto de Círculo');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['center-x', 'center-y', 'radius', 'coeff-d', 'coeff-e', 'coeff-f', 
                       'p1-x', 'p1-y', 'p2-x', 'p2-y', 'p3-x', 'p3-y'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};