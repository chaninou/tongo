from corpus_toolkit import corpus_tools as ct

brown_corp = ct.ldcorpus("learn") #load and read corpus
tok_corp = ct.tokenize(brown_corp) #tokenize corpus - by default this lemmatizes as well
brown_freq = ct.frequency(tok_corp) #creates a frequency dictionary
#note that range can be calculated instead of frequency using the argument calc = "range"
ct.head(brown_freq, hits = 10) #print top 10 items
print(len(brown_freq))