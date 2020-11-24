import React from 'react';
import { ProjectDetails } from './data/data';
import { Link, withRouter } from 'react-router-dom';

const Links = () => {
  // console.log(this.props)
  let projects = ProjectDetails.map((project, index) => {
    return (
      <Link to={'/projects/'+ project.slug} className="list-post" key={index}>
        <div className="card">
            
            <div className={"bg " + project.slug}>
              <h2>{project.client}</h2>
            </div>
            <img src={project.thumbnail}/>

        </div>
      </Link>  
    );
  }); 
  
  return (
    <div className="container">
      <div className="stripe-xl clearfix">
        <div className="work-container container">
          {projects}    
        </div>
      </div>
    </div>
  );
}

export default Links;


