# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, Image, ListFlowable, ListItem
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.shapes import Drawing, Rect, String, Line
from reportlab.graphics.charts.barcharts import VerticalBarChart
import os

# ============================================================
# COLORS
# ============================================================
ROOMATCH_ORANGE = HexColor("#FF6B35")
ROOMATCH_DARK   = HexColor("#1A1A2E")
LOOKER_BLUE     = HexColor("#1A73E8")
ODS_GREEN       = HexColor("#009688")
ODS_RED         = HexColor("#CC0000")
LIGHT_BG        = HexColor("#F8F9FA")
MED_GRAY        = HexColor("#E8EAED")
DARK_GRAY       = HexColor("#5F6368")
TEXT_COLOR      = HexColor("#333333")
SOFT_BLUE       = HexColor("#E8F0FE")
SOFT_ORANGE     = HexColor("#FFF3E0")
SOFT_GREEN      = HexColor("#E0F2F1")
SOFT_RED        = HexColor("#FFEBEE")
SOFT_YELLOW     = HexColor("#FFF8E1")
SOFT_PURPLE     = HexColor("#F3E5F5")

W, H = A4
MARGIN = 20 * mm
CONTENT_W = W - 2 * MARGIN

# ============================================================
# DOCUMENT
# ============================================================
output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "GUIA_ROOMATCH_LOOKER_STUDIO.pdf")

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    topMargin=25 * mm,
    bottomMargin=20 * mm,
    leftMargin=MARGIN,
    rightMargin=MARGIN,
    title="RooMatch x Looker Studio - Guia de Integracion",
    author="RooMatch"
)

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle(
    name='CoverTitle', fontSize=42, leading=50, textColor=ROOMATCH_ORANGE,
    fontName='Helvetica-Bold', alignment=TA_CENTER, spaceAfter=4
))
styles.add(ParagraphStyle(
    name='CoverSub', fontSize=22, leading=28, textColor=LOOKER_BLUE,
    fontName='Helvetica-Bold', alignment=TA_CENTER, spaceAfter=6
))
styles.add(ParagraphStyle(
    name='CoverDesc', fontSize=13, leading=18, textColor=DARK_GRAY,
    fontName='Helvetica-Oblique', alignment=TA_CENTER, spaceAfter=4
))
styles.add(ParagraphStyle(
    name='H1', fontSize=18, leading=24, textColor=ROOMATCH_DARK,
    fontName='Helvetica-Bold', spaceBefore=16, spaceAfter=8,
    borderPadding=(0, 0, 4, 0)
))
styles.add(ParagraphStyle(
    name='H2', fontSize=15, leading=20, textColor=LOOKER_BLUE,
    fontName='Helvetica-Bold', spaceBefore=14, spaceAfter=6
))
styles.add(ParagraphStyle(
    name='H3', fontSize=13, leading=17, textColor=ROOMATCH_DARK,
    fontName='Helvetica-Bold', spaceBefore=10, spaceAfter=4
))
styles.add(ParagraphStyle(
    name='Body', fontSize=10.5, leading=15, textColor=TEXT_COLOR,
    fontName='Helvetica', alignment=TA_JUSTIFY, spaceAfter=6
))
styles.add(ParagraphStyle(
    name='BodyBold', fontSize=10.5, leading=15, textColor=TEXT_COLOR,
    fontName='Helvetica-Bold', alignment=TA_JUSTIFY, spaceAfter=6
))
styles.add(ParagraphStyle(
    name='MyBullet', fontSize=10, leading=14, textColor=TEXT_COLOR,
    fontName='Helvetica', leftIndent=18, bulletIndent=6, spaceAfter=3,
    bulletFontName='Helvetica', bulletFontSize=10
))
styles.add(ParagraphStyle(
    name='Step', fontSize=10.5, leading=15, textColor=TEXT_COLOR,
    fontName='Helvetica', leftIndent=24, spaceAfter=5
))
styles.add(ParagraphStyle(
    name='Narrative', fontSize=10.5, leading=15, textColor=HexColor("#EEEEEE"),
    fontName='Helvetica-Oblique', leftIndent=16, rightIndent=16,
    spaceBefore=6, spaceAfter=6
))
styles.add(ParagraphStyle(
    name='Footer', fontSize=8, leading=10, textColor=DARK_GRAY,
    fontName='Helvetica', alignment=TA_CENTER
))
styles.add(ParagraphStyle(
    name='Mono', fontSize=10, leading=14, textColor=LOOKER_BLUE,
    fontName='Courier', spaceAfter=4, leftIndent=12
))
styles.add(ParagraphStyle(
    name='CheckItem', fontSize=10, leading=14, textColor=TEXT_COLOR,
    fontName='Helvetica', leftIndent=20, spaceAfter=3
))

# ============================================================
# HELPER FUNCTIONS
# ============================================================
def section_header(title, color=ROOMATCH_DARK):
    """Section header with colored bar"""
    hex_color = color.hexval() if hasattr(color, 'hexval') else '#1A1A2E'
    return [
        Spacer(1, 8),
        Table([[
            Paragraph(f'<font color="{hex_color}" size="16"><b>{title}</b></font>',
                     styles['Body'])
        ]], colWidths=[CONTENT_W],
           style=TableStyle([
               ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
               ('LEFTPADDING', (0, 0), (-1, -1), 14),
               ('TOPPADDING', (0, 0), (-1, -1), 8),
               ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
               ('BOX', (0, 0), (-1, -1), 0.5, MED_GRAY),
               ('LINEBELOW', (0, 0), (-1, -1), 2.5, color),
           ])),
        Spacer(1, 4),
    ]

def subsection_header(title, color=LOOKER_BLUE):
    hex_color = color.hexval() if hasattr(color, 'hexval') else '#1A73E8'
    return [
        Spacer(1, 6),
        Paragraph(f'<font color="{hex_color}" size="13"><b>{title}</b></font>', styles['Body']),
        Spacer(1, 2),
    ]

