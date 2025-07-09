// Herramienta: Parábolas Verticales
app.tools.parabolaVertical = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-project-diagram"></i> Parábolas Verticales</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Parábola Vertical</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Método de definición:</label>
                                    <select id="parabola-method" class="form-control" onchange="app.tools.parabolaVertical.changeMethod()">
                                        <option value="vertex-form">Forma Vértice</option>
                                        <option value="standard-form">Forma Estándar</option>
                                        <option value="focus-directrix">Foco y Directriz</option>
                                    </select>
                                </div>
                                
                                <div id="vertex-form-inputs">
                                    <div class="form-group">
                                        <label for="vertex-h">Vértice X (h):</label>
                                        <input type="number" id="vertex-h" class="form-control" placeholder="Coordenada x del vértice" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="vertex-k">Vértice Y (k):</label>
                                        <input type="number" id="vertex-k" class="form-control" placeholder="Coordenada y del vértice" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="vertex-a">Parámetro a:</label>
                                        <input type="number" id="vertex-a" class="form-control" placeholder="Parámetro a (≠ 0)" step="any">
                                    </div>
                                </div>
                                
                                <div id="standard-form-inputs" style="display: none;">
                                    <p>Ecuación: $y = ax^2 + bx + c$</p>
                                    <div class="form-group">
                                        <label for="coeff-a">Coeficiente a:</label>
                                        <input type="number" id="coeff-a" class="form-control" placeholder="Coeficiente a (≠ 0)" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="coeff-b">Coeficiente b:</label>
                                        <input type="number" id="coeff-b" class="form-control" placeholder="Coeficiente b" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="coeff-c">Coeficiente c:</label>
                                        <input type="number" id="coeff-c" class="form-control" placeholder="Coeficiente c" step="any">
                                    </div>
                                </div>
                                
                                <div id="focus-directrix-inputs" style="display: none;">
                                    <div class="form-group">
                                        <label for="focus-x">Foco X:</label>
                                        <input type="number" id="focus-x" class="form-control" placeholder="Coordenada x del foco" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="focus-y">Foco Y:</label>
                                        <input type="number" id="focus-y" class="form-control" placeholder="Coordenada y del foco" step="any">
                                    </div>
                                    <div class="form-group">
                                        <label for="directrix-y">Directriz Y:</label>
                                        <input type="number" id="directrix-y" class="form-control" placeholder="Ecuación y = ?" step="any">
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.parabolaVertical.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.parabolaVertical.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría de Parábolas Verticales</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>Una parábola es el lugar geométrico de todos los puntos del plano que están a la misma distancia de un punto fijo (foco) y una recta fija (directriz).</p>
                                
                                <h4>Ecuaciones</h4>
                                
                                <h5>Forma Vértice</h5>
                                <div class="math-formula">
                                    <p>$$y = a(x - h)^2 + k$$</p>
                                </div>
                                
                                <h5>Forma Estándar</h5>
                                <div class="math-formula">
                                    <p>$$y = ax^2 + bx + c$$</p>
                                </div>
                                
                                <h4>Elementos</h4>
                                <ul>
                                    <li><strong>Vértice:</strong> $(h, k)$ donde $h = -\\frac{b}{2a}$</li>
                                    <li><strong>Eje de simetría:</strong> $x = h$</li>
                                    <li><strong>Foco:</strong> $(h, k + \\frac{1}{4a})$</li>
                                    <li><strong>Directriz:</strong> $y = k - \\frac{1}{4a}$</li>
                                </ul>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li>Si $a > 0$: parábola abre hacia arriba</li>
                                    <li>Si $a < 0$: parábola abre hacia abajo</li>
                                    <li>Mientras mayor $|a|$, más "cerrada" es la parábola</li>
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
    
    changeMethod: function() {
        const method = document.getElementById('parabola-method').value;
        
        // Ocultar todos los inputs
        document.getElementById('vertex-form-inputs').style.display = 'none';
        document.getElementById('standard-form-inputs').style.display = 'none';
        document.getElementById('focus-directrix-inputs').style.display = 'none';
        
        // Mostrar inputs según el método seleccionado
        if (method === 'vertex-form') {
            document.getElementById('vertex-form-inputs').style.display = 'block';
        } else if (method === 'standard-form') {
            document.getElementById('standard-form-inputs').style.display = 'block';
        } else if (method === 'focus-directrix') {
            document.getElementById('focus-directrix-inputs').style.display = 'block';
        }
    },
    
    calculate: function() {
        // Update settings from controls
        MathUtils.updateSettings();
        
        const method = document.getElementById('parabola-method').value;
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let h, k, a;
        
        if (method === 'vertex-form') {
            const hInput = document.getElementById('vertex-h').value;
            const kInput = document.getElementById('vertex-k').value;
            const aInput = document.getElementById('vertex-a').value;
            
            if (!utils.isValidNumber(hInput) || !utils.isValidNumber(kInput) || !utils.isValidNumber(aInput)) {
                utils.showError(resultContent, 'Por favor, ingresa valores válidos. El parámetro a debe ser diferente de cero.');
                return;
            }
            
            h = utils.parseInput(hInput);
            k = utils.parseInput(kInput);
            a = utils.parseInput(aInput);
            
            if (a === 0) {
                utils.showError(resultContent, 'El parámetro a debe ser diferente de cero.');
                return;
            }
        } else if (method === 'standard-form') {
            const aInput = document.getElementById('coeff-a').value;
            const bInput = document.getElementById('coeff-b').value;
            const cInput = document.getElementById('coeff-c').value;
            
            if (!utils.isValidNumber(aInput) || !utils.isValidNumber(bInput) || !utils.isValidNumber(cInput)) {
                utils.showError(resultContent, 'Por favor, ingresa valores válidos. El coeficiente a debe ser diferente de cero.');
                return;
            }
            
            a = utils.parseInput(aInput);
            const b = utils.parseInput(bInput);
            const c = utils.parseInput(cInput);
            
            if (a === 0) {
                utils.showError(resultContent, 'El coeficiente a debe ser diferente de cero.');
                return;
            }
            
            // Convertir a forma vértice
            h = -b / (2 * a);
            k = c - (b * b) / (4 * a);
        } else if (method === 'focus-directrix') {
            const focusXInput = document.getElementById('focus-x').value;
            const focusYInput = document.getElementById('focus-y').value;
            const directrixYInput = document.getElementById('directrix-y').value;
            
            if (!utils.isValidNumber(focusXInput) || !utils.isValidNumber(focusYInput) || !utils.isValidNumber(directrixYInput)) {
                utils.showError(resultContent, 'Por favor, ingresa valores válidos para el foco y la directriz.');
                return;
            }
            
            const focusX = utils.parseInput(focusXInput);
            const focusY = utils.parseInput(focusYInput);
            const directrixY = utils.parseInput(directrixYInput);
            
            if (focusY === directrixY) {
                utils.showError(resultContent, 'El foco y la directriz no pueden tener la misma coordenada Y.');
                return;
            }
            
            h = focusX;
            k = (focusY + directrixY) / 2;
            a = 1 / (2 * (focusY - directrixY));
        }
        
        // Calcular elementos de la parábola
        const focusX = h;
        const focusY = k + 1 / (4 * a);
        const directrixY = k - 1 / (4 * a);
        
        // Expandir a forma estándar
        const standardA = a;
        const standardB = -2 * a * h;
        const standardC = a * h * h + k;
        
        // Discriminante para intersecciones con x
        const discriminant = standardB * standardB - 4 * standardA * standardC;
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Información de la Parábola Vertical</h4>
                
                <div class="row">
                    <div class="col-md-6">
                        <h5>Parámetros Básicos</h5>
                        <ul>
                            <li><strong>Vértice:</strong> $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$</li>
                            <li><strong>Parámetro a:</strong> $a = ${utils.formatLatex(a)}$</li>
                            <li><strong>Dirección:</strong> ${a > 0 ? 'Abre hacia arriba' : 'Abre hacia abajo'}</li>
                        </ul>
                        
                        <h5>Elementos Geométricos</h5>
                        <ul>
                            <li><strong>Foco:</strong> $(${utils.formatLatex(focusX)}, ${utils.formatLatex(focusY)})$</li>
                            <li><strong>Directriz:</strong> $y = ${utils.formatLatex(directrixY)}$</li>
                            <li><strong>Eje de simetría:</strong> $x = ${utils.formatLatex(h)}$</li>
                        </ul>
                    </div>
                    
                    <div class="col-md-6">
                        <h5>Ecuaciones</h5>
                        
                        <p><strong>Forma Vértice:</strong></p>
                        <div class="math-formula">
                            <p>$$y = ${utils.formatLatex(a)}(x - ${utils.formatLatex(h)})^2 + ${utils.formatLatex(k)}$$</p>
                        </div>
                        
                        <p><strong>Forma Estándar:</strong></p>
                        <div class="math-formula">
                            <p>$$y = ${utils.formatLatex(standardA)}x^2 + ${utils.formatLatex(standardB)}x + ${utils.formatLatex(standardC)}$$</p>
                        </div>
                        
                        <h5>Intersecciones</h5>
                        <ul>
                            <li><strong>Con eje Y:</strong> $(0, ${utils.formatLatex(standardC)})$</li>
                            <li><strong>Con eje X:</strong> 
                                ${discriminant > 0 ? `Dos intersecciones` : 
                                  discriminant === 0 ? 'Una intersección (tangente)' : 
                                  'No intersecta al eje X'}
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="alert alert-info mt-3">
                    <h5><i class="fas fa-info-circle"></i> Características:</h5>
                    <p>Esta parábola vertical ${a > 0 ? 'tiene un mínimo' : 'tiene un máximo'} en el vértice $(${utils.formatLatex(h)}, ${utils.formatLatex(k)})$.</p>
                    <p>La distancia del vértice al foco es: $p = ${utils.formatLatex(Math.abs(1/(4*a)))}$</p>
                    <p>Factor de "abertura": ${Math.abs(a) > 1 ? 'Parábola cerrada' : Math.abs(a) < 1 ? 'Parábola abierta' : 'Parábola estándar'}</p>
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
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Parábola Vertical');
            
            // Set appropriate range based on parabola parameters
            const focusY = k + 1 / (4 * a);
            const directrixY = k - 1 / (4 * a);
            const range = Math.max(Math.abs(focusY - k), Math.abs(directrixY - k), 2);
            
            Grapher.updateRange(plotId, [h - range * 1.5, h + range * 1.5], [k - range * 1.5, k + range * 1.5]);
            
            // Draw parabola
            Grapher.drawParabola(plotId, h, k, a, {
                color: 'blue',
                width: 2,
                name: 'Parábola',
                isVertical: true
            });
            
            // Draw vertex
            Grapher.drawPoints(plotId, [{x: h, y: k, label: `Vértice(${h}, ${k})`}], {
                color: 'red',
                size: 8,
                name: 'Vértice',
                symbol: 'circle'
            });
            
            // Draw focus
            Grapher.drawPoints(plotId, [{x: h, y: focusY, label: `Foco(${h}, ${utils.formatLatex(focusY)})`}], {
                color: 'green',
                size: 6,
                name: 'Foco',
                symbol: 'circle'
            });
            
            // Draw directrix
            const directrixRange = range * 1.2;
            Grapher.drawLine(plotId, h - directrixRange, directrixY, h + directrixRange, directrixY, {
                color: 'orange',
                width: 2,
                name: `Directriz y = ${utils.formatLatex(directrixY)}`
            });
            
            // Agregar controles de navegación con modal
            Grapher.addNavigationControls(plotId, 'graph-container', 'Parábola Vertical');
            
            graphContainer.style.display = 'block';
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        const inputs = ['vertex-h', 'vertex-k', 'vertex-a', 'coeff-a', 'coeff-b', 'coeff-c', 
                       'focus-x', 'focus-y', 'directrix-y'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};