const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const app = express();

const uploadsDir = path.join(__dirname, '..', '..', 'applicationuploads');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/applicationuploads', express.static(uploadsDir));

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Workboard_Model")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  uniqcode: { type: String, unique: true },
  salary: String,
  department: String,
  joiningDate: String,
  status: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const messageSchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  message: String,
  sentAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

const appSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  position: String,
  resumePath: String,
  status: { type: String, default: "pending" },
}, { timestamps: true });
const Application = mongoose.model('Application', appSchema);

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  sentBy: { type: String, default: "admin" }
});
const Notification = mongoose.model("Notification", notificationSchema);

const taskSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  status: {
    type: String,
    enum: ['assigned', 'working', 'finished'],
    default: 'assigned'
  }
});
const Task = mongoose.model('Taskmanage', taskSchema);

const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: String,
  attendees: [{
    employeeId: String,
    name: String,
    email: String,
    attending: Boolean
  }],
  audience: {
    type: String,
    enum: ["selected", "all"],
    default: "all"
  },
});
const Meeting = mongoose.model("Meeting", meetingSchema);

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  description: String,
  type: String,
  status: { type: String, default: "pending" },
  toemail: String,
}, { timestamps: true });


const Myapplication = mongoose.model("EmployeeApplication", applicationSchema);


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

app.put('/users/update-password', (req, res) => {
  const { email, uniqcode, password } = req.body;
  if (!email || !uniqcode || !password)
    return res.status(400).json({ message: "Email, uniqcode, and password required" });

  User.findOneAndUpdate({ email, uniqcode }, { password }, { new: true })
    .then(user => {
      if (!user) return res.status(404).json({ message: "Incorrect email or code" });
      res.json({ message: "Password updated successfully." });
    });
});

app.post('/applynow', upload.single('resume'), (req, res) => {
  const { firstname, lastname, email, position } = req.body;
  if (!req.file) return res.status(400).json({ message: "Resume is required" });

  const record = new Application({
    firstname,
    lastname,
    email,
    position,
    resumePath: req.file.filename
  });
  record.save().then(() =>
    res.status(201).json({ message: "Application submitted successfully" })
  );
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user || user.password !== password)
      return res.status(401).json({ auth: false, message: "Invalid credentials" });
    res.json({ auth: true, user });
  });
});

app.get('/users', (req, res) => {
  User.find().then(users => res.json(users));
});

app.get('/search/:key', (req, res) => {
  User.find({
    "$or": [
      { name: { $regex: req.params.key, $options: "i" } },
      { email: { $regex: req.params.key, $options: "i" } },
      { role: { $regex: req.params.key, $options: "i" } }
    ]
  }).then(result => res.send(result));
});

app.delete('/users/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    if (result.deletedCount > 0) {
      res.send({ message: "Employee data deleted successfully" });
    } else {
      res.send({ message: "No Employee found." });
    }
  });
});

app.get('/updateuser/:id', (req, res) => {
  User.findById(req.params.id).then(user => {
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });
});

app.put('/updateuser/:id', (req, res) => {
  const { name, email, role, salary, department, joiningDate, status } = req.body;
  User.findById(req.params.id).then(user => {
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    user.salary = salary ?? user.salary;
    user.department = department ?? user.department;
    user.joiningDate = joiningDate ?? user.joiningDate;
    user.status = status ?? user.status;
    user.save().then(() => {
      res.json({ message: 'User updated successfully', user });
    });
  });
});

app.post("/addemployee", (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => res.status(200).json({ message: "Employee added successfully" }))
    .catch(err => {
      if (err.code === 11000) {
        res.status(400).json({ message: "Uniqcode or email already exists" });
      } else {
        res.status(500).json({ message: "Failed to add employee" });
      }
    });
});

app.post('/Sendmsg', (req, res) => {
  const { employeeId, name, email, message } = req.body;
  if (!employeeId || !name || !email || !message.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newMsg = new Message({ employeeId, name, email, message });
  newMsg.save().then(() => res.status(201).json({ message: "Message stored successfully" }));
});

app.post('/sendnotification', async (req, res) => {
  const { message, timestamp, sentBy } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: "Notification message is required" });
  }
  try {
    const notification = new Notification({
      message,
      timestamp: timestamp ? new Date(timestamp) : undefined,
      sentBy: sentBy || "adminme@12.com"
    });
    await notification.save();
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (err) {
    console.error("Notification save error:", err);
    res.status(500).json({ message: "Failed to send notification" });
  }
});