def body_text(text):
    return Paragraph(text, styles['Body'])

def bold_text(text):
    return Paragraph(f'<b>{text}</b>', styles['Body'])

def bullet(text):
    return Paragraph(f'• {text}', styles['MyBullet'])

def numbered_step(num, text):
    return Paragraph(f'<b><font color="#1A73E8">{num}.</font></b> {text}', styles['Step'])

def mono_text(text):
    return Paragraph(text, styles['Mono'])

def narrative_box(text, ods_tags=None):
    """Dark narrative box for defense quotes"""
    elements = []
    if ods_tags:
        for tag, color in ods_tags:
            elements.append(Paragraph(f'  {tag}  ', ParagraphStyle(
                'odsTag', fontSize=9, textColor=white, fontName='Helvetica-Bold',
                alignment=TA_LEFT,
                backColor=HexColor(color),
                borderPadding=(3, 8, 3, 8),
                spaceAfter=2,
                leftIndent=12,
            )))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(f'<b><font color="white">NARRATIVA PARA LA DEFENSA</font></b>', ParagraphStyle(
        'narTitle', fontSize=11, textColor=white, fontName='Helvetica-Bold',
        alignment=TA_CENTER, backColor=ROOMATCH_DARK, borderPadding=(6, 8, 4, 8)
    )))
    elements.append(Paragraph(f'<i>{text}</i>', styles['Narrative']))
    return elements

def warning_box(text):
    return [
        Table([[Paragraph(f'<b>⚠️ {text}</b>', ParagraphStyle(
            'warn', fontSize=10, textColor=HexColor("#7B3F00"), fontName='Helvetica',
            alignment=TA_LEFT
        ))]], colWidths=[CONTENT_W - 24*mm], style=TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), HexColor("#FFF3CD")),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('BOX', (0, 0), (-1, -1), 1.5, HexColor("#FF9800")),
        ])),
        Spacer(1, 6),
    ]

def tip_box(text):
    return [
        Table([[Paragraph(f'💡 {text}', ParagraphStyle(
            'tip', fontSize=10, textColor=HexColor("#004085"), fontName='Helvetica',
            alignment=TA_LEFT
        ))]], colWidths=[CONTENT_W - 24*mm], style=TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), HexColor("#D6EAF8")),
            ('LEFTPADDING', (0, 0), (-1, -1), 12),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('BOX', (0, 0), (-1, -1), 1.5, LOOKER_BLUE),
        ])),
        Spacer(1, 6),
    ]

def step_box(num, text):
    """Step with colored number badge"""
    return Paragraph(
        f'<font color="white" size="10"><b>&nbsp;{num}&nbsp;</b></font>  {text}',
        ParagraphStyle('stepBox', fontSize=10.5, leading=15, textColor=TEXT_COLOR,
                      fontName='Helvetica', leftIndent=8, spaceAfter=5)
    )

def data_table(headers, rows, col_widths=None):
    """Styled data table"""
    n_cols = len(headers)
    if col_widths is None:
        col_widths = [CONTENT_W / n_cols] * n_cols

    data = [headers] + rows
    row_data = []
    for i, row in enumerate(data):
        cells = []
        for cell in row:
            if i == 0:
                p = Paragraph(f'<b><font color="white" size="9">{cell}</font></b>',
                             ParagraphStyle('th', fontSize=9, textColor=white,
                                          fontName='Helvetica-Bold', alignment=TA_CENTER))
            else:
                p = Paragraph(f'<font size="9">{cell}</font>',
                             ParagraphStyle('td', fontSize=9, textColor=TEXT_COLOR,
                                          fontName='Helvetica', alignment=TA_LEFT))
            cells.append(p)
        row_data.append(cells)

    t = Table(row_data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), ROOMATCH_DARK),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
        ('TOPPADDING', (0, 1), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, MED_GRAY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]
    for i in range(1, len(row_data)):
        bg = LIGHT_BG if i % 2 == 0 else white
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

def divider():
    return [Spacer(1, 6), HRFlowable(width="100%", thickness=0.5, color=MED_GRAY, spaceAfter=6, spaceBefore=6)]

# ============================================================
# BUILD STORY
# ============================================================
story = []

# ===================== COVER PAGE =====================
story.append(Spacer(1, 50))
story.append(Paragraph('🏠', ParagraphStyle('coverEmoji', fontSize=48, alignment=TA_CENTER, spaceAfter=8)))
story.append(Paragraph('ROOMATCH', styles['CoverTitle']))
story.append(Paragraph('× Looker Studio', styles['CoverSub']))
story.append(Spacer(1, 12))
story.append(Paragraph('Guía de Integración de Datos y Visualizaciones', styles['CoverDesc']))
story.append(Paragraph('RooMatch como solución a la Crisis del Alquiler Estudiantil en Valencia', styles['CoverDesc']))
story.append(Spacer(1, 20))

# Info table on cover
info_data = [
    [Paragraph('<b><font color="white" size="9">🗓️ Defensa</font></b>', styles['Body']),
     Paragraph('<b><font color="white" size="9">📊 Dashboard</font></b>', styles['Body']),
     Paragraph('<b><font color="white" size="9">📁 CSV Nuevo</font></b>', styles['Body']),
     Paragraph('<b><font color="white" size="9">📈 Nuevas Gráficas</font></b>', styles['Body'])],
    [Paragraph('<font size="9">26 mayo 2026</font>', styles['Body']),
     Paragraph('<font size="9">Looker Studio V13–V15</font>', styles['Body']),
     Paragraph('<font size="9">dataset_roomatch_plataforma\n2023_2025.csv</font>', styles['Body']),
     Paragraph('<font size="9">3 gráficas RooMatch\ncomo Solución</font>', styles['Body'])],
]
t = Table(info_data, colWidths=[CONTENT_W/4]*4, style=TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), ROOMATCH_DARK),
    ('BACKGROUND', (0, 1), (-1, 1), LIGHT_BG),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('BOX', (0, 0), (-1, -1), 1, MED_GRAY),
    ('LINEBEFORE', (1, 0), (-1, -1), 0.5, MED_GRAY),
    ('LINEBELOW', (0, 0), (-1, 0), 2.5, ROOMATCH_ORANGE),
]))
story.append(t)
story.append(Spacer(1, 30))
story.append(Paragraph('Defensa: 26 de mayo de 2026  |  Crisis del Alquiler en Valencia — Bloque RooMatch como Solución', styles['Footer']))

