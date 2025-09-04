from flask import Flask, render_template, send_from_directory, jsonify
import os
from datetime import datetime

app = Flask(__name__)

# Configure static files
app.static_folder = 'static'
app.template_folder = 'templates'

@app.route('/')
def index():
    """Serve the main birthday card page"""
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve static files (CSS, JS, images, videos)"""
    return send_from_directory('.', filename)

@app.route('/media/<path:filename>')
def media_files(filename):
    """Serve media files (images and videos)"""
    return send_from_directory('.', filename)

@app.route('/api/media')
def get_media_list():
    """API endpoint to get list of available media files"""
    media_files = []
    
    # Define media files with their metadata
    media_data = [
        {
            'src': 'birthday2024.jpg',
            'type': 'image',
            'caption': 'Birthday celebration 2024 - A year full of joy and memories!'
        },
        {
            'src': 'frdsprem1.jpg',
            'type': 'image',
            'caption': 'Friendship moments - The best times are shared with friends!'
        },
        {
            'src': 'makewithfunprem.mp4',
            'type': 'video',
            'caption': 'Making memories with fun - Life is better when you\'re laughing!'
        },
        {
            'src': 'moviewithprem.jpg',
            'type': 'image',
            'caption': 'Movie time memories - Great stories shared together!'
        },
        {
            'src': 'premteaching.mp4',
            'type': 'video',
            'caption': 'Learning and growing - Knowledge shared is knowledge multiplied!'
        },
        {
            'src': 'premwithtrip.jpg',
            'type': 'image',
            'caption': 'Adventure time - Exploring the world, one trip at a time!'
        },
        {
            'src': 'snowboyprem.jpg',
            'type': 'image',
            'caption': 'Winter wonderland - Making snow angels and memories!'
        }
    ]
    
    # Check which files actually exist
    for media in media_data:
        if os.path.exists(media['src']):
            media_files.append(media)
    
    return jsonify(media_files)

@app.route('/api/calculate-age', methods=['POST'])
def calculate_age():
    """API endpoint to calculate age statistics"""
    from flask import request
    
    data = request.get_json()
    birth_date_str = data.get('birthDate')
    
    if not birth_date_str:
        return jsonify({'error': 'Birth date is required'}), 400
    
    try:
        birth_date = datetime.strptime(birth_date_str, '%Y-%m-%d')
        now = datetime.now()
        
        # Calculate exact age in years
        age_years = now.year - birth_date.year
        if now.month < birth_date.month or (now.month == birth_date.month and now.day < birth_date.day):
            age_years -= 1
        
        # Calculate total time lived
        total_seconds = int((now - birth_date).total_seconds())
        total_minutes = total_seconds // 60
        total_hours = total_minutes // 60
        total_days = total_hours // 24
        
        return jsonify({
            'ageYears': age_years,
            'totalDays': total_days,
            'totalHours': total_hours,
            'totalMinutes': total_minutes,
            'totalSeconds': total_seconds
        })
        
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400

@app.route('/health')
def health_check():
    """Health check endpoint for deployment"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # For local development
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
