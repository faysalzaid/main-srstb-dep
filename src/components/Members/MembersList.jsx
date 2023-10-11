
import React, { useState, useEffect,Fragment } from 'react'

import CTA from '../../components/CTA'
import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../../components/Chart/ChartLegend'
import PageTitle from '../../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from '@heroicons/react/outline';

import { ErrorAlert, SuccessAlert } from "components/Alert";


import {
  TableBody,
  TableContainer, 
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
} from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'axios'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { date } from 'faker/lib/locales/az'
import TitleChange from 'components/Title/Title'




const MembersList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [members,setMembers] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [membersForm,setMembersForm] = useState({position:"",name:"",description:"",image:""})
    const [timesheetData,setTimeSheetData] = useState([])
    const [employeeData,setEmployeeData] = useState([])
  


    // Notifications
    const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });

    const handleCloseSuccess = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenSuccess({ open: false, message: "" });
    };
  
    const [openError, setOpenError] = useState({ open: false, message: "" });
  
    const handleCloseError = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenError({ open: false, message: "" });
    };

    // End of notifications
    const [isOpen,setIsOpen] = useState(false)
    function closeModal(){
        setIsOpen(false)
    }
    function openModal(){
        setIsOpen(true)
    }



      useEffect(()=>{
        const getData=async()=>{


            await axios.get(`${url}/members`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
              if(resp.data.error){
                setOpenError({open:true,message:true})
              }else{
                setMembers(resp.data)
              }
            })
        

        
        }

        getData()
    
    },[])

      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(membersForm);
        const formData = new FormData()
        formData.append('position',membersForm.position)
        formData.append('description',membersForm.description)
        formData.append('name',membersForm.name)
        formData.append('image',membersForm.image)
        console.log(formData);
        await axios.post(`${url}/members`,formData,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
            }else{
                setMembers((prev)=>[...prev,resp.data])
                setOpenSuccess({open:true,message:"Successfully Added"})
                closeModal();
            }
          

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })
       
      };

      




  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.get(`${url}/members/delete/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = timesheetData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setTimeSheetData(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}



  
    return (
      <>
        <TitleChange name={`Members | ${settings.name}`} />
        <PageTitle>Members</PageTitle>
        <ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal="right"
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal="right"
      />

  
        {/* <CTA /> */}
        
        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Projects " value={countsData.projectCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Bids Registered" value={countsData.bidCount}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Active Projects" value={countsData.activeProjects}>
            <RoundIcon
              icon={CartIcon}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Completed Projects" value={countsData.completedProjects}>
            <RoundIcon
              icon={ChatIcon}
              iconColorClass="text-teal-500 dark:text-teal-100"
              bgColorClass="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
  



        <TableContainer>
      {/* Delete Confirm section */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}

        <Button onClick={openModal}>New Member</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register New Member</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          
          <Label>
            <span>Name</span>
            <Input
            //   type="date"
              className="mt-1"
            //   value={membersForm.date}
              name="name"
              onChange={(e)=>setMembersForm({...membersForm,name:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Position</span>
            <Input
            //   type="date"
              className="mt-1"
            //   value={membersForm.date}
              name="position"
              onChange={(e)=>setMembersForm({...membersForm,position:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Description</span>
            <Textarea
            //   type="date"
              className="mt-1"
            //   value={membersForm.date}
              name="description"
              onChange={(e)=>setMembersForm({...membersForm,description:e.target.value})}
              required
            />
          </Label>

          <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg dark:text-white cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Upload Image</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                name="image"
                onChange={(e)=>setMembersForm({...membersForm,image:e.target.files[0]})}
              />


              
        </div>
        <div className="hidden sm:block">

        <Button className="mt-6" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
      
        </form>
      </ModalBody>
      <ModalFooter>
      <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>

          {/* <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div> */}
      </ModalFooter>
    </Modal>


  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Name</TableCell>
            <TableCell className="font-semibold">Image</TableCell>
            <TableCell className="font-semibold">Position</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?members.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                <TableCell><span className="text-sm font-semibold">{row?.Name}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">
                <div className="flex items-center text-sm">
                    <div>
                      <img style={{ width: 30 }} src={row?.image} />
                    </div>
                  </div>
                  
                  </span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.position}</span></TableCell>
               
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/members/${row.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                  </Link>
                  <Button layout="link" size="small" onClick={() => openDelete(row.id)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>

      </>
    )


   

}




export default MembersList