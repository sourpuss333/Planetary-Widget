import swisseph as swe
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Set Swiss Ephemeris path
ephe_path = os.path.abspath("C:\\Users\\ameri\\OneDrive\\Documents\\My Notion\\Grimoire\\Widgets\\my-astro-widgets\\swisseph")
swe.set_ephe_path(ephe_path)

# Set environment variable for Swiss Ephemeris
os.environ['SE_EPHE_PATH'] = ephe_path

CELESTIAL_BODIES = [
    ('Sun', swe.SUN),
    ('Moon', swe.MOON),
    ('Mercury', swe.MERCURY),
    ('Venus', swe.VENUS),
    ('Mars', swe.MARS),
    ('Jupiter', swe.JUPITER),
    ('Saturn', swe.SATURN),
    ('Uranus', swe.URANUS),
    ('Neptune', swe.NEPTUNE),
    ('Pluto', swe.PLUTO),
    ('North Node', swe.MEAN_NODE),
    ('True Node', swe.TRUE_NODE),
    ('Chiron', swe.CHIRON)
]

ELEMENTS = ['Fire', 'Earth', 'Air', 'Water']
QUALITIES = ['Cardinal', 'Fixed', 'Mutable']
SIGNS = [
    {'name': 'Aries', 'element': 'Fire', 'quality': 'Cardinal'},
    {'name': 'Taurus', 'element': 'Earth', 'quality': 'Fixed'},
    {'name': 'Gemini', 'element': 'Air', 'quality': 'Mutable'},
    {'name': 'Cancer', 'element': 'Water', 'quality': 'Cardinal'},
    {'name': 'Leo', 'element': 'Fire', 'quality': 'Fixed'},
    {'name': 'Virgo', 'element': 'Earth', 'quality': 'Mutable'},
    {'name': 'Libra', 'element': 'Air', 'quality': 'Cardinal'},
    {'name': 'Scorpio', 'element': 'Water', 'quality': 'Fixed'},
    {'name': 'Sagittarius', 'element': 'Fire', 'quality': 'Mutable'},
    {'name': 'Capricorn', 'element': 'Earth', 'quality': 'Cardinal'},
    {'name': 'Aquarius', 'element': 'Air', 'quality': 'Fixed'},
    {'name': 'Pisces', 'element': 'Water', 'quality': 'Mutable'}
]

def get_icon(term):
    icon_map = {
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
        'pisces': 'Pisces.png'
    }
    return f"/static/images/{icon_map.get(term.lower(), 'default.png')}"

def get_sign_and_position(longitude):
    degrees = longitude % 30
    sign_index = int(longitude // 30)
    sign = SIGNS[sign_index]['name']
    element = SIGNS[sign_index]['element']
    quality = SIGNS[sign_index]['quality']
    return sign, degrees, element, quality

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/subtitle')
def subtitle():
    subtitle_text = f"{datetime.now().strftime('%B %d, %Y, %I:%M %p').lstrip('0').replace(' 0', ' ')} - Providence, RI"
    return jsonify({'subtitle': subtitle_text})

@app.route('/api/transits')
def transits():
    julian_day = swe.julday(datetime.utcnow().year, datetime.utcnow().month, datetime.utcnow().day, datetime.utcnow().hour + datetime.utcnow().minute / 60.0)
    transits = {}
    for body, body_id in CELESTIAL_BODIES:
        result, ret = swe.calc_ut(julian_day, body_id)
        longitude = result[0]
        sign, degrees, element, quality = get_sign_and_position(longitude)
        transits[body] = {
            'sign': sign,
            'position': f"{int(degrees)}° {int((degrees % 1) * 60)}'",
            'element': element,
            'quality': quality,
            'icon': get_icon(body)
        }
    return jsonify(transits)

if __name__ == '__main__':
    print(f"Current working directory: {os.getcwd()}")
    print(f"Swiss Ephemeris path: {ephe_path}")
    app.run(debug=True)
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
