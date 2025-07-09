// Herramienta: Sistemas Lineales y No Lineales
app.tools.sistemaRectas = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-project-diagram"></i> Sistemas Lineales y No Lineales</h2>
                
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h3>Sistema de Ecuaciones 2x2</h3>
                            </div>
                            <div class="card-body">
                                <p>Resuelve un sistema de la forma:</p>
                                <div class="math-formula">
                                    <p>$$\\begin{cases}
                                        a_1x + b_1y = c_1 \\\\
                                        a_2x + b_2y = c_2
                                    \\end{cases}$$</p>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4>Primera Ecuación</h4>
                                        <div class="form-group">
                                            <label for="a1">Coeficiente a₁:</label>
                                            <input type="number" id="a1" class="form-control" placeholder="a₁" step="any">
                                        </div>
                                        <div class="form-group">
                                            <label for="b1">Coeficiente b₁:</label>
                                            <input type="number" id="b1" class="form-control" placeholder="b₁" step="any">
                                        </div>
                                        <div class="form-group">
                                            <label for="c1">Término independiente c₁:</label>
                                            <input type="number" id="c1" class="form-control" placeholder="c₁" step="any">
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <h4>Segunda Ecuación</h4>
                                        <div class="form-group">
                                            <label for="a2">Coeficiente a₂:</label>
                                            <input type="number" id="a2" class="form-control" placeholder="a₂" step="any">
                                        </div>
                                        <div class="form-group">
                                            <label for="b2">Coeficiente b₂:</label>
                                            <input type="number" id="b2" class="form-control" placeholder="b₂" step="any">
                                        </div>
                                        <div class="form-group">
                                            <label for="c2">Término independiente c₂:</label>
                                            <input type="number" id="c2" class="form-control" placeholder="c₂" step="any">
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.sistemaRectas.solve()">
                                        <i class="fas fa-calculator"></i> Resolver Sistema
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.sistemaRectas.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h3>Métodos de Resolución</h3>
                            </div>
                            <div class="card-body">
                                <h4>Regla de Cramer</h4>
                                <p>Para un sistema 2x2:</p>
                                <div class="math-formula">
                                    <p>$$x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D}$$</p>
                                </div>
                                <p>Donde:</p>
                                <ul>
                                    <li>$D = a_1b_2 - a_2b_1$</li>
                                    <li>$D_x = c_1b_2 - c_2b_1$</li>
                                    <li>$D_y = a_1c_2 - a_2c_1$</li>
                                </ul>
                                
                                <h4>Casos Especiales</h4>
                                <ul>
                                    <li><strong>$D ≠ 0$:</strong> Solución única</li>
                                    <li><strong>$D = 0$ y $D_x = D_y = 0$:</strong> Infinitas soluciones</li>
                                    <li><strong>$D = 0$ y ($D_x ≠ 0$ o $D_y ≠ 0$):</strong> Sin solución</li>
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
                                <h3>Gráfica del Sistema</h3>
                            </div>
                            <div class="card-body text-center">
                                <div id="graph-canvas"></div>
                                <small class="text-muted">Usa la rueda del mouse para zoom y arrastra para mover</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="math-controls-container-sistema"></div>
            </div>
        `;
        
        // Agregar controles de configuración matemática
        MathUtils.createControls('math-controls-container-sistema');
    },
    
    solve: function() {
        // Actualizar configuración antes de calcular
        MathUtils.updateSettings();
        
        const a1 = utils.parseInput(document.getElementById('a1').value);
        const b1 = utils.parseInput(document.getElementById('b1').value);
        const c1 = utils.parseInput(document.getElementById('c1').value);
        const a2 = utils.parseInput(document.getElementById('a2').value);
        const b2 = utils.parseInput(document.getElementById('b2').value);
        const c2 = utils.parseInput(document.getElementById('c2').value);
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validar inputs (ahora soporta fracciones)
        if (!utils.isValidNumber(document.getElementById('a1').value) || 
            !utils.isValidNumber(document.getElementById('b1').value) || 
            !utils.isValidNumber(document.getElementById('c1').value) ||
            !utils.isValidNumber(document.getElementById('a2').value) || 
            !utils.isValidNumber(document.getElementById('b2').value) || 
            !utils.isValidNumber(document.getElementById('c2').value)) {
            utils.showError(resultContent, 'Por favor, ingresa valores válidos (decimales o fracciones como 1/2).');
            return;
        }
        
        // Calcular determinantes
        const D = a1 * b2 - a2 * b1;
        const Dx = c1 * b2 - c2 * b1;
        const Dy = a1 * c2 - a2 * c1;
        
        let solutionType = '';
        let solutionText = '';
        
        if (Math.abs(D) < 1e-10) { // D ≈ 0
            if (Math.abs(Dx) < 1e-10 && Math.abs(Dy) < 1e-10) {
                solutionType = 'infinitas';
                solutionText = 'El sistema tiene <strong>infinitas soluciones</strong> (las ecuaciones son dependientes).';
            } else {
                solutionType = 'sin-solucion';
                solutionText = 'El sistema <strong>no tiene solución</strong> (las ecuaciones son inconsistentes).';
            }
        } else {
            solutionType = 'unica';
            const x = Dx / D;
            const y = Dy / D;
            solutionText = `El sistema tiene una <strong>solución única</strong>:<br>
                           $x = ${utils.formatLatex(x)}$<br>
                           $y = ${utils.formatLatex(y)}$`;
        }
        
        // Mostrar resultados
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Sistema de Ecuaciones:</h4>
                <div class="math-formula">
                    <p>$$\\begin{cases}
                        ${utils.formatNumber(a1)}x + ${utils.formatNumber(b1)}y = ${utils.formatNumber(c1)} \\\\
                        ${utils.formatNumber(a2)}x + ${utils.formatNumber(b2)}y = ${utils.formatNumber(c2)}
                    \\end{cases}$$</p>
                </div>
                
                <h4>Cálculo de Determinantes:</h4>
                <p><strong>Determinante principal (D):</strong></p>
                <p>$$D = a_1b_2 - a_2b_1 = (${utils.formatNumber(a1)})(${utils.formatNumber(b2)}) - (${utils.formatNumber(a2)})(${utils.formatNumber(b1)}) = ${utils.formatNumber(D)}$$</p>
                
                <p><strong>Determinante Dx:</strong></p>
                <p>$$D_x = c_1b_2 - c_2b_1 = (${utils.formatNumber(c1)})(${utils.formatNumber(b2)}) - (${utils.formatNumber(c2)})(${utils.formatNumber(b1)}) = ${utils.formatNumber(Dx)}$$</p>
                
                <p><strong>Determinante Dy:</strong></p>
                <p>$$D_y = a_1c_2 - a_2c_1 = (${utils.formatNumber(a1)})(${utils.formatNumber(c2)}) - (${utils.formatNumber(a2)})(${utils.formatNumber(c1)}) = ${utils.formatNumber(Dy)}$$</p>
                
                <div class="alert alert-info">
                    <h5><i class="fas fa-info-circle"></i> Análisis de la Solución:</h5>
                    <p>${solutionText}</p>
                </div>
                
                ${solutionType === 'unica' ? `
                <div class="alert alert-success">
                    <h5><i class="fas fa-check-circle"></i> Verificación:</h5>
                    <p>Sustituyendo en la primera ecuación:</p>
                    <p>$$${utils.formatNumber(a1)}(${utils.formatNumber(Dx/D, 4)}) + ${utils.formatNumber(b1)}(${utils.formatNumber(Dy/D, 4)}) = ${utils.formatNumber(a1*(Dx/D) + b1*(Dy/D), 4)} ≈ ${utils.formatNumber(c1)}$$</p>
                    <p>Sustituyendo en la segunda ecuación:</p>
                    <p>$$${utils.formatNumber(a2)}(${utils.formatNumber(Dx/D, 4)}) + ${utils.formatNumber(b2)}(${utils.formatNumber(Dy/D, 4)}) = ${utils.formatNumber(a2*(Dx/D) + b2*(Dy/D), 4)} ≈ ${utils.formatNumber(c2)}$$</p>
                </div>
                ` : ''}
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        
        // Mostrar gráfica del sistema
        this.drawGraph(a1, b1, c1, a2, b2, c2, solutionType, solutionType === 'unica' ? Dx/D : null, solutionType === 'unica' ? Dy/D : null);
        
        app.reprocessMathJax();
    },
    
    drawGraph: function(a1, b1, c1, a2, b2, c2, solutionType, x, y) {
        const graphContainer = document.getElementById('graph-container');
        
        try {
            // Crear gráfico con Plotly
            const plotId = Grapher.createPlot('graph-canvas', 400, 300, 'Sistema de Ecuaciones');
            
            if (plotId) {
                // Dibujar primera línea: a1*x + b1*y + c1 = 0
                Grapher.drawExtendedLine(plotId, a1, b1, c1, {
                    color: 'blue',
                    width: 3,
                    name: `L₁: ${a1}x + ${b1}y + ${c1} = 0`,
                    range: 15
                });
                
                // Dibujar segunda línea: a2*x + b2*y + c2 = 0
                Grapher.drawExtendedLine(plotId, a2, b2, c2, {
                    color: 'red',
                    width: 3,
                    name: `L₂: ${a2}x + ${b2}y + ${c2} = 0`,
                    range: 15
                });
                
                // Marcar punto de intersección si existe solución única
                if (solutionType === 'unica' && x !== null && y !== null) {
                    Grapher.drawPoints(plotId, [{
                        x: x, 
                        y: y, 
                        label: `Solución(${utils.formatLatex ? utils.formatLatex(x) : x.toFixed(2)}, ${utils.formatLatex ? utils.formatLatex(y) : y.toFixed(2)})`
                    }], {
                        color: 'green',
                        size: 12,
                        name: 'Solución',
                        symbol: 'star'
                    });
                }
                
                // Configurar rango apropiado
                const range = Math.max(Math.abs(x || 5), Math.abs(y || 5), 5);
                Grapher.updateRange(plotId, [-range, range], [-range, range]);
                
                // Agregar controles de navegación con modal
                Grapher.addNavigationControls(plotId, 'graph-container', 'Sistema de Rectas');
                
                graphContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error creating graph:', error);
            graphContainer.innerHTML = '<p class="text-danger">Error al crear el gráfico. Verifica que Plotly esté cargado correctamente.</p>';
            graphContainer.style.display = 'block';
        }
    },
    
    clear: function() {
        ['a1', 'b1', 'c1', 'a2', 'b2', 'c2'].forEach(id => {
            document.getElementById(id).value = '';
        });
        document.getElementById('results').style.display = 'none';
        document.getElementById('graph-container').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};