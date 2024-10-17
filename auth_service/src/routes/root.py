from flask import Blueprint, jsonify 
 
root_api = Blueprint('api', __name__, url_prefix='/auth') 

@root_api.route('/health')
def health():
    """Return a status of 'ok' if the server is running and listening to request"""
    return jsonify({"status": "ok"})
