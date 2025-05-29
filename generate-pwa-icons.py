#!/usr/bin/env python3
"""
PWA Icon Generator
Genera los iconos PWA necesarios usando la imagen de perfil existente
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_pwa_icon(size, padding_percent=20):
    """
    Crea un icono PWA con el logo centrado y padding
    """
    # Configuración
    bg_color = '#0c77f2'  # Azul del tema
    logo_color = '#ffffff'  # Blanco para el logo
    
    # Crear imagen base
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
      # Calcular dimensiones del logo
    padding = int(size * padding_percent / 100)
    logo_size = size - (2 * padding)
    
    # Crear un círculo para el logo (simulando la imagen de perfil)
    circle_center = size // 2
    circle_radius = max(10, logo_size // 2 - 10)  # Asegurar que el radio sea positivo
    
    # Dibujar círculo de fondo blanco
    draw.ellipse([
        circle_center - circle_radius,
        circle_center - circle_radius,
        circle_center + circle_radius,
        circle_center + circle_radius
    ], fill=logo_color, outline=bg_color, width=4)
      # Dibujar las iniciales "MR"
    try:
        # Intentar usar una fuente del sistema
        font_size = max(8, int(circle_radius * 0.8))
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
            except:
                font = ImageFont.load_default()
    
    # Texto "MR"
    text = "MR"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = circle_center - text_width // 2
    text_y = circle_center - text_height // 2
    
    draw.text((text_x, text_y), text, fill=bg_color, font=font)
    
    return img

def create_maskable_icon(size):
    """
    Crea un icono maskable con safe area del 40%
    """
    return create_pwa_icon(size, padding_percent=40)

def main():
    """
    Genera todos los iconos PWA necesarios
    """
    assets_path = "assets/img"
    
    print("🎨 Generando iconos PWA...")
    
    # Iconos principales (requeridos para PWA)
    sizes = [192, 512]
    
    for size in sizes:
        print(f"📱 Generando icon-{size}x{size}.png...")
        icon = create_pwa_icon(size)
        icon.save(f"{assets_path}/icon-{size}x{size}.png", "PNG", optimize=True)
        
        print(f"🎭 Generando icon-maskable-{size}x{size}.png...")
        maskable = create_maskable_icon(size)
        maskable.save(f"{assets_path}/icon-maskable-{size}x{size}.png", "PNG", optimize=True)
    
    # Favicons adicionales
    favicon_sizes = [16, 32, 96]
    for size in favicon_sizes:
        print(f"🔖 Generando favicon-{size}x{size}.png...")
        favicon = create_pwa_icon(size, padding_percent=10)
        favicon.save(f"{assets_path}/favicon-{size}x{size}.png", "PNG", optimize=True)
    
    # Microsoft tiles
    tile_sizes = [150, 310]
    for size in tile_sizes:
        print(f"🔲 Generando mstile-{size}x{size}.png...")
        tile = create_pwa_icon(size)
        tile.save(f"{assets_path}/mstile-{size}x{size}.png", "PNG", optimize=True)
    
    # Apple touch icons adicionales
    apple_sizes = [152, 167]
    for size in apple_sizes:
        print(f"🍎 Generando apple-touch-icon-{size}x{size}.png...")
        apple_icon = create_pwa_icon(size, padding_percent=15)
        apple_icon.save(f"{assets_path}/apple-touch-icon-{size}x{size}.png", "PNG", optimize=True)
    
    print("\n✅ ¡Iconos PWA generados exitosamente!")
    print("📋 Archivos creados:")
    
    # Listar archivos creados
    for size in sizes:
        print(f"   - icon-{size}x{size}.png")
        print(f"   - icon-maskable-{size}x{size}.png")
    
    for size in favicon_sizes:
        print(f"   - favicon-{size}x{size}.png")
    
    for size in tile_sizes:
        print(f"   - mstile-{size}x{size}.png")
        
    for size in apple_sizes:
        print(f"   - apple-touch-icon-{size}x{size}.png")
    
    print("\n🔄 No olvides actualizar manifest.json con las nuevas rutas de iconos")

if __name__ == "__main__":
    main()
