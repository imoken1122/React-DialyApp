
import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import MDViewer from "./markdown-utils/MdViewer"
import marked from 'marked';

import CreateIcon from '@material-ui/icons/Create';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from  '@material-ui/core/Button';
import {getPost} from "./api/getDialy"
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    cnt:{
        width:100,
        marginTop:1000
    },
    topblock:{
        width:900,
        marginTop:100,
        
        
    },
    editbutton:{
        marginLeft:700,

    }
  }));
function tf(time){
    const a = time.split("T")
    const b = a[0].split("-")
    const c = a[1].substr(0,5 );
    return `${b[0]}年${b[1]}月${b[2]}日  ${c}` 
  }
  
function Post() {
  const state = {id:'',created_date:'',published_date:'',title:'',text:'',category:''}
  const [detail, setDetail] = useState(state)
  const [loading, setLoading] = useState(true)
  const {id} = useParams()

  const classes = useStyles1();

    useEffect(()=>{
        getPost(id).then(d => {
            setDetail(d)
            setLoading(false)
        }).catch(e =>{
            throw new Error(e)
        })
    },[])


  return (
      
    <div className={classes.root}>
        <Header />
        {loading ?
                <></>
                :
        <Container className={classes.topblock}>
            
            <InputBase
                style = {{fontSize:50,color:"black",marginTop:50,}}
                disabled
                fullWidth
                value={detail.title}

               />

                <Button
                    variant="contained"
                        startIcon={<CreateIcon fontSize="medium" />}
                        size="medium"
                        className={classes.editbutton}
                           component={Link}
                            to={`/post/edit/${id}`}>
                        <Typography >
                            編集する
                        </Typography>
                </Button>

                <InputBase
                    style = {{fontSize:15,color:"#434343",marginTop:0,marginLeft:20}}
                    disabled
                    fullWidth
                    value={`${tf(detail.created_date)}   作成`}

                />
                <InputBase
                    style = {{fontSize:15,color:"#434343",marginTop:0,marginLeft:20}}
                    disabled
                    fullWidth
                    value=""

                />
            <Divider  style = {{position:"reactive",marginTop:40}}/>
        </Container>
        }
        {loading ?
                <></>
                :
        <Container  style = {{ width:900 , marginTop:70,marginBottom:100}}>
            <MDViewer html={marked(detail.text)}/>
        </Container>
        }
    </div>
  )
}
export default Post