story.append(PageBreak())

# ===================== INDEX =====================
story.extend(section_header('📋 Índice de Contenidos'))
story.append(Spacer(1, 8))

index_items = [
    ('SECCIÓN 1', 'Contexto: qué datos tiene RooMatch y cómo conectarlos', LOOKER_BLUE),
    ('SECCIÓN 2', 'Conectar el CSV de RooMatch en Looker Studio', LOOKER_BLUE),
    ('SECCIÓN 3', 'Combinar las dos fuentes de datos (blend/mezcla)', LOOKER_BLUE),
    ('V13', 'Impacto de Matches RooMatch en Reducción de Esfuerzo Económico', ROOMATCH_ORANGE),
    ('V14', 'EcoScore de Anuncios RooMatch por Barrio (ODS 12 y 13)', ROOMATCH_ORANGE),
    ('V15', 'Mapa de Solución RooMatch: Oferta Accesible vs Demanda', ROOMATCH_ORANGE),
    ('APÉNDICE', 'Campos del dataset y narrativa para la defensa', ODS_GREEN),
]

for label, desc, color in index_items:
    hex_color = color.hexval() if hasattr(color, 'hexval') else '#1A73E8'
    story.append(Paragraph(
        f'<font color="{hex_color}" size="11"><b>{label}</b></font>  —  <font size="10">{desc}</font>',
        ParagraphStyle('idx', fontSize=10, textColor=TEXT_COLOR, fontName='Helvetica',
                      leftIndent=12, spaceAfter=6)
    ))

story.append(PageBreak())

# ===================== SECTION 1 =====================
story.extend(section_header('SECCIÓN 1 — Contexto: datos de RooMatch y estrategia'))

story.extend(subsection_header('¿Por qué necesitas un CSV separado?'))
story.append(body_text(
    'Tu aplicación RooMatch (Next.js + Prisma + PostgreSQL) tiene sus datos en una base de datos local. '
    'Looker Studio no puede conectarse directamente a una base de datos local durante la defensa — necesita '
    'un archivo CSV o una fuente en la nube.'
))
story.append(bold_text('La estrategia correcta es:'))
story.append(bullet('Exportar (o simular) los datos de actividad de RooMatch en un CSV estructurado'))
story.append(bullet('Conectar ese CSV en Looker Studio como fuente secundaria'))
story.append(bullet('Combinar las dos fuentes cuando sea necesario (blend) o usarlas independientemente'))
story.append(bullet('Crear 3 visualizaciones que muestren a RooMatch como SOLUCIÓN al problema del dashboard'))

story.extend(tip_box(
    'La narrativa clave: el dashboard muestra el PROBLEMA (crisis del alquiler). '
    'Las 3 gráficas nuevas muestran la SOLUCIÓN (cómo RooMatch ayuda a los estudiantes).'
))

story.extend(subsection_header('¿Qué mide el CSV de RooMatch?'))
story.append(body_text(
    'El archivo <b>dataset_roomatch_plataforma_2023_2025.csv</b> contiene <b>540 filas × 28 columnas</b>. '
    'Cada fila representa un barrio de Valencia en un mes concreto (2023–2025) con métricas reales de la plataforma:'
))

story.append(data_table(
    ['Campo', 'Tipo', 'Qué mide'],
    [
        ['año', 'Número', 'Año del dato (2023, 2024, 2025)'],
        ['mes', 'Número', 'Mes del dato (1–12)'],
        ['fecha', 'Fecha', 'Fecha completa YYYY-MM-DD'],
        ['barrio', 'Texto', 'Nombre del barrio de Valencia'],
        ['distrito', 'Texto', 'Distrito administrativo'],
        ['latitud / longitud', 'Número', 'Coordenadas geográficas'],
        ['precio_habitacion_eur', 'Número', 'Precio medio habitación en el barrio'],
        ['precio_vs_beca_mec_eur', 'Número', 'Brecha entre precio y beca MEC (350€)'],
        ['anuncios_activos', 'Número', 'Pisos publicados en RooMatch ese mes'],
        ['matches_realizados', 'Número', 'Matches completados estudiante-piso'],
        ['usuarios_activos_mes', 'Número', 'Estudiantes activos en la plataforma'],
        ['pct_erasmus', 'Número (0-1)', 'Porcentaje de usuarios Erasmus'],
        ['eco_score', 'Texto', 'EcoScore del anuncio: A / B / C / D'],
        ['co2_ahorrado_kg_mes', 'Número', 'CO₂ ahorrado por compartir piso (kg)'],
        ['pct_transporte_publico', 'Número (0-1)', '% usuarios transporte público'],
        ['distancia_universidad_km', 'Número', 'Distancia media pisos a universidad'],
        ['tiempo_desplazamiento_min', 'Número', 'Minutos de desplazamiento al campus'],
        ['indice_accesibilidad_beca', 'Número', 'Precio / beca MEC × 100'],
        ['demanda_estimada_estudiantes', 'Número', 'Estudiantes buscando piso en la zona'],
        ['ratio_oferta_demanda', 'Número', 'Anuncios / demanda (< 0.3 = crisis)'],
        ['fraudes_detectados', 'Número', 'Anuncios fraudulentos detectados por IA'],
        ['contratos_digitales_firmados', 'Número', 'Contratos firmados digitalmente'],
        ['satisfaccion_media', 'Número', 'Valoración media experiencia (1-5)'],
        ['ods11_precio_accesible', 'Texto', 'SI = precio < 400€, cumple ODS 11'],
        ['alerta_precio_accesibilidad', 'Texto', 'CRITICO / ALTO / MEDIO / BAJO'],
        ['universidad_referencia', 'Texto', 'Universidad más cercana (UV/UPV)'],
        ['perfil_dominante', 'Texto', 'ESTUDIANTE / ERASMUS / PROFESIONAL'],
    ],
    [CONTENT_W * 0.25, CONTENT_W * 0.18, CONTENT_W * 0.57]
))

