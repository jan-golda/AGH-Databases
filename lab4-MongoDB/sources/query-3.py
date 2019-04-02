# Jan Gołda, 291431

from pymongo import MongoClient
from bson.code import Code

# connect
client = MongoClient()
question = client.jeopardy.question

# Query 3 - counts of empty, one-word and many-words answers in Jeopardy history
query_map = Code("""
  function() {
    let words = this.answer.split(" ").length;
    
    if(words == 0)
      emit("empty", 1);
    if(words == 1)
      emit("one_word", 1);
    if(words > 1)
      emit("many_words", 1);
  }
""")

query_reduce = Code("function(key, values) { return Array.sum(values) }")

result = question.map_reduce(query_map, query_reduce, "ans_query_3")

# display
for q in result.find():
  print("{_id}\tx{value:.0f}".format(**q))

# cleanup
client.close()
