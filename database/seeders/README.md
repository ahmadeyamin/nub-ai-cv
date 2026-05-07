# Database Seeders

This directory contains database seeders for populating your AI Career Hub application with realistic data.

## Available Seeders

### JobSeeder
Creates 50+ realistic job postings across various industries and locations including:

- **Tech Roles**: Frontend/Backend/Full Stack Developers, DevOps, ML Engineers, etc.
- **Design Roles**: UX/UI Designers, Graphic Designers, etc.
- **Data Roles**: Data Scientists, Data Analysts, etc.
- **Business Roles**: Product Managers, Business Analysts, etc.
- **Marketing Roles**: Marketing Managers, Content Writers, etc.
- **Other Roles**: HR, Finance, QA, etc.

**Features:**
- Realistic job titles and descriptions
- Diverse salary ranges ($25k - $190k)
- Multiple job types (Full-time, Part-time, Contract, Freelance, Internship)
- Various locations (major US cities + Remote)
- 10 different employer accounts
- Random posting dates (last 30 days)

## How to Run

### Method 1: Fresh Database (Recommended)
```bash
# Run all migrations and seeders
php artisan migrate:fresh --seed
```

### Method 2: Existing Database
```bash
# Run only the seeders
php artisan db:seed
```

### Method 3: Run Specific Seeder
```bash
# Run only the job seeder
php artisan db:seed --class=JobSeeder
```

## Employer Accounts

The seeder creates 10 employer accounts with the following credentials:
- All passwords: `password`
- All emails are verified

Example employers:
- TechCorp Solutions: `hr@techcorp.com`
- InnovateTech Inc: `careers@innovatetech.com`
- Digital Dynamics: `jobs@digitaldynamics.com`
- And 7 more...

## Admin Account

Default admin account:
- Email: `admin@app.com`
- Password: `password`

## After Seeding

You'll have:
- 50+ diverse job postings
- 10 employer accounts
- 1 admin account
- Realistic data for testing your redesigned UI

The jobs will appear on the homepage with proper formatting, and employers can log in to view their postings and applications.
