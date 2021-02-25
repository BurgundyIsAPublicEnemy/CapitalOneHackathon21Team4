from dotenv import load_dotenv
load_dotenv()
from os import environ
from json import loads as toDict
from flask import Flask, render_template, request, jsonify
app =  Flask(__name__)

@app.route('/')
def start():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Requests
@app.route('/submit', methods=('POST',))
def submit():
    try:
        print(request.data.decode())
        data = toDict(request.data.decode())
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