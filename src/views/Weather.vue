<template lang="">
    <div id="app"> <main> <div class="search-box"> <input type="text" class="search-bar" placeholder="Search..." v-model="query" @keypress="fetchWeather" /> </div> <div class="weather-wrap" v-if="typeof weather.main != 'undefined'"> <div class="location-box"> <div class="location">{{weather.name}}, {{weather.sys.country}}</div> <div class="date">{{dateBuilder()}}</div> </div> <div class="weather-box"> <div class="temp">{{weather.main.temp}}℃</div> <div class="weather">{{weather.weather[0].main}}</div> </div> </div> </main> </div>

</template>
<script>
export default { 
    data: function () { 
        return { 
            api_key: "d90fae9b96bf333ee127505adf090614", 
            url_base: "https://api.openweathermap.org/data/2.5/", 
            query: "", 
            weather: {}, 
            }; 
        }, 
    methods: { 
        fetchWeather: function (e) { 
            if (e.key == "Enter") { 
                let fetchUrl = 
                `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`;
                fetch(fetchUrl) 
                .then((res) => { 
                    console.log(res); 
                    return res.json(); 
                }) 
                .then((results) => { 
                    return this.setResult(results); 
                }); 
                } 
            }, 
        setResult: function (results) {
            this.weather = results; 
        }, 
        dateBuilder: function () { 
            let d = new Date(); 
            let months = [
                "January", 
                "February", 
                "March", 
                "April", 
                "May", 
                "June", 
                "July", 
                "August", 
                "September", 
                "October", 
                "November", 
                "December", 
            ]; 
            let days = [
                "Sunday", 
                "Monday", 
                "Tuesday", 
                "Wednesday", 
                "Thursday", 
                "Friday", 
                "Saturday", 
            ]; 
            let day = days[d.getDay()]; 
            let date = d.getDate(); 
            let month = months[d.getMonth()]; 
            let year = d.getFullYear(); 
            return `${day} ${date} ${month} ${year}`; 
        }, 
    }, 
};


</script>
<style lang="">
    
</style>