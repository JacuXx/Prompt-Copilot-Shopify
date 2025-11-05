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

#### Estructura Base (SIN COMENTARIOS)
```javascript
(function() {
  'use strict';
  
  console.log('Inicializando módulo personalizado');
  
  const moduleConfig = {
    selectors: {
      customButton: '[data-custom-button]',
      customContainer: '[data-custom-container]'
    },
    cssClasses: {
      loading: 'is-loading',
      error: 'has-error'
    }
  };
  
  function initializeCustomModule() {
    console.log('Módulo inicializado');
    bindModuleEvents();
  }
  
  function bindModuleEvents() {
    document.addEventListener('click', handleButtonClick);
  }
  
  function handleButtonClick(event) {
    const clickedButton = event.target.closest(moduleConfig.selectors.customButton);
    if (!clickedButton) return;
    
    event.preventDefault();
    console.log('Click detectado en:', clickedButton);
    
    processButtonAction(clickedButton);
  }
  
  function processButtonAction(button) {
    button.classList.add(moduleConfig.cssClasses.loading);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCustomModule);
  } else {
    initializeCustomModule();
  }
  
  if (window.location.hostname !== 'localhost') {
    console.log = function() {};
  }
})();
```

#### AJAX Optimizado (SIN COMENTARIOS)
```javascript
async function addProductToShoppingCart(variantId, quantity = 1) {
  console.log(`Agregando al carrito: ${variantId}, cantidad: ${quantity}`);
  
  try {
    const cartAddResponse = await fetch('/cart/add.js', {
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
    
    if (!cartAddResponse.ok) {
      throw new Error(`HTTP error! status: ${cartAddResponse.status}`);
    }
    
    const updatedCartData = await cartAddResponse.json();
    console.log('Producto agregado exitosamente:', updatedCartData);
    
    updateCartUserInterface(updatedCartData);
    
    return updatedCartData;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    showErrorMessage('No se pudo agregar el producto al carrito');
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

### Limpieza de Console.log en Producción
```javascript
{% unless settings.enable_debug_mode %}
<script>
  if (typeof console !== 'undefined' && !window.location.hostname.includes('myshopify.com')) {
    ['log', 'debug', 'info', 'warn'].forEach(function(method) {
      console[method] = function() {};
    });
  }
</script>
{% endunless %}
```
