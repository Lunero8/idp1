// Data Management with localStorage
const DB = {
      courses: JSON.parse(localStorage.getItem('courses')) || [
          {
              id: '1',
              title: 'Introduction to Web Development',
              description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
              videoUrl: 'https://www.youtube.com/embed/ysEN5RaKOlA',
              category: 'Web Development'
          },
          {
              id: '2',
              title: 'JavaScript Fundamentals',
              description: 'Master the core concepts of JavaScript programming language.',
              videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
              category: 'Programming'
          },
          {
              id: '3',
              title: 'CSS Masterclass',
              description: 'Advanced CSS techniques for creating stunning user interfaces.',
              videoUrl: 'https://www.youtube.com/embed/1PnVor36_40',
              category: 'Web Design'
          }
      ],
      
      save: function() {
          localStorage.setItem('courses', JSON.stringify(this.courses));
      },
      
      addCourse: function(course) {
          course.id = Date.now().toString();
          this.courses.push(course);
          this.save();
          return course.id;
      },
      
      updateCourse: function(id, updatedCourse) {
          const index = this.courses.findIndex(c => c.id === id);
          if (index !== -1) {
              this.courses[index] = {...this.courses[index], ...updatedCourse};
              this.save();
              return true;
          }
          return false;
      },
      
      deleteCourse: function(id) {
          const initialLength = this.courses.length;
          this.courses = this.courses.filter(c => c.id !== id);
          if (this.courses.length !== initialLength) {
              this.save();
              return true;
          }
          return false;
      },
      
      getCourse: function(id) {
          return this.courses.find(c => c.id === id);
      },
      
      getCategories: function() {
          return [...new Set(this.courses.map(c => c.category))];
      }
  };
  
  // Utility functions
  function getUrlParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
  }