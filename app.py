from dotenv import load_dotenv
load_dotenv()
from os import environ
from json import loads as toDict
from flask import Flask, render_template, request, jsonify

import http.client
import mimetypes

app =  Flask(__name__)

@app.route('/')
def start():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():

    authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2MTM5ODQ0MDAsImFwaV9zdWIiOiIxYTAwMWJkNTEzODE3MDdjMzBhZmQ2M2NhYmYwNzc3NGU1MGY1YWU4YzM0NzhlYTQzYmJiY2MzNTdkMThlMDI2MTYxNDM3MzIwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTYxNDM3MzIwMCwiZGV2ZWxvcGVyX2lkIjoiMWEwMDFiZDUxMzgxNzA3YzMwYWZkNjNjYWJmMDc3NzRlNTBmNWFlOGMzNDc4ZWE0M2JiYmNjMzU3ZDE4ZTAyNiJ9.hX06Qo6Yy5ROOysp70VxQ02f1d3eZDGAFEIBFG-0tI5iPXghinLMgGJM3FnEPUacaxutWmb6w4lXm1gNnR5ejPf_6e92Dp4IpB3_bb-h3X-OvkHPM6vTcTQh3uVsdyk51iT9FFnsj7R2vk-0BnE-BBQrbywphWY2AXdik0UqkK-Rza9QhtDrZV8GOftncDxjaDyElyCWivMnSMgq7y2QaKB_8-Lu7vlhMYxXET8bRX6PUKKdRLXncdNgQ0j8fYQPqI12sMaCrMJOuv0eRCBzBqqzQEdODBVTMCGMkI9B2bAYWvOqu_xS2EzEYwLL_mpkrigqsRoBHvK8vBMAoU9Gog'
    accountID = 31540673
    conn = http.client.HTTPSConnection("sandbox.capitalone.co.uk")
    payload = ''
    headers = {
    'Authorization': 'Bearer {}'.format(authJWT),
    'version': '1.0'
    }
    conn.request("GET", "/developer-services-platform-pr/api/data/accounts/{}".format(accountID), payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))



    return render_template('dashboard.html')

# Requests
@app.route('/submit', methods=('POST',))
def submit():
    try:
        print(request.data.decode())
        data = toDict(request.data.decode())

        conn.request("GET", "/developer-services-platform-pr/api/data/accounts/{}".format(accountID), payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))


        print(data)
        return 0
    except:
        return jsonify({'error': 'There was an internal server error'}), 500
        
@app.route('/add', methods=('POST',))
def add():
    try:
        print(request.data.decode())
        return jsonify({'error': False})
    except:
        return jsonify({'error': 'There was an internal server error'}), 500

@app.route('/health', methods=('GET',))
def healthcheck():
    return 'OK'

# Errors
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def special_exception_handler(error):
    return render_template('500.html'), 500

app.run(port=8080, debug=True)