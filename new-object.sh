#!/bin/bash

# Check if correct number of arguments are provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <replacement_name>"
    exit 1
fi

# Assign arguments to variables
replacement_name="$1"
source_path="./src/.object"

# Create a timestamp for the destination directory
timestamp=$(date +"%Y%m%d_%H%M%S")
destination_path="./src/${replacement_name}"

# Copy the source directory to the new destination
cp -R "$source_path" "$destination_path"

# Function to rename files
rename_files() {
    local dir="$1"
    find "$dir" -depth -name "*object*" | while read -r file; do
        new_name=$(echo "$file" | sed "s/object/$replacement_name/g")
        mv "$file" "$new_name"
    done
}

# Function to replace content in files
replace_content() {
    find "$1" -type f -exec sed -i "s/object/$replacement_name/gI" {} +
    find "$1" -type f -exec sed -i "s/objects/$replacement_name/gI" {} +
}

# Call the function to rename files
rename_files "$destination_path"

# Replace content in files
replace_content "$destination_path"

echo "Process completed. Modified files are in $dest_path"
