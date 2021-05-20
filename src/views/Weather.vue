<template lang="">
    <div id="app"> 
        <main> 
            <div class="search-box"> 
                <input 
                type="text" 
                class="search-bar" 
                placeholder="Search..." 
                v-model="query" 
                @keypress="fetchWeather" 
                /> 
            </div> 
            <div class="weather-wrap" v-if="typeof weather.main != 'undefined'"> 
                <div class="location-box"> 
                    <div class="location">{{weather.name}}, {{weather.sys.country}}</div> 
                    <div class="date">{{dateBuilder()}}</div> 
                </div> 
                <div class="weather-box"> 
                    <div class="temp">{{weather.main.temp}}℃</div> 
                    <div class="weather">{{weather.weather[0].main}}</div> 
                </div> 
            </div> 
        </main> 
    </div>
</template>
<script>
export default { 
    data: function () { 
        return { 
            api_key: "d90fae9b96bf333ee127505adf090614", 
            //api_key에는 앞서 우리가 발급받은 API 키값을 넣기.
            url_base: "https://api.openweathermap.org/data/2.5/", 
            //url_base는 API를 호출할 URL임.
            query: "", 
            //query는 search시 우리가 입력한 데이터가 들어갈 공간.
            weather: {}, 
            //weather은 검색 결과 데이터가 들어갈 공간.
            }; 
        }, 
    methods: { 
        //fetchWeather 함수는 search에 값을 입력하고 엔터를 누를 경우 해당 값을 사용해 날씨를 검색해오는 작업을 수행
        //내부에서 fetch 함수를 사용하고 있으며 수행 결과를 promise를 사용해 json으로 변환한 뒤 결과를 data에 저장하는 작업을 수행
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
        //setResult는 입력받은 결과 값을 앞서 정의한 weather에 저장하는 역할을 수행
        setResult: function (results) {
            this.weather = results; 
        }, 
        //dateBuilder는 현재 시간을 읽기 편하게 역할을 수행
        dateBuilder: function () { 
            let d = new Date(); 
            let months = [
                "1월", 
                "2월", 
                "3월", 
                "4월", 
                "5월", 
                "6월", 
                "7월", 
                "8월", 
                "9월", 
                "10월", 
                "11월", 
                "12월", 
            ]; 
            let days = [
                "일요일", 
                "월요일", 
                "화요일", 
                "수요일", 
                "목요일", 
                "금요일", 
                "토요일", 
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