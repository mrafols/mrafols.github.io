# Marc Ràfols Ibáñez - Portfolio Profesional

Portfolio profesional bilingüe (Español/Inglés) de Marc Ràfols Ibáñez, DevOps Engineer & Scrum Master. Diseño moderno, interactivo y completamente responsive. Implementado como Progressive Web App (PWA) con soporte para instalación en dispositivos.

## 🚀 Características

### Diseño y UX
- **Diseño Moderno**: Interfaz limpia con efectos glassmorphism y gradientes
- **Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Dark Mode**: Diseño elegante en modo oscuro permanente
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **Parallax Effect**: Efecto parallax en la sección hero
- **Tilt Cards**: Efecto 3D en tarjetas al pasar el mouse
- **Custom Cursor**: Cursor personalizado para desktop
- **Particle Background**: Fondo animado con partículas flotantes

### Funcionalidad
- **Bilingüe**: Español e Inglés con cambio dinámico
- **PWA**: Instalable como aplicación nativa
- **Service Worker**: Cache offline para acceso sin conexión
- **Smooth Scroll**: Navegación suave entre secciones
- **Active Section Highlighting**: Resaltado de sección activa en navbar
- **Contact Form**: Formulario de contacto funcional
- **Copy to Clipboard**: Copia email con Ctrl/Cmd + Click
- **Stats Counter**: Animación de contadores en sección About
- **Lazy Loading**: Carga optimizada de imágenes
- **Easter Egg**: Código Konami secreto 🎮

### Rendimiento
- **Optimizado**: CSS minificado y JavaScript modular
- **Cache Strategy**: Network-first con fallback a cache
- **Preload Critical Assets**: Precarga de recursos críticos
- **Intersection Observer**: Detección eficiente de elementos visibles
- **RequestAnimationFrame**: Animaciones optimizadas

## 📁 Estructura del Proyecto

```
mrafols.github.io/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript funcional
├── manifest.json           # PWA manifest
├── service-worker.js       # Service Worker para PWA
├── README.md               # Documentación
├── Curriculum vitae Marc Ràfols Ibáñez.pdf
└── assets/
    └── img/
        ├── profile-img.jpg
        ├── hero-bg.jpg
        ├── favicon.png
        ├── apple-touch-icon.png
        ├── icon-192x192.png
        ├── icon-512x512.png
        └── companies/
            ├── hornetsecurity.png
            ├── leadtech-group.png
            ├── privalia.png
            ├── social-point.png
            └── ...
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animations
- **JavaScript (Vanilla)**: Sin dependencias externas
- **PWA**: Service Worker, Web App Manifest
- **Font Awesome**: Iconos
- **Google Fonts**: Inter y Fira Code

## 🎨 Personalización

### Colores
Los colores se definen mediante variables CSS en `:root` y `[data-theme="dark"]`:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #0a192f;
    --accent-primary: #64ffda;
    --accent-secondary: #5a67d8;
    /* ... */
}
```

### Contenido
Edita `index.html` para modificar:
- Información personal
- Experiencia laboral
- Habilidades
- Información de contacto

### Traducciones
Los textos bilingües usan atributos `data-es` y `data-en`:

```html
<h2 data-es="Sobre mí" data-en="About Me">Sobre mí</h2>
```

## 🚀 Despliegue

### GitHub Pages
1. Sube los archivos al repositorio `username.github.io`
2. Configura GitHub Pages en Settings
3. Tu portfolio estará disponible en `https://username.github.io`

### Otro Hosting
Simplemente sube todos los archivos al servidor web. El portfolio funciona sin backend.

## 📱 PWA - Instalación

### Desktop
1. Abre el portfolio en Chrome/Edge
2. Haz clic en el icono de instalación en la barra de direcciones
3. Confirma la instalación

### Mobile
1. Abre el portfolio en Chrome/Safari
2. Toca el botón "Compartir"
3. Selecciona "Añadir a pantalla de inicio"

## 🎯 Características Técnicas

### CSS Moderno
- CSS Grid y Flexbox para layouts
- CSS Variables para theming
- CSS Animations y Transitions
- Backdrop Filter para efectos de cristal
- Media Queries para responsive design

### JavaScript Avanzado
- Intersection Observer API
- Local Storage para persistencia
- Service Worker para PWA
- Clipboard API
- Event Delegation
- RequestAnimationFrame

### Accesibilidad
- Etiquetas semánticas HTML5
- ARIA labels
- Navegación por teclado
- Alto contraste
- Focus states visibles

## 🐛 Navegadores Soportados

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Opera 76+ ✅

## 📄 Licencia

© 2025 Marc Ràfols Ibáñez. Todos los derechos reservados.

## 📞 Contacto

- **Email**: marc@marcrafols.com
- **Ubicación**: Mahón, Menorca
- **LinkedIn**: [linkedin.com/in/marcrafols](https://linkedin.com/in/marcrafols)
- **GitHub**: [github.com/mrafols](https://github.com/mrafols)

---

Hecho con ❤️ y mucho ☕


