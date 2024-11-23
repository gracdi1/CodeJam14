import os
from flask import Flask, redirect, request, jsonify, session
from spotipy.oauth2 import SpotifyOAuth
import spotipy

app = Flask(__name__)

# Your Spotify API credentials
CLIENT_ID = '78ff7eb57b0845d58d5a4df439c2f569'
CLIENT_SECRET = 'e499ca7b56d2404eadb3f2942d61dfeb'
REDIRECT_URI = 'http://localhost:3000'

# Initialize SpotifyOAuth
sp_oauth = SpotifyOAuth(client_id=CLIENT_ID,
                         client_secret=CLIENT_SECRET,
                         redirect_uri=REDIRECT_URI,
                         scope="user-top-read user-library-read")

# Home route
@app.route('/')
def home():
    return 'Welcome to the Spotify Personality Analyzer App! <a href="/login">Login with Spotify</a>'

# Login route, redirects to Spotify for authentication
@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

# Callback route, after Spotify redirects the user here
@app.route('/callback')
def callback():
    token_info = sp_oauth.get_access_token(request.args['code'])
    session['token_info'] = token_info  # Store the token for later use
    return redirect('/top-items')  # Redirect to fetch top items

# Fetch user top artists or tracks
@app.route('/top-items')
def top_items():
    token_info = session.get('token_info', None)
    if not token_info:
        return redirect('/login')

    # Get user top artists or tracks
    print("i got here yay")
    sp = spotipy.Spotify(auth=token_info['access_token'])
    results = sp.current_user_top_tracks(limit=5, time_range='medium_term')  # Fetch top tracks
    top_tracks = results['items']
    track_names = [track['name'] for track in top_tracks]
    
    return jsonify(track_names)  # Return the top tracks as JSON

if __name__ == '__main__':
    app.secret_key = os.urandom(24)  # Secret key for sessions
    app.run(debug=True, host='0.0.0.0', port=3000)
