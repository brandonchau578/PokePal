from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime
import json
import re
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

POKEMON_TCG_API_KEY = os.getenv('POKEMON_TCG_API_KEY')

class PokemonCardAPI:
    def __init__(self):
        self.base_url = "https://api.pokemontcg.io/v2"
        self.headers = {}
        if POKEMON_TCG_API_KEY:
            self.headers['X-Api-Key'] = POKEMON_TCG_API_KEY
    
    def search_cards(self, query, set_name=None):
        try:
            clean_query = re.sub(r'[^a-zA-Z0-9\s\-\']', '', query).strip()
            url = f"{self.base_url}/cards"
            
            if set_name:
                search_params = [
                    {'q': f'name:{clean_query} set.name:"{set_name}"', 'pageSize': 5},
                    {'q': f'name:*{clean_query}* set.name:*{set_name}*', 'pageSize': 5}
                ]
            else:
                search_params = [
                    {'q': f'name:{clean_query}', 'pageSize': 5}
                ]
            
            all_cards = []
            for params in search_params:
                try:
                    print(f"Trying search with params: {params}")
                    response = requests.get(url, params=params, headers=self.headers, timeout=15)
                    print(f"API Response status: {response.status_code}")
                    
                    if response.status_code == 200:
                        data = response.json()
                        cards = data.get('data', [])
                        print(f"Found {len(cards)} cards")
                        
                        for card in cards:
                            if not any(existing_card['id'] == card['id'] for existing_card in all_cards):
                                all_cards.append(card)
                        
                        if len(all_cards) >= 3:
                            break
                            
                except Exception as e:
                    print(f"Search failed: {e}")
                    continue
            
            return all_cards[:3]
            
        except Exception as e:
            print(f"Error searching cards: {e}")
            return []

    def get_card_prices(self, card):
        if 'tcgplayer' not in card:
            return None
        
        prices = card['tcgplayer'].get('prices', {})
        market_data = {}
        
        for condition in ['normal', 'holofoil', '1stEdition', 'unlimited']:
            if condition in prices:
                price_info = prices[condition]
                market_data[condition] = {
                    'low': price_info.get('low'),
                    'mid': price_info.get('mid'),
                    'high': price_info.get('high'),
                    'market': price_info.get('market')
                }
        
        return market_data if market_data else None

class SimpleChatBot:
    def __init__(self):
        self.card_api = PokemonCardAPI()
    
    def extract_pokemon_and_set(self, text):
        # Enhanced set mapping including variations
        known_sets = {
            'base set': 'Base',
            'base': 'Base',
            'jungle': 'Jungle',
            'fossil': 'Fossil',
            'team rocket': 'Team Rocket',
            'black white': 'Black & White',
            'black bolt': 'Black & White',  # Add this mapping
            'black and white': 'Black & White',
            'bw': 'Black & White',
            'xy': 'XY',
            'sun moon': 'Sun & Moon',
            'sword shield': 'Sword & Shield',
            'diamond pearl': 'Diamond & Pearl',
            'ruby sapphire': 'Ruby & Sapphire'
        }
        
        # Extract Pokemon names
        known_pokemon = ['charizard', 'pikachu', 'blastoise', 'venusaur', 'mewtwo', 'mew', 'zekrom', 'reshiram', 'kyurem']
        
        text_lower = text.lower()
        found_pokemon = []
        found_sets = []
        
        # Find Pokemon
        for pokemon in known_pokemon:
            if pokemon in text_lower:
                found_pokemon.append(pokemon.capitalize())
        
        # Find sets
        for set_variant, set_name in known_sets.items():
            if set_variant in text_lower:
                found_sets.append(set_name)
                print(f"Found set: {set_variant} -> {set_name}")
        
        return found_pokemon, found_sets
    
    def generate_simple_response(self, pokemon_name, set_name, card_data):
        if card_data:
            card = card_data[0]
            response = f"🎴 **{card['name']}**"
            
            if card.get('set'):
                response += f" from {card['set']}"
            
            response += f"\n\n📊 **Card Details:**"
            if card.get('rarity'):
                response += f"\n• Rarity: {card['rarity']}"
            if card.get('hp'):
                response += f"\n• HP: {card['hp']}"
            if card.get('types'):
                response += f"\n• Type: {', '.join(card['types'])}"
            if card.get('number'):
                response += f"\n• Card Number: {card['number']}"
            
            if card.get('prices'):
                response += f"\n\n💰 **Current Market Prices:**"
                for condition, prices in card['prices'].items():
                    condition_name = condition.replace('holofoil', 'Holofoil').replace('normal', 'Normal')
                    if prices.get('market'):
                        response += f"\n• {condition_name}: ${prices['market']:.2f}"
                    elif prices.get('mid'):
                        response += f"\n• {condition_name}: ${prices['mid']:.2f}"
            
            response += f"\n\nThis is a great card for collectors! 🌟"
            
        else:
            if set_name:
                response = f"I couldn't find {pokemon_name} cards from {set_name} right now. The Pokemon TCG API might be slow. Try asking about popular cards like Charizard, Pikachu, or Blastoise! 🎴"
            else:
                response = f"I couldn't find {pokemon_name} cards right now. The API might be having issues. Try asking about specific sets like 'Charizard from Base Set'! 🎴"
        
        return response
    
    def process_query(self, user_message):
        print(f"Processing query: {user_message}")
        
        pokemon_names, set_names = self.extract_pokemon_and_set(user_message)
        print(f"Extracted Pokemon: {pokemon_names}")
        print(f"Extracted sets: {set_names}")
        
        card_data = []
        
        if pokemon_names:
            pokemon_name = pokemon_names[0]
            set_name = set_names[0] if set_names else None
            
            print(f"Searching for: {pokemon_name} in set: {set_name}")
            cards = self.card_api.search_cards(pokemon_name, set_name)
            
            for card in cards:
                market_prices = self.card_api.get_card_prices(card)
                
                card_info = {
                    'name': card.get('name'),
                    'set': card.get('set', {}).get('name'),
                    'rarity': card.get('rarity'),
                    'number': card.get('number'),
                    'hp': card.get('hp'),
                    'types': card.get('types', []),
                    'prices': market_prices,
                    'image': card.get('images', {}).get('small')
                }
                card_data.append(card_info)
            
            response = self.generate_simple_response(pokemon_name, set_name, card_data)
        else:
            response = "I'd love to help you with Pokemon card info! Try asking something like 'What's the price of Charizard from Base Set?' 🎴"
        
        return {
            'response': response,
            'card_data': card_data,
            'timestamp': datetime.now().isoformat()
        }

chatbot = SimpleChatBot()

@app.route('/')
def home():
    return jsonify({
        'message': 'PokePal Simple Backend is running!',
        'features': ['Pokemon card search', 'Set-specific queries', 'No OpenAI dependency']
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'success': True, 'message': 'PokePal Simple running!'})

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        result = chatbot.process_query(user_message)
        
        return jsonify({
            'success': True,
            'data': result
        })
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': 'Failed to process message'}), 500

if __name__ == '__main__':
    print("🚀 Starting PokePal Simple server on port 5001...")
    print("✅ No OpenAI API required")
    print("ℹ️  Uses Pokemon TCG API for card data")
    app.run(debug=True, port=5001, host='0.0.0.0')