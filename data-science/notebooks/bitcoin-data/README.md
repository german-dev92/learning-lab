Bitácora – Proyecto de Predicción Cripto (Bitcoin)
📅 Fecha: 26 de junio de 2025
📂 Ejercicio: Predicción de subida/bajada del precio de criptomonedas
🔗 Datos: CoinGecko API – /coins/markets

✅ Objetivo
Construir un modelo predictivo para clasificar si el precio de una criptomoneda subirá o bajará en 24h, usando datos del mercado cripto actual.

🔍 Datos Usados:

Precio actual

Capitalización de mercado

Volumen de comercio

Ranking de mercado

Cambio desde el ATH

Variable objetivo: sube (1 si el precio subió en 24h, 0 si no)

🧪 Modelos Entrenados:

Árbol de decisión (depth = 3)

Precisión: 0.95

Cross-validation: 0.93

Random Forest (100 estimadores)

Precisión: 0.95

📊 Insights:

Ranking de mercado y distancia al ATH fueron las variables más influyentes.

Modelos simples ya logran buena precisión, lo que sugiere potencial para prototipos rápidos o señales de trading.

Visualización de precios con matplotlib fue útil para entender el comportamiento del activo.

✍️ Aprendizajes:

Pude conectar API externa, preparar datos y entrenar modelos supervisados básicos.

Aprendí a comparar modelos y analizar importancia de variables.

Fortalecí el pensamiento lógico sobre predicción y clasificación binaria.

Visualizar resultados mejora la comprensión y la comunicación.
