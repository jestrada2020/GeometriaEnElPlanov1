// Herramienta: Intersección entre Línea y Círculo
app.tools.lineaCirculo = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-circle-notch"></i> Intersección: Línea y Círculo</h2>
                
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
                                    <input type="number" id="line-c" class="form-control" placeholder="Término independiente" step="any" value="2">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Configuración del Círculo</h3>
                            </div>
                            <div class="card-body">
                                <p>Círculo: $(x - h)^2 + (y - k)^2 = r^2$</p>
                                <div class="form-group">
                                    <label for="circle-h">Centro h (coordenada x):</label>
                                    <input type="number" id="circle-h" class="form-control" placeholder="Coordenada x del centro" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="circle-k">Centro k (coordenada y):</label>
                                    <input type="number" id="circle-k" class="form-control" placeholder="Coordenada y del centro" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="circle-r">Radio r:</label>
                                    <input type="number" id="circle-r" class="form-control" placeholder="Radio del círculo" step="any" min="0" value="3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-3">
                    <button class="btn btn-primary" onclick="app.tools.lineaCirculo.calculate()">
                        <i class="fas fa-calculator"></i> Calcular Intersecciones
                    </button>
                    <button class="btn btn-secondary" onclick="app.tools.lineaCirculo.clear()">
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
        
        // Obtener parámetros del círculo
        const h = utils.parseInput ? utils.parseInput(document.getElementById('circle-h').value) : parseFloat(document.getElementById('circle-h').value) || 0;
        const k = utils.parseInput ? utils.parseInput(document.getElementById('circle-k').value) : parseFloat(document.getElementById('circle-k').value) || 0;
        const r = utils.parseInput ? utils.parseInput(document.getElementById('circle-r').value) : parseFloat(document.getElementById('circle-r').value) || 1;
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validar que la línea no sea degenerada
        if (lineA === 0 && lineB === 0) {
            utils.showError(resultContent, 'Los coeficientes a y b de la línea no pueden ser ambos cero.');
            return;
        }
        
        if (r <= 0) {
            utils.showError(resultContent, 'El radio del círculo debe ser positivo.');
            return;
        }
        
        // Calcular intersecciones
        const intersections = this.findIntersections(lineA, lineB, lineC, h, k, r);
        
        // Calcular distancia del centro a la línea
        const distance = this.distancePointToLine(h, k, lineA, lineB, lineC);
        
        // Mostrar resultados
        this.displayResults(lineA, lineB, lineC, h, k, r, intersections, distance);
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(lineA, lineB, lineC, h, k, r, intersections);
        
        app.reprocessMathJax();
    },
    
    distancePointToLine: function(px, py, a, b, c) {
        return Math.abs(a * px + b * py + c) / Math.sqrt(a * a + b * b);
    },
    
    findIntersections: function(lineA, lineB, lineC, h, k, r) {
        // Línea: ax + by + c = 0
        // Círculo: (x - h)² + (y - k)² = r²
        
        const intersections = [];
        
        if (lineB !== 0) {
            // Despejar y de la línea: y = -(ax + c)/b
            // Sustituir en el círculo: (x - h)² + (-(ax + c)/b - k)² = r²
            // Simplificar: (x - h)² + ((ax + c)/b + k)² = r²
            
            const A = 1 + (lineA * lineA) / (lineB * lineB);
            const B = -2 * h + (2 * lineA * (lineC + lineB * k)) / (lineB * lineB);
            const C = h * h + ((lineC + lineB * k) * (lineC + lineB * k)) / (lineB * lineB) - r * r;
            
            const discriminant = B * B - 4 * A * C;
            
            if (discriminant > 0) {
                // Dos intersecciones
                const x1 = (-B + Math.sqrt(discriminant)) / (2 * A);
                const x2 = (-B - Math.sqrt(discriminant)) / (2 * A);
                const y1 = -(lineA * x1 + lineC) / lineB;
                const y2 = -(lineA * x2 + lineC) / lineB;
                
                intersections.push({x: x1, y: y1, type: 'intersection'});
                intersections.push({x: x2, y: y2, type: 'intersection'});
            } else if (Math.abs(discriminant) < 1e-10) {
                // Una intersección (tangente)
                const x1 = -B / (2 * A);
                const y1 = -(lineA * x1 + lineC) / lineB;
                
                intersections.push({x: x1, y: y1, type: 'tangent'});
            }
            // Si discriminant < 0, no hay intersecciones reales
        } else if (lineA !== 0) {
            // Línea vertical: x = -c/a
            const x = -lineC / lineA;
            // Sustituir en círculo: (-c/a - h)² + (y - k)² = r²
            // (y - k)² = r² - (-c/a - h)²
            
            const term = r * r - (x - h) * (x - h);
            
            if (term > 0) {
                const y1 = k + Math.sqrt(term);
                const y2 = k - Math.sqrt(term);
                
                intersections.push({x: x, y: y1, type: 'intersection'});
                intersections.push({x: x, y: y2, type: 'intersection'});
            } else if (Math.abs(term) < 1e-10) {
                const y = k;
                intersections.push({x: x, y: y, type: 'tangent'});
            }
        }
        
        return intersections;
    },
    
    displayResults: function(lineA, lineB, lineC, h, k, r, intersections, distance) {
        const resultContent = document.getElementById('result-content');
        
        let lineEquation = '';
        if (lineB !== 0) {
            const slope = -lineA / lineB;
            const yIntercept = -lineC / lineB;
            lineEquation = `y = ${utils.formatLatex ? utils.formatLatex(slope) : slope.toFixed(3)}x + ${utils.formatLatex ? utils.formatLatex(yIntercept) : yIntercept.toFixed(3)}`;
        } else {
            lineEquation = `x = ${utils.formatLatex ? utils.formatLatex(-lineC / lineA) : (-lineC / lineA).toFixed(3)}`;
        }
        
        let geometricAnalysis = '';
        if (distance > r + 1e-10) {
            geometricAnalysis = `
                <div class="alert alert-info">
                    <h5><i class="fas fa-info-circle"></i> Línea exterior</h5>
                    <p>La línea no intersecta el círculo. Distancia del centro a la línea: ${utils.formatLatex ? utils.formatLatex(distance) : distance.toFixed(3)} > ${utils.formatLatex ? utils.formatLatex(r) : r.toFixed(3)} (radio)</p>
                </div>
            `;
        } else if (Math.abs(distance - r) < 1e-10) {
            geometricAnalysis = `
                <div class="alert alert-warning">
                    <h5><i class="fas fa-hand-point-right"></i> Línea tangente</h5>
                    <p>La línea es tangente al círculo. Distancia del centro a la línea: ${utils.formatLatex ? utils.formatLatex(distance) : distance.toFixed(3)} = ${utils.formatLatex ? utils.formatLatex(r) : r.toFixed(3)} (radio)</p>
                </div>
            `;
        } else {
            geometricAnalysis = `
                <div class="alert alert-success">
                    <h5><i class="fas fa-intersection"></i> Línea secante</h5>
                    <p>La línea intersecta el círculo en dos puntos. Distancia del centro a la línea: ${utils.formatLatex ? utils.formatLatex(distance) : distance.toFixed(3)} < ${utils.formatLatex ? utils.formatLatex(r) : r.toFixed(3)} (radio)</p>
                </div>
            `;
        }
        
        let intersectionResults = '';
        if (intersections.length === 0) {
            intersectionResults = `
                <p><strong>Puntos de intersección:</strong> Ninguno</p>
            `;
        } else if (intersections.length === 1) {
            const point = intersections[0];
            intersectionResults = `
                <p><strong>Punto de tangencia:</strong></p>
                <p class="text-center">$(${utils.formatLatex ? utils.formatLatex(point.x) : point.x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(point.y) : point.y.toFixed(3)})$</p>
            `;
        } else {
            intersectionResults = `
                <p><strong>Puntos de intersección:</strong></p>
                <ul>
                    <li>Punto 1: $(${utils.formatLatex ? utils.formatLatex(intersections[0].x) : intersections[0].x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(intersections[0].y) : intersections[0].y.toFixed(3)})$</li>
                    <li>Punto 2: $(${utils.formatLatex ? utils.formatLatex(intersections[1].x) : intersections[1].x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(intersections[1].y) : intersections[1].y.toFixed(3)})$</li>
                </ul>
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
                
                <p><strong>Círculo:</strong></p>
                <div class="math-formula">
                    <p>$$(x - ${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)})^2 + (y - ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})^2 = ${utils.formatLatex ? utils.formatLatex(r * r) : (r * r).toFixed(3)}$$</p>
                    <p>Centro: $(${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})$, Radio: $${utils.formatLatex ? utils.formatLatex(r) : r.toFixed(3)}$</p>
                </div>
                
                ${geometricAnalysis}
                
                <h4>Análisis de Intersección:</h4>
                <p><strong>Distancia del centro a la línea:</strong> ${utils.formatLatex ? utils.formatLatex(distance) : distance.toFixed(3)}</p>
                ${intersectionResults}
            </div>
        `;
    },
    
    drawGraph: function(lineA, lineB, lineC, h, k, r, intersections) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 500, 400, 'Intersección: Línea y Círculo');
            
            if (plotId) {
                // Determinar rango apropiado
                let xMin = h - r - 2, xMax = h + r + 2;
                let yMin = k - r - 2, yMax = k + r + 2;
                
                if (intersections.length > 0) {
                    const xValues = intersections.map(p => p.x);
                    const yValues = intersections.map(p => p.y);
                    xMin = Math.min(xMin, ...xValues) - 1;
                    xMax = Math.max(xMax, ...xValues) + 1;
                    yMin = Math.min(yMin, ...yValues) - 1;
                    yMax = Math.max(yMax, ...yValues) + 1;
                }
                
                // Dibujar círculo
                Grapher.drawCircle(plotId, h, k, r, {
                    color: 'blue',
                    width: 3,
                    name: `Círculo: Centro(${h.toFixed(2)}, ${k.toFixed(2)}), r=${r.toFixed(2)}`
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
                const margin = Math.max(Math.abs(xMax - xMin), Math.abs(yMax - yMin)) * 0.05;
                Grapher.updateRange(plotId, 
                    [xMin - margin, xMax + margin],
                    [yMin - margin, yMax + margin]
                );
                
                // Agregar controles de navegación con modal
                Grapher.addNavigationControls(plotId, 'graph-container', 'Intersección: Línea y Círculo');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['line-a', 'line-b', 'line-c', 'circle-h', 'circle-k', 'circle-r'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Restaurar valores por defecto
        document.getElementById('line-a').value = '1';
        document.getElementById('line-b').value = '-1';
        document.getElementById('line-c').value = '2';
        document.getElementById('circle-h').value = '0';
        document.getElementById('circle-k').value = '0';
        document.getElementById('circle-r').value = '3';
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};