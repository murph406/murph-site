import React, { Component } from 'react';

class VideoPlayer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        play: false,
      }
      this.play = this.play.bind(this);
  };

  componentDidMount(){
    //console.log(this.props)
  }

  play(){
    this.setState({play: true});
  }

  render() {
    const data = this.props.data;
    const vimeoSrc = 'https://player.vimeo.com/video/' + data.videoLink + '?autoplay=1&loop=1&autopause=0&mute=0'; 

    return (
      <div className="full-width stripe_6"> 
        <div className="watch-youtube-block">
          <div className="watch-vid-container watch-vid-preview" onClick={this.play} style={{backgroundImage: 'url('+ data.videoCoverPhoto +')'}}>
             <div className="player-content">
                
                {(this.state.play === true)
                  ? <div className="embed-container">
                      <iframe title="frame1" src={vimeoSrc} allow="autoplay" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen allow="autoplay; fullscreen; loop;"></iframe>
                    </div>
                  : <span className={"play-button " + ((this.state.play === true) ? 'is-hidden' : 'is-visible')}>PLAY</span>
                }
              </div> 
            </div>
        </div>
      </div>
    );
  }
};

VideoPlayer.defaultProps = {
  playerSize: 'default',
};

export default VideoPlayer;
