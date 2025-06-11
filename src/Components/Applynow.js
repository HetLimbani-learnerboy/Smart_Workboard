import React from 'react';
import './Applynow.css';

const Applynow = () => {

  const applyHandle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost:5021/applynow", {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Your application has been submitted successfully!");
        form.reset();
      } else {
        alert(data.message || "Submission failed, please try again.");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="applynow-wrapper">
      <div className="applynowimage-column">
        <img src="/applynowimage1.png" alt="Apply Now 1" />
        <img src="/applynowimage4.png" alt="Apply Now 2" />
      </div>

      <div className="applynow-container">
        <h2>Apply Now!</h2>
        <form onSubmit={applyHandle} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" placeholder='Enter First Name' required />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" placeholder='Enter Last Name' required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder='Enter Email' required />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <select id="position" name="position" required>
              <option value="">-- Select Position --</option>
              <option value="frontend_developer">Frontend Developer</option>
              <option value="backend_developer">Backend Developer</option>
              <option value="fullstack_developer">Full Stack Developer</option>
              <option value="ui_ux_designer">UI/UX Designer</option>
              <option value="project_manager">Project Manager</option>
              <option value="qa_engineer">QA Engineer</option>
              <option value="devops_engineer">DevOps Engineer</option>
              <option value="data_analyst">Data Analyst</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume:</label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="applynowimage-column">
        <img src="/applynowimage3.png" alt="Apply Now 4" />
        <img src="/applynowimage2.png" alt="Apply Now 3" />
      </div>
    </div>
  );
};

export default Applynow;
