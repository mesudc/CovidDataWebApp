from flask import Flask, render_template, url_for, request
import requests, json

app = Flask(__name__)
 
@app.route("/", methods = ['GET', 'POST'])
def chart():
    #API Request
    covid_url = requests.get(f'https://covid-19.dataflowkit.com/v1')
    covid_data = covid_url.json()

    country = '' #Setting default country entry for Page Start

    #If form submission is made > gather country submitted
    if request.method == "POST":
        country = request.form['country']

    return render_template('index.html', covid_data=covid_data, country=country)

#Use py -m app.py run to initiate debugging
if __name__ == "__main__":
    app.run(debug=True)

