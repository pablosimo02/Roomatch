# 🏠 RooMatch × Looker Studio — Guía de Integración

> **Defensa: 26 de mayo de 2026** | Dashboard V13–V15 | CSV: `dataset_roomatch_plataforma_2023_2025.csv`

---

## 📋 Índice

1. [Contexto: qué datos tiene RooMatch](#1-contexto)
2. [Conectar el CSV en Looker Studio](#2-conectar-csv)
3. [Combinar fuentes de datos (blend)](#3-combinar-fuentes)
4. [V13 — Impacto de Matches en Accesibilidad](#v13)
5. [V14 — EcoScore por Barrio + CO₂](#v14)
6. [V15 — Mapa de Oferta RooMatch](#v15)
7. [Checklist final](#checklist)

---

## 1. Contexto <a id="1-contexto"></a>

### Por qué necesitas un CSV separado

RooMatch tiene sus datos en base de datos local (PostgreSQL + Prisma). Looker Studio no puede conectarse a una DB local durante la defensa. La estrategia:

1. **CSV RooMatch** → fuente secundaria en Looker Studio
2. **CSV principal** → fuente existente (crisis del alquiler)
3. **Mezcla (blend)** → solo para V13 (comparar precios)
4. **V14 y V15** → usan solo el CSV RooMatch (sin mezcla)

### Estructura del CSV RooMatch

**540 filas × 28 columnas** | 15 barrios × 36 meses (2023–2025)

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| año | Número | 2023, 2024, 2025 |
| mes | Número | 1–12 |
| fecha | Fecha | 2023-01-01 |
| barrio | Texto | Ruzafa, Benimaclet, El Carmen... |
| distrito | Texto | Quatre Carreres, Ciutat Vella... |
| latitud | Número | 39.4635 |
| longitud | Número | -0.3765 |
| precio_habitacion_eur | Número | 340–470 |
| precio_vs_beca_mec_eur | Número | -10 a +120 (brecha vs 350€) |
| anuncios_activos | Número | 20–60 |
| matches_realizados | Número | 5–35 |
| usuarios_activos_mes | Número | 50–200 |
| pct_erasmus | Número (0–1) | 0.10–0.45 |
| eco_score | Texto | A, B, C, D |
| co2_ahorrado_kg_mes | Número | 100–800 kg |
| pct_transporte_publico | Número (0–1) | 0.35–0.85 |
| distancia_universidad_km | Número | 1.0–5.0 |
| tiempo_desplazamiento_min | Número | 10–50 |
| indice_accesibilidad_beca | Número | 80–135 |
| demanda_estimada_estudiantes | Número | 150–800 |
| ratio_oferta_demanda | Número | 0.05–0.20 |
| fraudes_detectados | Número | 0–4 |
| contratos_digitales_firmados | Número | 3–25 |
| satisfaccion_media | Número | 3.0–4.8 |
| ods11_precio_accesible | Texto | SI / NO |
| alerta_precio_accesibilidad | Texto | CRITICO / ALTO / MEDIO / BAJO |
| universidad_referencia | Texto | UV / UPV |
| perfil_dominante | Texto | ESTUDIANTE / ERASMUS / JOVEN_PROFESIONAL |

---

## 2. Conectar el CSV en Looker Studio <a id="2-conectar-csv"></a>

### Paso 1: Subir el archivo

1. Abre tu dashboard en Looker Studio: [datastudio.google.com](https://datastudio.google.com)
2. Modo **EDICIÓN** (icono lápiz, esquina superior derecha)
3. Menú superior → **Recurso** → **Gestionar las fuentes de datos añadidas**
4. Botón azul **AÑADIR UNA FUENTE DE DATOS** (esquina inferior izquierda)
5. Busca conector **Subida de archivo** → clic
6. **SELECCIONAR ARCHIVO** → elige `dataset_roomatch_plataforma_2023_2025.csv`
7. Espera carga 100% → clic en **CONECTAR**
8. Clic en **AÑADIR AL INFORME** → confirma

### Paso 2: Verificar tipos de campo (CRÍTICO)

| Campo | Tipo correcto | Icono |
|-------|--------------|-------|
| año | Número | # |
| mes | Número | # |
| fecha | Fecha | 📅 |
| latitud | Número | # |
| longitud | Número | # |
| precio_habitacion_eur | Número | # |
| precio_vs_beca_mec_eur | Número | # |
| anuncios_activos | Número | # |
| matches_realizados | Número | # |
| usuarios_activos_mes | Número | # |
| pct_erasmus | Número | # |
| eco_score | Texto | T |
| co2_ahorrado_kg_mes | Número | # |
| pct_transporte_publico | Número | # |
| distancia_universidad_km | Número | # |
| tiempo_desplazamiento_min | Número | # |
| indice_accesibilidad_beca | Número | # |
| demanda_estimada_estudiantes | Número | # |
| ratio_oferta_demanda | Número | # |
| fraudes_detectados | Número | # |
| contratos_digitales_firmados | Número | # |
| satisfaccion_media | Número | # |
| ods11_precio_accesible | Texto | T |
| alerta_precio_accesibilidad | Texto | T |
| universidad_referencia | Texto | T |
| perfil_dominante | Texto | T |

> ⚠️ Si algún campo aparece como Texto cuando debe ser Número → clic en el icono → cambiar a Número

### Paso 3: Crear campos calculados

Ve a **Recurso → Gestionar fuentes → Editar fuente RooMatch → Añadir un campo**:

#### Campo 1: `CO2_total_ahorrado`
```
SUM(co2_ahorrado_kg_mes) / 1000
```
→ Convierte kg a toneladas de CO₂. KPI para ODS 13.

#### Campo 2: `Eficiencia_plataforma`
```
AVG(matches_realizados) / AVG(anuncios_activos) * 100
```
→ % de anuncios que culminan en match.

#### Campo 3: `Brecha_beca_relativa`
```
AVG(precio_habitacion_eur) / 350 * 100 - 100
```
→ % que supera la beca MEC.

---

## 3. Combinar fuentes (blend) <a id="3-combinar-fuentes"></a>

> Solo necesario para **V13**. V14 y V15 usan solo CSV RooMatch.

1. **Recurso → Gestionar las mezclas de datos**
2. **AÑADIR UNA MEZCLA**
3. **Tabla 1** (CSV principal):
   - Dimensiones: `municipio`, `barrio`, `año`
   - Métricas: `precio_habitacion_estudiante` (AVG), `esfuerzo_economico_pct` (AVG)
4. **AÑADIR OTRA TABLA** → **Tabla 2** (CSV RooMatch):
   - Dimensiones: `barrio`, `año`
   - Métricas: `precio_habitacion_eur` (AVG), `matches_realizados` (SUM), `indice_accesibilidad_beca` (AVG)
5. **Clave de combinación**: `barrio = barrio` Y `año = año`
6. **GUARDAR** → Nombre: `Mezcla RooMatch + Alquiler Valencia`

> ⚠️ Los nombres de barrio deben coincidir exactamente entre los dos CSV (sin tildes, misma capitalización).

---

## V13 — Impacto de Matches RooMatch en Accesibilidad <a id="v13"></a>

🎯 **ODS 10** (Reducción desigualdades) + **ODS 11.1** (Vivienda adecuada)

**Tipo:** Barras agrupadas + línea de referencia
**Fuente:** Mezcla RooMatch + Alquiler Valencia

### Pasos

1. **Insertar → Gráfico de barras** → dibuja ~10cm × 7cm
2. **Fuente de datos:** `Mezcla RooMatch + Alquiler Valencia`
3. **Dimensión:** `barrio`
4. **Métrica 1:** `esfuerzo_economico_pct` (AVG) → barras rojas (el problema)
5. **Métrica 2:** `indice_accesibilidad_beca` (AVG) → barras naranjas (precio RooMatch)
6. **Métrica 3:** `matches_realizados` (SUM) → **activa Eje secundario** → línea azul
7. **Filtros:** `año = 2025`, `barrio no es nulo`
8. **Estilo:**
   - Tipo: **Barras agrupadas** (no apiladas)
   - esfuerzo_economico_pct: color `#CC0000` (rojo)
   - indice_accesibilidad_beca: color `#FF6B35` (naranja RooMatch)
   - matches_realizados: línea `#1A73E8` (azul), eje secundario
   - Línea de referencia: valor `100`, etiqueta "Umbral beca MEC", roja punteada
   - Ordenar por esfuerzo_economico_pct descendente
   - Eje Y izquierdo: 0–130
   - Activar **Leyenda interactiva**
9. **Título:** `¿Dónde actúa RooMatch? Impacto en accesibilidad por barrio`

### 📢 Narrativa para la defensa

> *"Los barrios con mayor actividad de RooMatch — donde más matches se realizan — son precisamente aquellos donde el índice de accesibilidad es más cercano al umbral de la beca MEC. Esto demuestra que la plataforma está canalizando oferta accesible hacia donde más falta hace. Cada match en RooMatch es un estudiante que encuentra vivienda accesible."*

---

## V14 — EcoScore por Barrio + CO₂ Ahorrado <a id="v14"></a>

🎯 **ODS 12** (Producción responsable) + **ODS 13** (Acción climática)

**Tipo:** Barras apiladas 100% + línea CO₂
**Fuente:** CSV RooMatch (solo, sin mezcla)

### Pasos

1. **Insertar → Gráfico de barras** → dibuja ~10cm × 7cm
2. **Fuente de datos:** `dataset_roomatch_plataforma_2023_2025`
3. **Dimensión:** `barrio`
4. **Dimensión de desglose:** `eco_score` → crea 4 series: A, B, C, D
5. **Métrica 1:** `anuncios_activos` (SUM)
6. **Métrica 2:** `co2_ahorrado_kg_mes` (SUM) → **activa Eje secundario**
7. **Filtro:** `año = 2025`
8. **Estilo:**
   - Tipo: **Barras apiladas al 100%**
   - EcoScore A: `#00AA00` (verde oscuro)
   - EcoScore B: `#66BB6A` (verde claro)
   - EcoScore C: `#FFCC00` (amarillo)
   - EcoScore D: `#CC0000` (rojo)
   - CO₂ línea: `#1A73E8` (azul), grosor 3px, puntos de datos activados
   - Ordenar por proporción de eco_score = A descendente
   - Activar **Leyenda interactiva**
9. **Scorecard al lado** (2cm × 2cm):
   - Métrica: `CO2_total_ahorrado` (campo calculado)
   - Sufijo: `ton CO₂`
   - Fondo: `#00AA00`
   - Etiqueta: `CO₂ evitado por RooMatch 2025`
10. **Título:** `RooMatch promueve vivienda sostenible — EcoScore por barrio`

### 📢 Narrativa para la defensa

> *"RooMatch no solo resuelve el acceso a la vivienda, también resuelve su impacto ambiental. El X% de los anuncios publicados en RooMatch tienen EcoScore A o B, lo que significa vivienda eficiente. Compartir piso gracias a RooMatch ha evitado X toneladas de CO₂ en 2025 — contribuyendo directamente al ODS 12 y al ODS 13."*

---

## V15 — Mapa de Oferta RooMatch por Barrio <a id="v15"></a>

🎯 **ODS 11.1** (Vivienda adecuada) + **ODS 4** (Educación — proximidad universidades)

**Tipo:** Google Maps con burbujas
**Fuente:** CSV RooMatch (solo, sin mezcla)

### Pasos

1. **Insertar → Gráfico de Google Maps** → dibuja GRANDE (mínimo 10cm × 8cm)
2. **Fuente de datos:** `dataset_roomatch_plataforma_2023_2025`
3. **Ubicación:** Campo 1 = `latitud`, Campo 2 = `longitud`
4. **Dimensión:** `barrio` (cada burbuja = un barrio)
5. **Tamaño de burbuja:** `anuncios_activos` (SUM) → barrios con más oferta = burbujas más grandes
6. **Color de burbuja:** `alerta_precio_accesibilidad`
7. **Filtros:** `año = 2025`, `latitud no es nulo`, `longitud no es nulo`, `anuncios_activos > 0`
8. **Estilo:**
   - CRITICO: `#CC0000` (rojo)
   - ALTO: `#FF6600` (naranja)
   - MEDIO: `#FFCC00` (amarillo)
   - BAJO: `#00AA00` (verde)
   - Tipo de mapa: **Claro** (fondo blanco)
   - Zoom: ~12-13, centrado en Valencia
   - Activar controles de zoom (+/-)
9. **Tooltip enriquecido** (Información de objeto → Añadir campo):
   - barrio
   - anuncios_activos
   - precio_habitacion_eur
   - matches_realizados
   - pct_transporte_publico
   - eco_score
   - ods11_precio_accesible
   - distancia_universidad_km
10. **Título:** `OFERTA ROOMATCH POR BARRIO — VALENCIA 2025`
11. **Leyenda manual** (Insertar → Forma → Rectángulo):
    - 🟢 Verde `#00AA00` → Precio accesible (< 320 €)
    - 🟡 Amarillo `#FFCC00` → Precio medio (320–370 €)
    - 🟠 Naranja `#FF6600` → Precio alto (370–420 €)
    - 🔴 Rojo `#CC0000` → Precio crítico (> 420 €)
12. **Nota debajo:** `Burbuja más grande = más oferta RooMatch disponible`

> 💡 **COMPARACIÓN CON V12:** Coloca V15 justo debajo o al lado del mapa de presión habitacional (V12). La comparativa visual problema/solución es el cierre perfecto.

### 📢 Narrativa — Cierre de la defensa

> *"Si el mapa anterior —V12— mostraba el problema barrio a barrio, este mapa muestra la solución. RooMatch tiene oferta activa en los barrios más demandados. Las burbujas más grandes indican dónde la plataforma está generando más oportunidades de vivienda asequible. Los barrios verdes son aquellos donde RooMatch ya está cumpliendo el ODS 11. Con más adopción, podemos extender el verde a toda Valencia."*

---

## Checklist Final <a id="checklist"></a>

| # | Tarea | Estado |
|---|-------|--------|
| 1 | CSV RooMatch conectado como 2ª fuente | ☐ |
| 2 | Tipos de campo verificados (fecha, lat, lng, eco_score) | ☐ |
| 3 | 3 campos calculados creados (CO2, Eficiencia, Brecha) | ☐ |
| 4 | Mezcla creada para V13 (clave: barrio + año) | ☐ |
| 5 | V13 construida (barras + línea matches) | ☐ |
| 6 | V14 construida (barras 100% + línea CO₂ + scorecard) | ☐ |
| 7 | V15 construida (mapa burbujas centrado en Valencia) | ☐ |
| 8 | Nueva página «RooMatch — Solución» creada | ☐ |
| 9 | Filtros globales propagados a nueva página | ☐ |
| 10 | Narrativa memorizada para cada gráfica | ☐ |

### Estructura narrativa (3-4 minutos)

1. **Transición:** *"Hemos visto el problema. Ahora la solución: RooMatch."*
2. **V13:** Mostrar barrios con más matches → mejor accesibilidad. ODS 10 + 11.
3. **V14:** EcoScore + CO₂ ahorrado en toneladas. ODS 12 + 13.
4. **V15 (cierre):** V12 y V15 lado a lado. Problema vs solución. *"RooMatch no es una app más. Es infraestructura social sostenible para el estudiante valenciano."*
