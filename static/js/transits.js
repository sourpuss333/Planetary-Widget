document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/subtitle')
        .then(response => response.json())
        .then(data => {
            document.getElementById('subtitle').innerText = data.subtitle;
        })
        .catch(error => console.error('Error fetching subtitle:', error));

    fetch('/api/transits')
        .then(response => response.json())
        .then(data => {
            updateTable(data);
        })
        .catch(error => console.error('Error fetching transits:', error));
});

function getIconPath(name) {
    const iconMap = {
        'sun': 'Sun.png',
        'moon': 'Moon.png',
        'mercury': 'Mercury.png',
        'venus': 'Venus.png',
        'mars': 'Mars.png',
        'jupiter': 'Jupiter.png',
        'saturn': 'Saturn.png',
        'uranus': 'Uranus.png',
        'neptune': 'Neptune.png',
        'pluto': 'Pluto.png',
        'north node': 'North Node.png',
        'true node': 'True Node.png',
        'chiron': 'Chiron.png',
        'fire': 'Fire.png',
        'earth': 'Earth.png',
        'air': 'Air.png',
        'water': 'Water.png',
        'aries': 'Aries.png',
        'taurus': 'Taurus.png',
        'gemini': 'Gemini.png',
        'cancer': 'Cancer.png',
        'leo': 'Leo.png',
        'virgo': 'Virgo.png',
        'libra': 'Libra.png',
        'scorpio': 'Scorpio.png',
        'sagittarius': 'Sagittarius.png',
        'capricorn': 'Capricorn.png',
        'aquarius': 'Aquarius.png',
        'pisces': 'Pisces.png',
        'cardinal': 'Cardinal.png',    // Added modality icons
        'fixed': 'Fixed.png',          // Added modality icons
        'mutable': 'Mutable.png'       // Added modality icons
    };
    return `/static/images/${iconMap[name.toLowerCase()] || 'default.png'}`;
}

function updateTable(transits) {
    const tbody = document.getElementById('transits_body');
    tbody.innerHTML = '';

    const orderedBodies = [
        'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 
        'Jupiter', 'Saturn', 'Uranus', 'Neptune', 
        'Pluto', 'North Node', 'True Node', 'Chiron'
    ];

    orderedBodies.forEach(body => {
        const data = transits[body];
        if (data) {
            const row = document.createElement('tr');
            
            const iconCell = document.createElement('td');
            const icon = document.createElement('img');
            icon.src = data.icon;
            icon.alt = body;
            icon.className = 'icon';
            iconCell.appendChild(icon);
            iconCell.appendChild(document.createTextNode(' ' + body));

            const signCell = document.createElement('td');
            const signIcon = document.createElement('img');
            signIcon.src = getIconPath(data.sign);
            signIcon.alt = data.sign;
            signIcon.className = 'icon';
            signCell.appendChild(signIcon);
            signCell.appendChild(document.createTextNode(' ' + data.sign));

            const positionCell = document.createElement('td');
            positionCell.textContent = data.position;

            const elementCell = document.createElement('td');
            const elementIcon = document.createElement('img');
            elementIcon.src = getIconPath(data.element);
            elementIcon.alt = data.element;
            elementIcon.className = 'icon';
            elementCell.appendChild(elementIcon);
            elementCell.appendChild(document.createTextNode(' ' + data.element));

            const modalityCell = document.createElement('td'); // Updated from qualityCell
            const modalityIcon = document.createElement('img'); // Added modality icon
            modalityIcon.src = getIconPath(data.quality); // Changed quality to modality
            modalityIcon.alt = data.quality;
            modalityIcon.className = 'icon';
            modalityCell.appendChild(modalityIcon);
            modalityCell.appendChild(document.createTextNode(' ' + data.quality));

            row.appendChild(iconCell);
            row.appendChild(signCell);
            row.appendChild(positionCell);
            row.appendChild(elementCell);
            row.appendChild(modalityCell); // Updated from qualityCell

            tbody.appendChild(row);
        }
    });
}
