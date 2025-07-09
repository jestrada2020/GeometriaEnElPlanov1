// Herramienta: Concepto de Elipse
app.tools.conceptoElipse = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-ellipsis-h"></i> Concepto de Elipse</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Elipse</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="ellipse-h">Centro X (h):</label>
                                    <input type="number" id="ellipse-h" class="form-control" placeholder="Coordenada x del centro" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-k">Centro Y (k):</label>
                                    <input type="number" id="ellipse-k" class="form-control" placeholder="Coordenada y del centro" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-a">Semieje mayor (a):</label>
                                    <input type="number" id="ellipse-a" class="form-control" placeholder="Semieje mayor" step="any" min="0">
                                </div>
                                <div class="form-group">
                                    <label for="ellipse-b">Semieje menor (b):</label>
                                    <input type="number" id="ellipse-b" class="form-control" placeholder="Semieje menor" step="any" min="0">
                                </div>
                                <div class="form-group">
                                    <label>Orientación:</label>
                                    <select id="ellipse-orientation" class="form-control">
                                        <option value="horizontal">Horizontal (a > b)</option>
                                        <option value="vertical">Vertical (a < b)</option>
                                    </select>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.conceptoElipse.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.conceptoElipse.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría de la Elipse</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>Una elipse es el lugar geométrico de todos los puntos del plano cuya suma de distancias a dos puntos fijos (focos) es constante.</p>
                                
                                <h4>Ecuaciones</h4>
                                
                                <h5>Horizontal (a > b)</h5>
                                <div class="math-formula">
                                    <p>$$\\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1$$</p>
                                </div>
                                
                                <h5>Vertical (a < b)</h5>
                                <div class="math-formula">
                                    <p>$$\\frac{(x-h)^2}{b^2} + \\frac{(y-k)^2}{a^2} = 1$$</p>
                                </div>
                                
                                <h4>Elementos</h4>
                                <ul>
                                    <li><strong>Centro:</strong> $(h, k)$</li>
                                    <li><strong>Semiejes:</strong> $a$ (mayor), $b$ (menor)</li>
                                    <li><strong>Distancia focal:</strong> $c = \\sqrt{a^2 - b^2}$</li>
                                    <li><strong>Excentricidad:</strong> $e = \\frac{c}{a}$</li>
                                </ul>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li><strong>Área:</strong> $A = \\pi ab$</li>
                                    <li><strong>Perímetro:</strong> $P ≈ \\pi[3(a+b) - \\sqrt{(3a+b)(a+3b)}]$</li>
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
                                <h3>Gráfica de la Elipse</h3>
                            </div>
                            <div class="card-body text-center">
                                <div id="graph-canvas"></div>
                                <small class="text-muted">Usa la rueda del mouse para zoom y arrastra para mover</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div id="math-controls-container"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add math controls
        MathUtils.createControls(container);
    },
    
    calculate: function() {
        // Update settings from controls
        MathUtils.updateSettings();
        
        const hInput = document.getElementById('ellipse-h').value;
        const kInput = document.getElementById('ellipse-k').value;
        const aInput = document.getElementById('ellipse-a').value;
        const bInput = document.getElementById('ellipse-b').value;
        const orientation = document.getElementById('ellipse-orientation').value;
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validaciones
        if (!utils.isValidNumber(hInput) || !utils.isValidNumber(kInput) || 
            !utils.isValidNumber(aInput) || !utils.isValidNumber(bInput)) {
            utils.showError(resultContent, 'Por favor, ingresa valores válidos. Los semiejes deben ser positivos.');
            return;
        }
        
        const h = utils.parseInput(hInput);
        const k = utils.parseInput(kInput);
        const a = utils.parseInput(aInput);
        const b = utils.parseInput(bInput);
        
        if (a <= 0 || b <= 0) {
            utils.showError(resultContent, 'Los semiejes deben ser positivos.');
            return;
        }
        
        // Determinar cuál es mayor
        const isHorizontal = orientation === 'horizontal';
        const semiMajor = isHorizontal ? Math.max(a, b) : Math.max(a, b);
        const semiMinor = isHorizontal ? Math.min(a, b) : Math.min(a, b);
        
        // Calcular parámetros
        const c = Math.sqrt(Math.abs(semiMajor * semiMajor - semiMinor * semiMinor));
        const eccentricity = c / semiMajor;
        const area = Math.PI * a * b;
        
        // Aproximación del perímetro (fórmula de Ramanujan)
        const perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
        
        // Coordenadas de los focos
        let focus1X, focus1Y, focus2X, focus2Y;
        if (isHorizontal) {
            focus1X = h - c;
            focus1Y = k;
            focus2X = h + c;
            focus2Y = k;
        } else {
            focus1X = h;
            focus1Y = k - c;
            focus2X = h;
            focus2Y = k + c;
        }
        
        // Vértices
        let vertex1X, vertex1Y, vertex2X, vertex2Y, vertex3X, vertex3Y, vertex4X, vertex4Y;
        if (isHorizontal) {
            vertex1X = h - a; vertex1Y = k;
            vertex2X = h + a; vertex2Y = k;
            vertex3X = h; vertex3Y = k - b;
            vertex4X = h; vertex4Y = k + b;
        } else {
            vertex1X = h; vertex1Y = k - a;
            vertex2X = h; vertex2Y = k + a;
            vertex3X = h - b; vertex3Y = k;
            vertex4X = h + b; vertex4Y = k;
        }
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Información de la Elipse</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5>Parámetros Básicos</h5>
                        <ul>
                            <li><strong>Centro:</strong> $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$</li>
                            <li><strong>Semieje mayor:</strong> $a = ${utils.formatLatex(semiMajor)}$</li>
                            <li><strong>Semieje menor:</strong> $b = ${utils.formatLatex(semiMinor)}$</li>
                            <li><strong>Distancia focal:</strong> $c = ${utils.formatLatex(c)}$</li>
                            <li><strong>Excentricidad:</strong> $e = ${utils.formatLatex(eccentricity)}$</li>
                        </ul>
                        
                        <h5>Propiedades</h5>
                        <ul>
                            <li><strong>Área:</strong> $A = \\pi ab = ${utils.formatLatex(area)}$</li>
                            <li><strong>Perímetro:</strong> $P ≈ ${utils.formatLatex(perimeter)}$</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5>Puntos Importantes</h5>
                        <p><strong>Focos:</strong></p>
                        <ul>
                            <li>$F_1(${utils.formatLatex(focus1X)}, ${utils.formatLatex(focus1Y)})$</li>
                            <li>$F_2(${utils.formatLatex(focus2X)}, ${utils.formatLatex(focus2Y)})$</li>
                        </ul>
                        
                        <p><strong>Vértices:</strong></p>
                        <ul>
                            <li>$V_1(${utils.formatLatex(vertex1X)}, ${utils.formatLatex(vertex1Y)})$</li>
                            <li>$V_2(${utils.formatLatex(vertex2X)}, ${utils.formatLatex(vertex2Y)})$</li>
                            <li>$V_3(${utils.formatLatex(vertex3X)}, ${utils.formatLatex(vertex3Y)})$</li>
                            <li>$V_4(${utils.formatLatex(vertex4X)}, ${utils.formatLatex(vertex4Y)})$</li>
                        </ul>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-12">
                        <h5>Ecuación</h5>
                        <div class="math-formula">
                            ${isHorizontal ? 
                                `<p>$$\\frac{(x-${utils.formatLatex(h)})^2}{${utils.formatLatex(a*a)}} + \\frac{(y-${utils.formatLatex(k)})^2}{${utils.formatLatex(b*b)}} = 1$$</p>` :
                                `<p>$$\\frac{(x-${utils.formatLatex(h)})^2}{${utils.formatLatex(b*b)}} + \\frac{(y-${utils.formatLatex(k)})^2}{${utils.formatLatex(a*a)}} = 1$$</p>`
                            }
                        </div>
                        
                        <div class="alert alert-info">
                            <h5><i class="fas fa-info-circle"></i> Clasificación:</h5>
                            <p>Esta elipse es <strong>${isHorizontal ? 'horizontal' : 'vertical'}</strong> porque el semieje mayor está orientado ${isHorizontal ? 'horizontalmente' : 'verticalmente'}.</p>
                            <p>Excentricidad: $e = ${utils.formatLatex(eccentricity)}$ ${eccentricity < 0.5 ? '(casi circular)' : eccentricity > 0.8 ? '(muy alargada)' : '(moderadamente alargada)'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(h, k, a, b, isHorizontal);
        
        app.reprocessMathJax();
    },
    
    drawGraph: function(h, k, a, b, isHorizontal) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Elipse');
            
            if (plotId) {
                // Dibujar elipse
                Grapher.drawEllipse(plotId, h, k, a, b, {
                    color: 'blue',
                    width: 3,
                    name: `Elipse: a=${a.toFixed(2)}, b=${b.toFixed(2)}`,
                    isHorizontal: isHorizontal
                });
                
                // Calcular focos
                const semiMajor = Math.max(a, b);
                const semiMinor = Math.min(a, b);
                const c = Math.sqrt(Math.abs(semiMajor * semiMajor - semiMinor * semiMinor));
                
                let focus1X, focus1Y, focus2X, focus2Y;
                if ((isHorizontal && a >= b) || (!isHorizontal && b >= a)) {
                    // Focos en el eje mayor
                    if (isHorizontal) {
                        focus1X = h - c; focus1Y = k;
                        focus2X = h + c; focus2Y = k;
                    } else {
                        focus1X = h; focus1Y = k - c;
                        focus2X = h; focus2Y = k + c;
                    }
                } else {
                    // Focos en el eje menor
                    if (isHorizontal) {
                        focus1X = h; focus1Y = k - c;
                        focus2X = h; focus2Y = k + c;
                    } else {
                        focus1X = h - c; focus1Y = k;
                        focus2X = h + c; focus2Y = k;
                    }
                }
                
                // Dibujar focos
                const foci = [
                    {x: focus1X, y: focus1Y, label: `F₁(${focus1X.toFixed(2)}, ${focus1Y.toFixed(2)})`},
                    {x: focus2X, y: focus2Y, label: `F₂(${focus2X.toFixed(2)}, ${focus2Y.toFixed(2)})`}
                ];
                
                Grapher.drawPoints(plotId, foci, {
                    color: 'green',
                    size: 8,
                    name: 'Focos',
                    symbol: 'star'
                });
                
                // Dibujar ejes mayor y menor
                if (isHorizontal) {
                    // Eje mayor horizontal
                    Grapher.drawLine(plotId, h - a, k, h + a, k, {
                        color: 'orange',
                        width: 2,
                        name: 'Eje mayor',
                        dash: 'dash'
                    });
                    // Eje menor vertical
                    Grapher.drawLine(plotId, h, k - b, h, k + b, {
                        color: 'purple',
                        width: 2,
                        name: 'Eje menor',
                        dash: 'dash'
                    });
                } else {
                    // Eje mayor vertical
                    Grapher.drawLine(plotId, h, k - a, h, k + a, {
                        color: 'orange',
                        width: 2,
                        name: 'Eje mayor',
                        dash: 'dash'
                    });
                    // Eje menor horizontal
                    Grapher.drawLine(plotId, h - b, k, h + b, k, {
                        color: 'purple',
                        width: 2,
                        name: 'Eje menor',
                        dash: 'dash'
                    });
                }
                
                // Configurar rango apropiado
                const maxAxis = Math.max(a, b);
                const margin = maxAxis * 1.3;
                Grapher.updateRange(plotId, 
                    [h - margin, h + margin],
                    [k - margin, k + margin]
                );
                
                // Agregar controles de navegación con modal
                Grapher.addNavigationControls(plotId, 'graph-container', 'Concepto de Elipse');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['ellipse-h', 'ellipse-k', 'ellipse-a', 'ellipse-b'];
        inputs.forEach(id => {
            document.getElementById(id).value = '';
        });
        
        document.getElementById('ellipse-orientation').value = 'horizontal';
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};