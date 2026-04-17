import mysql.connector
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
import sys

# CONNECT TO DATABASE
db = mysql.connector.connect(
    host="localhost",
    user="Atharva",
    password="Atharva@2005",
    database="codecoffee"
)

# FETCH ORDER DATA
query = "SELECT order_id, item_name FROM orders"
df = pd.read_sql(query, db)

# IF NO DATA
if df.empty:
    print("No Recommendations Available")
    sys.exit()

# CREATE BASKET MATRIX
basket = pd.crosstab(df['order_id'], df['item_name'])

# CONVERT TO BOOLEAN
basket = basket.astype(bool)

# APPLY APRIORI
frequent_itemsets = apriori(
    basket,
    min_support=0.01,
    use_colnames=True
)

# GENERATE RULES
if frequent_itemsets.empty:
    print("No Recommendations Available")
    sys.exit()

rules = association_rules(
    frequent_itemsets,
    metric="confidence",
    min_threshold=0.1
)

# IF NO RULES
if rules.empty:
    print("No Recommendations Available")
    sys.exit()

# TAKE BEST RULE (HIGHEST CONFIDENCE)
rules = rules.sort_values(by='confidence', ascending=False)

best_rule = rules.iloc[0]

antecedent = list(best_rule['antecedents'])[0]
consequent = list(best_rule['consequents'])[0]
confidence = round(best_rule['confidence'], 2)

# FINAL CLEAN OUTPUT FOR UI
print(f"Buy {antecedent} and you may also like {consequent}")