// Herramienta: Intersección entre Línea y Parábola Vertical
app.tools.lineaParabola = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-project-diagram"></i> Intersección: Línea y Parábola Vertical</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Configuración de la Línea</h3>
                            </div>
                            <div class="card-body">
                                <p>Ecuación de la línea: $ax + by + c = 0$</p>
                                <div class="form-group">
                                    <label for="line-a">Coeficiente a:</label>
                                    <input type="number" id="line-a" class="form-control" placeholder="Coeficiente de x" step="any" value="1">
                                </div>
                                <div class="form-group">
                                    <label for="line-b">Coeficiente b:</label>
                                    <input type="number" id="line-b" class="form-control" placeholder="Coeficiente de y" step="any" value="-1">
                                </div>
                                <div class="form-group">
                                    <label for="line-c">Término independiente c:</label>
                                    <input type="number" id="line-c" class="form-control" placeholder="Término independiente" step="any" value="0">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Configuración de la Parábola</h3>
                            </div>
                            <div class="card-body">
                                <p>Parábola vertical: $y = a(x - h)^2 + k$</p>
                                <div class="form-group">
                                    <label for="parabola-h">Vértice h (coordenada x):</label>
                                    <input type="number" id="parabola-h" class="form-control" placeholder="Coordenada x del vértice" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="parabola-k">Vértice k (coordenada y):</label>
                                    <input type="number" id="parabola-k" class="form-control" placeholder="Coordenada y del vértice" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="parabola-a">Parámetro a:</label>
                                    <input type="number" id="parabola-a" class="form-control" placeholder="Parámetro a (determina apertura)" step="any" value="1">
                                    <small class="text-muted">Si a > 0: hacia arriba, si a < 0: hacia abajo</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-3">
                    <button class="btn btn-primary" onclick="app.tools.lineaParabola.calculate()">
                        <i class="fas fa-calculator"></i> Calcular Intersecciones
                    </button>
                    <button class="btn btn-secondary" onclick="app.tools.lineaParabola.clear()">
                        <i class="fas fa-eraser"></i> Limpiar
                    </button>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div id="results" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Resultados del Análisis</h3>
                            </div>
                            <div class="card-body">
                                <div id="result-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div id="graph-container" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Visualización Gráfica</h3>
                            </div>
                            <div class="card-body text-center">
                                <div id="graph-canvas"></div>
                                <small class="text-muted">Las intersecciones se muestran como puntos destacados</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="math-controls-container"></div>
            </div>
        `;
        
        // Agregar controles de configuración matemática
        try {
            MathUtils.createControls('math-controls-container');
        } catch (e) {
            console.warn('No se pudieron crear los controles matemáticos:', e);
        }
    },
    
    calculate: function() {
        // Actualizar configuración antes de calcular
        try {
            MathUtils.updateSettings();
        } catch (e) {
            console.warn('Error updating settings:', e);
        }
        
        // Obtener parámetros de la línea
        const lineA = utils.parseInput ? utils.parseInput(document.getElementById('line-a').value) : parseFloat(document.getElementById('line-a').value) || 0;
        const lineB = utils.parseInput ? utils.parseInput(document.getElementById('line-b').value) : parseFloat(document.getElementById('line-b').value) || 0;
        const lineC = utils.parseInput ? utils.parseInput(document.getElementById('line-c').value) : parseFloat(document.getElementById('line-c').value) || 0;
        
        // Obtener parámetros de la parábola
        const h = utils.parseInput ? utils.parseInput(document.getElementById('parabola-h').value) : parseFloat(document.getElementById('parabola-h').value) || 0;
        const k = utils.parseInput ? utils.parseInput(document.getElementById('parabola-k').value) : parseFloat(document.getElementById('parabola-k').value) || 0;
        const a = utils.parseInput ? utils.parseInput(document.getElementById('parabola-a').value) : parseFloat(document.getElementById('parabola-a').value) || 1;
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validar que la línea no sea degenerada
        if (lineA === 0 && lineB === 0) {
            utils.showError(resultContent, 'Los coeficientes a y b de la línea no pueden ser ambos cero.');
            return;
        }
        
        if (a === 0) {
            utils.showError(resultContent, 'El parámetro a de la parábola no puede ser cero.');
            return;
        }
        
        // Calcular intersecciones
        const intersections = this.findIntersections(lineA, lineB, lineC, h, k, a);
        
        // Mostrar resultados
        this.displayResults(lineA, lineB, lineC, h, k, a, intersections);
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(lineA, lineB, lineC, h, k, a, intersections);
        
        app.reprocessMathJax();
    },
    
    findIntersections: function(lineA, lineB, lineC, h, k, a) {
        // Línea: ax + by + c = 0
        // Parábola: y = a(x - h)² + k
        
        const intersections = [];
        
        if (lineB !== 0) {
            // Despejar y de la línea: y = -(ax + c)/b
            // Sustituir en la parábola: -(ax + c)/b = a(x - h)² + k
            // Reorganizar: a(x - h)² + k + (ax + c)/b = 0
            // Multiplicar por b: ab(x - h)² + bk + ax + c = 0
            // ab(x² - 2hx + h²) + bk + ax + c = 0
            // abx² - 2abhx + abh² + bk + ax + c = 0
            // abx² + (a - 2abh)x + (abh² + bk + c) = 0
            
            const A = a * lineB;
            const B = lineA - 2 * a * lineB * h;
            const C = a * lineB * h * h + lineB * k + lineC;
            
            const discriminant = B * B - 4 * A * C;
            
            if (discriminant > 0) {
                // Dos intersecciones
                const x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
                const x2 = (-B - Math.sqrt(discriminant)) / (2 * A);
                const y1 = -(lineA * x1 + lineC) / lineB;
                const y2 = -(lineA * x2 + lineC) / lineB;
                
                intersections.push({x: x1, y: y1, type: 'intersection'});
                intersections.push({x: x2, y: y2, type: 'intersection'});
            } else if (discriminant === 0) {
                // Una intersección (tangente)
                const x1 = -B / (2 * A);
                const y1 = -(lineA * x1 + lineC) / lineB;
                
                intersections.push({x: x1, y: y1, type: 'tangent'});
            }
            // Si discriminant < 0, no hay intersecciones reales
        } else if (lineA !== 0) {
            // Línea vertical: x = -c/a
            const x = -lineC / lineA;
            const y = a * (x - h) * (x - h) + k;
            
            intersections.push({x: x, y: y, type: 'intersection'});
        }
        
        return intersections;
    },
    
    displayResults: function(lineA, lineB, lineC, h, k, a, intersections) {
        const resultContent = document.getElementById('result-content');
        
        let lineEquation = '';
        if (lineB !== 0) {
            const slope = -lineA / lineB;
            const yIntercept = -lineC / lineB;
            lineEquation = `y = ${utils.formatLatex ? utils.formatLatex(slope) : slope.toFixed(3)}x + ${utils.formatLatex ? utils.formatLatex(yIntercept) : yIntercept.toFixed(3)}`;
        } else {
            lineEquation = `x = ${utils.formatLatex ? utils.formatLatex(-lineC / lineA) : (-lineC / lineA).toFixed(3)}`;
        }
        
        const parabolaDirection = a > 0 ? 'hacia arriba' : 'hacia abajo';
        
        let intersectionResults = '';
        if (intersections.length === 0) {
            intersectionResults = `
                <div class="alert alert-info">
                    <h5><i class="fas fa-info-circle"></i> Sin intersecciones</h5>
                    <p>La línea y la parábola no se intersectan en el plano real.</p>
                </div>
            `;
        } else if (intersections.length === 1) {
            const point = intersections[0];
            intersectionResults = `
                <div class="alert alert-warning">
                    <h5><i class="fas fa-hand-point-right"></i> Intersección tangente</h5>
                    <p>La línea es tangente a la parábola en el punto:</p>
                    <p class="text-center"><strong>$(${utils.formatLatex ? utils.formatLatex(point.x) : point.x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(point.y) : point.y.toFixed(3)})$</strong></p>
                </div>
            `;
        } else {
            intersectionResults = `
                <div class="alert alert-success">
                    <h5><i class="fas fa-intersection"></i> Dos intersecciones</h5>
                    <p>La línea intersecta la parábola en dos puntos:</p>
                    <ul>
                        <li>Punto 1: $(${utils.formatLatex ? utils.formatLatex(intersections[0].x) : intersections[0].x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(intersections[0].y) : intersections[0].y.toFixed(3)})$</li>
                        <li>Punto 2: $(${utils.formatLatex ? utils.formatLatex(intersections[1].x) : intersections[1].x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(intersections[1].y) : intersections[1].y.toFixed(3)})$</li>
                    </ul>
                </div>
            `;
        }
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Ecuaciones del Sistema:</h4>
                <p><strong>Línea:</strong></p>
                <div class="math-formula">
                    <p>$$${lineA}x + ${lineB}y + ${lineC} = 0$$</p>
                    <p>$$${lineEquation}$$</p>
                </div>
                
                <p><strong>Parábola Vertical (${parabolaDirection}):</strong></p>
                <div class="math-formula">
                    <p>$$y = ${utils.formatLatex ? utils.formatLatex(a) : a.toFixed(3)}(x - ${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)})^2 + ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)}$$</p>
                    <p>Vértice: $(${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})$</p>
                </div>
                
                ${intersectionResults}
            </div>
        `;
    },
    
    drawGraph: function(lineA, lineB, lineC, h, k, a, intersections) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 500, 400, 'Intersección: Línea y Parábola Vertical');
            
            if (plotId) {
                // Determinar rango apropiado
                let xMin = h - 5, xMax = h + 5;
                let yMin = k - 5, yMax = k + 5;
                
                if (intersections.length > 0) {
                    const xValues = intersections.map(p => p.x);
                    const yValues = intersections.map(p => p.y);
                    xMin = Math.min(xMin, ...xValues) - 2;
                    xMax = Math.max(xMax, ...xValues) + 2;
                    yMin = Math.min(yMin, ...yValues) - 2;
                    yMax = Math.max(yMax, ...yValues) + 2;
                }
                
                // Dibujar parábola
                Grapher.drawParabola(plotId, h, k, a, {
                    color: 'blue',
                    width: 3,
                    name: `Parábola: y = ${a.toFixed(2)}(x - ${h.toFixed(2)})² + ${k.toFixed(2)}`,
                    isVertical: true,
                    range: Math.max(Math.abs(xMax - h), Math.abs(xMin - h))
                });
                
                // Dibujar línea
                if (lineB !== 0) {
                    // Línea no vertical
                    const y1 = -(lineA * xMin + lineC) / lineB;
                    const y2 = -(lineA * xMax + lineC) / lineB;
                    Grapher.drawLine(plotId, xMin, y1, xMax, y2, {
                        color: 'red',
                        width: 3,
                        name: `Línea: ${lineA}x + ${lineB}y + ${lineC} = 0`
                    });
                } else {
                    // Línea vertical
                    const x = -lineC / lineA;
                    Grapher.drawLine(plotId, x, yMin, x, yMax, {
                        color: 'red',
                        width: 3,
                        name: `Línea vertical: x = ${x.toFixed(2)}`
                    });
                }
                
                // Dibujar intersecciones
                if (intersections.length > 0) {
                    const intersectionPoints = intersections.map((point, index) => ({
                        x: point.x,
                        y: point.y,
                        label: `P${index + 1}(${point.x.toFixed(2)}, ${point.y.toFixed(2)})`
                    }));
                    
                    Grapher.drawPoints(plotId, intersectionPoints, {
                        color: 'green',
                        size: 12,
                        name: intersections.length === 1 ? 'Punto de tangencia' : 'Intersecciones',
                        symbol: 'star'
                    });
                }
                
                // Ajustar rango del gráfico
                const margin = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin)) * 0.1;
                Grapher.updateRange(plotId, 
                    [xMin - margin, xMax + margin],
                    [yMin - margin, yMax + margin]
                );
                
                // Agregar controles de navegación con modal
                Grapher.addNavigationControls(plotId, 'graph-container', 'Intersección: Línea y Parábola Vertical');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['line-a', 'line-b', 'line-c', 'parabola-h', 'parabola-k', 'parabola-a'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Restaurar valores por defecto
        document.getElementById('line-a').value = '1';
        document.getElementById('line-b').value = '-1';
        document.getElementById('line-c').value = '0';
        document.getElementById('parabola-h').value = '0';
        document.getElementById('parabola-k').value = '0';
        document.getElementById('parabola-a').value = '1';
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};