import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const Wrapper = styled.div`
  flex-grow: 1;
  margin-top: 30;
`;

const App = () => (
  <Wrapper>
    <Grid container spacing={24}>
      <Typography type="display4" gutterBottom>
        Hello world
      </Typography>
      <Button>
        Hello World
      </Button>
    </Grid>
  </Wrapper>
);

export default App;
