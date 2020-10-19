import React,{Fragment,useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../actions/alert';
import PropTypes from 'prop-types';

const Register = ({setAlert})=>{
    const [formData,setFormData] =useState({
        jobName:'',
        value:''
    });

    const {jobName,value}=formData;

    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    const onSubmit = async e =>{
      e.preventDefault();
        
        const newJob = {
          jobName,
          value
        }

        try {
          const config = {
            headers : {
              'Content-Type':'application/json'
            }
          }

          const body = JSON.stringify(newJob);
          const res = await axios.post('http://localhost:5002/jobs/jobs',body,config);       
          if(res.data.includes("job-status")){
          setAlert('Job successfully pushed!!','success');
          var status = document.getElementById('res');
           var aTag = document.createElement('a');
           var br = document.createElement("br");
          aTag.setAttribute('href',res.data);
          aTag.setAttribute('target',"_blank");
          aTag.innerText = res.data;
          status.appendChild(aTag);
          status.appendChild(br);
          }
          else{
            setAlert(res.data,'danger');
          }
        } catch (err) {
          console.error(err.response.data);
        }
      }    
    

    return <Fragment>
      <div className="container">
      <h1 className="large text-primary">Enter Job</h1>
      <p className="lead"><i className="fas fa-user"></i> Enter Details</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Job Name" name="jobName" value={jobName} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Value" name="value" value={value} onChange={e => onChange(e)} required />
         
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
      <p id="res"></p>
     </div> 
    </Fragment>
};

Register.propTypes= {
  setAlert: PropTypes.func.isRequired
};

export default connect(null,{setAlert})(Register);
