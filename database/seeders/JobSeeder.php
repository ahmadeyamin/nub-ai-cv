<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Job;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing jobs
        Job::query()->delete();

        // Get or create employer users
        $employers = $this->getOrCreateEmployers();

        // Realistic job postings data
        $jobs = [
            [
                'title' => 'Senior Frontend Developer',
                'description' => 'We are looking for an experienced Senior Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using React, TypeScript, and modern CSS frameworks. The ideal candidate has 5+ years of experience in frontend development, strong understanding of web performance optimization, and experience with state management libraries like Redux or Zustand.',
                'location' => 'San Francisco, CA',
                'salary_range' => '$120k - $160k',
                'type' => 'Full-time',
                'company_name' => 'TechCorp Solutions'
            ],
            [
                'title' => 'Product Manager',
                'description' => 'Join our product team as a Product Manager to drive the development of innovative SaaS solutions. You will work closely with engineering, design, and marketing teams to define product roadmaps, gather requirements, and oversee product launches. Must have 3+ years of product management experience and strong analytical skills.',
                'location' => 'New York, NY',
                'salary_range' => '$110k - $140k',
                'type' => 'Full-time',
                'company_name' => 'InnovateTech Inc'
            ],
            [
                'title' => 'Full Stack Developer',
                'description' => 'We are seeking a talented Full Stack Developer proficient in both frontend and backend technologies. You will work on developing and maintaining web applications using Node.js, React, and PostgreSQL. Experience with cloud services (AWS/Azure) and microservices architecture is highly valued.',
                'location' => 'Remote',
                'salary_range' => '$90k - $130k',
                'type' => 'Full-time',
                'company_name' => 'Digital Dynamics'
            ],
            [
                'title' => 'UX/UI Designer',
                'description' => 'Creative UX/UI Designer needed to design beautiful and intuitive user interfaces for our mobile and web applications. You will conduct user research, create wireframes and prototypes, and collaborate with developers to implement designs. Must have strong portfolio and proficiency in Figma, Adobe Creative Suite.',
                'location' => 'Los Angeles, CA',
                'salary_range' => '$80k - $110k',
                'type' => 'Full-time',
                'company_name' => 'DesignHub Studios'
            ],
            [
                'title' => 'DevOps Engineer',
                'description' => 'Experienced DevOps Engineer to manage and optimize our cloud infrastructure. You will implement CI/CD pipelines, monitor system performance, and ensure high availability. Must have experience with Docker, Kubernetes, and major cloud providers.',
                'location' => 'Seattle, WA',
                'salary_range' => '$130k - $170k',
                'type' => 'Full-time',
                'company_name' => 'CloudTech Systems'
            ],
            [
                'title' => 'Data Scientist',
                'description' => 'We are looking for a Data Scientist to help us extract insights from complex datasets. You will develop machine learning models, perform statistical analysis, and create data visualizations. Must have strong Python skills and experience with ML frameworks.',
                'location' => 'Boston, MA',
                'salary_range' => '$115k - $150k',
                'type' => 'Full-time',
                'company_name' => 'DataDriven Analytics'
            ],
            [
                'title' => 'Mobile App Developer',
                'description' => 'Skilled Mobile App Developer to create native iOS and Android applications. You will work on the full mobile development lifecycle from concept to deployment. Experience with React Native or Flutter is required.',
                'location' => 'Austin, TX',
                'salary_range' => '$95k - $125k',
                'type' => 'Full-time',
                'company_name' => 'MobileFirst Technologies'
            ],
            [
                'title' => 'Backend Developer',
                'description' => 'Backend Developer needed to build robust APIs and microservices. You will work with Node.js, Express, and MongoDB to create scalable backend solutions. Experience with database design and API security is essential.',
                'location' => 'Chicago, IL',
                'salary_range' => '$85k - $115k',
                'type' => 'Full-time',
                'company_name' => 'API Masters'
            ],
            [
                'title' => 'Marketing Manager',
                'description' => 'Dynamic Marketing Manager to lead our digital marketing initiatives. You will develop marketing strategies, manage campaigns, and analyze performance metrics. Must have experience with SEO, SEM, and social media marketing.',
                'location' => 'Miami, FL',
                'salary_range' => '$75k - $100k',
                'type' => 'Full-time',
                'company_name' => 'GrowthMarketers Pro'
            ],
            [
                'title' => 'QA Engineer',
                'description' => 'Detail-oriented QA Engineer to ensure software quality and reliability. You will develop test plans, perform manual and automated testing, and work with development teams to resolve issues. Experience with testing frameworks is required.',
                'location' => 'Denver, CO',
                'salary_range' => '$70k - $95k',
                'type' => 'Full-time',
                'company_name' => 'QualityFirst Solutions'
            ],
            [
                'title' => 'Machine Learning Engineer',
                'description' => 'ML Engineer to design and implement machine learning systems. You will work on developing production-ready ML models, optimizing algorithms, and integrating ML solutions into our products. Strong Python and TensorFlow/PyTorch skills required.',
                'location' => 'Palo Alto, CA',
                'salary_range' => '$140k - $180k',
                'type' => 'Full-time',
                'company_name' => 'AILabs Innovations'
            ],
            [
                'title' => 'Cybersecurity Analyst',
                'description' => 'Cybersecurity Analyst to protect our digital assets and infrastructure. You will monitor security systems, investigate incidents, and implement security measures. Must have knowledge of security frameworks and incident response procedures.',
                'location' => 'Washington, DC',
                'salary_range' => '$90k - $120k',
                'type' => 'Full-time',
                'company_name' => 'SecureNet Solutions'
            ],
            [
                'title' => 'Technical Writer',
                'description' => 'Technical Writer to create clear and comprehensive documentation for our software products. You will work with engineering teams to produce user guides, API documentation, and technical articles. Must have excellent writing skills and technical aptitude.',
                'location' => 'Portland, OR',
                'salary_range' => '$65k - $85k',
                'type' => 'Full-time',
                'company_name' => 'DocuTech Writers'
            ],
            [
                'title' => 'Business Analyst',
                'description' => 'Business Analyst to bridge the gap between business needs and technical solutions. You will analyze business processes, gather requirements, and help implement system improvements. Strong analytical and communication skills required.',
                'location' => 'Atlanta, GA',
                'salary_range' => '$80k - $105k',
                'type' => 'Full-time',
                'company_name' => 'BusinessTech Consultants'
            ],
            [
                'title' => 'Cloud Architect',
                'description' => 'Senior Cloud Architect to design and implement cloud solutions. You will create scalable cloud architectures, optimize costs, and ensure security compliance. Must have deep expertise in AWS, Azure, or GCP.',
                'location' => 'Phoenix, AZ',
                'salary_range' => '$150k - $190k',
                'type' => 'Full-time',
                'company_name' => 'CloudArchitects Pro'
            ],
            [
                'title' => 'Database Administrator',
                'description' => 'Database Administrator to manage and optimize our database systems. You will handle database design, performance tuning, backup strategies, and security. Experience with PostgreSQL, MySQL, or NoSQL databases required.',
                'location' => 'Dallas, TX',
                'salary_range' => '$85k - $115k',
                'type' => 'Full-time',
                'company_name' => 'DataBase Masters'
            ],
            [
                'title' => 'Frontend Developer',
                'description' => 'Frontend Developer to create engaging user interfaces for web applications. You will work with React, TypeScript, and modern CSS to build responsive and performant UIs. Must have strong JavaScript skills and eye for design.',
                'location' => 'Nashville, TN',
                'salary_range' => '$75k - $100k',
                'type' => 'Full-time',
                'company_name' => 'WebCraft Studios'
            ],
            [
                'title' => 'Project Manager',
                'description' => 'Experienced Project Manager to lead software development projects. You will coordinate teams, manage timelines, and ensure project delivery. Must have PMP certification and experience with Agile methodologies.',
                'location' => 'Minneapolis, MN',
                'salary_range' => '$85k - $115k',
                'type' => 'Full-time',
                'company_name' => 'ProjectSuccess Inc'
            ],
            [
                'title' => 'Software Engineer',
                'description' => 'Software Engineer to join our product development team. You will design, develop, and maintain software applications using modern programming languages and frameworks. Must have strong problem-solving skills and teamwork abilities.',
                'location' => 'Philadelphia, PA',
                'salary_range' => '$80k - $110k',
                'type' => 'Full-time',
                'company_name' => 'SoftDev Solutions'
            ],
            [
                'title' => 'Network Administrator',
                'description' => 'Network Administrator to manage and maintain our IT infrastructure. You will handle network configuration, troubleshooting, and security. Must have experience with Cisco, firewalls, and network protocols.',
                'location' => 'Houston, TX',
                'salary_range' => '$70k - $90k',
                'type' => 'Full-time',
                'company_name' => 'NetAdmin Pro'
            ],
            [
                'title' => 'Content Marketing Specialist',
                'description' => 'Content Marketing Specialist to create engaging content across various platforms. You will write blog posts, create social media content, and develop email campaigns. Must have excellent writing skills and understanding of SEO.',
                'location' => 'San Diego, CA',
                'salary_range' => '$60k - $80k',
                'type' => 'Full-time',
                'company_name' => 'ContentCreators Hub'
            ],
            [
                'title' => 'Salesforce Developer',
                'description' => 'Salesforce Developer to customize and extend Salesforce platform. You will develop custom applications, integrate with other systems, and optimize Salesforce processes. Must have Salesforce certification and development experience.',
                'location' => 'Orlando, FL',
                'salary_range' => '$95k - $125k',
                'type' => 'Full-time',
                'company_name' => 'Salesforce Experts'
            ],
            [
                'title' => 'Game Developer',
                'description' => 'Creative Game Developer to join our game development studio. You will work on Unity or Unreal Engine projects, implement game mechanics, and optimize performance. Must have passion for gaming and strong C# or C++ skills.',
                'location' => 'Los Angeles, CA',
                'salary_range' => '$85k - $120k',
                'type' => 'Full-time',
                'company_name' => 'GameStudio Pro'
            ],
            [
                'title' => 'Blockchain Developer',
                'description' => 'Blockchain Developer to build decentralized applications and smart contracts. You will work with Ethereum, Solidity, and Web3.js. Must have understanding of blockchain technology and cryptography.',
                'location' => 'Remote',
                'salary_range' => '$120k - $160k',
                'type' => 'Full-time',
                'company_name' => 'Blockchain Innovations'
            ],
            [
                'title' => 'iOS Developer',
                'description' => 'iOS Developer to create native iPhone and iPad applications. You will work with Swift, SwiftUI, and UIKit to build high-quality iOS apps. Must have strong understanding of iOS design patterns and App Store guidelines.',
                'location' => 'Cupertino, CA',
                'salary_range' => '$100k - $140k',
                'type' => 'Full-time',
                'company_name' => 'iOS Masters'
            ],
            [
                'title' => 'Android Developer',
                'description' => 'Android Developer to build native Android applications. You will work with Kotlin, Java, and Android SDK to create engaging mobile experiences. Must have experience with Material Design and Google Play Store.',
                'location' => 'Mountain View, CA',
                'salary_range' => '$95k - $135k',
                'type' => 'Full-time',
                'company_name' => 'Android Experts'
            ],
            [
                'title' => 'Data Analyst',
                'description' => 'Data Analyst to help us make data-driven decisions. You will analyze datasets, create reports, and present insights to stakeholders. Must have strong SQL skills and experience with BI tools.',
                'location' => 'Charlotte, NC',
                'salary_range' => '$70k - $90k',
                'type' => 'Full-time',
                'company_name' => 'DataInsights Pro'
            ],
            [
                'title' => 'HR Manager',
                'description' => 'HR Manager to lead our human resources department. You will handle recruitment, employee relations, and HR policies. Must have strong interpersonal skills and HR certification.',
                'location' => 'Tampa, FL',
                'salary_range' => '$75k - $95k',
                'type' => 'Full-time',
                'company_name' => 'HR Solutions Inc'
            ],
            [
                'title' => 'Financial Analyst',
                'description' => 'Financial Analyst to analyze financial data and provide insights. You will create financial models, prepare reports, and support strategic decisions. Must have strong Excel skills and financial knowledge.',
                'location' => 'New York, NY',
                'salary_range' => '$85k - $110k',
                'type' => 'Full-time',
                'company_name' => 'Finance Analytics Pro'
            ],
            [
                'title' => 'Social Media Manager',
                'description' => 'Social Media Manager to grow our online presence. You will create content, manage social platforms, and engage with our community. Must have experience with social media analytics and trends.',
                'location' => 'Los Angeles, CA',
                'salary_range' => '$55k - $75k',
                'type' => 'Full-time',
                'company_name' => 'SocialMedia Masters'
            ],
            [
                'title' => 'WordPress Developer',
                'description' => 'WordPress Developer to create and maintain WordPress websites. You will develop custom themes, plugins, and optimize site performance. Must have strong PHP, JavaScript, and CSS skills.',
                'location' => 'Remote',
                'salary_range' => '$60k - $85k',
                'type' => 'Full-time',
                'company_name' => 'WP Experts'
            ],
            [
                'title' => 'Shopify Developer',
                'description' => 'Shopify Developer to build and customize e-commerce stores. You will create themes, develop custom functionality, and optimize store performance. Must have experience with Liquid templating and Shopify APIs.',
                'location' => 'Toronto, ON',
                'salary_range' => '$70k - $95k',
                'type' => 'Full-time',
                'company_name' => 'Shopify Masters'
            ],
            [
                'title' => 'React Native Developer',
                'description' => 'React Native Developer to build cross-platform mobile applications. You will work with React Native, TypeScript, and native modules to create high-performance mobile apps.',
                'location' => 'Remote',
                'salary_range' => '$90k - $120k',
                'type' => 'Full-time',
                'company_name' => 'MobileTech Solutions'
            ],
            [
                'title' => 'Angular Developer',
                'description' => 'Angular Developer to work on enterprise web applications. You will build responsive SPAs using Angular, TypeScript, and RxJS. Must have strong understanding of Angular architecture and best practices.',
                'location' => 'Chicago, IL',
                'salary_range' => '$85k - $115k',
                'type' => 'Full-time',
                'company_name' => 'Angular Experts'
            ],
            [
                'title' => 'Vue.js Developer',
                'description' => 'Vue.js Developer to create modern web applications. You will work with Vue 3, Vuex/Pinia, and Vue Router to build interactive user interfaces. Must have experience with component-based development.',
                'location' => 'Austin, TX',
                'salary_range' => '$80k - $105k',
                'type' => 'Full-time',
                'company_name' => 'Vue Masters'
            ],
            [
                'title' => 'Python Developer',
                'description' => 'Python Developer to work on backend systems and automation. You will develop APIs, data processing scripts, and web applications using Python frameworks like Django or Flask.',
                'location' => 'Remote',
                'salary_range' => '$85k - $115k',
                'type' => 'Full-time',
                'company_name' => 'Python Solutions'
            ],
            [
                'title' => 'Java Developer',
                'description' => 'Java Developer to build enterprise applications. You will work with Spring Boot, microservices, and enterprise systems. Must have strong understanding of Java EE and design patterns.',
                'location' => 'Boston, MA',
                'salary_range' => '$90k - $125k',
                'type' => 'Full-time',
                'company_name' => 'Java Experts'
            ],
            [
                'title' => 'PHP Developer',
                'description' => 'PHP Developer to work on web applications and APIs. You will develop using Laravel, Symfony, or other PHP frameworks. Must have experience with MySQL and REST APIs.',
                'location' => 'Denver, CO',
                'salary_range' => '$75k - $100k',
                'type' => 'Full-time',
                'company_name' => 'PHP Masters'
            ],
            [
                'title' => 'Ruby on Rails Developer',
                'description' => 'Ruby on Rails Developer to build web applications. You will work with Rails, PostgreSQL, and modern JavaScript frameworks. Must have strong understanding of MVC architecture.',
                'location' => 'Seattle, WA',
                'salary_range' => '$85k - $115k',
                'type' => 'Full-time',
                'company_name' => 'Rails Experts'
            ],
            [
                'title' => 'Go Developer',
                'description' => 'Go Developer to build high-performance systems and microservices. You will work with Go, gRPC, and cloud technologies. Must have understanding of concurrent programming and system design.',
                'location' => 'San Francisco, CA',
                'salary_range' => '$110k - $145k',
                'type' => 'Full-time',
                'company_name' => 'Go Solutions'
            ],
            [
                'title' => 'Rust Developer',
                'description' => 'Rust Developer to work on systems programming and performance-critical applications. You will build safe and concurrent software using Rust. Must have strong understanding of memory management and systems programming.',
                'location' => 'Remote',
                'salary_range' => '$120k - $160k',
                'type' => 'Full-time',
                'company_name' => 'Rust Systems'
            ],
            [
                'title' => 'TypeScript Developer',
                'description' => 'TypeScript Developer to build type-safe applications. You will work with modern TypeScript, Node.js, and frontend frameworks. Must have strong understanding of type systems and JavaScript.',
                'location' => 'New York, NY',
                'salary_range' => '$90k - $120k',
                'type' => 'Full-time',
                'company_name' => 'TypeScript Solutions'
            ],
            [
                'title' => 'GraphQL Developer',
                'description' => 'GraphQL Developer to design and implement GraphQL APIs. You will work with Apollo, Node.js, and database systems. Must have understanding of API design and data modeling.',
                'location' => 'Los Angeles, CA',
                'salary_range' => '$95k - $125k',
                'type' => 'Full-time',
                'company_name' => 'GraphQL Experts'
            ],
            [
                'title' => 'Docker Specialist',
                'description' => 'Docker Specialist to containerize applications and optimize deployment workflows. You will work with Docker Compose, Kubernetes, and CI/CD pipelines. Must have experience with container orchestration.',
                'location' => 'Austin, TX',
                'salary_range' => '$100k - $130k',
                'type' => 'Full-time',
                'company_name' => 'Container Solutions'
            ],
            [
                'title' => 'Kubernetes Engineer',
                'description' => 'Kubernetes Engineer to manage containerized applications at scale. You will design Kubernetes clusters, implement monitoring, and optimize resource usage. Must have deep understanding of cloud-native technologies.',
                'location' => 'Seattle, WA',
                'salary_range' => '$130k - $165k',
                'type' => 'Full-time',
                'company_name' => 'K8s Masters'
            ],
            [
                'title' => 'AWS Solutions Architect',
                'description' => 'AWS Solutions Architect to design cloud solutions on AWS platform. You will work with EC2, S3, Lambda, and other AWS services. Must have AWS certification and experience.',
                'location' => 'Remote',
                'salary_range' => '$140k - $180k',
                'type' => 'Full-time',
                'company_name' => 'AWS Experts'
            ],
            [
                'title' => 'Azure Cloud Engineer',
                'description' => 'Azure Cloud Engineer to build and maintain Azure infrastructure. You will work with Azure VMs, App Services, and DevOps pipelines. Must have Azure certification and experience.',
                'location' => 'Chicago, IL',
                'salary_range' => '$110k - $145k',
                'type' => 'Full-time',
                'company_name' => 'Azure Solutions'
            ],
            [
                'title' => 'Google Cloud Developer',
                'description' => 'Google Cloud Developer to build applications on GCP. You will work with Compute Engine, Cloud Storage, and Google Cloud services. Must have GCP certification and experience.',
                'location' => 'Mountain View, CA',
                'salary_range' => '$120k - $155k',
                'type' => 'Full-time',
                'company_name' => 'GCP Experts'
            ],
            [
                'title' => 'Freelance Graphic Designer',
                'description' => 'Creative Graphic Designer for various projects. You will create logos, marketing materials, and digital designs. Must have strong portfolio and proficiency in Adobe Creative Suite.',
                'location' => 'Remote',
                'salary_range' => '$40k - $60k',
                'type' => 'Freelance',
                'company_name' => 'Creative Design Hub'
            ],
            [
                'title' => 'Part-time Content Writer',
                'description' => 'Content Writer to create blog posts and articles. You will research topics, write engaging content, and optimize for SEO. Must have excellent writing skills and ability to meet deadlines.',
                'location' => 'Remote',
                'salary_range' => '$30k - $45k',
                'type' => 'Part-time',
                'company_name' => 'Content Writers Pro'
            ],
            [
                'title' => 'Contract QA Tester',
                'description' => 'QA Tester for manual and automated testing. You will test web applications, write test cases, and report bugs. Must have attention to detail and testing experience.',
                'location' => 'Remote',
                'salary_range' => '$50k - $70k',
                'type' => 'Contract',
                'company_name' => 'QA Testing Solutions'
            ],
            [
                'title' => 'Intern Software Developer',
                'description' => 'Software Developer Intern to learn and contribute to real projects. You will work with senior developers, write code, and learn best practices. Must be currently enrolled in CS program.',
                'location' => 'San Francisco, CA',
                'salary_range' => '$25k - $35k',
                'type' => 'Internship',
                'company_name' => 'TechCorp Solutions'
            ],
            [
                'title' => 'Junior Data Analyst',
                'description' => 'Junior Data Analyst to support our analytics team. You will help with data collection, basic analysis, and report creation. Must have SQL knowledge and analytical thinking.',
                'location' => 'New York, NY',
                'salary_range' => '$55k - $70k',
                'type' => 'Full-time',
                'company_name' => 'DataDriven Analytics'
            ]
        ];

        // Get admin user
        $adminUser = User::whereEmail('admin@app.com')->first();


        // Create jobs with admin user
        foreach ($jobs as $jobData) {
            Job::create([
                'title' => $jobData['title'],
                'description' => $jobData['description'],
                'location' => $jobData['location'],
                'salary_range' => $jobData['salary_range'],
                'type' => $jobData['type'],
                'user_id' => User::all()->random()->id,
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(1, 30)),
            ]);
        }

        $this->command->info('Created ' . count($jobs) . ' job postings successfully!');
    }

    /**
     * Get or create employer users for the job postings
     */
    private function getOrCreateEmployers()
    {
        $employers = collect([
            [
                'name' => 'TechCorp Solutions',
                'email' => 'hr@techcorp.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'InnovateTech Inc',
                'email' => 'careers@innovatetech.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Digital Dynamics',
                'email' => 'jobs@digitaldynamics.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'DesignHub Studios',
                'email' => 'hiring@designhub.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'CloudTech Systems',
                'email' => 'recruit@cloudtech.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'DataDriven Analytics',
                'email' => 'careers@datadriven.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'MobileFirst Technologies',
                'email' => 'jobs@mobilefirst.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'API Masters',
                'email' => 'hiring@apimasters.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'GrowthMarketers Pro',
                'email' => 'careers@growthmarketers.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
            [
                'name' => 'QualityFirst Solutions',
                'email' => 'jobs@qualityfirst.com',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        ]);

        // Create users if they don't exist
        $employerUsers = collect();
        foreach ($employers as $employer) {
            $user = User::firstOrCreate(
                ['email' => $employer['email']],
                [
                    'name' => $employer['name'],
                    'password' => bcrypt($employer['password']),
                    'email_verified_at' => $employer['email_verified_at'],
                ]
            );
            $employerUsers->push($user);
        }

        return $employerUsers;
    }
}
