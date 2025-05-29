#!/usr/bin/env python3
"""
Script para crear iconos de empresas para el portfolio de Marc Ràfols
Genera logos simples con las iniciales de cada empresa
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_company_icon(company_name, initials, color, filename):
    """
    Crea un icono de empresa con las iniciales
    """
    # Tamaño del icono aumentado para mejor resolución
    size = 128
    
    # Crear imagen
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Dibujar círculo de fondo con borde sutil
    draw.ellipse([4, 4, size-4, size-4], fill=color, outline=None)
    
    # Añadir sombra interior sutil
    shadow_color = tuple(max(0, c - 30) for c in Image.new('RGB', (1, 1), color).getpixel((0, 0)))
    draw.ellipse([6, 6, size-6, size-6], outline=shadow_color, width=2)
    
    # Cargar fuente más grande y clara
    font_size = 42  # Aumentado significativamente
    try:
        # Intentar cargar fuentes más claras y legibles
        font_paths = [
            "C:/Windows/Fonts/arial.ttf",
            "C:/Windows/Fonts/calibri.ttf", 
            "C:/Windows/Fonts/segoeui.ttf",
            "/System/Library/Fonts/Arial.ttf",  # macOS
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"  # Linux
        ]
        
        font = None
        for font_path in font_paths:
            try:
                font = ImageFont.truetype(font_path, font_size)
                break
            except:
                continue
        
        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Calcular posición del texto para centrarlo perfectamente
    text_bbox = draw.textbbox((0, 0), initials, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 4  # Ajuste fino
    
    # Añadir sombra al texto para mayor contraste
    shadow_offset = 2
    draw.text((x + shadow_offset, y + shadow_offset), initials, fill=(0, 0, 0, 80), font=font)
    
    # Dibujar texto principal en blanco para máximo contraste
    draw.text((x, y), initials, fill='white', font=font)
    
    # Guardar imagen con alta calidad
    img.save(filename, 'PNG', optimize=True)
    print(f"✓ Creado {filename} para {company_name}")

def main():
    """
    Función principal
    """
    print("🏢 Creando iconos de empresas para el portfolio...")
    
    # Crear directorio si no existe
    os.makedirs('assets/img/companies', exist_ok=True)
    
    # Lista de empresas con sus colores corporativos aproximados
    companies = [
        ("Leadtech Group", "LT", "#1E88E5"),      # Azul corporativo
        ("Monlau Corporate", "MC", "#4CAF50"),    # Verde educativo
        ("Monlau Centro de Estudios", "ME", "#2E7D32"),  # Verde más oscuro
        ("FHIOS Smart Knowledge", "FS", "#FF9800"), # Naranja tech
        ("Mediacloud", "MC", "#9C27B0"),          # Púrpura cloud
        ("UPC", "UPC", "#E53935"),                # Rojo universitario
        ("Incubio", "IN", "#00BCD4"),             # Cian startup
        ("Social Point", "SP", "#FF5722"),        # Naranja gaming
        ("Hornetsecurity", "HS", "#795548"),      # Marrón seguridad
        ("Privalia", "PV", "#F44336"),            # Rojo fashion
        ("Ecoburo Consulting", "EC", "#4CAF50"),  # Verde consultoría
        ("Saboredo SA", "SA", "#607D8B")          # Gris corporativo
    ]
    
    # Crear iconos
    for company, initials, color in companies:
        filename = f"assets/img/companies/{company.lower().replace(' ', '-').replace('–', '-')}.png"
        create_company_icon(company, initials, color, filename)
    
    print(f"\n✅ Se han creado {len(companies)} iconos de empresas exitosamente!")
    print("📁 Los iconos están guardados en: assets/img/companies/")

if __name__ == "__main__":
    main()
