const mockFlights = [
    {
    duration: "16h 45m",
    fromtoTime: "7:00AM - 4:15PM",
    stops: "1 stop",
    price: 624,
    businessprice: 1000,
    airline: "Hawaiian Airlines",
    stopduration: "2h 45m in ATL",
    type: "round trip",
    image: "/airlines.png",
    flightid: "roundtripdepartingtest",
    taxes: 1,
    from: "NRT",
    to: "LAX",
    startDate: "2024-09-11",
    endDate: "2024-09-12",
    dividerLocations: [4, 8, 18],
    seatsData: [
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' },
        { available: false }
        ],
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' }
        ],
        [
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: false },
        { available: false },
        { available: false },
        ],
        [
        { available: false },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' }
        ],
        [
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' }
        ],
        [
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' }
        ],
    ]
    },
    {
    duration: "12h 30m",
    fromtoTime: "10:00AM - 10:30PM",
    stops: "Non-stop",
    price: 850,
    businessprice: 1000,
    airline: "Emirates",
    type: "round trip",
    image: "/airlines.png",
    flightid: "roundtripdepartingtest2",
    taxes: 2,
    from: "LAX",
    to: "NRT",
    startDate: "2024-09-12",
    endDate: "2024-09-13",
    dividerLocations: [3, 7, 17],
    seatsData: [
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: false }
        ],
        [
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' }
        ],
        [
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false }
        ],
        [
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' }
        ],
        [
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false }
        ],
    ]
    },
    {
    duration: "8h 15m",
    fromtoTime: "11:30PM - 7:45AM",
    stops: "1 stop",
    price: 530,
    businessprice: 1000,
    airline: "Lufthansa",
    stopduration: "1h 30m in MSP",
    type: "round trip",
    image: "/airlines.png",
    flightid: "LH567812",
    taxes: 1,
    from: "ATL",
    to: "PVG",
    startDate: "2024-11-22",
    endDate: "2024-11-29",
    dividerLocations: [3, 6, 16],
    seatsData: [
        [
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: false },
        { available: true, class: 'business' }
        ],
        [
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: true, class: 'business' },
        { available: false }
        ],
        [
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false }
        ],
        [
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' },
        { available: false },
        { available: true, class: 'economy' }
        ],
        [
        { available: false },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' },
        { available: true, class: 'economy' }
        ],
    ]
    },
    {
        duration: "16h 45m",
        fromtoTime: "7:00AM - 4:15PM",
        stops: "1 stop",
        price: 624,
        businessprice: 1000,
        airline: "Hawaiian Airlines",
        stopduration: "2h 45m in ATL",
        type: "round trip",
        image: "/airlines.png",
        flightid: "FiG432142",
        taxes: 1,
        from: "SFO",
        to: "JFK",
        startDate: "2024-09-01",
        endDate: "2024-09-08",
        dividerLocations: [4, 8, 18],
        seatsData: [
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' },
            { available: false }
            ],
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' }
            ],
            [
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: false },
            { available: false },
            { available: false },
            ],
            [
            { available: false },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' }
            ],
            [
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' }
            ],
            [
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' }
            ],
        ]
        },
        {
        duration: "12h 30m",
        fromtoTime: "10:00AM - 10:30PM",
        stops: "Non-stop",
        price: 850,
        businessprice: 1000,
        airline: "Emirates",
        type: "one way",
        image: "/airlines.png",
        flightid: "EM781103",
        taxes: 2,
        from: "LAX",
        to: "NRT",
        startDate: "2024-10-15",
        endDate: "2024-10-15",
        dividerLocations: [3, 7, 17],
        seatsData: [
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: false }
            ],
            [
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' }
            ],
            [
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false }
            ],
            [
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' }
            ],
            [
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false }
            ],
        ]
        },
        {
        duration: "8h 15m",
        fromtoTime: "11:30PM - 7:45AM",
        stops: "1 stop",
        price: 530,
        businessprice: 1000,
        airline: "Lufthansa",
        stopduration: "1h 30m in MSP",
        type: "round trip",
        image: "/airlines.png",
        flightid: "LH567589",
        taxes: 1,
        from: "ATL",
        to: "PVG",
        startDate: "2024-11-22",
        endDate: "2024-11-29",
        dividerLocations: [3, 6, 16],
        seatsData: [
            [
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: false },
            { available: true, class: 'business' }
            ],
            [
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: true, class: 'business' },
            { available: false }
            ],
            [
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false }
            ],
            [
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' },
            { available: false },
            { available: true, class: 'economy' }
            ],
            [
            { available: false },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' },
            { available: true, class: 'economy' }
            ],
        ]
        },
        {
            duration: "16h 45m",
            fromtoTime: "7:00AM - 4:15PM",
            stops: "1 stop",
            price: 624,
            businessprice: 1000,
            airline: "Hawaiian Airlines",
            stopduration: "2h 45m in ATL",
            type: "one way",
            image: "/airlines.png",
            flightid: "FiG432116",
            taxes: 1,
            from: "SFO",
            to: "JFK",
            startDate: "2024-09-01",
            endDate: "2024-09-08",
            dividerLocations: [4, 8, 18],
            seatsData: [
                [
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: false },
                { available: true, class: 'business' }
                ],
                [
                { available: true, class: 'business' },
                { available: false },
                { available: true, class: 'business' },
                { available: false }
                ],
                [
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: true, class: 'business' }
                ],
                [
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: false },
                { available: true, class: 'business' }
                ],
                [
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' }
                ],
                [
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: false },
                { available: false },
                { available: false },
                { available: false },
                ],
                [
                { available: false },
                { available: false },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' }
                ],
                [
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' }
                ],
                [
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' }
                ],
            ]
            },
            {
            duration: "12h 30m",
            fromtoTime: "10:00AM - 10:30PM",
            stops: "Non-stop",
            price: 850,
            businessprice: 1000,
            airline: "Emirates",
            type: "one way",
            image: "/airlines.png",
            flightid: "Only3seats",
            taxes: 2,
            from: "LAX",
            to: "NRT",
            startDate: "2024-10-15",
            endDate: "2024-10-15",
            dividerLocations: [3,],
            seatsData: [
                [
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: false }
                ],
            ]
            },
            {
            duration: "8h 15m",
            fromtoTime: "11:30PM - 7:45AM",
            stops: "1 stop",
            price: 530,
            businessprice: 1000,
            airline: "Lufthansa",
            stopduration: "1h 30m in MSP",
            type: "one way",
            image: "/airlines.png",
            flightid: "LH516789",
            taxes: 1,
            from: "ATL",
            to: "PVG",
            startDate: "2024-11-22",
            endDate: "2024-11-29",
            dividerLocations: [3, 6, 16],
            seatsData: [
                [
                { available: true, class: 'business' },
                { available: false },
                { available: true, class: 'business' },
                { available: true, class: 'business' }
                ],
                [
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: false },
                { available: true, class: 'business' }
                ],
                [
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: true, class: 'business' },
                { available: false }
                ],
                [
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: false }
                ],
                [
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' },
                { available: false },
                { available: true, class: 'economy' }
                ],
                [
                { available: false },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' },
                { available: true, class: 'economy' }
                ],
            ]
            },
];


