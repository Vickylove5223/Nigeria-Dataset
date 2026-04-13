import json
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(script_dir)

# URL-based logos
url_logos = {
    "ondo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2hbUswXKmotTAYN-v2YJ3FwSiJ5_orqgW5g&s",
    "osun": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnomxqRFrBoPgNzgSdq3urpurvekbHyo6fA&s",
    "oyo": "https://oyostate.gov.ng/wp-content/uploads/2025/07/oyo_logo.jpg",
    "plateau": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Plateau_State_Coat_of_arms.jpg",
    "rivers": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4x7WVjXJO-BRAS6_5RVZTq1HKRKcNPC02Q&s",
    "sokoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHWvm-lb39AkcMCerNaYg9-u1N1NboskImw&s",
    "taraba": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLYN6pUeIkSD_Su-CIqBnR9cT_gNKPmsZmIQ&s",
    "yobe": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Yobe_State_Government.png",
    "zamfara": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Seal_of_Zamfara_State_Government.jpg",
}

# Base64-based logos (read from txt files)
b64_states = ["kwara", "lagos", "nasarawa", "niger", "ogun"]
b64_logos = {}
for state in b64_states:
    txt_path = os.path.join(script_dir, f"{state}_logo.txt")
    if os.path.exists(txt_path):
        with open(txt_path, "r", encoding="utf-8") as f:
            b64_logos[state] = f.read().strip()
        print(f"Loaded {state} logo from txt file")
    else:
        print(f"WARNING: {txt_path} not found, skipping {state}")

all_logos = {**url_logos, **b64_logos}

json_files = [
    os.path.join(root_dir, "data", "nigeria-data.json"),
    os.path.join(root_dir, "public", "data", "nigeria-data.json"),
]

for json_file in json_files:
    with open(json_file, encoding="utf-8-sig") as f:
        data = json.load(f)

    updated = 0
    for state in data["states"]:
        key = state["name"].lower()
        if key in all_logos:
            state["logo"] = all_logos[key]
            updated += 1
            print(f"Updated {state['name']} in {os.path.basename(json_file)}")

    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Saved {json_file} ({updated} states updated)")

print("Done!")
