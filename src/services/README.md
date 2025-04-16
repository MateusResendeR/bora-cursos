# API Services

This directory contains the API services for connecting to the IPED API.

## Configuration

The API is configured in `api/config.ts` with the following settings:
- `BASE_URL`: The base URL of the API (https://www.iped.com.br/)
- `AUTH_TOKEN`: Authentication token for API requests
- `TIMEOUT`: Request timeout in milliseconds

## API Client

The API client (`api/client.ts`) is built with Axios and provides:
- Automatic request/response handling
- Error handling for different status codes
- Authorization header with the API token
- Support for various HTTP methods (GET, POST, PUT, DELETE)

## Services

### Authentication (`authService.ts`)
- `login(data)`: Authenticate a user
- `register(data)`: Register a new user
- `logout()`: Log out the current user

### Courses (`courseService.ts`)
- `getCourses(page, limit)`: Get a list of courses with pagination
- `getCourseDetail(id)`: Get details of a specific course
- `enrollCourse(id)`: Enroll in a course

### User (`userService.ts`)
- `getProfile()`: Get the current user's profile
- `updateProfile(data)`: Update the user's profile
- `changePassword(data)`: Change the user's password

### Payments (`paymentService.ts`)
- `getPaymentMethods()`: Get available payment methods
- `processPayment(data)`: Process a payment
- `getPaymentHistory(page, limit)`: Get payment history with pagination

## Usage Example

```tsx
import { courseService } from '../services/api';

// Get courses
const fetchCourses = async () => {
  try {
    const response = await courseService.getCourses();
    if (response.state === 1) {
      // Success
      const courses = response.courses;
      // Do something with courses
    } else {
      // Handle error
      console.error(response.error);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Login example
import { authService } from '../services/api';

const login = async (email, password) => {
  try {
    const response = await authService.login({ email, password });
    if (response.state === 1) {
      // Successful login
      const user = response.user;
      const token = response.token;
      // Store token and redirect
    } else {
      // Handle login error
      console.error(response.error);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Response Format

All API responses follow this structure:
- `state`: 1 for success, 0 for error
- `error`: Error message (when state is 0)
- `success`: Success message (when state is 1)
- Data fields relevant to the specific endpoint 