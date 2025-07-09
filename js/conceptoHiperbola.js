// Herramienta: Concepto de Hipérbola
app.tools.conceptoHiperbola = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-divide"></i> Concepto de Hipérbola</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Hipérbola</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="hyperbola-h">Centro X (h):</label>
                                    <input type="number" id="hyperbola-h" class="form-control" placeholder="Coordenada x del centro" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-k">Centro Y (k):</label>
                                    <input type="number" id="hyperbola-k" class="form-control" placeholder="Coordenada y del centro" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-a">Parámetro a:</label>
                                    <input type="number" id="hyperbola-a" class="form-control" placeholder="Parámetro a" step="any" min="0">
                                </div>
                                <div class="form-group">
                                    <label for="hyperbola-b">Parámetro b:</label>
                                    <input type="number" id="hyperbola-b" class="form-control" placeholder="Parámetro b" step="any" min="0">
                                </div>
                                <div class="form-group">
                                    <label>Orientación:</label>
                                    <select id="hyperbola-orientation" class="form-control">
                                        <option value="horizontal">Horizontal</option>
                                        <option value="vertical">Vertical</option>
                                    </select>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.conceptoHiperbola.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.conceptoHiperbola.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría de la Hipérbola</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>Una hipérbola es el lugar geométrico de todos los puntos del plano cuya diferencia de distancias a dos puntos fijos (focos) es constante.</p>
                                
                                <h4>Ecuaciones</h4>
                                
                                <h5>Horizontal</h5>
                                <div class="math-formula">
                                    <p>$$\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1$$</p>
                                </div>
                                
                                <h5>Vertical</h5>
                                <div class="math-formula">
                                    <p>$$\\frac{(y-k)^2}{a^2} - \\frac{(x-h)^2}{b^2} = 1$$</p>
                                </div>
                                
                                <h4>Elementos</h4>
                                <ul>
                                    <li><strong>Centro:</strong> $(h, k)$</li>
                                    <li><strong>Parámetros:</strong> $a$, $b$</li>
                                    <li><strong>Distancia focal:</strong> $c = \\sqrt{a^2 + b^2}$</li>
                                    <li><strong>Excentricidad:</strong> $e = \\frac{c}{a}$</li>
                                </ul>
                                
                                <h4>Asíntotas</h4>
                                <p>Las asíntotas pasan por el centro con pendientes:</p>
                                <ul>
                                    <li>Horizontal: $y - k = ±\\frac{b}{a}(x - h)$</li>
                                    <li>Vertical: $x - h = ±\\frac{b}{a}(y - k)$</li>
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
                                <h3>Gráfica de la Hipérbola</h3>
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
        
        const hInput = document.getElementById('hyperbola-h').value;
        const kInput = document.getElementById('hyperbola-k').value;
        const aInput = document.getElementById('hyperbola-a').value;
        const bInput = document.getElementById('hyperbola-b').value;
        const orientation = document.getElementById('hyperbola-orientation').value;
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validaciones
        if (!utils.isValidNumber(hInput) || !utils.isValidNumber(kInput) || 
            !utils.isValidNumber(aInput) || !utils.isValidNumber(bInput)) {
            utils.showError(resultContent, 'Por favor, ingresa valores válidos. Los parámetros a y b deben ser positivos.');
            return;
        }
        
        const h = utils.parseInput(hInput);
        const k = utils.parseInput(kInput);
        const a = utils.parseInput(aInput);
        const b = utils.parseInput(bInput);
        
        if (a <= 0 || b <= 0) {
            utils.showError(resultContent, 'Los parámetros a y b deben ser positivos.');
            return;
        }
        
        const isHorizontal = orientation === 'horizontal';
        
        // Calcular parámetros
        const c = Math.sqrt(a * a + b * b);
        const eccentricity = c / a;
        
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
        let vertex1X, vertex1Y, vertex2X, vertex2Y;
        if (isHorizontal) {
            vertex1X = h - a;
            vertex1Y = k;
            vertex2X = h + a;
            vertex2Y = k;
        } else {
            vertex1X = h;
            vertex1Y = k - a;
            vertex2X = h;
            vertex2Y = k + a;
        }
        
        // Asíntotas
        const slope1 = isHorizontal ? b / a : a / b;
        const slope2 = -slope1;
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Información de la Hipérbola</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5>Parámetros Básicos</h5>
                        <ul>
                            <li><strong>Centro:</strong> $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$</li>
                            <li><strong>Parámetro a:</strong> $a = ${utils.formatLatex(a)}$</li>
                            <li><strong>Parámetro b:</strong> $b = ${utils.formatLatex(b)}$</li>
                            <li><strong>Distancia focal:</strong> $c = ${utils.formatLatex(c)}$</li>
                            <li><strong>Excentricidad:</strong> $e = ${utils.formatLatex(eccentricity)}$</li>
                        </ul>
                        
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
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5>Ecuación</h5>
                        <div class="math-formula">
                            ${isHorizontal ? 
                                `<p>$$\\frac{(x-${utils.formatLatex(h)})^2}{${utils.formatLatex(a*a)}} - \\frac{(y-${utils.formatLatex(k)})^2}{${utils.formatLatex(b*b)}} = 1$$</p>` :
                                `<p>$$\\frac{(y-${utils.formatLatex(k)})^2}{${utils.formatLatex(a*a)}} - \\frac{(x-${utils.formatLatex(h)})^2}{${utils.formatLatex(b*b)}} = 1$$</p>`
                            }
                        </div>
                        
                        <h5>Asíntotas</h5>
                        <p>Las asíntotas tienen ecuaciones:</p>
                        <div class="math-formula">
                            <p>$$y - ${utils.formatLatex(k)} = ±${utils.formatLatex(slope1)}(x - ${utils.formatLatex(h)})$$</p>
                        </div>
                        
                        <p>Es decir:</p>
                        <ul>
                            <li>$y = ${utils.formatLatex(slope1)}x + ${utils.formatLatex(k - slope1 * h)}$</li>
                            <li>$y = ${utils.formatLatex(slope2)}x + ${utils.formatLatex(k - slope2 * h)}$</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-info mt-3">
                    <h5><i class="fas fa-info-circle"></i> Clasificación:</h5>
                    <p>Esta hipérbola es <strong>${isHorizontal ? 'horizontal' : 'vertical'}</strong> porque ${isHorizontal ? 'el término x² es positivo' : 'el término y² es positivo'}.</p>
                    <p>Excentricidad: $e = ${utils.formatLatex(eccentricity)}$ (siempre > 1 para hipérbolas)</p>
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
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Hipérbola');
            
            // Set appropriate range to show the hyperbola and its asymptotes
            const c = Math.sqrt(a * a + b * b);
            const range = Math.max(a, b, c) * 1.5;
            
            Grapher.updateRange(plotId, [h - range, h + range], [k - range, k + range]);
            
            // Draw hyperbola (this will automatically include asymptotes)
            Grapher.drawHyperbola(plotId, h, k, a, b, {
                color: 'blue',
                width: 2,
                name: 'Hipérbola',
                isHorizontal: isHorizontal
            });
            
            // Draw center
            Grapher.drawPoints(plotId, [{x: h, y: k, label: `Centro(${h}, ${k})`}], {
                color: 'red',
                size: 8,
                name: 'Centro',
                symbol: 'circle'
            });
            
            // Calculate and draw foci
            let focus1X, focus1Y, focus2X, focus2Y;
            
            if (isHorizontal) {
                focus1X = h - c; focus1Y = k;
                focus2X = h + c; focus2Y = k;
            } else {
                focus1X = h; focus1Y = k - c;
                focus2X = h; focus2Y = k + c;
            }
            
            Grapher.drawPoints(plotId, [
                {x: focus1X, y: focus1Y, label: `F1(${utils.formatLatex(focus1X)}, ${utils.formatLatex(focus1Y)})`},
                {x: focus2X, y: focus2Y, label: `F2(${utils.formatLatex(focus2X)}, ${utils.formatLatex(focus2Y)})`}
            ], {
                color: 'green',
                size: 6,
                name: 'Focos',
                symbol: 'circle'
            });
            
            // Draw vertices
            let vertex1X, vertex1Y, vertex2X, vertex2Y;
            if (isHorizontal) {
                vertex1X = h - a; vertex1Y = k;
                vertex2X = h + a; vertex2Y = k;
            } else {
                vertex1X = h; vertex1Y = k - a;
                vertex2X = h; vertex2Y = k + a;
            }
            
            Grapher.drawPoints(plotId, [
                {x: vertex1X, y: vertex1Y, label: `V1(${utils.formatLatex(vertex1X)}, ${utils.formatLatex(vertex1Y)})`},
                {x: vertex2X, y: vertex2Y, label: `V2(${utils.formatLatex(vertex2X)}, ${utils.formatLatex(vertex2Y)})`}
            ], {
                color: 'orange',
                size: 6,
                name: 'Vértices',
                symbol: 'circle'
            });
            
            // Agregar controles de navegación con modal
            Grapher.addNavigationControls(plotId, 'graph-container', 'Concepto de Hipérbola');
            
            graphContainer.style.display = 'block';
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['hyperbola-h', 'hyperbola-k', 'hyperbola-a', 'hyperbola-b'];
        inputs.forEach(id => {
            document.getElementById(id).value = '';
        });
        
        document.getElementById('hyperbola-orientation').value = 'horizontal';
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};