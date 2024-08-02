import requests

# Replace with your actual API key
API_URL = "https://api-inference.huggingface.co/models/openai-community/gpt2"
headers = {
    "Authorization": "Bearer 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"  # Replace with your actual API key
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

# Example payload
output = query({
    "inputs": "Tell me about the history and culture of South Africa."
})

print("Output:", output)
