import { useState, useEffect } from 'react';
import { 
  courseService, 
  authService, 
  userService,
  paymentService,
  Course
} from '../../services/api';

const ApiExample = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Example of how to call the API
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await courseService.getCourses();
        
        if (response.state === 1 && response.courses) {
          setCourses(response.courses);
        } else {
          setError(response.error || 'Failed to load courses');
        }
      } catch (err) {
        setError('An error occurred while fetching courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Example of how to handle a form submission (login)
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.state === 1) {
        // Login successful
        console.log('Login successful:', response.user);
        // Handle successful login (e.g., store token, redirect)
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example of how to enroll in a course
  const handleEnrollCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await courseService.enrollCourse(courseId);
      
      if (response.state === 1) {
        // Enrollment successful
        console.log('Enrollment successful:', response.enrollmentId);
        // Handle successful enrollment (e.g., show success message, redirect)
      } else {
        setError(response.error || 'Enrollment failed');
      }
    } catch (err) {
      setError('An error occurred during enrollment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">API Example</h2>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Available Courses</h3>
        {courses.length > 0 ? (
          <ul className="space-y-2">
            {courses.map((course) => (
              <li key={course.id} className="border p-3 rounded">
                <h4 className="font-bold">{course.title}</h4>
                <p className="text-gray-600">{course.description}</p>
                <div className="flex justify-between mt-2">
                  <span>${course.price}</span>
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEnrollCourse(course.id.toString())}
                  >
                    Enroll
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses available</p>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Login Example</h3>
        <form 
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleLogin(
              formData.get('email') as string,
              formData.get('password') as string
            );
          }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiExample; 