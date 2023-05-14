const express = require("express");
const path = require("path");
const fs = require('fs');
const multer = require('multer')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const app = express();

dotenv.config();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(express.urlencoded({ extended: false })); // to parse the body of the request (POST)
app.use(express.static( path.join(__dirname, '/public')));
app.use(connectLiveReload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Fake Opening Jobs Data
const jobs = [
    {
        jobTitle: 'Front-End Developer',
        jobPosition: 1,
        jobLocation: 'New York',
        jobRoles: [
            'Develop new user-facing features',
            'Build reusable code and libraries for future use',
            'Ensure the technical feasibility of UI/UX designs',
            'Optimize application for maximum speed and scalability',
            'Assure that all user input is validated before submitting to back-end',
            'Collaborate with other team members and stakeholders',
            'Proficient understanding of web markup, including HTML5, CSS3',
            'Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS',
            'Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery',
            'Good understanding of asynchronous request handling, partial page updates, and AJAX',
        ],
        jobQualifications: [
            'Bachelor\'s degree in Computer Science or related field',
            'At least 2 years of experience in the field or in a related area',
            'Strong programming skills in Java, Python, or other relevant languages',
            'Experience with Agile methodologies and software development lifecycle'
        ],
    },
    {
        jobTitle: 'Back-End Developer',
        jobPosition: 2,
        jobLocation: 'Jersey City',
        jobRoles: [
            'Designing, developing, testing, and maintaining server-side applications and software systems',
            'Ensuring the performance, scalability, and security of server-side applications and databases',
            'Working with databases such as MySQL, PostgreSQL, or MongoDB to manage data storage and retrieval',
            'Troubleshooting and resolving issues related to server-side applications and databases',
            'Documenting technical specifications, code changes, and other relevant information for server-side applications and APIs'
        ],
        jobQualifications: [
            "A bachelor's degree in computer science, software engineering, or a related field is often preferred.",
            "Proficiency in one or more server-side programming languages such as Java, Python, Ruby, or Node.js is usually required. Knowledge of other languages such as C++, C#, or PHP may also be beneficial.",
            "Experience with database management systems such as MySQL, PostgreSQL, or MongoDB is often required.",
            "Experience with cloud services such as AWS, Azure, or Google Cloud Platform is often required.",
            "Backend developers should be able to identify and troubleshoot technical issues, as well as develop and implement effective solutions.",
            "Good communication skills are important for collaborating with other developers, stakeholders, and clients."
        ]
    },
    {
        jobTitle: 'Data Analyst',
        jobPosition: 3,
        jobLocation: 'San Francisco',
        jobRoles: [
            "Collecting, cleaning, organizing, and maintaining data from various sources to ensure its accuracy and reliability.",
            "Creating regular reports and presentations to summarize key findings and recommendations for business stakeholders.",
            "Developing and implementing data quality standards, procedures, and tools to ensure the accuracy, completeness, and consistency of data.",
            "Identifying and troubleshooting data-related problems and recommending effective solutions.",
            "Working with stakeholders to identify opportunities for leveraging company data to drive business solutions.",
            "Conducting research and performing statistical analysis to identify trends, patterns, and insights in data sets.",
            "Developing and implementing data analyses, data collection systems, and other strategies that optimize statistical efficiency and quality.",
        ],
        jobQualifications: [
            "A bachelor's degree in computer science, statistics, mathematics, or a related field is often required.",
            "A strong background in quantitative analysis, including proficiency in statistics and data modeling, is usually required. Knowledge of programming languages such as SQL, Python, or R is also important.",
            "Experience with data visualization tools and techniques, such as Tableau, Power BI, or QlikView, is usually required. Knowledge of web development principles such as HTML, CSS, and JavaScript may also be beneficial.",
            "Good communication skills are important for collaborating with other analysts and stakeholders, as well as for presenting findings and recommendations to senior management.",
            "A strong understanding of business principles and industry trends is important for identifying opportunities and developing data-driven solutions to business problems."
        ]
    }
];

app.get("/", (req, res) => {
    res.render('home');
});

app.post("/", (req, res) => {
    const { username, email, message } = req.body;
    console.log(`${username} with email ${email} says ${message}`);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOPtions = {
        from: email,
        to: 'tu734583@gmail.com',
        subject: `${username} <${email}> left message through online web platform.`,
        text: message
    }

    transporter.sendMail(mailOPtions, (error, info) => {
        if(error) {
            // console.log(error);
            res.redirect('/?deliverStatus=error');
        } else {
            // console.log(info.response)
            res.redirect('/?deliverStatus=success');
        }
    })

    // res.redirect('/');
});

app.get('/services', (req, res) => {
    res.render('services', {
        titleName: 'Services',
        stylesheetName: 'services',
        section1Heading: 'our services',
        section1Images: ['services_1', 'services_2']
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        titleName: 'About',
        stylesheetName: 'about',
        section1Heading: 'about us',
        section1Images: ['about_1', 'about_2']
    });
});

app.get('/careers', (req, res) => {
    res.render('careers', {
        titleName: 'Careers',
        stylesheetName: 'careers',
        section1Heading: 'careers',
        section1Images: ['careers_1', 'careers_2'],
        jobs
    });
});

app.get('/careers/:jobposition', (req, res) => {
    const { jobposition } = req.params;

    const job = jobs.find(job => job.jobPosition === parseInt(jobposition));

    res.render('job', {
        titleName: job.jobTitle,
        job
    });
})

app.post('/careers/:jobposition/upload', upload.single('resume'), (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let fileContent = fs.readFileSync(req.file.path);

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: req.body.title,
        text: `${req.body.name} <${req.body.email}> applied for ${req.body.title} role.`,
        attachments: [
            {
                filename: req.file.path,
                content: fileContent
            }
        ]
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.redirect('/careers/?deliverStatus=error');
        } else {
            res.redirect('/careers/?deliverStatus=success');
        }
    })
})

app.get('*', (req, res) => {
    res.send('OOPS! Page not found!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
