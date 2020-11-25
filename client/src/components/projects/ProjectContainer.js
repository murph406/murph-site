import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import VideoPlayer from './VideoPlayer';

class ProjectContainer extends PureComponent {
  constructor() {
    super()
    this.state = {
      visibility: 'hide-view',
    }
  }

  componentDidMount() {
    let { isAuthenticated, history } = this.props
    console.log("HEY__O", this.props)
    if (!isAuthenticated) {
      history.push("/");
    }

    setTimeout(function () {
      this.setState({ visibility: 'show-view' });
    }.bind(this), 300);

    window.scrollTo(0, 0);
  }

  render() {
    let { data } = this.props
    let { visibility } = this.state
    let { deliverables, team, content_blocks, block_description, hero_description, hero_text, year, id } = data.data

    let ProjectDeliverables = deliverables.map((d) => {
      console.log(data)
      return (
        <div key={d.id}>
          <p className='body-copy'>{d.deliverable}</p>
        </div>
      );
    });

    let teamMembers = team.map((team) => {
      return (
        <div key={team.id}>
          <p className='body-copy'>{team.member}</p>
        </div>
      );
    });

    let ProjectDetails = content_blocks.map((block, index) => {
      let { block_type, block_title, block_height, block_img, block_video } = block
      if (block_type === 'full') {
        return (
          <div key={index}>
            <div className={"content-block stripe-lrg clearfix " + block_type}>
              <div className="block-title">
                <h3>{block_title}</h3>
              </div>
              <div className="block-content">
                <p>{block_description}</p>
              </div>
            </div>
            <div className="block-img stripe-med clearfix">
              <img alt={block_title} src={block_img} />
            </div>
          </div>
        );
      }

      if (block_type === 'image') {
        return (
          <div key={index}>
            <div className="block-img stripe-med clearfix" key={block.id}>
              <img src={block_img} alt="placeholder for alt text" />
            </div>
          </div>
        );
      }

      if (block_type === 'video') {
        return (
          <div className="block-vid" key={index}>
            <video className={block_height} width="1200" height="620" autoPlay loop>
              <source src={block_video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          </div>
        );
      }

      if (block_type === 'videoPlayer') {
        return (
          <VideoPlayer
            key={index}
            data={block}
          />
        );
      }

      if (block_type === 'text') {
        return (
          <div className={"content-block stripe-lrg clearfix " + block_type} key={index}>
            <div className="block-title">
              <h3>{block_title}</h3>
            </div>
            <div className="block-content">
              <p>{block_description}</p>
            </div>
          </div>
        );
      }
    });

    return (
      <div className={"project transition " + (visibility)}>
        <div className="intro-block">
          <div className="container">
            <div className="mini-info">
              <ul>
                <li><h3 className='accent'>Year</h3>
                  <p className='body-copy'>{year}</p></li>
              </ul>
              <ul>
                <li>
                  <h3 className='accent'>Deliverables</h3>
                  {ProjectDeliverables}
                </li>
                <li>
                  <h3 className="accent">Team</h3>
                  {teamMembers}
                </li>
              </ul>
            </div>
            <div key={id} className="project-text-block">
              <h2>{hero_text}</h2>
              <p className="body-copy">{hero_description}</p>
            </div>
          </div>
        </div>
        <div className={"hero-img " + (data.slug)}>
        </div>
        <div className="project-body stripe-lrg clearfix">
          {ProjectDetails}
        </div>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(withRouter(ProjectContainer));