app.get('/notifications', async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});

app.get('/messages/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  if (employeeId === "admin") {
    const messages = await Message.find();
    return res.json({ messages });
  }
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }
  const messages = await Message.find({ employeeId });
  res.json({ messages });
});

app.post('/providetask', (req, res) => {
  const { name, email, description, status } = req.body;
  if (!name || !email || !description) {
    return res.status(400).json({ message: "Name, email, and description are required" });
  }
  const task = new Task({ name, email, description, status });
  task.save().then(savedTask => {
    res.status(201).json({ message: "Task assigned successfully", task: savedTask });
  });
});

app.get('/providetask', (req, res) => {
  Task.find().then(tasks => {
    res.json(tasks);
  });
});

app.put('/updateprovidetask/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(updatedTask => {
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task: updatedTask });
  });
});

app.delete('/deleteprovidetask/:id', (req, res) => {
  Task.deleteOne({ _id: req.params.id }).then(result => {
    if (result.deletedCount === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  });
});

app.get("/gettask", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.put("/updatetask/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Task.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
});

app.post("/createmeeting", (req, res) => {
  const { title, description, time, type, selectedEmployees } = req.body;

  const getAttendees = type === "all"
    ? User.find().then(users =>
      users.map(user => ({
        employeeId: user._id.toString(),
        name: user.name,
        email: user.email,
        attending: false
      }))
    )
    : User.find({ _id: { $in: selectedEmployees } }).then(users =>
      users.map(user => ({
        employeeId: user._id.toString(),
        name: user.name,
        email: user.email,
        attending: false
      }))
    );

  getAttendees.then(attendees => {
    const newMeeting = new Meeting({
      title,
      description,
      time,
      attendees,
      audience: type,
    });
    return newMeeting.save();
  })
    .then(saved => res.json({ message: "Meeting created", meeting: saved }))
    .catch(() => res.status(500).json({ message: "Failed to create meeting" }));
});

app.get("/allmeeting", (req, res) => {
  Meeting.find()
    .then(meetings => res.json(meetings))
    .catch(() => res.status(500).json({ message: "Failed to fetch meetings" }));
});

app.get("/meetingsforemployee/:email", async (req, res) => {
  const { email } = req.params;
  const allMeetings = await Meeting.find();
  const meetingsForEmployee = allMeetings.filter(meeting => {
    if (meeting.audience === "all") return true;
    return meeting.attendees.some(att => att.email === email);
  });

  if (meetingsForEmployee.length > 0) {
    return res.json({ hasMeetings: true, meetings: meetingsForEmployee });
  } else {
    return res.json({ hasMeetings: false, meetings: [] });
  }
});

app.get("/userprofile/:email", (req, res) => {
  const email = req.params.email;
  User.findOne({ email }).then(user => {
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  });
});

app.post("/submitapplication", async (req, res) => {
  const app = new Myapplication(req.body);
  await app.save();
  res.json({ message: "Application submitted" });
});

app.get("/myapplications/:email", async (req, res) => {
  const apps = await Myapplication.find({ email: req.params.email });
  res.json(apps);
});

app.put("/updateapplication/:id", async (req, res) => {
  await Myapplication.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.json({ message: "Status updated" });
});

app.get("/allemployeeapplications", async (req, res) => {
  const applications = await Myapplication.find().sort({ createdAt: -1 });
  res.json(applications);
});

app.get("/allfresherapplications", async (req, res) => {
  const applications = await Application.find().sort({ createdAt: -1 });
  res.json(applications);
});

app.put("/updatestaffstatus/:id", async (req, res) => {
  const { status } = req.body;
  await Myapplication.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Status updated" });
});

app.put("/updatefresherstatus/:id", async (req, res) => {
  const { status } = req.body;
  await Application.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Fresher status updated" });
});

app.get("/getanalytics", async (req, res) => {
  const turnoverRes = await axios.get("http://localhost:8000/company-turnover");
  const growthRes = await axios.get("http://localhost:8000/company-growth");
  const revenueRes = await axios.get("http://localhost:8000/company-revenue");
  const attritionRes = await axios.get("http://localhost:8000/company-attrition");

  res.json({
    turnover: turnoverRes.data.turnover,
    growth: growthRes.data.growth,
    revenue: revenueRes.data.revenue,
    attrition: attritionRes.data.attrition,
  });
});


app.listen(5021, () => console.log("🚀 Server running at http://localhost:5021"));