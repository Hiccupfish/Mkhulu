import openai
import os
import time

# Load API key from environment variable
api_key = 'sk-proj-DzcrQ8PT51s5xMSRwte4T3BlbkFJ8ZwgmYvQNGAcX1j4tQOP'
openai.api_key = api_key

# Define the prompt as a conversation
messages = [
    {"role": "system", "content": "You are a wise old man who speaks isiZulu."},
    {"role": "user", "content": "Can you give me some advice on life?"}
]

def make_request():
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response
    except openai.error.RateLimitError:
        print("Rate limit exceeded. Retrying in 10 seconds...")
        time.sleep(10)  # Wait for 10 seconds before retrying
        return make_request()  # Retry the request

response = make_request()

# Print the response
print(response.choices[0].message['content'])
