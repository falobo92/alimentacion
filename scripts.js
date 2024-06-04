document.getElementById('generate-button').addEventListener('click', generateRandomPlan);
document.getElementById('copy-button').addEventListener('click', copyToClipboard);

const allowedFoods = {
    lacteos: ['Leche descremada: 1 taza', 'Quesillo: 60 grs', 'Yogurt descremado: 1 unidad', 'Leche cultivada: 200 ml', 'Flan diet: 1 unidad', 'Queso gauda: 1 lámina (2 veces/sem)', 'Queso ricotta: 2 cucharadas'],
    proteinas: ['Legumbres: 3/4 taza', 'Salmón: 100 grs', 'Pescado: 150 grs', 'Hamburguesa de soya: 1 unidad', 'Atún: 125 grs', 'Carne vegetal: 1/2 taza'],
    verduras: ['Tomate: 1 unidad', 'Zanahoria cruda: 1/2 taza', 'Cebolla cruda: 1/2 taza', 'Brócoli cocido: 3/4 taza', 'Espárragos: 4 unidades', 'Porotos verdes: 1 taza', 'Zapallito italiano: 1 taza', 'Palmitos: 4 unidades', 'Zapallo camote: 1/2 taza', 'Betarraga cocida: 1/2 taza', 'Repollitos de Bruselas: 4 unidades'],
    frutas: ['Manzana: 1/2 unidad', 'Plátano: 1/2 unidad', 'Frutillas: 1 taza', 'Ciruelas: 2 unidades', 'Kiwis: 2 unidades', 'Naranja: 1 unidad', 'Sandía: 1 taza', 'Durazno: 1 unidad'],
    cereales: ['Arroz: 1/2 taza', 'Fideos: 1/2 taza', 'Quínoa: 1/2 taza', 'Legumbres cocidas: 3/4 taza', 'Choclo: 1/2 taza', 'Papitas chicas: 2 unidades'],
    pan: ['Pan de molde: 2 rebanadas', 'Pan integral: 50 grs', 'Pan pita: 1 unidad', 'Galletas de salvado: 6 unidades', 'Avena: 1/2 taza', 'Cereal sin azúcar: 3/4 taza', 'Fajita: 1 unidad'],
    aceites: ['Aceite de oliva: 2 cucharaditas', 'Palta: 1/2 unidad', 'Almendras: 25 unidades', 'Nueces: 10 unidades', 'Aceitunas: 11 unidades'],
    libres: ['Apio', 'Espinaca cruda', 'Berros', 'Lechuga', 'Rúcula', 'Repollo', 'Champiñones', 'Pimentón', 'Zapallito italiano']
};

function getRandomItems(array, n) {
    let result = new Array(n),
        len = array.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandomItems: más elementos de los disponibles");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = array[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function generateRandomPlan() {
    const plan = {
        lacteos: getRandomItems(allowedFoods.lacteos, 2),
        proteinas: getRandomItems(allowedFoods.proteinas, 3),
        verduras: getRandomItems(allowedFoods.verduras, 4),
        frutas: getRandomItems(allowedFoods.frutas, 2),
        cereales: getRandomItems(allowedFoods.cereales, 2),
        pan: getRandomItems(allowedFoods.pan, 2),
        aceites: getRandomItems(allowedFoods.aceites, 4),
        libres: allowedFoods.libres
    };

    const planElement = document.getElementById('plan');
    planElement.innerHTML = `
        <h2>Tu Plan Diario</h2>
        <h3>Lácteos (2 porciones):</h3>
        <ul>${plan.lacteos.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Proteínas (3 porciones):</h3>
        <ul>${plan.proteinas.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Verduras (4 porciones):</h3>
        <ul>${plan.verduras.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Frutas (2 porciones):</h3>
        <ul>${plan.frutas.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Cereales y Farináceos (2 porciones):</h3>
        <ul>${plan.cereales.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Pan y Galletas (2 porciones):</h3>
        <ul>${plan.pan.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Aceites y Grasas (4 porciones):</h3>
        <ul>${plan.aceites.map(item => `<li><span>${item.split(':')[0]}</span><span>${item.split(':')[1]}</span></li>`).join('')}</ul>
        <h3>Verduras de Libre Consumo:</h3>
        <ul>${plan.libres.map(item => `<li><span>${item}</span></li>`).join('')}</ul>
    `;

    document.getElementById('copy-button').style.display = 'inline-block';
}

function copyToClipboard() {
    const planElement = document.getElementById('plan');
    const range = document.createRange();
    range.selectNode(planElement);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range); 
    try {
        document.execCommand('copy');
        alert('Plan copiado al portapapeles');
    } catch (err) {
        alert('Error al copiar el plan');
    }
    window.getSelection().removeAllRanges();
}
