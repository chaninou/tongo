from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_smorest import Api, Blueprint, abort
from gtts import gTTS
import os
import tempfile
import yaml
from typing import Dict, Any

# Import the schema you created
from schemas import LanguageInfoSchema

# --- Data Structure (Keep this as is) ---
alphabet_data: Dict[str, Dict[str, Dict[str, Any]]] = {
    "a": {
        "fr": {"lettre": "A", "prononciation_standard": "ah", "mot_exemple": "Arbre"},
        "en": {"lettre": "A", "prononciation_standard": "ay as in car", "mot_exemple": "Apple"},
        "es": {"lettre": "A", "prononciation_standard": "ah", "mot_exemple": "Agua"},
        "jp": {"lettre": "ア", "prononciation_standard": "a", "description": "Lettre 'a' en Katakana"},
        "kr": {"lettre": "아", "prononciation_standard": "a", "description": "Voyelle 'a' en Hangeul"},
        "ar": {"lettre": "ا", "prononciation_standard": "Alif", "description": "Alif, voyelle longue 'a'"},
        "ru": {"lettre": "А", "prononciation_standard": "a", "description": "Lettre A en Cyrillique"},
    },
    "b": {
        "fr": {"lettre": "B", "prononciation_standard": "bé", "mot_exemple": "Bateau"},
        "en": {"lettre": "B", "prononciation_standard": "bee", "mot_exemple": "Ball"},
        "es": {"lettre": "B", "prononciation_standard": "beh", "mot_exemple": "Burro"},
        "jp": {"lettre": "ビ", "prononciation_standard": "bi", "description": "Particule 'bi' en Katakana"},
        "kr": {"lettre": "ㅂ", "prononciation_standard": "b", "description": "Consonne 'b' en Hangeul"},
        "ar": {"lettre": "ب", "prononciation_standard": "ba", "description": "Ba, deuxième lettre de l'alphabet arabe"},
        "ru": {"lettre": "Б", "prononciation_standard": "be", "description": "Lettre B en Cyrillique"},
    }
    # Ajoutez d'autres lettres et langues ici...
}

app = Flask(__name__)
# IMPORTANT: Activez CORS pour permettre à votre frontend React (qui est sur un autre port) de communiquer.
CORS(app) 

# --- OpenAPI Configuration ---
app.config["API_TITLE"] = "Polyglotte par excellence API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3" # OpenAPI 3 version
app.config["OPENAPI_URL_PREFIX"] = "/" # Serve the spec at the root
# The path for the interactive documentation (Swagger UI)
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui" 
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

api = Api(app)

# --- Define Blueprints ---
# A Blueprint for your core letter endpoints
blp = Blueprint(
    "Lettre", __name__, url_prefix="/lettre", description="Operations on letters and languages"
)

# A Blueprint for the audio generation endpoint (since it's a file response)
audio_blp = Blueprint(
    "Audio", __name__, url_prefix="/generate_audio", description="Text-to-speech generation"
)

# --- Routes API using flask-smorest ---

@blp.route("/<string:lettre>")
@blp.route("/<string:lettre>/<string:langue>")
@blp.response(200, LanguageInfoSchema(many=True), description="Returns information for all available languages for the letter.")
@blp.response(200, LanguageInfoSchema, description="Returns information for the specific letter and language.")
def get_lettre_info(lettre, langue=None):
    """
    Get detailed information about a letter in one or all languages.
    ---
    Returns the character, pronunciation, and example word for the given letter.
    If no language is specified, returns data for all supported languages.
    """
    lettre = lettre.lower()
    
    if lettre not in alphabet_data:
        # Use flask-smorest's abort for standardized error handling
        abort(404, message=f"Lettre '{lettre}' non trouvée.")

    if langue:
        langue = langue.lower()
        if langue in alphabet_data[lettre]:
            return alphabet_data[lettre][langue]
        else:
            abort(404, message=f"Langue '{langue}' non disponible pour la lettre '{lettre}'.")
    else:
        # Note: flask-smorest expects a list/dict of Marshmallow fields, 
        # so we return the dictionary of all languages.
        # The schema definition in schemas.py is simplified to handle this.
        return list(alphabet_data[lettre].values())


# Note: The /generate_audio endpoint is tricky for auto-documentation 
# because it returns a file (audio/mpeg) and not JSON. 
# We'll keep the original flask route, but put it in its own Blueprint.

@audio_blp.route('/<string:lang_code>/<path:text_to_speak>')
def generate_audio(lang_code, text_to_speak):
    """
    Génère un fichier audio MP3 à partir du texte et du code de langue donnés
    en utilisant gTTS, puis le renvoie au client.
    """
    try:
        clean_text = text_to_speak.replace('_', ' ').replace('/', '')
        lang_code = lang_code.lower()

        supported_languages = ['fr', 'en', 'es', 'ja', 'ko', 'ar', 'ru', 'zh-CN', 'de', 'it', 'pt']
        if lang_code not in supported_languages:
            return jsonify({"message": f"Code de langue '{lang_code}' non supporté pour la synthèse vocale."}), 400

        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
            file_path = temp_audio_file.name

        tts = gTTS(text=clean_text, lang=lang_code, slow=False)
        tts.save(file_path)

        response = send_file(file_path, mimetype="audio/mpeg", as_attachment=False)

        @response.call_on_close
        def cleanup():
            os.remove(file_path)

        return response

    except Exception as e:
        print(f"Erreur lors de la génération ou de l'envoi de l'audio: {e}")
        return jsonify({"message": "Erreur interne du serveur lors de la synthèse vocale."}), 500


# --- Register Blueprints with the API object ---
api.register_blueprint(blp)
api.register_blueprint(audio_blp)

if __name__ == '__main__':
    # You can also add a route to serve the raw YAML spec if desired
    @app.route("/openapi.yaml")
    def openapi_yaml():
        spec = api.spec.to_dict()
        return app.response_class(
            yaml.dump(spec, default_flow_style=False),
            mimetype="application/x-yaml"
        )
    
    app.run(debug=True)