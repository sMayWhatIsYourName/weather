const APIkey = {
  key: 'e220e71697b7178a74e4eacaa488d2ce',
}

export const APIPaths = {
  getWeather: (lat: string, lon: string): string => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${APIkey.key}&lang=ru`,
  getIp: (): string => 'https://api.ipgeolocation.io/ipgeo?apiKey=795c99e72d91481b8e63aead4b64c729&fields=city,latitude,longitude,country_name',
  getLatAndLon: (city: string): string => `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey.key}`,
};