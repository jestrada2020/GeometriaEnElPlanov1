// Herramienta: Sistemas de Ecuaciones (Gauss-Jordan)
app.tools.algebraLineal = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-equals"></i> Sistemas de Ecuaciones (Gauss-Jordan)</h2>
                
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h3>Método de Gauss-Jordan</h3>
                            </div>
                            <div class="card-body">
                                <div class="alert alert-info">
                                    <h5><i class="fas fa-info-circle"></i> Método de Gauss-Jordan</h5>
                                    <p>Este método transforma la matriz aumentada del sistema a su forma escalonada reducida para encontrar la solución.</p>
                                </div>
                                
                                <div class="form-group">
                                    <label>Tamaño del sistema:</label>
                                    <select id="system-size" class="form-control" onchange="app.tools.algebraLineal.generateSystem()">
                                        <option value="2">2×2</option>
                                        <option value="3">3×3</option>
                                        <option value="4">4×4</option>
                                    </select>
                                </div>
                                
                                <h4>Matriz Aumentada [A|b]</h4>
                                <div id="augmented-matrix"></div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.algebraLineal.solve()">
                                        <i class="fas fa-calculator"></i> Resolver Automático
                                    </button>
                                    <button class="btn btn-success" onclick="app.tools.algebraLineal.startInteractive()">
                                        <i class="fas fa-play"></i> Modo Interactivo
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.algebraLineal.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.algebraLineal.generateExample()">
                                        <i class="fas fa-lightbulb"></i> Ejemplo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h3>Método Gauss-Jordan</h3>
                            </div>
                            <div class="card-body">
                                <h4>Pasos del Método</h4>
                                <ol>
                                    <li><strong>Pivoteo:</strong> Seleccionar pivote no nulo</li>
                                    <li><strong>Normalización:</strong> Hacer el pivote igual a 1</li>
                                    <li><strong>Eliminación:</strong> Hacer ceros arriba y abajo del pivote</li>
                                    <li><strong>Repetir:</strong> Para cada columna</li>
                                </ol>
                                
                                <h4>Operaciones Elementales</h4>
                                <ul>
                                    <li>Intercambiar filas</li>
                                    <li>Multiplicar fila por constante</li>
                                    <li>Sumar múltiplo de una fila a otra</li>
                                </ul>
                                
                                <h4>Tipos de Solución</h4>
                                <ul>
                                    <li><strong>Única:</strong> Matriz de coeficientes tiene rango completo</li>
                                    <li><strong>Infinitas:</strong> Sistema compatible indeterminado</li>
                                    <li><strong>No existe:</strong> Sistema incompatible</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div id="interactive-controls" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Operaciones Elementales</h3>
                            </div>
                            <div class="card-body">
                                <div id="current-matrix"></div>
                                
                                <h5 class="mt-3">Operaciones Disponibles:</h5>
                                
                                <div class="operation-group mb-3">
                                    <h6>1. Intercambiar Filas</h6>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <select id="swap-row1" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <select id="swap-row2" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-sm btn-warning" onclick="app.tools.algebraLineal.swapRows()">
                                                <i class="fas fa-exchange-alt"></i> Intercambiar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="operation-group mb-3">
                                    <h6>2. Multiplicar Fila por Constante</h6>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <select id="mult-row" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="number" id="mult-factor" class="form-control" placeholder="Factor" step="any">
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-sm btn-info" onclick="app.tools.algebraLineal.multiplyRow()">
                                                <i class="fas fa-times"></i> Multiplicar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="operation-group mb-3">
                                    <h6>3. Suma/Resta de Filas</h6>
                                    <div class="row mb-2">
                                        <div class="col-md-3">
                                            <input type="number" id="add-factor" class="form-control" placeholder="Factor" step="any">
                                        </div>
                                        <div class="col-md-3">
                                            <select id="add-source" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <select id="add-target" class="form-control">
                                                <option value="0">Fila 1</option>
                                                <option value="1">Fila 2</option>
                                                <option value="2">Fila 3</option>
                                                <option value="3">Fila 4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <button class="btn btn-sm btn-success" onclick="app.tools.algebraLineal.addRows()">
                                                <i class="fas fa-plus"></i> Sumar
                                            </button>
                                        </div>
                                    </div>
                                    <small class="text-muted">Factor × Fila Origen → Fila Destino</small>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.algebraLineal.finishInteractive()">
                                        <i class="fas fa-check"></i> Finalizar
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.algebraLineal.resetInteractive()">
                                        <i class="fas fa-undo"></i> Reiniciar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div id="results" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Proceso de Solución</h3>
                            </div>
                            <div class="card-body">
                                <div id="result-content"></div>
                            </div>
                        </div>
                        
                        <div id="interactive-history" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Historial de Operaciones</h3>
                            </div>
                            <div class="card-body">
                                <div id="operation-history"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="math-controls-container-algebra"></div>
            </div>
        `;
        
        this.generateSystem();
        // Agregar controles de configuración matemática
        MathUtils.createControls('math-controls-container-algebra');
    },
    
    generateSystem: function() {
        const size = parseInt(document.getElementById('system-size').value);
        const container = document.getElementById('augmented-matrix');
        
        let html = '<div class="matrix-container">';
        html += '<table class="table table-bordered" style="width: auto; margin: 0 auto;">';
        
        for (let i = 0; i < size; i++) {
            html += '<tr>';
            // Coeficientes
            for (let j = 0; j < size; j++) {
                html += `<td><input type="number" id="a_${i}_${j}" class="form-control" placeholder="a${i+1}${j+1}" step="any" style="width: 80px; text-align: center;"></td>`;
            }
            // Separador
            html += '<td style="border: none; padding: 0 10px; text-align: center; font-weight: bold; font-size: 18px;">|</td>';
            // Términos independientes
            html += `<td><input type="number" id="b_${i}" class="form-control" placeholder="b${i+1}" step="any" style="width: 80px; text-align: center;"></td>`;
            html += '</tr>';
        }
        
        html += '</table>';
        html += '</div>';
        
        container.innerHTML = html;
    },
    
    generateExample: function() {
        const size = parseInt(document.getElementById('system-size').value);
        
        // Ejemplos predefinidos
        const examples = {
            2: {
                matrix: [[2, 1], [1, 3]],
                constants: [8, 7]
            },
            3: {
                matrix: [[2, 1, -1], [1, 0, 2], [3, 2, 1]],
                constants: [8, 4, 14]
            },
            4: {
                matrix: [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]],
                constants: [10, 10, 10, 10]
            }
        };
        
        const example = examples[size];
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`a_${i}_${j}`).value = example.matrix[i][j];
            }
            document.getElementById(`b_${i}`).value = example.constants[i];
        }
    },
    
    solve: function() {
        const size = parseInt(document.getElementById('system-size').value);
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Leer matriz aumentada
        const augmentedMatrix = this.readAugmentedMatrix(size);
        
        // Resolver usando Gauss-Jordan
        const solution = this.gaussJordan(augmentedMatrix, size);
        
        // Mostrar proceso y resultado
        this.displaySolution(solution, size);
    },
    
    readAugmentedMatrix: function(size) {
        // Actualizar configuración antes de leer
        MathUtils.updateSettings();
        
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            // Leer coeficientes (ahora soporta fracciones)
            for (let j = 0; j < size; j++) {
                const value = utils.parseInput(document.getElementById(`a_${i}_${j}`).value) || 0;
                matrix[i][j] = value;
            }
            // Leer término independiente
            const b = utils.parseInput(document.getElementById(`b_${i}`).value) || 0;
            matrix[i][size] = b;
        }
        return matrix;
    },
    
    gaussJordan: function(matrix, size) {
        const steps = [];
        const augMatrix = this.copyMatrix(matrix, size, size + 1);
        
        steps.push({
            description: 'Matriz aumentada inicial',
            matrix: this.copyMatrix(augMatrix, size, size + 1)
        });
        
        // Proceso de Gauss-Jordan
        for (let pivot = 0; pivot < size; pivot++) {
            // Encontrar pivote
            let pivotRow = pivot;
            for (let i = pivot + 1; i < size; i++) {
                if (Math.abs(augMatrix[i][pivot]) > Math.abs(augMatrix[pivotRow][pivot])) {
                    pivotRow = i;
                }
            }
            
            // Intercambiar filas si es necesario
            if (pivotRow !== pivot) {
                [augMatrix[pivot], augMatrix[pivotRow]] = [augMatrix[pivotRow], augMatrix[pivot]];
                steps.push({
                    description: `Intercambiar filas ${pivot + 1} y ${pivotRow + 1}`,
                    matrix: this.copyMatrix(augMatrix, size, size + 1)
                });
            }
            
            // Verificar si el pivote es cero
            if (Math.abs(augMatrix[pivot][pivot]) < 1e-10) {
                return {
                    type: 'no-solution',
                    message: 'El sistema no tiene solución única',
                    steps: steps
                };
            }
            
            // Normalizar fila del pivote
            const pivotValue = augMatrix[pivot][pivot];
            for (let j = 0; j <= size; j++) {
                augMatrix[pivot][j] /= pivotValue;
            }
            
            steps.push({
                description: `Normalizar fila ${pivot + 1} (dividir por ${utils.formatNumber(pivotValue)})`,
                matrix: this.copyMatrix(augMatrix, size, size + 1)
            });
            
            // Eliminar columna del pivote
            for (let i = 0; i < size; i++) {
                if (i !== pivot && Math.abs(augMatrix[i][pivot]) > 1e-10) {
                    const factor = augMatrix[i][pivot];
                    for (let j = 0; j <= size; j++) {
                        augMatrix[i][j] -= factor * augMatrix[pivot][j];
                    }
                    
                    steps.push({
                        description: `Eliminar en fila ${i + 1} (restar ${utils.formatNumber(factor)} × fila ${pivot + 1})`,
                        matrix: this.copyMatrix(augMatrix, size, size + 1)
                    });
                }
            }
        }
        
        // Extraer solución
        const solution = [];
        for (let i = 0; i < size; i++) {
            solution[i] = augMatrix[i][size];
        }
        
        return {
            type: 'unique',
            solution: solution,
            steps: steps,
            finalMatrix: augMatrix
        };
    },
    
    copyMatrix: function(matrix, rows, cols) {
        const copy = [];
        for (let i = 0; i < rows; i++) {
            copy[i] = [];
            for (let j = 0; j < cols; j++) {
                copy[i][j] = matrix[i][j];
            }
        }
        return copy;
    },
    
    displaySolution: function(solution, size) {
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let content = '<div class="result-section">';
        
        if (solution.type === 'unique') {
            content += '<h4>Proceso de Gauss-Jordan</h4>';
            
            // Mostrar pasos
            solution.steps.forEach((step, index) => {
                content += `<div class="step-container mb-3">`;
                content += `<h5>Paso ${index + 1}: ${step.description}</h5>`;
                content += `<div class="math-formula">`;
                content += `<p>$$${this.matrixToLatex(step.matrix, size, size + 1, true)}$$</p>`;
                content += `</div>`;
                content += `</div>`;
            });
            
            content += '<div class="alert alert-success">';
            content += '<h5><i class="fas fa-check-circle"></i> Solución del Sistema:</h5>';
            content += '<ul>';
            for (let i = 0; i < size; i++) {
                content += `<li>$x_{${i+1}} = ${utils.formatNumber(solution.solution[i], 4)}$</li>`;
            }
            content += '</ul>';
            content += '</div>';
            
            // Verificación
            content += '<h4>Verificación:</h4>';
            content += '<p>Sustituyendo los valores en las ecuaciones originales:</p>';
            content += this.generateVerification(solution.solution, size);
            
        } else {
            content += '<div class="alert alert-warning">';
            content += `<h5><i class="fas fa-exclamation-triangle"></i> ${solution.message}</h5>`;
            content += '</div>';
        }
        
        content += '</div>';
        
        resultContent.innerHTML = content;
        resultsDiv.style.display = 'block';
        app.reprocessMathJax();
    },
    
    generateVerification: function(solution, size) {
        const originalMatrix = this.readAugmentedMatrix(size);
        let verification = '';
        
        for (let i = 0; i < size; i++) {
            let equation = '';
            let result = 0;
            
            for (let j = 0; j < size; j++) {
                const coeff = originalMatrix[i][j];
                const value = solution[j];
                result += coeff * value;
                
                if (j > 0) equation += ' + ';
                equation += `${utils.formatNumber(coeff)}(${utils.formatNumber(value, 4)})`;
            }
            
            verification += `<p>Ecuación ${i + 1}: $${equation} = ${utils.formatNumber(result, 4)} ≈ ${utils.formatNumber(originalMatrix[i][size])}$</p>`;
        }
        
        return verification;
    },
    
    matrixToLatex: function(matrix, rows, cols, isAugmented = false) {
        let latex = '\\left[\\begin{array}{';
        
        if (isAugmented) {
            // Formato para matriz aumentada
            for (let i = 0; i < cols - 1; i++) {
                latex += 'c';
            }
            latex += '|c';
        } else {
            for (let i = 0; i < cols; i++) {
                latex += 'c';
            }
        }
        
        latex += '}';
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                latex += utils.formatNumber(matrix[i][j], 3);
                if (j < cols - 1) latex += ' & ';
            }
            if (i < rows - 1) latex += ' \\\\ ';
        }
        
        latex += '\\end{array}\\right]';
        return latex;
    },
    
    // Variables para modo interactivo
    interactiveMatrix: null,
    originalMatrix: null,
    operationHistory: [],
    isInteractiveMode: false,
    
    startInteractive: function() {
        const size = parseInt(document.getElementById('system-size').value);
        
        // Leer matriz original
        this.originalMatrix = this.readAugmentedMatrix(size);
        this.interactiveMatrix = this.copyMatrix(this.originalMatrix, size, size + 1);
        this.operationHistory = [];
        this.isInteractiveMode = true;
        
        // Mostrar controles interactivos
        document.getElementById('interactive-controls').style.display = 'block';
        document.getElementById('interactive-history').style.display = 'block';
        document.getElementById('results').style.display = 'none';
        
        // Actualizar opciones de filas
        this.updateRowSelectors(size);
        
        // Mostrar matriz actual
        this.displayCurrentMatrix(size);
        this.updateOperationHistory();
    },
    
    updateRowSelectors: function(size) {
        const selectors = ['swap-row1', 'swap-row2', 'mult-row', 'add-source', 'add-target'];
        
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
    
    displayCurrentMatrix: function(size) {
        const container = document.getElementById('current-matrix');
        
        let html = '<h5>Matriz Actual:</h5>';
        html += '<div class="math-formula">';
        html += `<p>$$${this.matrixToLatex(this.interactiveMatrix, size, size + 1, true)}$$</p>`;
        html += '</div>';
        
        container.innerHTML = html;
        app.reprocessMathJax();
    },
    
    swapRows: function() {
        const size = parseInt(document.getElementById('system-size').value);
        const row1 = parseInt(document.getElementById('swap-row1').value);
        const row2 = parseInt(document.getElementById('swap-row2').value);
        
        if (row1 === row2) {
            utils.showError(document.getElementById('current-matrix'), 'Selecciona filas diferentes para intercambiar.');
            return;
        }
        
        // Intercambiar filas
        [this.interactiveMatrix[row1], this.interactiveMatrix[row2]] = [this.interactiveMatrix[row2], this.interactiveMatrix[row1]];
        
        // Registrar operación
        this.operationHistory.push({
            type: 'swap',
            description: `Intercambiar F${row1 + 1} ↔ F${row2 + 1}`,
            notation: `F${row1 + 1} ↔ F${row2 + 1}`
        });
        
        this.displayCurrentMatrix(size);
        this.updateOperationHistory();
    },
    
    multiplyRow: function() {
        const size = parseInt(document.getElementById('system-size').value);
        const row = parseInt(document.getElementById('mult-row').value);
        const factor = parseFloat(document.getElementById('mult-factor').value);
        
        if (!utils.isValidNumber(factor) || factor === 0) {
            utils.showError(document.getElementById('current-matrix'), 'Ingresa un factor válido diferente de cero.');
            return;
        }
        
        // Multiplicar fila
        for (let j = 0; j <= size; j++) {
            this.interactiveMatrix[row][j] *= factor;
        }
        
        // Registrar operación
        this.operationHistory.push({
            type: 'multiply',
            description: `Multiplicar F${row + 1} por ${utils.formatNumber(factor)}`,
            notation: `F${row + 1} → ${utils.formatNumber(factor)}F${row + 1}`
        });
        
        document.getElementById('mult-factor').value = '';
        this.displayCurrentMatrix(size);
        this.updateOperationHistory();
    },
    
    addRows: function() {
        const size = parseInt(document.getElementById('system-size').value);
        const factor = parseFloat(document.getElementById('add-factor').value);
        const sourceRow = parseInt(document.getElementById('add-source').value);
        const targetRow = parseInt(document.getElementById('add-target').value);
        
        if (!utils.isValidNumber(factor)) {
            utils.showError(document.getElementById('current-matrix'), 'Ingresa un factor válido.');
            return;
        }
        
        if (sourceRow === targetRow) {
            utils.showError(document.getElementById('current-matrix'), 'Selecciona filas diferentes.');
            return;
        }
        
        // Sumar filas: targetRow = targetRow + factor * sourceRow
        for (let j = 0; j <= size; j++) {
            this.interactiveMatrix[targetRow][j] += factor * this.interactiveMatrix[sourceRow][j];
        }
        
        // Registrar operación
        const sign = factor >= 0 ? '+' : '';
        this.operationHistory.push({
            type: 'add',
            description: `F${targetRow + 1} = F${targetRow + 1} ${sign}${utils.formatNumber(factor)}F${sourceRow + 1}`,
            notation: `F${targetRow + 1} → F${targetRow + 1} ${sign}${utils.formatNumber(factor)}F${sourceRow + 1}`
        });
        
        document.getElementById('add-factor').value = '';
        this.displayCurrentMatrix(size);
        this.updateOperationHistory();
    },
    
    updateOperationHistory: function() {
        const container = document.getElementById('operation-history');
        
        if (this.operationHistory.length === 0) {
            container.innerHTML = '<p class="text-muted">No se han realizado operaciones aún.</p>';
            return;
        }
        
        let html = '<ol>';
        this.operationHistory.forEach((op, index) => {
            html += `<li><strong>${op.notation}</strong> - ${op.description}</li>`;
        });
        html += '</ol>';
        
        container.innerHTML = html;
    },
    
    finishInteractive: function() {
        const size = parseInt(document.getElementById('system-size').value);
        
        // Mostrar resultado final
        const resultContent = document.getElementById('result-content');
        
        let content = '<div class="result-section">';
        content += '<h4>Proceso Interactivo Completado</h4>';
        
        content += '<h5>Matriz Original:</h5>';
        content += '<div class="math-formula">';
        content += `<p>$$${this.matrixToLatex(this.originalMatrix, size, size + 1, true)}$$</p>`;
        content += '</div>';
        
        content += '<h5>Matriz Final:</h5>';
        content += '<div class="math-formula">';
        content += `<p>$$${this.matrixToLatex(this.interactiveMatrix, size, size + 1, true)}$$</p>`;
        content += '</div>';
        
        // Intentar extraer solución si la matriz está en forma escalonada
        const solution = this.extractSolution(this.interactiveMatrix, size);
        if (solution) {
            content += '<div class="alert alert-success">';
            content += '<h5><i class="fas fa-check-circle"></i> Solución Encontrada:</h5>';
            content += '<ul>';
            for (let i = 0; i < size; i++) {
                content += `<li>$x_{${i+1}} = ${utils.formatNumber(solution[i], 4)}$</li>`;
            }
            content += '</ul>';
            content += '</div>';
        }
        
        content += '</div>';
        
        resultContent.innerHTML = content;
        document.getElementById('results').style.display = 'block';
        app.reprocessMathJax();
    },
    
    extractSolution: function(matrix, size) {
        // Verificar si la matriz está en forma escalonada reducida
        const solution = [];
        
        for (let i = 0; i < size; i++) {
            // Verificar si hay un pivote en la posición (i,i)
            if (Math.abs(matrix[i][i] - 1) < 1e-10) {
                // Verificar que el resto de la fila sea cero (excepto el término independiente)
                let isValid = true;
                for (let j = 0; j < size; j++) {
                    if (j !== i && Math.abs(matrix[i][j]) > 1e-10) {
                        isValid = false;
                        break;
                    }
                }
                
                if (isValid) {
                    solution[i] = matrix[i][size];
                } else {
                    return null; // No está en forma escalonada reducida
                }
            } else {
                return null; // No está en forma escalonada reducida
            }
        }
        
        return solution;
    },
    
    resetInteractive: function() {
        const size = parseInt(document.getElementById('system-size').value);
        
        // Restaurar matriz original
        this.interactiveMatrix = this.copyMatrix(this.originalMatrix, size, size + 1);
        this.operationHistory = [];
        
        this.displayCurrentMatrix(size);
        this.updateOperationHistory();
    },
    
    clear: function() {
        const size = parseInt(document.getElementById('system-size').value);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`a_${i}_${j}`).value = '';
            }
            document.getElementById(`b_${i}`).value = '';
        }
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('interactive-controls').style.display = 'none';
        document.getElementById('interactive-history').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
        
        this.isInteractiveMode = false;
        this.interactiveMatrix = null;
        this.originalMatrix = null;
        this.operationHistory = [];
    }
};