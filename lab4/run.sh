echo
echo "=== Query 1 - quesions from rounds 'double' and 'final' in show number 2047, ordered by question value"
echo
python3 sources/query-1.py

echo
echo "=== Query 2 - list of questions values with their occurrence count, ordered (descending) by count"
echo
python3 sources/query-2.py

echo
echo "=== Query 3 - counts of empty, one-word and many-words answers in Jeopardy history"
echo
python3 sources/query-3.py

echo
