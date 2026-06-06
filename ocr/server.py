from flask import Flask
from . import AZ
from AZ import analyze

app = Flask(__name__)

@app.route('/api/analyze', methods=['POST'])
def analyze_document():
    try:
        analyze()
        return {'status': 'success', 'message': 'Document analyzed'}, 200
    except Exception as e:
        return {'status': 'error', 'message': str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
