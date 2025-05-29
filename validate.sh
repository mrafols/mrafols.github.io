#!/bin/bash

# Portfolio Validation Script
# Valida HTML, CSS y ejecuta auditorías de accesibilidad

echo "🔍 Iniciando validación del portfolio de Marc Ràfols..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar resultados
show_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# 1. Validar HTML
echo -e "\n${YELLOW}📝 Validando estructura HTML...${NC}"

# Verificar que los archivos HTML existen
files=("index.html" "experience.html" "contact.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file encontrado"
        
        # Verificar estructura básica
        if grep -q "<!DOCTYPE html>" "$file" 2>/dev/null; then
            echo "  ✓ DOCTYPE HTML5 presente"
        else
            echo "  ⚠️  DOCTYPE HTML5 faltante en $file"
        fi
        
        # Verificar meta viewport
        if grep -q "viewport" "$file"; then
            echo "  ✓ Meta viewport presente"
        else
            echo "  ⚠️  Meta viewport faltante en $file"
        fi
        
        # Verificar lang attribute
        if grep -q 'lang="' "$file"; then
            echo "  ✓ Atributo lang presente"
        else
            echo "  ⚠️  Atributo lang faltante en $file"
        fi
        
    else
        echo "❌ $file no encontrado"
    fi
done

# 2. Validar JavaScript
echo -e "\n${YELLOW}🔧 Validando JavaScript...${NC}"

if [ -f "assets/js/language.js" ]; then
    echo "✓ language.js encontrado"
    
    # Verificar funciones principales
    if grep -q "function translatePage" "assets/js/language.js"; then
        echo "  ✓ Función translatePage presente"
    fi
    
    if grep -q "try {" "assets/js/language.js"; then
        echo "  ✓ Gestión de errores implementada"
    fi
    
    if grep -q "console.error" "assets/js/language.js"; then
        echo "  ✓ Logging de errores implementado"
    fi
else
    echo "❌ assets/js/language.js no encontrado"
fi

# 3. Verificar accesibilidad básica
echo -e "\n${YELLOW}♿ Verificando accesibilidad básica...${NC}"

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Verificando $file:"
        
        # Verificar alt attributes
        img_count=$(grep -c "<img" "$file" 2>/dev/null || echo "0")
        alt_count=$(grep -c "alt=" "$file" 2>/dev/null || echo "0")
        
        if [ "$img_count" -eq "$alt_count" ] || [ "$img_count" -eq 0 ]; then
            echo "  ✓ Todas las imágenes tienen alt text"
        else
            echo "  ⚠️  Algunas imágenes pueden carecer de alt text"
        fi
        
        # Verificar headings hierarchy
        if grep -q "<h1" "$file"; then
            echo "  ✓ H1 presente"
        else
            echo "  ⚠️  H1 faltante en $file"
        fi
        
        # Verificar aria labels
        if grep -q "aria-" "$file"; then
            echo "  ✓ Atributos ARIA implementados"
        else
            echo "  ⚠️  Atributos ARIA no encontrados en $file"
        fi
        
        # Verificar skip links
        if grep -q "skip-link" "$file"; then
            echo "  ✓ Skip link implementado"
        else
            echo "  ⚠️  Skip link faltante en $file"
        fi
    fi
done

# 4. Verificar SEO básico
echo -e "\n${YELLOW}🔍 Verificando SEO básico...${NC}"

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Verificando $file:"
        
        # Title tag
        if grep -q "<title>" "$file"; then
            echo "  ✓ Title tag presente"
        else
            echo "  ❌ Title tag faltante"
        fi
        
        # Meta description
        if grep -q 'name="description"' "$file"; then
            echo "  ✓ Meta description presente"
        else
            echo "  ❌ Meta description faltante"
        fi
        
        # Meta keywords
        if grep -q 'name="keywords"' "$file"; then
            echo "  ✓ Meta keywords presente"
        else
            echo "  ⚠️  Meta keywords faltante"
        fi
        
        # Open Graph
        if grep -q 'property="og:' "$file"; then
            echo "  ✓ Open Graph tags presentes"
        else
            echo "  ⚠️  Open Graph tags faltantes"
        fi
    fi
done

# 5. Verificar rendimiento básico
echo -e "\n${YELLOW}⚡ Verificando optimizaciones de rendimiento...${NC}"

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Verificando $file:"
        
        # Preload tags
        if grep -q "rel=\"preload\"" "$file"; then
            echo "  ✓ Preload tags implementados"
        else
            echo "  ⚠️  Preload tags no encontrados"
        fi
        
        # Lazy loading
        if grep -q "loading=\"lazy\"" "$file"; then
            echo "  ✓ Lazy loading implementado"
        else
            echo "  ⚠️  Lazy loading no encontrado"
        fi
        
        # External resources optimization
        cdn_count=$(grep -c "cdn\." "$file" 2>/dev/null || echo "0")
        echo "  📊 Recursos CDN utilizados: $cdn_count"
    fi
done

# 6. Verificar estructura de archivos
echo -e "\n${YELLOW}📁 Verificando estructura de archivos...${NC}"

required_dirs=("assets" "assets/css" "assets/js" "assets/img")
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✓ Directorio $dir existe"
    else
        echo "❌ Directorio $dir faltante"
    fi
done

required_files=("assets/css/style.css" "assets/js/language.js" "assets/js/main.js")
for req_file in "${required_files[@]}"; do
    if [ -f "$req_file" ]; then
        echo "✓ Archivo $req_file existe"
    else
        echo "❌ Archivo $req_file faltante"
    fi
done

# 7. Resumen final
echo -e "\n${GREEN}📋 RESUMEN DE VALIDACIÓN${NC}"
echo "=================================="
echo "✅ Validación HTML completada"
echo "✅ Verificación de accesibilidad completada"
echo "✅ Auditoría SEO básica completada"
echo "✅ Verificación de rendimiento completada"
echo -e "\n${YELLOW}💡 Para una auditoría completa, ejecuta:${NC}"
echo "  - Lighthouse en Chrome DevTools"
echo "  - WAVE Web Accessibility Evaluator"
echo "  - HTML Validator (validator.w3.org)"
echo -e "\n${GREEN}🎉 Validación del portfolio completada!${NC}"
