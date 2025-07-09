// Herramienta: Suma de Matrices
app.tools.determinantes3 = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-plus"></i> Suma de Matrices</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Suma de Matrices</h3>
                            </div>
                            <div class="card-body">
                                <div id="math-controls"></div>
                                <div class="form-group">
                                    <label>Dimensión de las matrices:</label>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <select id="matrix-rows" class="form-control" onchange="app.tools.determinantes3.generateMatrices()">
                                                <option value="2">2 filas</option>
                                                <option value="3">3 filas</option>
                                                <option value="4">4 filas</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <select id="matrix-cols" class="form-control" onchange="app.tools.determinantes3.generateMatrices()">
                                                <option value="2">2 columnas</option>
                                                <option value="3">3 columnas</option>
                                                <option value="4">4 columnas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-5">
                                        <h4>Matriz A</h4>
                                        <div id="matrix-a"></div>
                                    </div>
                                    <div class="col-md-2 text-center">
                                        <h4>+</h4>
                                    </div>
                                    <div class="col-md-5">
                                        <h4>Matriz B</h4>
                                        <div id="matrix-b"></div>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.determinantes3.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular Suma
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.determinantes3.clear()">
                                        <i class="fas fa-eraser"></i> Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h3>Teoría</h3>
                            </div>
                            <div class="card-body">
                                <h4>Suma de Matrices</h4>
                                <p>La suma de matrices se define solo para matrices del mismo tamaño. El resultado es una matriz donde cada elemento es la suma de los elementos correspondientes:</p>
                                
                                <div class="math-formula">
                                    <p>$$(A + B)_{ij} = A_{ij} + B_{ij}$$</p>
                                </div>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li><strong>Conmutativa:</strong> $A + B = B + A$</li>
                                    <li><strong>Asociativa:</strong> $(A + B) + C = A + (B + C)$</li>
                                    <li><strong>Elemento neutro:</strong> $A + 0 = A$</li>
                                    <li><strong>Elemento opuesto:</strong> $A + (-A) = 0$</li>
                                </ul>
                                
                                <h4>Ejemplo</h4>
                                <p>$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix} = \\begin{pmatrix} 6 & 8 \\\\ 10 & 12 \\end{pmatrix}$$</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
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
        
        this.generateMatrices();
    },
    
    generateMatrices: function() {
        const rows = parseInt(document.getElementById('matrix-rows').value);
        const cols = parseInt(document.getElementById('matrix-cols').value);
        
        const matrixA = document.getElementById('matrix-a');
        const matrixB = document.getElementById('matrix-b');
        
        matrixA.innerHTML = this.createMatrixHTML('a', rows, cols);
        matrixB.innerHTML = this.createMatrixHTML('b', rows, cols);
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
    
    calculate: function() {
        MathUtils.updateSettings();
        const rows = parseInt(document.getElementById('matrix-rows').value);
        const cols = parseInt(document.getElementById('matrix-cols').value);
        
        const matrixA = [];
        const matrixB = [];
        const result = [];
        
        // Leer matrices
        for (let i = 0; i < rows; i++) {
            matrixA[i] = [];
            matrixB[i] = [];
            result[i] = [];
            for (let j = 0; j < cols; j++) {
                const aInput = document.getElementById(`a_${i}_${j}`).value || '0';
                const bInput = document.getElementById(`b_${i}_${j}`).value || '0';
                
                if (!utils.isValidNumber(aInput) || !utils.isValidNumber(bInput)) {
                    utils.showError(document.getElementById('result-content'), 'Por favor, ingresa valores numéricos válidos.');
                    return;
                }
                
                const aValue = utils.parseInput(aInput);
                const bValue = utils.parseInput(bInput);
                
                matrixA[i][j] = aValue;
                matrixB[i][j] = bValue;
                result[i][j] = aValue + bValue;
            }
        }
        
        // Mostrar resultado
        this.displayResult(matrixA, matrixB, result, rows, cols);
    },
    
    displayResult: function(matrixA, matrixB, result, rows, cols) {
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let matrixAStr = this.matrixToLatex(matrixA, rows, cols);
        let matrixBStr = this.matrixToLatex(matrixB, rows, cols);
        let resultStr = this.matrixToLatex(result, rows, cols);
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Cálculo de la Suma</h4>
                
                <div class="math-formula">
                    <p>$$A + B = ${matrixAStr} + ${matrixBStr}$$</p>
                </div>
                
                <div class="alert alert-success">
                    <h5><i class="fas fa-check-circle"></i> Resultado:</h5>
                    <div class="math-formula">
                        <p>$$A + B = ${resultStr}$$</p>
                    </div>
                </div>
                
                <h4>Proceso paso a paso:</h4>
                <p>Cada elemento de la matriz resultado se calcula como:</p>
                ${this.generateStepByStep(matrixA, matrixB, result, rows, cols)}
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        app.reprocessMathJax();
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
    
    generateStepByStep: function(matrixA, matrixB, result, rows, cols) {
        let steps = '<ul>';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                steps += `<li>Elemento (${i+1},${j+1}): $${utils.formatLatex(matrixA[i][j])} + ${utils.formatLatex(matrixB[i][j])} = ${utils.formatLatex(result[i][j])}$</li>`;
            }
        }
        steps += '</ul>';
        return steps;
    },
    
    clear: function() {
        const rows = parseInt(document.getElementById('matrix-rows').value);
        const cols = parseInt(document.getElementById('matrix-cols').value);
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                document.getElementById(`a_${i}_${j}`).value = '';
                document.getElementById(`b_${i}_${j}`).value = '';
            }
        }
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};