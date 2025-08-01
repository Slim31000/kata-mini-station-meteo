

const cityInput =document.getElementById('cityInput')

const city = document.getElementById('city')
const gps = document.getElementById('gps')
const temperature = document.getElementById("temperature")
const detail = document.getElementById("details")

btnValidate=document.getElementById('validate')


btnValidate.addEventListener('click',async ()=>{
    
    const position=await fetchCoordinates(cityInput.value)
    if(position){
        city.innerHTML=position.city
        gps.innerHTML = `Coordonnées GPS ${position.coordinates.latitude}, ${position.coordinates.longitude}`
        temperature.innerHTML=await fetchWeather(position.coordinates.latitude,position.coordinates.longitude)
        detail.innerHTML= `Température actuelle`
        
    } else{
        city.innerHTML =`Ville non trouvée`
        gps.innerHTML = "-"
        temperature.innerHTML = "-"
        detail.innerHTML = `Vérifiez le nom de la ville`

    }
    cityInput.value=''
    
})



async function fetchCoordinates(cityInput) {
    try {
        const response= await fetch(`https://nominatim.openstreetmap.org/search?q=${cityInput}&format=json&addressdetails=1&limit=1`)
        const data= await response.json()
        console.log(data)
        const latitude= data[0].lat
        const longitude = data[0].lon
        const coordinates = {latitude,longitude}
        const city = data[0].name
        console.log({city,coordinates})
        return {city,coordinates}
    } catch (error) {
        console.log(error)
    }
    
    
}

async function fetchWeather(latitude,longitude) {

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`)
    const data = await response.json()
    console.log(data.current.temperature_2m)
    return data.current.temperature_2m
}

