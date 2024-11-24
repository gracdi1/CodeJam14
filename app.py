import os
import json
from flask import Flask, redirect, request, jsonify, session
from spotipy.oauth2 import SpotifyOAuth
from flask_cors import CORS
import spotipy
import openai
from dotenv import load_dotenv

load_dotenv()



app = Flask(__name__)
CORS(app, resources={r"/analyze-personality": {"origins": "http://localhost:3001"}})
# OpenAI Key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Your Spotify API credentials
CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI = 'http://localhost:3000/callback'

# Initialize SpotifyOAuth
sp_oauth = SpotifyOAuth(client_id=CLIENT_ID,
                         client_secret=CLIENT_SECRET,
                         redirect_uri=REDIRECT_URI,
                         scope="user-top-read user-library-read",
                         cache_path="./.cache"
                         )

# Home route
@app.route('/')
def home():
    return 'Welcome to the Spotify Personality Analyzer App! <a href="/login">Login with Spotify</a>'

# Login route, redirects to Spotify for authentication
@app.route('/login')
def login():
    session.clear()  # Clear any existing session data
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    if not isinstance(token_info, dict):
        # If future versions return a string, manually construct the token dictionary
        token_info = {'access_token': token_info}
    session['token_info'] = token_info  # Store the token for later use
    print("Access Token:", token_info['access_token'])
    return redirect('/top-items')  # Redirect to fetch top items

# Fetch user top artists or tracks
@app.route('/top-items')
def top_items():
    token_info = session.get('token_info', None)
    if not token_info:
        return redirect('/login')

    sp = spotipy.Spotify(auth=token_info['access_token'])

    # Request top 50 tracks
    results = sp.current_user_top_tracks(limit=20, time_range='medium_term')  

    # Extract the track names and artists
    all_top_tracks = [
        {
            'track_name': track['name'],
            'artists': [artist['name'] for artist in track['artists']]
        }
        for track in results['items']
    ]

    user_id = sp.current_user()['id']
    print(user_id)
    # Path to the JSON file
    json_file_path = f'user_data_{user_id}.json'

    # Clear and rewrite the JSON file with the new data for this user
    with open(json_file_path, 'w') as json_file:
        json.dump(all_top_tracks, json_file, indent=4)

    return redirect('/analyze-personality')

# GPT Model implementation

@app.route('/analyze-personality', methods=['GET'])
def analyze_personality():
    # Retrieve the user's top tracks from the JSON file
    token_info = session.get('token_info', None)
    if not token_info:
        return redirect('/login')

    sp = spotipy.Spotify(auth=token_info['access_token'])
    user_id = sp.current_user()['id']

    # Path to the JSON file
    json_file_path = f'user_data_{user_id}.json'

    try:
        with open(json_file_path, 'r') as json_file:
            top_tracks = json.load(json_file)
    except FileNotFoundError:
        return jsonify({"error": "User data file not found. Please fetch top items first."}), 404

    # Define the constant prompt
    constant_prompt = (
        'You are a virtual personality predictor. Your job is to write to the user a short paragraph. Include an explicit reference to 1-2 of the most popular artists. '
        'describing their personality based on their top artists and genres in the same grammar and language level as this prompt. '
        'First, you should consider the top artists and genres, and what the overarching themes are. Based on this, select a funny spirit '
        'animal that reflects the user\'s personality. Feel free to make bold claims that are funny. Predict age range, love life, hobbies, '
        'interests. Finish with a short new artist or genre recommendation that the user hasn\'t listened to, that matches the personality '
        'you described. Token limit is 200 so make sure you finish before.'
    )

    # Format the top tracks as a string
    formatted_tracks = "\n".join(
        [f"{idx + 1}. {track['track_name']} by {', '.join(track['artists'])}" for idx, track in enumerate(top_tracks)]
    )

    # Construct the input messages for the ChatGPT API
    messages = [
        {"role": "system", "content": constant_prompt},
        {"role": "user", "content": f"Here are the user's top 20 tracks:\n{formatted_tracks}"}
    ]

    # Call the ChatGPT API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=200  # Adjust based on the desired length of the response
        )
        assistant_message = response['choices'][0]['message']['content']
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Add CSS styles to the return message
    # Add CSS styles to the return message
    formatted_response = f"""
<html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Bubbles&family=Roboto+Mono&display=swap" rel="stylesheet">
        <style>
            body {{
                background: linear-gradient(to bottom, #A5DEB9, #F5F5F5); /* Light green gradient */
                font-family: 'Rubik Bubbles', cursive; /* Apply Rubik Bubbles globally */
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 20px;
                color: #234f23;
                text-align: center;
            }}
            h1 {{
                font-size: 100px;
                margin-bottom: 10px;
                font-weight: bold;
            }}
            p {{
                font-size: 18px;
                color: #555;
                margin: 10px 0;
            }}
            .container {{
                position: relative;
                margin-top: 40px;
                width: 600px;
                background-color: #ffffff;
                border-radius: 20px;
                padding: 20px;
                box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
            }}
            .message-box {{
                background: linear-gradient(to bottom, #137C38, #149C40); /* Subtle gradient */
                color: #fff;
                padding: 20px;
                border-radius: 10px 10px 15px 15px; /* Reduced top border radius */
                font-size: 20px;
                white-space: pre-line;
                text-align: center;
                font-family: 'Roboto Mono', monospace; /* Override to use typewriter-style font */
                margin-bottom: 20px; /* Adds space below the green text section */
            }}
            .recommendation {{
                font-weight: bold;
                color: #4CAF50;
                margin-top: 20px;
            }}
            .logout-button {{
                padding: 10px 20px;
                background-color: #fff;
                color: #234f23;
                border: 2px solid #234f23;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
                transition: transform 0.1s ease, box-shadow 0.1s ease;
            }}
            .logout-button:hover {{
                transform: scale(0.95);
                box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.2);
            }}
        </style>
    </head>
    <body>
        <h1>personify</h1>
        <p>What does your music say about you?</p>
        <div class="container">
            <div class="message-box">
                {assistant_message if assistant_message else "Loading your analysis..."}
            </div>
            <!-- Add the logout button with a link to the Spotify logout page -->
            <a href="http://localhost:3000/logout" class="logout-button">Logout</a>
        </div>
    </body>
</html>
"""



    return formatted_response




@app.route('/logout')
def logout():
    session.clear()  # Clear all session data

    # Clear Spotipy cache (optional)
    token_info = session.get('token_info', {})
    access_token = token_info.get('access_token', '')
    cache_file = f".cache"
    if os.path.exists(cache_file):
        os.remove(cache_file)
    
    return redirect("https://accounts.spotify.com/logout")


if __name__ == '__main__':
    app.secret_key = os.urandom(24)  # Secret key for sessions
    app.run(debug=True, host='0.0.0.0', port=3000)
    
