// Jan Gołda, 291431

// Query 2 - list of questions values with their occurrence count, ordered (descending) by count
db.question.aggregate([
  { $match: {show_number: "2047"} },
  { $group: {_id: "$value", count: {$sum: 1}} },
  { $sort: {count: -1} }
]);
