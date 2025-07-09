// Herramienta: Intersección entre Línea y Elipse
app.tools.lineaElipse = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-football-ball"></i> Intersección: Línea y Elipse</h2>
                
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
                                    <input type="number" id="line-c" class="form-control" placeholder="Término independiente" step="any" value="1">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Configuración de la Elipse</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="ellipse-h">Centro h (coordenada x):</label>
                                    <input type="number" id="ellipse-h" class="form-control" placeholder="Coordenada x del centro" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-k">Centro k (coordenada y):</label>
                                    <input type="number" id="ellipse-k" class="form-control" placeholder="Coordenada y del centro" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-a">Semieje a:</label>
                                    <input type="number" id="ellipse-a" class="form-control" placeholder="Semieje mayor o menor" step="any" min="0" value="4">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-b">Semieje b:</label>
                                    <input type="number" id="ellipse-b" class="form-control" placeholder="Semieje mayor o menor" step="any" min="0" value="3">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-orientation">Orientación:</label>
                                    <select id="ellipse-orientation" class="form-control">
                                        <option value="horizontal">Horizontal (a es semieje X)</option>
                                        <option value="vertical">Vertical (a es semieje Y)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-3">
                    <button class="btn btn-primary" onclick="app.tools.lineaElipse.calculate()">
                        <i class="fas fa-calculator"></i> Calcular Intersecciones
                    </button>
                    <button class="btn btn-secondary" onclick="app.tools.lineaElipse.clear()">
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
        
        // Obtener parámetros de la elipse
        const h = utils.parseInput ? utils.parseInput(document.getElementById('ellipse-h').value) : parseFloat(document.getElementById('ellipse-h').value) || 0;
        const k = utils.parseInput ? utils.parseInput(document.getElementById('ellipse-k').value) : parseFloat(document.getElementById('ellipse-k').value) || 0;
        const a = utils.parseInput ? utils.parseInput(document.getElementById('ellipse-a').value) : parseFloat(document.getElementById('ellipse-a').value) || 1;
        const b = utils.parseInput ? utils.parseInput(document.getElementById('ellipse-b').value) : parseFloat(document.getElementById('ellipse-b').value) || 1;
        const isHorizontal = document.getElementById('ellipse-orientation').value === 'horizontal';
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validar que la línea no sea degenerada
        if (lineA === 0 && lineB === 0) {
            utils.showError(resultContent, 'Los coeficientes a y b de la línea no pueden ser ambos cero.');
            return;
        }
        
        if (a <= 0 || b <= 0) {
            utils.showError(resultContent, 'Los semiejes de la elipse deben ser positivos.');
            return;
        }
        
        // Calcular intersecciones
        const intersections = this.findIntersections(lineA, lineB, lineC, h, k, a, b, isHorizontal);
        
        // Mostrar resultados
        this.displayResults(lineA, lineB, lineC, h, k, a, b, isHorizontal, intersections);
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(lineA, lineB, lineC, h, k, a, b, isHorizontal, intersections);
        
        app.reprocessMathJax();
    },
    
    findIntersections: function(lineA, lineB, lineC, h, k, a, b, isHorizontal) {
        // Línea: ax + by + c = 0
        // Elipse: ((x-h)/rx)² + ((y-k)/ry)² = 1
        
        const intersections = [];
        let rx, ry;
        
        if (isHorizontal) {
            rx = a; // semieje X
            ry = b; // semieje Y
        } else {
            rx = b; // semieje X  
            ry = a; // semieje Y
        }
        
        if (lineB !== 0) {
            // Despejar y de la línea: y = -(ax + c)/b
            // Sustituir en la elipse: ((x-h)/rx)² + ((-(ax + c)/b - k)/ry)² = 1
            
            // Coeficientes de la ecuación cuadrática Ax² + Bx + C = 0
            const A = 1/(rx*rx) + (lineA*lineA)/(lineB*lineB * ry*ry);
            const B = -2*h/(rx*rx) + 2*lineA*(lineC + lineB*k)/(lineB*lineB * ry*ry);
            const C = (h*h)/(rx*rx) + ((lineC + lineB*k)*(lineC + lineB*k))/(lineB*lineB * ry*ry) - 1;
            
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
            // Sustituir en elipse: ((x-h)/rx)² + ((y-k)/ry)² = 1
            // ((y-k)/ry)² = 1 - ((x-h)/rx)²
            
            const term = 1 - ((x - h)/(rx)) * ((x - h)/(rx));
            
            if (term > 0) {
                const deltaY = ry * Math.sqrt(term);
                const y1 = k + deltaY;
                const y2 = k - deltaY;
                
                intersections.push({x: x, y: y1, type: 'intersection'});
                intersections.push({x: x, y: y2, type: 'intersection'});
            } else if (Math.abs(term) < 1e-10) {
                const y = k;
                intersections.push({x: x, y: y, type: 'tangent'});
            }
        }
        
        return intersections;
    },
    
    displayResults: function(lineA, lineB, lineC, h, k, a, b, isHorizontal, intersections) {
        const resultContent = document.getElementById('result-content');
        
        let lineEquation = '';
        if (lineB !== 0) {
            const slope = -lineA / lineB;
            const yIntercept = -lineC / lineB;
            lineEquation = `y = ${utils.formatLatex ? utils.formatLatex(slope) : slope.toFixed(3)}x + ${utils.formatLatex ? utils.formatLatex(yIntercept) : yIntercept.toFixed(3)}`;
        } else {
            lineEquation = `x = ${utils.formatLatex ? utils.formatLatex(-lineC / lineA) : (-lineC / lineA).toFixed(3)}`;
        }
        
        let ellipseEquation, rx, ry;
        if (isHorizontal) {
            rx = a; ry = b;
            ellipseEquation = `\\frac{(x - ${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(a*a) : (a*a).toFixed(3)}} + \\frac{(y - ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(b*b) : (b*b).toFixed(3)}} = 1`;
        } else {
            rx = b; ry = a;
            ellipseEquation = `\\frac{(x - ${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(b*b) : (b*b).toFixed(3)}} + \\frac{(y - ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(a*a) : (a*a).toFixed(3)}} = 1`;
        }
        
        let intersectionResults = '';
        if (intersections.length === 0) {
            intersectionResults = `
                <div class="alert alert-info">
                    <h5><i class="fas fa-info-circle"></i> Sin intersecciones</h5>
                    <p>La línea y la elipse no se intersectan en el plano real.</p>
                </div>
            `;
        } else if (intersections.length === 1) {
            const point = intersections[0];
            intersectionResults = `
                <div class="alert alert-warning">
                    <h5><i class="fas fa-hand-point-right"></i> Intersección tangente</h5>
                    <p>La línea es tangente a la elipse en el punto:</p>
                    <p class="text-center"><strong>$(${utils.formatLatex ? utils.formatLatex(point.x) : point.x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(point.y) : point.y.toFixed(3)})$</strong></p>
                </div>
            `;
        } else {
            intersectionResults = `
                <div class="alert alert-success">
                    <h5><i class="fas fa-intersection"></i> Dos intersecciones</h5>
                    <p>La línea intersecta la elipse en dos puntos:</p>
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
                
                <p><strong>Elipse (${isHorizontal ? 'Horizontal' : 'Vertical'}):</strong></p>
                <div class="math-formula">
                    <p>$$${ellipseEquation}$$</p>
                    <p>Centro: $(${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})$</p>
                    <p>Semiejes: $a = ${utils.formatLatex ? utils.formatLatex(a) : a.toFixed(3)}$, $b = ${utils.formatLatex ? utils.formatLatex(b) : b.toFixed(3)}$</p>
                </div>
                
                ${intersectionResults}
            </div>
        `;
    },
    
    drawGraph: function(lineA, lineB, lineC, h, k, a, b, isHorizontal, intersections) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 500, 400, 'Intersección: Línea y Elipse');
            
            if (plotId) {
                const maxSemieje = Math.max(a, b);
                
                // Determinar rango apropiado
                let xMin = h - maxSemieje - 2, xMax = h + maxSemieje + 2;
                let yMin = k - maxSemieje - 2, yMax = k + maxSemieje + 2;
                
                if (intersections.length > 0) {
                    const xValues = intersections.map(p => p.x);
                    const yValues = intersections.map(p => p.y);
                    xMin = Math.min(xMin, ...xValues) - 1;
                    xMax = Math.max(xMax, ...xValues) + 1;
                    yMin = Math.min(yMin, ...yValues) - 1;
                    yMax = Math.max(yMax, ...yValues) + 1;
                }
                
                // Dibujar elipse
                Grapher.drawEllipse(plotId, h, k, a, b, {
                    color: 'blue',
                    width: 3,
                    name: `Elipse: Centro(${h.toFixed(2)}, ${k.toFixed(2)}), a=${a.toFixed(2)}, b=${b.toFixed(2)}`,
                    isHorizontal: isHorizontal
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
                Grapher.addNavigationControls(plotId, 'graph-container', 'Intersección: Línea y Elipse');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['line-a', 'line-b', 'line-c', 'ellipse-h', 'ellipse-k', 'ellipse-a', 'ellipse-b'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Restaurar valores por defecto
        document.getElementById('line-a').value = '1';
        document.getElementById('line-b').value = '-1';
        document.getElementById('line-c').value = '1';
        document.getElementById('ellipse-h').value = '0';
        document.getElementById('ellipse-k').value = '0';
        document.getElementById('ellipse-a').value = '4';
        document.getElementById('ellipse-b').value = '3';
        document.getElementById('ellipse-orientation').value = 'horizontal';
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};