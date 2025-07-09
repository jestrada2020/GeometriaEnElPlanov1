// Herramienta: Potencia de una Matriz
app.tools.determinantes5 = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-superscript"></i> Potencia de una Matriz</h2>
                
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Potencia de Matriz</h3>
                            </div>
                            <div class="card-body">
                                <div id="math-controls"></div>
                                <div class="alert alert-info">
                                    <h5><i class="fas fa-info-circle"></i> Importante</h5>
                                    <p>Solo se pueden calcular potencias de matrices cuadradas. A^n = A × A × ... × A (n veces)</p>
                                </div>
                                
                                <div class="form-group">
                                    <label>Dimensión de la matriz:</label>
                                    <select id="matrix-size" class="form-control" onchange="app.tools.determinantes5.generateMatrix()">
                                        <option value="2">2×2</option>
                                        <option value="3">3×3</option>
                                        <option value="4">4×4</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="power">Potencia (n):</label>
                                    <input type="number" id="power" class="form-control" placeholder="Introduce la potencia" min="0" max="10" step="1" value="2">
                                </div>
                                
                                <h4>Matriz A</h4>
                                <div id="matrix-a"></div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.determinantes5.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular A^n
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.determinantes5.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                    <button class="btn btn-info" onclick="app.tools.determinantes5.generateIdentity()">
                                        <i class="fas fa-eye"></i> Matriz Identidad
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría de Potencias</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>La potencia n-ésima de una matriz cuadrada A es:</p>
                                <div class="math-formula">
                                    <p>$$A^n = \\underbrace{A \\times A \\times ... \\times A}_{n \\text{ veces}}$$</p>
                                </div>
                                
                                <h4>Casos Especiales</h4>
                                <ul>
                                    <li><strong>A^0 = I</strong> (matriz identidad)</li>
                                    <li><strong>A^1 = A</strong></li>
                                    <li><strong>A^2 = A × A</strong></li>
                                </ul>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li>$A^m \\times A^n = A^{m+n}$</li>
                                    <li>$(A^m)^n = A^{mn}$</li>
                                    <li>Si A es diagonal, $A^n$ es fácil de calcular</li>
                                </ul>
                                
                                <h4>Aplicaciones</h4>
                                <ul>
                                    <li>Sistemas dinámicos</li>
                                    <li>Cadenas de Markov</li>
                                    <li>Análisis de redes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-12">
                        <div id="results" class="card" style="display: none;">
                            <div class="card-header">
                                <h3>Resultado</h3>
                            </div>
                            <div class="card-body">
                                <div id="result-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add math controls
        MathUtils.createControls(container);
        
        this.generateMatrix();
    },
    
    generateMatrix: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        const matrixA = document.getElementById('matrix-a');
        
        matrixA.innerHTML = this.createMatrixHTML('a', size, size);
    },
    
    createMatrixHTML: function(prefix, rows, cols) {
        let html = '<div class="matrix-container">';
        for (let i = 0; i < rows; i++) {
            html += '<div class="matrix-row">';
            for (let j = 0; j < cols; j++) {
                html += `<input type="number" id="${prefix}_${i}_${j}" class="matrix-input" placeholder="0" step="any">`;
            }
            html += '</div>';
        }
        html += '</div>';
        return html;
    },
    
    generateIdentity: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const element = document.getElementById(`a_${i}_${j}`);
                element.value = (i === j) ? 1 : 0;
            }
        }
    },
    
    calculate: function() {
        MathUtils.updateSettings();
        const size = parseInt(document.getElementById('matrix-size').value);
        const power = parseInt(document.getElementById('power').value);
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Validaciones
        const powerInput = document.getElementById('power').value;
        if (!utils.isValidNumber(powerInput) || power < 0 || power > 10) {
            utils.showError(resultContent, 'Por favor, ingresa una potencia válida entre 0 y 10.');
            return;
        }
        
        // Leer matriz
        const matrixA = this.readMatrix('a', size, size);
        
        if (!matrixA) {
            return;
        }
        
        // Calcular potencia
        const result = this.matrixPower(matrixA, power, size);
        
        // Mostrar resultado
        this.displayResult(matrixA, result, power, size);
    },
    
    readMatrix: function(prefix, rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                const input = document.getElementById(`${prefix}_${i}_${j}`).value || '0';
                
                if (!utils.isValidNumber(input)) {
                    utils.showError(document.getElementById('result-content'), 'Por favor, ingresa valores numéricos válidos.');
                    return null;
                }
                
                const value = utils.parseInput(input);
                matrix[i][j] = value;
            }
        }
        return matrix;
    },
    
    matrixPower: function(matrix, power, size) {
        if (power === 0) {
            // Matriz identidad
            const identity = [];
            for (let i = 0; i < size; i++) {
                identity[i] = [];
                for (let j = 0; j < size; j++) {
                    identity[i][j] = (i === j) ? 1 : 0;
                }
            }
            return identity;
        }
        
        if (power === 1) {
            return matrix;
        }
        
        // Calcular potencia iterativamente
        let result = this.copyMatrix(matrix, size);
        
        for (let p = 2; p <= power; p++) {
            result = this.multiplyMatrices(result, matrix, size);
        }
        
        return result;
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
    
    multiplyMatrices: function(matrixA, matrixB, size) {
        const result = [];
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                result[i][j] = 0;
                for (let k = 0; k < size; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
        return result;
    },
    
    displayResult: function(matrixA, result, power, size) {
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let matrixAStr = this.matrixToLatex(matrixA, size, size);
        let resultStr = this.matrixToLatex(result, size, size);
        
        // Generar pasos intermedios para potencias pequeñas
        let intermediateSteps = '';
        if (power <= 4 && power > 1) {
            intermediateSteps = this.generateIntermediateSteps(matrixA, power, size);
        }
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Cálculo de la Potencia</h4>
                
                <div class="math-formula">
                    <p>$$A^{${power}} = ${matrixAStr}^{${power}}$$</p>
                </div>
                
                ${intermediateSteps}
                
                <div class="alert alert-success">
                    <h5><i class="fas fa-check-circle"></i> Resultado Final:</h5>
                    <div class="math-formula">
                        <p>$$A^{${power}} = ${resultStr}$$</p>
                    </div>
                </div>
                
                <h4>Información:</h4>
                <ul>
                    <li><strong>Matriz original:</strong> ${size}×${size}</li>
                    <li><strong>Potencia:</strong> ${power}</li>
                    <li><strong>Operaciones realizadas:</strong> ${power === 0 ? 'Ninguna (A^0 = I)' : power === 1 ? 'Ninguna (A^1 = A)' : (power - 1) + ' multiplicaciones'}</li>
                </ul>
                
                ${power === 0 ? '<div class="alert alert-info">Nota: A^0 = I (matriz identidad) para cualquier matriz cuadrada no singular.</div>' : ''}
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        app.reprocessMathJax();
    },
    
    generateIntermediateSteps: function(matrix, power, size) {
        let steps = '<h4>Pasos intermedios:</h4>';
        
        let currentResult = this.copyMatrix(matrix, size);
        
        for (let p = 2; p <= power; p++) {
            currentResult = this.multiplyMatrices(currentResult, matrix, size);
            steps += `<p><strong>A^${p}:</strong></p>`;
            steps += `<div class="math-formula"><p>$$A^{${p}} = ${this.matrixToLatex(currentResult, size, size)}$$</p></div>`;
        }
        
        return steps;
    },
    
    matrixToLatex: function(matrix, rows, cols) {
        let latex = '\\begin{pmatrix}';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                latex += utils.formatLatex(matrix[i][j]);
                if (j < cols - 1) latex += ' & ';
            }
            if (i < rows - 1) latex += ' \\\\ ';
        }
        latex += '\\end{pmatrix}';
        return latex;
    },
    
    clear: function() {
        const size = parseInt(document.getElementById('matrix-size').value);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`a_${i}_${j}`).value = '';
            }
        }
        
        document.getElementById('power').value = '2';
        document.getElementById('results').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};