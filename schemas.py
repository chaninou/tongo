from marshmallow import Schema, fields

# Schema for the specific language information
class LanguageInfoSchema(Schema):
    lettre = fields.Str(dump_only=True, metadata={'description':"The character/letter in the given language."})
    prononciation_standard = fields.Str(dump_only=True, required=False, metadata={'description':"The phonetic representation or pronunciation text."})
    mot_exemple = fields.Str(dump_only=True, required=False, metadata={'description':"An example word using the letter."})
    description = fields.Str(dump_only=True, required=False, metadata={'description':"Additional descriptive context."})

# Schema for the full response of a single letter across all languages
# This uses the LanguageInfoSchema as the value for dynamic language codes (e.g., 'fr', 'en')
class LetterAllLanguagesSchema(Schema):
    # This dynamically handles the language codes as keys
    class Meta:
        # A simple flag to indicate this is a dynamic key map (less strict, but works for the data structure)
        pass