from flask import Flask,render_template, url_for, request, redirect , flash
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask.helpers import make_response
from datetime import datetime
import os
app = Flask(__name__)
CORS(app)
api = Api(app)

from SchoolSystemModel.login import LoginEndpoint

app.config['JSON_AS_ASCII'] = False
app.config['JSONIFY_MINETYPE'] = 'application/json;charset=utf-8'
app.secret_key = os.urandom(12).hex()
app.config.update(RESTFUL_JSON=dict(ensure_ascii=False))
api.add_resource(LoginEndpoint, '/login')

@app.route('/', methods=['GET', 'POST'])
def login():
    return render_template('index.html')

@app.route('/home', methods=['POST','GET'])
def home():
    response = make_response(redirect(url_for('login')),flash(u'請先登入', 'warning'))
    if 'pid' in request.cookies:
        #Cookie 存活1小時
        if request.cookies.get('pid') == str(hash(datetime.now().strftime("%Y-%m-%d, %H"))):
            return render_template('home.html')
        else:
            return response
    else:
        return response

if __name__ == '__main__':
    app.run(debug=True)

