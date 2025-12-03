import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecofort_project.settings')
django.setup()

from apps.categorias.models import Categoria
from apps.productos.models import Producto

print("🔄 Limpiando productos existentes...")
Producto.objects.all().delete()
Categoria.objects.all().delete()

print("📦 Creando categorías del catálogo PDF...")

# Crear categorías basadas en el PDF
papeleria = Categoria.objects.create(
    nombre="Papelería y Dispensadores",
    descripcion="Papeles higiénicos, toallas, servilletas y dispensadores",
    slug="papeleria"
)

articulos_aseo = Categoria.objects.create(
    nombre="Artículos de Aseo",
    descripcion="Productos para limpieza y aseo",
    slug="articulos-aseo"
)

productos_quimicos = Categoria.objects.create(
    nombre="Productos Químicos",
    descripcion="Limpiadores, desinfectantes, ceras y químicos",
    slug="productos-quimicos"
)

epp = Categoria.objects.create(
    nombre="Elementos de Protección Personal",
    descripcion="EPP y productos HORECA",
    slug="epp"
)

print("✅ Categorías creadas")
print("📦 Cargando productos del catálogo PDF...")

# PRODUCTOS BASADOS EN EL CATÁLOGO PDF
productos_catalog = [
    # === PAPELERÍA Y DISPENSADORES ===
    # Papel Higiénico
    ("HIGIENICO TORK UNIVERSAL JUMBO H/S 4X500 MTS", papeleria, 45990, 39990, "Papel higiénico Tork Universal Jumbo, hoja simple, pack de 4 rollos de 500 metros cada uno."),
    ("HIGIENICO RENDIPEL MAX UH 4X500 MTS", papeleria, 42990, 37990, "Papel higiénico Rendipel Max ultra hoja, 4 rollos de 500 metros."),
    ("HIGIENICO TORK UNIVERSAL 6X500 MTS", papeleria, 62990, 54990, "Papel higiénico Tork Universal, pack de 6 rollos de 500 metros."),
    ("HIGIENICO BLANCA JUMBO 4X500 MTS", papeleria, 38990, 32990, "Papel higiénico Blanca Jumbo, 4 rollos de 500 metros."),
    ("HIGIENICO ELITE D.H 6X250 MTS", papeleria, 35990, 29990, "Papel higiénico Elite doble hoja, pack de 6 rollos de 250 metros."),
    ("HIGIENICO TORK SMARTONE MINI 12 ROLLOS X 111.6 MTS", papeleria, 48990, 42990, "Sistema SmartOne Mini de Tork, 12 rollos de 111.6 metros."),
    ("HIGIENICO TORK ROLLO D/H 8X6 25 MTS", papeleria, 28990, 24990, "Papel higiénico Tork rollo doble hoja, 8 paquetes de 6 unidades de 25 metros."),
    
    # Toallas de Papel
    ("TOALLA BIANCA JUMBO 2X250 MTS", papeleria, 24990, 21990, "Toalla de papel Bianca Jumbo, pack de 2 rollos de 250 metros."),
    ("TOALLA ELITE ECONOMICA 2X250 MTS", papeleria, 22990, 19990, "Toalla Elite económica, 2 rollos de 250 metros."),
    ("TOALLA RENDIPEL MAX UH 2X250 MTS", papeleria, 26990, 23990, "Toalla Rendipel Max ultra hoja, 2 rollos de 250 metros."),
    ("TOALLA TORK UNIVERSAL 2X250 MTS JUMBO", papeleria, 29990, 26990, "Toalla Tork Universal Jumbo, 2 rollos de 250 metros."),
    ("TOALLA ELITE AUTOCORTE 2X250 MTS", papeleria, 28990, 25990, "Toalla Elite autocorte, 2 rollos de 250 metros."),
    ("TOALLA TORK JUMBO AUTOCORTE H/S 2X280 MTS", papeleria, 32990, 29990, "Toalla Tork Jumbo autocorte hoja simple, 2 rollos de 280 metros."),
    ("TOALLA TORK ADVANCED D/H 2X200MT JUMBO", papeleria, 34990, 31990, "Toalla Tork Advanced doble hoja Jumbo, 2 rollos de 200 metros."),
    ("TOALLA INTERFOLIADA DH 18X200 ELITE", papeleria, 38990, 35990, "Toalla interfoliada Elite doble hoja, pack de 18 paquetes de 200 hojas."),
    ("TOALLA INTERFOLIADA NATURAL 18X250", papeleria, 36990, 33990, "Toalla interfoliada natural, 18 paquetes de 250 hojas."),
    
    # Servilletas
    ("SERVILLETA BIANCA COCKTAIL 20X100 HJ", papeleria, 12990, 10990, "Servilletas Bianca cocktail, 20 paquetes de 100 hojas."),
    ("SERVILLETA ELITE EXPRESS DH COCTEL 18 PQT X 400UN", papeleria, 18990, 16990, "Servilletas Elite Express doble hoja cocktail, 18 paquetes de 400 unidades."),
    ("SERVILLETA MESA FLORES 33X33 9X500 ELITE", papeleria, 22990, 19990, "Servilletas de mesa con flores Elite 33x33, 9 paquetes de 500 unidades."),
    ("SERVILLETA BIANCA LUNCH 20X500", papeleria, 24990, 21990, "Servilletas Bianca lunch, 20 paquetes de 500 unidades."),
    ("TORK ADVANCED SERVILLETA MESA 30X30 ACOLCHADA 12X200", papeleria, 26990, 23990, "Servilletas Tork Advanced de mesa acolchadas 30x30, 12 paquetes de 200 unidades."),
    
    # Pañuelos
    ("PAÑUELO FACIAL INSTITUCIONAL 42 CJ X 50 UN ELITE", papeleria, 32990, 28990, "Pañuelos faciales Elite institucional, 42 cajas de 50 unidades."),
    ("PAÑUELO FACIAL ELITE PREMIUM 60/36", papeleria, 38990, 34990, "Pañuelos faciales Elite Premium, pack de 60/36."),
    ("FACIAL TORK DH EXTRA SUAVE 75 UNIDADES", papeleria, 8990, 7990, "Pañuelos faciales Tork doble hoja extra suave, caja de 75 unidades."),
    
    # Paños
    ("PAÑO MAXWIPE MAX50 TRABAJO LIVIANO BOBINA 690 PAÑOS", papeleria, 18990, 16990, "Paño Maxwipe Max50 para trabajo liviano, bobina de 690 paños."),
    ("PAÑO MAXWIPE MAX70 TRABAJO PESADO ROLLO 88 PAÑOS X 6 UN", papeleria, 28990, 25990, "Paño Maxwipe Max70 para trabajo pesado, 6 rollos de 88 paños."),
    ("PAÑO MAXWIPE MAX60 TRABAJO BOBINA 890 PAÑOS", papeleria, 22990, 19990, "Paño Maxwipe Max60, bobina de 890 paños."),
    
    # Sabanillas
    ("SABANILLA TORK PREPICADA ADVANCED 4PAQ X 2ROLLO 48MTS", papeleria, 42990, 38990, "Sabanilla Tork prepicada Advanced, 4 paquetes de 2 rollos de 48 metros."),
    ("SABANILLA BIANCA 2PQ X 50MTS", papeleria, 24990, 21990, "Sabanilla Bianca, 2 paquetes de 50 metros."),
    
    # Dispensadores
    ("DISP. DE PAPEL HIGIENICO JUMBO INOXIDABLE ELITE", papeleria, 35990, None, "Dispensador de papel higiénico Jumbo en acero inoxidable Elite."),
    ("DISP. DE PAPEL HIGIENICO JUMBO METALICO BLANCO ELITE", papeleria, 32990, None, "Dispensador de papel higiénico Jumbo metálico blanco Elite."),
    ("DISP. EVOLUTION HIGIENICO DOBLE ROLLO BLANCO", papeleria, 28990, None, "Dispensador Evolution para papel higiénico doble rollo, color blanco."),
    ("DISP. EVOLUTION HIGIENICO INTERFOLIADO BLANCO", papeleria, 29990, None, "Dispensador Evolution para papel higiénico interfoliado, blanco."),
    ("DISP. DE BOBINA DE PARED", papeleria, 24990, None, "Dispensador de bobina de pared."),
    ("DISP. EVOLUCIÓN HIGIÉNICO JUMBO BLANCO", papeleria, 31990, None, "Dispensador Evolution para papel higiénico Jumbo, blanco."),
    ("DISP. EVOLUCIÓN TOALLA ROLLO BLANCO", papeleria, 27990, None, "Dispensador Evolution para toalla en rollo, blanco."),
    ("DISP. TOALLA INTERFOLIADA BLANCO", papeleria, 26990, None, "Dispensador para toalla interfoliada, color blanco."),
    ("DISP. TORK XPRESS MINI ACERO INOXIDABLE", papeleria, 45990, None, "Dispensador Tork Xpress Mini en acero inoxidable."),
    
    # === ARTÍCULOS DE ASEO ===
    ("ESCOBILLON ACRILICO 32 CM VIRGINIA", articulos_aseo, 8990, 7990, "Escobillón acrílico de 32 cm, marca Virginia."),
    ("ESCOBILLON FIBRA PISOS 50 CM VIRGINIA", articulos_aseo, 12990, 10990, "Escobillón de fibra para pisos de 50 cm, Virginia."),
    ("ESCOBILLON MOPPY 42 CM MAGUEY", articulos_aseo, 9990, 8490, "Escobillón Moppy de 42 cm, marca Maguey."),
    ("MOP ALGODÓN INDUSTRIAL 500 GR", articulos_aseo, 7990, 6990, "Mop de algodón industrial de 500 gramos."),
    ("MOPA MOP MICROFIBRA 40 CM VIRGINIA", articulos_aseo, 11990, 9990, "Mopa mop de microfibra de 40 cm, Virginia."),
    ("PAÑO LIMPIEZA MICROFIBRA 40X40 VIRGINIA", articulos_aseo, 4990, 3990, "Paño de limpieza de microfibra 40x40, Virginia."),
    ("PAÑO LIMPIEZA MULTIUSO BRILLANTE AMARILLO", articulos_aseo, 3990, None, "Paño de limpieza multiuso color amarillo brillante."),
    ("SECADOR PISO VIDRIO METALICO 40CM VIRGINIA", articulos_aseo, 8990, 7490, "Secador de piso y vidrio metálico de 40 cm, Virginia."),
    ("BASURERO PEDAL PLÁSTICO 12 LTS", articulos_aseo, 14990, 12990, "Basurero con pedal de plástico, capacidad 12 litros."),
    ("BASURERO VAIVEN 50 LTS", articulos_aseo, 22990, 19990, "Basurero vaivén de 50 litros."),
    ("ESCOBILLA WC BASURERO PEDAL DISPENSADOR 3EN1", articulos_aseo, 24990, 21990, "Set 3 en 1: escobilla WC, basurero pedal y dispensador."),
    ("GUANTE IPAR VIRUTEX TALLA S/M/L", articulos_aseo, 3990, 2990, "Guante IPAR Virutex disponible en tallas S, M y L."),
    ("BOLSA BASURA 50X60 X25 NEGRO", articulos_aseo, 4990, 3990, "Bolsas de basura negras 50x60, pack de 25 unidades."),
    ("BOLSA BASURA 60X90 X 10 NEGRO", articulos_aseo, 5990, 4990, "Bolsas de basura negras 60x90, pack de 10 unidades."),
    ("BOLSA BASURA 80X110 X 10 NEGRO", articulos_aseo, 7990, 6990, "Bolsas de basura negras 80x110, pack de 10 unidades."),
    
    # === PRODUCTOS QUÍMICOS ===
    # Pisos
    ("ABRILLANTADOR PISOS 5LTS VIRGINIA", productos_quimicos, 18990, 16990, "Abrillantador para pisos de 5 litros, marca Virginia."),
    ("CERA ACRILICA AUTOBRILLO 5LTS MAGUEY", productos_quimicos, 24990, 21990, "Cera acrílica con autobrillo de 5 litros, Maguey."),
    ("CERA ACRILICA PREMIUM 5LTS MAGUEY", productos_quimicos, 28990, 25990, "Cera acrílica premium de 5 litros, Maguey."),
    ("CERA CREMA BRILLINA AMARILLA 480ML VIRGINIA", productos_quimicos, 5990, 4990, "Cera crema Brillina amarilla de 480ml, Virginia."),
    ("CERA LIQUIDA INCOLORA AUTOBRILLO LAVANDA 900ML VIRGINIA", productos_quimicos, 6990, 5990, "Cera líquida incolora con autobrillo aroma lavanda 900ml, Virginia."),
    ("CERA PLASTICA NEGRA 5 LTS VIRGINIA", productos_quimicos, 22990, 19990, "Cera plástica negra de 5 litros, Virginia."),
    ("MANTENEDOR AQUAGEN DE PISO 5LTS - LEMON/MANZANA", productos_quimicos, 16990, 14990, "Mantenedor de pisos Aquagen de 5 litros, aroma limón o manzana."),
    ("REMOVEDOR DE CERAS PISOS FLOTANTE 5L VIRGINIA", productos_quimicos, 19990, 17990, "Removedor de ceras para pisos flotantes de 5 litros, Virginia."),
    
    # Limpiadores y Desinfectantes
    ("LIMPIADOR CLOROGEL EUCALIPTUS IGENIX 5LTS VIRGINIA", productos_quimicos, 14990, 12990, "Limpiador Clorogel aroma eucalipto Igenix de 5 litros, Virginia."),
    ("LIMPIADOR DESINFEC SUP 4000 VIRUTEX - CITRICO/LAVANDA", productos_quimicos, 18990, 16990, "Limpiador desinfectante Super 4000 Virutex, aroma cítrico o lavanda."),
    ("LIMPIADOR DESINFECT. EUCALIPTUS IGENIX 5LTS VIRGINIA", productos_quimicos, 15990, 13990, "Limpiador desinfectante aroma eucalipto Igenix 5L, Virginia."),
    ("LIMPIADOR DESINFECTANTE IGENIX 5 LTS VIRGINIA - LAVANDA/VAINILLA", productos_quimicos, 15990, 13990, "Limpiador desinfectante Igenix 5L, aroma lavanda o vainilla, Virginia."),
    ("CLORO CONCENTRADO TRADICIONAL 4LTS - IMPEKE", productos_quimicos, 12990, 10990, "Cloro concentrado tradicional de 4 litros, marca Impeke."),
    ("CLOROGEL IGENIX 900ML VIRGINIA - LAVANDA/EUCALIPTUS", productos_quimicos, 4990, 3990, "Clorogel Igenix de 900ml, aroma lavanda o eucalipto, Virginia."),
    ("CLOROGEL AROMA LIMON 5 LTS IMPEKE", productos_quimicos, 13990, 11990, "Clorogel aroma limón de 5 litros, Impeke."),
    
    # Desodorantes Ambientales
    ("DESODORANTE LÍQUIDO AROM LAVANDA 5LTS", productos_quimicos, 14990, 12990, "Desodorante líquido aroma lavanda de 5 litros."),
    ("AEROSOL CON GATILLO AROM AIRES PATAGONIA 250ML", productos_quimicos, 3990, None, "Aerosol con gatillo aroma Aires de Patagonia 250ml."),
    ("DESODORANTE AEROSOL 225G - VARIOS AROMAS", productos_quimicos, 3490, None, "Desodorante aerosol de 225g, disponible en varios aromas."),
    ("DESODORANTE AMBIENTAL CITRICO 5LTS MAGUEY", productos_quimicos, 13990, 11990, "Desodorante ambiental aroma cítrico de 5 litros, Maguey."),
    ("DESODORANTE E HIGIENIZANTE AMBIENTAL CITRICO 5LTS MAGUEY", productos_quimicos, 15990, 13990, "Desodorante e higienizante ambiental cítrico 5L, Maguey."),
    ("AMBIGEN BRYS NEUTRALIZADOR MALOS OLORES 750ML SUCITESA", productos_quimicos, 8990, 7990, "Ambigen Brys neutralizador de malos olores 750ml, Sucitesa."),
    
    # Lavandería y Auto
    ("WAX SHAMPOO CAR 5LTS MAGUEY", productos_quimicos, 16990, 14990, "Wax shampoo para auto de 5 litros, Maguey."),
    ("SHAMPOO DE CARROCERIAS ALTA ESPUMA 5 LTS", productos_quimicos, 15990, 13990, "Shampoo de carrocerías alta espuma de 5 litros."),
    ("SHAMPO DE ALFOMBRAS Y TAPICES 5LTS MAGUEY", productos_quimicos, 17990, 15990, "Shampoo para alfombras y tapices de 5 litros, Maguey."),
    ("RENOVADOR DE GOMAS 5 LTS MAGUEY", productos_quimicos, 14990, 12990, "Renovador de gomas de 5 litros, Maguey."),
    ("DETERGENTE EMULGEN EXCELLENCE 20KG SUCITESA", productos_quimicos, 42990, 38990, "Detergente Emulgen Excellence de 20kg, Sucitesa."),
    ("DETERGENTE EN POLVO 2.5KG VIRGINIA", productos_quimicos, 8990, 7990, "Detergente en polvo de 2.5kg, Virginia."),
    ("DETERGENTE IGENIX FLORAL 3 LTS VIRGINIA", productos_quimicos, 9990, 8490, "Detergente Igenix floral de 3 litros, Virginia."),
    ("DETERGENTE DE ROPA LIQUIDO 5LTS MAGUEY", productos_quimicos, 12990, 10990, "Detergente de ropa líquido de 5 litros, Maguey."),
    ("CLORO ROPA BLANCA 1000 GR X15 - IMPEKE", productos_quimicos, 18990, 16990, "Cloro para ropa blanca 1000g, pack de 15 unidades, Impeke."),
    ("CLORO ROPA COLOR 930GR X15 - IMPEKE", productos_quimicos, 18990, 16990, "Cloro para ropa de color 930g, pack de 15 unidades, Impeke."),
    
    # === ELEMENTOS DE PROTECCIÓN PERSONAL ===
    ("GUANTE NITRILO 13 VERDE", epp, 12990, 10990, "Guantes de nitrilo calibre 13, color verde."),
    ("GUANTE CLASICA IPAR VIRUTEX TALLA S/M/L", epp, 3990, 2990, "Guante clásico IPAR Virutex, disponible en tallas S, M y L."),
    ("GUANTE DOMESTICO FLOCADO LATEX", epp, 4990, 3990, "Guante doméstico flocado de látex."),
    ("GUANTE CABRITILLA BLACK BULL BASIC", epp, 8990, 7490, "Guante de cabritilla Black Bull Basic."),
    ("GUANTE EXAM. NITRILO NEGRO/AZUL", epp, 14990, 12990, "Guantes de examen de nitrilo, disponibles en negro o azul."),
    ("GUANTE LATEX BLANCO", epp, 11990, 9990, "Guantes de látex color blanco."),
    ("GUANTE EXAMEN VINILO BLANCO/AZUL", epp, 9990, 8490, "Guantes de examen de vinilo, disponibles en blanco o azul."),
    ("COTONA DESECHABLE ROLLO 200UN", epp, 24990, 21990, "Cotonas desechables en rollo de 200 unidades."),
    ("PECHERA POLIET PVC", epp, 6990, 5990, "Pechera de polietileno PVC."),
    ("CUBRE ZAPATOS POLIETILENO AZUL 100UN", epp, 8990, 7490, "Cubre zapatos de polietileno azul, pack de 100 unidades."),
    ("CUBRE ZAPATOS POLIETILENO NEGRO 100UN", epp, 8990, 7490, "Cubre zapatos de polietileno negro, pack de 100 unidades."),
    ("MASCARILLA 3 PC/ELAST AZUL 50 UN", epp, 12990, 10990, "Mascarillas 3 pliegues con elástico azul, caja de 50 unidades."),
    ("REDECILLA DE NYLON PARA PELO 100 UN COLOR NEGRO", epp, 7990, 6490, "Redecillas de nylon para pelo, pack de 100 unidades, color negro."),
]

print(f"📦 Creando {len(productos_catalog)} productos...")

for nombre, categoria, precio, precio_desc, descripcion in productos_catalog:
    Producto.objects.create(
        nombre=nombre,
        categoria=categoria,
        precio=precio,
        precio_descuento=precio_desc,
        descripcion=descripcion,
        descripcion_corta=descripcion[:100] if descripcion else "",
        estado='activo',
        es_destacado=precio_desc is not None,  # Destacar productos con descuento
    )
    print(f"  ✓ {nombre}")

total_productos = Producto.objects.count()
print(f"\n✅ ¡Catálogo completo!")
print(f"📊 Total de productos cargados: {total_productos}")
print(f"📊 Total de categorías: {Categoria.objects.count()}")
print("\n🎉 Catálogo PDF importado exitosamente!")
print("   Ahora puedes acceder al catálogo en: http://localhost:8080/catalogo.html")

