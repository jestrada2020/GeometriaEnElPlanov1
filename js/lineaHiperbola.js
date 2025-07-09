// Herramienta: Intersección entre Línea y Hipérbola
app.tools.lineaHiperbola = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-infinity"></i> Intersección: Línea y Hipérbola</h2>
                
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
                                <h3>Configuración de la Hipérbola</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="hyperbola-h">Centro h (coordenada x):</label>
                                    <input type="number" id="hyperbola-h" class="form-control" placeholder="Coordenada x del centro" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-k">Centro k (coordenada y):</label>
                                    <input type="number" id="hyperbola-k" class="form-control" placeholder="Coordenada y del centro" step="any" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-a">Parámetro a:</label>
                                    <input type="number" id="hyperbola-a" class="form-control" placeholder="Semieje transversal" step="any" min="0" value="3">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-b">Parámetro b:</label>
                                    <input type="number" id="hyperbola-b" class="form-control" placeholder="Semieje conjugado" step="any" min="0" value="2">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-orientation">Orientación:</label>
                                    <select id="hyperbola-orientation" class="form-control">
                                        <option value="horizontal">Horizontal (eje transversal X)</option>
                                        <option value="vertical">Vertical (eje transversal Y)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-3">
                    <button class="btn btn-primary" onclick="app.tools.lineaHiperbola.calculate()">
                        <i class="fas fa-calculator"></i> Calcular Intersecciones
                    </button>
                    <button class="btn btn-secondary" onclick="app.tools.lineaHiperbola.clear()">
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
        
        // Obtener parámetros de la hipérbola
        const h = utils.parseInput ? utils.parseInput(document.getElementById('hyperbola-h').value) : parseFloat(document.getElementById('hyperbola-h').value) || 0;
        const k = utils.parseInput ? utils.parseInput(document.getElementById('hyperbola-k').value) : parseFloat(document.getElementById('hyperbola-k').value) || 0;
        const a = utils.parseInput ? utils.parseInput(document.getElementById('hyperbola-a').value) : parseFloat(document.getElementById('hyperbola-a').value) || 1;
        const b = utils.parseInput ? utils.parseInput(document.getElementById('hyperbola-b').value) : parseFloat(document.getElementById('hyperbola-b').value) || 1;
        const isHorizontal = document.getElementById('hyperbola-orientation').value === 'horizontal';
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validar que la línea no sea degenerada
        if (lineA === 0 && lineB === 0) {
            utils.showError(resultContent, 'Los coeficientes a y b de la línea no pueden ser ambos cero.');
            return;
        }
        
        if (a <= 0 || b <= 0) {
            utils.showError(resultContent, 'Los parámetros a y b de la hipérbola deben ser positivos.');
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
        // Hipérbola horizontal: ((x-h)/a)² - ((y-k)/b)² = 1
        // Hipérbola vertical: ((y-k)/a)² - ((x-h)/b)² = 1
        
        const intersections = [];
        
        if (lineB !== 0) {
            // Despejar y de la línea: y = -(ax + c)/b
            // Sustituir en la hipérbola
            
            let A, B, C;
            
            if (isHorizontal) {
                // ((x-h)/a)² - ((-(ax + c)/b - k)/b)² = 1
                // ((x-h)/a)² - ((ax + c + bk)/b²)² = 1
                A = 1/(a*a) - (lineA*lineA)/(lineB*lineB * b*b);
                B = -2*h/(a*a) - 2*lineA*(lineC + lineB*k)/(lineB*lineB * b*b);
                C = (h*h)/(a*a) - ((lineC + lineB*k)*(lineC + lineB*k))/(lineB*lineB * b*b) - 1;
            } else {
                // ((-(ax + c)/b - k)/a)² - ((x-h)/b)² = 1
                // ((ax + c + bk)/ba)² - ((x-h)/b)² = 1
                A = (lineA*lineA)/(lineB*lineB * a*a) - 1/(b*b);
                B = 2*lineA*(lineC + lineB*k)/(lineB*lineB * a*a) + 2*h/(b*b);
                C = ((lineC + lineB*k)*(lineC + lineB*k))/(lineB*lineB * a*a) - (h*h)/(b*b) - 1;
            }
            
            if (Math.abs(A) > 1e-10) {
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
            } else if (Math.abs(B) > 1e-10) {
                // Ecuación lineal: Bx + C = 0
                const x = -C / B;
                const y = -(lineA * x + lineC) / lineB;
                intersections.push({x: x, y: y, type: 'intersection'});
            }
            // Si A ≈ 0 y B ≈ 0, la línea puede ser asíntota o no intersectar
            
        } else if (lineA !== 0) {
            // Línea vertical: x = -c/a
            const x = -lineC / lineA;
            
            if (isHorizontal) {
                // ((x-h)/a)² - ((y-k)/b)² = 1
                // ((y-k)/b)² = ((x-h)/a)² - 1
                const term = ((x - h)/a) * ((x - h)/a) - 1;
                
                if (term > 0) {
                    const deltaY = b * Math.sqrt(term);
                    const y1 = k + deltaY;
                    const y2 = k - deltaY;
                    
                    intersections.push({x: x, y: y1, type: 'intersection'});
                    intersections.push({x: x, y: y2, type: 'intersection'});
                } else if (Math.abs(term) < 1e-10) {
                    const y = k;
                    intersections.push({x: x, y: y, type: 'tangent'});
                }
            } else {
                // ((y-k)/a)² - ((x-h)/b)² = 1
                // ((y-k)/a)² = 1 + ((x-h)/b)²
                const term = 1 + ((x - h)/b) * ((x - h)/b);
                const deltaY = a * Math.sqrt(term);
                const y1 = k + deltaY;
                const y2 = k - deltaY;
                
                intersections.push({x: x, y: y1, type: 'intersection'});
                intersections.push({x: x, y: y2, type: 'intersection'});
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
        
        let hyperbolaEquation;
        if (isHorizontal) {
            hyperbolaEquation = `\\frac{(x - ${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(a*a) : (a*a).toFixed(3)}} - \\frac{(y - ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(b*b) : (b*b).toFixed(3)}} = 1`;
        } else {
            hyperbolaEquation = `\\frac{(y - ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(a*a) : (a*a).toFixed(3)}} - \\frac{(x - ${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)})^2}{${utils.formatLatex ? utils.formatLatex(b*b) : (b*b).toFixed(3)}} = 1`;
        }
        
        // Calcular parámetros adicionales
        const c = Math.sqrt(a*a + b*b);
        let asymptoteSlopes;
        if (isHorizontal) {
            asymptoteSlopes = `±${utils.formatLatex ? utils.formatLatex(b/a) : (b/a).toFixed(3)}`;
        } else {
            asymptoteSlopes = `±${utils.formatLatex ? utils.formatLatex(a/b) : (a/b).toFixed(3)}`;
        }
        
        let intersectionResults = '';
        if (intersections.length === 0) {
            intersectionResults = `
                <div class="alert alert-info">
                    <h5><i class="fas fa-info-circle"></i> Sin intersecciones</h5>
                    <p>La línea y la hipérbola no se intersectan en el plano real.</p>
                    <p>La línea puede ser una asíntota o estar fuera del rango de la hipérbola.</p>
                </div>
            `;
        } else if (intersections.length === 1) {
            const point = intersections[0];
            intersectionResults = `
                <div class="alert alert-warning">
                    <h5><i class="fas fa-hand-point-right"></i> Intersección tangente</h5>
                    <p>La línea es tangente a la hipérbola en el punto:</p>
                    <p class="text-center"><strong>$(${utils.formatLatex ? utils.formatLatex(point.x) : point.x.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(point.y) : point.y.toFixed(3)})$</strong></p>
                </div>
            `;
        } else {
            intersectionResults = `
                <div class="alert alert-success">
                    <h5><i class="fas fa-intersection"></i> Dos intersecciones</h5>
                    <p>La línea intersecta la hipérbola en dos puntos:</p>
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
                
                <p><strong>Hipérbola (${isHorizontal ? 'Horizontal' : 'Vertical'}):</strong></p>
                <div class="math-formula">
                    <p>$$${hyperbolaEquation}$$</p>
                    <p>Centro: $(${utils.formatLatex ? utils.formatLatex(h) : h.toFixed(3)}, ${utils.formatLatex ? utils.formatLatex(k) : k.toFixed(3)})$</p>
                    <p>Parámetros: $a = ${utils.formatLatex ? utils.formatLatex(a) : a.toFixed(3)}$, $b = ${utils.formatLatex ? utils.formatLatex(b) : b.toFixed(3)}$, $c = ${utils.formatLatex ? utils.formatLatex(c) : c.toFixed(3)}$</p>
                    <p>Pendientes asíntotas: $${asymptoteSlopes}$</p>
                </div>
                
                ${intersectionResults}
            </div>
        `;
    },
    
    drawGraph: function(lineA, lineB, lineC, h, k, a, b, isHorizontal, intersections) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 500, 400, 'Intersección: Línea y Hipérbola');
            
            if (plotId) {
                const maxParam = Math.max(a, b);
                
                // Determinar rango apropiado
                let xMin = h - maxParam * 3, xMax = h + maxParam * 3;
                let yMin = k - maxParam * 3, yMax = k + maxParam * 3;
                
                if (intersections.length > 0) {
                    const xValues = intersections.map(p => p.x);
                    const yValues = intersections.map(p => p.y);
                    xMin = Math.min(xMin, ...xValues) - 2;
                    xMax = Math.max(xMax, ...xValues) + 2;
                    yMin = Math.min(yMin, ...yValues) - 2;
                    yMax = Math.max(yMax, ...yValues) + 2;
                }
                
                // Dibujar hipérbola
                Grapher.drawHyperbola(plotId, h, k, a, b, {
                    color: 'blue',
                    width: 3,
                    name: `Hipérbola: Centro(${h.toFixed(2)}, ${k.toFixed(2)}), a=${a.toFixed(2)}, b=${b.toFixed(2)}`,
                    isHorizontal: isHorizontal,
                    range: Math.max(Math.abs(xMax - h), Math.abs(xMin - h), Math.abs(yMax - k), Math.abs(yMin - k))
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
                Grapher.addNavigationControls(plotId, 'graph-container', 'Intersección: Línea y Hipérbola');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['line-a', 'line-b', 'line-c', 'hyperbola-h', 'hyperbola-k', 'hyperbola-a', 'hyperbola-b'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        // Restaurar valores por defecto
        document.getElementById('line-a').value = '1';
        document.getElementById('line-b').value = '-1';
        document.getElementById('line-c').value = '0';
        document.getElementById('hyperbola-h').value = '0';
        document.getElementById('hyperbola-k').value = '0';
        document.getElementById('hyperbola-a').value = '3';
        document.getElementById('hyperbola-b').value = '2';
        document.getElementById('hyperbola-orientation').value = 'horizontal';
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};