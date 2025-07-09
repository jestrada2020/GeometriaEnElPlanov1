// Herramienta: Parábolas Horizontales  
app.tools.parabolaHorizontal = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-arrows-alt-h"></i> Parábolas Horizontales</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Parábola Horizontal</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="h-vertex-h">Vértice X (h):</label>
                                    <input type="number" id="h-vertex-h" class="form-control" placeholder="Coordenada x del vértice" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="h-vertex-k">Vértice Y (k):</label>
                                    <input type="number" id="h-vertex-k" class="form-control" placeholder="Coordenada y del vértice" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="h-vertex-a">Parámetro a:</label>
                                    <input type="number" id="h-vertex-a" class="form-control" placeholder="Parámetro a (≠ 0)" step="any">
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.parabolaHorizontal.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.parabolaHorizontal.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría de Parábolas Horizontales</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>Una parábola horizontal tiene su eje de simetría paralelo al eje X.</p>
                                
                                <h4>Ecuación</h4>
                                <div class="math-formula">
                                    <p>$$x = a(y - k)^2 + h$$</p>
                                </div>
                                
                                <h4>Elementos</h4>
                                <ul>
                                    <li><strong>Vértice:</strong> $(h, k)$</li>
                                    <li><strong>Eje de simetría:</strong> $y = k$</li>
                                    <li><strong>Foco:</strong> $(h + \\frac{1}{4a}, k)$</li>
                                    <li><strong>Directriz:</strong> $x = h - \\frac{1}{4a}$</li>
                                </ul>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li>Si $a > 0$: parábola abre hacia la derecha</li>
                                    <li>Si $a < 0$: parábola abre hacia la izquierda</li>
                                    <li>No es función en términos de $y = f(x)$</li>
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
                                <h3>Gráfica de la Parábola</h3>
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
        
        const hInput = document.getElementById('h-vertex-h').value;
        const kInput = document.getElementById('h-vertex-k').value;
        const aInput = document.getElementById('h-vertex-a').value;
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        if (!utils.isValidNumber(hInput) || !utils.isValidNumber(kInput) || !utils.isValidNumber(aInput)) {
            utils.showError(resultContent, 'Por favor, ingresa valores válidos. El parámetro a debe ser diferente de cero.');
            return;
        }
        
        const h = utils.parseInput(hInput);
        const k = utils.parseInput(kInput);
        const a = utils.parseInput(aInput);
        
        if (a === 0) {
            utils.showError(resultContent, 'El parámetro a debe ser diferente de cero.');
            return;
        }
        
        // Calcular elementos de la parábola
        const focusX = h + 1 / (4 * a);
        const focusY = k;
        const directrixX = h - 1 / (4 * a);
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Información de la Parábola Horizontal</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5>Parámetros Básicos</h5>
                        <ul>
                            <li><strong>Vértice:</strong> $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$</li>
                            <li><strong>Parámetro a:</strong> $a = ${utils.formatLatex(a)}$</li>
                            <li><strong>Dirección:</strong> ${a > 0 ? 'Abre hacia la derecha' : 'Abre hacia la izquierda'}</li>
                        </ul>
                        
                        <h5>Elementos Geométricos</h5>
                        <ul>
                            <li><strong>Foco:</strong> $(${utils.formatLatex(focusX)}, ${utils.formatLatex(focusY)})$</li>
                            <li><strong>Directriz:</strong> $x = ${utils.formatLatex(directrixX)}$</li>
                            <li><strong>Eje de simetría:</strong> $y = ${utils.formatLatex(k)}$</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5>Ecuación</h5>
                        <div class="math-formula">
                            <p>$$x = ${utils.formatLatex(a)}(y - ${utils.formatLatex(k)})^2 + ${utils.formatLatex(h)}$$</p>
                        </div>
                        
                        <h5>Intersecciones</h5>
                        <ul>
                            <li><strong>Con eje X:</strong> $(${utils.formatLatex(a * k * k + h)}, 0)$</li>
                            <li><strong>Con eje Y:</strong> $x = ${utils.formatLatex(a * k * k + h)}$</li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-info mt-3">
                    <h5><i class="fas fa-info-circle"></i> Características:</h5>
                    <p>Esta parábola horizontal ${a > 0 ? 'tiene un mínimo' : 'tiene un máximo'} en X en el vértice $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$.</p>
                    <p>La distancia del vértice al foco es: $p = ${utils.formatLatex(Math.abs(1/(4*a)))}$</p>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(h, k, a);
        
        app.reprocessMathJax();
    },
    
    drawGraph: function(h, k, a) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Parábola Horizontal');
            
            // Set appropriate range based on parabola parameters
            const focusX = h + 1 / (4 * a);
            const directrixX = h - 1 / (4 * a);
            const range = Math.max(Math.abs(focusX - h), Math.abs(directrixX - h), 2);
            
            Grapher.updateRange(plotId, [h - range * 1.5, h + range * 1.5], [k - range * 1.5, k + range * 1.5]);
            
            // Draw parabola
            Grapher.drawParabola(plotId, h, k, a, {
                color: 'blue',
                width: 2,
                name: 'Parábola',
                isVertical: false
            });
            
            // Draw vertex
            Grapher.drawPoints(plotId, [{x: h, y: k, label: `Vértice(${h}, ${k})`}], {
                color: 'red',
                size: 8,
                name: 'Vértice',
                symbol: 'circle'
            });
            
            // Draw focus
            Grapher.drawPoints(plotId, [{x: focusX, y: k, label: `Foco(${utils.formatLatex(focusX)}, ${k})`}], {
                color: 'green',
                size: 6,
                name: 'Foco',
                symbol: 'circle'
            });
            
            // Draw directrix
            const directrixRange = range * 1.2;
            Grapher.drawLine(plotId, directrixX, k - directrixRange, directrixX, k + directrixRange, {
                color: 'orange',
                width: 2,
                name: `Directriz x = ${utils.formatLatex(directrixX)}`
            });
            
            // Agregar controles de navegación con modal
            Grapher.addNavigationControls(plotId, 'graph-container', 'Parábola Horizontal');
            
            graphContainer.style.display = 'block';
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['h-vertex-h', 'h-vertex-k', 'h-vertex-a'];
        inputs.forEach(id => {
            document.getElementById(id).value = '';
        });
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};