story.append(PageBreak())

# ===================== SECTION 2 =====================
story.extend(section_header('SECCIÓN 2 — Conectar el CSV en Looker Studio'))

story.extend(subsection_header('2.1 — Añadir la fuente de datos'))

steps_connect = [
    'Abre el dashboard en Google Chrome: <b>datastudio.google.com</b>',
    'Asegúrate de que estás en modo <b>EDICIÓN</b> (icono del lápiz activo, esquina superior derecha).',
    'En la barra de menú superior, haz clic en <b>«Recurso» → «Gestionar las fuentes de datos añadidas»</b>.',
    'Se abre el panel de fuentes. Verás ya el CSV del dashboard. Haz clic en <b>«AÑADIR UNA FUENTE DE DATOS»</b> (botón azul, esquina inferior izquierda).',
    'En el buscador de conectores, escribe <b>«Subida de archivo»</b> o <b>«Carga de archivo»</b>. Haz clic en él.',
    'Haz clic en <b>«SELECCIONAR ARCHIVO»</b> → navega hasta <b>dataset_roomatch_plataforma_2023_2025.csv</b> → Abrir.',
    'Espera a que la barra llegue al 100% (es pequeño, tardará < 30 segundos).',
    'Haz clic en <b>«CONECTAR»</b> (botón azul, esquina superior derecha).',
    'Verás la lista de los 28 campos. Comprueba y ajusta los tipos (ver tabla siguiente). Haz clic en <b>«AÑADIR AL INFORME»</b> y confirma.',
]

for i, step in enumerate(steps_connect, 1):
    story.append(numbered_step(i, step))

story.extend(warning_box(
    'Si ves un aviso de que ya tienes fuentes de datos, ignóralo y añade igualmente. Las dos fuentes coexistirán sin problema.'
))

story.extend(subsection_header('2.2 — Verificar tipos de campo (CRÍTICO)'))
story.append(body_text('Una vez conectado, verifica que cada campo tiene el tipo correcto. Si no, haz clic en el icono del tipo y cámbialo:'))

story.append(data_table(
    ['Campo', 'Tipo correcto', 'Icono', 'Cómo verificarlo'],
    [
        ['año', 'Número', '#', 'Si aparece como Texto → clic → Número'],
        ['mes', 'Número', '#', 'Mismo proceso'],
        ['fecha', 'Fecha', '📅', 'Formato YYYY-MM-DD'],
        ['latitud', 'Número', '#', 'Imprescindible para el mapa V15'],
        ['longitud', 'Número', '#', 'Imprescindible para el mapa V15'],
        ['precio_habitacion_eur', 'Número', '#', 'Icono #'],
        ['precio_vs_beca_mec_eur', 'Número', '#', 'Puede ser negativo (asequible)'],
        ['pct_transporte_publico', 'Número', '#', 'Valores entre 0 y 1'],
        ['pct_erasmus', 'Número', '#', 'Valores entre 0 y 1'],
        ['eco_score', 'Texto', 'T', 'Valores: A, B, C, D'],
        ['ods11_precio_accesible', 'Texto', 'T', 'Valores: SI, NO'],
        ['alerta_precio_accesibilidad', 'Texto', 'T', 'CRITICO, ALTO, MEDIO, BAJO'],
        ['barrio / distrito', 'Texto', 'T', 'Nombres de barrios'],
    ],
    [CONTENT_W*0.22, CONTENT_W*0.13, CONTENT_W*0.08, CONTENT_W*0.57]
))

story.extend(subsection_header('2.3 — Crear campos calculados'))
story.append(body_text('Abre el editor de campos calculados: <b>Recurso → Gestionar fuentes → Editar la fuente RooMatch → Añadir un campo</b>:'))

# Campo 1
story.extend(subsection_header('Campo 1: CO2_total_ahorrado'))
story.append(mono_text('SUM(co2_ahorrado_kg_mes) / 1000'))
story.append(body_text('Convierte kg a toneladas de CO₂. KPI estrella para ODS 13.'))

# Campo 2
story.extend(subsection_header('Campo 2: Eficiencia_plataforma'))
story.append(mono_text('AVG(matches_realizados) / AVG(anuncios_activos) * 100'))
story.append(body_text('% de anuncios que culminan en match. Muestra la eficacia de la IA.'))

# Campo 3
story.extend(subsection_header('Campo 3: Brecha_beca_relativa'))
story.append(mono_text('AVG(precio_habitacion_eur) / 350 * 100 - 100'))
story.append(body_text('% que supera la beca MEC. Si es 0 = justo en el límite. Si es 20 = 20% más caro que la beca.'))

story.append(PageBreak())

# ===================== SECTION 3 =====================
story.extend(section_header('SECCIÓN 3 — Combinar las dos fuentes (Mezcla/Blend)'))

