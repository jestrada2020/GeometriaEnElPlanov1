// Herramienta: Distancia entre puntos del plano
app.tools.distanciaPuntos = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-ruler"></i> Distancia entre Puntos del Plano</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Distancia</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="x1">Punto 1 - Coordenada X:</label>
                                    <input type="number" id="x1" class="form-control" placeholder="Ingresa x1" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="y1">Punto 1 - Coordenada Y:</label>
                                    <input type="number" id="y1" class="form-control" placeholder="Ingresa y1" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="x2">Punto 2 - Coordenada X:</label>
                                    <input type="number" id="x2" class="form-control" placeholder="Ingresa x2" step="any">
                                </div>
                                <div class="form-group">
                                    <label for="y2">Punto 2 - Coordenada Y:</label>
                                    <input type="number" id="y2" class="form-control" placeholder="Ingresa y2" step="any">
                                </div>
                                <button class="btn btn-primary" onclick="app.tools.distanciaPuntos.calculate()">
                                    <i class="fas fa-calculator"></i> Calcular Distancia
                                </button>
                                <button class="btn btn-secondary" onclick="app.tools.distanciaPuntos.clear()">
                                    <i class="fas fa-eraser"></i> Limpiar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría</h3>
                            </div>
                            <div class="card-body">
                                <p>La distancia entre dos puntos en el plano cartesiano se calcula usando la fórmula derivada del teorema de Pitágoras:</p>
                                <div class="math-formula">
                                    <p>$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$</p>
                                </div>
                                <p>Donde:</p>
                                <ul>
                                    <li>$P_1(x_1, y_1)$ es el primer punto</li>
                                    <li>$P_2(x_2, y_2)$ es el segundo punto</li>
                                    <li>$d$ es la distancia entre los puntos</li>
                                </ul>
                                
                                <h4>Ejemplo:</h4>
                                <p>Si tenemos los puntos $P_1(1, 2)$ y $P_2(4, 6)$:</p>
                                <p>$$d = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$</p>
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
                                <h3>Gráfica</h3>
                            </div>
                            <div class="card-body text-center">
                                <div id="graph-canvas"></div>
                                <small class="text-muted">Usa la rueda del mouse para zoom y arrastra para mover</small>
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
        
        const x1 = utils.parseInput ? utils.parseInput(document.getElementById('x1').value) : parseFloat(document.getElementById('x1').value) || 0;
        const y1 = utils.parseInput ? utils.parseInput(document.getElementById('y1').value) : parseFloat(document.getElementById('y1').value) || 0;
        const x2 = utils.parseInput ? utils.parseInput(document.getElementById('x2').value) : parseFloat(document.getElementById('x2').value) || 0;
        const y2 = utils.parseInput ? utils.parseInput(document.getElementById('y2').value) : parseFloat(document.getElementById('y2').value) || 0;
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validar inputs (ahora soporta fracciones)
        const inputs = ['x1', 'y1', 'x2', 'y2'];
        const values = [x1, y1, x2, y2];
        
        // Verificar que todos los inputs tengan valores válidos
        for (let i = 0; i < inputs.length; i++) {
            const inputValue = document.getElementById(inputs[i]).value.trim();
            if (inputValue === '' || isNaN(values[i])) {
                utils.showError(resultContent, 'Por favor, ingresa valores numéricos válidos en todos los campos (decimales o fracciones como 3/4).');
                return;
            }
        }
        
        // Calcular distancia
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Mostrar resultados
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Cálculo paso a paso:</h4>
                <p><strong>Puntos dados:</strong></p>
                <ul>
                    <li>$P_1(${utils.formatLatex ? utils.formatLatex(x1) : x1.toFixed(2)}, ${utils.formatLatex ? utils.formatLatex(y1) : y1.toFixed(2)})$</li>
                    <li>$P_2(${utils.formatLatex ? utils.formatLatex(x2) : x2.toFixed(2)}, ${utils.formatLatex ? utils.formatLatex(y2) : y2.toFixed(2)})$</li>
                </ul>
                
                <p><strong>Aplicando la fórmula:</strong></p>
                <p>$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$</p>
                
                <p><strong>Sustituyendo valores:</strong></p>
                <p>$$d = \\sqrt{(${utils.formatLatex ? utils.formatLatex(x2) : x2.toFixed(2)} - ${utils.formatLatex ? utils.formatLatex(x1) : x1.toFixed(2)})^2 + (${utils.formatLatex ? utils.formatLatex(y2) : y2.toFixed(2)} - ${utils.formatLatex ? utils.formatLatex(y1) : y1.toFixed(2)})^2}$$</p>
                <p>$$d = \\sqrt{(${utils.formatLatex ? utils.formatLatex(deltaX) : deltaX.toFixed(2)})^2 + (${utils.formatLatex ? utils.formatLatex(deltaY) : deltaY.toFixed(2)})^2}$$</p>
                <p>$$d = \\sqrt{${utils.formatLatex ? utils.formatLatex(deltaX * deltaX) : (deltaX * deltaX).toFixed(2)} + ${utils.formatLatex ? utils.formatLatex(deltaY * deltaY) : (deltaY * deltaY).toFixed(2)}}$$</p>
                <p>$$d = \\sqrt{${utils.formatLatex ? utils.formatLatex(deltaX * deltaX + deltaY * deltaY) : (deltaX * deltaX + deltaY * deltaY).toFixed(2)}}$$</p>
                
                <div class="alert alert-success">
                    <h5><i class="fas fa-check-circle"></i> Resultado final:</h5>
                    <p class="text-center"><strong>$$d = ${utils.formatLatex ? utils.formatLatex(distance) : distance.toFixed(3)}$$</strong></p>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica
        this.drawGraph(x1, y1, x2, y2, distance);
        
        app.reprocessMathJax();
    },
    
    drawGraph: function(x1, y1, x2, y2, distance) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Distancia entre Puntos');
            
            if (plotId) {
                // Dibujar puntos
                const points = [
                    {x: x1, y: y1, label: `P₁(${x1.toFixed(2)}, ${y1.toFixed(2)})`},
                    {x: x2, y: y2, label: `P₂(${x2.toFixed(2)}, ${y2.toFixed(2)})`}
                ];
                
                Grapher.drawPoints(plotId, points, {
                    color: 'blue',
                    size: 10,
                    name: 'Puntos'
                });
                
                // Dibujar línea entre puntos
                Grapher.drawLine(plotId, x1, y1, x2, y2, {
                    color: 'green',
                    width: 3,
                    name: `Distancia = ${distance.toFixed(3)}`
                });
                
                // Ajustar rango del gráfico con margen apropiado
                const margin = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), 2) * 1.2;
                const centerX = (x1 + x2) / 2;
                const centerY = (y1 + y2) / 2;
                
                Grapher.updateRange(plotId, 
                    [centerX - margin, centerX + margin],
                    [centerY - margin, centerY + margin]
                );
                
                // Agregar controles de navegación
                Grapher.addNavigationControls(plotId, 'graph-container', 'Distancia entre Puntos');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        document.getElementById('x1').value = '';
        document.getElementById('y1').value = '';
        document.getElementById('x2').value = '';
        document.getElementById('y2').value = '';
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};