// Herramienta: Introducción
app.tools.introduccion1 = {
    render: function(container) {
        container.innerHTML = `
            <div class="tool-container">
                <h2><i class="fas fa-home"></i> Introducción a la Geometría Plana</h2>
                
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h3>Bienvenido a la Caja de Herramientas Matemáticas</h3>
                                <p>Esta aplicación interactiva te permitirá explorar y trabajar con diferentes conceptos de geometría plana y álgebra lineal.</p>
                                
                                <h4>Funcionalidades disponibles:</h4>
                                <ul>
                                    <li><strong>Geometría Plana:</strong>
                                        <ul>
                                            <li>Distancia entre puntos del plano</li>
                                            <li>Conceptos de círculo, elipse, hipérbola y parábolas</li>
                                            <li>Sistemas lineales y no lineales</li>
                                        </ul>
                                    </li>
                                    <li><strong>Álgebra Lineal:</strong>
                                        <ul>
                                            <li>Operaciones con matrices (suma, producto, potencia)</li>
                                            <li>Sistemas de ecuaciones (Gauss-Jordan)</li>
                                            <li>Cálculo de determinantes</li>
                                        </ul>
                                    </li>
                                    <li><strong>Herramientas Interactivas:</strong>
                                        <ul>
                                            <li>Geogebra integrado</li>
                                            <li>Visualización gráfica de funciones</li>
                                            <li>Calculadoras especializadas</li>
                                        </ul>
                                    </li>
                                </ul>
                                
                                <div class="alert alert-info">
                                    <h5><i class="fas fa-info-circle"></i> Cómo usar la aplicación:</h5>
                                    <ol>
                                        <li>Selecciona una herramienta del menú lateral</li>
                                        <li>Introduce los datos solicitados en los campos correspondientes</li>
                                        <li>Haz clic en "Calcular" o "Graficar" según sea necesario</li>
                                        <li>Observa los resultados y las visualizaciones generadas</li>
                                    </ol>
                                </div>
                                
                                <div class="math-example">
                                    <h5>Ejemplo de notación matemática:</h5>
                                    <p>La distancia entre dos puntos $P_1(x_1, y_1)$ y $P_2(x_2, y_2)$ se calcula usando la fórmula:</p>
                                    <p>$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$</p>
                                </div>
                                
                                <div class="text-center mt-4">
                                    <button class="btn btn-primary" onclick="app.loadTool('distanciaPuntos')">
                                        <i class="fas fa-arrow-right"></i> Comenzar con Distancia entre Puntos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};