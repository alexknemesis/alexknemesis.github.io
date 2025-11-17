# 🪟 Calculadora de Cortes de Ventanas

Herramienta web intuitiva y responsiva para calcular dimensiones de piezas de ventanas. Compatible con escritorio, tablets y móviles.

## 📋 Características

- ✅ Interfaz intuitiva y moderna
- ✅ Totalmente responsiva (escritorio, tablets, móviles)
- ✅ Cálculo de múltiples ventanas simultáneamente
- ✅ Exportación a imagen PNG
- ✅ Exportación a PDF
- ✅ Sin necesidad de base de datos
- ✅ Listo para hosting estático

## 🚀 Instalación

1. Descarga o clona los archivos del proyecto
2. Sube los archivos a tu hosting (solo necesitas `index.html` y `app.js`)
3. Accede al archivo `index.html` desde tu navegador

**No requiere instalación de dependencias**, todas las librerías se cargan desde CDN:
- TailwindCSS (estilos)
- html2canvas (exportar a imagen)
- jsPDF (exportar a PDF)
- jsPDF-AutoTable (tablas en PDF)

## 📊 Parámetros de Entrada

- **Ancho**: Ancho de la ventana en centímetros
- **Alto**: Alto de la ventana en centímetros
- **Número de Hojas**: Cantidad de hojas (2, 3 o 4)

## 🧮 Fórmulas de Cálculo

Todas las medidas se manejan en **centímetros (cm)** con **2 decimales**.

### Jaba (J)
```
J = Alto de la ventana
```

### Pierna + Enganche (P+E)
```
P+E = Alto de la ventana - 3.2
```

### Riel Superior + Riel Inferior (RS+RI)
```
RS+RI = Ancho de la ventana - 1.6
```

### Zócalo + Cabezal (Z+C)
El cálculo depende del número de hojas:

- **2 hojas**: `(RS+RI + 2.4) / 2`
- **3 hojas**: `(RS+RI + 5.7) / 3`
- **4 hojas**: `(RS+RI + 5) / 4`

## 💻 Uso

1. **Ingresar datos**: Completa el formulario con ancho, alto y número de hojas
2. **Agregar ventana**: Haz clic en "Agregar Ventana"
3. **Ver resultados**: Los cálculos aparecerán en la tabla
4. **Agregar más ventanas**: Repite el proceso para calcular múltiples ventanas
5. **Exportar**:
   - 📷 **Descargar Imagen**: Exporta la tabla como imagen PNG
   - 📄 **Descargar PDF**: Exporta la tabla como documento PDF
6. **Limpiar**: Elimina todas las ventanas calculadas

## 🌐 Hosting

Este proyecto está diseñado para funcionar en cualquier hosting estático básico:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Cualquier servidor web que sirva archivos HTML

**No requiere**:
- Base de datos
- Backend
- Servidor de aplicaciones
- Configuración especial

## 📱 Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (iOS, Android)
- ✅ Tablets
- ✅ Escritorio

## 🎨 Tecnologías

- HTML5
- JavaScript (Vanilla)
- TailwindCSS
- html2canvas
- jsPDF

## 📄 Estructura del Proyecto

```
ventanas/
├── index.html    # Interfaz principal
├── app.js        # Lógica de cálculos y exportación
└── README.md     # Este archivo
```

## 🔧 Personalización

Puedes personalizar fácilmente:

- **Colores**: Modifica las clases de TailwindCSS en `index.html`
- **Fórmulas**: Ajusta los cálculos en la función `calcularPiezas()` en `app.js`
- **Estilos**: Cambia las clases CSS según tus preferencias

## 📞 Soporte

Para cualquier duda o sugerencia sobre las fórmulas de cálculo o funcionalidad, consulta la sección de información en la aplicación.

---

**¡Listo para usar!** Solo abre `index.html` en tu navegador o súbelo a tu hosting favorito.