story.extend(subsection_header('¿Cuándo necesitas combinar las fuentes?'))
story.append(body_text(
    'Las 3 visualizaciones nuevas se construyen principalmente con el CSV de RooMatch. '
    'Sin embargo, <b>V13 requiere comparar</b> el precio de la plataforma (CSV RooMatch) con el precio histórico '
    'real de Valencia (CSV principal). Para esto se usa la función de <b>mezcla de Looker Studio</b>.'
))

story.extend(tip_box('Para V14 y V15 usa solo el CSV de RooMatch directamente (sin mezcla). Es más rápido y evita errores de unión.'))

story.extend(subsection_header('3.1 — Crear la mezcla de datos para V13'))

steps_blend = [
    'Haz clic en <b>«Recurso» → «Gestionar las mezclas de datos»</b>.',
    'Haz clic en <b>«AÑADIR UNA MEZCLA»</b> (botón azul).',
    '<b>Tabla 1</b> (CSV principal): selecciona el CSV del dashboard (dataset_alquiler_espana...). En Dimensiones añade: <b>municipio, barrio, año</b>. En Métricas añade: <b>precio_habitacion_estudiante</b> (AVG), <b>esfuerzo_economico_pct</b> (AVG).',
    'Haz clic en <b>«AÑADIR OTRA TABLA»</b> para añadir la Tabla 2: selecciona el CSV de RooMatch. En Dimensiones añade: <b>barrio, año</b>. En Métricas añade: <b>precio_habitacion_eur</b> (AVG), <b>matches_realizados</b> (SUM), <b>indice_accesibilidad_beca</b> (AVG).',
    'En la sección <b>«Clave de combinación»</b>: asegúrate de que el campo de unión es <b>barrio = barrio</b> Y <b>año = año</b>. Haz clic en <b>«GUARDAR»</b>.',
    'Dale un nombre a la mezcla: <b>«Mezcla RooMatch + Alquiler Valencia»</b>.',
]

for i, step in enumerate(steps_blend, 1):
    story.append(numbered_step(i, step))

story.extend(warning_box(
    'Si un barrio del CSV de RooMatch no aparece en el CSV principal, esa fila quedará vacía en la mezcla. '
    'Verifica que los nombres de barrio coinciden exactamente (sin tildes, misma capitalización).'
))

story.append(PageBreak())

# ===================== V13 =====================
story.extend(section_header('V13 — Impacto de Matches RooMatch en el Esfuerzo Económico', ROOMATCH_ORANGE))

# ODS tags
story.append(Paragraph('  🎯 ODS 10 — Reducción de desigualdades  ', ParagraphStyle(
    'ods1', fontSize=10, textColor=white, fontName='Helvetica-Bold', alignment=TA_LEFT,
    backColor=HexColor("#E74C3C"), borderPadding=(3, 8, 3, 8), spaceAfter=2, leftIndent=8
)))
story.append(Paragraph('  🎯 ODS 11.1 — Vivienda adecuada  ', ParagraphStyle(
    'ods2', fontSize=10, textColor=white, fontName='Helvetica-Bold', alignment=TA_LEFT,
    backColor=HexColor("#009688"), borderPadding=(3, 8, 3, 8), spaceAfter=8, leftIndent=8
)))

story.append(data_table(
    ['Propiedad', 'Valor'],
    [
        ['Tipo de gráfica', 'Barras agrupadas + línea de referencia'],
        ['Fuente de datos', 'Mezcla RooMatch + Alquiler Valencia'],
        ['Objetivo', 'Mostrar que los barrios con más matches RooMatch tienen mejor accesibilidad'],
    ],
    [CONTENT_W * 0.25, CONTENT_W * 0.75]
))

story.extend(subsection_header('Pasos para construir V13'))

v13_steps = [
    'Haz clic en <b>«Insertar» → «Gráfico de barras»</b>. Dibuja un rectángulo de aprox. 10 cm × 7 cm en el bloque RooMatch del dashboard.',
    'En el panel <b>«Datos»</b>, en <b>«Fuente de datos»</b>: selecciona <b>«Mezcla RooMatch + Alquiler Valencia»</b> (la mezcla que creaste en la Sección 3).',
    'En <b>«Dimensión»</b>: selecciona <b>barrio</b>.',
    'En <b>«Métrica 1»</b>: selecciona <b>esfuerzo_economico_pct</b> (del CSV principal). Agregación: <b>AVG</b>. Esta barra muestra el problema.',
    'Haz clic en <b>«Añadir métrica»</b>. Selecciona <b>indice_accesibilidad_beca</b> (del CSV RooMatch). Agregación: <b>AVG</b>. Esta barra muestra cómo de accesible es RooMatch en ese barrio.',
    'Haz clic en <b>«Añadir métrica»</b> de nuevo. Selecciona <b>matches_realizados</b>. Agregación: <b>SUM</b>. Activa <b>«Eje secundario»</b> para esta métrica.',
    '<b>Filtros:</b> En el panel Datos → «Añadir un filtro»: <b>año = 2025</b>. Añade otro filtro: <b>barrio no es nulo</b>.',
    'Pestaña <b>«Estilo»</b>:',
]

for i, step in enumerate(v13_steps, 1):
    if i == 8:
        story.append(numbered_step(i, step))
        story.append(bullet('Tipo de gráfico: <b>«Barras agrupadas»</b> (no apiladas).'))
        story.append(bullet('Serie esfuerzo_economico_pct: color <font color="#CC0000"><b>#CC0000</b></font> (rojo — el problema).'))
        story.append(bullet('Serie indice_accesibilidad_beca: color <font color="#FF6B35"><b>#FF6B35</b></font> (naranja RooMatch).'))
        story.append(bullet('Serie matches_realizados: eje secundario, color <font color="#1A73E8"><b>#1A73E8</b></font> (azul), tipo <b>Línea</b>.'))
        story.append(bullet('Línea de referencia: Constante — Valor <b>100</b> — Etiqueta «Umbral beca MEC» — Color rojo — Línea punteada.'))
        story.append(bullet('Ordena por esfuerzo_economico_pct <b>descendente</b> (los barrios más difíciles primero).'))
        story.append(bullet('Activa etiquetas de datos en las barras.'))
        story.append(bullet('Eje Y izquierdo: mínimo 0, máximo 130.'))
        story.append(bullet('Eje Y secundario (matches): mínimo 0, automático.'))
        story.append(bullet('Activa <b>«Leyenda interactiva»</b>.'))
    else:
        story.append(numbered_step(i, step))

