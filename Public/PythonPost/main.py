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