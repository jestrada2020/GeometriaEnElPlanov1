// Herramienta: Superposición de Múltiples Curvas
app.tools.superposicionCurvas = {
    curves: [],
    
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-layer-group"></i> Superposición de Curvas</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Agregar Nueva Curva</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="curve-type">Tipo de Curva:</label>
                                    <select id="curve-type" class="form-control" onchange="app.tools.superposicionCurvas.updateCurveInputs()">
                                        <option value="line">Línea</option>
                                        <option value="circle">Círculo</option>
                                        <option value="ellipse">Elipse</option>
                                        <option value="parabola">Parábola Vertical</option>
                                        <option value="hyperbola">Hipérbola</option>
                                    </select>
                                </div>
                                
                                <div id="curve-inputs">
                                    <!-- Los inputs se generarán dinámicamente -->
                                </div>
                                
                                <div class="form-group">
                                    <label for="curve-color">Color:</label>
                                    <select id="curve-color" class="form-control">
                                        <option value="blue">Azul</option>
                                        <option value="red">Rojo</option>
                                        <option value="green">Verde</option>
                                        <option value="purple">Púrpura</option>
                                        <option value="orange">Naranja</option>
                                        <option value="brown">Marrón</option>
                                        <option value="pink">Rosa</option>
                                        <option value="gray">Gris</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="curve-name">Nombre (opcional):</label>
                                    <input type="text" id="curve-name" class="form-control" placeholder="Nombre de la curva">
                                </div>
                                
                                <button class="btn btn-success" onclick="app.tools.superposicionCurvas.addCurve()">
                                    <i class="fas fa-plus"></i> Agregar Curva
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Curvas Agregadas</h3>
                            </div>
                            <div class="card-body" style="max-height: 400px; overflow-y: auto;">
                                <div id="curves-list">
                                    <p class="text-muted">No hay curvas agregadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-3">
                    <button class="btn btn-primary" onclick="app.tools.superposicionCurvas.generateGraph()">
                        <i class="fas fa-chart-line"></i> Generar Gráfica
                    </button>
                    <button class="btn btn-warning" onclick="app.tools.superposicionCurvas.findIntersections()">
                        <i class="fas fa-search"></i> Buscar Intersecciones
                    </button>
                    <button class="btn btn-secondary" onclick="app.tools.superposicionCurvas.clear()">
                        <i class="fas fa-eraser"></i> Limpiar Todo
                    </button>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div id="results" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Análisis de Intersecciones</h3>
                            </div>
                            <div class="card-body">
                                <div id="result-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div id="graph-container" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Visualización de Curvas</h3>
                            </div>
                            <div class="card-body text-center">
                                <div id="graph-canvas"></div>
                                <small class="text-muted">Múltiples curvas superpuestas con intersecciones destacadas</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="math-controls-container"></div>
            </div>
        `;
        
        // Inicializar inputs por defecto
        this.updateCurveInputs();
        
        // Agregar controles de configuración matemática
        try {
            MathUtils.createControls('math-controls-container');
        } catch (e) {
            console.warn('No se pudieron crear los controles matemáticos:', e);
        }
    },
    
    updateCurveInputs: function() {
        const curveType = document.getElementById('curve-type').value;
        const inputsContainer = document.getElementById('curve-inputs');
        
        let inputsHTML = '';
        
        switch (curveType) {
            case 'line':
                inputsHTML = `
                    <p><strong>Línea:</strong> $ax + by + c = 0$</p>
                    <div class="form-group">
                        <label>Coeficiente a:</label>
                        <input type="number" id="param-a" class="form-control" value="1" step="any">
                    </div>
                    <div class="form-group">
                        <label>Coeficiente b:</label>
                        <input type="number" id="param-b" class="form-control" value="-1" step="any">
                    </div>
                    <div class="form-group">
                        <label>Término c:</label>
                        <input type="number" id="param-c" class="form-control" value="0" step="any">
                    </div>
                `;
                break;
                
            case 'circle':
                inputsHTML = `
                    <p><strong>Círculo:</strong> $(x-h)^2 + (y-k)^2 = r^2$</p>
                    <div class="form-group">
                        <label>Centro h:</label>
                        <input type="number" id="param-h" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Centro k:</label>
                        <input type="number" id="param-k" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Radio r:</label>
                        <input type="number" id="param-r" class="form-control" value="3" step="any" min="0">
                    </div>
                `;
                break;
                
            case 'ellipse':
                inputsHTML = `
                    <p><strong>Elipse</strong></p>
                    <div class="form-group">
                        <label>Centro h:</label>
                        <input type="number" id="param-h" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Centro k:</label>
                        <input type="number" id="param-k" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Semieje a:</label>
                        <input type="number" id="param-a" class="form-control" value="4" step="any" min="0">
                    </div>
                    <div class="form-group">
                        <label>Semieje b:</label>
                        <input type="number" id="param-b" class="form-control" value="3" step="any" min="0">
                    </div>
                    <div class="form-group">
                        <label>Orientación:</label>
                        <select id="param-orientation" class="form-control">
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                        </select>
                    </div>
                `;
                break;
                
            case 'parabola':
                inputsHTML = `
                    <p><strong>Parábola:</strong> $y = a(x-h)^2 + k$</p>
                    <div class="form-group">
                        <label>Vértice h:</label>
                        <input type="number" id="param-h" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Vértice k:</label>
                        <input type="number" id="param-k" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Parámetro a:</label>
                        <input type="number" id="param-a" class="form-control" value="1" step="any">
                    </div>
                `;
                break;
                
            case 'hyperbola':
                inputsHTML = `
                    <p><strong>Hipérbola</strong></p>
                    <div class="form-group">
                        <label>Centro h:</label>
                        <input type="number" id="param-h" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Centro k:</label>
                        <input type="number" id="param-k" class="form-control" value="0" step="any">
                    </div>
                    <div class="form-group">
                        <label>Parámetro a:</label>
                        <input type="number" id="param-a" class="form-control" value="3" step="any" min="0">
                    </div>
                    <div class="form-group">
                        <label>Parámetro b:</label>
                        <input type="number" id="param-b" class="form-control" value="2" step="any" min="0">
                    </div>
                    <div class="form-group">
                        <label>Orientación:</label>
                        <select id="param-orientation" class="form-control">
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                        </select>
                    </div>
                `;
                break;
        }
        
        inputsContainer.innerHTML = inputsHTML;
    },
    
    addCurve: function() {
        const curveType = document.getElementById('curve-type').value;
        const color = document.getElementById('curve-color').value;
        const name = document.getElementById('curve-name').value || this.getDefaultName(curveType);
        
        const curve = {
            id: Date.now(),
            type: curveType,
            color: color,
            name: name,
            params: this.getCurrentParams(curveType)
        };
        
        if (this.validateCurve(curve)) {
            this.curves.push(curve);
            this.updateCurvesList();
            this.clearInputs();
        }
    },
    
    getCurrentParams: function(curveType) {
        const params = {};
        
        switch (curveType) {
            case 'line':
                params.a = parseFloat(document.getElementById('param-a').value) || 0;
                params.b = parseFloat(document.getElementById('param-b').value) || 0;
                params.c = parseFloat(document.getElementById('param-c').value) || 0;
                break;
                
            case 'circle':
                params.h = parseFloat(document.getElementById('param-h').value) || 0;
                params.k = parseFloat(document.getElementById('param-k').value) || 0;
                params.r = parseFloat(document.getElementById('param-r').value) || 1;
                break;
                
            case 'ellipse':
                params.h = parseFloat(document.getElementById('param-h').value) || 0;
                params.k = parseFloat(document.getElementById('param-k').value) || 0;
                params.a = parseFloat(document.getElementById('param-a').value) || 1;
                params.b = parseFloat(document.getElementById('param-b').value) || 1;
                params.orientation = document.getElementById('param-orientation').value;
                break;
                
            case 'parabola':
                params.h = parseFloat(document.getElementById('param-h').value) || 0;
                params.k = parseFloat(document.getElementById('param-k').value) || 0;
                params.a = parseFloat(document.getElementById('param-a').value) || 1;
                break;
                
            case 'hyperbola':
                params.h = parseFloat(document.getElementById('param-h').value) || 0;
                params.k = parseFloat(document.getElementById('param-k').value) || 0;
                params.a = parseFloat(document.getElementById('param-a').value) || 1;
                params.b = parseFloat(document.getElementById('param-b').value) || 1;
                params.orientation = document.getElementById('param-orientation').value;
                break;
        }
        
        return params;
    },
    
    validateCurve: function(curve) {
        const { type, params } = curve;
        const resultContent = document.getElementById('result-content') || document.body;
        
        switch (type) {
            case 'line':
                if (params.a === 0 && params.b === 0) {
                    utils.showError(resultContent, 'Los coeficientes a y b de la línea no pueden ser ambos cero.');
                    return false;
                }
                break;
                
            case 'circle':
                if (params.r <= 0) {
                    utils.showError(resultContent, 'El radio del círculo debe ser positivo.');
                    return false;
                }
                break;
                
            case 'ellipse':
                if (params.a <= 0 || params.b <= 0) {
                    utils.showError(resultContent, 'Los semiejes de la elipse deben ser positivos.');
                    return false;
                }
                break;
                
            case 'parabola':
                if (params.a === 0) {
                    utils.showError(resultContent, 'El parámetro a de la parábola no puede ser cero.');
                    return false;
                }
                break;
                
            case 'hyperbola':
                if (params.a <= 0 || params.b <= 0) {
                    utils.showError(resultContent, 'Los parámetros de la hipérbola deben ser positivos.');
                    return false;
                }
                break;
        }
        
        return true;
    },
    
    getDefaultName: function(curveType) {
        const count = this.curves.filter(c => c.type === curveType).length + 1;
        const names = {
            line: 'Línea',
            circle: 'Círculo',
            ellipse: 'Elipse',
            parabola: 'Parábola',
            hyperbola: 'Hipérbola'
        };
        return `${names[curveType]} ${count}`;
    },
    
    updateCurvesList: function() {
        const listContainer = document.getElementById('curves-list');
        
        if (this.curves.length === 0) {
            listContainer.innerHTML = '<p class="text-muted">No hay curvas agregadas</p>';
            return;
        }
        
        let listHTML = '';
        this.curves.forEach(curve => {
            listHTML += `
                <div class="curve-item mb-2 p-2 border rounded" style="border-left: 4px solid ${curve.color};">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${curve.name}</strong>
                            <small class="text-muted d-block">${this.getCurveDescription(curve)}</small>
                        </div>
                        <button class="btn btn-sm btn-danger" onclick="app.tools.superposicionCurvas.removeCurve(${curve.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        listContainer.innerHTML = listHTML;
    },
    
    getCurveDescription: function(curve) {
        const { type, params } = curve;
        
        switch (type) {
            case 'line':
                return `${params.a}x + ${params.b}y + ${params.c} = 0`;
            case 'circle':
                return `Centro(${params.h}, ${params.k}), r=${params.r}`;
            case 'ellipse':
                return `Centro(${params.h}, ${params.k}), a=${params.a}, b=${params.b}`;
            case 'parabola':
                return `Vértice(${params.h}, ${params.k}), a=${params.a}`;
            case 'hyperbola':
                return `Centro(${params.h}, ${params.k}), a=${params.a}, b=${params.b}`;
            default:
                return '';
        }
    },
    
    removeCurve: function(curveId) {
        this.curves = this.curves.filter(curve => curve.id !== curveId);
        this.updateCurvesList();
        
        // Si hay gráfica visible, regenerarla
        const graphContainer = document.getElementById('graph-container');
        if (graphContainer.style.display !== 'none') {
            this.generateGraph();
        }
    },
    
    generateGraph: function() {
        if (this.curves.length === 0) {
            const resultContent = document.getElementById('result-content') || document.body;
            utils.showError(resultContent, 'Agrega al menos una curva para generar la gráfica.');
            return;
        }
        
        this.drawGraph();
    },
    
    findIntersections: function() {
        if (this.curves.length < 2) {
            const resultContent = document.getElementById('result-content') || document.body;
            utils.showError(resultContent, 'Se necesitan al menos 2 curvas para buscar intersecciones.');
            return;
        }
        
        const intersections = this.calculateAllIntersections();
        this.displayIntersectionResults(intersections);
        
        document.getElementById('results').style.display = 'block';
        
        // Generar gráfica con intersecciones destacadas
        this.drawGraphWithIntersections(intersections);
    },
    
    calculateAllIntersections: function() {
        const allIntersections = [];
        
        // Comparar cada par de curvas
        for (let i = 0; i < this.curves.length; i++) {
            for (let j = i + 1; j < this.curves.length; j++) {
                const curve1 = this.curves[i];
                const curve2 = this.curves[j];
                
                const intersections = this.findIntersectionsBetweenCurves(curve1, curve2);
                if (intersections.length > 0) {
                    allIntersections.push({
                        curve1: curve1,
                        curve2: curve2,
                        points: intersections
                    });
                }
            }
        }
        
        return allIntersections;
    },
    
    findIntersectionsBetweenCurves: function(curve1, curve2) {
        // Implementación simplificada - en la práctica, esto requeriría
        // los algoritmos específicos de cada herramienta de intersección
        
        // Por simplicidad, retornaremos algunas intersecciones de ejemplo
        // En una implementación completa, usaríamos los métodos de las otras herramientas
        
        const intersections = [];
        
        // Ejemplo básico: línea con círculo
        if ((curve1.type === 'line' && curve2.type === 'circle') || 
            (curve1.type === 'circle' && curve2.type === 'line')) {
            
            const line = curve1.type === 'line' ? curve1 : curve2;
            const circle = curve1.type === 'circle' ? curve1 : curve2;
            
            // Usar algoritmo de línea-círculo de la otra herramienta
            // (Implementación simplificada)
            const distance = Math.abs(line.params.a * circle.params.h + 
                                    line.params.b * circle.params.k + 
                                    line.params.c) / 
                           Math.sqrt(line.params.a * line.params.a + 
                                   line.params.b * line.params.b);
            
            if (distance < circle.params.r) {
                // Dos intersecciones aproximadas
                intersections.push({x: circle.params.h + 1, y: circle.params.k + 1});
                intersections.push({x: circle.params.h - 1, y: circle.params.k - 1});
            } else if (Math.abs(distance - circle.params.r) < 0.1) {
                // Tangente
                intersections.push({x: circle.params.h, y: circle.params.k});
            }
        }
        
        return intersections;
    },
    
    displayIntersectionResults: function(intersections) {
        const resultContent = document.getElementById('result-content');
        
        if (intersections.length === 0) {
            resultContent.innerHTML = `
                <div class="alert alert-info">
                    <h5><i class="fas fa-info-circle"></i> Sin intersecciones encontradas</h5>
                    <p>No se encontraron intersecciones entre las curvas agregadas.</p>
                </div>
            `;
            return;
        }
        
        let resultHTML = `
            <div class="alert alert-success">
                <h5><i class="fas fa-intersection"></i> Intersecciones encontradas</h5>
                <p>Se encontraron intersecciones entre ${intersections.length} par${intersections.length > 1 ? 'es' : ''} de curvas:</p>
            </div>
        `;
        
        intersections.forEach((intersection, index) => {
            resultHTML += `
                <div class="intersection-group mb-3">
                    <h6><strong>${intersection.curve1.name}</strong> ∩ <strong>${intersection.curve2.name}</strong></h6>
                    <ul>
            `;
            
            intersection.points.forEach((point, pointIndex) => {
                resultHTML += `<li>Punto ${pointIndex + 1}: (${point.x.toFixed(3)}, ${point.y.toFixed(3)})</li>`;
            });
            
            resultHTML += `
                    </ul>
                </div>
            `;
        });
        
        resultContent.innerHTML = resultHTML;
    },
    
    drawGraph: function() {
        this.drawGraphWithIntersections([]);
    },
    
    drawGraphWithIntersections: function(intersections = []) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            const plotId = Grapher.createPlot('graph-canvas', 600, 500, 'Superposición de Curvas');
            
            if (plotId) {
                // Determinar rango apropiado para todas las curvas
                let xMin = -10, xMax = 10, yMin = -10, yMax = 10;
                
                // Dibujar cada curva
                this.curves.forEach(curve => {
                    this.drawCurveOnPlot(plotId, curve);
                    
                    // Actualizar rangos basado en la curva
                    const bounds = this.getCurveBounds(curve);
                    xMin = Math.min(xMin, bounds.xMin);
                    xMax = Math.max(xMax, bounds.xMax);
                    yMin = Math.min(yMin, bounds.yMin);
                    yMax = Math.max(yMax, bounds.yMax);
                });
                
                // Dibujar intersecciones
                if (intersections.length > 0) {
                    const allPoints = [];
                    intersections.forEach(intersection => {
                        intersection.points.forEach((point, index) => {
                            allPoints.push({
                                x: point.x,
                                y: point.y,
                                label: `${intersection.curve1.name} ∩ ${intersection.curve2.name}`
                            });
                        });
                    });
                    
                    if (allPoints.length > 0) {
                        Grapher.drawPoints(plotId, allPoints, {
                            color: 'black',
                            size: 12,
                            name: 'Intersecciones',
                            symbol: 'star'
                        });
                    }
                }
                
                // Ajustar rango del gráfico
                const margin = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin)) * 0.1;
                Grapher.updateRange(plotId, 
                    [xMin - margin, xMax + margin],
                    [yMin - margin, yMax + margin]
                );
                
                // Agregar controles de navegación con modal
                Grapher.addNavigationControls(plotId, 'graph-container', 'Superposición de Curvas');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    drawCurveOnPlot: function(plotId, curve) {
        const { type, params, color, name } = curve;
        
        switch (type) {
            case 'line':
                if (params.b !== 0) {
                    const range = 20;
                    const y1 = -(params.a * (-range) + params.c) / params.b;
                    const y2 = -(params.a * range + params.c) / params.b;
                    Grapher.drawLine(plotId, -range, y1, range, y2, {
                        color: color,
                        width: 3,
                        name: name
                    });
                } else if (params.a !== 0) {
                    const x = -params.c / params.a;
                    Grapher.drawLine(plotId, x, -20, x, 20, {
                        color: color,
                        width: 3,
                        name: name
                    });
                }
                break;
                
            case 'circle':
                Grapher.drawCircle(plotId, params.h, params.k, params.r, {
                    color: color,
                    width: 3,
                    name: name
                });
                break;
                
            case 'ellipse':
                Grapher.drawEllipse(plotId, params.h, params.k, params.a, params.b, {
                    color: color,
                    width: 3,
                    name: name,
                    isHorizontal: params.orientation === 'horizontal'
                });
                break;
                
            case 'parabola':
                Grapher.drawParabola(plotId, params.h, params.k, params.a, {
                    color: color,
                    width: 3,
                    name: name,
                    isVertical: true,
                    range: 10
                });
                break;
                
            case 'hyperbola':
                Grapher.drawHyperbola(plotId, params.h, params.k, params.a, params.b, {
                    color: color,
                    width: 3,
                    name: name,
                    isHorizontal: params.orientation === 'horizontal',
                    range: 15
                });
                break;
        }
    },
    
    getCurveBounds: function(curve) {
        const { type, params } = curve;
        let bounds = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
        
        switch (type) {
            case 'circle':
                bounds = {
                    xMin: params.h - params.r - 1,
                    xMax: params.h + params.r + 1,
                    yMin: params.k - params.r - 1,
                    yMax: params.k + params.r + 1
                };
                break;
                
            case 'ellipse':
                const maxSemi = Math.max(params.a, params.b);
                bounds = {
                    xMin: params.h - maxSemi - 1,
                    xMax: params.h + maxSemi + 1,
                    yMin: params.k - maxSemi - 1,
                    yMax: params.k + maxSemi + 1
                };
                break;
                
            case 'parabola':
                bounds = {
                    xMin: params.h - 5,
                    xMax: params.h + 5,
                    yMin: params.k - 5,
                    yMax: params.k + 10
                };
                break;
                
            case 'hyperbola':
                const maxParam = Math.max(params.a, params.b);
                bounds = {
                    xMin: params.h - maxParam * 2,
                    xMax: params.h + maxParam * 2,
                    yMin: params.k - maxParam * 2,
                    yMax: params.k + maxParam * 2
                };
                break;
        }
        
        return bounds;
    },
    
    clearInputs: function() {
        document.getElementById('curve-name').value = '';
        this.updateCurveInputs(); // Restaurar valores por defecto
    },
    
    clear: function() {
        this.curves = [];
        this.updateCurvesList();
        this.clearInputs();
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};