# Jan Gołda, 291431

from pymongo import MongoClient

# connect
client = MongoClient()
question = client.jeopardy.question

# Query 2 - list of questions values with their occurrence count, ordered (descending) by count
result = question.aggregate([
    { "$match": {"show_number": "2047"} },
    { "$group": {"_id": "$value", "count": {"$sum": 1}} },
    { "$sort": {"count": -1} }
  ])

# display
for q in result:
  print("{_id}\tx{count}".format(**q))

# cleanup
client.close()
