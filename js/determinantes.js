// Herramienta: Determinantes por Operaciones
app.tools.determinantes = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-calculator"></i> Determinantes por Operaciones</h2>
                
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h3>Cálculo de Determinantes</h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Tamaño de la matriz:</label>
                                    <select id="matrix-size" class="form-control" onchange="app.tools.determinantes.generateMatrix()">
                                        <option value="2">2×2</option>
                                        <option value="3">3×3</option>
                                        <option value="4">4×4</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label>Método de cálculo:</label>
                                    <select id="method" class="form-control">
                                        <option value="cofactor">Expansión por cofactores</option>
                                        <option value="row-reduction">Reducción por filas</option>
                                        <option value="rule-sarrus">Regla de Sarrus (solo 3×3)</option>
                                    </select>
                                </div>
                                
                                <h4>Matriz A</h4>
                                <div id="matrix-a"></div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.determinantes.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular Automático
                                    </button>
                                    <button class="btn btn-success" onclick="app.tools.determinantes.startInteractive()">
                                        <i class="fas fa-play"></i> Modo Interactivo
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.determinantes.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.determinantes.generateExample()">
                                        <i class="fas fa-lightbulb"></i> Ejemplo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría de Determinantes</h3>
                            </div>
                            <div class="card-body">
                                <h4>Determinante 2×2</h4>
                                <div class="math-formula">
                                    <p>$$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$</p>
                                </div>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li>$\\det(A^T) = \\det(A)$</li>
                                    <li>$\\det(AB) = \\det(A)\\det(B)$</li>
                                    <li>$\\det(kA) = k^n\\det(A)$</li>
                                    <li>Si A tiene fila/columna nula, $\\det(A) = 0$</li>
                                </ul>
                                
                                <h4>Interpretación Geométrica</h4>
                                <ul>
                                    <li><strong>2×2:</strong> Área del paralelogramo</li>
                                    <li><strong>3×3:</strong> Volumen del paralelepípedo</li>
                                    <li><strong>General:</strong> Factor de escala de volumen</li>
                                </ul>
                                
                                <h4>Aplicaciones</h4>
                                <ul>
                                    <li>Resolver sistemas (Regla de Cramer)</li>
                                    <li>Calcular área/volumen</li>
                                    <li>Determinar invertibilidad</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div id="interactive-controls-det" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Operaciones para Determinantes</h3>
                            </div>
                            <div class="card-body">
                                <div id="current-matrix-det"></div>
                                
                                <div class="alert alert-info">
                                    <small>
                                        <strong>Efectos en el determinante:</strong><br>
                                        • Intercambiar filas: det(A) → -det(A)<br>
                                        • Multiplicar fila por k: det(A) → k·det(A)<br>
                                        • Sumar múltiplo de fila: det(A) → det(A)
                                    </small>
                                </div>
                                
                                <h5 class="mt-3">Operaciones:</h5>
                                
                                <div class="operation-group mb-3">
                                    <h6>1. Intercambiar Filas</h6>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <select id="det-swap-row1" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <select id="det-swap-row2" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-sm btn-warning" onclick="app.tools.determinantes.swapRowsInteractive()">
                                                <i class="fas fa-exchange-alt"></i> Intercambiar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="operation-group mb-3">
                                    <h6>2. Multiplicar Fila</h6>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <select id="det-mult-row" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="number" id="det-mult-factor" class="form-control" placeholder="Factor" step="any">
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-sm btn-info" onclick="app.tools.determinantes.multiplyRowInteractive()">
                                                <i class="fas fa-times"></i> Multiplicar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="operation-group mb-3">
                                    <h6>3. Suma de Filas</h6>
                                    <div class="row mb-2">
                                        <div class="col-md-3">
                                            <input type="number" id="det-add-factor" class="form-control" placeholder="Factor" step="any">
                                        </div>
                                        <div class="col-md-3">
                                            <select id="det-add-source" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <select id="det-add-target" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <button class="btn btn-sm btn-success" onclick="app.tools.determinantes.addRowsInteractive()">
                                                <i class="fas fa-plus"></i> Sumar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.determinantes.calculateInteractiveDet()">
                                        <i class="fas fa-equals"></i> Calcular Det Final
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.determinantes.resetInteractiveDet()">
                                        <i class="fas fa-undo"></i> Reiniciar
                                    </button>
                                </div>
                                
                                <div class="mt-3">
                                    <h6>Determinante Actual:</h6>
                                    <div id="current-det-value" class="alert alert-primary">
                                        det(A) = <span id="det-multiplier">1</span> × det(matriz actual)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div id="results" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Cálculo del Determinante</h3>
                            </div>
                            <div class="card-body">
                                <div id="result-content"></div>
                            </div>
                        </div>
                        
                        <div id="interactive-history-det" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Historial de Operaciones</h3>
                            </div>
                            <div class="card-body">
                                <div id="operation-history-det"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="math-controls-container-determinantes"></div>
            </div>
        `;
        
        this.generateMatrix();
        // Agregar controles de configuración matemática
        MathUtils.createControls('math-controls-container-determinantes');
    },
    
    generateMatrix: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        const container = document.getElementById('matrix-a');
        
        let html = '<div class="matrix-container">';
        html += '<table class="table table-bordered" style="width: auto; margin: 0 auto;">';
        
        for (let i = 0; i < size; i++) {
            html += '<tr>';
            for (let j = 0; j < size; j++) {
                html += `<td><input type="number" id="a_${i}_${j}" class="form-control" placeholder="a${i+1}${j+1}" step="any" style="width: 80px; text-align: center;"></td>`;
            }
            html += '</tr>';
        }
        
        html += '</table></div>';
        container.innerHTML = html;
    },
    
    generateExample: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        const examples = {
            2: [[3, 1], [2, 4]],
            3: [[2, 1, 3], [1, 4, 2], [3, 2, 1]],
            4: [[1, 2, 3, 4], [2, 1, 4, 3], [3, 4, 1, 2], [4, 3, 2, 1]]
        };
        
        const example = examples[size];
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`a_${i}_${j}`).value = example[i][j];
            }
        }
    },
    
    calculate: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        const method = document.getElementById('method').value;
        
        const matrix = this.readMatrix(size);
        const result = this.calculateDeterminant(matrix, size, method);
        
        this.displayResult(result, matrix, size, method);
    },
    
    readMatrix: function(size) {
        // Actualizar configuración antes de leer
        MathUtils.updateSettings();
        
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                const value = utils.parseInput(document.getElementById(`a_${i}_${j}`).value) || 0;
                matrix[i][j] = value;
            }
        }
        return matrix;
    },
    
    calculateDeterminant: function(matrix, size, method) {
        if (method === 'cofactor') {
            return this.determinantCofactor(matrix, size);
        } else if (method === 'row-reduction') {
            return this.determinantRowReduction(matrix, size);
        } else if (method === 'rule-sarrus' && size === 3) {
            return this.determinantSarrus(matrix);
        } else {
            return this.determinantCofactor(matrix, size);
        }
    },
    
    determinantCofactor: function(matrix, size) {
        const steps = [];
        
        if (size === 1) {
            return {
                value: matrix[0][0],
                steps: [{ description: 'Determinante 1×1', calculation: `det(A) = ${matrix[0][0]}` }]
            };
        }
        
        if (size === 2) {
            const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            steps.push({
                description: 'Fórmula para determinante 2×2',
                calculation: `det(A) = (${matrix[0][0]})(${matrix[1][1]}) - (${matrix[0][1]})(${matrix[1][0]}) = ${det}`
            });
            
            return { value: det, steps: steps };
        }
        
        // Para matrices más grandes, usar expansión por cofactores
        let det = 0;
        let calculation = 'det(A) = ';
        
        for (let j = 0; j < size; j++) {
            const cofactor = this.getCofactor(matrix, 0, j, size);
            const sign = Math.pow(-1, j);
            const term = sign * matrix[0][j] * cofactor.value;
            det += term;
            
            if (j > 0) calculation += ' + ';
            calculation += `${sign > 0 ? '+' : '-'}(${matrix[0][j]})(${cofactor.value})`;
        }
        
        steps.push({
            description: `Expansión por cofactores (primera fila)`,
            calculation: calculation + ` = ${det}`
        });
        
        return { value: det, steps: steps };
    },
    
    getCofactor: function(matrix, row, col, size) {
        const minor = [];
        let minorRow = 0;
        
        for (let i = 0; i < size; i++) {
            if (i === row) continue;
            minor[minorRow] = [];
            let minorCol = 0;
            
            for (let j = 0; j < size; j++) {
                if (j === col) continue;
                minor[minorRow][minorCol] = matrix[i][j];
                minorCol++;
            }
            minorRow++;
        }
        
        return this.determinantCofactor(minor, size - 1);
    },
    
    determinantRowReduction: function(matrix, size) {
        const steps = [];
        const workMatrix = this.copyMatrix(matrix, size);
        let det = 1;
        let swaps = 0;
        
        steps.push({
            description: 'Matriz inicial',
            matrix: this.copyMatrix(workMatrix, size)
        });
        
        for (let i = 0; i < size; i++) {
            // Buscar pivote
            let maxRow = i;
            for (let k = i + 1; k < size; k++) {
                if (Math.abs(workMatrix[k][i]) > Math.abs(workMatrix[maxRow][i])) {
                    maxRow = k;
                }
            }
            
            // Intercambiar filas si es necesario
            if (maxRow !== i) {
                [workMatrix[i], workMatrix[maxRow]] = [workMatrix[maxRow], workMatrix[i]];
                swaps++;
                steps.push({
                    description: `Intercambiar filas ${i + 1} y ${maxRow + 1}`,
                    matrix: this.copyMatrix(workMatrix, size)
                });
            }
            
            // Verificar si el pivote es cero
            if (Math.abs(workMatrix[i][i]) < 1e-10) {
                return { value: 0, steps: steps };
            }
            
            det *= workMatrix[i][i];
            
            // Hacer ceros debajo del pivote
            for (let k = i + 1; k < size; k++) {
                if (Math.abs(workMatrix[k][i]) > 1e-10) {
                    const factor = workMatrix[k][i] / workMatrix[i][i];
                    for (let j = i; j < size; j++) {
                        workMatrix[k][j] -= factor * workMatrix[i][j];
                    }
                    
                    steps.push({
                        description: `Eliminar en fila ${k + 1} (restar ${utils.formatNumber(factor)} × fila ${i + 1})`,
                        matrix: this.copyMatrix(workMatrix, size)
                    });
                }
            }
        }
        
        // Ajustar signo por intercambios
        det *= Math.pow(-1, swaps);
        
        return { value: det, steps: steps };
    },
    
    determinantSarrus: function(matrix) {
        const steps = [];
        
        // Productos positivos
        const pos1 = matrix[0][0] * matrix[1][1] * matrix[2][2];
        const pos2 = matrix[0][1] * matrix[1][2] * matrix[2][0];
        const pos3 = matrix[0][2] * matrix[1][0] * matrix[2][1];
        
        // Productos negativos
        const neg1 = matrix[0][2] * matrix[1][1] * matrix[2][0];
        const neg2 = matrix[0][0] * matrix[1][2] * matrix[2][1];
        const neg3 = matrix[0][1] * matrix[1][0] * matrix[2][2];
        
        const det = pos1 + pos2 + pos3 - neg1 - neg2 - neg3;
        
        steps.push({
            description: 'Regla de Sarrus',
            calculation: `
                Productos positivos: ${pos1} + ${pos2} + ${pos3} = ${pos1 + pos2 + pos3}
                Productos negativos: ${neg1} + ${neg2} + ${neg3} = ${neg1 + neg2 + neg3}
                Determinante: ${pos1 + pos2 + pos3} - ${neg1 + neg2 + neg3} = ${det}
            `
        });
        
        return { value: det, steps: steps };
    },
    
    copyMatrix: function(matrix, size) {
        const copy = [];
        for (let i = 0; i < size; i++) {
            copy[i] = [];
            for (let j = 0; j < size; j++) {
                copy[i][j] = matrix[i][j];
            }
        }
        return copy;
    },
    
    displayResult: function(result, matrix, size, method) {
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let content = '<div class="result-section">';
        
        content += '<h4>Matriz Original</h4>';
        content += `<div class="math-formula">`;
        content += `<p>$$A = ${this.matrixToLatex(matrix, size)}$$</p>`;
        content += `</div>`;
        
        content += `<h4>Método: ${this.getMethodName(method)}</h4>`;
        
        if (result.steps) {
            content += '<h4>Proceso de Cálculo:</h4>';
            result.steps.forEach((step, index) => {
                content += `<div class="step-container mb-3">`;
                content += `<h5>${step.description}</h5>`;
                if (step.matrix) {
                    content += `<div class="math-formula">`;
                    content += `<p>$$${this.matrixToLatex(step.matrix, size)}$$</p>`;
                    content += `</div>`;
                }
                if (step.calculation) {
                    content += `<p>${step.calculation}</p>`;
                }
                content += `</div>`;
            });
        }
        
        content += '<div class="alert alert-success">';
        content += '<h5><i class="fas fa-check-circle"></i> Resultado Final:</h5>';
        content += `<div class="math-formula">`;
        content += `<p>$$\\det(A) = ${utils.formatNumber(result.value, 4)}$$</p>`;
        content += `</div>`;
        content += '</div>';
        
        // Interpretación
        content += '<div class="alert alert-info">';
        content += '<h5><i class="fas fa-info-circle"></i> Interpretación:</h5>';
        if (Math.abs(result.value) < 1e-10) {
            content += '<p>La matriz es <strong>singular</strong> (no invertible) porque su determinante es 0.</p>';
        } else {
            content += '<p>La matriz es <strong>no singular</strong> (invertible) porque su determinante es diferente de 0.</p>';
        }
        
        if (size === 2) {
            content += `<p>El área del paralelogramo formado por las columnas es: <strong>${Math.abs(result.value).toFixed(4)}</strong></p>`;
        } else if (size === 3) {
            content += `<p>El volumen del paralelepípedo formado por las columnas es: <strong>${Math.abs(result.value).toFixed(4)}</strong></p>`;
        }
        
        content += '</div>';
        content += '</div>';
        
        resultContent.innerHTML = content;
        resultsDiv.style.display = 'block';
        app.reprocessMathJax();
    },
    
    getMethodName: function(method) {
        const names = {
            'cofactor': 'Expansión por Cofactores',
            'row-reduction': 'Reducción por Filas',
            'rule-sarrus': 'Regla de Sarrus'
        };
        return names[method] || 'Método desconocido';
    },
    
    matrixToLatex: function(matrix, size) {
        let latex = '\\begin{vmatrix}';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                latex += utils.formatNumber(matrix[i][j]);
                if (j < size - 1) latex += ' & ';
            }
            if (i < size - 1) latex += ' \\\\ ';
        }
        latex += '\\end{vmatrix}';
        return latex;
    },
    
    // Variables para modo interactivo de determinantes
    interactiveMatrixDet: null,
    originalMatrixDet: null,
    operationHistoryDet: [],
    determinantMultiplier: 1,
    isInteractiveModeDet: false,
    
    startInteractive: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        // Leer matriz original
        this.originalMatrixDet = this.readMatrix(size);
        this.interactiveMatrixDet = this.copyMatrix(this.originalMatrixDet, size);
        this.operationHistoryDet = [];
        this.determinantMultiplier = 1;
        this.isInteractiveModeDet = true;
        
        // Mostrar controles interactivos
        document.getElementById('interactive-controls-det').style.display = 'block';
        document.getElementById('interactive-history-det').style.display = 'block';
        document.getElementById('results').style.display = 'none';
        
        // Actualizar opciones de filas
        this.updateRowSelectorsDet(size);
        
        // Mostrar matriz actual
        this.displayCurrentMatrixDet(size);
        this.updateOperationHistoryDet();
        this.updateDeterminantDisplay();
    },
    
    updateRowSelectorsDet: function(size) {
        const selectors = ['det-swap-row1', 'det-swap-row2', 'det-mult-row', 'det-add-source', 'det-add-target'];
        
        selectors.forEach(id => {
            const select = document.getElementById(id);
            select.innerHTML = '';
            for (let i = 0; i < size; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `Fila ${i + 1}`;
                select.appendChild(option);
            }
        });
    },
    
    displayCurrentMatrixDet: function(size) {
        const container = document.getElementById('current-matrix-det');
        
        let html = '<h5>Matriz Actual:</h5>';
        html += '<div class="math-formula">';
        html += `<p>$$${this.matrixToLatex(this.interactiveMatrixDet, size)}$$</p>`;
        html += '</div>';
        
        container.innerHTML = html;
        app.reprocessMathJax();
    },
    
    updateDeterminantDisplay: function() {
        document.getElementById('det-multiplier').textContent = utils.formatNumber(this.determinantMultiplier, 4);
    },
    
    swapRowsInteractive: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        const row1 = parseInt(document.getElementById('det-swap-row1').value);
        const row2 = parseInt(document.getElementById('det-swap-row2').value);
        
        if (row1 === row2) {
            utils.showError(document.getElementById('current-matrix-det'), 'Selecciona filas diferentes para intercambiar.');
            return;
        }
        
        // Intercambiar filas
        [this.interactiveMatrixDet[row1], this.interactiveMatrixDet[row2]] = [this.interactiveMatrixDet[row2], this.interactiveMatrixDet[row1]];
        
        // El determinante cambia de signo
        this.determinantMultiplier *= -1;
        
        // Registrar operación
        this.operationHistoryDet.push({
            type: 'swap',
            description: `Intercambiar F${row1 + 1} ↔ F${row2 + 1}`,
            notation: `F${row1 + 1} ↔ F${row2 + 1}`,
            effect: 'det(A) → -det(A)'
        });
        
        this.displayCurrentMatrixDet(size);
        this.updateOperationHistoryDet();
        this.updateDeterminantDisplay();
    },
    
    multiplyRowInteractive: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        const row = parseInt(document.getElementById('det-mult-row').value);
        const factor = utils.parseInput(document.getElementById('det-mult-factor').value);
        
        if (!utils.isValidNumber(document.getElementById('det-mult-factor').value) || factor === 0) {
            utils.showError(document.getElementById('current-matrix-det'), 'Ingresa un factor válido diferente de cero (decimales o fracciones como 1/2).');
            return;
        }
        
        // Multiplicar fila
        for (let j = 0; j < size; j++) {
            this.interactiveMatrixDet[row][j] *= factor;
        }
        
        // El determinante se multiplica por el factor
        this.determinantMultiplier *= factor;
        
        // Registrar operación
        this.operationHistoryDet.push({
            type: 'multiply',
            description: `Multiplicar F${row + 1} por ${utils.formatNumber(factor)}`,
            notation: `F${row + 1} → ${utils.formatNumber(factor)}F${row + 1}`,
            effect: `det(A) → ${utils.formatNumber(factor)}·det(A)`
        });
        
        document.getElementById('det-mult-factor').value = '';
        this.displayCurrentMatrixDet(size);
        this.updateOperationHistoryDet();
        this.updateDeterminantDisplay();
    },
    
    addRowsInteractive: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        const factor = utils.parseInput(document.getElementById('det-add-factor').value);
        const sourceRow = parseInt(document.getElementById('det-add-source').value);
        const targetRow = parseInt(document.getElementById('det-add-target').value);
        
        if (!utils.isValidNumber(document.getElementById('det-add-factor').value)) {
            utils.showError(document.getElementById('current-matrix-det'), 'Ingresa un factor válido (decimales o fracciones como 3/4).');
            return;
        }
        
        if (sourceRow === targetRow) {
            utils.showError(document.getElementById('current-matrix-det'), 'Selecciona filas diferentes.');
            return;
        }
        
        // Sumar filas: targetRow = targetRow + factor * sourceRow
        for (let j = 0; j < size; j++) {
            this.interactiveMatrixDet[targetRow][j] += factor * this.interactiveMatrixDet[sourceRow][j];
        }
        
        // Esta operación NO cambia el determinante
        
        // Registrar operación
        const sign = factor >= 0 ? '+' : '';
        this.operationHistoryDet.push({
            type: 'add',
            description: `F${targetRow + 1} = F${targetRow + 1} ${sign}${utils.formatNumber(factor)}F${sourceRow + 1}`,
            notation: `F${targetRow + 1} → F${targetRow + 1} ${sign}${utils.formatNumber(factor)}F${sourceRow + 1}`,
            effect: 'det(A) → det(A) (sin cambio)'
        });
        
        document.getElementById('det-add-factor').value = '';
        this.displayCurrentMatrixDet(size);
        this.updateOperationHistoryDet();
    },
    
    updateOperationHistoryDet: function() {
        const container = document.getElementById('operation-history-det');
        
        if (this.operationHistoryDet.length === 0) {
            container.innerHTML = '<p class="text-muted">No se han realizado operaciones aún.</p>';
            return;
        }
        
        let html = '<ol>';
        this.operationHistoryDet.forEach((op, index) => {
            html += `<li>`;
            html += `<strong>${op.notation}</strong><br>`;
            html += `<small class="text-muted">${op.effect}</small>`;
            html += `</li>`;
        });
        html += '</ol>';
        
        container.innerHTML = html;
    },
    
    calculateInteractiveDet: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        // Calcular determinante de la matriz actual
        const currentDet = this.determinantCofactor(this.interactiveMatrixDet, size);
        const finalDet = this.determinantMultiplier * currentDet.value;
        
        // Mostrar resultado final
        const resultContent = document.getElementById('result-content');
        
        let content = '<div class="result-section">';
        content += '<h4>Resultado del Modo Interactivo</h4>';
        
        content += '<h5>Matriz Original:</h5>';
        content += '<div class="math-formula">';
        content += `<p>$$${this.matrixToLatex(this.originalMatrixDet, size)}$$</p>`;
        content += '</div>';
        
        content += '<h5>Matriz Final:</h5>';
        content += '<div class="math-formula">';
        content += `<p>$$${this.matrixToLatex(this.interactiveMatrixDet, size)}$$</p>`;
        content += '</div>';
        
        content += '<h5>Cálculo Final:</h5>';
        content += `<p>Multiplicador acumulado: <strong>${utils.formatNumber(this.determinantMultiplier, 4)}</strong></p>`;
        content += `<p>Determinante de matriz final: <strong>${utils.formatNumber(currentDet.value, 4)}</strong></p>`;
        
        content += '<div class="alert alert-success">';
        content += '<h5><i class="fas fa-check-circle"></i> Determinante Original:</h5>';
        content += '<div class="math-formula">';
        content += `<p>$$\\det(A) = ${utils.formatNumber(this.determinantMultiplier, 4)} \\times ${utils.formatNumber(currentDet.value, 4)} = ${utils.formatNumber(finalDet, 4)}$$</p>`;
        content += '</div>';
        content += '</div>';
        
        content += '</div>';
        
        resultContent.innerHTML = content;
        document.getElementById('results').style.display = 'block';
        app.reprocessMathJax();
    },
    
    resetInteractiveDet: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        // Restaurar matriz original
        this.interactiveMatrixDet = this.copyMatrix(this.originalMatrixDet, size);
        this.operationHistoryDet = [];
        this.determinantMultiplier = 1;
        
        this.displayCurrentMatrixDet(size);
        this.updateOperationHistoryDet();
        this.updateDeterminantDisplay();
    },
    
    clear: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`a_${i}_${j}`).value = '';
            }
        }
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('interactive-controls-det').style.display = 'none';
        document.getElementById('interactive-history-det').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
        
        this.isInteractiveModeDet = false;
        this.interactiveMatrixDet = null;
        this.originalMatrixDet = null;
        this.operationHistoryDet = [];
        this.determinantMultiplier = 1;
    }
};