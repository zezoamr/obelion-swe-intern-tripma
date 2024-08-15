# Flight Booking API Documentation

## Table of Contents

**Search Cards
Success Page Cards
Home Page Cards
User Signup
Get Flight by ID
Get Available Airports
Get Flight Price Information
Search Flights
Payment Processing
clarifying objects**

1. **Search Cards**
   Endpoint: GET /SearchCards
   Description: Retrieves a list of places, cities, and a large card place.
   Response:

200 OK: Returns the data for places, cities, and a large card place.
500 Internal Server Error: If an error occurs while fetching the data.

Example Response:
json
``{     "places": [         {             "id": "place1",             "name": "Place 1",             "price": "100",             "city": "City 1",             "description": "Description of Place 1",             "image": "image1.jpg",             "newcolor": "red"         }     ],     "cities": [         {             "id": "city1",             "name": "City 1",             "description": "Description of City 1",             "image": "/cityimage1.jpg",             "price": "200",             "newcolor": "blue"         }     ],     "placesLargeCard": {         "id": "placeLarge",         "name": "Large Place",         "price": "300",         "city": "Large City",         "description": "Description of Large Place",         "image": "/largeimage.jpg",         "newcolor": "green"     } }``

2. **Success Page Cards**
   Endpoint: GET /SuccessPageCards
   Description: Retrieves a list of hotels and experiences.
   Response:

200 OK: Returns the data for hotels and experiences.
500 Internal Server Error: If an error occurs while fetching the data.

Example Response:
json
``{     "hotels": [         {             "id": "hotel1",             "name": "Hotel 1",             "price": "150",             "description": "Description of Hotel 1",             "image": "/hotelimage1.jpg"         }     ],     "experiences": [         {             "id": "experience1",             "name": "Experience 1",             "price": "50",             "description": "Description of Experience 1",             "image": "/experienceimage1.jpg"         }     ] }``

3. **Home Page Cards**
   Endpoint: GET /HomePageCards
   Description: Retrieves a list of places, cities, a large card place, and testimonials.
   Response:

200 OK: Returns the data for places, cities, a large card place, and testimonials.
500 Internal Server Error: If an error occurs while fetching the data.

Example Response:
json
``{     "places": [...],     "cities": [...],     "placesLargeCard": {...},     "testimonials": [         {             "id": "testimonial1",             "name": "Testimonial 1",             "description": "Description of Testimonial 1",             "image": "testimonialimage1.jpg"         }     ] }``

4. **User Signup**
   Endpoint: POST /signup
   Description: Creates a new user with the provided identifier (email or phone) and password.
   Request Body:

identifier (string): The email or phone number of the user.
password (string): The password for the user.

Response:

201 Created: If the user is created successfully.
400 Bad Request: If the identifier or password is missing, or if the user already exists.
500 Internal Server Error: If an error occurs while creating the user.

Example Response:
json
``{     "message": "User created successfully" }``

Example Response:

5. **Get Flight by ID**
   Endpoint: GET /Flights/[id]
   Description: Retrieves details of a specific flight by its ID.
   Request Parameters:

id (string): The ID of the flight to retrieve.

Response:

200 OK: Returns the flight details, including available seats.
404 Not Found: If the flight is not found.
500 Internal Server Error: If an error occurs while fetching the flight.

Example Response:
json
``{     "id": "123",     "from": "JFK",     "to": "LAX",     "startDate": "2024-08-15T00:00:00.000Z",     "dividerLocations": [...],     "seatsData": [...],     "availableSeats": 50 }``

6. **Get Available Airports**
   Endpoint: GET /Flights/airports
   Description: Retrieves a list of available airports.
   Response:

200 OK: Returns a list of airport codes.

Example Response:
json
``[     "NRT",     "PVG",     "STL",     "ATL",     "MSP",     "SFO",     "JFK",     "LAX" ]``

7. **Get Flight Price Information**
   Endpoint: GET /Flights/priceInfo
   Description: Retrieves flight price information, including price history and recommendations.
   Response:

200 OK: Returns flight price information.
500 Internal Server Error: If an error occurs while fetching the price information.

Example Response:
json
``{     "priceRecommendation": "We recommend booking soon. The average cost of this flight is $750, but could rise 18% to $885 in two weeks.",     "priceHistoryChartData": [         { "date": "Jan", "price": 850 },         { "date": "Feb", "price": 920 }     ],     "priceGridDates": ["2/12", "2/13", "2/14", "2/15", "2/16"],     "priceGridPrices": [         ["3/7", 837, 592, 592, 1308, 837]     ] }``

