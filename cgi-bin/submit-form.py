import cgi
import cgitb

# Enable detailed error messages for debugging (remove in production)
cgitb.enable()

# Parse form data from the request
form = cgi.FieldStorage()

# Get form field values
name = form.getvalue("name")
email = form.getvalue("email")
message = form.getvalue("message")

# Process form data, e.g., send email or store in database

# Print response to the client
print("Content-type: application/json")
print()
print('{"message": "Form submitted successfully"}')
