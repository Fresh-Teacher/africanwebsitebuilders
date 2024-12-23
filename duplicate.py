import json
import os
from collections import defaultdict

# File paths
input_file_path = "data.json"  # Replace with your input file path
output_folder = "output"
output_file_path = os.path.join(output_folder, "duplicates.json")

# Load the JSON data
with open(input_file_path, 'r') as file:
    data = json.load(file)

# Extract responses
responses = data.get("Form Responses 1", [])

# Find duplicates
email_counts = defaultdict(list)

for index, response in enumerate(responses):
    email = response.get("Email Address", "").strip()
    email_counts[email].append(index)

# Identify duplicates
duplicates = {email: [responses[i] for i in indices] for email, indices in email_counts.items() if len(indices) > 1}

# Save duplicates to output file
if duplicates:
    # Ensure output folder exists
    os.makedirs(output_folder, exist_ok=True)
    
    # Save to JSON file
    with open(output_file_path, 'w') as outfile:
        json.dump({"duplicates": duplicates}, outfile, indent=4)
    
    print(f"Duplicate entries have been saved to: {output_file_path}")
else:
    print("No duplicate entries found.")
