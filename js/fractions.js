// Módulo de Fracciones y Control de Decimales
window.Fractions = {
    // Configuración global de decimales
    decimalPlaces: 3,
    showFractions: false,
    
    // Clase Fracción
    Fraction: function(numerator, denominator = 1) {
        this.num = parseInt(numerator) || 0;
        this.den = parseInt(denominator) || 1;
        
        // Evitar denominador cero
        if (this.den === 0) {
            this.den = 1;
        }
        
        // Manejar signos
        if (this.den < 0) {
            this.num = -this.num;
            this.den = -this.den;
        }
        
        this.simplify();
    },
    
    // Crear fracción desde string (ej: "3/4", "1.5", "2")
    parseFraction: function(str) {
        if (typeof str === 'number') {
            return this.fromDecimal(str);
        }
        
        str = str.toString().trim();
        
        // Si contiene '/', es una fracción
        if (str.includes('/')) {
            const parts = str.split('/');
            if (parts.length === 2) {
                return new this.Fraction(parts[0], parts[1]);
            }
        }
        
        // Si es decimal
        if (str.includes('.')) {
            return this.fromDecimal(parseFloat(str));
        }
        
        // Es entero
        return new this.Fraction(parseInt(str), 1);
    },
    
    // Convertir decimal a fracción
    fromDecimal: function(decimal) {
        if (isNaN(decimal)) return new this.Fraction(0, 1);
        
        const sign = decimal < 0 ? -1 : 1;
        decimal = Math.abs(decimal);
        
        // Si es entero
        if (decimal === Math.floor(decimal)) {
            return new this.Fraction(sign * decimal, 1);
        }
        
        // Convertir decimal a fracción
        const str = decimal.toString();
        const decimalPlaces = str.split('.')[1].length;
        const denominator = Math.pow(10, decimalPlaces);
        const numerator = decimal * denominator;
        
        const frac = new this.Fraction(sign * numerator, denominator);
        return frac;
    },
    
    // Máximo común divisor
    gcd: function(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },
    
    // Mínimo común múltiplo
    lcm: function(a, b) {
        return Math.abs(a * b) / this.gcd(a, b);
    }
};

// Métodos de la clase Fracción
Fractions.Fraction.prototype = {
    // Simplificar fracción
    simplify: function() {
        const divisor = Fractions.gcd(this.num, this.den);
        this.num /= divisor;
        this.den /= divisor;
        return this;
    },
    
    // Sumar fracciones
    add: function(other) {
        if (typeof other === 'number') {
            other = Fractions.fromDecimal(other);
        }
        
        const newDen = Fractions.lcm(this.den, other.den);
        const newNum = (this.num * newDen / this.den) + (other.num * newDen / other.den);
        
        return new Fractions.Fraction(newNum, newDen);
    },
    
    // Restar fracciones
    subtract: function(other) {
        if (typeof other === 'number') {
            other = Fractions.fromDecimal(other);
        }
        
        const newDen = Fractions.lcm(this.den, other.den);
        const newNum = (this.num * newDen / this.den) - (other.num * newDen / other.den);
        
        return new Fractions.Fraction(newNum, newDen);
    },
    
    // Multiplicar fracciones
    multiply: function(other) {
        if (typeof other === 'number') {
            other = Fractions.fromDecimal(other);
        }
        
        return new Fractions.Fraction(this.num * other.num, this.den * other.den);
    },
    
    // Dividir fracciones
    divide: function(other) {
        if (typeof other === 'number') {
            other = Fractions.fromDecimal(other);
        }
        
        return new Fractions.Fraction(this.num * other.den, this.den * other.num);
    },
    
    // Convertir a decimal
    toDecimal: function() {
        return this.num / this.den;
    },
    
    // Convertir a string
    toString: function() {
        if (this.den === 1) {
            return this.num.toString();
        }
        return `${this.num}/${this.den}`;
    },
    
    // Convertir a LaTeX
    toLatex: function() {
        if (this.den === 1) {
            return this.num.toString();
        }
        return `\\frac{${this.num}}{${this.den}}`;
    },
    
    // Clonar fracción
    clone: function() {
        return new Fractions.Fraction(this.num, this.den);
    }
};

