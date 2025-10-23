from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os
import tempfile
import hashlib
from typing import Dict, Any

# --- Data Structure ---
# NOTE: The 'prononciation_standard' text is what gTTS will try to read.
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

# --- Routes API ---

@app.route('/lettre/<string:lettre>', defaults={'langue': None})
@app.route('/lettre/<string:lettre>/<string:langue>')
def get_lettre_info(lettre, langue):
    lettre = lettre.lower()
    
    if lettre not in alphabet_data:
        return jsonify({"message": f"Lettre '{lettre}' non trouvée."}), 404

    if langue:
        langue = langue.lower()
        if langue in alphabet_data[lettre]:
            return jsonify(alphabet_data[lettre][langue])
        else:
            return jsonify({"message": f"Lettre '{lettre}' trouvée, mais la langue '{langue}' n'est pas disponible."}), 404
    else:
        # Retourne toutes les informations pour la lettre
        return jsonify(alphabet_data[lettre])

@app.route('/generate_audio/<string:lang_code>/<path:text_to_speak>')
def generate_audio(lang_code, text_to_speak):
    """
    Génère un fichier audio MP3 à partir du texte et du code de langue donnés
    en utilisant gTTS, puis le renvoie au client.
    """
    try:
        # Nettoyage et encodage sécurisé pour gTTS
        clean_text = text_to_speak.replace('_', ' ').replace('/', '')
        lang_code = lang_code.lower()

        # Liste de langues supportées par gTTS (ajustez si nécessaire)
        supported_languages = ['fr', 'en', 'es', 'ja', 'ko', 'ar', 'ru', 'zh-CN', 'de', 'it', 'pt']
        if lang_code not in supported_languages:
            return jsonify({"message": f"Code de langue '{lang_code}' non supporté pour la synthèse vocale."}), 400

        # Utilisation de tempfile pour la gestion sécurisée des fichiers temporaires
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
            file_path = temp_audio_file.name

        tts = gTTS(text=clean_text, lang=lang_code, slow=False)
        tts.save(file_path)

        # Envoyer le fichier audio au client
        response = send_file(file_path, mimetype="audio/mpeg", as_attachment=False)

        # Supprimer le fichier temporaire après l'envoi
        @response.call_on_close
        def cleanup():
            os.remove(file_path)

        return response

    except Exception as e:
        print(f"Erreur lors de la génération ou de l'envoi de l'audio: {e}")
        return jsonify({"message": "Erreur interne du serveur lors de la synthèse vocale."}), 500


if __name__ == '__main__':
    # Lancez votre API Flask
    # Assurez-vous d'utiliser 'python app.py' après avoir activé votre venv
    app.run(debug=True)