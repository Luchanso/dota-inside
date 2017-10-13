import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import XRay from 'react-x-ray';

const Wrapper = styled.div`
  body:not(&) {
    margin: 0;
  }

  flex-grow: 1;
  padding: 30px;
`;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      xray: false,
    };
  }

  handleXRay = () => {
    this.setState(prevState => ({
      xray: !prevState.xray,
    }));
  }

  render() {
    return (
      <XRay grid={16} outline disabled={this.state.xray}>
        <Wrapper>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography type="display4" gutterBottom>
                Hello world
              </Typography>
              <Button onClick={this.handleXRay}>Toggle XRay</Button>
            </Grid>
          </Grid>
        </Wrapper>
      </XRay>
    );
  }
}

export default App;
