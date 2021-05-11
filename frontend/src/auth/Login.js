import React from "react"
import Header from "./Header"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LoginForm from "./LoginForm"
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
    marginTop:120,

      width: theme.spacing(60),
      height: theme.spacing(86),

    },
   title:{
       fontSize:40
   }
  },
}));

function Login(props) {
    let parts = <div />
    const classes = useStyles();
    

    return (
        <div>
            <Header />
            <Container maxWidth="sm">
            <div className={classes.paper}>
                <Paper elevation={3}>
                    <div align="center" style={{backgroundColor :"white",height:200, marginBottom:85}} >

                                <Box fontWeight={801} letterSpacing={-6} m={1} fontFamily="Monospace"  style={{fontSize:80,color:"#4A8ADA",paddingTop:70}}>
                                    Otama
                                </Box>
                                <Box fontWeight={854} fontFamily="Monospace" style={{fontSize:20,color:"#333333",marginTop:-20}}>
                                    自分の毎日を記録しよう
                                </Box>
                        
                    </div>
                    < LoginForm login={false}/>
                </Paper>

            </div>

            </Container>

        </div>
    )

}

export default Login