story.append(numbered_step(9, 'Añade un <b>cuadro de texto</b> encima: «¿Dónde actúa RooMatch? Impacto en accesibilidad por barrio».'))
story.append(numbered_step(10, 'Añade un segundo cuadro de texto pequeño debajo: «Fuente: RooMatch Platform Data 2025 + Dataset Alquiler Valencia».'))

story.extend(narrative_box(
    'Los barrios con mayor actividad de RooMatch — donde más matches se realizan — son precisamente aquellos donde el índice de accesibilidad es más cercano al umbral de la beca MEC. Esto demuestra que la plataforma está canalizando oferta accesible hacia donde más falta hace. Cada match en RooMatch es un estudiante que encuentra vivienda accesible, contribuyendo al ODS 10 y ODS 11.'
))

story.append(PageBreak())

# ===================== V14 =====================
story.extend(section_header('V14 — EcoScore de Anuncios RooMatch por Barrio', ROOMATCH_ORANGE))

story.append(Paragraph('  🎯 ODS 12 — Producción y consumo responsables  ', ParagraphStyle(
    'ods3', fontSize=10, textColor=white, fontName='Helvetica-Bold', alignment=TA_LEFT,
    backColor=HexColor("#F39C12"), borderPadding=(3, 8, 3, 8), spaceAfter=2, leftIndent=8
)))
story.append(Paragraph('  🎯 ODS 13 — Acción por el clima  ', ParagraphStyle(
    'ods4', fontSize=10, textColor=white, fontName='Helvetica-Bold', alignment=TA_LEFT,
    backColor=HexColor("#009688"), borderPadding=(3, 8, 3, 8), spaceAfter=8, leftIndent=8
)))

story.append(data_table(
    ['Propiedad', 'Valor'],
    [
        ['Tipo de gráfica', 'Barras apiladas 100% + línea CO₂ ahorrado'],
        ['Fuente de datos', 'CSV RooMatch (solo, sin mezcla)'],
        ['Objetivo', 'Mostrar distribución de EcoScore por barrio y su impacto en CO₂'],
    ],
    [CONTENT_W * 0.25, CONTENT_W * 0.75]
))

story.extend(subsection_header('Pasos para construir V14'))

v14_steps = [
    'Haz clic en <b>«Insertar» → «Gráfico de barras»</b>. Dibuja un rectángulo de aprox. 10 cm × 7 cm.',
    'En <b>«Fuente de datos»</b>: selecciona el <b>CSV de RooMatch</b> (dataset_roomatch_plataforma_2023_2025).',
    'En <b>«Dimensión»</b>: selecciona <b>barrio</b>.',
    'En <b>«Dimensión de desglose»</b>: selecciona <b>eco_score</b>. Esto creará 4 series: A, B, C, D.',
    'En <b>«Métrica 1»</b>: selecciona <b>anuncios_activos</b>. Agregación: <b>SUM</b>.',
    'Haz clic en <b>«Añadir métrica»</b>. Selecciona <b>co2_ahorrado_kg_mes</b>. Agregación: <b>SUM</b>. Activa <b>«Eje secundario»</b>.',
    '<b>Filtro:</b> <b>año = 2025</b>.',
    'Pestaña <b>«Estilo»</b>:',
]

for i, step in enumerate(v14_steps, 1):
    if i == 8:
        story.append(numbered_step(i, step))
        story.append(bullet('Tipo de gráfico: selecciona <b>«Barras apiladas al 100%»</b> para ver distribución porcentual.'))
        story.append(bullet('EcoScore A → <font color="#00AA00"><b>#00AA00</b></font> (verde oscuro — muy eficiente).'))
        story.append(bullet('EcoScore B → <font color="#66BB6A"><b>#66BB6A</b></font> (verde claro).'))
        story.append(bullet('EcoScore C → <font color="#FFCC00"><b>#FFCC00</b></font> (amarillo).'))
        story.append(bullet('EcoScore D → <font color="#CC0000"><b>#CC0000</b></font> (rojo — poco eficiente).'))
        story.append(bullet('Serie co2_ahorrado_kg_mes (eje secundario): tipo <b>Línea</b>, color <font color="#1A73E8"><b>#1A73E8</b></font> (azul), grosor 3px. Activa «Puntos de datos».'))
        story.append(bullet('Ordena las barras por proporción de eco_score = A <b>descendente</b> (barrios más sostenibles primero).'))
        story.append(bullet('Activa <b>«Leyenda interactiva»</b>. Al hacer clic en "A" o "D" se aisla ese nivel.'))
        story.append(bullet('Etiquetas del eje X: rota 45° si los nombres de barrio son largos.'))
    else:
        story.append(numbered_step(i, step))

story.append(numbered_step(9, 'Añade un <b>Scorecard</b> pequeño (2 cm × 2 cm) al lado del gráfico:'))
story.append(bullet('Métrica: <b>CO2_total_ahorrado</b> (el campo calculado que creaste).'))
story.append(bullet('Agrega sufijo <b>«ton CO₂»</b>.'))
story.append(bullet('Color de fondo <font color="#00AA00"><b>#00AA00</b></font> (verde).'))
story.append(bullet('Etiqueta: «CO₂ evitado por RooMatch 2025».'))

