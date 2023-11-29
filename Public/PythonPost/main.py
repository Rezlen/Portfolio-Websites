import arrr
from pyscript import document


def translate_english(event):
  input_text = document.querySelector("#typeEnglish")
  english = input_text.value
  output_div = document.querySelector("#output")
  output_div.innerText = arrr.translate(english)

#  taking input & storing posts
def displayPosts(event):
  inputPost = document.querySelector("#CommentField")
  posts = inputPost.value
  outputDiv = document.querySelector("#PostOutput")
  outputDiv.innerText = arrr.translate(posts)


'''
# connecting to databse https://app.planetscale.com/soheilyreza/portfoliowebsite/connect
# Load environment variables from the .env file
from dotenv import load_dotenv
load_dotenv()
import os
import MySQLdb

# Connect to the database
connection = MySQLdb.connect(
  host=os.getenv("aws.connect.psdb.cloud"),
  user=os.getenv("################"),
  passwd=os.getenv("#####################"),
  db=os.getenv("portfoliowebsite"),
  autocommit=True,
  ssl_mode="VERIFY_IDENTITY",
  # See https://planetscale.com/docs/concepts/secure-connections#ca-root-configuration
  # to determine the path to your operating systems certificate file.
  ssl={ "ca": "" }
)

try:
    # Create a cursor to interact with the database
    cursor = connection.cursor()

    # Execute "SHOW TABLES" query
    cursor.execute("SHOW TABLES")

    # Fetch all the rows
    tables = cursor.fetchall()

    # Print out the tables
    print("Tables in the database:")
    for table in tables:
        print(table[0])

except MySQLdb.Error as e:
    print("MySQL Error:", e)

finally:
    # Close the cursor and connection
    cursor.close()
    connection.close()
    
    
'''

