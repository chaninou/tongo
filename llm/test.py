import json
import os
from langchain_community.document_loaders import PyPDFLoader, UnstructuredXMLLoader, TextLoader, DirectoryLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain_classic.chains import RetrievalQA
from langchain_core.prompts import ChatPromptTemplate
import requests


def load_quran_api(url):
    print("Téléchargement du Coran (Traduction Asad)... Cela peut prendre quelques secondes.")
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        quran_docs = []
        # L'API renvoie une structure : data -> surahs -> ayahs
        for surah in data['data']['surahs']:
            surah_name = surah['englishName']
            for ayah in surah['ayahs']:
                # Création d'un texte structuré pour chaque verset (Ayah)
                text_content = f"Surah {surah_name} ({surah['number']}), Ayah {ayah['numberInSurah']}: {ayah['text']}"
                
                # On ajoute des métadonnées pour pouvoir retrouver le chapitre exact
                doc = Document(
                    page_content=text_content,
                    metadata={
                        "source": "Al-Quran API",
                        "surah": surah_name,
                        "surah_number": surah['number'],
                        "ayah_number": ayah['numberInSurah']
                    }
                )
                quran_docs.append(doc)
        return quran_docs
    except Exception as e:
        print(f"Erreur API : {e}")
        return []

# 1. Configuration du répertoire et chargement
print("Chargement des documents depuis ./learn...")
#loader = DirectoryLoader('./learn', glob="./*.pdf", loader_cls=PyPDFLoader)
#docs = pdfloader.load()

# --- 3. FUSION AVEC LES DONNÉES API ---
api_url = "https://api.alquran.cloud/v1/quran/en.asad" # URL d'exemple (à remplacer)
#all_docs.extend(load_api_data(api_url))

#loader = TextLoader("./learn/quran-simple-plain.txt")
docs = load_quran_api(api_url)

if not docs:
    print("Aucune donnée récupérée. Fin du script.")
    exit()

# 2. Découpage (Chunking)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
chunks = text_splitter.split_documents(docs)

# 3. Embeddings Multilingues (Parfait pour Français + Arabe)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")

# 4. Stockage Vectoriel local (ChromaDB)
vectorstore = Chroma.from_documents(documents=chunks, embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3}) # Cherche les 3 meilleurs extraits

# 5. Configuration du LLM (Ollama)
llm = Ollama(model="llama3")

# 6. Création du Template (C'est ici qu'on assure la confidentialité)
# On force le modèle à n'utiliser que les documents fournis.
system_prompt = (
    "Tu es un assistant spécialisé. Utilise uniquement les extraits fournis ci-dessous "
    "pour répondre à la question de l'utilisateur. Si tu ne trouves pas la réponse "
    "dans les documents, dis simplement que tu ne sais pas. Ne devine pas."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{question}"),
    ]
)

# 7. Assemblage de la chaîne (Méthode compatible RetrievalQA)
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt}
)

# 8. Test en Arabe
print("\n--- Analyse terminée. Posez votre question ---")
question = "قرآن " # "Quels sont les points clés ?"

response = rag_chain.invoke({"query": question})

print("\n--- RÉPONSE ---")
print(response["result"])

# Optionnel : Afficher les sources utilisées
print("\n--- SOURCES ---")
for doc in response["source_documents"]:
    print(f"- {doc.metadata['source']}")