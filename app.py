from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    dot_count = int(request.form.get('number'))
    width, height = 800, 600  # Dimensions of the rectangle (field)
    dots = [{'x': random.randint(0, width), 'y': random.randint(0, height)} for _ in range(dot_count)]
    return jsonify(dots=dots)

if __name__ == '__main__':
    app.run(debug=True)
