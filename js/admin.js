// Initialize the admin page
document.addEventListener('DOMContentLoaded', () => {
      setupAdminPage();
      
      // Set active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.href === window.location.href) {
              link.classList.add('active');
          }
      });
  });
  
  function setupAdminPage() {
      const form = document.getElementById('course-form');
      const resetBtn = document.getElementById('reset-form');
      
      if (!form) return;
      
      // Form submission
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const courseData = {
              title: document.getElementById('course-title').value,
              description: document.getElementById('course-description').value,
              videoUrl: document.getElementById('course-video').value,
              category: document.getElementById('course-category').value
          };
          
          const courseId = document.getElementById('course-id').value;
          
          if (courseId) {
              // Update existing course
              if (DB.updateCourse(courseId, courseData)) {
                  alert('Course updated successfully!');
                  renderAdminCourseList();
                  form.reset();
                  document.getElementById('course-id').value = '';
              }
          } else {
              // Add new course
              DB.addCourse(courseData);
              alert('Course added successfully!');
              renderAdminCourseList();
              form.reset();
          }
      });
      
      // Reset form
      resetBtn.addEventListener('click', function() {
          form.reset();
          document.getElementById('course-id').value = '';
      });
      
      // Render course list
      renderAdminCourseList();
  }
  
  function renderAdminCourseList() {
      const container = document.getElementById('courses-list');
      if (!container) return;
      
      container.innerHTML = '';
      
      DB.courses.forEach(course => {
          const courseItem = document.createElement('div');
          courseItem.className = 'course-item';
          courseItem.innerHTML = `
              <div class="course-item-info">
                  <h3>${course.title}</h3>
                  <div class="course-item-meta">
                      <span>${course.category}</span>
                  </div>
              </div>
              <div class="course-actions">
                  <button class="btn btn-warning edit-course" data-id="${course.id}">Edit</button>
                  <button class="btn btn-danger delete-course" data-id="${course.id}">Delete</button>
              </div>
          `;
          
          container.appendChild(courseItem);
      });
      
      // Add event listeners for edit and delete buttons
      document.querySelectorAll('.edit-course').forEach(btn => {
          btn.addEventListener('click', function() {
              const courseId = this.getAttribute('data-id');
              const course = DB.getCourse(courseId);
              
              if (course) {
                  document.getElementById('course-id').value = course.id;
                  document.getElementById('course-title').value = course.title;
                  document.getElementById('course-description').value = course.description;
                  document.getElementById('course-video').value = course.videoUrl;
                  document.getElementById('course-category').value = course.category;
                  
                  // Scroll to form
                  document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
              }
          });
      });
      
      document.querySelectorAll('.delete-course').forEach(btn => {
          btn.addEventListener('click', function() {
              const courseId = this.getAttribute('data-id');
              
              if (confirm('Are you sure you want to delete this course?')) {
                  if (DB.deleteCourse(courseId)) {
                      renderAdminCourseList();
                  }
              }
          });
      });
  }