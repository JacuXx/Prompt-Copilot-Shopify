# Guía de JavaScript y AJAX

## Principios de JavaScript

### Uso Mínimo y Casos Específicos
- JavaScript **SOLO** para casos donde Liquid no sea suficiente
- Interacciones dinámicas del lado del cliente
- Funcionalidades que requieren manipulación del DOM en tiempo real

### Análisis del Tema Actual para AJAX
**ANTES** de implementar AJAX, analizar cómo funciona en el tema:

1. **Verificar archivos existentes**:
   - `assets/theme.js` o similar
   - Buscar funciones AJAX existentes
   - Identificar endpoints utilizados

2. **Patrones comunes a buscar**:
```javascript
// Buscar estos patrones en el tema
fetch('/cart/add.js')
jQuery.post('/cart/add.js')
$.ajax({ url: '/cart/update.js' })
```

3. **Endpoints estándar de Shopify**:
   - `/cart/add.js` - Agregar al carrito
   - `/cart/update.js` - Actualizar carrito
   - `/cart/change.js` - Cambiar cantidad
   - `/cart.js` - Obtener carrito

### JavaScript Optimizado

#### Estructura Base
```javascript
(function() {
  'use strict';
  
  console.log('Inicializando módulo personalizado');
  
  // Variables y configuración
  const config = {
    selectors: {
      button: '[data-custom-button]',
      container: '[data-custom-container]'
    },
    classes: {
      loading: 'is-loading',
      error: 'has-error'
    }
  };
  
  // Funciones principales
  function initModule() {
    console.log('Módulo inicializado');
    bindEvents();
  }
  
  function bindEvents() {
    document.addEventListener('click', handleClick);
  }
  
  function handleClick(event) {
    const button = event.target.closest(config.selectors.button);
    if (!button) return;
    
    event.preventDefault();
    console.log('Click detectado en:', button);
    // Lógica del click
  }
  
  // Inicialización
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModule);
  } else {
    initModule();
  }
  
  // Limpieza de console.log en producción
  if (window.location.hostname !== 'localhost') {
    console.log = function() {};
  }
})();
```

#### AJAX Optimizado
```javascript
async function addToCart(variantId, quantity = 1) {
  console.log(`Agregando al carrito: ${variantId}, cantidad: ${quantity}`);
  
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        items: [{
          id: variantId,
          quantity: quantity
        }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Producto agregado exitosamente:', data);
    
    // Actualizar UI
    updateCartUI(data);
    
    return data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    showError('No se pudo agregar el producto al carrito');
    throw error;
  }
}
```

### Buenas Prácticas

1. **Event Delegation**: Usar un solo listener en el documento
2. **Async/Await**: Para mejor legibilidad de código asíncrono
3. **Error Handling**: Siempre manejar errores apropiadamente
4. **Console.log**: Solo para desarrollo, limpiar en producción
5. **Performance**: Minimizar manipulación del DOM
6. **Compatibilidad**: Verificar soporte del navegador

### Limpieza de Console.log
```javascript
// Al final del archivo, agregar:
{% unless settings.enable_debug_mode %}
<script>
  // Limpiar console.log en producción
  if (typeof console !== 'undefined' && !window.location.hostname.includes('myshopify.com')) {
    ['log', 'debug', 'info', 'warn'].forEach(function(method) {
      console[method] = function() {};
    });
  }
</script>
{% endunless %}
```