const data = {
    places: [
    {
        name: "The Bund",
        price: "$598",
        city: "Shanghai",
        description: "China's most international city",
        image: '/card1.jpg',
        newcolor: "#98FF98",
        cityref: "city_kyoto_id"
    },
    {
        name: "Eiffel Tower",
        price: "$750",
        city: "Paris",
        description: "Icon of France and symbol of love",
        image: '/card1.jpg',
        cityref: "city_kyoto_id"
    },
    {
        name: "Colosseum",
        price: "$480",
        city: "Rome",
        description: "Ancient amphitheater in the heart of Rome",
        image: '/card1.jpg',
        newcolor: "#FFD700",
        cityref: "city_kyoto_id"
    }
    ],
    cityLocations: [
    {
        name: "The Bund",
        city: "Shanghai",
        description: "China's most international city",
        image: '/card1.jpg',
        newcolor: "#98FF98",
        price: "$598",
        cityref: "city_kyoto_id"
    },
    {
        name: "Central Park",
        city: "New York",
        description: "Urban oasis in the heart of Manhattan",
        image: '/card1.jpg',
        newcolor: "#87CEFA",
        cityref: "city_kyoto_id"
    },
    {
        name: "Bondi Beach",
        city: "Sydney",
        description: "Famous beach with golden sand and blue waters",
        image: '/card1.jpg',
        price: "$400",
        cityref: "city_kyoto_id"
    }
    ],
    testimonials: [
    {
        avatarSrc: '/avatar.jpg',
        name: "Yifei Chen",
        location: "Seoul, South Korea",
        date: "April 2019",
        rating: 5,
        review: "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me"
    },
    {
        avatarSrc: '/avatar.jpg',
        name: "Maria Garcia",
        location: "Barcelona, Spain",
        date: "July 2022",
        rating: 4,
        review: "Tripma made planning my European adventure a breeze. The interface is user-friendly and the customer service is top-notch. Highly recommended!"
    },
    {
        avatarSrc: '/avatar.jpg',
        name: "John Smith",
        location: "Toronto, Canada",
        date: "December 2021",
        rating: 3,
        review: "Overall, a good experience with Tripma. Had some issues with a delayed flight, but their support team was helpful in resolving the situation."
    }
    ]
};


const hotels = [
    {
    name: "Genshin SASA",
    price: "$529",
    description: "Secluded onsen with private cypress bath",
    image: '/card1.jpg',
    cityref: "city_shimane_id"
    },
    {
    name: "Hotel THE FLAG Kyoto",
    price: "$139",
    description: "Modern hotel in the heart of Kyoto",
    image: '/card1.jpg',
    cityref: "city_kyoto_id"
    }
];

const experiences = [
    {
    name: "9-Hour Sakegura",
    price: "$69",
    description: "A cultural experience of Shimane cuisine",
    image: '/card1.jpg',
    cityref: "city_shimane_id"
    },
    {
    name: "Kyoto Kimono",
    price: "$89",
    description: "Wear the cultural dress of Japan around the city",
    image: '/card1.jpg',
    cityref: "city_kyoto_id"
    }
];

const cities = [
    {
        id: "city_kyoto_id",
    },
    {
        id: "city_shimane_id",
    },
]
    
module.exports = { data, mockFlights,  hotels, experiences, cities };