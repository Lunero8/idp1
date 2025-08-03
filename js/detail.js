// Initialize the course detail page
document.addEventListener('DOMContentLoaded', () => {
      const courseId = getUrlParam('id');
      if (courseId) {
          showCourseDetail(courseId);
      }
      
      // Set active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.href.includes('index.html')) {
              link.classList.add('active');
          }
      });
  });
  
  function showCourseDetail(courseId) {
      const course = DB.getCourse(courseId);
      if (course) {
          document.getElementById('detail-course-title').textContent = course.title;
          document.getElementById('detail-course-description').textContent = course.description;
          document.getElementById('detail-course-category').textContent = course.category;
          document.getElementById('course-full-description').textContent = course.description;
          document.getElementById('course-video-frame').src = course.videoUrl;
      }
  }