// Módulo de graficación con Plotly.js para geometría plana
window.Grapher = {
    // Configuración base para los gráficos
    defaultConfig: {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d'],
        displaylogo: false,
        toImageButtonOptions: {
            format: 'png',
            filename: 'grafico_matematico',
            height: 600,
            width: 800,
            scale: 1
        },
        scrollZoom: true,
        doubleClick: 'reset+autosize'
    },

    // Layout por defecto para gráficos matemáticos
    defaultLayout: {
        title: {
            font: { size: 16 }
        },
        xaxis: {
            title: 'x',
            gridcolor: '#e6e6e6',
            gridwidth: 1,
            showgrid: true,
            zeroline: true,
            zerolinecolor: '#333',
            zerolinewidth: 2,
            tickfont: { size: 12 },
            fixedrange: false,
            constrain: 'domain'
        },
        yaxis: {
            title: 'y',
            gridcolor: '#e6e6e6',
            gridwidth: 1,
            showgrid: true,
            zeroline: true,
            zerolinecolor: '#333',
            zerolinewidth: 2,
            tickfont: { size: 12 },
            scaleanchor: 'x',
            scaleratio: 1,
            fixedrange: false,
            constrain: 'domain'
        },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
        margin: { l: 60, r: 40, t: 60, b: 60 },
        hovermode: 'closest',
        showlegend: true,
        legend: {
            x: 0.02,
            y: 0.98,
            bgcolor: 'rgba(255,255,255,0.8)',
            bordercolor: '#ccc',
            borderwidth: 1
        },
        dragmode: 'pan'
    },

    // Almacenar referencias a los gráficos activos
    activePlots: new Map(),

    // Crear un gráfico básico
    createPlot: function(containerId, width = 500, height = 400, title = 'Gráfico Matemático') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return null;
        }

        // Limpiar container
        container.innerHTML = '';

        // Configurar layout específico
        const layout = {
            ...this.defaultLayout,
            title: { text: title, font: { size: 16 } },
            width: width,
            height: height,
            autosize: true
        };

        // Crear div para el gráfico
        const plotDiv = document.createElement('div');
        plotDiv.id = containerId + '_plot';
        plotDiv.style.width = '100%';
        plotDiv.style.height = height + 'px';
        container.appendChild(plotDiv);

        // Inicializar gráfico vacío
        Plotly.newPlot(plotDiv.id, [], layout, this.defaultConfig);

        // Configurar eventos para mantener proporciones
        this.setupPlotEvents(plotDiv.id);

        // Almacenar referencia del gráfico
        this.activePlots.set(plotDiv.id, {
            containerId: containerId,
            width: width,
            height: height,
            title: title
        });

        return plotDiv.id;
    },

    // Configurar eventos para mantener proporciones correctas
    setupPlotEvents: function(plotId) {
        const plotElement = document.getElementById(plotId);
        if (!plotElement) return;

        // Manejar eventos de zoom y pan
        plotElement.on('plotly_relayout', (eventData) => {
            // Si hay cambios en el rango de los ejes, mantener la proporción 1:1
            if (eventData['xaxis.range[0]'] !== undefined || eventData['yaxis.range[0]'] !== undefined) {
                this.maintainAspectRatio(plotId, eventData);
            }
        });

        // Manejar redimensionamiento
        plotElement.on('plotly_relayout', (eventData) => {
            if (eventData.autosize) {
                this.handleResize(plotId);
            }
        });

        // Observar cambios de tamaño del contenedor
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => {
                setTimeout(() => {
                    this.handleResize(plotId);
                }, 100);
            });
            resizeObserver.observe(plotElement.parentElement);
        }
    },

    // Mantener proporción 1:1 después del zoom
    maintainAspectRatio: function(plotId, eventData) {
        const plotInfo = this.activePlots.get(plotId);
        if (!plotInfo) return;

        // Obtener el elemento del gráfico
        const plotElement = document.getElementById(plotId);
        if (!plotElement) return;

        // Esperar un poco para que Plotly procese el evento
        setTimeout(() => {
            const currentLayout = plotElement.layout;
            
            // Verificar si necesitamos ajustar la proporción
            if (currentLayout.xaxis && currentLayout.yaxis) {
                const xRange = currentLayout.xaxis.range;
                const yRange = currentLayout.yaxis.range;
                
                if (xRange && yRange) {
                    const xSpan = xRange[1] - xRange[0];
                    const ySpan = yRange[1] - yRange[0];
                    
                    // Solo ajustar si la diferencia es significativa
                    if (Math.abs(xSpan - ySpan) > 0.01) {
                        const maxSpan = Math.max(xSpan, ySpan);
                        const xCenter = (xRange[0] + xRange[1]) / 2;
                        const yCenter = (yRange[0] + yRange[1]) / 2;
                        
                        // Ajustar ambos ejes al mismo rango
                        const update = {
                            'xaxis.range': [xCenter - maxSpan/2, xCenter + maxSpan/2],
                            'yaxis.range': [yCenter - maxSpan/2, yCenter + maxSpan/2]
                        };
                        
                        Plotly.relayout(plotId, update);
                    }
                }
            }
        }, 50);
    },

    // Manejar redimensionamiento del gráfico
    handleResize: function(plotId) {
        const plotElement = document.getElementById(plotId);
        if (!plotElement) return;

        Plotly.Plots.resize(plotId);
    },

    // Dibujar puntos
    drawPoints: function(plotId, points, options = {}) {
        const {
            color = 'red',
            size = 8,
            name = 'Puntos',
            mode = 'markers',
            symbol = 'circle'
        } = options;

        const trace = {
            x: points.map(p => p.x),
            y: points.map(p => p.y),
            mode: mode,
            type: 'scatter',
            marker: {
                color: color,
                size: size,
                symbol: symbol,
                line: { width: 1, color: 'darkblue' }
            },
            name: name,
            text: points.map(p => p.label || `(${p.x}, ${p.y})`),
            textposition: 'top center',
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);
        return trace;
    },

    // Dibujar líneas
    drawLine: function(plotId, x1, y1, x2, y2, options = {}) {
        const {
            color = 'blue',
            width = 2,
            name = 'Línea',
            dash = 'solid'
        } = options;

        const trace = {
            x: [x1, x2],
            y: [y1, y2],
            mode: 'lines',
            type: 'scatter',
            line: {
                color: color,
                width: width,
                dash: dash
            },
            name: name,
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);
        return trace;
    },

    // Dibujar línea extendida (recta infinita)
    drawExtendedLine: function(plotId, a, b, c, options = {}) {
        const {
            color = 'blue',
            width = 2,
            name = 'Recta',
            range = 20
        } = options;

        // Ecuación: ax + by + c = 0
        let x = [], y = [];

        if (Math.abs(b) > 1e-10) {
            // Línea no vertical
            for (let xi = -range; xi <= range; xi += 0.1) {
                const yi = -(a * xi + c) / b;
                x.push(xi);
                y.push(yi);
            }
        } else if (Math.abs(a) > 1e-10) {
            // Línea vertical: x = -c/a
            const xConst = -c / a;
            x = [xConst, xConst];
            y = [-range, range];
        }

        const trace = {
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            line: {
                color: color,
                width: width
            },
            name: name,
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);
        return trace;
    },

    // Dibujar círculo
    drawCircle: function(plotId, centerX, centerY, radius, options = {}) {
        const {
            color = 'green',
            width = 2,
            name = 'Círculo',
            fill = false
        } = options;

        // Generar puntos del círculo
        const theta = [];
        const x = [];
        const y = [];

        for (let i = 0; i <= 100; i++) {
            const t = (2 * Math.PI * i) / 100;
            theta.push(t);
            x.push(centerX + radius * Math.cos(t));
            y.push(centerY + radius * Math.sin(t));
        }

        const trace = {
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            line: {
                color: color,
                width: width
            },
            fill: fill ? 'tonexty' : 'none',
            fillcolor: fill ? color + '20' : undefined,
            name: name,
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);

        // Agregar punto central
        this.drawPoints(plotId, [{x: centerX, y: centerY, label: `Centro(${centerX}, ${centerY})`}], {
            color: color,
            size: 6,
            name: 'Centro',
            symbol: 'x'
        });

        return trace;
    },

    // Dibujar elipse
    drawEllipse: function(plotId, centerX, centerY, a, b, options = {}) {
        const {
            color = 'purple',
            width = 2,
            name = 'Elipse',
            isHorizontal = true
        } = options;

        const x = [];
        const y = [];

        for (let i = 0; i <= 100; i++) {
            const t = (2 * Math.PI * i) / 100;
            if (isHorizontal) {
                x.push(centerX + a * Math.cos(t));
                y.push(centerY + b * Math.sin(t));
            } else {
                x.push(centerX + b * Math.cos(t));
                y.push(centerY + a * Math.sin(t));
            }
        }

        const trace = {
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            line: {
                color: color,
                width: width
            },
            name: name,
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);

        // Marcar centro y focos
        this.drawPoints(plotId, [{x: centerX, y: centerY, label: `Centro(${centerX}, ${centerY})`}], {
            color: color,
            size: 6,
            name: 'Centro',
            symbol: 'x'
        });

        return trace;
    },

    // Dibujar parábola
    drawParabola: function(plotId, h, k, a, options = {}) {
        const {
            color = 'orange',
            width = 2,
            name = 'Parábola',
            isVertical = true,
            range = 10
        } = options;

        const x = [];
        const y = [];

        if (isVertical) {
            // Parábola vertical: y = a(x - h)² + k
            for (let xi = h - range; xi <= h + range; xi += 0.1) {
                const yi = a * (xi - h) * (xi - h) + k;
                x.push(xi);
                y.push(yi);
            }
        } else {
            // Parábola horizontal: x = a(y - k)² + h
            for (let yi = k - range; yi <= k + range; yi += 0.1) {
                const xi = a * (yi - k) * (yi - k) + h;
                x.push(xi);
                y.push(yi);
            }
        }

        const trace = {
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            line: {
                color: color,
                width: width
            },
            name: name,
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);

        // Marcar vértice
        this.drawPoints(plotId, [{x: h, y: k, label: `Vértice(${h}, ${k})`}], {
            color: color,
            size: 8,
            name: 'Vértice',
            symbol: 'diamond'
        });

        return trace;
    },

    // Dibujar hipérbola
    drawHyperbola: function(plotId, h, k, a, b, options = {}) {
        const {
            color = 'red',
            width = 2,
            name = 'Hipérbola',
            isHorizontal = true,
            range = 10
        } = options;

        const traces = [];

        if (isHorizontal) {
            // Hipérbola horizontal: (x-h)²/a² - (y-k)²/b² = 1
            
            // Rama derecha
            const x1 = [], y1 = [], x2 = [], y2 = [];
            for (let x = h + a; x <= h + range; x += 0.1) {
                const yOffset = b * Math.sqrt((x - h) * (x - h) / (a * a) - 1);
                x1.push(x);
                y1.push(k + yOffset);
                x2.push(x);
                y2.push(k - yOffset);
            }

            // Rama izquierda
            const x3 = [], y3 = [], x4 = [], y4 = [];
            for (let x = h - a; x >= h - range; x -= 0.1) {
                const yOffset = b * Math.sqrt((x - h) * (x - h) / (a * a) - 1);
                x3.push(x);
                y3.push(k + yOffset);
                x4.push(x);
                y4.push(k - yOffset);
            }

            // Agregar las cuatro ramas
            const branches = [
                {x: x1, y: y1, name: name + ' (rama 1)'},
                {x: x2, y: y2, name: name + ' (rama 2)'},
                {x: x3, y: y3, name: name + ' (rama 3)'},
                {x: x4, y: y4, name: name + ' (rama 4)'}
            ];

            branches.forEach((branch, index) => {
                const trace = {
                    x: branch.x,
                    y: branch.y,
                    mode: 'lines',
                    type: 'scatter',
                    line: {
                        color: color,
                        width: width
                    },
                    name: index === 0 ? name : undefined,
                    showlegend: index === 0,
                    legendgroup: name
                };
                Plotly.addTraces(plotId, [trace]);
                traces.push(trace);
            });

            // Dibujar asíntotas
            this.drawAsymptotes(plotId, h, k, a, b, true, {color: '#999', width: 1});
        }

        // Marcar centro
        this.drawPoints(plotId, [{x: h, y: k, label: `Centro(${h}, ${k})`}], {
            color: color,
            size: 6,
            name: 'Centro',
            symbol: 'x'
        });

        return traces;
    },

    // Dibujar asíntotas para hipérbola
    drawAsymptotes: function(plotId, h, k, a, b, isHorizontal, options = {}) {
        const {
            color = '#999',
            width = 1,
            range = 15
        } = options;

        if (isHorizontal) {
            const slope1 = b / a;
            const slope2 = -b / a;

            // Asíntota 1: y - k = (b/a)(x - h)
            const x1 = [], y1 = [];
            const x2 = [], y2 = [];
            
            for (let x = h - range; x <= h + range; x += 0.5) {
                x1.push(x);
                y1.push(k + slope1 * (x - h));
                x2.push(x);
                y2.push(k + slope2 * (x - h));
            }

            const asymptote1 = {
                x: x1,
                y: y1,
                mode: 'lines',
                type: 'scatter',
                line: {
                    color: color,
                    width: width,
                    dash: 'dash'
                },
                name: 'Asíntotas',
                showlegend: true
            };

            const asymptote2 = {
                x: x2,
                y: y2,
                mode: 'lines',
                type: 'scatter',
                line: {
                    color: color,
                    width: width,
                    dash: 'dash'
                },
                name: 'Asíntotas',
                showlegend: false,
                legendgroup: 'Asíntotas'
            };

            Plotly.addTraces(plotId, [asymptote1, asymptote2]);
        }
    },

    // Función para dibujar función matemática
    drawFunction: function(plotId, func, xMin = -10, xMax = 10, options = {}) {
        const {
            color = 'blue',
            width = 2,
            name = 'f(x)',
            steps = 1000
        } = options;

        const x = [];
        const y = [];
        const step = (xMax - xMin) / steps;

        for (let xi = xMin; xi <= xMax; xi += step) {
            try {
                const yi = func(xi);
                if (isFinite(yi)) {
                    x.push(xi);
                    y.push(yi);
                }
            } catch (e) {
                // Ignorar valores problemáticos
            }
        }

        const trace = {
            x: x,
            y: y,
            mode: 'lines',
            type: 'scatter',
            line: {
                color: color,
                width: width
            },
            name: name,
            showlegend: true
        };

        Plotly.addTraces(plotId, [trace]);
        return trace;
    },

    // Actualizar rango de ejes manteniendo proporción 1:1
    updateRange: function(plotId, xRange = null, yRange = null) {
        const update = {};
        
        // Si se proporcionan ambos rangos, mantener proporción 1:1
        if (xRange && yRange) {
            const xSpan = xRange[1] - xRange[0];
            const ySpan = yRange[1] - yRange[0];
            const maxSpan = Math.max(xSpan, ySpan);
            
            // Ajustar ambos rangos al mismo tamaño
            const xCenter = (xRange[0] + xRange[1]) / 2;
            const yCenter = (yRange[0] + yRange[1]) / 2;
            
            update['xaxis.range'] = [xCenter - maxSpan/2, xCenter + maxSpan/2];
            update['yaxis.range'] = [yCenter - maxSpan/2, yCenter + maxSpan/2];
        } else {
            if (xRange) {
                update['xaxis.range'] = xRange;
            }
            if (yRange) {
                update['yaxis.range'] = yRange;
            }
        }

        if (Object.keys(update).length > 0) {
            Plotly.relayout(plotId, update);
        }
    },

    // Limpiar gráfico
    clear: function(plotId) {
        Plotly.deleteTraces(plotId, Array.from({length: 50}, (_, i) => i));
    },

    // Configurar auto-ajuste del rango manteniendo proporción
    autoRange: function(plotId) {
        Plotly.relayout(plotId, {
            'xaxis.autorange': true,
            'yaxis.autorange': true
        });
        
        // Después del auto-ajuste, mantener proporción 1:1
        setTimeout(() => {
            const plotElement = document.getElementById(plotId);
            if (plotElement && plotElement.layout) {
                const xRange = plotElement.layout.xaxis.range;
                const yRange = plotElement.layout.yaxis.range;
                
                if (xRange && yRange) {
                    this.updateRange(plotId, xRange, yRange);
                }
            }
        }, 100);
    },

    // Función para resetear zoom manteniendo proporción
    resetZoom: function(plotId) {
        const plotInfo = this.activePlots.get(plotId);
        if (!plotInfo) return;
        
        // Resetear a auto-range y luego mantener proporción
        this.autoRange(plotId);
    },

    // Agregar anotaciones de texto
    addAnnotation: function(plotId, x, y, text, options = {}) {
        const {
            color = 'black',
            size = 12,
            bgcolor = 'white',
            bordercolor = 'black'
        } = options;

        const annotation = {
            x: x,
            y: y,
            text: text,
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 1,
            arrowcolor: color,
            font: {
                color: color,
                size: size
            },
            bgcolor: bgcolor,
            bordercolor: bordercolor,
            borderwidth: 1
        };

        Plotly.relayout(plotId, {
            annotations: [annotation]
        });
    },

    // Función de ayuda para crear gráfico completo de una herramienta
    createCompleteGraph: function(containerId, title, data, options = {}) {
        const {
            width = 500,
            height = 400,
            xRange = null,
            yRange = null
        } = options;

        const plotId = this.createPlot(containerId, width, height, title);
        
        // Agregar todos los elementos del gráfico
        data.forEach(item => {
            switch (item.type) {
                case 'points':
                    this.drawPoints(plotId, item.points, item.options);
                    break;
                case 'line':
                    this.drawLine(plotId, item.x1, item.y1, item.x2, item.y2, item.options);
                    break;
                case 'extendedLine':
                    this.drawExtendedLine(plotId, item.a, item.b, item.c, item.options);
                    break;
                case 'circle':
                    this.drawCircle(plotId, item.centerX, item.centerY, item.radius, item.options);
                    break;
                case 'ellipse':
                    this.drawEllipse(plotId, item.centerX, item.centerY, item.a, item.b, item.options);
                    break;
                case 'parabola':
                    this.drawParabola(plotId, item.h, item.k, item.a, item.options);
                    break;
                case 'hyperbola':
                    this.drawHyperbola(plotId, item.h, item.k, item.a, item.b, item.options);
                    break;
                case 'function':
                    this.drawFunction(plotId, item.func, item.xMin, item.xMax, item.options);
                    break;
            }
        });

        // Configurar rangos si se especifican
        if (xRange || yRange) {
            this.updateRange(plotId, xRange, yRange);
        }

        return plotId;
    },

    // Agregar controles de navegación al gráfico
    addNavigationControls: function(plotId, containerId, title = 'Gráfica Ampliada') {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Crear contenedor de controles
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'graph-controls mt-2 text-center';
        controlsDiv.innerHTML = `
            <button class="btn btn-sm btn-primary" onclick="Grapher.openGraphModal('${plotId}', '${title}')" title="Ver gráfica ampliada">
                <i class="fas fa-expand"></i> Ampliar Gráfica
            </button>
            <button class="btn btn-sm btn-secondary" onclick="Grapher.resetZoom('${plotId}')" title="Resetear zoom">
                <i class="fas fa-home"></i> Resetear
            </button>
            <button class="btn btn-sm btn-info" onclick="Grapher.autoRange('${plotId}')" title="Ajustar automáticamente">
                <i class="fas fa-expand-arrows-alt"></i> Auto-ajustar
            </button>
            <small class="text-muted ml-2">
                Usa la rueda del mouse para zoom, arrastra para mover, doble-click para resetear
            </small>
        `;
        
        container.appendChild(controlsDiv);
    },

    // Limpiar referencias de gráficos
    cleanup: function(plotId) {
        this.activePlots.delete(plotId);
        const plotElement = document.getElementById(plotId);
        if (plotElement && plotElement._fullLayout) {
            Plotly.purge(plotId);
        }
    },

    // Crear modal para gráfica ampliada
    createGraphModal: function() {
        // Verificar si ya existe el modal
        if (document.getElementById('graph-modal')) {
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'graph-modal';
        modal.className = 'graph-modal';
        modal.innerHTML = `
            <div class="graph-modal-content">
                <div class="graph-modal-header">
                    <h2 class="graph-modal-title" id="modal-title">Gráfica Ampliada</h2>
                    <button class="graph-modal-close" onclick="Grapher.closeGraphModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="graph-modal-body">
                    <div class="graph-modal-plot" id="modal-plot-container"></div>
                    <div class="graph-modal-controls">
                        <div class="axis-controls">
                            <label>Eje X:</label>
                            <button class="axis-btn expand" onclick="Grapher.expandAxis('x')" title="Ampliar rango X">
                                <i class="fas fa-expand-arrows-alt"></i> Ampliar
                            </button>
                            <button class="axis-btn reduce" onclick="Grapher.reduceAxis('x')" title="Reducir rango X">
                                <i class="fas fa-compress-arrows-alt"></i> Reducir
                            </button>
                        </div>
                        <div class="axis-controls">
                            <label>Eje Y:</label>
                            <button class="axis-btn expand" onclick="Grapher.expandAxis('y')" title="Ampliar rango Y">
                                <i class="fas fa-expand-arrows-alt"></i> Ampliar
                            </button>
                            <button class="axis-btn reduce" onclick="Grapher.reduceAxis('y')" title="Reducir rango Y">
                                <i class="fas fa-compress-arrows-alt"></i> Reducir
                            </button>
                        </div>
                        <button class="btn btn-secondary" onclick="Grapher.resetZoom(Grapher.currentModalPlotId)">
                            <i class="fas fa-home"></i> Resetear
                        </button>
                        <button class="btn btn-info" onclick="Grapher.autoRange(Grapher.currentModalPlotId)">
                            <i class="fas fa-expand-arrows-alt"></i> Auto-ajustar
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                Grapher.closeGraphModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                Grapher.closeGraphModal();
            }
        });
    },

    // Variable para almacenar el ID del gráfico actual en el modal
    currentModalPlotId: null,

    // Abrir modal con gráfica ampliada
    openGraphModal: function(originalPlotId, title = 'Gráfica Ampliada') {
        this.createGraphModal();
        
        const modal = document.getElementById('graph-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContainer = document.getElementById('modal-plot-container');
        
        // Configurar título
        modalTitle.textContent = title;
        
        // Limpiar contenedor del modal
        modalContainer.innerHTML = '';
        
        // Obtener datos del gráfico original
        const originalElement = document.getElementById(originalPlotId);
        if (!originalElement) {
            console.error('Gráfico original no encontrado:', originalPlotId);
            return;
        }

        // Crear nuevo gráfico en el modal
        const modalPlotId = 'modal-plot-' + Date.now();
        const modalPlotDiv = document.createElement('div');
        modalPlotDiv.id = modalPlotId;
        modalPlotDiv.style.width = '100%';
        modalPlotDiv.style.height = '100%';
        modalContainer.appendChild(modalPlotDiv);

        // Copiar configuración del gráfico original
        const originalData = originalElement.data;
        const originalLayout = JSON.parse(JSON.stringify(originalElement.layout));
        
        // Ajustar layout para el modal
        originalLayout.width = undefined;
        originalLayout.height = undefined;
        originalLayout.autosize = true;
        originalLayout.title.text = title;

        // Crear gráfico en el modal
        Plotly.newPlot(modalPlotId, originalData, originalLayout, this.defaultConfig);
        
        // Configurar eventos para el modal
        this.setupPlotEvents(modalPlotId);
        
        // Almacenar ID del gráfico modal actual
        this.currentModalPlotId = modalPlotId;
        
        // Mostrar modal
        modal.style.display = 'block';
        
        // Redimensionar después de mostrar
        setTimeout(() => {
            Plotly.Plots.resize(modalPlotId);
        }, 100);
    },

    // Cerrar modal
    closeGraphModal: function() {
        const modal = document.getElementById('graph-modal');
        if (modal) {
            modal.style.display = 'none';
            
            // Limpiar gráfico del modal
            if (this.currentModalPlotId) {
                this.cleanup(this.currentModalPlotId);
                this.currentModalPlotId = null;
            }
        }
    },

    // Ampliar rango de un eje
    expandAxis: function(axis) {
        if (!this.currentModalPlotId) return;
        
        const plotElement = document.getElementById(this.currentModalPlotId);
        if (!plotElement || !plotElement.layout) return;
        
        const currentLayout = plotElement.layout;
        const axisKey = axis === 'x' ? 'xaxis' : 'yaxis';
        const currentRange = currentLayout[axisKey].range;
        
        if (currentRange) {
            const center = (currentRange[0] + currentRange[1]) / 2;
            const currentSpan = currentRange[1] - currentRange[0];
            const newSpan = currentSpan * 1.5; // Ampliar 50%
            
            const update = {};
            update[axisKey + '.range'] = [center - newSpan/2, center + newSpan/2];
            
            Plotly.relayout(this.currentModalPlotId, update);
        }
    },

    // Reducir rango de un eje
    reduceAxis: function(axis) {
        if (!this.currentModalPlotId) return;
        
        const plotElement = document.getElementById(this.currentModalPlotId);
        if (!plotElement || !plotElement.layout) return;
        
        const currentLayout = plotElement.layout;
        const axisKey = axis === 'x' ? 'xaxis' : 'yaxis';
        const currentRange = currentLayout[axisKey].range;
        
        if (currentRange) {
            const center = (currentRange[0] + currentRange[1]) / 2;
            const currentSpan = currentRange[1] - currentRange[0];
            const newSpan = currentSpan * 0.7; // Reducir 30%
            
            const update = {};
            update[axisKey + '.range'] = [center - newSpan/2, center + newSpan/2];
            
            Plotly.relayout(this.currentModalPlotId, update);
        }
    },

    // Crear modal específico para GeoGebra
    createGeoGebraModal: function() {
        // Verificar si ya existe el modal
        if (document.getElementById('geogebra-modal')) {
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'geogebra-modal';
        modal.className = 'graph-modal';
        modal.innerHTML = `
            <div class="graph-modal-content">
                <div class="graph-modal-header">
                    <h2 class="graph-modal-title">GeoGebra Clásico - Vista Ampliada</h2>
                    <button class="graph-modal-close" onclick="Grapher.closeGeoGebraModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="graph-modal-body">
                    <div class="graph-modal-plot" id="modal-geogebra-container"></div>
                    <div class="graph-modal-controls">
                        <button class="btn btn-info" onclick="Grapher.refreshGeoGebra()">
                            <i class="fas fa-sync-alt"></i> Actualizar
                        </button>
                        <button class="btn btn-success" onclick="Grapher.openGeoGebraInNewTab()">
                            <i class="fas fa-external-link-alt"></i> Abrir en Nueva Pestaña
                        </button>
                        <small class="text-muted ml-3">
                            Usa todas las herramientas de GeoGebra en pantalla completa
                        </small>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                Grapher.closeGeoGebraModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                Grapher.closeGeoGebraModal();
            }
        });
    },

    // Abrir modal de GeoGebra
    openGeoGebraModal: function() {
        this.createGeoGebraModal();
        
        const modal = document.getElementById('geogebra-modal');
        const modalContainer = document.getElementById('modal-geogebra-container');
        
        // Limpiar contenedor del modal
        modalContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
                <div>
                    <i class="fas fa-compass fa-3x text-muted mb-3"></i>
                    <h4>Cargando GeoGebra...</h4>
                    <p class="text-muted">Inicializando la vista ampliada</p>
                </div>
            </div>
        `;
        
        // Mostrar modal
        modal.style.display = 'block';
        
        // Cargar GeoGebra en el modal después de mostrar
        setTimeout(() => {
            this.loadGeoGebraInModal();
        }, 100);
    },

    // Cargar GeoGebra en el modal
    loadGeoGebraInModal: function() {
        const container = document.getElementById('modal-geogebra-container');
        
        // Crear iframe para GeoGebra
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.geogebra.org/classic?lang=es';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allowfullscreen', 'true');
        
        // Limpiar container y agregar iframe
        container.innerHTML = '';
        container.appendChild(iframe);
        
        // Manejar errores de carga
        iframe.onerror = function() {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
                    <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                    <h4>Error al cargar GeoGebra</h4>
                    <p class="text-muted">Verifica tu conexión a internet e intenta nuevamente</p>
                    <button class="btn btn-primary" onclick="Grapher.loadGeoGebraInModal()">
                        <i class="fas fa-redo"></i> Reintentar
                    </button>
                </div>
            `;
        };
        
        // Agregar evento de carga
        iframe.onload = function() {
            container.style.backgroundColor = 'white';
        };
    },

    // Cerrar modal de GeoGebra
    closeGeoGebraModal: function() {
        const modal = document.getElementById('geogebra-modal');
        if (modal) {
            modal.style.display = 'none';
            
            // Limpiar contenido del modal para liberar memoria
            const modalContainer = document.getElementById('modal-geogebra-container');
            if (modalContainer) {
                modalContainer.innerHTML = '';
            }
        }
    },

    // Actualizar GeoGebra en el modal
    refreshGeoGebra: function() {
        const container = document.getElementById('modal-geogebra-container');
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
                    <div>
                        <i class="fas fa-sync-alt fa-spin fa-3x text-primary mb-3"></i>
                        <h4>Actualizando GeoGebra...</h4>
                        <p class="text-muted">Recargando la aplicación</p>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                this.loadGeoGebraInModal();
            }, 1000);
        }
    },

    // Abrir GeoGebra en nueva pestaña
    openGeoGebraInNewTab: function() {
        window.open('https://www.geogebra.org/classic?lang=es', '_blank');
    },

    // Crear modal de ayuda para GeoGebra
    createGeoGebraHelpModal: function() {
        // Verificar si ya existe el modal
        if (document.getElementById('geogebra-help-modal')) {
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'geogebra-help-modal';
        modal.className = 'graph-modal';
        modal.innerHTML = `
            <div class="graph-modal-content">
                <div class="graph-modal-header">
                    <h2 class="graph-modal-title">
                        <i class="fas fa-question-circle"></i> Guía de Ayuda - GeoGebra
                    </h2>
                    <button class="graph-modal-close" onclick="Grapher.closeGeoGebraHelpModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="graph-modal-body">
                    <div class="graph-modal-plot" id="modal-help-container">
                        <div class="help-navigation">
                            <div class="help-tabs">
                                <button class="help-tab active" onclick="Grapher.showHelpSection('intro')">
                                    <i class="fas fa-home"></i> Introducción
                                </button>
                                <button class="help-tab" onclick="Grapher.showHelpSection('grafica')">
                                    <i class="fas fa-chart-line"></i> Vista Gráfica
                                </button>
                                <button class="help-tab" onclick="Grapher.showHelpSection('algebraica')">
                                    <i class="fas fa-calculator"></i> Vista Algebraica
                                </button>
                                <button class="help-tab" onclick="Grapher.showHelpSection('3d')">
                                    <i class="fas fa-cube"></i> Vista 3D
                                </button>
                                <button class="help-tab" onclick="Grapher.showHelpSection('hoja')">
                                    <i class="fas fa-table"></i> Hoja de Cálculo
                                </button>
                                <button class="help-tab" onclick="Grapher.showHelpSection('cas')">
                                    <i class="fas fa-function"></i> Vista CAS
                                </button>
                                <button class="help-tab" onclick="Grapher.showHelpSection('avanzado')">
                                    <i class="fas fa-cogs"></i> Avanzado
                                </button>
                            </div>
                            <div class="help-content" id="help-content">
                                <!-- El contenido se cargará dinámicamente -->
                            </div>
                        </div>
                    </div>
                    <div class="graph-modal-controls">
                        <button class="btn btn-info" onclick="Grapher.openGeoGebraInNewTab()">
                            <i class="fas fa-external-link-alt"></i> Abrir GeoGebra
                        </button>
                        <button class="btn btn-success" onclick="window.open('https://help.geogebra.org/hc/es', '_blank')">
                            <i class="fas fa-book"></i> Documentación Oficial
                        </button>
                        <small class="text-muted ml-3">
                            Guía completa para usar GeoGebra efectivamente
                        </small>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Agregar estilos CSS específicos para la ayuda
        this.addHelpModalStyles();

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                Grapher.closeGeoGebraHelpModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                Grapher.closeGeoGebraHelpModal();
            }
        });
    },

    // Agregar estilos CSS específicos para el modal de ayuda
    addHelpModalStyles: function() {
        if (document.getElementById('help-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'help-modal-styles';
        style.textContent = `
            .help-navigation {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            
            .help-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                margin-bottom: 20px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .help-tab {
                flex: 1;
                min-width: 140px;
                padding: 10px 15px;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 14px;
                text-align: center;
            }
            
            .help-tab:hover {
                background: #e9ecef;
                border-color: #adb5bd;
            }
            
            .help-tab.active {
                background: #007bff;
                color: white;
                border-color: #007bff;
            }
            
            .help-content {
                flex: 1;
                padding: 20px;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                overflow-y: auto;
                max-height: 500px;
            }
            
            .help-section {
                display: none;
            }
            
            .help-section.active {
                display: block;
            }
            
            .help-section h3 {
                color: #007bff;
                border-bottom: 2px solid #007bff;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            
            .help-section h4 {
                color: #495057;
                margin-top: 25px;
                margin-bottom: 15px;
            }
            
            .help-section ul {
                padding-left: 20px;
            }
            
            .help-section li {
                margin-bottom: 8px;
                line-height: 1.5;
            }
            
            .help-tip {
                background: #d1ecf1;
                border: 1px solid #b8daff;
                border-radius: 6px;
                padding: 15px;
                margin: 15px 0;
            }
            
            .help-tip h5 {
                color: #0c5460;
                margin-bottom: 10px;
            }
            
            .help-warning {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 6px;
                padding: 15px;
                margin: 15px 0;
            }
            
            .help-warning h5 {
                color: #856404;
                margin-bottom: 10px;
            }
            
            .help-example {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                border-radius: 6px;
                padding: 15px;
                margin: 15px 0;
            }
            
            .help-example h5 {
                color: #155724;
                margin-bottom: 10px;
            }
            
            .keyboard-shortcut {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 4px;
                padding: 2px 6px;
                font-family: monospace;
                font-size: 12px;
            }
            
            @media (max-width: 768px) {
                .help-tabs {
                    flex-direction: column;
                }
                
                .help-tab {
                    min-width: auto;
                }
                
                .help-content {
                    max-height: 400px;
                }
            }
        `;
        document.head.appendChild(style);
    },

    // Abrir modal de ayuda de GeoGebra
    openGeoGebraHelpModal: function() {
        this.createGeoGebraHelpModal();
        
        const modal = document.getElementById('geogebra-help-modal');
        modal.style.display = 'block';
        
        // Mostrar sección de introducción por defecto
        this.showHelpSection('intro');
    },

    // Cerrar modal de ayuda
    closeGeoGebraHelpModal: function() {
        const modal = document.getElementById('geogebra-help-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Mostrar sección específica de ayuda
    showHelpSection: function(section) {
        // Remover clase active de todas las pestañas
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Agregar clase active a la pestaña seleccionada
        event.target.classList.add('active');
        
        // Obtener contenido de la sección
        const content = this.getHelpContent(section);
        
        // Mostrar contenido
        document.getElementById('help-content').innerHTML = content;
    },

    // Obtener contenido específico de cada sección
    getHelpContent: function(section) {
        const contents = {
            intro: `
                <div class="help-section active">
                    <h3><i class="fas fa-home"></i> Introducción a GeoGebra</h3>
                    
                    <h4>¿Qué es GeoGebra?</h4>
                    <p>GeoGebra es un software matemático dinámico que conecta geometría, álgebra, estadística y cálculo en una sola aplicación. Es ideal para todos los niveles educativos.</p>
                    
                    <h4>Características Principales</h4>
                    <ul>
                        <li><strong>Interactividad:</strong> Los objetos se pueden manipular directamente</li>
                        <li><strong>Múltiples vistas:</strong> Representa objetos desde diferentes perspectivas</li>
                        <li><strong>Conexión dinámica:</strong> Los cambios en una vista se reflejan automáticamente en otras</li>
                        <li><strong>Herramientas variadas:</strong> Desde construcciones básicas hasta análisis avanzado</li>
                    </ul>
                    
                    <h4>Interfaz Principal</h4>
                    <ul>
                        <li><strong>Barra de herramientas:</strong> Contiene todas las herramientas de construcción</li>
                        <li><strong>Área de trabajo:</strong> Donde se realizan las construcciones</li>
                        <li><strong>Vistas:</strong> Diferentes perspectivas del mismo objeto matemático</li>
                        <li><strong>Barra de entrada:</strong> Para introducir comandos y ecuaciones</li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-lightbulb"></i> Consejo</h5>
                        <p>Comienza con construcciones simples como puntos y líneas, luego avanza gradualmente a construcciones más complejas.</p>
                    </div>
                    
                    <h4>Primeros Pasos</h4>
                    <ol>
                        <li>Selecciona una herramienta de la barra superior</li>
                        <li>Haz clic en el área de trabajo para crear objetos</li>
                        <li>Observa cómo aparecen en las diferentes vistas</li>
                        <li>Experimenta arrastrando los objetos creados</li>
                    </ol>
                </div>
            `,
            
            grafica: `
                <div class="help-section active">
                    <h3><i class="fas fa-chart-line"></i> Vista Gráfica</h3>
                    
                    <h4>Descripción</h4>
                    <p>La Vista Gráfica es el área principal donde se visualizan construcciones geométricas, gráficas de funciones y otros objetos matemáticos en 2D.</p>
                    
                    <h4>Herramientas Básicas</h4>
                    <ul>
                        <li><strong>Mover:</strong> <span class="keyboard-shortcut">M</span> - Seleccionar y mover objetos</li>
                        <li><strong>Punto:</strong> <span class="keyboard-shortcut">P</span> - Crear puntos</li>
                        <li><strong>Línea:</strong> <span class="keyboard-shortcut">L</span> - Crear líneas, segmentos y rayos</li>
                        <li><strong>Polígono:</strong> <span class="keyboard-shortcut">Shift+P</span> - Crear polígonos</li>
                        <li><strong>Círculo:</strong> <span class="keyboard-shortcut">C</span> - Crear círculos</li>
                        <li><strong>Ángulo:</strong> <span class="keyboard-shortcut">A</span> - Medir ángulos</li>
                    </ul>
                    
                    <h4>Navegación</h4>
                    <ul>
                        <li><strong>Zoom:</strong> Rueda del mouse o <span class="keyboard-shortcut">Ctrl +/-</span></li>
                        <li><strong>Mover vista:</strong> Click derecho + arrastrar</li>
                        <li><strong>Centrar origen:</strong> <span class="keyboard-shortcut">Ctrl+Shift+0</span></li>
                        <li><strong>Ajustar a ventana:</strong> <span class="keyboard-shortcut">Ctrl+Shift+9</span></li>
                    </ul>
                    
                    <h4>Funciones y Gráficas</h4>
                    <ul>
                        <li><strong>Funciones simples:</strong> f(x) = x^2, g(x) = sin(x)</li>
                        <li><strong>Funciones paramétricas:</strong> (t, t^2) para t ∈ [-2, 2]</li>
                        <li><strong>Funciones implícitas:</strong> x^2 + y^2 = 25</li>
                        <li><strong>Inecuaciones:</strong> y > x^2 - 4</li>
                    </ul>
                    
                    <div class="help-example">
                        <h5><i class="fas fa-code"></i> Ejemplo</h5>
                        <p>Para graficar una parábola: escribe <code>f(x) = x^2</code> en la barra de entrada</p>
                    </div>
                    
                    <h4>Construcciones Geométricas</h4>
                    <ul>
                        <li><strong>Construcciones básicas:</strong> Puntos, líneas, círculos</li>
                        <li><strong>Transformaciones:</strong> Rotaciones, traslaciones, simetrías</li>
                        <li><strong>Lugares geométricos:</strong> Mediatrices, bisectrices, tangentes</li>
                        <li><strong>Cónicas:</strong> Elipses, hipérbolas, parábolas</li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-magic"></i> Funciones Avanzadas</h5>
                        <p>Usa la herramienta "Relación" para encontrar ecuaciones de objetos creados geométricamente.</p>
                    </div>
                </div>
            `,
            
            algebraica: `
                <div class="help-section active">
                    <h3><i class="fas fa-calculator"></i> Vista Algebraica</h3>
                    
                    <h4>Descripción</h4>
                    <p>La Vista Algebraica muestra la representación algebraica de todos los objetos matemáticos, organizados por tipo (puntos, líneas, cónicas, etc.).</p>
                    
                    <h4>Organización</h4>
                    <ul>
                        <li><strong>Objetos libres:</strong> Creados directamente por el usuario</li>
                        <li><strong>Objetos dependientes:</strong> Generados a partir de otros objetos</li>
                        <li><strong>Objetos auxiliares:</strong> Elementos de ayuda para construcciones</li>
                        <li><strong>Agrupación por tipos:</strong> Puntos, líneas, cónicas, funciones, etc.</li>
                    </ul>
                    
                    <h4>Funcionalidades</h4>
                    <ul>
                        <li><strong>Edición directa:</strong> Doble clic para modificar valores</li>
                        <li><strong>Visibilidad:</strong> Mostrar/ocultar objetos con el ícono del ojo</li>
                        <li><strong>Colores:</strong> Cambiar colores haciendo clic en el círculo coloreado</li>
                        <li><strong>Propiedades:</strong> Click derecho para acceder a configuraciones</li>
                    </ul>
                    
                    <h4>Tipos de Objetos</h4>
                    <ul>
                        <li><strong>Números:</strong> a = 5, b = 3.14</li>
                        <li><strong>Puntos:</strong> A = (2, 3), B = (5, -1)</li>
                        <li><strong>Vectores:</strong> u = (3, 4), v = AB</li>
                        <li><strong>Líneas:</strong> f: y = 2x + 1</li>
                        <li><strong>Cónicas:</strong> c: x² + y² = 25</li>
                        <li><strong>Funciones:</strong> g(x) = x² - 4x + 3</li>
                    </ul>
                    
                    <div class="help-example">
                        <h5><i class="fas fa-edit"></i> Edición Rápida</h5>
                        <p>Doble clic en cualquier objeto de la vista algebraica para editarlo directamente.</p>
                    </div>
                    
                    <h4>Barra de Entrada</h4>
                    <ul>
                        <li><strong>Comandos:</strong> Escribe comandos directamente</li>
                        <li><strong>Ecuaciones:</strong> Define funciones y relaciones</li>
                        <li><strong>Cálculos:</strong> Realiza operaciones matemáticas</li>
                        <li><strong>Autocompletado:</strong> Usa Tab para autocompletar</li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-keyboard"></i> Comandos Útiles</h5>
                        <ul>
                            <li><code>Intersect[a, b]</code> - Intersección de dos objetos</li>
                            <li><code>Midpoint[A, B]</code> - Punto medio</li>
                            <li><code>Distance[A, B]</code> - Distancia entre puntos</li>
                            <li><code>Angle[A, B, C]</code> - Ángulo formado por tres puntos</li>
                        </ul>
                    </div>
                    
                    <h4>Variables y Parámetros</h4>
                    <ul>
                        <li><strong>Deslizadores:</strong> Crear parámetros variables</li>
                        <li><strong>Animación:</strong> Animar parámetros automáticamente</li>
                        <li><strong>Condiciones:</strong> Usar declaraciones if-then</li>
                        <li><strong>Listas:</strong> Crear y manipular listas de objetos</li>
                    </ul>
                </div>
            `,
            
            '3d': `
                <div class="help-section active">
                    <h3><i class="fas fa-cube"></i> Vista Gráfica 3D</h3>
                    
                    <h4>Descripción</h4>
                    <p>La Vista Gráfica 3D permite crear y manipular objetos tridimensionales, superficies y sólidos geométricos.</p>
                    
                    <h4>Navegación 3D</h4>
                    <ul>
                        <li><strong>Rotar vista:</strong> Arrastrar con el mouse</li>
                        <li><strong>Zoom:</strong> Rueda del mouse</li>
                        <li><strong>Mover vista:</strong> Shift + arrastrar</li>
                        <li><strong>Vista frontal:</strong> <span class="keyboard-shortcut">Ctrl+1</span></li>
                        <li><strong>Vista lateral:</strong> <span class="keyboard-shortcut">Ctrl+2</span></li>
                        <li><strong>Vista superior:</strong> <span class="keyboard-shortcut">Ctrl+3</span></li>
                    </ul>
                    
                    <h4>Objetos 3D Básicos</h4>
                    <ul>
                        <li><strong>Puntos:</strong> A = (1, 2, 3)</li>
                        <li><strong>Vectores:</strong> u = (2, 1, 3)</li>
                        <li><strong>Líneas:</strong> Líneas y rayos en el espacio</li>
                        <li><strong>Planos:</strong> Planos definidos por puntos o ecuaciones</li>
                        <li><strong>Polígonos:</strong> Triángulos y polígonos en 3D</li>
                    </ul>
                    
                    <h4>Superficies</h4>
                    <ul>
                        <li><strong>Superficies de revolución:</strong> Rotar curvas alrededor de ejes</li>
                        <li><strong>Superficies paramétricas:</strong> (u, v, u²+v²)</li>
                        <li><strong>Superficies implícitas:</strong> x² + y² + z² = 25</li>
                        <li><strong>Superficies de funciones:</strong> f(x,y) = x² + y²</li>
                    </ul>
                    
                    <div class="help-example">
                        <h5><i class="fas fa-cube"></i> Ejemplo: Esfera</h5>
                        <p>Para crear una esfera: escribe <code>x² + y² + z² = 25</code> en la barra de entrada</p>
                    </div>
                    
                    <h4>Sólidos Geométricos</h4>
                    <ul>
                        <li><strong>Prismas:</strong> Extruir polígonos</li>
                        <li><strong>Pirámides:</strong> Unir polígonos con un punto</li>
                        <li><strong>Cilindros:</strong> Extruir círculos</li>
                        <li><strong>Conos:</strong> Unir círculos con un punto</li>
                        <li><strong>Esferas:</strong> Definir por centro y radio</li>
                    </ul>
                    
                    <h4>Herramientas Específicas 3D</h4>
                    <ul>
                        <li><strong>Plano por 3 puntos:</strong> Crear planos</li>
                        <li><strong>Pirámide:</strong> Crear pirámides desde polígonos</li>
                        <li><strong>Prisma:</strong> Crear prismas desde polígonos</li>
                        <li><strong>Rotación:</strong> Rotar objetos alrededor de ejes</li>
                        <li><strong>Intersección:</strong> Encontrar intersecciones 3D</li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-eye"></i> Visualización</h5>
                        <p>Usa diferentes estilos de visualización: wireframe, superficie sólida, o combinaciones para mejor comprensión.</p>
                    </div>
                    
                    <h4>Comandos 3D Útiles</h4>
                    <ul>
                        <li><code>Sphere[A, r]</code> - Esfera con centro A y radio r</li>
                        <li><code>Plane[A, B, C]</code> - Plano por tres puntos</li>
                        <li><code>Prism[polygon, height]</code> - Prisma desde polígono</li>
                        <li><code>Rotate[object, angle, axis]</code> - Rotación 3D</li>
                    </ul>
                </div>
            `,
            
            hoja: `
                <div class="help-section active">
                    <h3><i class="fas fa-table"></i> Vista Hoja de Cálculo</h3>
                    
                    <h4>Descripción</h4>
                    <p>La Vista Hoja de Cálculo funciona como una hoja de cálculo tradicional, pero con la potencia de GeoGebra para análisis matemático y visualización de datos.</p>
                    
                    <h4>Funcionalidades Básicas</h4>
                    <ul>
                        <li><strong>Celdas:</strong> Referencia por coordenadas (A1, B2, etc.)</li>
                        <li><strong>Datos:</strong> Números, texto, fórmulas</li>
                        <li><strong>Fórmulas:</strong> Comenzar con = para crear fórmulas</li>
                        <li><strong>Referencias:</strong> Usar referencias absolutas y relativas</li>
                    </ul>
                    
                    <h4>Tipos de Datos</h4>
                    <ul>
                        <li><strong>Números:</strong> 3.14, -5, 2/3</li>
                        <li><strong>Texto:</strong> "Hola", "Resultado"</li>
                        <li><strong>Coordenadas:</strong> (2, 3), (x, y)</li>
                        <li><strong>Fórmulas:</strong> =A1+B1, =SIN(A1)</li>
                        <li><strong>Objetos GeoGebra:</strong> Puntos, líneas, funciones</li>
                    </ul>
                    
                    <h4>Funciones Matemáticas</h4>
                    <ul>
                        <li><strong>Básicas:</strong> +, -, *, /, ^</li>
                        <li><strong>Trigonométricas:</strong> sin, cos, tan</li>
                        <li><strong>Logarítmicas:</strong> log, ln, log10</li>
                        <li><strong>Estadísticas:</strong> Mean, Median, StdDev</li>
                        <li><strong>Aleatorias:</strong> Random, RandomInt</li>
                    </ul>
                    
                    <div class="help-example">
                        <h5><i class="fas fa-chart-bar"></i> Ejemplo: Tabla de Valores</h5>
                        <p>Para crear una tabla de y = x²:</p>
                        <ul>
                            <li>A1: -2, A2: -1, A3: 0, A4: 1, A5: 2</li>
                            <li>B1: =A1^2, luego copiar hacia abajo</li>
                        </ul>
                    </div>
                    
                    <h4>Análisis de Datos</h4>
                    <ul>
                        <li><strong>Gráficos:</strong> Crear gráficos desde datos</li>
                        <li><strong>Estadísticas:</strong> Calcular media, mediana, desviación</li>
                        <li><strong>Regresión:</strong> Encontrar líneas de mejor ajuste</li>
                        <li><strong>Correlación:</strong> Analizar relaciones entre variables</li>
                    </ul>
                    
                    <h4>Integración con Otras Vistas</h4>
                    <ul>
                        <li><strong>Vista Gráfica:</strong> Los datos se pueden graficar automáticamente</li>
                        <li><strong>Vista Algebraica:</strong> Las fórmulas aparecen como objetos</li>
                        <li><strong>Actualización dinámica:</strong> Cambios en la hoja se reflejan en gráficos</li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-copy"></i> Copiar y Pegar</h5>
                        <p>Usa Ctrl+C y Ctrl+V para copiar fórmulas. Las referencias se ajustan automáticamente.</p>
                    </div>
                    
                    <h4>Herramientas Especiales</h4>
                    <ul>
                        <li><strong>Análisis de una variable:</strong> Herramientas estadísticas</li>
                        <li><strong>Análisis de dos variables:</strong> Correlación y regresión</li>
                        <li><strong>Gráficos estadísticos:</strong> Histogramas, box plots</li>
                        <li><strong>Simulaciones:</strong> Experimentos aleatorios</li>
                    </ul>
                    
                    <h4>Comandos Útiles</h4>
                    <ul>
                        <li><code>=Sum[A1:A10]</code> - Suma de un rango</li>
                        <li><code>=Mean[B1:B10]</code> - Media de un rango</li>
                        <li><code>=FitLine[list1, list2]</code> - Regresión lineal</li>
                        <li><code>=Histogram[data]</code> - Crear histograma</li>
                    </ul>
                </div>
            `,
            
            cas: `
                <div class="help-section active">
                    <h3><i class="fas fa-function"></i> Vista CAS (Computer Algebra System)</h3>
                    
                    <h4>Descripción</h4>
                    <p>La Vista CAS permite realizar cálculos simbólicos avanzados, resolver ecuaciones, derivar, integrar y manipular expresiones algebraicas.</p>
                    
                    <h4>Capacidades del CAS</h4>
                    <ul>
                        <li><strong>Cálculo simbólico:</strong> Trabajo con expresiones algebraicas</li>
                        <li><strong>Resolución de ecuaciones:</strong> Sistemas lineales y no lineales</li>
                        <li><strong>Cálculo diferencial:</strong> Derivadas de cualquier orden</li>
                        <li><strong>Cálculo integral:</strong> Integrales definidas e indefinidas</li>
                        <li><strong>Factorización:</strong> Factorizar polinomios</li>
                        <li><strong>Simplificación:</strong> Simplificar expresiones complejas</li>
                    </ul>
                    
                    <h4>Operaciones Básicas</h4>
                    <ul>
                        <li><strong>Aritmética:</strong> +, -, *, /, ^</li>
                        <li><strong>Factorización:</strong> <code>Factor[x^2 - 4]</code></li>
                        <li><strong>Expansión:</strong> <code>Expand[(x+1)^2]</code></li>
                        <li><strong>Simplificación:</strong> <code>Simplify[expression]</code></li>
                        <li><strong>Sustitución:</strong> <code>Substitute[expression, x, value]</code></li>
                    </ul>
                    
                    <h4>Resolución de Ecuaciones</h4>
                    <ul>
                        <li><strong>Ecuaciones lineales:</strong> <code>Solve[2x + 3 = 7, x]</code></li>
                        <li><strong>Ecuaciones cuadráticas:</strong> <code>Solve[x^2 - 5x + 6 = 0, x]</code></li>
                        <li><strong>Sistemas de ecuaciones:</strong> <code>Solve[{x + y = 3, x - y = 1}, {x, y}]</code></li>
                        <li><strong>Inecuaciones:</strong> <code>Solve[x^2 < 4, x]</code></li>
                    </ul>
                    
                    <div class="help-example">
                        <h5><i class="fas fa-calculator"></i> Ejemplo: Resolver Ecuación</h5>
                        <p>Para resolver x² - 5x + 6 = 0:</p>
                        <p><code>Solve[x² - 5x + 6 = 0, x]</code></p>
                        <p>Resultado: {x = 2, x = 3}</p>
                    </div>
                    
                    <h4>Cálculo Diferencial</h4>
                    <ul>
                        <li><strong>Primera derivada:</strong> <code>Derivative[f(x), x]</code></li>
                        <li><strong>Derivadas de orden superior:</strong> <code>Derivative[f(x), x, 2]</code></li>
                        <li><strong>Derivadas parciales:</strong> <code>Derivative[f(x,y), x]</code></li>
                        <li><strong>Regla de la cadena:</strong> Aplicada automáticamente</li>
                    </ul>
                    
                    <h4>Cálculo Integral</h4>
                    <ul>
                        <li><strong>Integral indefinida:</strong> <code>Integral[f(x), x]</code></li>
                        <li><strong>Integral definida:</strong> <code>Integral[f(x), x, a, b]</code></li>
                        <li><strong>Integrales múltiples:</strong> <code>Integral[f(x,y), x, y]</code></li>
                        <li><strong>Integración por partes:</strong> Aplicada automáticamente</li>
                    </ul>
                    
                    <h4>Límites y Series</h4>
                    <ul>
                        <li><strong>Límites:</strong> <code>Limit[f(x), x, a]</code></li>
                        <li><strong>Límites laterales:</strong> <code>LimitAbove[f(x), x, a]</code></li>
                        <li><strong>Series de Taylor:</strong> <code>TaylorSeries[f(x), x, a, n]</code></li>
                        <li><strong>Sumas infinitas:</strong> <code>Sum[expression, k, 1, ∞]</code></li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-magic"></i> Funciones Especiales</h5>
                        <p>El CAS incluye funciones especiales como Gamma, Bessel, funciones hiperbólicas, etc.</p>
                    </div>
                    
                    <h4>Álgebra Lineal</h4>
                    <ul>
                        <li><strong>Matrices:</strong> <code>{{1, 2}, {3, 4}}</code></li>
                        <li><strong>Determinante:</strong> <code>Determinant[matrix]</code></li>
                        <li><strong>Inversa:</strong> <code>Invert[matrix]</code></li>
                        <li><strong>Valores propios:</strong> <code>Eigenvalues[matrix]</code></li>
                        <li><strong>Vectores propios:</strong> <code>Eigenvectors[matrix]</code></li>
                    </ul>
                    
                    <h4>Comandos Avanzados</h4>
                    <ul>
                        <li><code>NSolve[equation, var]</code> - Solución numérica</li>
                        <li><code>Extremum[f(x), x]</code> - Encontrar extremos</li>
                        <li><code>InflectionPoint[f(x), x]</code> - Puntos de inflexión</li>
                        <li><code>ImplicitDerivative[equation, y, x]</code> - Derivación implícita</li>
                    </ul>
                    
                    <div class="help-warning">
                        <h5><i class="fas fa-exclamation-triangle"></i> Importante</h5>
                        <p>El CAS trabaja con precisión exacta. Para resultados decimales, usa el comando N[expression].</p>
                    </div>
                </div>
            `,
            
            avanzado: `
                <div class="help-section active">
                    <h3><i class="fas fa-cogs"></i> Funciones Avanzadas</h3>
                    
                    <h4>Personalización y Configuración</h4>
                    <ul>
                        <li><strong>Propiedades de objetos:</strong> Click derecho > Propiedades</li>
                        <li><strong>Estilos:</strong> Colores, grosor, transparencia</li>
                        <li><strong>Etiquetas:</strong> Mostrar/ocultar nombres y valores</li>
                        <li><strong>Capas:</strong> Organizar objetos en diferentes niveles</li>
                        <li><strong>Condiciones:</strong> Mostrar objetos bajo ciertas condiciones</li>
                    </ul>
                    
                    <h4>Scripts y Programación</h4>
                    <ul>
                        <li><strong>Scripts de objetos:</strong> Código que se ejecuta al interactuar</li>
                        <li><strong>Scripts globales:</strong> Código que se ejecuta globalmente</li>
                        <li><strong>Botones personalizados:</strong> Crear interfaces interactivas</li>
                        <li><strong>Campos de texto:</strong> Entrada de datos del usuario</li>
                        <li><strong>Casillas de verificación:</strong> Controles booleanos</li>
                    </ul>
                    
                    <h4>Herramientas Especiales</h4>
                    <ul>
                        <li><strong>Lugar geométrico:</strong> Trazar lugares geométricos</li>
                        <li><strong>Herramienta personalizada:</strong> Crear herramientas propias</li>
                        <li><strong>Construcción paso a paso:</strong> Protocolo de construcción</li>
                        <li><strong>Animación:</strong> Animar objetos automáticamente</li>
                        <li><strong>Exportación:</strong> Imágenes, videos, applets web</li>
                    </ul>
                    
                    <div class="help-example">
                        <h5><i class="fas fa-play-circle"></i> Ejemplo: Animación</h5>
                        <p>Para animar un punto sobre una circunferencia:</p>
                        <ol>
                            <li>Crear deslizador t</li>
                            <li>Crear punto A = (cos(t), sin(t))</li>
                            <li>Click derecho en t > Animar</li>
                        </ol>
                    </div>
                    
                    <h4>Análisis Estadístico</h4>
                    <ul>
                        <li><strong>Distribuciones:</strong> Normal, binomial, Poisson, etc.</li>
                        <li><strong>Pruebas de hipótesis:</strong> t-test, chi-cuadrado</li>
                        <li><strong>Intervalos de confianza:</strong> Para medias y proporciones</li>
                        <li><strong>Regresión:</strong> Lineal, polinomial, exponencial</li>
                        <li><strong>Análisis de varianza:</strong> ANOVA</li>
                    </ul>
                    
                    <h4>Geometría Avanzada</h4>
                    <ul>
                        <li><strong>Transformaciones:</strong> Isometrías y similitudes</li>
                        <li><strong>Inversión:</strong> Inversión respecto a círculos</li>
                        <li><strong>Geometría hiperbólica:</strong> Modelo de Poincaré</li>
                        <li><strong>Construcciones dinámicas:</strong> Teoremas geométricos</li>
                        <li><strong>Optimización:</strong> Máximos y mínimos geométricos</li>
                    </ul>
                    
                    <h4>Cálculo Numérico</h4>
                    <ul>
                        <li><strong>Integración numérica:</strong> Métodos de cuadratura</li>
                        <li><strong>Resolución numérica:</strong> Métodos iterativos</li>
                        <li><strong>Interpolación:</strong> Splines, polinomios</li>
                        <li><strong>Aproximación:</strong> Mínimos cuadrados</li>
                        <li><strong>Ecuaciones diferenciales:</strong> Métodos numéricos</li>
                    </ul>
                    
                    <div class="help-tip">
                        <h5><i class="fas fa-graduation-cap"></i> Recursos Educativos</h5>
                        <p>Explora GeoGebra Materials para encontrar miles de recursos educativos creados por la comunidad.</p>
                    </div>
                    
                    <h4>Exportación y Compartir</h4>
                    <ul>
                        <li><strong>Imágenes:</strong> PNG, SVG, PDF</li>
                        <li><strong>Animaciones:</strong> GIF animados</li>
                        <li><strong>Videos:</strong> MP4 de animaciones</li>
                        <li><strong>Applets web:</strong> HTML5 interactivos</li>
                        <li><strong>Código LaTeX:</strong> Para documentos académicos</li>
                    </ul>
                    
                    <h4>Atajos de Teclado Esenciales</h4>
                    <ul>
                        <li><span class="keyboard-shortcut">Ctrl+Z</span> - Deshacer</li>
                        <li><span class="keyboard-shortcut">Ctrl+Y</span> - Rehacer</li>
                        <li><span class="keyboard-shortcut">Ctrl+A</span> - Seleccionar todo</li>
                        <li><span class="keyboard-shortcut">Del</span> - Eliminar objeto seleccionado</li>
                        <li><span class="keyboard-shortcut">Ctrl+D</span> - Duplicar</li>
                        <li><span class="keyboard-shortcut">F1</span> - Ayuda</li>
                    </ul>
                    
                    <div class="help-warning">
                        <h5><i class="fas fa-lightbulb"></i> Consejo Final</h5>
                        <p>La mejor manera de aprender GeoGebra es experimentando. No tengas miedo de probar nuevas herramientas y explorar sus posibilidades.</p>
                    </div>
                </div>
            `
        };
        
        return contents[section] || contents.intro;
    },

    // Funciones específicas para Vista Algebraica
    openGeoGebraAlgebraicaModal: function() {
        this.createGeoGebraViewModal('algebraica', 'GeoGebra Vista Algebraica - Ampliada', 'https://www.geogebra.org/classic?lang=es&perspective=A');
    },

    openGeoGebraAlgebraicaHelpModal: function() {
        this.createGeoGebraViewHelpModal('algebraica', 'Ayuda - Vista Algebraica', this.getAlgebraicaHelpContent());
    },

    // Funciones específicas para Vista 3D
    openGeoGebra3DModal: function() {
        this.createGeoGebraViewModal('3d', 'GeoGebra Vista 3D - Ampliada', 'https://www.geogebra.org/3d?lang=es');
    },

    openGeoGebra3DHelpModal: function() {
        this.createGeoGebraViewHelpModal('3d', 'Ayuda - Vista 3D', this.get3DHelpContent());
    },

    // Funciones específicas para Vista Hoja de Cálculo
    openGeoGebraHojaModal: function() {
        this.createGeoGebraViewModal('hoja', 'GeoGebra Hoja de Cálculo - Ampliada', 'https://www.geogebra.org/classic?lang=es&perspective=S');
    },

    openGeoGebraHojaHelpModal: function() {
        this.createGeoGebraViewHelpModal('hoja', 'Ayuda - Hoja de Cálculo', this.getHojaHelpContent());
    },

    // Funciones específicas para Vista CAS
    openGeoGebraCASModal: function() {
        this.createGeoGebraViewModal('cas', 'GeoGebra Vista CAS - Ampliada', 'https://www.geogebra.org/classic?lang=es&perspective=C');
    },

    openGeoGebraCASHelpModal: function() {
        this.createGeoGebraViewHelpModal('cas', 'Ayuda - Vista CAS', this.getCASHelpContent());
    },

    // Función genérica para crear modales de vistas de GeoGebra
    createGeoGebraViewModal: function(viewType, title, url) {
        const modalId = `geogebra-${viewType}-modal`;
        
        // Verificar si ya existe el modal
        if (document.getElementById(modalId)) {
            document.getElementById(modalId).style.display = 'block';
            return;
        }

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'graph-modal';
        modal.innerHTML = `
            <div class="graph-modal-content">
                <div class="graph-modal-header">
                    <h2 class="graph-modal-title">${title}</h2>
                    <button class="graph-modal-close" onclick="Grapher.closeGeoGebraViewModal('${viewType}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="graph-modal-body">
                    <div class="graph-modal-plot" id="modal-geogebra-${viewType}-container"></div>
                    <div class="graph-modal-controls">
                        <button class="btn btn-info" onclick="Grapher.refreshGeoGebraView('${viewType}')">
                            <i class="fas fa-sync-alt"></i> Actualizar
                        </button>
                        <button class="btn btn-success" onclick="window.open('${url}', '_blank')">
                            <i class="fas fa-external-link-alt"></i> Abrir en Nueva Pestaña
                        </button>
                        <small class="text-muted ml-3">
                            Vista especializada de GeoGebra en pantalla completa
                        </small>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Eventos del modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                Grapher.closeGeoGebraViewModal(viewType);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                Grapher.closeGeoGebraViewModal(viewType);
            }
        });

        // Mostrar modal y cargar contenido
        modal.style.display = 'block';
        this.loadGeoGebraViewInModal(viewType, url);
    },

    // Cargar vista específica de GeoGebra en modal
    loadGeoGebraViewInModal: function(viewType, url) {
        const container = document.getElementById(`modal-geogebra-${viewType}-container`);
        
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
                <div>
                    <i class="fas fa-sync-alt fa-spin fa-3x text-primary mb-3"></i>
                    <h4>Cargando GeoGebra...</h4>
                    <p class="text-muted">Inicializando vista especializada</p>
                </div>
            </div>
        `;

        setTimeout(() => {
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.setAttribute('scrolling', 'no');
            iframe.setAttribute('allowfullscreen', 'true');
            
            container.innerHTML = '';
            container.appendChild(iframe);
            
            iframe.onerror = function() {
                container.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
                        <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                        <h4>Error al cargar GeoGebra</h4>
                        <p class="text-muted">Verifica tu conexión a internet</p>
                        <button class="btn btn-primary" onclick="Grapher.loadGeoGebraViewInModal('${viewType}', '${url}')">
                            <i class="fas fa-redo"></i> Reintentar
                        </button>
                    </div>
                `;
            };
        }, 100);
    },

    // Cerrar modal de vista específica
    closeGeoGebraViewModal: function(viewType) {
        const modal = document.getElementById(`geogebra-${viewType}-modal`);
        if (modal) {
            modal.style.display = 'none';
            const container = document.getElementById(`modal-geogebra-${viewType}-container`);
            if (container) {
                container.innerHTML = '';
            }
        }
    },

    // Actualizar vista específica
    refreshGeoGebraView: function(viewType) {
        const urlMap = {
            'algebraica': 'https://www.geogebra.org/classic?lang=es&perspective=A',
            '3d': 'https://www.geogebra.org/3d?lang=es',
            'hoja': 'https://www.geogebra.org/classic?lang=es&perspective=S',
            'cas': 'https://www.geogebra.org/classic?lang=es&perspective=C'
        };
        
        const container = document.getElementById(`modal-geogebra-${viewType}-container`);
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f8f9fa;">
                    <div>
                        <i class="fas fa-sync-alt fa-spin fa-3x text-primary mb-3"></i>
                        <h4>Actualizando...</h4>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                this.loadGeoGebraViewInModal(viewType, urlMap[viewType]);
            }, 1000);
        }
    },

    // Función genérica para crear modales de ayuda de vistas específicas
    createGeoGebraViewHelpModal: function(viewType, title, content) {
        const modalId = `geogebra-${viewType}-help-modal`;
        
        if (document.getElementById(modalId)) {
            document.getElementById(modalId).style.display = 'block';
            return;
        }

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'graph-modal';
        modal.innerHTML = `
            <div class="graph-modal-content">
                <div class="graph-modal-header">
                    <h2 class="graph-modal-title">
                        <i class="fas fa-question-circle"></i> ${title}
                    </h2>
                    <button class="graph-modal-close" onclick="Grapher.closeGeoGebraViewHelpModal('${viewType}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="graph-modal-body">
                    <div class="graph-modal-plot" id="modal-help-${viewType}-container">
                        <div class="help-content" style="padding: 20px; overflow-y: auto; max-height: 500px;">
                            ${content}
                        </div>
                    </div>
                    <div class="graph-modal-controls">
                        <button class="btn btn-success" onclick="window.open('https://help.geogebra.org/hc/es', '_blank')">
                            <i class="fas fa-book"></i> Documentación Oficial
                        </button>
                        <small class="text-muted ml-3">
                            Guía específica para esta vista de GeoGebra
                        </small>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Aplicar estilos si no existen
        this.addHelpModalStyles();

        // Eventos del modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                Grapher.closeGeoGebraViewHelpModal(viewType);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                Grapher.closeGeoGebraViewHelpModal(viewType);
            }
        });

        modal.style.display = 'block';
    },

    // Cerrar modal de ayuda de vista específica
    closeGeoGebraViewHelpModal: function(viewType) {
        const modal = document.getElementById(`geogebra-${viewType}-help-modal`);
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Contenido de ayuda específico para Vista Algebraica
    getAlgebraicaHelpContent: function() {
        return `
            <h3><i class="fas fa-calculator"></i> Guía Avanzada: Vista Algebraica</h3>
            
            <h4>🎯 Objetivos de Aprendizaje</h4>
            <ul>
                <li>Dominar la entrada directa de objetos matemáticos</li>
                <li>Comprender la conexión entre álgebra y geometría</li>
                <li>Utilizar comandos para análisis matemático avanzado</li>
                <li>Crear construcciones dinámicas mediante ecuaciones</li>
            </ul>

            <h4>📋 Comandos Fundamentales con Ejemplos</h4>
            
            <div class="help-example">
                <h5>1. Creación de Objetos Básicos</h5>
                <ul>
                    <li><strong>Puntos:</strong> <code>A = (2, 3)</code> → Crea punto A en coordenadas (2,3)</li>
                    <li><strong>Vectores:</strong> <code>v = (3, 4)</code> → Vector desde origen</li>
                    <li><strong>Líneas:</strong> <code>f: 2x + 3y = 6</code> → Recta en forma general</li>
                    <li><strong>Funciones:</strong> <code>g(x) = x^2 - 4x + 3</code> → Función cuadrática</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>2. Análisis de Intersecciones</h5>
                <ul>
                    <li><code>Intersect[f, g]</code> → Encuentra intersecciones entre f y g</li>
                    <li><code>Intersect[y = x^2, y = 2x + 1]</code> → Intersección parábola-recta</li>
                    <li><code>Solve[x^2 = 2x + 1, x]</code> → Resolver algebraicamente</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>3. Transformaciones Dinámicas</h5>
                <ul>
                    <li><code>a = 2</code> (crea deslizador automáticamente)</li>
                    <li><code>h(x) = a*x^2</code> → Función que depende del parámetro a</li>
                    <li><code>Translate[A, (a, 0)]</code> → Traslación dependiente del parámetro</li>
                </ul>
            </div>

            <h4>🔧 Técnicas Avanzadas de Socialización</h4>
            
            <div class="help-tip">
                <h5>Metodología de Exploración Guiada</h5>
                <ol>
                    <li><strong>Plantear pregunta:</strong> "¿Qué pasa si cambio el parámetro a?"</li>
                    <li><strong>Crear modelo:</strong> <code>f(x) = a*x^2 + b*x + c</code></li>
                    <li><strong>Experimentar:</strong> Mover deslizadores y observar cambios</li>
                    <li><strong>Analizar:</strong> Usar comandos como <code>Vertex[f]</code>, <code>Axis[f]</code></li>
                    <li><strong>Generalizar:</strong> Crear reglas y patrones</li>
                </ol>
            </div>

            <h4>📊 Comandos de Análisis Matemático</h4>
            
            <div class="help-example">
                <h5>Análisis de Funciones</h5>
                <ul>
                    <li><code>Derivative[f]</code> → Función derivada</li>
                    <li><code>Integral[f, 0, 2]</code> → Integral definida</li>
                    <li><code>Extremum[f]</code> → Puntos críticos</li>
                    <li><code>Root[f]</code> → Ceros de la función</li>
                    <li><code>TurningPoint[f]</code> → Puntos de inflexión</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>Geometría Analítica</h5>
                <ul>
                    <li><code>Distance[A, B]</code> → Distancia entre puntos</li>
                    <li><code>Midpoint[A, B]</code> → Punto medio</li>
                    <li><code>Circle[A, 3]</code> → Círculo con centro A y radio 3</li>
                    <li><code>Tangent[A, circle]</code> → Tangentes desde punto A</li>
                    <li><code>Perpendicular[A, line]</code> → Perpendicular desde A</li>
                </ul>
            </div>

            <h4>🎓 Actividades Didácticas Paso a Paso</h4>
            
            <div class="help-example">
                <h5>Proyecto 1: Familia de Parábolas</h5>
                <ol>
                    <li>Crear deslizador: <code>a = 1</code></li>
                    <li>Definir función: <code>f(x) = a*x^2</code></li>
                    <li>Encontrar vértice: <code>V = Vertex[f]</code></li>
                    <li>Crear eje de simetría: <code>axis = Line[V, (0,1)]</code></li>
                    <li>Analizar: ¿Cómo afecta 'a' a la forma de la parábola?</li>
                </ol>
            </div>

            <div class="help-example">
                <h5>Proyecto 2: Sistema de Ecuaciones Dinámico</h5>
                <ol>
                    <li>Crear parámetros: <code>m = 2</code>, <code>b = 1</code></li>
                    <li>Línea 1: <code>L1: y = m*x + b</code></li>
                    <li>Línea 2: <code>L2: y = -x + 3</code></li>
                    <li>Intersección: <code>I = Intersect[L1, L2]</code></li>
                    <li>Explorar: ¿Cuándo son paralelas? ¿Cuándo perpendiculares?</li>
                </ol>
            </div>

            <h4>💡 Consejos para Maximizar el Aprendizaje</h4>
            
            <div class="help-tip">
                <h5>Estrategias de Enseñanza</h5>
                <ul>
                    <li><strong>Comenzar simple:</strong> Puntos → Líneas → Curvas → Transformaciones</li>
                    <li><strong>Conectar vistas:</strong> Mostrar cómo cambia la gráfica al modificar la ecuación</li>
                    <li><strong>Usar preguntas guía:</strong> "¿Qué observas?", "¿Qué patrones ves?"</li>
                    <li><strong>Fomentar experimentación:</strong> "Prueba cambiar este valor"</li>
                    <li><strong>Verificar algebraicamente:</strong> Confirmar resultados gráficos con cálculos</li>
                </ul>
            </div>

            <h4>🔍 Comandos Específicos por Tema</h4>
            
            <div class="help-example">
                <h5>Cálculo</h5>
                <ul>
                    <li><code>Limit[sin(x)/x, x, 0]</code> → Límites</li>
                    <li><code>Derivative[x^3, x, 2]</code> → Derivada segunda</li>
                    <li><code>TaylorSeries[e^x, x, 0, 4]</code> → Serie de Taylor</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>Estadística</h5>
                <ul>
                    <li><code>lista = {1, 2, 3, 4, 5}</code> → Crear lista</li>
                    <li><code>Mean[lista]</code> → Media</li>
                    <li><code>StandardDeviation[lista]</code> → Desviación estándar</li>
                    <li><code>FitLine[puntos]</code> → Regresión lineal</li>
                </ul>
            </div>

            <div class="help-warning">
                <h5>⚠️ Errores Comunes a Evitar</h5>
                <ul>
                    <li>No usar paréntesis en operaciones complejas</li>
                    <li>Confundir funciones f(x) con ecuaciones y = f(x)</li>
                    <li>No aprovechar los deslizadores para exploración</li>
                    <li>Olvidar que los objetos son dinámicos e interconectados</li>
                </ul>
            </div>
        `;
    },

    // Contenido de ayuda específico para Vista 3D
    get3DHelpContent: function() {
        return `
            <h3><i class="fas fa-cube"></i> Guía Avanzada: Vista Gráfica 3D</h3>
            
            <h4>🎯 Objetivos de Aprendizaje Espacial</h4>
            <ul>
                <li>Desarrollar visualización espacial tridimensional</li>
                <li>Comprender geometría analítica en 3D</li>
                <li>Modelar superficies y sólidos matemáticamente</li>
                <li>Aplicar transformaciones geométricas en el espacio</li>
            </ul>

            <h4>🧭 Navegación y Controles Avanzados</h4>
            
            <div class="help-example">
                <h5>Técnicas de Navegación</h5>
                <ul>
                    <li><strong>Rotación libre:</strong> Clic izquierdo + arrastrar</li>
                    <li><strong>Zoom preciso:</strong> Rueda del mouse o Ctrl + Shift + arrastrar vertical</li>
                    <li><strong>Traslación:</strong> Shift + arrastrar</li>
                    <li><strong>Vistas predefinidas:</strong> Ctrl+1 (frontal), Ctrl+2 (lateral), Ctrl+3 (superior)</li>
                    <li><strong>Rotación en ejes:</strong> Ctrl + arrastrar para rotación restringida</li>
                </ul>
            </div>

            <h4>📐 Construcciones Básicas 3D</h4>
            
            <div class="help-example">
                <h5>1. Objetos Fundamentales</h5>
                <ul>
                    <li><strong>Puntos:</strong> <code>A = (2, 3, 1)</code> → Punto en coordenadas 3D</li>
                    <li><strong>Vectores:</strong> <code>v = (1, 2, 3)</code> → Vector desde origen</li>
                    <li><strong>Rectas:</strong> <code>Line[A, v]</code> → Recta por A con dirección v</li>
                    <li><strong>Planos:</strong> <code>Plane[A, B, C]</code> → Plano por tres puntos</li>
                    <li><strong>Segmentos:</strong> <code>Segment[A, B]</code> → Segmento AB</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>2. Superficies Matemáticas</h5>
                <ul>
                    <li><strong>Esfera:</strong> <code>x² + y² + z² = 25</code></li>
                    <li><strong>Paraboloide:</strong> <code>z = x² + y²</code></li>
                    <li><strong>Cilindro:</strong> <code>x² + y² = 9</code></li>
                    <li><strong>Cono:</strong> <code>z² = x² + y²</code></li>
                    <li><strong>Plano:</strong> <code>2x + 3y - z = 6</code></li>
                </ul>
            </div>

            <h4>🎨 Superficies Paramétricas Avanzadas</h4>
            
            <div class="help-example">
                <h5>Definición de Superficies Paramétricas</h5>
                <ul>
                    <li><code>Surface[u, v, u²+v², u, -2, 2, v, -2, 2]</code> → Paraboloide paramétrico</li>
                    <li><code>Surface[cos(u)*cos(v), cos(u)*sin(v), sin(u), u, -π/2, π/2, v, 0, 2π]</code> → Esfera</li>
                    <li><code>Surface[u, v*cos(u), v*sin(u), u, 0, 4, v, 0, 3]</code> → Helicoide</li>
                </ul>
            </div>

            <h4>🏗️ Construcción de Sólidos Geométricos</h4>
            
            <div class="help-example">
                <h5>Sólidos desde Polígonos Base</h5>
                <ol>
                    <li><strong>Crear base:</strong> <code>poly = Polygon[(0,0,0), (2,0,0), (1,2,0)]</code></li>
                    <li><strong>Prisma:</strong> <code>Prism[poly, (0,0,3)]</code></li>
                    <li><strong>Pirámide:</strong> <code>Pyramid[poly, (1,1,4)]</code></li>
                    <li><strong>Volumen:</strong> <code>Volume[Prism]</code></li>
                    <li><strong>Área:</strong> <code>Surface[Prism]</code></li>
                </ol>
            </div>

            <h4>🌊 Curvas Espaciales y Trayectorias</h4>
            
            <div class="help-example">
                <h5>Curvas Paramétricas en 3D</h5>
                <ul>
                    <li><strong>Hélice circular:</strong> <code>Curve[cos(t), sin(t), t/5, t, 0, 6π]</code></li>
                    <li><strong>Espiral cónica:</strong> <code>Curve[t*cos(t), t*sin(t), t, t, 0, 10]</code></li>
                    <li><strong>Curva de Viviani:</strong> <code>Curve[cos(t)², cos(t)*sin(t), sin(t), t, 0, 2π]</code></li>
                    <li><strong>Longitud:</strong> <code>Length[curve, 0, 2π]</code></li>
                </ul>
            </div>

            <h4>🔄 Transformaciones Geométricas 3D</h4>
            
            <div class="help-example">
                <h5>Transformaciones Básicas</h5>
                <ul>
                    <li><strong>Traslación:</strong> <code>Translate[object, (2, 1, 3)]</code></li>
                    <li><strong>Rotación X:</strong> <code>Rotate[object, π/4, xAxis]</code></li>
                    <li><strong>Rotación Y:</strong> <code>Rotate[object, π/3, yAxis]</code></li>
                    <li><strong>Rotación Z:</strong> <code>Rotate[object, π/6, zAxis]</code></li>
                    <li><strong>Escalado:</strong> <code>Dilate[object, 2, origin]</code></li>
                </ul>
            </div>

            <h4>📊 Análisis Vectorial y Campos</h4>
            
            <div class="help-example">
                <h5>Operaciones Vectoriales</h5>
                <ul>
                    <li><strong>Producto escalar:</strong> <code>u * v</code></li>
                    <li><strong>Producto vectorial:</strong> <code>u ⊗ v</code></li>
                    <li><strong>Magnitud:</strong> <code>Length[v]</code></li>
                    <li><strong>Vector unitario:</strong> <code>UnitVector[v]</code></li>
                    <li><strong>Ángulo entre vectores:</strong> <code>Angle[u, v]</code></li>
                </ul>
            </div>

            <h4>🎓 Proyectos Educativos Estructurados</h4>
            
            <div class="help-example">
                <h5>Proyecto 1: Sistema Solar Simplificado</h5>
                <ol>
                    <li>Sol: <code>Sol = Sphere[(0,0,0), 0.5]</code></li>
                    <li>Órbita Tierra: <code>t = 0</code> (deslizador 0 a 2π)</li>
                    <li>Tierra: <code>Tierra = Sphere[(3*cos(t), 3*sin(t), 0), 0.2]</code></li>
                    <li>Luna: <code>Luna = Sphere[(3*cos(t) + cos(8t), 3*sin(t) + sin(8t), 0), 0.1]</code></li>
                    <li>Animar t para ver el movimiento orbital</li>
                </ol>
            </div>

            <div class="help-example">
                <h5>Proyecto 2: Arquitectura de Poliedros</h5>
                <ol>
                    <li>Crear vértices del tetraedro: A, B, C, D</li>
                    <li>Caras: <code>Face1 = Polygon[A,B,C]</code>, etc.</li>
                    <li>Tetraedro: <code>Polyhedron[A,B,C,D]</code></li>
                    <li>Análisis: volumen, área, ángulos diedros</li>
                    <li>Transformar a otros poliedros regulares</li>
                </ol>
            </div>

            <h4>🔬 Aplicaciones del Cálculo Multivariable</h4>
            
            <div class="help-example">
                <h5>Derivadas Parciales y Gradientes</h5>
                <ul>
                    <li><code>f(x,y) = x² + y²</code> → Función de dos variables</li>
                    <li><code>fx = Derivative[f, x]</code> → Derivada parcial respecto a x</li>
                    <li><code>fy = Derivative[f, y]</code> → Derivada parcial respecto a y</li>
                    <li><code>grad = (fx, fy, 0)</code> → Vector gradiente</li>
                    <li>Visualizar campo vectorial del gradiente</li>
                </ul>
            </div>

            <h4>⚙️ Configuraciones Avanzadas de Visualización</h4>
            
            <div class="help-tip">
                <h5>Optimización de la Vista 3D</h5>
                <ul>
                    <li><strong>Iluminación:</strong> Ajustar para mejor percepción de profundidad</li>
                    <li><strong>Transparencia:</strong> Ver objetos internos de sólidos</li>
                    <li><strong>Malla/Wireframe:</strong> Alternar entre superficie sólida y esqueleto</li>
                    <li><strong>Proyecciones:</strong> Ortogonal vs perspectiva</li>
                    <li><strong>Planos de corte:</strong> Mostrar/ocultar planos xy, xz, yz</li>
                </ul>
            </div>

            <div class="help-warning">
                <h5>⚠️ Desafíos Comunes en 3D</h5>
                <ul>
                    <li><strong>Orientación espacial:</strong> Usar múltiples vistas para confirmación</li>
                    <li><strong>Oclusión:</strong> Objetos que se ocultan entre sí</li>
                    <li><strong>Profundidad:</strong> Usar sombras y perspectiva</li>
                    <li><strong>Precisión:</strong> Coordenadas exactas vs aproximaciones visuales</li>
                </ul>
            </div>
        `;
    },

    // Contenido de ayuda específico para Vista Hoja de Cálculo
    getHojaHelpContent: function() {
        return `
            <h3><i class="fas fa-table"></i> Guía Avanzada: Vista Hoja de Cálculo</h3>
            
            <h4>🎯 Objetivos de Aprendizaje de Datos</h4>
            <ul>
                <li>Dominar el análisis estadístico de datos reales</li>
                <li>Crear visualizaciones efectivas y profesionales</li>
                <li>Desarrollar modelos matemáticos basados en datos</li>
                <li>Integrar análisis numérico con representación gráfica</li>
            </ul>

            <h4>📊 Estructura y Organización de Datos</h4>
            
            <div class="help-example">
                <h5>Mejores Prácticas de Organización</h5>
                <ul>
                    <li><strong>Fila 1:</strong> Siempre usar para encabezados descriptivos</li>
                    <li><strong>Columnas consistentes:</strong> Un tipo de dato por columna</li>
                    <li><strong>Sin celdas vacías:</strong> Usar 0 o "N/A" según corresponda</li>
                    <li><strong>Formato uniforme:</strong> Decimales, fechas, unidades consistentes</li>
                    <li><strong>Rangos nombrados:</strong> <code>datos_temp = A2:A101</code></li>
                </ul>
            </div>

            <h4>🧮 Funciones Matemáticas Avanzadas</h4>
            
            <div class="help-example">
                <h5>1. Estadística Descriptiva</h5>
                <ul>
                    <li><code>=Mean[A2:A100]</code> → Media aritmética</li>
                    <li><code>=Median[A2:A100]</code> → Mediana</li>
                    <li><code>=Q1[A2:A100]</code> → Primer cuartil</li>
                    <li><code>=Q3[A2:A100]</code> → Tercer cuartil</li>
                    <li><code>=StandardDeviation[A2:A100]</code> → Desviación estándar</li>
                    <li><code>=Variance[A2:A100]</code> → Varianza</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>2. Análisis de Correlación</h5>
                <ul>
                    <li><code>=CorrelationCoefficient[A2:A100, B2:B100]</code> → Coeficiente r</li>
                    <li><code>=Covariance[lista1, lista2]</code> → Covarianza</li>
                    <li><code>=PMCC[x_data, y_data]</code> → Correlación de Pearson</li>
                    <li><code>=SpearmanCorrelation[ranks1, ranks2]</code> → Correlación de Spearman</li>
                </ul>
            </div>

            <h4>📈 Modelos de Regresión Avanzados</h4>
            
            <div class="help-example">
                <h5>Tipos de Regresión Disponibles</h5>
                <ul>
                    <li><strong>Lineal:</strong> <code>=FitLine[puntos]</code></li>
                    <li><strong>Cuadrática:</strong> <code>=FitPoly[puntos, 2]</code></li>
                    <li><strong>Cúbica:</strong> <code>=FitPoly[puntos, 3]</code></li>
                    <li><strong>Exponencial:</strong> <code>=FitExp[puntos]</code></li>
                    <li><strong>Logarítmica:</strong> <code>=FitLog[puntos]</code></li>
                    <li><strong>Potencial:</strong> <code>=FitPow[puntos]</code></li>
                    <li><strong>Senoidal:</strong> <code>=FitSin[puntos]</code></li>
                </ul>
            </div>

            <h4>🎲 Simulación y Probabilidad</h4>
            
            <div class="help-example">
                <h5>Generación de Datos Aleatorios</h5>
                <ul>
                    <li><code>=Random[]</code> → Número aleatorio [0,1]</li>
                    <li><code>=RandomBetween[1, 100]</code> → Entero aleatorio</li>
                    <li><code>=RandomNormal[50, 10]</code> → Distribución normal</li>
                    <li><code>=RandomBinomial[20, 0.3]</code> → Distribución binomial</li>
                    <li><code>=RandomPoisson[5]</code> → Distribución de Poisson</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>Análisis de Distribuciones</h5>
                <ul>
                    <li><code>=Normal[μ, σ, x]</code> → Densidad normal en x</li>
                    <li><code>=Normal[μ, σ, x, true]</code> → Probabilidad acumulada</li>
                    <li><code>=InverseNormal[μ, σ, p]</code> → Quantil normal</li>
                    <li><code>=TTest[muestra, μ₀]</code> → Prueba t de Student</li>
                    <li><code>=ChiSquaredTest[observados, esperados]</code> → Prueba χ²</li>
                </ul>
            </div>

            <h4>📊 Visualización de Datos Profesional</h4>
            
            <div class="help-example">
                <h5>Tipos de Gráficos Especializados</h5>
                <ul>
                    <li><strong>Histograma:</strong> <code>=Histogram[datos, clases]</code></li>
                    <li><strong>Diagrama de caja:</strong> <code>=BoxPlot[datos]</code></li>
                    <li><strong>Gráfico Q-Q:</strong> <code>=QQPlot[muestra, distribución]</code></li>
                    <li><strong>Gráfico de dispersión:</strong> Automático al seleccionar dos columnas</li>
                    <li><strong>Series temporales:</strong> Con fechas en eje X</li>
                </ul>
            </div>

            <h4>🏭 Proyectos de Análisis de Datos Reales</h4>
            
            <div class="help-example">
                <h5>Proyecto 1: Análisis de Ventas Mensuales</h5>
                <ol>
                    <li><strong>Datos:</strong> Columna A (Mes), Columna B (Ventas)</li>
                    <li><strong>Estadísticas:</strong> Media, mediana, desviación en C1:C3</li>
                    <li><strong>Tendencia:</strong> <code>=FitLine[A2:A13, B2:B13]</code></li>
                    <li><strong>Predicción:</strong> Evaluar función en meses futuros</li>
                    <li><strong>Visualización:</strong> Gráfico de líneas con tendencia</li>
                    <li><strong>Interpretación:</strong> ¿Crecimiento, decrecimiento, estacional?</li>
                </ol>
            </div>

            <div class="help-example">
                <h5>Proyecto 2: Experimento de Física - Caída Libre</h5>
                <ol>
                    <li><strong>Variables:</strong> Tiempo (A), Altura (B)</li>
                    <li><strong>Modelo teórico:</strong> h = h₀ - ½gt²</li>
                    <li><strong>Regresión:</strong> <code>=FitPoly[tiempo, altura, 2]</code></li>
                    <li><strong>Parámetros:</strong> Extraer h₀ y g de la ecuación</li>
                    <li><strong>Análisis de errores:</strong> Residuales y R²</li>
                    <li><strong>Comparación:</strong> ¿Coincide g con 9.81 m/s²?</li>
                </ol>
            </div>

            <h4>🔍 Análisis de Sensibilidad y Optimización</h4>
            
            <div class="help-example">
                <h5>Análisis "What-If" Avanzado</h5>
                <ul>
                    <li><strong>Tablas de datos:</strong> Variar parámetros sistemáticamente</li>
                    <li><strong>Escenarios:</strong> Mejor caso, peor caso, caso esperado</li>
                    <li><strong>Solver básico:</strong> Encontrar valores óptimos</li>
                    <li><strong>Análisis de break-even:</strong> Punto de equilibrio</li>
                </ul>
            </div>

            <h4>⚡ Automatización con Fórmulas Avanzadas</h4>
            
            <div class="help-example">
                <h5>Fórmulas Condicionales y Lógicas</h5>
                <ul>
                    <li><code>=If[condición, valor_verdadero, valor_falso]</code></li>
                    <li><code>=CountIf[rango, criterio]</code> → Contar con condición</li>
                    <li><code>=SumIf[rango, criterio, suma_rango]</code> → Suma condicional</li>
                    <li><code>=Unique[lista]</code> → Valores únicos</li>
                    <li><code>=Sort[lista]</code> → Ordenar datos</li>
                </ul>
            </div>

            <h4>🔗 Integración con Otras Vistas</h4>
            
            <div class="help-tip">
                <h5>Flujo de Trabajo Integrado</h5>
                <ol>
                    <li><strong>Hoja de Cálculo:</strong> Organizar y analizar datos</li>
                    <li><strong>Vista Gráfica:</strong> Visualizar patrones y tendencias</li>
                    <li><strong>Vista Algebraica:</strong> Ver ecuaciones de regresión</li>
                    <li><strong>Vista CAS:</strong> Análisis simbólico de modelos</li>
                    <li><strong>Exportación:</strong> Informes y presentaciones</li>
                </ol>
            </div>

            <h4>📋 Lista de Verificación para Análisis Completo</h4>
            
            <div class="help-tip">
                <h5>Metodología de Análisis Sistemático</h5>
                <ul>
                    <li>☑️ <strong>Exploración inicial:</strong> Gráfico de dispersión, estadísticas básicas</li>
                    <li>☑️ <strong>Detección de outliers:</strong> Diagrama de caja, regla 3σ</li>
                    <li>☑️ <strong>Normalidad:</strong> Histograma, gráfico Q-Q</li>
                    <li>☑️ <strong>Correlación:</strong> Coeficiente r, significancia</li>
                    <li>☑️ <strong>Modelo:</strong> Selección del mejor ajuste (R²)</li>
                    <li>☑️ <strong>Validación:</strong> Análisis de residuales</li>
                    <li>☑️ <strong>Interpretación:</strong> Significado práctico</li>
                    <li>☑️ <strong>Predicción:</strong> Intervalos de confianza</li>
                </ul>
            </div>

            <div class="help-warning">
                <h5>⚠️ Errores Estadísticos Comunes</h5>
                <ul>
                    <li><strong>Correlación ≠ Causación:</strong> No confundir relación con causa</li>
                    <li><strong>Extrapolación peligrosa:</strong> No predecir fuera del rango de datos</li>
                    <li><strong>Selección de modelo:</strong> No siempre el R² más alto es mejor</li>
                    <li><strong>Tamaño de muestra:</strong> Verificar significancia estadística</li>
                    <li><strong>Outliers influyentes:</strong> Analizar su impacto en el modelo</li>
                </ul>
            </div>
        `;
    },

    // Contenido de ayuda específico para Vista CAS
    getCASHelpContent: function() {
        return `
            <h3><i class="fas fa-function"></i> Guía Avanzada: Vista CAS (Computer Algebra System)</h3>
            
            <h4>🎯 Objetivos de Dominio del CAS</h4>
            <ul>
                <li>Realizar cálculos simbólicos de alta precisión</li>
                <li>Resolver sistemas de ecuaciones complejos</li>
                <li>Dominar el cálculo diferencial e integral simbólico</li>
                <li>Aplicar álgebra computacional a problemas reales</li>
            </ul>

            <h4>🧮 Fundamentos del Cálculo Simbólico</h4>
            
            <div class="help-example">
                <h5>1. Manipulación de Expresiones</h5>
                <ul>
                    <li><code>Expand[(x+2)³]</code> → x³ + 6x² + 12x + 8</li>
                    <li><code>Factor[x⁴ - 16]</code> → (x² - 4)(x² + 4) = (x-2)(x+2)(x²+4)</li>
                    <li><code>Simplify[sin²(x) + cos²(x)]</code> → 1</li>
                    <li><code>PartialFractions[1/(x²-1), x]</code> → -1/(2(x-1)) + 1/(2(x+1))</li>
                    <li><code>Collect[x³ + 2x²y + xy² + 2y³, x]</code> → Agrupar por potencias de x</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>2. Sustitución y Evaluación</h5>
                <ul>
                    <li><code>Substitute[x² + 3x + 2, x, 5]</code> → 42</li>
                    <li><code>Substitute[sin(2x), x, π/4]</code> → sin(π/2) = 1</li>
                    <li><code>expr := x² + y²</code> → Definir expresión</li>
                    <li><code>Substitute[expr, {x→3, y→4}]</code> → 25</li>
                </ul>
            </div>

            <h4>⚡ Resolución Avanzada de Ecuaciones</h4>
            
            <div class="help-example">
                <h5>Ecuaciones Polinomiales</h5>
                <ul>
                    <li><code>Solve[x⁴ - 5x² + 4 = 0, x]</code> → {±1, ±2}</li>
                    <li><code>Solve[x³ - 6x² + 11x - 6 = 0, x]</code> → {1, 2, 3}</li>
                    <li><code>NSolve[x⁵ - x - 1 = 0, x]</code> → Solución numérica</li>
                    <li><code>Solutions[x³ = 8, x]</code> → Todas las soluciones complejas</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>Sistemas de Ecuaciones</h5>
                <ul>
                    <li><code>Solve[{x + y = 5, 2x - y = 1}, {x, y}]</code> → {x=2, y=3}</li>
                    <li><code>Solve[{x² + y² = 25, x + y = 7}, {x, y}]</code> → Sistema no lineal</li>
                    <li><code>Eliminate[{x + y = a, x - y = b}, {x, y}]</code> → Eliminación de variables</li>
                </ul>
            </div>

            <h4>📊 Cálculo Diferencial Simbólico</h4>
            
            <div class="help-example">
                <h5>Derivadas Univariadas</h5>
                <ul>
                    <li><code>Derivative[x³ sin(x), x]</code> → 3x²sin(x) + x³cos(x)</li>
                    <li><code>Derivative[e^(x²), x]</code> → 2xe^(x²)</li>
                    <li><code>Derivative[ln(cos(x)), x]</code> → -tan(x)</li>
                    <li><code>Derivative[f(x), x, 3]</code> → Tercera derivada</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>Derivadas Multivariadas</h5>
                <ul>
                    <li><code>Derivative[x²y + xy², x]</code> → 2xy + y²</li>
                    <li><code>Derivative[sin(xy), y]</code> → x·cos(xy)</li>
                    <li><code>Derivative[f(x,y), x, y]</code> → Derivada mixta ∂²f/∂x∂y</li>
                    <li><code>ImplicitDerivative[x² + y² = 25, y, x]</code> → dy/dx = -x/y</li>
                </ul>
            </div>

            <h4>∫ Cálculo Integral Avanzado</h4>
            
            <div class="help-example">
                <h5>Integrales Indefinidas</h5>
                <ul>
                    <li><code>Integral[x² e^x, x]</code> → (x² - 2x + 2)e^x</li>
                    <li><code>Integral[sin(x)cos(x), x]</code> → -cos²(x)/2</li>
                    <li><code>Integral[1/(x² + 1), x]</code> → arctan(x)</li>
                    <li><code>Integral[1/√(a² - x²), x]</code> → arcsin(x/a)</li>
                </ul>
            </div>

            <div class="help-example">
                <h5>Integrales Definidas</h5>
                <ul>
                    <li><code>Integral[x², x, 0, 2]</code> → 8/3</li>
                    <li><code>Integral[e^(-x²), x, -∞, ∞]</code> → √π</li>
                    <li><code>Integral[sin(x), x, 0, π]</code> → 2</li>
                    <li><code>Integral[1/x, x, 1, e]</code> → 1</li>
                </ul>
            </div>

            <h4>🌊 Límites y Análisis Asintótico</h4>
            
            <div class="help-example">
                <h5>Límites Especiales</h5>
                <ul>
                    <li><code>Limit[sin(x)/x, x, 0]</code> → 1</li>
                    <li><code>Limit[(1 + 1/x)^x, x, ∞]</code> → e</li>
                    <li><code>Limit[(e^x - 1)/x, x, 0]</code> → 1</li>
                    <li><code>LimitAbove[1/x, x, 0]</code> → +∞</li>
                    <li><code>LimitBelow[1/x, x, 0]</code> → -∞</li>
                </ul>
            </div>

            <h4>📈 Series y Desarrollos</h4>
            
            <div class="help-example">
                <h5>Series de Taylor y Maclaurin</h5>
                <ul>
                    <li><code>TaylorSeries[e^x, x, 0, 5]</code> → 1 + x + x²/2! + x³/3! + ...</li>
                    <li><code>TaylorSeries[sin(x), x, 0, 7]</code> → x - x³/3! + x⁵/5! - ...</li>
                    <li><code>TaylorSeries[ln(1+x), x, 0, 4]</code> → x - x²/2 + x³/3 - x⁴/4</li>
                    <li><code>TaylorSeries[cos(x), x, π/2, 3]</code> → Serie alrededor de π/2</li>
                </ul>
            </div>

            <h4>🔢 Álgebra Lineal Simbólica</h4>
            
            <div class="help-example">
                <h5>Operaciones con Matrices</h5>
                <ul>
                    <li><code>A := {{a, b}, {c, d}}</code> → Matriz simbólica 2×2</li>
                    <li><code>Determinant[A]</code> → ad - bc</li>
                    <li><code>Invert[A]</code> → 1/(ad-bc) × {{d, -b}, {-c, a}}</li>
                    <li><code>Eigenvalues[A]</code> → Valores propios simbólicos</li>
                    <li><code>Transpose[A]</code> → A^T</li>
                </ul>
            </div>

            <h4>🎓 Proyectos Matemáticos Avanzados</h4>
            
            <div class="help-example">
                <h5>Proyecto 1: Análisis Completo de Función</h5>
                <ol>
                    <li><strong>Función:</strong> <code>f(x) := (x³ - 3x² + 2x)/(x² - 1)</code></li>
                    <li><strong>Dominio:</strong> <code>Solve[x² - 1 ≠ 0, x]</code></li>
                    <li><strong>Simplificación:</strong> <code>Simplify[f(x)]</code></li>
                    <li><strong>Derivada:</strong> <code>f'(x) := Derivative[f(x), x]</code></li>
                    <li><strong>Puntos críticos:</strong> <code>Solve[f'(x) = 0, x]</code></li>
                    <li><strong>Segunda derivada:</strong> <code>f''(x) := Derivative[f'(x), x]</code></li>
                    <li><strong>Concavidad:</strong> Analizar signo de f''(x)</li>
                    <li><strong>Límites:</strong> <code>Limit[f(x), x, ±∞]</code></li>
                    <li><strong>Asíntotas:</strong> <code>Asymptotes[f(x)]</code></li>
                </ol>
            </div>

            <div class="help-example">
                <h5>Proyecto 2: Ecuaciones Diferenciales</h5>
                <ol>
                    <li><strong>Ecuación:</strong> dy/dx = ky (crecimiento exponencial)</li>
                    <li><strong>Resolver:</strong> <code>DSolve[y' = k*y, y, x]</code></li>
                    <li><strong>Solución general:</strong> y = C·e^(kx)</li>
                    <li><strong>Condición inicial:</strong> y(0) = y₀</li>
                    <li><strong>Solución particular:</strong> <code>Substitute[solución, C, y₀]</code></li>
                    <li><strong>Verificación:</strong> Sustituir en la ecuación original</li>
                </ol>
            </div>

            <h4>🔬 Técnicas de Resolución Especializada</h4>
            
            <div class="help-example">
                <h5>Métodos de Integración</h5>
                <ul>
                    <li><strong>Por partes:</strong> <code>IntegrationByParts[u*v', u, x]</code></li>
                    <li><strong>Sustitución trigonométrica:</strong> Para integrales con √(a²±x²)</li>
                    <li><strong>Fracciones parciales:</strong> <code>Apart[rational_function, x]</code></li>
                    <li><strong>Residuos:</strong> Para integrales complejas</li>
                </ul>
            </div>

            <h4>⚙️ Configuración y Optimización del CAS</h4>
            
            <div class="help-tip">
                <h5>Configuraciones Importantes</h5>
                <ul>
                    <li><strong>Precisión exacta:</strong> Mantener fracciones y radicales</li>
                    <li><strong>Simplificación automática:</strong> Activar/desactivar según necesidad</li>
                    <li><strong>Dominio complejo:</strong> Incluir soluciones complejas</li>
                    <li><strong>Unidades:</strong> Trabajar con magnitudes físicas</li>
                    <li><strong>Asumir:</strong> <code>Assume[x > 0]</code> para simplificar</li>
                </ul>
            </div>

            <h4>🧠 Estrategias de Resolución de Problemas</h4>
            
            <div class="help-tip">
                <h5>Metodología Sistemática</h5>
                <ol>
                    <li><strong>Análisis:</strong> Identificar tipo de problema</li>
                    <li><strong>Simplificación:</strong> Reducir complejidad paso a paso</li>
                    <li><strong>Verificación:</strong> Comprobar resultados mediante sustitución</li>
                    <li><strong>Interpretación:</strong> Dar significado a la solución</li>
                    <li><strong>Generalización:</strong> Extender a casos similares</li>
                </ol>
            </div>

            <div class="help-warning">
                <h5>⚠️ Limitaciones del CAS</h5>
                <ul>
                    <li><strong>Integrales sin forma cerrada:</strong> No todas las funciones tienen antiderivada elemental</li>
                    <li><strong>Ecuaciones de grado ≥5:</strong> No hay fórmulas generales (Teorema de Abel-Ruffini)</li>
                    <li><strong>Problemas no decidibles:</strong> Algunos límites no pueden calcularse</li>
                    <li><strong>Interpretación física:</strong> El CAS no entiende el contexto del problema</li>
                </ul>
            </div>

            <h4>🏆 Comandos Expertos Poco Conocidos</h4>
            
            <div class="help-example">
                <h5>Funciones Avanzadas</h5>
                <ul>
                    <li><code>MinimizeOver[f(x), x, interval]</code> → Optimización en intervalo</li>
                    <li><code>ComplexExpand[expression]</code> → Separar parte real e imaginaria</li>
                    <li><code>TrigExpand[sin(a+b)]</code> → sin(a)cos(b) + cos(a)sin(b)</li>
                    <li><code>PowerExpand[log(ab)]</code> → log(a) + log(b)</li>
                    <li><code>Together[a/b + c/d]</code> → Combinar fracciones</li>
                </ul>
            </div>
        `;
    }
};