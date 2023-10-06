import axios from 'axios';
import { url } from 'constants';
import React, { Fragment, useEffect, useState } from 'react';
import Img from '../../../assets/img/carousalImg.jpg';

function MembersBox()
{

    const [members,setMembers] = useState([])

    useEffect(()=>{
        const getData=async()=>{


            await axios.get(`${url}/members`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
              if(resp.data.error){
              
              }else{
                setMembers(resp.data)
              }
            })
        

        
        }

        getData()
    
    },[])

    return (
        <></>
      
       
    );
}

export default MembersBox;