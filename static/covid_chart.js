function generateChart(country, active_cases, total_case, total_deaths, total_recovery, date) {
    
    
    country = country.toUpperCase();
    //ctx - location of chart within html and settings 2d context
    var ctx = document.getElementById('covid-chart').getContext('2d');
    //chart information and type
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Active Cases', 'Total Cases', 'Total Deaths', 'Total Recovered'],
            datasets: [{
                label: country,
                data: [ active_cases , total_case , total_deaths , total_recovery],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        },
        
    });
}
//pulls data from api and form if no entry is submitted in country field = defaults to world
function pullData(covid_data, country){
    country = country.toLowerCase();
    if (country == ''){
        country = "world";
        checkCountry(covid_data, country);
    }else{
        checkCountry(covid_data, country);
    }
    
}

//Checks form data entry and if country is found, parses data for 
function checkCountry(covid_data, country){

    var check = false; // Boolean to check if a country is found during check
    for( i=0; i<covid_data.length-1; i++){
        var test = covid_data[i]["Country_text"].toLowerCase()
        if (country == test){
            check = true;
            parseData(covid_data[i]);
            return;
        }
    }
    //if no country submitted in the form is found in the JSON dict, check Bool remains false - alert is given 
    if(check == false){
        alert('Country not found');
    }
    //Page is reset to the default entry of World Data after alert
    pullData(covid_data, '');
}

//removes all comma's from numbers to be processed by chart.js 
function parseData(covid_data){
    country = covid_data["Country_text"];
    active_cases = covid_data["Active Cases_text"].replaceAll(',', '');
    total_case = covid_data["Total Cases_text"].replaceAll(',', '');
    total_deaths = covid_data["Total Deaths_text"].replaceAll(',', '');
    total_recovery = covid_data["Total Recovered_text"].replaceAll(',', '');
    date = covid_data["Last Update"];
    
    setDate(date);
    generateChart(country, active_cases, total_case, total_deaths, total_recovery, date);
}

//sets the date of when the last api update was made
function setDate(date){
    var str = "COVID DATA AS OF ".concat(date);
    document.getElementById('date-entry').innerHTML = str;
}