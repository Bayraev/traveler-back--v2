# Instruction to setup Node.js Express Server

## Essential Packages

All packages are installed using npm.
They are must be LTS versions.
They must be compatible each other.

express
mongoose
cors
dotenv
joi
http-errors
supertest
jest

## File Structure

This is a sample file structure for the backend.

backend/
├── config/
│ ├── db.js
│ └── env.js
├── models/
│ ├── User.js
│ ├── Friend.js
│ ├── Location.js
│ └── Quest.js
├── routes/
│ ├── auth.routes.js
│ ├── quest.routes.js
│ └── user.routes.js
├── controllers/
│ ├── auth.controller.js
│ ├── quest.controller.js
│ └── user.controller.js
├── middlewares/
│ ├── errorHandler.js
│ └── validateRequest.js
├── utils/
│ └── validationSchemas.js
├── tests/
│ ├── auth.test.js
│ ├── quest.test.js
│ └── user.test.js
└── server.js

## Database Configuration

User (critical: include virtuals for friends count)
const userSchema = new Schema({
username: { type: String, unique: true, required: true },
password: { type: String, required: true },
avatar: { type: String, default: '/default-avatar.png' },
completedQuests: [{
questId: { type: Schema.Types.ObjectId, ref: 'Quest' },
completionDate: { type: Date, default: Date.now },
photoUrl: String
}],
friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

Location.js (map config crucial for OpenLayers)
const locationSchema = new Schema({
name: { type: String, required: true },
continent: { type: String, required: true },
country: { type: String, required: true },
city: { type: String, required: true },
map: {
longitude: { type: Number, required: true },
latitude: { type: Number, required: true },
zoom: { type: Number, default: 12 }
}
});

Quest.js (coupon validation)
const questSchema = new Schema({
locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
description: { type: String, required: true },
photoUrl: { type: String, required: true },
coupon: {
type: String,
required: true,
validate: {
validator: v => /^[A-Z]{3}\_[A-Z0-9]{4}$/.test(v),
message: String
}
}
});

## API Endpoints Specification

### Authentication Flow

POST /api/signup
Validation: username (5-30 chars), password (6+ chars)
Error: 409 Conflict if username exists
Success: 201 Created with user data (exclude password)

POST /api/signin
Validation: check username/password match
Error: 401 Unauthorized for invalid credentials
Success: 200 OK with user data

## Quest System

GET /api/quests/random (geospatial ready)

1. Aggregate pipeline:
   Quest.aggregate([
   { $sample: { size: 1 } },
   {
   $lookup: {
   from: 'locations',
   localField: 'locationId',
   foreignField: '_id',
   as: 'location'
   }
   },
   { $unwind: '$location' }
   ])

2. Response format:
   {
   "\_id": "questId",
   "description": "Quest text",
   "photoUrl": "image.jpg",
   "coupon": "RUS_MSK1",
   "location": {
   "map": {
   "longitude": 37.6176,
   "latitude": 55.7558,
   "zoom": 12
   }
   }
   }

## Quest Completion

POST /api/users/:userId /quests
Body: { questId: string, photoUrl: string }
Validation: check quest exists and user hasn't completed it
Error: 400 if already completed
Update: $push to completedQuests array

## Error Handling Strategy

### Middleware Hierarchy

Request Validation (Joi)
const validateRequest = (schema) => (req, res, next) => {
const { error } = schema.validate(req.body);
if (error) return next(createHttpError(400, error.details[0].message));
next();
};

Database Errors
Handle Mongoose errors in errorHandler.js:
if (error.name === 'MongoServerError' && error.code === 11000) {
status = 409;
message = 'Username already exists';
}

Final Error Formatter:
res.status(status).json({
error: {
status,
message,
timestamp: new Date().toISOString()
}
});

## Testing Strategy (Jest)

### Test Configuration

jest.config.js:
module.exports = {
testEnvironment: 'node',
coveragePathIgnorePatterns: ['/node_modules/', '/config/'],
testTimeout: 10000
};

Sample Test Case
describe('GET /quests/random', () => {
it('should return quest with valid geodata', async () => {
const res = await request(app).get('/api/quests/random');
expect(res.status).toBe(200);
expect(res.body).toHaveProperty('location.map');
expect(typeof res.body.location.map.longitude).toBe('number');
});
});

## Critical Implementation Notes

### OpenLayers Map Requirements

Ensure all locations have valid WGS84 coordinates (EPSG:4326)
Zoom levels must be between 1-20 (recommended 12-15 for city views)
Pre-cache locations with ensureIndexes() on startup

### Security Considerations

Plaintext Password Warning: Add middleware to warn in dev environment
if (process.env.NODE_ENV !== 'production') {
console.warn('SECURITY WARNING: Passwords stored in plaintext');
}

## Documentation Links

Mongoose Validation - https://mongoosejs.com/docs/validation.html
Express Error Handling - https://expressjs.com/en/guide/error-handling.html
Jest Testing - https://jestjs.io/docs/getting-started
OpenLayers Coordinate Systems - https://openlayers.org/doc/features/coordinate-systems.html

## First-Run Checklist

Create .env with:
MONGO_URI=mongodb://localhost:27017/questapp
PORT=5000

Seed initial data for quests (do not add more just seed this one object)
const locationsAndCountries = [
{
country: "Россия",
cities: [
{
city: "Москва",
quests: [
{
description: "Посетите Красную площадь.",
photoUrl: "https://example.com/moscow_red_square.jpg",
coupon: "RUS_MSK1"
},
{
description: "Сходите в Эрмитаж.",
photoUrl: "https://example.com/hermitage.jpg",
coupon: "RUS_MSK2"
},
{
description: "Прокатитесь на метро.",
photoUrl: "https://example.com/moscow_metro.jpg",
coupon: "RUS_MSK3"
}
]
},
{
city: "Санкт-Петербург",
quests: [
{
description: "Посетите Невский проспект.",
photoUrl: "https://example.com/nevskiy_prospect.jpg",
coupon: "RUS_SP1"
},
{
description: "Пройдитесь по набережной Невы.",
photoUrl: "https://example.com/neva_river.jpg",
coupon: "RUS_SP2"
},
{
description: "Посетите Петропавловскую крепость.",
photoUrl: "https://example.com/peter_and_paul.jpg",
coupon: "RUS_SP3"
}
]
}
]
}
]
