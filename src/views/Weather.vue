<template lang="">
    <div id="app"> 
        <main> 
            <div > 
                <input 
                type="text" 
                placeholder="Search..." 
                v-model="query" 
                @keypress="fetchWeather" 
                /> 
            </div> 
            <div  v-if="typeof weather.main != 'undefined'"> 
                <div> 
                    <div>{{weather.name}}</div>
                    <div v-if="weather.sys.country==='KR'">
                        대한민국
                    </div>
                    <!-- <div> {{weather.sys.country}}</div> -->
                    <div>{{dateBuilder()}}</div> 
                </div> 
                <div> 
                    <div>{{weather.main.temp}}℃</div> 
                    <div v-if="weather.weather[0].main==='Clouds'">
                        흐림
                    </div>
                </div> 
            </div> 
        </main> 
    </div>
</template>
<script>

export default { 
    name : 'Weather',
    data: function () { 
        return { 
            map:'',
            api_key: `${process.env.VUE_APP_OPENWEAHTER_API_KEY}`, 
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
                `${this.url_base}weather?q=${this.query}&units=metric&lang=kr&APPID=${this.api_key}`;
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
                "1", 
                "2", 
                "3", 
                "4", 
                "5", 
                "6", 
                "7", 
                "8", 
                "9", 
                "10", 
                "11", 
                "12", 
            ]; 
            let days = [
                "일", 
                "월", 
                "화", 
                "수", 
                "목", 
                "금", 
                "토", 
            ]; 
            let day = days[d.getDay()]; 
            let date = d.getDate(); 
            let month = months[d.getMonth()]; 
            let year = d.getFullYear(); 
            return `${day}요일 ${date}일 ${month}월 ${year}년`; 
        }, 
    }, 
};


</script>
<style lang="">
    
</style>