import React from "react";

function About() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-header bg-dark text-white fw-bold py-3 text-center">
          <i className="bi bi-info-circle-fill me-2"></i> Project & Student Information
        </div>
        <div className="card-body p-4">
          <h3 className="fw-bold">Assignment Concept: Product Store</h3>
          <p className="text-secondary mb-4">
            This application allows users to manage a catalog of general products. It implements a public REST API 
            to fetch, add, edit, and delete products, and uses Redux to store a list of favorited products.
          </p>

          <h5 className="fw-bold text-dark border-bottom pb-2">Student Team:</h5>
          <p className="mb-1"><strong>Name:</strong> Nguyen Huu Phuc</p>
          <p className="mb-4"><strong>Student ID:</strong> DE190462 | <strong>Class:</strong> SE20A04</p>

          <h5 className="fw-bold text-dark border-bottom pb-2">Learning Outcomes (LO) Implementation Matrix:</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover mt-3">
              <thead className="table-dark text-center">
                <tr>
                  <th>LO</th>
                  <th>Requirement</th>
                  <th>Implementation Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>LO1</strong></td>
                  <td>CRA & Git setup</td>
                  <td>`package.json`, `ASSIGNMENT_GUIDE.md` (Git commit flow)</td>
                </tr>
                <tr>
                  <td><strong>LO2</strong></td>
                  <td>Class & Functional Components</td>
                  <td>`components/ProductCard.jsx` (functional), `components/ProductCardClass.jsx` (class)</td>
                </tr>
                <tr>
                  <td><strong>LO3</strong></td>
                  <td>JSX & ES6</td>
                  <td>All components (arrow functions, template literals, destructuring)</td>
                </tr>
                <tr>
                  <td><strong>LO4</strong></td>
                  <td>Bootstrap & Custom CSS</td>
                  <td>Bootstrap CDN in `index.html`, hover effects in `App.css`</td>
                </tr>
                <tr>
                  <td><strong>LO5</strong></td>
                  <td>React Router (3 routes)</td>
                  <td>`App.js` (`/`, `/feature`, `/about`)</td>
                </tr>
                <tr>
                  <td><strong>LO6</strong></td>
                  <td>Hooks & Events</td>
                  <td>`ProductList.jsx`, `ProductDetail.jsx` (`useState`, `useEffect`, form events)</td>
                </tr>
                <tr>
                  <td><strong>LO7</strong></td>
                  <td>API Connection & Lazy Load</td>
                  <td>`api.js` (axios), lazy loading using `React.lazy` and `Suspense` in `App.js`</td>
                </tr>
                <tr>
                  <td><strong>LO8</strong></td>
                  <td>Redux Global State</td>
                  <td>`store.js` (favorites state) and Navbar count display in `App.js`</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
