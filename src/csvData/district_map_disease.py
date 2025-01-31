import csv
from collections import defaultdict

def process_disease_location(input_file, output_file):
    # Create a map to store locations and a set of diseases
    location_to_diseases = defaultdict(set)
    
    # Open and read the input CSV file
    with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        
        # Process each row in the CSV file
        for row in reader:
            disease = row['Disease']
            locations = row['Location'].split(', ')  # Split locations by comma and space
            
            # For each location, add the disease to the set of diseases
            for location in locations:
                location_to_diseases[location].add(disease)
    
    # Write the output CSV file
    with open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
        fieldnames = ['Location', 'Diseases']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        
        writer.writeheader()  # Write the header
        
        # Write each location and its associated diseases
        for location, diseases in location_to_diseases.items():
            writer.writerow({
                'Location': location,
                'Diseases': ', '.join(diseases)  # Join diseases with commas
            })

    print(f"Output CSV file '{output_file}' has been created successfully.")

# Example usage:
input_file = 'DiseasesByDistrict.csv'  # Input CSV file
output_file = 'DiseasesByDistrict2.csv'  # Output CSV file
process_disease_location(input_file, output_file)