// Utilidades globales actualizadas
window.MathUtils = {
    // Configuración
    settings: {
        decimalPlaces: 3,
        showFractions: false
    },
    
    // Formatear número con control de decimales y fracciones
    formatNumber: function(value, forceDecimals = null) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }
        
        const decimals = forceDecimals !== null ? forceDecimals : this.settings.decimalPlaces;
        
        // Si se requieren fracciones y el número no es muy pequeño
        if (this.settings.showFractions && Math.abs(value) > 1e-10) {
            const fraction = Fractions.fromDecimal(value);
            // Solo mostrar como fracción si el denominador no es muy grande
            if (fraction.den <= 1000) {
                return fraction.toString();
            }
        }
        
        return Number(value).toFixed(decimals);
    },
    
    // Formatear para LaTeX
    formatLatex: function(value, forceDecimals = null) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }
        
        // Si se requieren fracciones
        if (this.settings.showFractions && Math.abs(value) > 1e-10) {
            const fraction = Fractions.fromDecimal(value);
            // Solo mostrar como fracción si el denominador no es muy grande
            if (fraction.den <= 1000) {
                return fraction.toLatex();
            }
        }
        
        const decimals = forceDecimals !== null ? forceDecimals : this.settings.decimalPlaces;
        return Number(value).toFixed(decimals);
    },
    
    // Parsear entrada que puede ser fracción o decimal
    parseInput: function(input) {
        if (typeof input === 'number') {
            return input;
        }
        
        const str = input.toString().trim();
        
        // Si está vacío, retornar 0
        if (str === '') {
            return 0;
        }
        
        // Si contiene '/', es una fracción
        if (str.includes('/')) {
            try {
                const fraction = Fractions.parseFraction(str);
                return fraction.toDecimal();
            } catch (e) {
                // Si hay error, tratar como decimal
                return parseFloat(str) || 0;
            }
        }
        
        // Es decimal o entero
        return parseFloat(str) || 0;
    },
    
    // Validar si es un número válido (incluyendo fracciones)
    isValidNumber: function(value) {
        if (typeof value === 'number') {
            return !isNaN(value) && isFinite(value);
        }
        
        const str = value.toString().trim();
        
        // Si está vacío, no es válido (para validación de formularios)
        if (str === '') {
            return false;
        }
        
        // Primero, verificar como número decimal simple
        const simpleNum = parseFloat(str);
        if (!isNaN(simpleNum) && isFinite(simpleNum)) {
            return true;
        }
        
        // Si contiene '/', validar como fracción
        if (str.includes('/')) {
            const parts = str.split('/');
            if (parts.length === 2) {
                const num = parseFloat(parts[0]);
                const den = parseFloat(parts[1]);
                return !isNaN(num) && !isNaN(den) && isFinite(num) && isFinite(den) && den !== 0;
            }
        }
        
        return false;
    },
    
    // Crear controles de configuración
    createControls: function(containerId) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn('Container not found:', containerId);
                return;
            }
            
            const controlsHtml = `
                <div class="math-controls card mt-3">
                    <div class="card-header">
                        <h6><i class="fas fa-cog"></i> Configuración de Visualización</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="decimal-places-${containerId}">Cifras decimales:</label>
                                <select id="decimal-places-${containerId}" class="form-control" onchange="MathUtils.updateSettings()">
                                    <option value="0">0 decimales</option>
                                    <option value="1">1 decimal</option>
                                    <option value="2">2 decimales</option>
                                    <option value="3" selected>3 decimales</option>
                                    <option value="4">4 decimales</option>
                                    <option value="5">5 decimales</option>
                                    <option value="6">6 decimales</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label>Mostrar como:</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="number-format-${containerId}" 
                                           id="decimals-${containerId}" value="decimals" checked 
                                           onchange="MathUtils.updateSettings()">
                                    <label class="form-check-label" for="decimals-${containerId}">
                                        Decimales
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="number-format-${containerId}" 
                                           id="fractions-${containerId}" value="fractions" 
                                           onchange="MathUtils.updateSettings()">
                                    <label class="form-check-label" for="fractions-${containerId}">
                                        Fracciones
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-12">
                                <button class="btn btn-sm btn-info" onclick="MathUtils.applyToCurrentTool()">
                                    <i class="fas fa-sync"></i> Aplicar cambios
                                </button>
                                <small class="text-muted ml-2">Los cambios se aplicarán en el próximo cálculo</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', controlsHtml);
        } catch (error) {
            console.error('Error creating controls:', error);
        }
    },
    
    // Actualizar configuración global
    updateSettings: function() {
        try {
            // Buscar controles activos
            const decimalSelect = document.querySelector('[id^="decimal-places-"]:not([disabled])');
            const fractionRadio = document.querySelector('[id^="fractions-"]:checked');
            
            if (decimalSelect) {
                this.settings.decimalPlaces = parseInt(decimalSelect.value);
            }
            
            if (fractionRadio) {
                this.settings.showFractions = fractionRadio.value === 'fractions';
            }
            
            // Actualizar configuración de utils (compatibilidad)
            if (window.utils) {
                window.utils.decimalPlaces = this.settings.decimalPlaces;
                window.utils.showFractions = this.settings.showFractions;
            }
        } catch (error) {
            console.warn('Error updating settings:', error);
        }
    },
    
    // Aplicar cambios a la herramienta actual
    applyToCurrentTool: function() {
        this.updateSettings();
        
        // Intentar re-renderizar si hay resultados visibles
        const resultContainers = ['result-content', 'current-matrix', 'current-matrix-det'];
        
        resultContainers.forEach(id => {
            const container = document.getElementById(id);
            if (container && container.innerHTML.trim() !== '') {
                // Disparar evento personalizado para que las herramientas se actualicen
                const event = new CustomEvent('mathSettingsChanged', {
                    detail: this.settings
                });
                document.dispatchEvent(event);
            }
        });
        
        utils.showSuccess(document.body, 'Configuración actualizada. Los cambios se aplicarán en el próximo cálculo.');
    }
};

// Actualizar utils global para compatibilidad - MANTENER FUNCIONES EXISTENTES
if (window.utils) {
    // Guardar funciones originales importantes
    const originalShowError = window.utils.showError;
    const originalShowSuccess = window.utils.showSuccess;
    const originalCreateElement = window.utils.createElement;
    const originalFormatNumber = window.utils.formatNumber;
    const originalIsValidNumber = window.utils.isValidNumber;
    
    // Actualizar funciones de formato manteniendo las existentes como respaldo
    window.utils.formatNumber = function(num, decimals = null) {
        try {
            return MathUtils.formatNumber(num, decimals);
        } catch (e) {
            return originalFormatNumber ? originalFormatNumber(num, decimals || 2) : Number(num).toFixed(decimals || 2);
        }
    };
    
    window.utils.formatLatex = function(num, decimals = null) {
        try {
            return MathUtils.formatLatex(num, decimals);
        } catch (e) {
            return Number(num).toFixed(decimals || 2);
        }
    };
    
    window.utils.parseInput = function(input) {
        try {
            return MathUtils.parseInput(input);
        } catch (e) {
            return parseFloat(input) || 0;
        }
    };
    
    window.utils.isValidNumber = function(value) {
        try {
            return MathUtils.isValidNumber(value);
        } catch (e) {
            return originalIsValidNumber ? originalIsValidNumber(value) : (!isNaN(parseFloat(value)) && isFinite(value));
        }
    };
    
    // Restaurar funciones originales importantes
    window.utils.showError = originalShowError || function(container, message) {
        console.error('Error:', message);
        alert('Error: ' + message);
    };
    window.utils.showSuccess = originalShowSuccess || function(container, message) {
        console.log('Success:', message);
    };
    window.utils.createElement = originalCreateElement || function(tag, attributes, content) {
        const element = document.createElement(tag);
        if (content) element.textContent = content;
        return element;
    };
    
    // Propiedades para compatibilidad
    window.utils.decimalPlaces = 3;
    window.utils.showFractions = false;
}