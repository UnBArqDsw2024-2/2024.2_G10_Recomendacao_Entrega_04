import React from 'react';
import { AppBar, Toolbar, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import logo from '../../assets/images/logo.png';

const Home = () => {
  return (
    <div className="home-page">
      <AppBar position="static" color='white'>
        <Toolbar>
          <img 
            src={logo}
            alt="Logo"
            style={{ height: 70, marginRight: 20 }} 
          />
          
          <Button color="inherit">Início</Button>
          <Button color="inherit">Sobre</Button>
          <Button color="inherit">Contato</Button>
        </Toolbar>
      </AppBar>

      <div className="content" style={{ padding: '20px' }}>

        {/* Grid para os cards */}
        <Grid container spacing={3}>
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>

            <Card onClick={() => alert('Card clicado!')}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este é o conteúdo do primeiro card.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este é o conteúdo do segundo card.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este é o conteúdo do terceiro card.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
