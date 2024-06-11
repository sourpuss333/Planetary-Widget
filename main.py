import swisseph as swe

def get_planet_positions():
    jd = swe.julday(2024, 6, 8, 0.0)
    planets = [swe.SUN, swe.MOON, swe.MERCURY, swe.VENUS, swe.MARS, swe.JUPITER, swe.SATURN, swe.URANUS, swe.NEPTUNE, swe.PLUTO, swe.MEAN_NODE]
    planet_positions = {}

    for planet in planets:
        position = swe.calc_ut(jd, planet)[0]
        planet_positions[swe.get_planet_name(planet)] = position

    return planet_positions

if __name__ == "__main__":
    positions = get_planet_positions()
    for planet, position in positions.items():
        print(f"{planet}: {position}°")
