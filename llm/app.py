import streamlit as st
import requests
from langchain_community.document_loaders import UnstructuredXMLLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain_classic.chains import RetrievalQA  # Retour à l'ancienne méthode
from langchain_core.prompts import PromptTemplate

# --- CONFIGURATION DE LA PAGE ---
st.set_page_config(page_title="Chatbot Coran RAG", page_icon="📖")
st.title("📖 Assistant RAG (via RetrievalQA)")

# --- INITIALISATION DU RAG ---
@st.cache_resource
def setup_rag():
    # 1. Chargement des données API
    url = "https://api.alquran.cloud/v1/quran/en.asad"
    try:
        response = requests.get(url, timeout=20)
        data = response.json()
        docs = []
        for surah in data['data']['surahs'][:10]: # On limite pour la rapidité du test
            for ayah in surah['ayahs']:
                content = f"Surah {surah['englishName']}, Ayah {ayah['numberInSurah']}: {ayah['text']}"
                docs.append(Document(page_content=content, metadata={"source": surah['englishName']}))
    except Exception as e:
        st.error(f"Erreur de connexion API : {e}")
        return None

    # 2. Découpage et Vectorisation
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)
    
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    
    # Création de la base de données vectorielle
    vectorstore = Chroma.from_documents(documents=chunks, embedding=embeddings)
    
    # 3. Configuration du LLM et du Prompt
    llm = Ollama(model="llama3")
    
    template = """Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Context: {context}
    Question: {question}
    Answer:"""
    
    QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

    # 4. Création de la chaîne RetrievalQA
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(),
        return_source_documents=True, # Pour pouvoir afficher les sources
        chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
    )
    return qa_chain

# Lancement du RAG
chain = setup_rag()

# --- INTERFACE CHATBOT ---
if "messages" not in st.session_state:
    st.session_state.messages = []

# Affichage des messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Entrée utilisateur
if prompt := st.chat_input("Posez votre question sur le Coran..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        if chain:
            with st.spinner("Recherche dans les versets..."):
                # Avec RetrievalQA, on utilise souvent l'appel direct ou .invoke()
                result = chain.invoke({"query": prompt})
                answer = result["result"]
                sources = result["source_documents"]
                
                st.markdown(answer)
                
                # Affichage des sources
                with st.expander("Sources consultées"):
                    for doc in sources:
                        st.write(f"- {doc.metadata['source']} : {doc.page_content[:100]}...")
            
            st.session_state.messages.append({"role": "assistant", "content": answer})
        else:
            st.error("Le système RAG n'est pas prêt.")