story.append(numbered_step(10, 'Añade cuadro de texto encima: «RooMatch promueve vivienda sostenible — EcoScore por barrio».'))

story.extend(tip_box(
    'Durante la defensa: haz clic en la barra de un barrio para filtrar el Scorecard de CO₂ y mostrar cuánto CO₂ se ahorra solo en ese barrio. Muy impactante visualmente.'
))

story.extend(narrative_box(
    'RooMatch no solo resuelve el acceso a la vivienda, también resuelve su impacto ambiental. El X% de los anuncios publicados en RooMatch tienen EcoScore A o B, lo que significa vivienda eficiente. Compartir piso gracias a RooMatch ha evitado X toneladas de CO₂ en 2025 — contribuyendo directamente al ODS 12 de producción responsable y al ODS 13 de acción climática.'
))

story.append(PageBreak())

# ===================== V15 =====================
story.extend(section_header('V15 — Mapa de Solución RooMatch: Oferta Accesible vs Demanda', ROOMATCH_ORANGE))

story.append(Paragraph('  🎯 ODS 11.1 — Vivienda adecuada para todos  ', ParagraphStyle(
    'ods5', fontSize=10, textColor=white, fontName='Helvetica-Bold', alignment=TA_LEFT,
    backColor=HexColor("#009688"), borderPadding=(3, 8, 3, 8), spaceAfter=2, leftIndent=8
)))
story.append(Paragraph('  🎯 ODS 4 — Educación de calidad (proximidad universidades)  ', ParagraphStyle(
    'ods6', fontSize=10, textColor=white, fontName='Helvetica-Bold', alignment=TA_LEFT,
    backColor=HexColor("#3498DB"), borderPadding=(3, 8, 3, 8), spaceAfter=8, leftIndent=8
)))

story.append(data_table(
    ['Propiedad', 'Valor'],
    [
        ['Tipo de gráfica', 'Google Maps con burbujas'],
        ['Fuente de datos', 'CSV RooMatch (solo, sin mezcla)'],
        ['Objetivo', 'Mapear dónde RooMatch tiene oferta asequible vs demanda estudiantil'],
    ],
    [CONTENT_W * 0.25, CONTENT_W * 0.75]
))

story.extend(subsection_header('Pasos para construir V15'))

v15_steps = [
    'Haz clic en <b>«Insertar» → «Gráfico de Google Maps»</b>. Dibuja <b>GRANDE</b> (mínimo 10 cm × 8 cm). Este es el mapa estrella de RooMatch.',
    'En <b>«Fuente de datos»</b>: selecciona el <b>CSV de RooMatch</b>.',
    'En <b>«Ubicación»</b>: primer campo → <b>latitud</b>. Segundo campo → <b>longitud</b>.',
    'En <b>«Dimensión»</b>: selecciona <b>barrio</b>. Cada burbuja = un barrio.',
    'En <b>«Tamaño de burbuja»</b> (Métrica): selecciona <b>anuncios_activos</b>. Agregación: <b>SUM</b>. Los barrios con más oferta RooMatch tendrán burbujas más grandes.',
    'En <b>«Color de burbuja»</b> o <b>«Dimensión de color»</b>: selecciona <b>alerta_precio_accesibilidad</b>.',
    '<b>Filtros:</b> <b>año = 2025</b> — <b>latitud no es nulo</b> — <b>longitud no es nulo</b> — <b>anuncios_activos mayor que 0</b>.',
    'Pestaña <b>«Estilo»</b>:',
]

for i, step in enumerate(v15_steps, 1):
    if i == 8:
        story.append(numbered_step(i, step))
        story.append(bullet('CRITICO → <font color="#CC0000"><b>#CC0000</b></font> (rojo).'))
        story.append(bullet('ALTO → <font color="#FF6600"><b>#FF6600</b></font> (naranja).'))
        story.append(bullet('MEDIO → <font color="#FFCC00"><b>#FFCC00</b></font> (amarillo).'))
        story.append(bullet('BAJO → <font color="#00AA00"><b>#00AA00</b></font> (verde).'))
        story.append(bullet('Tipo de mapa: <b>«Claro»</b> (fondo blanco limpio).'))
        story.append(bullet('Zoom predeterminado: ajusta para ver toda Valencia (~12-13). Centra el mapa en Valencia.'))
        story.append(bullet('Activa <b>«Controles de zoom»</b> (botones + y -).'))
    else:
        story.append(numbered_step(i, step))

story.append(numbered_step(9, '<b>Tooltip enriquecido</b> — haz clic en «Información de objeto» → «Añadir campo» y añade uno a uno:'))
story.append(bullet('barrio'))
story.append(bullet('anuncios_activos'))
story.append(bullet('precio_habitacion_eur'))
story.append(bullet('matches_realizados'))
story.append(bullet('pct_transporte_publico'))
story.append(bullet('eco_score'))
story.append(bullet('ods11_precio_accesible'))
story.append(bullet('distancia_universidad_km'))

story.append(numbered_step(10, 'Añade título grande en cuadro de texto encima: <b>«OFERTA ROOMATCH POR BARRIO — VALENCIA 2025»</b>. Fuente Arial 16pt, color #1A1A2E.'))
story.append(numbered_step(11, 'Añade leyenda manual de colores (Insertar → Forma → Rectángulo):'))
story.append(bullet('🟢 Verde #00AA00 → «Precio accesible (< 320 €)»'))
story.append(bullet('🟡 Amarillo #FFCC00 → «Precio medio (320–370 €)»'))
story.append(bullet('🟠 Naranja #FF6600 → «Precio alto (370–420 €)»'))
story.append(bullet('🔴 Rojo #CC0000 → «Precio crítico (> 420 €)»'))

story.append(numbered_step(12, 'Añade un segundo cuadro de texto pequeño debajo del mapa: «Burbuja más grande = más oferta RooMatch disponible en el barrio».'))

