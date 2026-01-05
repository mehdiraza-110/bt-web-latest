# BTaleem Backend - Complete API Documentation

## Base URL
```
http://your-domain.com/api
```

---

## Table of Contents
1. [Admin Authentication APIs](#admin-authentication-apis)
2. [Blog APIs](#blog-apis)
3. [Institute APIs](#institute-apis)
4. [Test APIs](#test-apis)
5. [Admission APIs](#admission-apis)

---

## Admin Authentication APIs

### 1. Admin Registration
**Endpoint:** `POST /admin/register`  
**Authentication:** Not required  
**Description:** Register a new admin user

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "admin@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "admin@example.com",
      "phone": "+1234567890",
      "is_verified": true,
      "is_admin_user": true,
      "created_at": "2025-01-05T10:00:00.000Z",
      "updated_at": "2025-01-05T10:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Missing required fields
- **409**: User already exists
- **500**: Internal server error

---

### 2. Admin Login
**Endpoint:** `POST /admin/login`  
**Authentication:** Not required  
**Description:** Login as admin user

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin logged in successfully",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "admin@example.com",
      "phone": "+1234567890",
      "profile_image": null,
      "is_verified": true,
      "is_admin_user": true,
      "roles": ["admin"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Note:** Token is also set in cookie as `admToken`

**Error Responses:**
- **400**: Missing email or password
- **401**: Invalid credentials
- **403**: Not an admin user or admin role not assigned
- **500**: Internal server error

---

### 3. Get Current Admin User
**Endpoint:** `GET /admin/me`  
**Authentication:** Cookie-based (token)  
**Description:** Get current logged-in admin user details

**Request Headers:**
```
Cookie: token=your_jwt_token
```

**Success Response (200):**
```json
{
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "admin@example.com",
    "phone": "+1234567890",
    "is_verified": true,
    "is_admin_user": true,
    "profile_image": "https://s3.amazonaws.com/...",
    "created_at": "2025-01-05T10:00:00.000Z",
    "updated_at": "2025-01-05T10:00:00.000Z",
    "roles": ["admin"],
    "allowedRoutes": ["/dashboard", "/users", "/settings"]
  }
}
```

**Error Responses:**
- **401**: Unauthorized or invalid token
- **404**: User not found

---

### 4. Update Admin Profile
**Endpoint:** `PUT /admin/update-profile`  
**Authentication:** Required (Admin)  
**Description:** Update admin profile information

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "email": "newemail@example.com",
  "phone": "+1234567891"
}
```

**Note:** All fields are optional, provide only the fields you want to update.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Smith",
      "email": "newemail@example.com",
      "phone": "+1234567891",
      "profile_image": "https://s3.amazonaws.com/...",
      "is_verified": true,
      "is_admin_user": true,
      "updated_at": "2025-01-05T11:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: No fields provided
- **401**: Unauthorized
- **409**: Email already exists
- **500**: Internal server error

---

### 5. Update Admin Avatar
**Endpoint:** `PUT /admin/update-avatar`  
**Authentication:** Required (Admin)  
**Content-Type:** `multipart/form-data`  
**Description:** Update admin profile picture

**Request Body (Form Data):**
```
avatar: [Image File] (JPEG, PNG, GIF, WEBP)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Avatar updated successfully",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Smith",
      "email": "admin@example.com",
      "phone": "+1234567890",
      "profile_image": "https://s3.amazonaws.com/avatars/new-image.jpg",
      "is_verified": true,
      "is_admin_user": true,
      "updated_at": "2025-01-05T11:30:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: No file uploaded or invalid file type
- **401**: Unauthorized
- **404**: User not found
- **500**: Internal server error

---

## Blog APIs

### 1. Create Blog
**Endpoint:** `POST /blogs`  
**Authentication:** Required (Admin)  
**Content-Type:** `multipart/form-data`  
**Description:** Create a new blog post

**Request Body (Form Data):**
```
title: "Getting Started with Node.js"
content: "<p>Blog content in HTML format...</p>"
excerpt: "A brief introduction to Node.js" (optional)
status: "draft" or "published" (default: "draft")
slug: "custom-slug" (optional, auto-generated from title if not provided)
featured_image: [Image File] (optional)

// SEO Fields (all optional)
meta_title: "Node.js Tutorial"
meta_description: "Learn Node.js from scratch"
meta_keywords: ["nodejs", "javascript", "backend"] or "nodejs,javascript,backend"
canonical_url: "https://example.com/blog/nodejs-tutorial"
og_title: "Node.js Tutorial"
og_description: "Comprehensive Node.js guide"
schema_markup: JSON string or object (optional)
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "blog": {
      "id": 1,
      "title": "Getting Started with Node.js",
      "slug": "getting-started-with-nodejs",
      "content": "<p>Blog content in HTML format...</p>",
      "excerpt": "A brief introduction to Node.js",
      "featured_image": "https://s3.amazonaws.com/blogs/image.jpg",
      "author_id": 1,
      "status": "draft",
      "views": 0,
      "meta_title": "Node.js Tutorial",
      "meta_description": "Learn Node.js from scratch",
      "meta_keywords": ["nodejs", "javascript", "backend"],
      "canonical_url": "https://example.com/blog/nodejs-tutorial",
      "og_title": "Node.js Tutorial",
      "og_description": "Comprehensive Node.js guide",
      "schema_markup": null,
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Missing required fields or invalid file type
- **401**: Unauthorized
- **409**: Slug already exists
- **500**: Internal server error

---

### 2. Get All Blogs
**Endpoint:** `GET /blogs`  
**Authentication:** Not required  
**Description:** Get all blogs with pagination and filters

**Query Parameters:**
```
page: 1 (default: 1)
limit: 10 (default: 10)
status: "draft" or "published" (optional)
author_id: 1 (optional)
search: "nodejs" (optional - searches in title and content)
```

**Example Request:**
```
GET /blogs?page=1&limit=10&status=published&search=nodejs
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": {
    "blogs": [
      {
        "id": 1,
        "title": "Getting Started with Node.js",
        "slug": "getting-started-with-nodejs",
        "excerpt": "A brief introduction to Node.js",
        "featured_image": "https://s3.amazonaws.com/blogs/image.jpg",
        "author_id": 1,
        "author_name": "John Doe",
        "status": "published",
        "views": 150,
        "created_at": "2025-01-05T12:00:00.000Z",
        "updated_at": "2025-01-05T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

**Error Response:**
- **500**: Internal server error

---

### 3. Get Blog by ID
**Endpoint:** `GET /blogs/:id`  
**Authentication:** Not required  
**Description:** Get a single blog by ID (increments view count for published blogs)

**Example Request:**
```
GET /blogs/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blog retrieved successfully",
  "data": {
    "blog": {
      "id": 1,
      "title": "Getting Started with Node.js",
      "slug": "getting-started-with-nodejs",
      "content": "<p>Full blog content...</p>",
      "excerpt": "A brief introduction to Node.js",
      "featured_image": "https://s3.amazonaws.com/blogs/image.jpg",
      "author_id": 1,
      "author_name": "John Doe",
      "status": "published",
      "views": 151,
      "meta_title": "Node.js Tutorial",
      "meta_description": "Learn Node.js from scratch",
      "meta_keywords": ["nodejs", "javascript", "backend"],
      "canonical_url": "https://example.com/blog/nodejs-tutorial",
      "og_title": "Node.js Tutorial",
      "og_description": "Comprehensive Node.js guide",
      "schema_markup": null,
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **404**: Blog not found
- **500**: Internal server error

---

### 4. Get Blog by Slug
**Endpoint:** `GET /blogs/slug/:slug`  
**Authentication:** Not required  
**Description:** Get a single blog by slug (increments view count for published blogs)

**Example Request:**
```
GET /blogs/slug/getting-started-with-nodejs
```

**Success Response (200):**
Same as "Get Blog by ID"

**Error Responses:**
- **404**: Blog not found
- **500**: Internal server error

---

### 5. Update Blog
**Endpoint:** `PUT /blogs/:id`  
**Authentication:** Required (Admin or Author)  
**Content-Type:** `multipart/form-data`  
**Description:** Update an existing blog

**Request Body (Form Data):**
All fields are optional, provide only what you want to update:
```
title: "Updated Title"
content: "<p>Updated content...</p>"
excerpt: "Updated excerpt"
status: "published"
slug: "new-custom-slug"
featured_image: [Image File] (optional - replaces existing)

// SEO Fields
meta_title: "Updated Meta Title"
meta_description: "Updated description"
meta_keywords: ["new", "keywords"]
canonical_url: "https://example.com/new-url"
og_title: "Updated OG Title"
og_description: "Updated OG Description"
schema_markup: JSON string or object
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "data": {
    "blog": {
      "id": 1,
      "title": "Updated Title",
      "slug": "new-custom-slug",
      "content": "<p>Updated content...</p>",
      "excerpt": "Updated excerpt",
      "featured_image": "https://s3.amazonaws.com/blogs/new-image.jpg",
      "author_id": 1,
      "status": "published",
      "views": 151,
      "updated_at": "2025-01-05T13:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Invalid data or file type
- **401**: Unauthorized
- **403**: Not the author or admin
- **404**: Blog not found
- **409**: Slug already exists
- **500**: Internal server error

---

### 6. Delete Blog
**Endpoint:** `DELETE /blogs/:id`  
**Authentication:** Required (Admin or Author)  
**Description:** Soft delete a blog (sets deleted_at timestamp)

**Example Request:**
```
DELETE /blogs/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "data": {
    "blog": {
      "id": 1,
      "title": "Getting Started with Node.js",
      "deleted_at": "2025-01-05T14:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **401**: Unauthorized
- **403**: Not the author or admin
- **404**: Blog not found
- **500**: Internal server error

---

## Institute APIs

### 1. Create Institute
**Endpoint:** `POST /institutes`  
**Authentication:** Not required (Public registration)  
**Content-Type:** `multipart/form-data`  
**Description:** Register a new institute

**Request Body (Form Data):**
```
// Basic Information (Required)
instituteName: "XYZ University"
instituteType: "University" (Options: School, College, University)
registrationNumber: "REG-12345" (optional)
establishmentYear: "1995"
legalStatus: "Private" (Options: Government, Private, Trust, NGO, Society, Others)

// Management (Required)
managingBodyName: "ABC Education Trust"
headOfInstitution: "Dr. John Smith"
contactPerson: "Jane Doe"
contactPersonDesignation: "Registrar"

// Contact Details (Required)
email: "info@xyzuniversity.com"
phoneNumbers: "+92-123-4567890"
faxNumber: "+92-123-4567891" (optional)
website: "https://xyzuniversity.com" (optional)
isSingleBranch: "true" or "false" (optional, default: false)

// Address (Required)
streetAddress: "123 Main Street"
city: "Lahore"
district: "Lahore"
province: "Punjab"
postalCode: "54000"
country: "Pakistan" (optional, default: Pakistan)

// Academic Information (Required)
affiliatedBoard: "HEC" (optional)
recognisingAuthority: "Higher Education Commission"
accreditationStatus: "Accredited" (optional)
recognitionNumber: "HEC-123"
recognitionYear: "2000"
recognitionExpiry: "2030-12-31" (optional)

// Operations (Required)
shift: "Morning"
studentCapacity: 5000 (optional)
currentEnrollment: 3500 (optional)
numberOfDepartments: 15 (optional)

levelsOffered: ["Undergraduate", "Graduate", "Postgraduate"]
// OR levelsOffered: '["Undergraduate", "Graduate", "Postgraduate"]'

programsOffered: [
  {
    "name": "Computer Science",
    "feeStructure": "PKR 200,000/year"
  },
  {
    "name": "Business Administration",
    "feeStructure": "PKR 150,000/year"
  }
]
// OR programsOffered: '[{"name":"Computer Science","feeStructure":"PKR 200,000/year"}]'

// Staff Information (Required)
teachingStaffFullTime: 50
teachingStaffPartTime: 20
nonTeachingStaff: 30
headOfDepartments: "List of HODs..." (optional)
principalQualifications: "PhD in Education" (optional)

// Infrastructure (Required)
buildingType: "Owned"
numberOfClassrooms: 40
libraryAvailable: "Yes"
computerLabs: "Yes"
hostelFacilities: "Yes"
sportsFacilities: "Yes"

// Financial (Required)
feeStructure: "Varies by program"
bankAccountDetails: "Account #12345..." (optional)
endowmentFunds: "10 Million PKR" (optional)

// Additional Information (Optional)
missionVision: "Our mission is..."
codeOfConduct: "Students must..."
socialMediaHandles: '{"facebook": "xyz_uni", "twitter": "xyz_uni"}'

// Logo (Optional)
logo: [Image File] (JPEG, PNG, GIF, WEBP)
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Institute registered successfully",
  "data": {
    "institute": {
      "id": 1,
      "instituteName": "XYZ University",
      "instituteType": "University",
      "email": "info@xyzuniversity.com",
      "status": "pending",
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Validation failed or invalid file type
- **409**: Email already exists
- **500**: Internal server error

---

### 2. Get All Institutes
**Endpoint:** `GET /institutes`  
**Authentication:** Not required  
**Description:** Get all institutes with pagination and filters

**Query Parameters:**
```
page: 1 (default: 1)
limit: 10 (default: 10)
status: "pending", "approved", "rejected", "suspended" (optional)
province: "Punjab" (optional)
city: "Lahore" (optional)
institute_type: "University" (optional)
search: "XYZ" (optional - searches in name)
```

**Example Request:**
```
GET /institutes?page=1&limit=10&province=Punjab&city=Lahore&institute_type=University&status=approved
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Institutes retrieved successfully",
  "data": {
    "institutes": [
      {
        "id": 1,
        "institute_name": "XYZ University",
        "institute_type": "University",
        "email": "info@xyzuniversity.com",
        "phone_numbers": "+92-123-4567890",
        "city": "Lahore",
        "province": "Punjab",
        "status": "approved",
        "logo": "https://s3.amazonaws.com/institutes/logo.jpg",
        "created_at": "2025-01-05T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

### 3. Get All Institutes (Alternate Endpoint)
**Endpoint:** `GET /get-institutes`  
**Authentication:** Not required  
**Description:** Get all institutes with filters (alternate endpoint with additional filter support)

**Query Parameters:**
```
page: 1 (default: 1)
limit: 10 (default: 10)
city: "Lahore" (optional)
search: "XYZ" (optional)
institute_type: "University" (optional)
```

**Example Request:**
```
GET /get-institutes?page=1&limit=10&city=Lahore&institute_type=University
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Institutes + filters retrieved successfully",
  "data": {
    "institutes": [...],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

### 4. Get Institute by ID
**Endpoint:** `GET /institutes/:id`  
**Authentication:** Not required  
**Description:** Get complete details of a single institute

**Example Request:**
```
GET /institutes/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Institute retrieved successfully",
  "data": {
    "institute": {
      "id": 1,
      "institute_name": "XYZ University",
      "institute_type": "University",
      "registration_number": "REG-12345",
      "establishment_year": "1995",
      "legal_status": "Private",
      "managing_body_name": "ABC Education Trust",
      "head_of_institution": "Dr. John Smith",
      "contact_person": "Jane Doe",
      "contact_person_designation": "Registrar",
      "email": "info@xyzuniversity.com",
      "phone_numbers": "+92-123-4567890",
      "fax_number": "+92-123-4567891",
      "website": "https://xyzuniversity.com",
      "is_single_branch": false,
      "street_address": "123 Main Street",
      "city": "Lahore",
      "district": "Lahore",
      "province": "Punjab",
      "postal_code": "54000",
      "country": "Pakistan",
      "affiliated_board": "HEC",
      "recognising_authority": "Higher Education Commission",
      "accreditation_status": "Accredited",
      "recognition_number": "HEC-123",
      "recognition_year": "2000",
      "recognition_expiry": "2030-12-31",
      "shift": "Morning",
      "student_capacity": 5000,
      "current_enrollment": 3500,
      "number_of_departments": 15,
      "levels_offered": ["Undergraduate", "Graduate", "Postgraduate"],
      "programs_offered": [
        {
          "name": "Computer Science",
          "feeStructure": "PKR 200,000/year"
        }
      ],
      "teaching_staff_full_time": 50,
      "teaching_staff_part_time": 20,
      "non_teaching_staff": 30,
      "building_type": "Owned",
      "number_of_classrooms": 40,
      "library_available": "Yes",
      "computer_labs": "Yes",
      "hostel_facilities": "Yes",
      "sports_facilities": "Yes",
      "fee_structure": "Varies by program",
      "logo": "https://s3.amazonaws.com/institutes/logo.jpg",
      "status": "approved",
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T13:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **404**: Institute not found
- **500**: Internal server error

---

### 5. Update Institute
**Endpoint:** `PUT /institutes/:id` or `PATCH /institutes/:id`  
**Authentication:** Required (Admin)  
**Content-Type:** `multipart/form-data`  
**Description:** Update institute information

**Request Body (Form Data):**
All fields are optional, provide only what you want to update. Same fields as create endpoint.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Institute updated successfully",
  "data": {
    "institute": {
      "id": 1,
      "institute_name": "XYZ University",
      "updated_at": "2025-01-05T15:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Validation failed
- **401**: Unauthorized
- **404**: Institute not found
- **409**: Email already exists
- **500**: Internal server error

---

### 6. Update Institute Status
**Endpoint:** `PATCH /institutes/:id/status`  
**Authentication:** Required (Admin)  
**Description:** Update institute approval status

**Request Body:**
```json
{
  "status": "approved"
}
```

**Options:** `pending`, `approved`, `rejected`, `suspended`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Institute status updated successfully",
  "data": {
    "institute": {
      "id": 1,
      "institute_name": "XYZ University",
      "status": "approved",
      "updated_at": "2025-01-05T15:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Invalid status
- **401**: Unauthorized
- **404**: Institute not found
- **500**: Internal server error

---

### 7. Delete Institute
**Endpoint:** `DELETE /institutes/:id`  
**Authentication:** Required (Admin)  
**Description:** Soft delete an institute

**Example Request:**
```
DELETE /institutes/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Institute deleted successfully",
  "data": {
    "institute": {
      "id": 1,
      "institute_name": "XYZ University",
      "deleted_at": "2025-01-05T16:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **401**: Unauthorized
- **404**: Institute not found
- **500**: Internal server error

---

## Test APIs

### 1. Create Test
**Endpoint:** `POST /tests`  
**Authentication:** Required (Admin)  
**Content-Type:** `application/json`  
**Description:** Create a new standardized test

**Request Body:**
```json
{
  "testName": "ECAT",
  "testFullName": "Engineering College Admission Test",
  "testType": "Engineering Admission",
  "duration": "120 minutes",
  "totalMarks": "400",
  "passingMarks": "200",
  "registrationFee": "1500",
  "registrationDeadline": "2025-06-30",
  "testDate": "2025-07-15",
  "officialWebsite": "https://ecat.punjab.gov.pk",
  "testOverview": "ECAT is conducted for admission to engineering universities...",
  
  "testStructure": [
    {
      "section": "Mathematics",
      "questions": 80,
      "marks": 200
    },
    {
      "section": "Physics",
      "questions": 40,
      "marks": 100
    },
    {
      "section": "Chemistry",
      "questions": 40,
      "marks": 100
    }
  ],
  
  "testSyllabus": [
    {
      "subject": "Mathematics",
      "topics": ["Algebra", "Calculus", "Trigonometry"]
    },
    {
      "subject": "Physics",
      "topics": ["Mechanics", "Electricity", "Thermodynamics"]
    }
  ],
  
  "testEligibility": [
    "Must have FSc Pre-Engineering",
    "Minimum 60% marks in FSc",
    "Pakistani nationality"
  ],
  
  "testPreparation": [
    {
      "resource": "Past Papers",
      "description": "Download from official website"
    },
    {
      "resource": "Preparation Books",
      "description": "Recommended study materials"
    }
  ],
  
  "testImportantDates": [
    {
      "event": "Registration Start",
      "date": "2025-05-01"
    },
    {
      "event": "Registration End",
      "date": "2025-06-30"
    },
    {
      "event": "Test Date",
      "date": "2025-07-15"
    }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Test created successfully",
  "data": {
    "test": {
      "id": 1,
      "test_name": "ECAT",
      "test_full_name": "Engineering College Admission Test",
      "test_type": "Engineering Admission",
      "duration": "120 minutes",
      "total_marks": "400",
      "passing_marks": "200",
      "registration_fee": "1500",
      "registration_deadline": "2025-06-30",
      "test_date": "2025-07-15",
      "official_website": "https://ecat.punjab.gov.pk",
      "test_overview": "ECAT is conducted for admission to engineering universities...",
      "test_structure": [...],
      "test_syllabus": [...],
      "test_eligibility": [...],
      "test_preparation": [...],
      "test_important_dates": [...],
      "status": "pending",
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Validation failed
- **401**: Unauthorized
- **500**: Internal server error

---

### 2. Get All Tests
**Endpoint:** `GET /get-tests`  
**Authentication:** Not required  
**Description:** Get all tests with pagination and filters

**Query Parameters:**
```
page: 1 (default: 1)
limit: 10 (default: 10)
status: "pending", "approved", "rejected", "suspended" (optional)
search: "ECAT" (optional - searches in test name)
```

**Example Request:**
```
GET /get-tests?page=1&limit=10&status=approved&search=engineering
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Tests retrieved successfully",
  "data": {
    "tests": [
      {
        "id": 1,
        "test_name": "ECAT",
        "test_full_name": "Engineering College Admission Test",
        "test_type": "Engineering Admission",
        "test_date": "2025-07-15",
        "registration_fee": "1500",
        "status": "approved",
        "created_at": "2025-01-05T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "limit": 10,
      "totalPages": 2
    }
  }
}
```

---

### 3. Get Test by ID
**Endpoint:** `GET /tests/:id`  
**Authentication:** Not required  
**Description:** Get complete details of a single test

**Example Request:**
```
GET /tests/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Test retrieved successfully",
  "data": {
    "test": {
      "id": 1,
      "test_name": "ECAT",
      "test_full_name": "Engineering College Admission Test",
      "test_type": "Engineering Admission",
      "duration": "120 minutes",
      "total_marks": "400",
      "passing_marks": "200",
      "registration_fee": "1500",
      "registration_deadline": "2025-06-30",
      "test_date": "2025-07-15",
      "official_website": "https://ecat.punjab.gov.pk",
      "test_overview": "ECAT is conducted for admission to engineering universities...",
      "test_structure": [...],
      "test_syllabus": [...],
      "test_eligibility": [...],
      "test_preparation": [...],
      "test_important_dates": [...],
      "status": "approved",
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **404**: Test not found
- **500**: Internal server error

---

### 4. Update Test
**Endpoint:** `PUT /tests/:id`  
**Authentication:** Required (Admin)  
**Content-Type:** `application/json`  
**Description:** Update test information

**Request Body:**
All fields are optional, provide only what you want to update. Same structure as create test.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Test updated successfully",
  "data": {
    "test": {
      "id": 1,
      "test_name": "ECAT",
      "updated_at": "2025-01-05T15:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Validation failed
- **401**: Unauthorized
- **404**: Test not found
- **500**: Internal server error

---

### 5. Update Test Status
**Endpoint:** `PATCH /tests/:id/status`  
**Authentication:** Required (Admin)  
**Description:** Update test approval status

**Request Body:**
```json
{
  "status": "approved"
}
```

**Options:** `pending`, `approved`, `rejected`, `suspended`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Test status updated successfully",
  "data": {
    "test": {
      "id": 1,
      "test_name": "ECAT",
      "status": "approved",
      "updated_at": "2025-01-05T15:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **400**: Invalid status
- **401**: Unauthorized
- **404**: Test not found
- **500**: Internal server error

---

### 6. Delete Test
**Endpoint:** `DELETE /tests/:id`  
**Authentication:** Required (Admin)  
**Description:** Soft delete a test

**Example Request:**
```
DELETE /tests/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Test deleted successfully",
  "data": {
    "test": {
      "id": 1,
      "test_name": "ECAT",
      "deleted_at": "2025-01-05T16:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **401**: Unauthorized
- **404**: Test not found
- **500**: Internal server error

---

## Admission APIs

### 1. Create Admission
**Endpoint:** `POST /admissions`  
**Authentication:** Required (Admin)  
**Content-Type:** `application/json`  
**Description:** Add a new admission record

**Request Body:**
```json
{
  "program": "Bachelor of Computer Science",
  "institute": "XYZ University",
  "field": "Computer Science",
  "duration": "4 years",
  "city": "Lahore",
  "fee": "50,000 per semester",
  "totalfee": "400,000",
  "status": "Open",
  "deadline": "2025-08-31",
  "intake": "Fall 2025",
  "seats": "120",
  "eligibility": "FSc Pre-Engineering or ICS with minimum 60% marks",
  "requirements": "Attested copies of certificates, CNIC, 4 passport size photos",
  "admissionprocess": "Apply online, submit documents, appear for test/interview",
  "programdetails": "4-year degree program covering programming, databases, algorithms...",
  "careeropportunities": "Software Engineer, Web Developer, Data Scientist, IT Consultant",
  "phone": "+92-123-4567890",
  "email": "admissions@xyzuniversity.com",
  "website": "https://xyzuniversity.com/admissions",
  "address": "123 Main Street, Lahore, Pakistan"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admission added successfully",
  "admission": {
    "id": 1,
    "program": "Bachelor of Computer Science",
    "institute": "XYZ University",
    "field": "Computer Science",
    "duration": "4 years",
    "city": "Lahore",
    "fee": "50,000 per semester",
    "totalfee": "400,000",
    "status": "Open",
    "deadline": "2025-08-31",
    "intake": "Fall 2025",
    "seats": "120",
    "eligibility": "FSc Pre-Engineering or ICS with minimum 60% marks",
    "requirements": "Attested copies of certificates, CNIC, 4 passport size photos",
    "admissionprocess": "Apply online, submit documents, appear for test/interview",
    "programdetails": "4-year degree program covering programming, databases, algorithms...",
    "careeropportunities": "Software Engineer, Web Developer, Data Scientist, IT Consultant",
    "phone": "+92-123-4567890",
    "email": "admissions@xyzuniversity.com",
    "website": "https://xyzuniversity.com/admissions",
    "address": "123 Main Street, Lahore, Pakistan",
    "created_at": "2025-01-05T12:00:00.000Z",
    "updated_at": "2025-01-05T12:00:00.000Z"
  }
}
```

**Error Responses:**
- **400**: Request body is empty
- **401**: Unauthorized
- **500**: Server error

---

### 2. Get All Admissions
**Endpoint:** `GET /admissions`  
**Authentication:** Not required  
**Description:** Get all admissions with filters

**Query Parameters:**
```
page: 1 (optional)
limit: 10 (optional)
city: "Lahore" (optional)
field: "Computer Science" (optional)
institute: "XYZ University" (optional)
status: "Open" (optional)
```

**Example Request:**
```
GET /admissions?page=1&limit=10&city=Lahore&field=Computer Science&status=Open
```

**Success Response (200):**
```json
{
  "success": true,
  "admissions": [
    {
      "id": 1,
      "program": "Bachelor of Computer Science",
      "institute": "XYZ University",
      "field": "Computer Science",
      "duration": "4 years",
      "city": "Lahore",
      "fee": "50,000 per semester",
      "totalfee": "400,000",
      "status": "Open",
      "deadline": "2025-08-31",
      "intake": "Fall 2025",
      "seats": "120",
      "created_at": "2025-01-05T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

**Error Response:**
- **500**: Server error

---

### 3. Get Admission by ID
**Endpoint:** `GET /admissions/:id`  
**Authentication:** Not required  
**Description:** Get detailed information of a single admission

**Example Request:**
```
GET /admissions/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admission retrieved successfully",
  "data": {
    "admission": {
      "id": 1,
      "program": "Bachelor of Computer Science",
      "institute": "XYZ University",
      "field": "Computer Science",
      "duration": "4 years",
      "city": "Lahore",
      "fee": "50,000 per semester",
      "totalfee": "400,000",
      "status": "Open",
      "deadline": "2025-08-31",
      "intake": "Fall 2025",
      "seats": "120",
      "eligibility": "FSc Pre-Engineering or ICS with minimum 60% marks",
      "requirements": "Attested copies of certificates, CNIC, 4 passport size photos",
      "admissionprocess": "Apply online, submit documents, appear for test/interview",
      "programdetails": "4-year degree program covering programming, databases, algorithms...",
      "careeropportunities": "Software Engineer, Web Developer, Data Scientist, IT Consultant",
      "phone": "+92-123-4567890",
      "email": "admissions@xyzuniversity.com",
      "website": "https://xyzuniversity.com/admissions",
      "address": "123 Main Street, Lahore, Pakistan",
      "created_at": "2025-01-05T12:00:00.000Z",
      "updated_at": "2025-01-05T12:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **201**: Id is missing (Note: This appears to be a typo in the code, should be 400)
- **404**: Admission not found
- **500**: Internal server error

---

### 4. Update Admission
**Endpoint:** `PUT /admissions/:id`  
**Authentication:** Required (Admin)  
**Content-Type:** `application/json`  
**Description:** Update admission information

**Request Body:**
All fields are required for update (based on controller validation):
```json
{
  "program": "Bachelor of Computer Science",
  "institute": "XYZ University",
  "field": "Computer Science",
  "duration": "4 years",
  "city": "Lahore",
  "fee": "55,000 per semester",
  "totalfee": "440,000",
  "status": "Open",
  "deadline": "2025-09-15",
  "intake": "Fall 2025",
  "seats": "150",
  "eligibility": "FSc Pre-Engineering or ICS with minimum 60% marks",
  "requirements": "Attested copies of certificates, CNIC, 4 passport size photos",
  "admissionprocess": "Apply online, submit documents, appear for test/interview",
  "programdetails": "Updated program details...",
  "careeropportunities": "Software Engineer, Web Developer, Data Scientist",
  "phone": "+92-123-4567890",
  "email": "admissions@xyzuniversity.com",
  "website": "https://xyzuniversity.com/admissions",
  "address": "123 Main Street, Lahore, Pakistan"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admission updated successfully",
  "data": {
    "id": 1,
    "program": "Bachelor of Computer Science",
    "institute": "XYZ University",
    "fee": "55,000 per semester",
    "totalfee": "440,000",
    "updated_at": "2025-01-05T15:00:00.000Z"
  }
}
```

**Error Responses:**
- **400**: Id is missing or required fields are missing
- **401**: Unauthorized
- **500**: Internal server error

---

### 5. Delete Admission
**Endpoint:** `DELETE /admissions/:id`  
**Authentication:** Required (Admin)  
**Description:** Delete an admission record

**Example Request:**
```
DELETE /admissions/1
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admission deleted successfully",
  "data": {
    "admission": {
      "id": 1,
      "program": "Bachelor of Computer Science",
      "deleted": true
    }
  }
}
```

**Error Responses:**
- **201**: Id is missing (Note: This appears to be a typo in the code, should be 400)
- **401**: Unauthorized
- **500**: Internal server error

---

## Authentication

Most protected endpoints require authentication. The system uses JWT (JSON Web Token) authentication.

### How to Authenticate

1. **Login** using the `/admin/login` endpoint
2. The response includes a `token` in the response body
3. A cookie named `admToken` is also set automatically
4. For subsequent requests to protected endpoints, include the token in one of these ways:
   - **Cookie**: The `admToken` cookie is sent automatically by the browser
   - **Authorization Header**: `Authorization: Bearer YOUR_JWT_TOKEN`

### Protected Endpoints

Endpoints marked with "Authentication: Required (Admin)" need authentication.

---

## Common Error Responses

All APIs may return these common error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details..."
}
```

---

## Notes

1. **File Uploads**: When uploading files (images), use `multipart/form-data` content type
2. **Pagination**: Most list endpoints support pagination with `page` and `limit` query parameters
3. **Soft Deletes**: Delete operations are soft deletes (records are not physically removed)
4. **Status Values**: Common status values are `pending`, `approved`, `rejected`, `suspended`
5. **Date Format**: Dates should be in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)
6. **Search**: Search functionality typically searches across multiple text fields
7. **JSONB Fields**: Fields like `levelsOffered`, `programsOffered`, etc. accept both JSON objects/arrays and JSON strings

---

## Testing the APIs

### Using cURL

```bash
# Register Admin
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "admin@example.com",
    "phone": "+1234567890",
    "password": "securePassword123"
  }'

# Login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "securePassword123"
  }' \
  -c cookies.txt

# Get Blogs (with cookie authentication)
curl -X GET http://localhost:3000/api/blogs?page=1&limit=10 \
  -b cookies.txt
```

### Using Postman

1. Import this collection or create requests manually
2. For authentication, either:
   - Use the returned token in Authorization header (Bearer Token)
   - Enable cookie handling in Postman settings
3. For file uploads, use form-data in Body tab

---

## Contact & Support

For issues or questions, please contact the development team or refer to the project documentation.

**Version:** 1.0.0  
**Last Updated:** January 5, 2025

