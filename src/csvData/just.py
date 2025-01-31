import csv

# Function to add 'Image' field
def add_image_to_csv(input_file, output_file):
    # Open the input CSV file in read mode
    with open(input_file, 'r', newline='', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames + ['Image']  # Adding 'Image' to the fieldnames

        # Open the output CSV file in write mode
        with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames)
            writer.writeheader()

            # Process each row and add an image URL or path
            for row in reader:
                # Prompt user for image input for each row
                image_path = input(f"Enter the image path or URL for {row['Name']}: ")
                row['Image'] = image_path  # Adding the image path/URL to the row
                writer.writerow(row)

    print(f"Updated CSV file with images saved as {output_file}")

# Example usage
input_csv = 'cattle_breeds.csv'  # Input CSV file (your original file)
output_csv = 'cattle_breeds.csv'  # Output CSV file with the added 'Image' field

add_image_to_csv(input_csv, output_csv)