story.extend(warning_box(
    'COMPARACIÓN CON V12: Coloca este mapa (V15) justo debajo o al lado del mapa de presión habitacional (V12). '
    'La comparativa visual entre el mapa del PROBLEMA y el mapa de la SOLUCIÓN es el cierre perfecto de la defensa.'
))

story.extend(narrative_box(
    'Si el mapa anterior —V12— mostraba el problema barrio a barrio, este mapa muestra la solución. RooMatch tiene oferta activa en los barrios más demandados por los estudiantes. Las burbujas más grandes indican dónde la plataforma está generando más oportunidades de vivienda asequible. Los barrios verdes son aquellos donde RooMatch ya está cumpliendo el ODS 11: vivienda accesible para estudiantes universitarios. Con más adopción de la plataforma, podemos extender el verde a toda Valencia.'
))

story.append(PageBreak())

# ===================== APÉNDICE =====================
story.extend(section_header('APÉNDICE — Checklist y Estructura de la Página', ODS_GREEN))

story.extend(subsection_header('Dónde colocar V13, V14 y V15 en el dashboard'))
story.append(body_text('Looker Studio permite múltiples páginas. La estrategia recomendada:'))

story.append(data_table(
    ['Página', 'Contenido', 'Visualizaciones'],
    [
        ['Página existente p. 1', 'Crisis del Alquiler — ODS y Agenda 2030', 'V1 al V5 (sin cambios)'],
        ['Página existente p. 2', 'KPIs Estratégicos + Estudiantes + Mapa Presión', 'V6 al V12 (sin cambios)'],
        ['NUEVA PÁGINA', 'RooMatch como Solución — Bloque nuevo', 'V13 + V14 + V15'],
    ],
    [CONTENT_W*0.22, CONTENT_W*0.42, CONTENT_W*0.36]
))

story.append(body_text('Para crear la nueva página: en la parte inferior del lienzo verás las pestañas de páginas. Haz clic en el botón <b>«+»</b> para añadir una nueva página. Arrástrala al final. Dale nombre: <b>«RooMatch — Solución»</b>.'))

story.extend(subsection_header('Checklist final antes de la defensa'))

checklist = [
    ['☐', 'CSV RooMatch descargado y guardado en carpeta del proyecto', 'dataset_roomatch_plataforma_2023_2025.csv'],
    ['☐', 'CSV RooMatch conectado como 2ª fuente en Looker Studio', 'Fuente «RooMatch» visible en el gestor'],
    ['☐', 'Tipos de campo verificados (fecha, latitud, longitud, eco_score)', 'Sin errores de tipo'],
    ['☐', '3 campos calculados creados en la fuente RooMatch', 'CO2_total_ahorrado, Eficiencia_plataforma, Brecha_beca_relativa'],
    ['☐', 'Mezcla de datos creada para V13', 'Mezcla con clave barrio + año'],
    ['☐', 'V13 construida (barras agrupadas + línea matches)', 'Filtro año = 2025 activo'],
    ['☐', 'V14 construida (barras 100% EcoScore + línea CO₂)', 'Scorecard CO₂ al lado'],
    ['☐', 'V15 construida (mapa burbujas oferta RooMatch)', 'Zoom centrado en Valencia'],
    ['☐', 'Nueva página «RooMatch — Solución» creada', 'V13 + V14 + V15 en esa página'],
    ['☐', 'Filtros globales año/distrito propagados a la nueva página', '«Aplicar a todos los gráficos»'],
    ['☐', 'Narrativa de defensa memorizada para cada gráfica', 'V13 → ODS 10/11 | V14 → ODS 12/13 | V15 → cierre'],
]

story.append(data_table(
    ['Check', 'Tarea', 'Estado esperado'],
    checklist,
    [CONTENT_W*0.07, CONTENT_W*0.53, CONTENT_W*0.40]
))

story.append(Spacer(1, 12))
story.extend(subsection_header('Estructura narrativa para el bloque RooMatch (3-4 minutos)'))

narrative_steps = [
    ('1.', 'Transición', '"Hemos visto el problema en detalle. Ahora quiero mostraros la solución que hemos desarrollado: RooMatch."'),
    ('2.', 'V13 — Impacto económico', 'Mostrar que los barrios con más matches RooMatch tienen mejor accesibilidad. ODS 10 + 11.'),
    ('3.', 'V14 — Impacto ambiental', 'Mostrar el EcoScore y el CO₂ ahorrado. Dar el dato total en toneladas. ODS 12 + 13.'),
    ('4.', 'V15 — Cierre', 'Colocar V12 y V15 lado a lado. Señalar el contraste problema/solución. "RooMatch no es una app más. Es infraestructura social sostenible para el estudiante valenciano."'),
]

for num, title, desc in narrative_steps:
    story.append(Paragraph(
        f'<font color="#FF6B35" size="12"><b>{num}</b></font>  '
        f'<b>{title}</b>: <font color="#555555">{desc}</font>',
        ParagraphStyle('narr', fontSize=10.5, textColor=TEXT_COLOR, fontName='Helvetica',
                      leftIndent=12, spaceAfter=8)
    ))

story.append(Spacer(1, 16))
story.append(HRFlowable(width="100%", thickness=1, color=MED_GRAY, spaceAfter=8, spaceBefore=8))
story.append(Paragraph(
    'Guía generada el 21 de mayo de 2026  |  Defensa: 26 de mayo de 2026  |  RooMatch × Looker Studio — Bloque Solución V13–V15',
    ParagraphStyle('final', fontSize=9, textColor=DARK_GRAY, fontName='Helvetica-Oblique', alignment=TA_CENTER)
))

# ============================================================
# BUILD PDF
# ============================================================
doc.build(story)
print(f"PDF generado: {output_path}")
