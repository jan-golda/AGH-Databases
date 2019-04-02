// Jan Gołda, 291431

// Query 3 - counts of empty, one-word and many-words answers in Jeopardy history
db.question.mapReduce(
  function() {
    let words = this.answer.split(" ").length;
    
    if(words == 0)
      emit("empty", 1);
    if(words == 1)
      emit("one_word", 1);
    if(words > 1)
      emit("many_words", 1);
  },
  function(key, values) { return Array.sum(values) },
  {out: "ans_query_3"}
);
db.ans_query_3.find();
