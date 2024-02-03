const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb'); // Import ServerApiVersion
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS
app.use(cors());

// MongoDB connection
const uri = "mongodb+srv://zenosubash:zeno123456@cluster0.o8gbsbf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define mongoose schema and model (models/Contact.js)
const Contact = client.db("contactFormDB").collection("contacts");

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is the contact form API!');
});

// New route: Say Hello
app.get('/api/hello', (req, res) => {
  res.send('Hello from the server!');
});
// New route: Say Hello
app.get('/api/hello1', (req, res) => {
  res.send('Hello1 from the server!');
});
// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().toArray();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Add a new contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await Contact.insertOne({ name, email, phone });
    res.json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving contact', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB and start the server
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);
