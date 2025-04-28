document.addEventListener('DOMContentLoaded', function () {
    // Ensure all elements are loaded before trying to add event listeners
    const registerForm = document.getElementById('register-form');
    const jobForm = document.getElementById('job-form');
    const jobListingContainer = document.getElementById('job-listing');

    // Check if register form exists before attaching the event listener
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;  // Ensure this exists in HTML
        
            try {
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, userType })
                });
        
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = '../pages/index.html';
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed. Please try again later.');
            }
        });
    } else {
        console.error('Register form not found.');
    }

    // Fetch Jobs if the job listing container exists
    if (jobListingContainer) {
        async function fetchJobs() {
            try {
                const res = await fetch('http://localhost:5000/api/jobs');
                if (!res.ok) throw new Error('Failed to fetch jobs');
                const jobs = await res.json();
                jobs.forEach(job => {
                    const jobLi = document.createElement('li');
                    jobLi.innerHTML = `
                        <h3>${job.title}</h3>
                        <p>${job.company}</p>
                        <p>${job.location}</p>
                    `;
                    jobListingContainer.appendChild(jobLi);
                });
            } catch (error) {
                console.error('Error fetching jobs:', error);
                alert('Failed to load jobs. Please try again later.');
            }
        }
    
        fetchJobs();
    }

    if (jobForm) {
        jobForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const company = document.getElementById('company').value;
            const description = document.getElementById('description').value;
            const location = document.getElementById('location').value;
            const salary = document.getElementById('salary').value;
        
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to post a job.');
                return;
            }
        
            try {
                const res = await fetch('http://localhost:5000/api/jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, company, description, location, salary })
                });
        
                const data = await res.json();
                if (data._id) {
                    alert('Job posted successfully!');
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Error posting job:', error);
                alert('Failed to post job. Please try again later.');
            }
        });
    } else {
        console.error('Job form not found.');
    }
});
