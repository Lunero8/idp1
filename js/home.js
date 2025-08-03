// Initialize the homepage
document.addEventListener('DOMContentLoaded', () => {
      renderCourses();
      
      // Set active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.href === window.location.href) {
              link.classList.add('active');
          }
      });
  });
  
  function renderCourses() {
      const container = document.getElementById('featured-courses');
      if (!container) return;
      
      container.innerHTML = '';
      
      DB.courses.forEach(course => {
          const courseCard = createCourseCard(course);
          container.appendChild(courseCard);
      });
  }
  
  function createCourseCard(course) {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.innerHTML = `
          <div class="course-img">${course.title.charAt(0)}</div>
          <div class="course-content">
              <h3>${course.title}</h3>
              <p>${course.description.substring(0, 100)}...</p>
              <div class="course-meta">
                  <span class="course-category">${course.category}</span>
              </div>
              <a href="course-detail.html?id=${course.id}" class="btn view-course">View Course</a>
          </div>
      `;
      
      return card;
  }