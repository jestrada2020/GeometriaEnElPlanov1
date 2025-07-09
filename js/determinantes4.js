// Herramienta: Producto de Matrices
app.tools.determinantes4 = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-times"></i> Producto de Matrices</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3>Calculadora de Producto de Matrices</h3>
                            </div>
                            <div class="card-body">
                                <div id="math-controls"></div>
                                <div class="alert alert-info">
                                    <h5><i class="fas fa-info-circle"></i> Importante</h5>
                                    <p>El producto A × B solo está definido si el número de columnas de A es igual al número de filas de B.</p>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4>Matriz A</h4>
                                        <div class="form-group">
                                            <label>Dimensiones de A:</label>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <select id="matrix-a-rows" class="form-control" onchange="app.tools.determinantes4.generateMatrices()">
                                                        <option value="2">2 filas</option>
                                                        <option value="3">3 filas</option>
                                                        <option value="4">4 filas</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <select id="matrix-a-cols" class="form-control" onchange="app.tools.determinantes4.generateMatrices()">
                                                        <option value="2">2 columnas</option>
                                                        <option value="3">3 columnas</option>
                                                        <option value="4">4 columnas</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="matrix-a"></div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <h4>Matriz B</h4>
                                        <div class="form-group">
                                            <label>Dimensiones de B:</label>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <select id="matrix-b-rows" class="form-control" onchange="app.tools.determinantes4.generateMatrices()">
                                                        <option value="2">2 filas</option>
                                                        <option value="3">3 filas</option>
                                                        <option value="4">4 filas</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <select id="matrix-b-cols" class="form-control" onchange="app.tools.determinantes4.generateMatrices()">
                                                        <option value="2">2 columnas</option>
                                                        <option value="3">3 columnas</option>
                                                        <option value="4">4 columnas</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="matrix-b"></div>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <button class="btn btn-primary" onclick="app.tools.determinantes4.calculate()">
                                        <i class="fas fa-calculator"></i> Calcular Producto
                                    </button>
                                    <button class="btn btn-secondary" onclick="app.tools.determinantes4.clear()">
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
                                <h3>Teoría del Producto</h3>
                            </div>
                            <div class="card-body">
                                <h4>Definición</h4>
                                <p>El producto de matrices A×B se define como:</p>
                                <div class="math-formula">
                                    <p>$$(AB)_{ij} = \\sum_{k=1}^{n} A_{ik} \\cdot B_{kj}$$</p>
                                </div>
                                
                                <h4>Condiciones</h4>
                                <ul>
                                    <li>A debe ser de dimensión m×n</li>
                                    <li>B debe ser de dimensión n×p</li>
                                    <li>El resultado será de dimensión m×p</li>
                                </ul>
                                
                                <h4>Propiedades</h4>
                                <ul>
                                    <li><strong>Asociativa:</strong> (AB)C = A(BC)</li>
                                    <li><strong>Distributiva:</strong> A(B+C) = AB + AC</li>
                                    <li><strong>NO es conmutativa:</strong> AB ≠ BA</li>
                                    <li><strong>Elemento neutro:</strong> AI = IA = A</li>
                                </ul>
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
        const aRows = parseInt(document.getElementById('matrix-a-rows').value);
        const aCols = parseInt(document.getElementById('matrix-a-cols').value);
        const bRows = parseInt(document.getElementById('matrix-b-rows').value);
        const bCols = parseInt(document.getElementById('matrix-b-cols').value);
        
        // Verificar compatibilidad
        if (aCols !== bRows) {
            document.getElementById('matrix-b-rows').value = aCols;
        }
        
        const matrixA = document.getElementById('matrix-a');
        const matrixB = document.getElementById('matrix-b');
        
        matrixA.innerHTML = this.createMatrixHTML('a', aRows, aCols);
        matrixB.innerHTML = this.createMatrixHTML('b', parseInt(document.getElementById('matrix-b-rows').value), bCols);
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
        const aRows = parseInt(document.getElementById('matrix-a-rows').value);
        const aCols = parseInt(document.getElementById('matrix-a-cols').value);
        const bRows = parseInt(document.getElementById('matrix-b-rows').value);
        const bCols = parseInt(document.getElementById('matrix-b-cols').value);
        
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        // Verificar compatibilidad
        if (aCols !== bRows) {
            utils.showError(resultContent, `Las matrices no son compatibles para el producto. A tiene ${aCols} columnas y B tiene ${bRows} filas.`);
            return;
        }
        
        // Leer matrices
        const matrixA = this.readMatrix('a', aRows, aCols);
        const matrixB = this.readMatrix('b', bRows, bCols);
        
        if (!matrixA || !matrixB) {
            return;
        }
        
        // Calcular producto
        const result = this.multiplyMatrices(matrixA, matrixB, aRows, aCols, bCols);
        
        // Mostrar resultado
        this.displayResult(matrixA, matrixB, result, aRows, aCols, bRows, bCols);
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
    
    multiplyMatrices: function(matrixA, matrixB, aRows, aCols, bCols) {
        const result = [];
        for (let i = 0; i < aRows; i++) {
            result[i] = [];
            for (let j = 0; j < bCols; j++) {
                result[i][j] = 0;
                for (let k = 0; k < aCols; k++) {
                    result[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
        return result;
    },
    
    displayResult: function(matrixA, matrixB, result, aRows, aCols, bRows, bCols) {
        const resultsDiv = document.getElementById('results');
        const resultContent = document.getElementById('result-content');
        
        let matrixAStr = this.matrixToLatex(matrixA, aRows, aCols);
        let matrixBStr = this.matrixToLatex(matrixB, bRows, bCols);
        let resultStr = this.matrixToLatex(result, aRows, bCols);
        
        resultContent.innerHTML = `
            <div class="result-section">
                <h4>Cálculo del Producto</h4>
                
                <div class="math-formula">
                    <p>$$A \\times B = ${matrixAStr} \\times ${matrixBStr}$$</p>
                </div>
                
                <div class="alert alert-success">
                    <h5><i class="fas fa-check-circle"></i> Resultado:</h5>
                    <div class="math-formula">
                        <p>$$A \\times B = ${resultStr}$$</p>
                    </div>
                </div>
                
                <h4>Dimensiones:</h4>
                <ul>
                    <li>Matriz A: ${aRows}×${aCols}</li>
                    <li>Matriz B: ${bRows}×${bCols}</li>
                    <li>Resultado: ${aRows}×${bCols}</li>
                </ul>
                
                <h4>Ejemplo del cálculo:</h4>
                <p>Para el elemento (1,1) del resultado:</p>
                <div class="math-formula">
                    <p>$$c_{11} = ${this.generateCalculationExample(matrixA, matrixB, 0, 0, aCols)}$$</p>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        app.reprocessMathJax();
    },
    
    generateCalculationExample: function(matrixA, matrixB, row, col, aCols) {
        let calculation = '';
        for (let k = 0; k < aCols; k++) {
            if (k > 0) calculation += ' + ';
            calculation += `(${utils.formatLatex(matrixA[row][k])}) \\cdot (${utils.formatLatex(matrixB[k][col])})`;
        }
        
        let result = 0;
        for (let k = 0; k < aCols; k++) {
            result += matrixA[row][k] * matrixB[k][col];
        }
        
        return calculation + ' = ' + utils.formatLatex(result);
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
        const aRows = parseInt(document.getElementById('matrix-a-rows').value);
        const aCols = parseInt(document.getElementById('matrix-a-cols').value);
        const bRows = parseInt(document.getElementById('matrix-b-rows').value);
        const bCols = parseInt(document.getElementById('matrix-b-cols').value);
        
        // Limpiar matriz A
        for (let i = 0; i < aRows; i++) {
            for (let j = 0; j < aCols; j++) {
                document.getElementById(`a_${i}_${j}`).value = '';
            }
        }
        
        // Limpiar matriz B
        for (let i = 0; i < bRows; i++) {
            for (let j = 0; j < bCols; j++) {
                document.getElementById(`b_${i}_${j}`).value = '';
            }
        }
        
        document.getElementById('results').style.display = 'none';
        document.getElementById('result-content').innerHTML = '';
    }
};