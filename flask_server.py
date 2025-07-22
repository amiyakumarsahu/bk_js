from flask import Flask, request, jsonify
import subprocess
import json
import sys
import os

app = Flask(__name__)

@app.route('/api/get-map-html', methods=['POST'])
def get_map_html():
    data = request.get_json()
    print(data)  # Debugging line to check incoming data
    route = data.get('route', [])
    # Add more params as needed

    # Prepare input for the Python backend file
    input_payload = {
        'route': route  }
    # Run the backend Python file (adjust path as needed)
    process = subprocess.Popen(
        [sys.executable, 'route_backend_backend.py'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    stdout, stderr = process.communicate(input=json.dumps(input_payload))
    if process.returncode != 0:
        return jsonify({'html': f"<div style='color:red'>Python error: {stderr}</div>"}), 500
    return jsonify({'html': stdout})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
