import json

# Load the input data from 'input.json' file
with open('additional.json', 'r') as input_file:
    data = json.load(input_file)

# Define the new template structure
template = {
    "courseProgress": {
        "Introduction to Zylosite, Learn Website Sequence (Tour & Practice)": "Pending",
        "Text, Button & Block Editing, Add Video": "Pending",
        "Cogs, Grids, Components, Make Pages, Pop-Ups and Review": "Pending",
        "Parallax, Padding, Slide Show, Forms": "Pending",
        "Re-Create Site from Scratch (Redo Everything You Have Learned)": "Pending",
        "Chat GPT and Speed Test": "Pending",
        "Recap Test and Practicals Continue": "Pending",
        "Learn to Create Countdowns (Using Zylo Modules)": "Pending",
        "Website SEO, Favicons & Social Media": "Pending",
        "Learn to Teach: AWB Tutor Course (Compulsory)": "Pending",
        "Become Freelance Ready (Sign Up to Attract Your First Clients )": "Pending",
        "Sales Online and Local": "Pending"
    },
    "amountPaid": 0
}

# Iterate through the data and add the new template
for response in data.get("Form Responses 1", []):
    response.update(template)

# Save the modified data to 'output.json' file
with open('output.json', 'w') as output_file:
    json.dump(data, output_file, indent=4)

print("Data has been successfully updated and saved to 'output.json'.")