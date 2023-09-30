from flask import Flask
  
# creates a Flask application
app = Flask(__name__)
  
@app.route("/hello")
def hello():
    return "Hello"
  
# run the application
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=8080)