8. **Search Flights**
   Endpoint: GET /Flights
   Description: Searches for flights based on the provided criteria.
   Request Parameters:

from (string): The departure airport code.
to (string): The destination airport code.
startDate (string): The start date of the flight (ISO format).
endDate (string, optional): The end date of the flight (ISO format).
adults (integer, optional): The number of adult passengers.
minors (integer, optional): The number of minor passengers.

Response:

200 OK: Returns a list of outbound and return flights that match the criteria.
500 Internal Server Error: If an error occurs while fetching the flights.
Example Response:
json
``{     "outboundFlights": [...],     "returnFlights": [...] }``

9. **Payment Processing**
   Endpoint: POST /api/payment
   Description: Handles flight bookings, processes payments, and manages seat reservations.
   Request Body:
   json
   ``{ "cartItems": Array, "paymentData": Object, "flightSeats": Array, "passengersInfo": Array, "userId": String }``

Example Request Body:
json
``{   "cartItems": [     {       "id": "clzvabwj2000nqewqv58hiwxx",       "duration": "16h 45m",       "fromtoTime": "7:00AM - 4:15PM",       "stops": "1 stop",       "price": 624,       "businessprice": 1000,       "airline": "Hawaiian Airlines",       "stopduration": "2h 45m in ATL",       "type": "round trip",       "image": "/airlines.png",       "taxes": 1,       "from": "NRT",       "to": "LAX",       "startDate": "2024-09-11T00:00:00.000Z",       "endDate": "2024-09-12T00:00:00.000Z",       "flightid": "roundtripdepartingtest",       "dividerLocations": [4, 8, 18],       "seatsData": [         [           { "available": true, "class": "business" },           { "available": true, "class": "business" },           { "available": true, "class": "business" },           { "available": false }         ]       ],       "availableSeats": 30     },     {       "id": "clzvabwje000oqewqjk14kknf",       "duration": "12h 30m",       "fromtoTime": "10:00AM - 10:30PM",       "stops": "Non-stop",       "price": 850,       "businessprice": 1000,       "airline": "Emirates",       "stopduration": null,       "type": "round trip",       "image": "/airlines.png",       "taxes": 2,       "from": "LAX",       "to": "NRT",       "startDate": "2024-09-12T00:00:00.000Z",       "endDate": "2024-09-13T00:00:00.000Z",       "flightid": "roundtripdepartingtest2",       "dividerLocations": [4, 8, 18],       "seatsData": [         [           { "available": true, "class": "business" },           { "available": true, "class": "business" },           { "available": true, "class": "business" },           { "available": false }         ]       ],       "availableSeats": 25     }   ],   "paymentData": {     "paymentMethod": "credit_card",     "billingAddress": "ziad.shalaby01@eng-st.cu.edu.eg",     "saveCard": true,     "formData": {       "nameOnCard": "ziadsaafs",       "cardNumber": "4532244354891339553",       "expirationDate": "11/22",       "cvv": "123"     }   },   "flightSeats": [     [{ "row": 1, "seat": "A" }],     [{ "row": 2, "seat": "B" }]   ],   "passengersInfo": [     {       "passengerInfo": {         "firstName": "John",         "lastName": "Doe",         "dateOfBirth": "1990-01-01",         "gender": "Male",         "nationality": "US"       },       "emergencyContact": {         "name": "Jane Doe",         "relationship": "Spouse",         "phone": "+1234567890"       },       "checkedBags": 1     }   ],   "userId": "clzvaejww000411lkiv1b5l1y" }``
Process:

Validates input data.
Creates a payment information record.
Checks seat availability and marks selected seats as unavailable.
Creates passenger records with flight and seat information.
Creates a payment record linking all the information.
Formats and returns a response with booking details.

Response:

200 OK: Successful booking with details.
400 Bad Request: Invalid input data.
500 Internal Server Error: Server-side error during processing.

Note: Authentication is currently commented out. When uncommented, it uses NextAuth for session-based authentication.

**Clarifying Objects:**

dividerLocations: An array of integers representing the positions of dividers in the seating layout. For example, [4, 8, 18] might indicate dividers after the 4th, 8th, and 18th seats.
seatsData: A 2D array representing the seating layout of the flight. Each inner array represents a row of seats, and each seat object contains:

available (boolean): Indicates if the seat is available for booking.
class (string): The class of the seat (e.g., "business", "economy").

flightSeats: An array of arrays, each containing an object representing a selected seat for each flight in the booking. Each object includes:

row (number): The row number of the selected seat.
seat (string): The seat letter (e.g., "A", "B", "C").
